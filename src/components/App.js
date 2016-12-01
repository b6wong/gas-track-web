import React from 'react';
import {observer, inject} from 'mobx-react';
import * as actions from '../actions/index';

import GasLog from './GasLog';
import VehiclesList from './VehiclesList';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';


@inject('gasLogStore') @observer
export default class App extends React.Component {

  render() {

    const { gasLogStore } = this.props;
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            Gas Log
          </Navbar.Header>
          <Navbar.Toggle />
          <Navbar.Collapse>
            { gasLogStore.isVehicleSelected() ? <LoggedMenu isNewEntryMode={ gasLogStore.isNewEntryMode() } /> : <div></div> }
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


const LoggedMenu = (props) => (
  <Nav pullRight>
      <NavItem onClick={handleReset}>Return to Main</NavItem>
      <NavItem onClick={handleAddEntry}>{ props.isNewEntryMode ? "Cancel New Entry" : "New Entry"}</NavItem>
  </Nav>
);

function handleReset() {
  actions.clearGasLog();
}

function handleAddEntry() {
  actions.toggleNewEntryMode();
}