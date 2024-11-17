class ErrorHandler {
    static showError(message, elementId = 'errorContainer') {
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        } else {
            console.error(message);
        }
    }

    static clearErrors(elementId = 'errorContainer') {
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = '';
        }
    }

    static handleCalculationError(error) {
        console.error('Calculation error:', error);
        this.showError('An error occurred while calculating ROI. Please check your inputs.');
    }
}