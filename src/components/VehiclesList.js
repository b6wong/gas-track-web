import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

@inject('gasLogStore') @observer
class VehiclesList extends React.Component {

    componentDidMount() {
        this.fetchVehicles();
    }

    fetchVehicles() {
        actions.fetchVehicles();
    }

    handleCellClick(row, column, event) {
        actions.selectVehicleAtIndex(row);
    }

    render() {

        const { gasLogStore } = this.props;
        
        return (
            <Table
                selectable={false}
                onCellClick={this.handleCellClick}
            >
                <TableHeader
                    displayRowCheckbox={false}
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn>Id</TableHeaderColumn>
                        <TableHeaderColumn>Vehicle</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    stripedRows={true}
                >
                    {
                        gasLogStore.getVehicles().map(
                            (vehicle, idx) => 
                                <TableRow key={idx}> 
                                    <TableRowColumn>{ vehicle.id }</TableRowColumn>
                                    <TableRowColumn>{ vehicle.description }</TableRowColumn>
                                </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        );
    }

}

export default VehiclesList;
