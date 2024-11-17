class TemplateLoader {
    static async loadTemplate(templatePath) {
        try {
            const response = await fetch(templatePath);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${templatePath}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Template loading error:', error);
            return '';
        }
    }

    static async loadAllTemplates() {
        const templates = {
            inputForm: await this.loadTemplate('templates/input-form.html'),
            roiSummary: await this.loadTemplate('templates/roi-summary.html'),
            detailedResults: await this.loadTemplate('templates/detailed-results.html'),
            usageMetrics: await this.loadTemplate('templates/usage-metrics.html')
        };

        // Insert templates into the DOM
        Object.entries(templates).forEach(([id, html]) => {
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = html;
            }
        });

        return templates;
    }
}