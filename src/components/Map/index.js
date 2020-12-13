import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useDataApi from '../../hooks/useDataApi';
import { boroughLegend } from '../../services/legend'
import DropDown from '../DropDown';
import Input from '../InputBox';
import Circles from './Circles';
import './styles.css';
import Neighborhood from '../BarChart/Neighborhood';
import { active } from 'd3';

const Map = (props) => {
  console.log('Map - props', props)
  const svgRef = useRef();
  const projRef = useRef(d3.geoMercator().center([-73.93, 40.72]).scale(57500));
  const pathRef = useRef();

  let [{ data }] = useDataApi(
    'https://raw.githubusercontent.com/jkeohan/D3-Tutorials/3f3e4fb52aea827455fd4cc7c4893eb37f58e411/nyc.counties.json',
    []
  );

  useEffect(() => {
    const height = svgRef.current.clientHeight;
    const width = svgRef.current.clientWidth;

    projRef.current = d3
      .geoMercator()
      .center([-73.93, 40.72])
      .scale(60000)
      .translate([width / 2, height / 2]);

    pathRef.current = d3.geoPath().projection(projRef.current);
  }, [data]);

  const fillColor = (neighborhood) => {
    console.log('Map - fillColor - neighborhood', neighborhood)
    if(props.activeParks.length < props.allParks.length){
      if(props.activeNeighborhood == neighborhood.properties.neighborhood) {
       return 'lightgreen';
      }
    } else {
      return boroughLegend(neighborhood.properties.borough);
    }
  }

  const renderChart = () => {
    const path = d3.geoPath().projection(projRef.current);
    return data[0].features.map((d, i) => {
      const featurePath = path(d);
      console.log('Map - renderChart - d', d)
      return (
				<path
					key={i}
					d={featurePath}
					className={d.properties.neighborhood}
          fill={boroughLegend(d.properties.borough)}
          // fillColor will remove color from all paths and turn the activeNeighborhood bgc green
          // this works when clicking on neighborhoods but not a single park
					// fill={fillColor(d)}
				/>
			);
    });
  };

  return (
    <div id="map">
      <svg id="boroughs-map" ref={svgRef}>
        {data.length && renderChart()}
        <Circles {...props} projection={projRef.current} />
      </svg>
      <article id="mapCountyToolTip"></article>
      <button onClick={() => props.dispatch({ type: 'RESET' })} id="reset">
        Reset
      </button>

      <div id="filters">
        <div id="court">
          <Input {...props} />
        </div>
        <div id="borough">
          <DropDown {...props} />
        </div>
      </div>
    </div>
  );
};

export default Map;
