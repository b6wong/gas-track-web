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

    @action selectVehicleAtIndex = (index) => {
        this.selectedVehicle = this.vehicles[index].id ? this.vehicles[index].id : null;
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



/*
     gasLogId;
     vehicleId;
     odometer;
     volume;
     octane;
     cost;
     dateTime;
*/

/*
export class GasLogStore {
    @observable gasLogs = [];
    @observable selectedVehicleId = '';
    @observable pendingRequestCount = 0;
    @observable hasLoadedInitialData = false;

    @computed get isLoading() {
		return this.pendingRequestCount > 0;
	}
    
	@action loadGasLogs(gasLogId) {
        //.get('//gas-track-server.herokuapp.com/gasLogs/' + gasLogId)
		superagent
			.get('//gas-track-server.herokuapp.com/gasLogs')
			.set('Accept', 'application/json')
			.end(action("loadGasLogs-callback", (error, results) => {
				if (error)
					console.error(error);
				else {
                    console.log(results.text);
					const data = JSON.parse(results.text);
                    for (const gasLogData of data) {
                        const gasLog = new GasLog(gasLogData.id, gasLogData.vehicleId, gasLogData.odometer, gasLogData.volume, gasLogData.octane, gasLogData.cost, gasLogData.dateTime);
                        this.gasLogs = this.gasLogs.concat(gasLog);
                    }
				}
				this.hasLoadedInitialData = true;
			}))
	}

    @action addGasLogEntry(gasLogData) {
        const gasLogEntry = new GasLog(gasLogData.id, gasLogData.vehicleId, gasLogData.odometer, gasLogData.volume, gasLogData.octane, gasLogData.cost, gasLogData.dateTime);
        superagent
            .post('//gas-track-server.herokuapp.com/gasLog')
            .set('Accept', 'application/json')
            .send(gasLogEntry.asJSON)
            .end(action("addGasLogEntry-callback", (error, results) => {
                if (error)
                    console.error(error);
                else {
                    this.gasLogs = this.gasLogs.concat(gasLogEntry);
                }
            }))
    }

}
*/
 