import React from 'react';
import * as d3 from 'd3';
import './styles.css';
import Neighborhood from '../Neighborhood'
let margin = { left: 25 };

const Neighborhoods = ({nestedData}) => {
  let xScale = d3.scaleLinear().domain([0, 100])
  .range([0, 1100 - margin.left]);

  const data = nestedData.sort((a, b) => 
    d3.descending(+a.value.avg, +b.value.avg))

  const neighborhoods = data.map( (d,i) => { 
     const width = xScale(d.value.avg)
     return <Neighborhood 
      {...d} 
      key={i}
      width={width} 
      title={d.key}
      xScale={xScale}
    />
  })
  return (
    <div id="neighborhoods">
      {neighborhoods}
    </div>
  )
}

export default Neighborhoods
