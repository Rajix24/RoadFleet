const analyseService = require("../services/analyse.service")

class AnalyseController {
    eco_performance = async (req, res) => {
        try {
            const performance = await analyseService.ecoPerformanceByDriver()
            return res.status(200).json({
                message: "Driver eco performance",
                data: performance
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                message: "Could not get driver eco performance",
                error: error.message
            })
        }
    }

    getTripsFinancialEsg = async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query;

            let start;
            let end;

            if (startDate) {
                start = new Date(startDate);

                if (Number.isNaN(start.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid startDate"
                    });
                }
                start.setUTCHours(0, 0, 0, 0);
            }

            if (endDate) {
                end = new Date(endDate);

                if (Number.isNaN(end.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid endDate"
                    });
                }
                end.setUTCHours(23, 59, 59, 999);
            }

            if (start && end && start > end) {
                return res.status(400).json({
                    success: false,
                    message: "startDate must be before or equal to endDate"
                });
            }

            const data = await analyseService.getTripsFinancialEsg({
                startDate: start,
                endDate: end
            });

            return res.status(200).json({
                success: true,
                filters: {
                    startDate: startDate || null,
                    endDate: endDate || null
                },
                data
            });
        } catch (error) {
            next(error);
        }
    }

    getFleetUtilizationTrends = async (req, res, next) => {
        try {
            const { startDate, endDate } = req.query
            const start = startDate ? new Date(startDate) : new Date()
            const end = endDate ? new Date(endDate) : new Date()

            if (Number.isNaN(start.getTime())) {
                return res.status(400).json({ success: false, message: "Invalid startDate" })
            }
            if (Number.isNaN(end.getTime())) {
                return res.status(400).json({ success: false, message: "Invalid endDate" })
            }

            start.setUTCHours(0, 0, 0, 0)
            end.setUTCHours(23, 59, 59, 999)
            if (!startDate) start.setUTCDate(1)

            if (start > end) {
                return res.status(400).json({
                    success: false,
                    message: "startDate must be before or equal to endDate"
                })
            }

            const data = await analyseService.getFleetUtilizationTrends({ startDate: start, endDate: end })
            return res.status(200).json({
                success: true,
                filters: { startDate: start.toISOString(), endDate: end.toISOString() },
                methodology: "Utilization is completed-trip planned duration divided by non-archived fleet calendar capacity. Historical available, maintenance, and inactive durations are not stored separately.",
                data
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AnalyseController()
