const analyseRepository = require("../repository/analyse.repository")

class AnalyseService {
    ecoPerformanceByDriver = async () => {
        return analyseRepository.ecoPerformanceByDriver()
    }

    getTripsFinancialEsg = async  (filters) => {
        return analyseRepository.getTripsFinancialEsg(filters);
    }

    getFleetUtilizationTrends = async (filters) => {
        return analyseRepository.getFleetUtilizationTrends(filters)
    }
}

module.exports = new AnalyseService()
