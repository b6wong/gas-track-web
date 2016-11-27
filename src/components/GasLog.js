import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionOpacity from 'material-ui/svg-icons/action/opacity';
import {green500, red500} from 'material-ui/styles/colors';

import Form from 'react-jsonschema-form';


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
    fillUp: {type: "boolean", title: "Fill Up?", default: true}
  }
};

const log = (type) => console.log.bind(console, type);

@inject('gasLogStore') @observer
class GasLog extends React.Component {

    componentDidMount() {
        const { gasLogStore } = this.props;
        this.fetchGasLogByVehicle(gasLogStore.getSelectedVehicle());
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
            obj.formData.fillUp
            );
    }

    render() {

        const { gasLogStore } = this.props;
        
        return (

            gasLogStore.isNewEntryMode() ? 
                <Form schema={schema}
                    onSubmit={this.handleSubmitNewEntry}
                    onError={log("errors")} /> :
                <Table
                    selectable={false}
                >
                    <TableHeader
                        displayRowCheckbox={false}
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn>Date</TableHeaderColumn>
                            <TableHeaderColumn>Odometer (km)</TableHeaderColumn>
                            <TableHeaderColumn>Volume (L)</TableHeaderColumn>
                            <TableHeaderColumn>Octane</TableHeaderColumn>
                            <TableHeaderColumn>Cost</TableHeaderColumn>
                            <TableHeaderColumn>Fill Up?</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        stripedRows={true}
                    >
                        {
                            gasLogStore.getGasLogs().map(
                                (gasLog, idx) => 
                                    <TableRow key={idx}> 
                                        <TableRowColumn>{ dateFormat(gasLog.dateTime) }</TableRowColumn>
                                        <TableRowColumn>{ gasLog.odometer }</TableRowColumn>
                                        <TableRowColumn>{ gasLog.volume }</TableRowColumn>
                                        <TableRowColumn>{ gasLog.octane }</TableRowColumn>
                                        <TableRowColumn>{ gasLog.cost }</TableRowColumn>
                                        <TableRowColumn>{ gasLog.isFillUp ? <ActionDone color={green500} /> : <ActionOpacity color={red500} />}</TableRowColumn>
                                    </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
        );
    }

}

function dateFormat(date) {
    var d = new Date(date);
    if (d.getFullYear() <= 2016 && d.getMonth() <= 2) return "n/a";
    return d.toDateString();
}



export default GasLog;


/*
<Dialog repositionOnUpdate={false}
                autoDetectWindowHeight={false}
                modal={false}
                open={true}
                contentStyle={{width: '100%', transform: 'translate(0, 0)'}}
                bodyStyle={{padding: 0}}
                style={{paddingTop: 0, height: '100vh'}}
        >
*/