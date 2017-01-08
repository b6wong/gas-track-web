import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';
import {Table } from 'react-bootstrap';
import Form from 'react-jsonschema-form';

const schema = {
  title: "New Vehicle",
  type: "object",
  required: ["vehicleName", "odometer"],
  properties: {
    vehicleName: {type: "string", title: "Vehicle Name"},
    odometer: {type: "number", title: "Odometer"}
  }
};

const log = (type) => console.log.bind(console, type);

@inject('gasLogStore', 'sessionStore') @observer
class VehiclesList extends React.Component {

    fetchVehicles() {
        actions.fetchVehicles();
    }

    handleSelectVehicle(vehicleId) {
        actions.selectVehicle(vehicleId);
    }

    handleSubmitNewVehicle = (obj) => {
        actions.addNewVehicle(
            obj.formData.vehicleName,
            obj.formData.odometer
            );
    }

    render() {

        const { gasLogStore } = this.props;
        
        return (

            gasLogStore.isNewVehicleMode() ? 
                <Form schema={schema}
                    onSubmit={this.handleSubmitNewVehicle}
                    onError={log("errors")} /> :
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
