class ROICharts {
    constructor() {
        this.chart = null;
    }

    initialize() {
        const ctx = document.getElementById('roiChart').getContext('2d');
        this.chart = new Chart(ctx, this.getChartConfig());
    }

    update(metrics, inputs) {
        const data = this.calculateChartData(metrics, inputs);
        this.chart.data.datasets[0].data = data.roiData;
        this.chart.data.datasets[1].data = data.benefitData;
        this.chart.data.datasets[2].data = data.costData;
        this.chart.update();
    }

    getChartConfig() {
        return {
            type: 'line',
            data: {
                labels: Array.from({length: 13}, (_, i) => `Month ${i}`),
                datasets: [
                    {
                        label: 'Net ROI',
                        borderColor: CONFIG.chartColors.netROI,
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        tension: 0.1,
                        fill: true
                    },
                    {
                        label: 'Total Benefits',
                        borderColor: CONFIG.chartColors.benefits,
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        tension: 0.1,
                        fill: true
                    },
                    {
                        label: 'Total Costs',
                        borderColor: CONFIG.chartColors.costs,
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        tension: 0.1,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: `Amount (${CONFIG.currency})`
                        }
                    }
                },
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        };
    }
}