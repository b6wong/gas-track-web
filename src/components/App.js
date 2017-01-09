import React from 'react';
import {observer, inject} from 'mobx-react';
import * as actions from '../actions/index';
import GasLog from './GasLog';
import VehiclesList from './VehiclesList';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {Grid, Row, Col } from 'react-bootstrap';
import Loading from 'react-loading';

@inject('gasLogStore', 'sessionStore') @observer
export default class App extends React.Component {

  render() {

    const { gasLogStore, sessionStore } = this.props;

    return (

      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              Gas Log - {sessionStore.getUserName()}
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <CustomMenu 
              isVehicleSelected={gasLogStore.isVehicleSelected()}  
              isNewEntryMode={gasLogStore.isNewEntryMode()}
              isNewVehicleMode={gasLogStore.isNewVehicleMode()}
              isLoggedIn={sessionStore.loggedIn()}  
            /> 
          </Navbar.Collapse>
        </Navbar>
        <CustomContent
          numberOfPendingRequests={sessionStore.getNumberOfPendingRequests()}
          isVehicleSelected={gasLogStore.isVehicleSelected()}
        />
      </div>

    );

  }
}

function CustomMenu(props) {
  if (props.isVehicleSelected) {
    return (
      <Nav pullRight>
        <NavItem onClick={handleReset}>Return to Main</NavItem>
        <NavItem onClick={handleAddEntry}>{ props.isNewEntryMode ? "Cancel New Entry" : "New Entry"}</NavItem>
        { props.isLoggedIn ? <NavItem onClick={handleLogout}>Logout</NavItem> : <NavItem onClick={handleLogout}>Sign In</NavItem> }
      </Nav>
    );
  } else {
    return (
      <Nav pullRight>
        <NavItem onClick={handleAddVehicle}>{ props.isNewVehicleMode ? "Canel New Vehicle" : "New Vehicle"}</NavItem>
        { props.isLoggedIn ? <NavItem onClick={handleLogout}>Logout</NavItem> : <NavItem onClick={handleLogout}>Sign In</NavItem> }
      </Nav>
    );
  }
}

function CustomContent(props) {
  const { numberOfPendingRequests, isVehicleSelected } = props;
        
  if (numberOfPendingRequests > 0) {
      return (
          <Grid fluid={true}>
              <Row>
                  <Col md={2} xs={2} mdOffset={5} xsOffset={5}>
                      <Loading type='bubbles' color='#999999' />
                  </Col>
              </Row>
          </Grid>
      );
  }

  if (isVehicleSelected) {
    return <GasLog />;
  } else {
    return <VehiclesList />;
  }

}


function handleReset() {
  actions.clearGasLog();
}

function handleAddEntry() {
  actions.toggleNewEntryMode();
}

function handleAddVehicle() {
  actions.toggleNewVehicleMode();
}

function handleLogout() {
  actions.logout();
}
