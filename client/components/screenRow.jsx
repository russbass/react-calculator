import React from 'react';

//This is the Screen row component it is written as a functional component.
// It recieves and displays (in an input field) a props (property) of value 
// from its parent component. 

const ScreenRow = (props) => {
  return (
    <div className="screen-row">
      <input type="text" readOnly value={props.value}/>
    </div>
  )
}

// we describe the props (property) that the parent element is required to pass
// into this component

ScreenRow.propTypes = {
  value: React.PropTypes.string.isRequired
}

export default ScreenRow;