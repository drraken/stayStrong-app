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
	const [isClickedBreakfast, setIsClickedBreakfast] = useState(false);
	const [isClickedSnack1, setIsClickedSnack1] = useState(false);
	const [isClickedLunch, setIsClickedLunch] = useState(false);
	const [isClickedSnack2, setIsClickedSnack2] = useState(false);
	const [isClickedDinner, setIsClickedDinner] = useState(false);
	
	const toggleTrueFalse = () => setIsClickedBreakfast(!isClickedBreakfast);
	const toggleTrueFalse1 = () => setIsClickedSnack1(!isClickedSnack1);
	const toggleTrueFalse2 = () => setIsClickedLunch(!isClickedLunch);
	const toggleTrueFalse3 = () => setIsClickedSnack2(!isClickedSnack2);
	const toggleTrueFalse4 = () => setIsClickedDinner(!isClickedDinner);


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
	

	function renderMealList(mealState,type){
		return [{}].concat(mealState).map((item) =>
			item.type === type ?
			<ul key={item.mealId}>		
				<li>{item.name}</li>
				<li>{item.kcal} kcal</li>	
				<li>{item.proteins} P</li>	
				<li>{item.fats} F</li>	
				<li>{item.carbs} C</li>	
			</ul>
			:
			''
	);
	}

	function renderSumMealList(mealState,type){
		let kcalSum = 0;
		let proteinSum = 0;
		let fatsSum = 0;
		let carbsSum = 0;
		mealState.forEach(element => {
			if(element.type === type){
				kcalSum += Number(element.kcal);
				proteinSum += Number(element.proteins);
				fatsSum += Number(element.fats);
				carbsSum += Number(element.carbs);
			}
		});
		return (
			<ul>
				<li>{kcalSum.toFixed(1)} kcal</li>
				<li>{proteinSum.toFixed(1)} g</li>
				<li>{fatsSum.toFixed(1)} g</li>
				<li>{carbsSum.toFixed(1)} g</li>
			</ul>
		);
	}

	function renderGeneralSum(mealState,type1){
		let generalSum = 0;
		mealState.forEach(element =>{
			if(type1 === 'kcal')
				generalSum += Number(element.kcal);
			if(type1 === 'p')
				generalSum += Number(element.proteins);
			if(type1 === 'f')
				generalSum += Number(element.fats);
			if(type1 === 'c')
				generalSum += Number(element.carbs);
		});
		return(
			<p className='pInlineElement'>
				<strong>{generalSum.toFixed(0)}</strong>
			</p>
		)
	}

	return (
		<div className='home-view'>
			{isLoading ? ('') : (
			<div className='content'>	
				<div className='home-container'>
					<div className='Breakfast-section' role='button' onClick={()=> toggleTrueFalse()} >
						<h3 className='li-header-section' >Breakfast </h3>
						<NavLink to='/addproduct' className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						
						{renderSumMealList(mealState,'Breakfast')}
						{isClickedBreakfast && !isLoading && renderMealList(mealState,'Breakfast')}
					</div>
					<div className='Snack1-section' role='button' onClick={()=> toggleTrueFalse1()}>
						<h3 className='li-header-section'>Snack I</h3>
						<NavLink to='/addproduct' className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{ renderSumMealList(mealState,'Snack1')}
						{isClickedSnack1 && !isLoading && renderMealList(mealState,'Snack1')}
					</div>
					<div className='Lunch-section' role='button' onClick={()=> toggleTrueFalse2()}>
						<h3 className='li-header-section'>Lunch</h3>
						<NavLink to='/addproduct' className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{ renderSumMealList(mealState,'Lunch')}
						{isClickedLunch && !isLoading && renderMealList(mealState,'Lunch')}
					</div>
					<div className='Snack2-section' role='button' onClick={()=> toggleTrueFalse3()}>
						<h3 className='li-header-section'>Snack II</h3>
						<NavLink to='/addproduct' className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{renderSumMealList(mealState,'Snack2')}
						{isClickedSnack2  && !isLoading && renderMealList(mealState,'Snack2')}
					</div>
					<div className='Dinner-section' role='button' onClick={()=> toggleTrueFalse4()}>
						<h3 className='li-header-section'>Dinner</h3>
						<NavLink to='/addproduct' className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{renderSumMealList(mealState,'Dinner')}
						{isClickedDinner && !isLoading && renderMealList(mealState,'Dinner')}
						
					
					</div>
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
								{renderGeneralSum(mealState,'kcal')}
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
								{renderGeneralSum(mealState,'p')}
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
								{renderGeneralSum(mealState,'f')}
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
								{renderGeneralSum(mealState,'c')}
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
