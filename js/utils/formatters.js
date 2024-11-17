class Formatters {
    static currency(value, currency = CONFIG.currency) {
        return `${currency}${value.toFixed(2)}`;
    }

    static number(value, decimals = 0) {
        return value.toFixed(decimals);
    }

    static percentage(value) {
        return `${(value * 100).toFixed(1)}%`;
    }

    static roundToNearest(value, nearest = 1) {
        return Math.round(value / nearest) * nearest;
    }
}