class ROICalculator {
    static calculateMetrics(inputs) {
        const metrics = {
            monthlyQueries: inputs.queriesPerDay * inputs.workingDays,
            monthlyBenefit: inputs.timeSaved * inputs.valuePerHour * inputs.workingDays,
            monthlyVariableCost: 0,
            monthlyFixedCostPerUser: 0,
            totalMonthlyCost: 0,
            monthlyROIPerUser: 0,
            totalMonthlyROI: 0,
            buildCost: inputs.buildCost
        };

        // Calculate derived metrics
        metrics.monthlyVariableCost = metrics.monthlyQueries * inputs.costPerQuery;
        metrics.monthlyFixedCostPerUser = inputs.fixedCost / (inputs.numberOfUsers || 1);
        metrics.totalMonthlyCost = metrics.monthlyVariableCost + metrics.monthlyFixedCostPerUser;
        metrics.monthlyROIPerUser = metrics.monthlyBenefit - metrics.totalMonthlyCost;
        metrics.totalMonthlyROI = (metrics.monthlyROIPerUser * inputs.numberOfUsers) - inputs.fixedCost;

        return metrics;
    }
}