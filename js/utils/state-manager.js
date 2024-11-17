class StateManager {
    static LOCAL_STORAGE_KEY = 'roi_calculator_state';

    static state = {
        inputs: {
            numberOfUsers: 0,
            timeSaved: 0,
            valuePerHour: 0,
            queriesPerDay: 0,
            workingDays: 20,
            costPerQuery: 0,
            fixedCost: 0,
            buildCost: 0
        },
        metrics: {},
        errors: [],
        lastUpdate: null
    };

    static initialize() {
        this.loadState();
        this.setupAutoSave();
    }

    static loadState() {
        const savedState = localStorage.getItem(this.LOCAL_STORAGE_KEY);
        if (savedState) {
            try {
                this.state = JSON.parse(savedState);
                this.notifyListeners();
            } catch (error) {
                console.error('Error loading saved state:', error);
            }
        }
    }

    static saveState() {
        try {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.state));
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }

    static setupAutoSave() {
        window.addEventListener('beforeunload', () => this.saveState());
    }

    static updateState(newState) {
        this.state = {
            ...this.state,
            ...newState,
            lastUpdate: new Date().toISOString()
        };
        this.notifyListeners();
        this.saveState();
    }

    static getState() {
        return this.state;
    }

    static resetState() {
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
        this.state = {
            inputs: {
                numberOfUsers: 0,
                timeSaved: 0,
                valuePerHour: 0,
                queriesPerDay: 0,
                workingDays: 20,
                costPerQuery: 0,
                fixedCost: 0,
                buildCost: 0
            },
            metrics: {},
            errors: [],
            lastUpdate: null
        };
        this.notifyListeners();
    }

    static listeners = [];

    static subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    static notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }
}