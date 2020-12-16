import React from 'react';
import './styles.css';
import Neighborhood from '../Neighborhood';

const Neighborhoods = ({
  nestedData,
  dispatch,
  activeNeighborhood,
  xScale
}) => {

  const neighborhoods = nestedData.map((d, i) => {
    return (
      <Neighborhood
        key={i}
        title={d.key}
        parks={d.value.parks}
        width={xScale(d.value.avg)}
        xScale={xScale}
        neighborhood={d}
        dispatch={dispatch}
        activeNeighborhood={activeNeighborhood}
      />
    );
  });
  
  return <div id="neighborhoods">{neighborhoods}</div>;
};

export default Neighborhoods;
