import { observable, action } from 'mobx';
import { forEach } from 'lodash';

class GasLogStore {

    @observable gasLogs;
    @observable vehicles;
    @observable selectedVehicle;
    @observable newEntryMode;
    
    constructor() {
        this.gasLogs = [];
        this.vehicles = [];
        this.selectedVehicle = null;
        this.newEntryMode = false;
    }

    @action reset = () => {
        this.gasLogs = [];
        this.vehicles = [];
        this.selectedVehicle = null;
        this.newEntryMode = false;
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

}

const gasLogStore = new GasLogStore();

export default gasLogStore;
export { GasLogStore };

