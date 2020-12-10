import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles.css';
import * as d3 from 'd3';
import XAxis from './XAxis';
import Neighborhoods from './Neighborhoods'

let margin = { top: 20, left: 25 };

const BarChart = (props) => {
  console.log('BarChart - props', props);
  const [height, setHeight] = useState('');
  const svgRef = useRef();
  const xAxisRef = useRef();

  let yScale = d3.scaleBand().padding(0.1);
  let xScale = d3.scaleLinear().domain([0, 100])
    .range([0, 1100 - margin.left]);

  useEffect(() => {
    renderChart(props.nestedData.sort(
      (a, b) => d3.descending(+a.value.avg, +b.value.avg)
    ));
    // setHeight(props.nestedData.length * 28.75);
  }, [props.nestedData]);

  const renderChart = (data) => {
    // console.log('BarChart - renderChart - data', data);
    let svgNeighborhoods = d3.select(svgRef.current);
    yScale.domain(data.map((d, i) => i)).range([0, data.length * 30.84]);
    // data.sort((a, b) => {
    //   return d3.descending(+a.value.avg, +b.value.avg);
    // });

    let neighborhoods = svgNeighborhoods
      .selectAll('g.neighborhood')
      .data(data, (d) => d.key);

    const neighborhood = neighborhoods
      .enter()
      .append('g')
      .attr('height', '28.84px')
      .classed('neighborhood', true)
      .attr('id', (d) => d.value.NTA)
      .attr('transform', (d, i) => `translate(0,${yScale(i)})`)
      .attr('opacity', 0);

    neighborhood
      .transition()
      .duration(1000)
      .attr('transform', (d, i) => `translate(0,${yScale(i)})`)
      .attr('opacity', 1);

    // LABEL TEXT
    neighborhood
      .append('text')
      .text((d) => d.key)
      .attr('dy', '1.2em')
      .attr('class', (d) => {
        return `barText ${d.key}`;
      })
      .attr('fill', (d) => d.value.parks[0].boroughColor);

    // BARS
    neighborhood
      .append('rect')
      .attr('x', 200)
      .attr('width', (d) => xScale(d.value.avg))
      // .attr("height", yScale.bandwidth())
      .attr('height', '28.84px')
      .style('fill', '#d4d1d1')
      .attr('class', (d) => `${d.key}`);
    // .on('mousemove', (e, d) => rectToolTip(e, d))
    // .on('mouseout', (e, d) => removeRectToolTip(e, d));
  };// end renderChart

  return (
    <>
      <div id="axis">
        <XAxis />
      </div>
      <div id="chart">
        <Neighborhoods xScale={xScale}{...props} />
        {/* <svg ref={svgRef}></svg> */}
      </div>
    </>
  );
};

export default BarChart;
