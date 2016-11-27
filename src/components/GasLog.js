import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionOpacity from 'material-ui/svg-icons/action/opacity';
import {green500, red500} from 'material-ui/styles/colors';

@inject('gasLogStore') @observer
class GasLog extends React.Component {

    componentDidMount() {
        this.fetchGasLogByVehicle('111');
    }

    fetchGasLogByVehicle(vehicleId) {
        actions.fetchGasLogByVehicle(vehicleId);
    }

    render() {

        const { gasLogStore } = this.props;
        
        return (
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
