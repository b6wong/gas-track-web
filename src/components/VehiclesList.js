import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';
import {Table } from 'react-bootstrap';

@inject('gasLogStore') @observer
class VehiclesList extends React.Component {

    componentDidMount() {
        this.fetchVehicles();
    }

    fetchVehicles() {
        actions.fetchVehicles();
    }

    handleSelectVehicle(vehicleId) {
        actions.selectVehicle(vehicleId);
    }

    render() {

        const { gasLogStore } = this.props;
        
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Vehicle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gasLogStore.getVehicles().map(
                            (vehicle, idx) => 
                                <tr key={idx} data-href={idx} onClick={() => this.handleSelectVehicle(vehicle.id)}> 
                                    <td>{ vehicle.id }</td>
                                    <td>{ vehicle.description }</td>
                                </tr>
                        )
                    }
                </tbody>
            </Table>
        );
    }

}

export default VehiclesList;
