import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation.js';
import Header from './components/Header/Header.js';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute.js';
import Home from './pages/Home/Home';
import Workouts from './pages/Workouts/Workouts';
import Exercises from './pages/Exercises/Exercises';
import Stats from './pages/Stats/Stats';
import User from './pages/User/User';

import { useStateValue } from './stateProvider.js';

const AppContent = () => {
	const [{ user }, dispatch] = useStateValue();

	return (
		<Router>
			 <Header />
			<main>
				<AuthenticatedRoute
					path="/"
					exact
					component={Home}
					props={user}
				/>
				<AuthenticatedRoute
					path="/workouts/"
					exact
					component={Workouts}
					props={user}
				/>
				<AuthenticatedRoute
					path="/exercises/"
					exact
					component={Exercises}
					props={user}
				/>
				<AuthenticatedRoute
					path="/stats"
					exact
					component={Stats}
					props={user}
				/>
				<AuthenticatedRoute
					path="/user/"
					exact
					component={User}
					props={user}
				/>
			</main>
			<Navigation />
		</Router>
	);
};

export default AppContent;
