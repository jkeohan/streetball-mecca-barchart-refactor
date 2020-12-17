import React, {useState, useEffect} from 'react';
import './styles.css';
import ToolTip from './ToolTip'

const Bar = ({ width,neighborhood,activeNeighborhood }) => {
    console.log('Bar - neighborhood', neighborhood, activeNeighborhood)
    const [toolTip, setToolTip] = useState(null)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {

    }, [isActive])

    const handleMouseOut = () => {
        setIsActive(false)
    }

    const handleMouseOver = (e) => {
        // let top = e.pageY - 60;
        // let left = e.pageX;
        // let top = e.clientY 
        // let left = e.clientX 
        let top = e.nativeEvent.offsetY - 60
        let left = e.nativeEvent.offsetX 
        // let top = e.screenY;
        // let left = e.screenX;
        console.log('handleToolTip - tooltip', e, top, left, e.target)
   
        setIsActive(true)
        setToolTip({top,left})
        // d3.select('.title').text(d.key);
        // d3.select('.avg').text(
        //   `Avg. Overall Rating: ${Math.floor(d.value.avg)}/100`
        // );
        // tooltip
        //   .style('top', top + 20 + 'px')
        //   .style('left', left + 'px')
        //   .style('opacity', 1)
        //   .style('display', 'block');
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