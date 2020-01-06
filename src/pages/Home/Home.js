import React from "react";
import "./Home.scss";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../../stateProvider.js";

const Home = () => {
	const [dispatch] = useStateValue();
	return (
		<div className="home-view">
			<div className="FooterHome">
				<ul>
					<li>
						<span
							className="proggresiveLine"
							id="parentLineElement"
						/>
						<span
							className="proggresiveLine"
							id="colorLineOverlay"
						/>
						<span>
							<p className="pInlineElement">Calories </p>
							<p className="pInlineElement">
								<strong>1760</strong>
							</p>
							{/* Rendered from database table Sum of table Meals for specific day */}
							<p className="liMakroElementsAmount">/ 3000 kcal</p>
							{/* Rendered from db table Users */}
						</span>
					</li>
					<li>
						<span
							className="proggresiveLine"
							id="parentLineElement"
						/>
						<span
							className="proggresiveLine"
							id="colorLineOverlay"
						/>
						<span>
							<p className="pInlineElement">Proteins </p>
							<p className="pInlineElement">
								<strong>85.9</strong>
							</p>
							{/* Rendered from database table Sum of table Meals for specific day */}
							<p className="liMakroElementsAmount">/ 154 g</p>
							{/* Rendered from db table Users */}
						</span>
					</li>
					<li>
						<span
							className="proggresiveLine"
							id="parentLineElement"
						/>
						<span
							className="proggresiveLine"
							id="colorLineOverlay"
						/>
						<span>
							<p className="pInlineElement">Fat </p>
							<p className="pInlineElement">
								<strong>83</strong>
							</p>
							{/* Rendered from database table Sum of table Meals for specific day */}
							<p className="liMakroElementsAmount">/ 83 g</p>
							{/* Rendered from db table Users */}
						</span>
					</li>
					<li>
						<span
							className="proggresiveLine"
							id="parentLineElement"
						/>
						<span
							className="proggresiveLine"
							id="colorLineOverlay"
						/>
						<span>
							<p className="pInlineElement">Carbs </p>
							<p className="pInlineElement">
								<strong>155.2</strong>
							</p>
							{/* Rendered from database table Sum of table Meals for specific day */}
							<p className="liMakroElementsAmount">/ 405 g</p>
							{/* Rendered from db table Users */}
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};
export default Home;
