import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';
import {Table } from 'react-bootstrap';
import Form from 'react-jsonschema-form';

var moment = require('moment');

const schema = {
  title: "New Entry",
  type: "object",
  required: ["odometer", "volume", "octane", "cost"],
  properties: {
    odometer: {type: "number", title: "Odometer"},
    volume: {type: "number", title: "Volume"},
    octane: {
        type: "number",
        enum: [87, 89, 91, 94],
        enumNames: ["87", "89", "91", "94"],
        title: "Octane",
        default: 91
    },
    cost: {type: "number", title: "Cost"},
    fillUp: {type: "boolean", title: "Fill Up?", default: true},
    tireType: {
                type: "string", 
                enum: ["S", "W"],
                enumNames: ["S", "W"],
                title: "Tire Type",
                default: "W"
        }
  }
};

const log = (type) => console.log.bind(console, type);

@inject('gasLogStore') @observer
class GasLog extends React.Component {

    // [TODO] -- Should this really be here???  or should it be done when the vehicle is selected?
    componentDidMount() {
        const { gasLogStore } = this.props;
        if (gasLogStore.getGasLogs().length === 0) {
            this.fetchGasLogByVehicle(gasLogStore.getSelectedVehicle());
        }
    }

    fetchGasLogByVehicle(vehicleId) {
        actions.fetchGasLogByVehicle(vehicleId);
    }

    handleSubmitNewEntry = (obj) => {
        actions.addNewEntry(
            obj.formData.odometer, 
            obj.formData.volume, 
            obj.formData.octane,
            obj.formData.cost,
            obj.formData.fillUp,
            obj.formData.tireType
            );
    }

    render() {

        const { gasLogStore } = this.props;
        const calculatedLog = gasLogStore.getCalculatedLog();

        return (

            gasLogStore.isNewEntryMode() ? 
                <Form schema={schema}
                    onSubmit={this.handleSubmitNewEntry}
                    onError={log("errors")} /> :
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>(km)</th>
                                <th>(L)</th>
                                <th>Fill Up?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                gasLogStore.getGasLogs().map(
                                    (gasLog, idx) => 
                                        <tr key={idx}> 
                                            <td>{ dateFormat(gasLog.dateTime) }</td>
                                            <td>{ gasLog.odometer }</td>
                                            <td>{ gasLog.volume }</td>
                                            <td>{ gasLog.isFillUp ? "Y" : "N"}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>(km)</th>
                                <th>(L)</th>
                                <th>($)</th>
                                <th>(L/100km)</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                calculatedLog.map(
                                    (log, idx) => 
                                        <tr key={idx}> 
                                            <td>{ dateFormat(log.timestamp) }</td>
                                            <td>{ log.distance }</td>
                                            <td>{ log.volume }</td>
                                            <td>{ log.cost }</td>
                                            <td>{ log.efficiency}</td>
                                            
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
        );
    }

}
/*
cost:65.55
currentOdometer:5588
distance:451
efficiency:11.36319290465632
previousOdometer:5137
timestamp:1482516322301
tireType:"W"
volume:51.248
*/

function dateFormat(date) {
    var d = new Date(date);
    if (d.getFullYear() <= 2016 && d.getMonth() <= 2) return "n/a";
    return moment(date).format('MMM Do YYYY');
//    return d.toDateString();
}

export default GasLog;
