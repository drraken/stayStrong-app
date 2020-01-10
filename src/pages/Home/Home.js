/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React,{useState,useEffect} from 'react';
import './Home.scss';
import { API } from 'aws-amplify';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../../stateProvider.js';
import Loader from '../../components/Loader/Loader';



const Home = () => {
	const [{user},dispatch] = useStateValue();

	const [mealState,setMealState] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	
	function loadMeals() {
		return API.get('meals', '/meals');
	}
	

	useEffect(()=>{
		async function onLoad() {
			if (!user.isAuthenticated) {
			  return;
			}
		
			try {
			  const Meals = await loadMeals();
			  setMealState(Meals);
			} catch (e) {
			  console.log(e);
			}
			setIsLoading(false);
		  }
		
		onLoad();
	},[user.isAuthenticated])
	

	function renderMealListBreakfast(mealState){
		return [{}].concat(mealState).map((item) =>
			item.type === 'Breakfast' ?
			<li key={item.mealId}>		
				<p>{item.name}</p>
				<p>{item.kcal} kcal</p>	
				<p>{item.proteins} P</p>	
				<p>{item.fats} F</p>	
				<p>{item.carbs} C</p>	
			</li>
			:
			''
	);
	}
	function renderMealListSnack1(mealState){
		return [{}].concat(mealState).map((item) =>
			item.type === 'Snack1' ?
			<li key={item.mealId}>		
				<p>{item.name}</p>
				<p>{item.kcal} kcal</p>	
				<p>{item.proteins} P</p>	
				<p>{item.fats} F</p>	
				<p>{item.carbs} C</p>	
			</li>
			:
			''
		);
	}
	function renderMealListLunch(mealState){
		return [{}].concat(mealState).map((item) =>
			item.type === 'Lunch' ?
			<li key={item.mealId}>		
				<p>{item.name}</p>
				<p>{item.kcal} kcal</p>	
				<p>{item.proteins} P</p>	
				<p>{item.fats} F</p>	
				<p>{item.carbs} C</p>	
			</li>
			:
			''
		);
	}
	function renderMealListSnack2(mealState){
		return [{}].concat(mealState).map((item) =>
			item.type === 'Snack2' ? 
			<li key={item.mealId}>		
				<p>{item.name}</p>
				<p>{item.kcal} kcal</p>	
				<p>{item.proteins} P</p>	
				<p>{item.fats} F</p>	
				<p>{item.carbs} C</p>	
			</li>
			:
			''
		);
	}
	function renderMealListDinner(mealState){
		return [{}].concat(mealState).map((item) =>
			item.type === 'Dinner' ? 
			<li key={item.mealId}>		
				<p>{item.name}</p>
				<p>{item.kcal} kcal</p>	
				<p>{item.proteins} P</p>	
				<p>{item.fats} F</p>	
				<p>{item.carbs} C</p>	
			</li>
			:
			''
		);
	}

	console.log(mealState);




	return (
		<div className='home-view'>
			{isLoading ? ('') : (
			<div className='content'>	
				<div className='home-container'>
					<ul className='Breakfast-section'>
						<h3 className='li-header-section'>Breakfast </h3>
						<NavLink to='/addproduct' className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{!isLoading && renderMealListBreakfast(mealState)}
					</ul>
					<ul className='Snack1-section'>
						<h3 className='li-header-section'>Snack I</h3>
						<NavLink to='/addproduct' className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{!isLoading && renderMealListSnack1(mealState)}
					</ul>
					<ul className='Lunch-section'>
						<h3 className='li-header-section'>Lunch</h3>
						<NavLink to='/addproduct' className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{!isLoading && renderMealListLunch(mealState)}
					</ul>
					<ul className='Snack2-section'>
						<h3 className='li-header-section'>Snack II</h3>
						<NavLink to='/addproduct' className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{!isLoading && renderMealListSnack2(mealState)}
					</ul>
					<ul className='Dinner-section'>
						<h3 className='li-header-section'>Dinner</h3>
						<NavLink to='/addproduct' className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{!isLoading && renderMealListDinner(mealState)}
						
					
					</ul>
				</div>


				<div className='FooterHome'>
					<ul>
						<li>
							<span
								className='proggresiveLine'
								id='parentLineElement'
							/>
							<span
								className='proggresiveLine'
								id='colorLineOverlay'
							/>
							<span>
								<p className='pInlineElement'>Calories </p>
								<p className='pInlineElement'>
									<strong>{1760}</strong>
								</p>
								{/* Rendered from database table Sum of table Meals for specific day */}
								<p className='liMakroElementsAmount'>/ 3000 kcal</p>
								{/* Rendered from db table Users */}
							</span>
						</li>
						<li>
							<span
								className='proggresiveLine'
								id='parentLineElement'
							/>
							<span
								className='proggresiveLine'
								id='colorLineOverlay'
							/>
							<span>
								<p className='pInlineElement'>Proteins </p>
								<p className='pInlineElement'>
									<strong>85.9</strong>
								</p>
								{/* Rendered from database table Sum of table Meals for specific day */}
								<p className='liMakroElementsAmount'>/ 154 g</p>
								{/* Rendered from db table Users */}
							</span>
						</li>
						<li>
							<span
								className='proggresiveLine'
								id='parentLineElement'
							/>
							<span
								className='proggresiveLine'
								id='colorLineOverlay'
							/>
							<span>
								<p className='pInlineElement'>Fat </p>
								<p className='pInlineElement'>
									<strong>83</strong>
								</p>
								{/* Rendered from database table Sum of table Meals for specific day */}
								<p className='liMakroElementsAmount'>/ 83 g</p>
								{/* Rendered from db table Users */}
							</span>
						</li>
						<li>
							<span
								className='proggresiveLine'
								id='parentLineElement'
							/>
							<span
								className='proggresiveLine'
								id='colorLineOverlay'
							/>
							<span>
								<p className='pInlineElement'>Carbs </p>
								<p className='pInlineElement'>
									<strong>155.2</strong>
								</p>
								{/* Rendered from database table Sum of table Meals for specific day */}
								<p className='liMakroElementsAmount'>/ 405 g</p>
								{/* Rendered from db table Users */}
							</span>
						</li>
					</ul>
				</div>
			</div>	
			)}
			{isLoading ? <Loader/> : ''}
		</div>
	);
};
export default Home;
