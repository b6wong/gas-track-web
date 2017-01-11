import { observable, action } from 'mobx';
import { forEach } from 'lodash';

class GasLogStore {

    @observable gasLogs;
    @observable vehicles;
    @observable selectedVehicle;
    @observable newEntryMode;
    @observable newVehicleMode;
    
    constructor() {
        this.gasLogs = [];
        this.vehicles = [];
        this.selectedVehicle = null;
        this.newEntryMode = false;
        this.newVehicleMode = false;
    }

    @action reset = () => {
        this.gasLogs = [];
        //this.vehicles = [];
        this.selectedVehicle = null;
        this.newEntryMode = false;
        this.newVehicleMode = false;
    }

    @action mergeGasLogs = (ids) => {
        forEach(ids, (id) => this.gasLogs.push(id));
    }

    @action mergeVehicles = (ids) => {
        forEach(ids, (id) => this.vehicles.push(id));
    }

    @action selectVehicle = (vehicleId) => {
        this.selectedVehicle = vehicleId;
    }

    @action toggleNewEntryMode = () => {
        this.newEntryMode = !this.newEntryMode;
    }

    @action toggleNewVehicleMode =() => {
        this.newVehicleMode = !this.newVehicleMode;
    }

    getGasLogs() {
        return this.gasLogs;
    }

    getVehicles() {
        return this.vehicles;
    }

    isVehicleSelected() {
        return this.selectedVehicle !== null;
    }

    getSelectedVehicle() {
        return this.selectedVehicle;
    }

    isNewEntryMode() {
        return this.newEntryMode;
    }

    isNewVehicleMode() {
        return this.newVehicleMode;
    }

    getCalculatedLog() {
        
        let calculatedLog = [];
        let calculatedEntry = null;
        let previousEntry = null;

        for (const entry of this.gasLogs) {
            if (!calculatedEntry) {
                calculatedEntry = {};
                calculatedEntry.timestamp = null;
                calculatedEntry.previousOdometer = 0;
                calculatedEntry.currentOdometer = 0;
                calculatedEntry.distance = 0;
                calculatedEntry.cost = 0;
                calculatedEntry.volume = 0;
                calculatedEntry.efficiency = 0;
                calculatedEntry.tireType = null;
                if (previousEntry) {
                    calculatedEntry.previousOdometer = previousEntry.currentOdometer;
                }
            }
            if (entry.isFillUp) {
                calculatedEntry.timestamp = entry.dateTime;
                calculatedEntry.distance += entry.odometer - calculatedEntry.previousOdometer;
                calculatedEntry.currentOdometer = entry.odometer;
                calculatedEntry.cost += entry.cost;
                calculatedEntry.volume += entry.volume;
                calculatedEntry.efficiency = (calculatedEntry.volume / calculatedEntry.distance) * 100;
                calculatedEntry.tireType = entry.tireType;
                calculatedEntry.efficiency = parseFloat(calculatedEntry.efficiency.toFixed(1));
                calculatedLog.push(calculatedEntry);
                previousEntry = calculatedEntry;
                calculatedEntry = null;
            } else {
                calculatedEntry.cost += entry.cost;
                calculatedEntry.volume += entry.volume;
            }
        }
        return calculatedLog;
    }

}

const gasLogStore = new GasLogStore();

export default gasLogStore;
export { GasLogStore };

