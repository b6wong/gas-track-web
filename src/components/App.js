import React from 'react';
import {observer, inject} from 'mobx-react';
import * as actions from '../actions/index';
import GasLog from './GasLog';
import VehiclesList from './VehiclesList';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
              isLoggedIn={sessionStore.loggedIn()}  
            /> 
          </Navbar.Collapse>
        </Navbar>
        {
          gasLogStore.isVehicleSelected() ?
            <GasLog /> :
            <VehiclesList />
        }
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
        { props.isLoggedIn ? <NavItem onClick={handleLogout}>Logout</NavItem> : <NavItem onClick={handleLogout}>Sign In</NavItem> }
      </Nav>
    );
  }
}


function handleReset() {
  actions.clearGasLog();
}

function handleAddEntry() {
  actions.toggleNewEntryMode();
}

function handleLogout() {
  actions.logout();
}
