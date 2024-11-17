class DetailedResults {
    static update(metrics, inputs) {
        const updateElement = (id, value, prefix = '', suffix = '') => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = `${prefix}${value}${suffix}`;
            }
        };

        // Update detailed metrics
        updateElement("benefitPerUser", metrics.monthlyBenefit.toFixed(2), CONFIG.currency);
        updateElement("queriesPerMonth", metrics.monthlyQueries.toFixed(0));
        updateElement("totalMonthlyValue", (metrics.monthlyBenefit * inputs.numberOfUsers).toFixed(2), CONFIG.currency);
        updateElement("variableCostPerUser", metrics.monthlyVariableCost.toFixed(2), CONFIG.currency);
        updateElement("fixedCostPerUser", metrics.monthlyFixedCostPerUser.toFixed(2), CONFIG.currency);
        updateElement("totalCostPerUser", metrics.totalMonthlyCost.toFixed(2), CONFIG.currency);
        updateElement("roiPerUser", metrics.monthlyROIPerUser.toFixed(2), CONFIG.currency);
        updateElement("totalROI", metrics.totalMonthlyROI.toFixed(2), CONFIG.currency);
        updateElement("netROI", (metrics.totalMonthlyROI * 12 - metrics.buildCost).toFixed(2), CONFIG.currency);
    }
}