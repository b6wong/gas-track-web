//import React from 'react';
import * as superagent from 'superagent';
import { observable, computed, action } from 'mobx';

class GasLog {
    @observable gasLogId;
    @observable vehicleId;
    @observable odometer;
    @observable volume;
    @observable octane;
    @observable cost;
    @observable dateTime;

    constructor(gasLogId, vehicleId, odometer, volume, octane, cost, dateTime) {
        this.gasLogId = gasLogId;
        this.vehicleId = vehicleId;
        this.odometer = odometer;
        this.volume = volume;
        this.octane = octane;
        this.cost = cost;
        this.dateTime = dateTime;
    }

    @computed get asJSON() {
		return {
			id: this.gasLogId,
			vehicleId: this.vehicleId,
			odometer: this.odometer,
            volume: this.volume,
            octane: this.octane,
            cost: this.cost,
            dateTime: this.dateTime
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
 