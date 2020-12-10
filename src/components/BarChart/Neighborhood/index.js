import React from 'react';
import './styles.css';
import Bar from '../Bar'
import Circle from '../Circle'

const Neighborhood = ({value, width, xScale, title}) => {
  const color = value.parks[0].boroughColor;
  
  const circles = value.parks.map((d, i) => {
    const position = xScale(+d.overall) - 6;
    return (
      <Circle color={d.color} left={position}/>
    );
  });

  return (
    <div class="neighborhood">
      <div style={{ color: color }} className="title">
        {title}
      </div>
      <div className="bar-group">
        <Bar width={width}/>
        {circles}
      </div>
    </div>
  );
};

export default Neighborhood;
