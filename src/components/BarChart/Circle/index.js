import React from 'react';
import './styles.css';

const Circle = ({color, left}) => {
  return (
    <div
    className="circle"
    style={{background: color, left: left}}
  ></div>
  )
}

export default Circle