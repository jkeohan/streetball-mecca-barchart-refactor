import React from 'react';
import * as d3 from 'd3';
import './styles.css';
import Neighborhood from '../Neighborhood'

const Neighborhoods = props => {
  console.log('Neighborhoods - props', props)
  const data = props.nestedData.sort((a, b) => 
    d3.descending(+a.value.avg, +b.value.avg))
  const m = data.map( (d,i) => { 
    console.log('Neighborhoods - data.map -d ', d)
     const width = props.xScale(d.value.avg)
     return <Neighborhood 
      width={width} {...d} 
      title={d.key}
      key={i}
    />
  })
  return (
    <div id="neighborhoods">
     {/* <Neighborhood {...props} /> */}
      {m}
    </div>
  )
}

export default Neighborhoods
