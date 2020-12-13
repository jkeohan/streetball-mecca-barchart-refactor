import React from 'react';
import ParkByRating from '../ParkByRating'
import ParkFilters from '../ParkFilters'
import { circleLegend } from '../../../services/legend'
import './styles.css';

const ParksByRating = ({
    topParks, 
    activeRating,
    dispatch
  }) => {
  
  const parkFilters = circleLegend.domain().map((d, i) => {
    return (
      <ParkFilters
        name={d}
        color={circleLegend(d)}
        activeRating={activeRating}
        // onClick={() => dispatch({type: 'FILTER_PARK_RATING' , payload: {rating: d}})}
        dispatch={dispatch}
        className={d.toLocaleLowerCase()} key={i}>
        {d}
      </ParkFilters>
    );
  });
  
  const renderParks = topParks.map( (d,i) => {
    return <ParkByRating 
     dispatch={dispatch}
     key={i} park={d} 
     active={d.active}
    />
  })

  return (
   <>
      <div className="park-rating_filters"> {parkFilters} </div>
      <ul> {renderParks}  </ul>
    </>
  )
};

export default ParksByRating;
