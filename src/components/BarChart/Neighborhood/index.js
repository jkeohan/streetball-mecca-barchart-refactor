import React from 'react';
import * as d3 from 'd3';
import './styles.css';

const Neighborhood = (props) => {
  console.log('Neighborhood - props', props);
  const color = props.value.parks[0].boroughColor;
  const width = props.width
  return (
    <div class="neighborhood">
      <div style={{ color: color }} className="title">
        {props.title}
      </div>
      <div className="bar-group">
        <div 
          style={{width: width}}
          className="bar">
        </div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Neighborhood;
