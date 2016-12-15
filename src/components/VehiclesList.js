import React from 'react';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions/index';
import {Table, Grid, Row, Col } from 'react-bootstrap';
import Loading from 'react-loading';

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
