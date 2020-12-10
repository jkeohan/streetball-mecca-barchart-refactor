import React from 'react';
import './styles.css';

const Bar = ({width}) => {
  return (
    <div style={{ width: width }} className="bar"></div>
  )
}

export default Bar