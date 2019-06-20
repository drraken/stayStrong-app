import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import { useStateValue } from '../../stateProvider.js';

const Navigation = () => {
	const [{ user }, dispatch] = useStateValue();

	return (
		<nav className="navigation navigation-bottom">
			<ul>
				<li>
					<NavLink
						exact
						to="/"
						onClick={() => {
							dispatch({
								type: 'location',
								newLocation: 'home',
							});
						}}
					>
						<i className="fas fa-home" />
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/exercises"
						onClick={() => {
							dispatch({
								type: 'location',
								newLocation: 'exercises',
							});
						}}
					>
						<i className="fas fa-walking"></i>
						Exercises
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/workouts"
						onClick={() => {
							dispatch({
								type: 'location',
								newLocation: 'workouts',
							});
						}}
					>
						<i className="fas fa-dumbbell"></i>
						Workout
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/stats"
						onClick={() => {
							dispatch({
								type: 'location',
								newLocation: 'stats',
							});
						}}
					>
						<i className="fas fa-signal"></i>
						Stats
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
