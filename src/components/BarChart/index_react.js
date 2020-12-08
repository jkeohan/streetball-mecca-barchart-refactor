import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles.css';
import * as d3 from 'd3';
import XAxis from './XAxis';

let margin = { top: 20, left: 25 };

const BarChart = (props) => {
  console.log('BarChart - props', props);
  const [height, setHeight] = useState('');
  const svgRef = useRef();
  const xAxisRef = useRef();

  let yScale = d3.scaleBand().padding(0.1);
  let xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 1100 - margin.left]);

  // useCallback used as per Reacts advices after adding xAxis as dependency to useEffect
  let xAxis = useCallback(
    (g) =>
      g
        .attr('transform', 'translate(200,0)')
        .call(d3.axisBottom(xScale))
        .call((g) => {
          g.select('.domain').remove();
        }),
    [xScale]
  );

  useEffect(() => {
    d3.select(xAxisRef.current).style('font-size', 14).call(xAxis);
  }, [xAxis]);

  useEffect(() => {
    renderChart(props.nestedData);
    setHeight(props.nestedData.length * 28.75);
  }, [props.nestedData]);

  const renderChart = (data) => {
    console.log('BarChart - renderChart - data', data);
    let svgNeighborhoods = d3.select(svgRef.current);
    yScale.domain(data.map((d, i) => i)).range([0, data.length * 30.84]);
    data.sort((a, b) => {
      return d3.descending(+a.value.avg, +b.value.avg);
    });

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

    // CIRCLES
    neighborhood
      .selectAll('circle')
      .data((d) => d.value.parks)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(+d.overall) + 200)
      .attr('cy', (d, i) => yScale.bandwidth() / 2)
      .attr('r', 7)
      .attr('fill', (d) => d.color)
      .attr('stroke', 'black')
      .attr('class', (d, i) => `rect-circle parks park${d.id}`);
    // .on('mouseover', (e, d) => circleToolTip(e, d))
    // .on('mouseout', (e, d) => removeCircleToolTip(d));

    // UPDATE
    if (data.length === 1) {
      neighborhoods.attr('transform', (d, i) => `translate(0,${yScale(i)})`);
    } else {
      neighborhoods
        .transition()
        .duration(1000)
        .attr('transform', (d, i) => `translate(0,${yScale(i)})`);
    }

    // EXIT
    neighborhoods.exit().remove();

    d3.selectAll('svg.neighborhood').on('click', (e, d) => {
      console.log('svg.neighborhood - click - e,d', e.target, d);
      props.dispatch({
        type: 'FILTER_ACTIVE_NEIGHBORHOOD',
        payload: { neighborhood: d }
      });
      d3.selectAll('svg.neighborhood').style('background', 'none');
      d3.select(e.target.parentNode).style('background', 'beige');
      d3.select('#chart > div').style('background', 'none');
    });
  };

  return (
    <>
      <div id="axis">
        <XAxis />
        <svg style={{ height: '20px', width: '100%' }}>
          <g ref={xAxisRef} style={{ fontSize: '14px' }}></g>
        </svg>
      </div>
      <div id="chart">
        <svg style={svgStyles} ref={svgRef}></svg>
        {/* <div style={svgStyles} ref={svgRef}></div> */}
      </div>
    </>
  );
};

export default BarChart;
