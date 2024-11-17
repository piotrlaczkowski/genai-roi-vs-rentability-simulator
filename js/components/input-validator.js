class InputValidator {
    static validateInput(input, rules) {
        const errors = [];

        if (rules.required && !input) {
            errors.push('This field is required');
        }

        if (rules.min !== undefined && input < rules.min) {
            errors.push(`Value must be at least ${rules.min}`);
        }

        if (rules.max !== undefined && input > rules.max) {
            errors.push(`Value must be no more than ${rules.max}`);
        }

        if (rules.integer && !Number.isInteger(Number(input))) {
            errors.push('Value must be a whole number');
        }

        if (rules.positive && input < 0) {
            errors.push('Value must be positive');
        }

        return errors;
    }

    static validateAllInputs(inputs) {
        const validationRules = {
            numberOfUsers: { required: true, min: 0, integer: true },
            timeSaved: { required: true, min: 0 },
            valuePerHour: { required: true, min: 0 },
            queriesPerDay: { required: true, min: 0 },
            workingDays: { required: true, min: 1, max: 31, integer: true },
            costPerQuery: { required: true, min: 0 },
            fixedCost: { required: true, min: 0 },
            buildCost: { required: true, min: 0 }
        };

        const errors = {};
        Object.entries(inputs).forEach(([key, value]) => {
            const rules = validationRules[key];
            if (rules) {
                const fieldErrors = this.validateInput(value, rules);
                if (fieldErrors.length > 0) {
                    errors[key] = fieldErrors;
                }
            }
        });

        return errors;
    }

    static showValidationErrors(errors) {
        Object.entries(errors).forEach(([fieldId, fieldErrors]) => {
            const inputElement = document.getElementById(fieldId);
            if (inputElement) {
                inputElement.classList.add('is-invalid');

                // Create or update error message
                let errorDiv = inputElement.nextElementSibling;
                if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
                    errorDiv = document.createElement('div');
                    errorDiv.className = 'invalid-feedback';
                    inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
                }
                errorDiv.textContent = fieldErrors.join('. ');
            }
        });
    }

    static clearValidationErrors() {
        document.querySelectorAll('.is-invalid').forEach(element => {
            element.classList.remove('is-invalid');
            const errorDiv = element.nextElementSibling;
            if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
                errorDiv.remove();
            }
        });
    }
}