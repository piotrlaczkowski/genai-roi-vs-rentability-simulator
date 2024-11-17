class UsageMetrics {
    static update(metrics, inputs) {
        const updateElement = (id, value, prefix = '', suffix = '') => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = `${prefix}${value}${suffix}`;
            }
        };

        const dailyUsers = Math.ceil(inputs.numberOfUsers * 0.7);

        // Update usage metrics
        updateElement("usersNeededPerMonth", inputs.numberOfUsers);
        updateElement("queriesNeededPerMonth", (metrics.monthlyQueries * inputs.numberOfUsers).toFixed(0));
        updateElement("usersNeededPerDay", dailyUsers);
        updateElement("queriesNeededPerDay", (inputs.queriesPerDay * dailyUsers).toFixed(0));
        updateElement("queriesPerUserDay", inputs.queriesPerDay.toFixed(1));
        updateElement("activeDaysPerMonth", inputs.workingDays);
    }
}