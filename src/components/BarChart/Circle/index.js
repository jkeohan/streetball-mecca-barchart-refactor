import React, { useState } from 'react';
import './styles.css';
import ToolTip from './ToolTip'
// import { dispatch } from 'rxjs/internal/observable/range';

const Circle = ({ color, left, park, dispatch }) => {
  const [toolTip, setToolTip] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleMouseOut = () => {
    setIsActive(false);
  };

  const handleMouseOver = (e) => {
    console.log('e.pageX', e.clientX, e.pageX, e.nativeEvent.offsetX, e.screenX)
    let top = e.nativeEvent.offsetY - 90;
    // let top = e.nativeEvent.offsetY - 60;
    let left = e.clientX - 500;

    setIsActive(true);
    setToolTip({ top, left });
  };

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch({ type: 'FILTER_ACTIVE_PARK_MAP_ONLY', payload: { park } });
  };

  return (
    <>
      <div
        onClick={(e) => handleClick(e)}
        onMouseMove={(e) => handleMouseOver(e)}
        onMouseOut={() => handleMouseOut()}
        className="circle"
        style={{ background: color, left: left }}
      ></div>
      { isActive && <ToolTip coords={toolTip} park={park}/> }
    </>
  );
};

export default Circle;
