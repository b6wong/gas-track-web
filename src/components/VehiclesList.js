import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';
import {Table, Grid, Row, Col } from 'react-bootstrap';
import Form from 'react-jsonschema-form';
import Loading from 'react-loading';


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

    /*
    componentDidMount() {
        const { sessionStore } = this.props;
        this.fetchVehicles(sessionStore.getUserEmail());
    }
    */

    fetchVehicles() {
        actions.fetchVehicles();
    }

    handleSelectVehicle(vehicleId) {
        actions.selectVehicle(vehicleId);
    }

    handleSubmitNewVehicleEntry = (obj) => {
        console.log(obj);
        /*
        actions.addNewEntry(
            obj.formData.odometer, 
            obj.formData.volume, 
            obj.formData.octane,
            obj.formData.cost,
            obj.formData.fillUp,
            obj.formData.tireType
            );
        */
    }

    render() {

        const { gasLogStore } = this.props;
        
        if (gasLogStore.getNumberOfPendingRequests() > 0) {
            return (
                <Grid fluid={true}>
                    <Row>
                        <Col xs={5} md={5}></Col>
                        <Col md={2} xs={2}>
                            <Loading type='bubbles' color='#999999' />
                        </Col>
                        <Col xs={5} md={5}></Col>
                    </Row>
                </Grid>
            );
        }

/*
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
*/

        return (

            gasLogStore.isNewVehicleMode() ? 
                <Form schema={schema}
                    onSubmit={this.handleSubmitNewVehicleEntry}
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
