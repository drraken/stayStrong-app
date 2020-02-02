/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import './AddEditParameter.scss';
import Loader from '../../components/Loader/Loader';
import FormErrors from '../../components/Validation/FormErrorsProducts';
import Validate from '../../components/Validation/FormValidationUserParameter';

const AddEditParameter = () => {
    const defaultState={
		gender: '',
		weight: '',
		height: '',
		age: '',
		activity: '',
		goal: '',
		kcalGoal: '',
		proteinGoal: '',
		fatGoal: '',
		carbGoal:'',
		setOwnGoal: false,
		errors: {
			aws:null,
			blankfield: false,
			invalidFormat: false
		}
    };
	const [isLoading, setIsLoading] = useState(true);
	const[state,setState] = useState(defaultState);
	const [id,setId] = useState('');

	const toggleOwnGoal= () => setState({
		...state,
		setOwnGoal: !state.setOwnGoal
	});
	const history = useHistory();

    function getParameter(){
        return API.get('usersParameters','/usersParameters');
    }
    function createParameter(parameterBody){
		return API.post('usersParameters','/usersParameters',{
			body: parameterBody
		});
	}
	function updateParameter(parameterBody){
		return API.put('usersParameters',`/usersParameters/${id}`,{
			body: parameterBody
		});
	}
	useEffect(()=>{
		async function onLoad() {
			try {
			  const param = await getParameter();
			  param.forEach(element => {
				setId(element.parameterId);
				setState({
					gender: element.gender ? element.gender : '',
					weight: element.weight ? element.weight : '',
					height: element.height ? element.height : '',
					age: element.age ? element.age : '',
					activity: element.activity ? element.activity: '',
					goal: element.goal ? element.goal : '',
					kcalGoal: element.kcalGoal ? element.kcalGoal : '',
					proteinGoal: element.proteinGoal ? element.proteinGoal : '',
					fatGoal: element.fatGoal ? element.fatGoal : '',
					carbGoal: element.carbGoal ? element.carbGoal : '',
					setOwnGoal: element.setOwnGoal ? element.setOwnGoal : ''
				})
			});
			} catch (e) {
			  console.log(e);
			  setIsLoading(false);
			}
			setIsLoading(false);
		  }
		
		onLoad();
	},[])
	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		const error = Validate(event, state);
		if (error) {
		  setState({
			...state,
			errors: { ...state.errors, ...error }
		  });
		  setIsLoading(false);
		} else{
			let objectToSend;
			if(state.setOwnGoal){
				objectToSend = state;
			} else {
				let kcalCalculation;
				if(state.gender === 'male'){
					kcalCalculation = (66 + 13.7 * state.weight + 5 * state.height - 6.76 * state.age) * state.activity + Number(state.goal);
				}
				if(state.gender === 'female'){
					kcalCalculation = (655 + 9.6 * state.weight + 1.8 * state.height - 4.7* state.age) * state.activity + Number(state.goal);
				}
				const proteinCalculation = state.weight * 2;
				const fatCalculation = (kcalCalculation * 0.25) / 9;
				const carbCalculation = (kcalCalculation - (proteinCalculation * 4 + fatCalculation * 9)) / 4;
				objectToSend = {
					...state,
					kcalGoal: Number(kcalCalculation).toFixed(0),
					proteinGoal: Number(proteinCalculation).toFixed(0),
					fatGoal: Number(fatCalculation).toFixed(0),
					carbGoal: Number(carbCalculation).toFixed(0)
				}	
			}
			try{
				if(id === ''){
					await createParameter(objectToSend);
				} else{
					await updateParameter(objectToSend);
				}
					
			} catch(e){
				console.log(e);
				setIsLoading(false);
			}
			history.push('/');
		}
	}
	const onInputChange = event => {
		setState({
			...state,
			[event.target.id]: event.target.value.replace(/,/g, '.')
		});
	};
	return (
		isLoading ? <Loader/> :
		<div className='AddEditParameter-view'>
			{id === '' ?
            <h2>Add your makro goals</h2>
			: <h2>Edit your makro goals</h2>}
			<label className='container'>I want to set my own makro goals
				<input type='checkbox' defaultChecked={state.setOwnGoal ? 'checked' : ''} onClick={()=>{toggleOwnGoal()}}></input>
				<span className='checkmark'></span>
			</label>
			<FormErrors formerrors={state.errors} />
			{!state.setOwnGoal?
			<div className='user-parameter'>
				<form onSubmit={handleSubmit}>
					<div className='field'>
                        <label className='control'>Gender:
                            <select className='inputModel' id='gender' defaultValue={state.gender} onChange={onInputChange}>
								<option value=''>Select gender</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </label>
			        </div>
					<div className='field'>
                        <label className='control'>Activity:
                            <select className='inputModel' id='activity' defaultValue={state.activity} onChange={onInputChange}>
								<option value='' >Select your activity</option>
                                <option value='1.2' >No activity</option>
                                <option value='1.35' >Low activity</option>
								<option value='1.55' >Balanced activity</option>
								<option value='1.75' >Hight activity</option>
								<option value='2.05' >Extreme activity</option>
                            </select>
                        </label>
			        </div>
					<div className='field'>
                        <label className='control'>Goal:
                            <select className='inputModel' id='goal' defaultValue={state.goal} onChange={onInputChange}>
								<option value='' >Select your goal</option>
                                <option value='-200' >Weight reduction</option>
                                <option value='0' >Weight maintenance</option>
								<option value='200' >Weight increase</option>
                            </select>
                        </label>
			        </div>
					<div className='field'>
						<label className='control'>Weight:
							<input
								className='inputModel'
								type='text'
								id='weight'
								placeholder='weight'
								value={state.weight}
								onChange={onInputChange}
							/>
						</label>
					</div>
					<div className='field'>
						<label className='control'>Height:
							<input
								className='inputModel'
								type='text'
								id='height'
								placeholder='height'
								value={state.height}
								onChange={onInputChange}
							/>
						</label>
					</div>
					<div className='field'>
						<label className='control'>Age:
							<input
								className='inputModel'
								type='text'
								id='age'
								placeholder='age'
								value={state.age}
								onChange={onInputChange}
							/>
						</label>
					</div>
					<div className='field'>
						<p className='control'>
							<button className='button is-success' type='submit' >
								Submit
							</button>
						</p>
					</div>
				</form>
				<p id='starMessage'>*Daily caloric demand calculated using the Harris-Benedict method</p>
			</div>

			:
            <div className='user-own-parameter'>
				<form onSubmit={handleSubmit} >
				
					<div className='field'>
						<label className='control'>Kcal:
							<input
								className='inputModel'
								type='text'
								id='kcalGoal'
								aria-describedby='kcalGoalHelp'
								placeholder='kcal'
								value={state.kcalGoal}
								onChange={onInputChange}
							/>
						</label>
					</div>
					<div className='field'>
						<label className='control'>Protein:
							<input
								className='inputModel'
								type='text'
								id='proteinGoal'
								aria-describedby='protienGoalHelp'
								placeholder='protein'
								value={state.proteinGoal}
								onChange={onInputChange}
							/>
							<span className='percentageHelp'>{Number(state.proteinGoal*4/state.kcalGoal*100).toFixed(2)}%</span>
						</label>
					</div>
					<div className='field'>
						<label className='control'>Fat:
							<input
								className='inputModel'
								type='text'
								id='fatGoal'
								aria-describedby='fatGoalHelp'
								placeholder='fat'
								value={state.fatGoal}
								onChange={onInputChange}
							/>
							<span className='percentageHelp'>{Number(state.fatGoal*4/state.kcalGoal*100).toFixed(2)}%</span>
						</label>
					</div>
					<div className='field'>
						<label className='control'>Carb:
							
							<input
								className='inputModel'
								type='text'
								id='carbGoal'
								aria-describedby='carbGoalHelp'
								placeholder='carb'
								value={state.carbGoal}
								onChange={onInputChange}
							/>
							<span className='percentageHelp'>{Number(state.carbGoal*4/state.kcalGoal*100).toFixed(2)}%</span>
						</label>
					</div>
					<div className='field'>
						<p className='control'>
							<button className='button is-success' type='submit' >
								Submit
							</button>
						</p>
						<span className='percentageHelp'>{Number((state.carbGoal*4+state.proteinGoal*4+state.fatGoal*9)/state.kcalGoal*100).toFixed(2)}%</span>
					</div>
            	</form>
			</div> 
			}
			
		</div>
	);
};
export default AddEditParameter;
