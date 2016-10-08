//import React from 'react';
import * as superagent from 'superagent';
import { observable, computed, action } from 'mobx';

class GasLog {
    @observable gasLogId;
    @observable vehicleId;
    @observable odometer;
    @observable volume;
    @observable cost;

    constructor(gasLogId, vehicleId, odometer, volume, cost) {
        this.gasLogId = gasLogId;
        this.vehicleId = vehicleId;
        this.odometer = odometer;
        this.volume = volume;
        this.cost = cost;
    }

    @computed get asJSON() {
		return {
			id: this.gasLogId,
			vehicleId: this.vehicleId,
			odometer: this.odometer,
            volume: this.volume,
            cost: this.cost
		}
	}

}

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
                        const gasLog = new GasLog(gasLogData.id, gasLogData.vehicleId, gasLogData.odometer, gasLogData.volume, gasLogData.cost);
                        this.gasLogs = this.gasLogs.concat(gasLog);
                    }
				}
				this.hasLoadedInitialData = true;
			}))
	}

}
 