import React from 'react';
import './styles.css';
// import { dispatch } from 'rxjs/internal/observable/range';

const Circle = ({color, left, park, dispatch}) => {
  console.log('Circle - park', park)
  const handleClick = (e) => {
    e.stopPropagation()
    dispatch({ type: 'FILTER_ACTIVE_PARK_MAP_ONLY', payload: { park } })
  }

  return (
    <div
    onClick={(e) => handleClick(e)}
    className="circle"
    style={{background: color, left: left}}
  ></div>
  )
}

export default Circle