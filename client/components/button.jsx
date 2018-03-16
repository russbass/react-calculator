import React from 'react'; // imports react

// create our Button component as a functional component

const Button = (props) => {
  return (
    <input
      type="button"
      className={props.type === 'action' ? 'button action-button' : 'button-input-button'}
      onClick={props.handleClick}
      value={props.label}
      />
  );
}

// describe the expected pop types

Button.propTypes = {
  type: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired
}

//Now we Export the button Component.
export default Button;