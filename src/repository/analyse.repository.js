const Trajet = require("../models/trajet.model")
const Camion = require("../models/camion.model")

class AnalyseRepository {
    ecoPerformanceByDriver = async () => {
        return Trajet.aggregate([
                {
                    $match: {
                        status: "termine"
                    }
                },
                {
                    $group: {
                        _id: "$chauffeur",
                        totalFuel: {
                            $sum: "$gasoilVolume"
                        },
                        totalDistance: {
                            $sum: "$distance"
                        },
                        completedTrips: {
                            $sum: 1
                        }
                    }
                },
                {
                    $set: {
                        averageConsumption: {
                            $cond: [
                                { $gt: ["$totalDistance", 0] },
                                {
                                    $multiply: [
                                        {
                                            $divide: [
                                                "$totalFuel",
                                                "$totalDistance"
                                            ]
                                        },
                                        100
                                    ]
                                },
                                null
                            ]
                        }
                    }
                },
                {
                    $set: {
                        ecoScore: {
                            $cond: [
                                { $ne: ["$averageConsumption", null] },
                                {
                                    $max: [
                                        0,
                                        {
                                            $min: [
                                                100,
                                                {
                                                    $subtract: [
                                                        100,
                                                        {
                                                            $multiply: [
                                                                {
                                                                    $subtract: [
                                                                        "$averageConsumption",
                                                                        30
                                                                    ]
                                                                },
                                                                2.5
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                null
                            ]
                        }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "_id",
                        as: "driver"
                    }
                },
                {
                    $unwind: {
                        path: "$driver",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        driverId: "$_id",
                        driverName: {
                            $trim: {
                                input: {
                                    $concat: [
                                        { $ifNull: ["$driver.first_name", ""] },
                                        " ",
                                        { $ifNull: ["$driver.last_name", ""] }
                                    ]
                                }
                            }
                        },
                        totalFuel: 1,
                        totalDistance: 1,
                        completedTrips: 1,
                        averageConsumption: {
                            $round: ["$averageConsumption", 2]
                        },
                        ecoScore: {
                            $round: ["$ecoScore", 2]
                        }
                    }
                },
                {
                    $sort: {
                        ecoScore: -1
                    }
                }
        ]);
    }

    getTripsFinancialEsg = async ({ startDate, endDate } = {}) => {
        const match = { status: "termine" }
        if (startDate) match.plannedDeparture = { ...match.plannedDeparture, $gte: startDate }
        if (endDate) match.plannedDeparture = { ...match.plannedDeparture, $lte: endDate }

        const result = await Trajet.aggregate([
            { $match: match },
            {
                $group: {
                    _id: null,
                    totalFuelLiters: { $sum: "$gasoilVolume" },
                    totalTrips: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalFuelLiters: 1,
                    totalTrips: 1,
                    co2EmissionsKg: { $multiply: ["$totalFuelLiters", 2.68] },
                    co2EmissionsTonnes: { $divide: [{ $multiply: ["$totalFuelLiters", 2.68] }, 1000] }
                }
            }
        ])
        return result[0] || { totalFuelLiters: 0, totalTrips: 0, co2EmissionsKg: 0, co2EmissionsTonnes: 0 }
    }

    getFleetUtilizationTrends = async ({ startDate, endDate }) => {
        const tripCollection = Trajet.collection.name
        const result = await Camion.aggregate([
            { $match: { isArchived: { $ne: true } } },
            { $group: { _id: null, fleetCount: { $sum: 1 } } },
            {
                $set: {
                    monthOffsets: {
                        $range: [
                            0,
                            {
                                $add: [
                                    {
                                        $dateDiff: {
                                            startDate: { $dateTrunc: { date: startDate, unit: "month" } },
                                            endDate: { $dateTrunc: { date: endDate, unit: "month" } },
                                            unit: "month"
                                        }
                                    },
                                    1
                                ]
                            }
                        ]
                    }
                }
            },
            { $unwind: "$monthOffsets" },
            {
                $set: {
                    monthStart: { $dateAdd: { startDate: { $dateTrunc: { date: startDate, unit: "month" } }, unit: "month", amount: "$monthOffsets" } },
                    requestedStart: startDate,
                    requestedEnd: endDate
                }
            },
            {
                $set: {
                    periodStart: { $cond: [{ $gt: ["$monthStart", "$requestedStart"] }, "$monthStart", "$requestedStart"] },
                    monthEnd: { $dateAdd: { startDate: "$monthStart", unit: "month", amount: 1 } }
                }
            },
            {
                $set: {
                    periodEnd: { $cond: [{ $lt: ["$monthEnd", "$requestedEnd"] }, "$monthEnd", "$requestedEnd"] }
                }
            },
            {
                $lookup: {
                    from: tripCollection,
                    let: { periodStart: "$periodStart", periodEnd: "$periodEnd" },
                    pipeline: [
                        {
                            $match: {
                                status: "termine",
                                $expr: {
                                    $and: [
                                        { $lt: ["$plannedDeparture", "$$periodEnd"] },
                                        { $gt: ["$plannedArrival", "$$periodStart"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                clippedStart: { $cond: [{ $gt: ["$plannedDeparture", "$$periodStart"] }, "$plannedDeparture", "$$periodStart"] },
                                clippedEnd: { $cond: [{ $lt: ["$plannedArrival", "$$periodEnd"] }, "$plannedArrival", "$$periodEnd"] }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                missionMilliseconds: { $sum: { $subtract: ["$clippedEnd", "$clippedStart"] } },
                                completedTrips: { $sum: 1 }
                            }
                        }
                    ],
                    as: "mission"
                }
            },
            {
                $set: {
                    missionTimeHours: { $divide: [{ $ifNull: [{ $arrayElemAt: ["$mission.missionMilliseconds", 0] }, 0] }, 3600000] },
                    completedTrips: { $ifNull: [{ $arrayElemAt: ["$mission.completedTrips", 0] }, 0] },
                    fleetCalendarCapacityHours: {
                        $multiply: ["$fleetCount", { $divide: [{ $subtract: ["$periodEnd", "$periodStart"] }, 3600000] }]
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    period: { $dateToString: { format: "%Y-%m", date: "$monthStart", timezone: "UTC" } },
                    missionTimeHours: { $round: ["$missionTimeHours", 2] },
                    fleetCalendarCapacityHours: { $round: ["$fleetCalendarCapacityHours", 2] },
                    completedTrips: 1,
                    utilizationRatio: {
                        $cond: [
                            { $gt: ["$fleetCalendarCapacityHours", 0] },
                            { $round: [{ $divide: ["$missionTimeHours", "$fleetCalendarCapacityHours"] }, 4] },
                            null
                        ]
                    },
                    utilizationPercent: {
                        $cond: [
                            { $gt: ["$fleetCalendarCapacityHours", 0] },
                            { $round: [{ $multiply: [{ $divide: ["$missionTimeHours", "$fleetCalendarCapacityHours"] }, 100] }, 2] },
                            null
                        ]
                    }
                }
            },
            { $sort: { period: 1 } }
        ])
        return result
    }
}
module.exports = new AnalyseRepository()
