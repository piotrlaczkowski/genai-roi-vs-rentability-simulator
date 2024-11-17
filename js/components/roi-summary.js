class ROISummary {
    static update(metrics, inputs) {
        const updateElement = (id, value, prefix = '', suffix = '') => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = `${prefix}${value}${suffix}`;
            }
        };

        // Update summary metrics
        updateElement("totalROISummary", metrics.totalMonthlyROI.toFixed(2), CONFIG.currency);
        updateElement("monthlyValueGenerated", (metrics.monthlyBenefit * inputs.numberOfUsers).toFixed(2), CONFIG.currency);
        updateElement("roiPerUserSummary", metrics.monthlyROIPerUser.toFixed(2), CONFIG.currency);
        updateElement("solutionCostPerMonth", (metrics.totalMonthlyCost * inputs.numberOfUsers + inputs.fixedCost).toFixed(2), CONFIG.currency);

        // Update progress bars
        this.updateProgressBars(metrics);
    }

    static updateProgressBars(metrics) {
        const updateProgress = (id, value, max) => {
            const progressBar = document.getElementById(id);
            if (progressBar) {
                const percentage = Math.min((value / max) * 100, 100);
                progressBar.style.width = `${percentage}%`;
            }
        };

        updateProgress("roiProgressBar", metrics.totalMonthlyROI, metrics.totalMonthlyROI * 1.5);
        updateProgress("valueProgressBar", metrics.monthlyBenefit, metrics.monthlyBenefit * 1.5);
        updateProgress("costProgressBar", metrics.totalMonthlyCost, metrics.totalMonthlyCost * 1.5);
    }
}