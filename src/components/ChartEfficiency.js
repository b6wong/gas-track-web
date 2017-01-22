import React from 'react';
import { observer, inject } from 'mobx-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment';
//var moment = require('moment');

@inject('gasLogStore') @observer
class ChartEfficiency extends React.Component {

  render() {
    
    const { gasLogStore } = this.props;
    const chartData = gasLogStore.getCalculatedLog();

    return (
        <div>
            <h1 className="centerContent">Fuel Efficiency</h1>
            <h1 className="centerContent">(L/100km)</h1>
            <ShowChart chartData={chartData} />
        </div>
    );

  }
}

function ShowChart(props) {

  const {chartData} = props;

  const dateFormat = (time) => {
	return moment(time).format('MMM DD');
  };

  const renderTooltip = (props) => {
    const { payload } = props;
    if (payload[0] && payload[0].payload) {
      
      return (
        <div className="custom-tooltip">
          <p className="desc">{moment(payload[0].payload.timestamp).format('MMM Do YYYY')}</p>
          <p className="desc">{payload[0].payload.efficiency} L/100km</p>
        </div>
      );
    }
    return (
      <div></div>
    );
  }

  return (
    
    <ResponsiveContainer height={500}>
        <LineChart data={chartData}  >
            <XAxis dataKey="timestamp" tickFormatter={dateFormat}  />
            <YAxis width={20} />
            <Tooltip content={renderTooltip} />
            <Legend />
            <Line type="monotone" stroke="#8884d8" dataKey="efficiency" />
        </LineChart>
    </ResponsiveContainer>
    
  );
}

export default ChartEfficiency;
