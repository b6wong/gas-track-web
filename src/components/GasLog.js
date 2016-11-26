import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';

@inject('gasLogStore') @observer
class GasLog extends React.Component {

    constructor(props) {
        super(props);
        this.fetchGasLogByVehicle = this.fetchGasLogByVehicle.bind(this);
    }

    componentDidMount() {
        this.fetchGasLogByVehicle('111');
    }

    fetchGasLogByVehicle(vehicleId) {
        actions.fetchGasLogByVehicle(vehicleId);
    }

    render() {

        const { gasLogStore } = this.props;
        
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Odometer</th>
                            <th>Volume</th>
                            <th>Octane</th>
                            <th>Cost</th>
                            <th>Fill Up</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        gasLogStore.getGasLogs().map(
                            (gasLog, idx) => 
                                <tr key={idx}> 
                                    <td>{ gasLog.dateTime }</td>
                                    <td>{ gasLog.odometer }</td>
                                    <td>{ gasLog.volume }</td>
                                    <td>{ gasLog.octane }</td>
                                    <td>{ gasLog.cost }</td>
                                    <td>{ gasLog.isFillUp }</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>

            </div>
        );
    }

}

export default GasLog;


/*

@observer
class GasLog extends Component {

    componentWillMount() {
       gasLogStore.loadGasLogs(1);
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Odometer</th>
                            <th>Volume</th>
                            <th>Octane</th>
                            <th>Cost</th>
                            <th>Fill Up</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        gasLogStore.gasLogs.map(
                            (gasLog, idx) => 
                                <tr key={idx}> 
                                    <td>{ gasLog.dateTime }</td>
                                    <td>{ gasLog.odometer }</td>
                                    <td>{ gasLog.volume }</td>
                                    <td>{ gasLog.octane }</td>
                                    <td>{ gasLog.cost }</td>
                                    <td>{ gasLog.isFillUp }</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                
                <input type="text" placeholder="odometer" onChange={ this.onChangeOdometer } />
                <input type="text" placeholder="volume" onChange={ this.onChangeVolume } />
                <input type="text" placeholder="cost" onChange={ this.onChangeCost } />
                <button onClick={ this.onNewEntry }>New Entry</button>

            </div>
        );
    }

    onNewEntry = () => {
        console.log("Add new entry!");
        newGasLog.id = 1; //Hardcoding to 1 -- need it to auto increment
        newGasLog.dateTime = Date.now();
        newGasLog.isFillUp = true;
        newGasLog.octane = 91;
        newGasLog.vehicleId = 1;
        gasLogStore.addGasLogEntry(newGasLog);
        newGasLog = { 
            "id": "",
            "vehicleId": "",
            "odometer": "",
            "volume": "",
            "octane": "",
            "cost": "",
            "isFillUp": "",
            "dateTime": ""
        };
    }

    onChangeOdometer = (event) => {
        newGasLog.odometer = event.target.value;
    }

    onChangeVolume = (event) => {
        newGasLog.volume = event.target.value;
    }

    onChangeCost = (event) => {
        newGasLog.cost = event.target.value;
    }

}

export default GasLog;

*/