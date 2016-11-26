import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionOpacity from 'material-ui/svg-icons/action/opacity';

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
                                    <TableRowColumn>{ gasLog.dateTime }</TableRowColumn>
                                    <TableRowColumn>{ gasLog.odometer }</TableRowColumn>
                                    <TableRowColumn>{ gasLog.volume }</TableRowColumn>
                                    <TableRowColumn>{ gasLog.octane }</TableRowColumn>
                                    <TableRowColumn>{ gasLog.cost }</TableRowColumn>
                                    <TableRowColumn>{ gasLog.isFillUp ? <ActionDone /> : <ActionOpacity />}</TableRowColumn>
                                </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        );
    }

}

export default GasLog;
