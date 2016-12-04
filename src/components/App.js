import React from 'react';
import {observer, inject} from 'mobx-react';
import * as actions from '../actions/index';

import GasLog from './GasLog';
import VehiclesList from './VehiclesList';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Loading from 'react-loading';

//import 'bootstrap/dist/css/bootstrap.css';


@inject('gasLogStore') @observer
export default class App extends React.Component {

  render() {

    const { gasLogStore } = this.props;

   
    if (gasLogStore.getNumberOfPendingRequests() > 0) return <Loading type='bubbles' color='#999999' height={500} width={500} />;

    return (

      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              Gas Log
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
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