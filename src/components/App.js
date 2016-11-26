import React from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import GasLog from './GasLog';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

@observer
export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <GasLog />
      </MuiThemeProvider>
    );
  }
}
