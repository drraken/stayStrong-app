/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

function FormErrorsProducts(props) {
  if (props.formerrors && (props.formerrors.blankfield) ) {
    return (
      <div className='error container no-border help'>
        <div className='help'>
          {props.formerrors.blankfield ? 'Required fields are missing' : ''}
        </div>
      </div>
    );
  } else if (props.formerrors && (props.formerrors.invalidFormat) ){
    return (
      <div className='error container no-border help'>
        <div className='help'>
          {props.formerrors.invalidFormat ? 'Invalid format only numbers, dots and commas allowed' : ''}
        </div>
      </div>
    );
  } else if(props.formerrors && (props.formerrors.invalidSum)){
    return(
    <div className='error container no-border help'>
      <div className='help'>
        {props.formerrors.invalidSum ? 'Sum of macronutrient is not equal to kcal' : ''}
      </div>
    </div>
    )
  }
  else {
    return <div />;
  }
}

export default FormErrorsProducts;