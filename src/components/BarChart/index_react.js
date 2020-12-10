import React from 'react';
import './styles.css';
import XAxis from './XAxis';
import Neighborhoods from './Neighborhoods'

const BarChart = (props) => {
  console.log('BarChart - props', props)
  return (
    <>
      <div id="axis">
        <XAxis />
      </div>
      <div id="chart">
        <Neighborhoods {...props} />
      </div>
    </>
  );
};

export default BarChart;
