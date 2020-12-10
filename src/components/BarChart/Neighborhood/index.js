import React, {useState, useEffect} from 'react';
import './styles.css';
import Bar from '../Bar'
import Circle from '../Circle'

const Neighborhood = ({
    value, width, xScale, title, dispatch, d, activeNeighborhood}) => {
  // console.log('Neighborhood - activeNeighborhood', activeNeighborhood)
  const [active, setActive] = useState(false)

  useEffect(() => {
    activeNeighborhood === title ? setActive(true) : setActive(false)
  },[activeNeighborhood, title])

  const color = value.parks[0].boroughColor;
  
  const circles = value.parks.map((d, i) => {
    const position = xScale(+d.overall) - 6;
    return (
      <Circle 
        key={i}
        color={d.color} 
        left={position}/>
    );
  });

  const style = {
    background: active ? 'lightyellow' : ''
  }

  const handleClick = () => {
    dispatch({
      type: 'FILTER_ACTIVE_NEIGHBORHOOD',
      payload: { neighborhood: d }
    })
    // setActive(true)
  }

  return (
    <div 
      className="neighborhood"
      style={style}
      onClick={() => handleClick()}
    >
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
