import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';
import {Grid, Row, Col } from 'react-bootstrap';
import Form from 'react-jsonschema-form';
import ChartEfficiency from './ChartEfficiency';

//var moment = require('moment');

const schema = {
  title: "New Entry",
  type: "object",
  required: ["odometer", "volume", "octane", "cost"],
  properties: {
    odometer: {type: "number", title: "Odometer"},
    volume: {type: "number", title: "Volume"},
    cost: {type: "number", title: "Cost"},
    octane: {
        type: "number",
        enum: [87, 89, 91, 94],
        enumNames: ["87", "89", "91", "94"],
        title: "Octane",
        default: 91
    },
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

        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={12} md={6} mdOffset={3}>
                    
                    <h1 className="centerContent">Fuel Efficiency</h1>
                    <h1 className="centerContent">(L/100km)</h1>
                    {
                        gasLogStore.isNewEntryMode() ? 
                        <Form schema={schema}
                            onSubmit={this.handleSubmitNewEntry}
                            onError={log("errors")} /> :
                        <ChartEfficiency />
                    }
                    </Col>
                </Row>
            </Grid>
        )

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

/*
function dateFormat(date) {
    var d = new Date(date);
    if (d.getFullYear() <= 2016 && d.getMonth() <= 2) return "n/a";
    return moment(date).format('MMM Do YYYY');
//    return d.toDateString();
}
*/

export default GasLog;


/*
 return (

            gasLogStore.isNewEntryMode() ? 
                <Form schema={schema}
                    onSubmit={this.handleSubmitNewEntry}
                    onError={log("errors")} /> :
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>(km)</th>
                                <th>(L)</th>
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
                                            <td>{ log.volume.toFixed(2) }</td>
                                            <td>{ log.efficiency.toFixed(1)}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
        );
        */