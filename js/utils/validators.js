class Validators {
    static isPositiveNumber(value) {
        return !isNaN(value) && value >= 0;
    }

    static isInteger(value) {
        return Number.isInteger(Number(value));
    }

    static isInRange(value, min, max) {
        return value >= min && value <= max;
    }

    static validateInputs(inputs) {
        const errors = [];

        if (!this.isPositiveNumber(inputs.numberOfUsers)) {
            errors.push('Number of users must be a positive number');
        }

        if (!this.isPositiveNumber(inputs.timeSaved)) {
            errors.push('Time saved must be a positive number');
        }

        if (!this.isPositiveNumber(inputs.valuePerHour)) {
            errors.push('Value per hour must be a positive number');
        }

        if (!this.isPositiveNumber(inputs.queriesPerDay)) {
            errors.push('Queries per day must be a positive number');
        }

        if (!this.isInRange(inputs.workingDays, 1, 31)) {
            errors.push('Working days must be between 1 and 31');
        }

        return errors;
    }
}