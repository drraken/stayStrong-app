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
	const [parameterState,setParameterState] = useState([]);
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	function deleteMeal(mealId){
		API.del('meals',`/meals/${mealId}`);
		const updatedItems = mealState.filter(e=>{
			return e.mealId !== mealId
		})
		setMealState(updatedItems);
		console.log(mealState);
	}
	function loadParameters(){
		return API.get('usersParameters','/usersParameters')
	}
	useEffect(()=>{
		async function onLoad(){
			if (!user.isAuthenticated) {
				return;
			}
			try {
				const parameters = await loadParameters();
				const Meals = await loadMeals();

				setMealState(Meals);
				parameters.forEach(element => {
					setParameterState({
						kcalGoal: element.kcalGoal,
						proteinGoal: element.proteinGoal,
						fatGoal: element.fatGoal,
						carbGoal: element.carbGoal
					})
				});
				setIsLoading(false);
			} catch (e) {
				console.log(e);
				setIsLoading(false);
			}
			
		}
		onLoad();
	},[user.isAuthenticated]);

	function dateTimeNow(){
		const now = new Date()  
		const daysSinceEpoch = Math.floor(now.getTime() / 86400000)  
		return daysSinceEpoch;
	};
	const [dateView,setDateView] = useState(dateTimeNow());
	useEffect(()=>{
		setIsClickedBreakfast(false);
		setIsClickedSnack1(false);
		setIsClickedLunch(false);
		setIsClickedSnack2(false);
		setIsClickedDinner(false);
	},[dateView])

	function renderMealList(mealState,type){
		return [{}].concat(mealState).map((item) =>
			item.type === type && item.day === dateView.toString() ?
			<ul id='mealCardMakroDetails' key={item.mealId}>		
				<li>{item.name}<i className="fas fa-times" role='button' onClick={()=>deleteMeal(item.mealId)}></i></li>
				<li>{item.amount} g</li>
				<li className='mealItemMakroDetails'>{item.kcal} kcal</li>	
				<li className='mealItemMakroDetails'>{item.proteins} P</li>	
				<li className='mealItemMakroDetails'>{item.fats} F</li>	
				<li className='mealItemMakroDetails'>{item.carbs} C</li>	
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
			if(element.type === type && element.day === dateView.toString()){
				kcalSum += Number(element.kcal);
				proteinSum += Number(element.proteins);
				fatsSum += Number(element.fats);
				carbsSum += Number(element.carbs);
			}
		});
		return (
			<ul id='mealCardTypeSumDetails' >
				<li className='mealTypeSumDetails'>{kcalSum.toFixed(1)} kcal</li>
				<li className='mealTypeSumDetails'>{proteinSum.toFixed(1)} g</li>
				<li className='mealTypeSumDetails'>{fatsSum.toFixed(1)} g</li>
				<li className='mealTypeSumDetails'>{carbsSum.toFixed(1)} g</li>
			</ul>
		);
	}
	function renderGeneralSum(mealState,type){
		let generalSum = 0;
		mealState.forEach(element =>{
			if(element.day === dateView.toString()){
				if(type === 'kcal')
					generalSum += Number(element.kcal);
				if(type === 'p')
					generalSum += Number(element.proteins);
				if(type === 'f')
					generalSum += Number(element.fats);
				if(type === 'c')
					generalSum += Number(element.carbs);
			}
		});
		return(
			<p className='pInlineElement'>
				<strong>{generalSum.toFixed(0)}</strong>
			</p>
		)
	}
	function generateStyle(mealState,type){
		let generalSum = 0;
		let finnalWidth = 0;
		let lineProggresiveStyle;
		if(parameterState.kcalGoal !== undefined && parameterState.kcalGoal !== null){
			mealState.forEach(element =>{
				if(element.day === dateView.toString()){
						if(type === 'kcal')
							generalSum += Number(element.kcal);
						if(type === 'p')
							generalSum += Number(element.proteins);
						if(type === 'f')
							generalSum += Number(element.fats);
						if(type === 'c')
							generalSum += Number(element.carbs);
					}
				});
				if(type === 'kcal')
					finnalWidth = Number(generalSum) / Number(parameterState.kcalGoal) * 100;
				if(type === 'p')
					finnalWidth = Number(generalSum) / Number(parameterState.proteinGoal) * 100;
				if(type === 'f')
					finnalWidth = Number(generalSum) / Number(parameterState.fatGoal) * 100;
				if(type === 'c')
					finnalWidth = Number(generalSum) / Number(parameterState.carbGoal) * 100;
		
			if(finnalWidth>100){
				lineProggresiveStyle ={
					width: '90%',
					backgroundColor: 'red'
				};
			} else{
				// eslint-disable-next-line prefer-template
				finnalWidth = finnalWidth.toFixed(0) + '%';
				
				lineProggresiveStyle ={
					width: finnalWidth
				}	
			}
		} else{
			lineProggresiveStyle ={
				width: '0%'
			};
		}
		return lineProggresiveStyle;
	}
	return (
		isLoading ? <Loader/> :
		<div className='home-view'>
			{/* <Header /> */}
			<div className='content'>	

				<div className='home-header'>
					<span><i className="fas fa-chevron-left"></i></span>
					<span role='button' onClick={()=> setDateView(dateTimeNow()-1)}
					className={dateView == (dateTimeNow()-1) ? 'currentSelectedDay ' : ''}
					>Yesterday</span>
					<span role='button' onClick={()=> setDateView(dateTimeNow())}
					className={dateView == dateTimeNow() ? 'currentSelectedDay ' : ''}
					>Today</span>
					<span role='button' onClick={()=> setDateView(dateTimeNow()+1)}
					className={dateView == (dateTimeNow()+1) ? 'currentSelectedDay ' : ''}
					>Tomorrow</span>
					<span><i className="fas fa-chevron-right"></i></span>
				</div>


				<div className='home-container'>
					<div className='Breakfast-section'>
						<span className='li-header-section' role='button' onClick={()=> toggleTrueFalse()} >Breakfast </span>
						<NavLink to={`/addproduct/breakfast/${dateView.toString()}`} className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						
						{renderSumMealList(mealState,'breakfast')}
						{isClickedBreakfast && !isLoading && renderMealList(mealState,'breakfast')}
					</div>
					<div className='Snack1-section'>
						<span className='li-header-section' role='button' onClick={()=> toggleTrueFalse1()} >Snack I </span>
						<NavLink to={`/addproduct/snack1/${dateView.toString()}`} className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{ renderSumMealList(mealState,'snack1')}
						{isClickedSnack1 && !isLoading && renderMealList(mealState,'snack1')}
					</div>
					<div className='Lunch-section'>
						<span className='li-header-section' role='button' onClick={()=> toggleTrueFalse2()} >Lunch </span>
						<NavLink to={`/addproduct/lunch/${dateView.toString()}`} className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{ renderSumMealList(mealState,'lunch')}
						{isClickedLunch && !isLoading && renderMealList(mealState,'lunch')}
					</div>
					<div className='Snack2-section'>
						<span className='li-header-section' role='button' onClick={()=> toggleTrueFalse3()} >Snack II </span>
						<NavLink to={`/addproduct/snack2/${dateView.toString()}`} className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{renderSumMealList(mealState,'snack2')}
						{isClickedSnack2  && !isLoading && renderMealList(mealState,'snack2')}
					</div>
					<div className='Dinner-section'>
						<span className='li-header-section' role='button' onClick={()=> toggleTrueFalse4()} >Dinner </span>
						<NavLink to={`/addproduct/dinner/${dateView.toString()}`} className='li-header-section'>
							<i className='fas fa-plus-circle icon-2x'></i>
						</NavLink>
						{renderSumMealList(mealState,'dinner')}
						{isClickedDinner && !isLoading && renderMealList(mealState,'dinner')}
						
					
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
								style={parameterState != null ? generateStyle(mealState,'kcal') : ''}
							/>
							<span>
								<p className='pInlineElement'>Calories </p>
								{renderGeneralSum(mealState,'kcal')}
								<p className='liMakroElementsAmount'>/ {parameterState.kcalGoal} kcal</p>
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
								style={generateStyle(mealState,'p')}
							/>
							<span>
								<p className='pInlineElement'>Proteins </p>
								{renderGeneralSum(mealState,'p')}
								<p className='liMakroElementsAmount'>/ {parameterState.proteinGoal} g</p>
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
								style={generateStyle(mealState,'f')}
							/>
							<span>
								<p className='pInlineElement'>Fat </p>
								{renderGeneralSum(mealState,'f')}
								<p className='liMakroElementsAmount'>/ {parameterState.fatGoal} g</p>
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
								style={generateStyle(mealState,'c')}
							/>
							<span>
								<p className='pInlineElement'>Carbs </p>
								{renderGeneralSum(mealState,'c')}
								<p className='liMakroElementsAmount'>/ {parameterState.carbGoal} g</p>
							</span>
						</li>
					</ul>
				</div>
			</div>	
		</div>
	);
};
export default Home;
