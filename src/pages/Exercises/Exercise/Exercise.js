import React from 'react';
import './Exercise.scss';
import PropTypes from 'prop-types';


const Exercise = ({element}) => {
	
	return (
		<div className='exercise-card'>
			<h2>{element.exerciseName}</h2>
			<div>{element.video}</div>
			<p>{element.description}</p>
			<form>
				<input type='text' placeholder='Reps'></input>
				<input type='text' placeholder='Sets'></input>
				<button>Add to your workout</button>
			</form>
		</div>
	);
};
Exercise.propTypes = {
	element: PropTypes.object,
};
export default Exercise;
