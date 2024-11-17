class ROICalculatorApp {
    constructor() {
        this.charts = new ROICharts();
        this.initialize();
    }

    initialize() {
        this.addEventListeners();
        this.charts.initialize();
        this.calculate();
    }

    addEventListeners() {
        const inputIds = [
            "numberOfUsers", "timeSaved", "valuePerHour", "queriesPerDay",
            "workingDays", "costPerQuery", "fixedCost", "buildDays",
            "costPerDay", "totalBuildCost", "buildCostToggle"
        ];

        inputIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.calculate());
            }
        });

        // Add build cost toggle handler
        const buildCostToggle = document.getElementById("buildCostToggle");
        if (buildCostToggle) {
            buildCostToggle.addEventListener('change', () => this.toggleBuildCostInputs());
        }
    }

    toggleBuildCostInputs() {
        const isCustom = document.getElementById("buildCostToggle").checked;
        document.getElementById("customBuildCost").style.display = isCustom ? "none" : "block";
        document.getElementById("calculatedBuildCost").style.display = isCustom ? "block" : "none";
        this.calculate();
    }

    calculate() {
        try {
            const inputs = this.getInputValues();
            const metrics = ROICalculator.calculateMetrics(inputs);

            // Update all components
            ROISummary.update(metrics, inputs);
            DetailedResults.update(metrics, inputs);
            UsageMetrics.update(metrics, inputs);
            this.charts.update(metrics, inputs);
        } catch (error) {
            console.error("Calculation error:", error);
        }
    }

    getInputValues() {
        return {
            numberOfUsers: parseFloat(document.getElementById("numberOfUsers").value) || 0,
            timeSaved: parseFloat(document.getElementById("timeSaved").value) || 0,
            valuePerHour: parseFloat(document.getElementById("valuePerHour").value) || 0,
            queriesPerDay: parseFloat(document.getElementById("queriesPerDay").value) || 0,
            workingDays: parseFloat(document.getElementById("workingDays").value) || 0,
            costPerQuery: parseFloat(document.getElementById("costPerQuery").value) || 0,
            fixedCost: parseFloat(document.getElementById("fixedCost").value) || 0,
            buildCost: this.calculateBuildCost()
        };
    }

    calculateBuildCost() {
        return document.getElementById("buildCostToggle").checked ?
            parseFloat(document.getElementById("buildDays").value) * parseFloat(document.getElementById("costPerDay").value) :
            parseFloat(document.getElementById("totalBuildCost").value) || 0;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ROICalculatorApp();
});