import { observable, action } from 'mobx';
import { forEach } from 'lodash';

class GasLogStore {

    @observable gasLogs;
    @observable vehicles;
    @observable selectedVehicle;
    @observable newEntryMode;
    @observable numberOfPendingRequests;
    
    constructor() {
        this.gasLogs = [];
        this.vehicles = [];
        this.selectedVehicle = null;
        this.newEntryMode = false;
        this.numberOfPendingRequests = 0;
    }

    @action reset = () => {
        this.gasLogs = [];
        //this.vehicles = [];
        this.selectedVehicle = null;
        this.newEntryMode = false;
        this.numberOfPendingRequests = 0;
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

    @action startRequest = () => {
        this.numberOfPendingRequests++;
    }

    @action finishRequest = () => {
        if (this.numberOfPendingRequests > 0){
            this.numberOfPendingRequests--;
        }
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

    getNumberOfPendingRequests() {
        return this.numberOfPendingRequests;
    }

}

const gasLogStore = new GasLogStore();

export default gasLogStore;
export { GasLogStore };

