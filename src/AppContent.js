import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Navigation from './components/Navigation/Navigation.js';
import Header from "./components/Header/Header.js";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute.js";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

import { useStateValue } from "./stateProvider.js";

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
					path="/user/"
					exact
					component={User}
					props={user}
				/>
				<Route
					path="/register/"
					exact
					component={Register}
					props={user}
				/>
				<Route path="/login/" exact component={Login} props={user} />
			</main>
			{/* <Navigation /> */}
		</Router>
	);
};

export default AppContent;
