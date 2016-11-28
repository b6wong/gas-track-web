import React from 'react';
import {observer, inject} from 'mobx-react';
import * as actions from '../actions/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import GasLog from './GasLog';
import VehiclesList from './VehiclesList';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

@inject('gasLogStore') @observer
export default class App extends React.Component {

  render() {

    const { gasLogStore } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <ApplicationBar isVehicleSelected={gasLogStore.isVehicleSelected()} isNewEntryMode={gasLogStore.isNewEntryMode()} />
          {
            gasLogStore.isVehicleSelected() ? 
              <GasLog /> : 
              <VehiclesList />
          }
        </div>
      </MuiThemeProvider>
    );

  }
}

const ApplicationBar = (props) => (
  <AppBar 
    title="Gas Log" 
    iconElementRight={props.isVehicleSelected ? <Logged isNewEntryMode={props.isNewEntryMode} /> : <div></div>}
  />
);

const Logged = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Back to Vehicle Selection" onClick={handleReset} />
    <MenuItem primaryText={ props.isNewEntryMode ? "Cancel New Entry" : "New Entry"} onClick={handleAddEntry} />
  </IconMenu>
);

function handleReset() {
  actions.clearGasLog();
}

function handleAddEntry() {
  actions.toggleNewEntryMode();
}