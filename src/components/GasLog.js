import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { GasLogStore } from '../stores/gaslog-store';

const gasLogStore = new GasLogStore();

@observer
class GasLog extends Component {

    componentWillMount() {
       gasLogStore.loadGasLogs(1);
    }

    render() {
        return (
            <div>
                This is the GasLog Component
            </div>
        );
    }

}

export default GasLog;
