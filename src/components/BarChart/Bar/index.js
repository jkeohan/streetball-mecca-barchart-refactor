import React, {useState} from 'react';
import './styles.css';
import ToolTip from './ToolTip/index'

const Bar = ({ width,neighborhood,activeNeighborhood }) => {
    console.log('Bar - neighborhood', neighborhood, activeNeighborhood)
    const [toolTip, setToolTip] = useState(null)
    const [isActive, setIsActive] = useState(false)

    const handleMouseOut = () => {
        setIsActive(false)
    }

    const handleMouseOver = (e) => {
        let top = e.nativeEvent.offsetY - 60
        let left = e.nativeEvent.offsetX 
   
        setIsActive(true)
        setToolTip({top,left})
      }

    return (
    <>
        <div 
            className="bar"
            style={{ width: width }} 
            onMouseMove={(e) => handleMouseOver(e)}
            onMouseOut={() => handleMouseOut()}
        ></div>
        { isActive && <ToolTip coords={toolTip} neighborhood={neighborhood}/> }
      </>
    )
}


export default Bar 