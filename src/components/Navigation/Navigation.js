import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";
import { useStateValue } from "../../stateProvider.js";

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
								type: "location",
								newLocation: "home"
							});
						}}
					>
						<i className="fas fa-home" />
						Home
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
