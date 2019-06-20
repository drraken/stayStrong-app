import React from 'react';
import Exercise from './Exercise/Exercise';
import './Exercises.scss';
import exercisesData from './exercisesData';

const Exercises = () => {
	let listExercises = '';

	listExercises = Object.keys(exercisesData).map(excercise => (
		<li key={exercisesData[excercise].exerciseID}>
			<Exercise element={exercisesData[excercise]} />
		</li>
	));
	return (
		<div className="exercises-view">
			<p>Here you can find excersises and add it to your workout!</p>
			<p>Also you can find here video how to make it properly!</p>
			<div className='search-box'>Find exercise...</div>
			<ul>{listExercises}</ul>
		</div>
	);
};

export default Exercises;
