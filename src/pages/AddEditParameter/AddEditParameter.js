/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import './AddEditParameter.scss';
import { useStateValue } from '../../stateProvider.js';
import Loader from '../../components/Loader/Loader';
import FormErrors from '../../components/Validation/FormErrorsProducts';
import Validate from '../../components/Validation/FormValidationUserParameter';

const AddEditParameter = () => {
    const defaultState={
		kcalGoal: '',
		proteinGoal: '',
		fatGoal: '',
		carbGoal:'',
		errors: {
			aws:null,
			blankfield: false,
			invalidFormat: false
		}
    };
	const [isLoading, setIsLoading] = useState(true);
	const [{user},dispatch] = useStateValue();
	const[state,setState] = useState(defaultState);
	const [id,setId] = useState('');
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
			if (!user.isAuthenticated) {
			  return;
			}
			try {
			  const param = await getParameter();
			  param.forEach(element => {
				setId(element.parameterId);
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
			try{
				if(id === ''){
					await createParameter(state);
				} else{
					await updateParameter(state);
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
			[event.target.id]: event.target.value
		});
	};
	console.log(id);
	return (
		isLoading ? <Loader/> :
		<div className='AddEditParameter-view'>
			{id === '' ?
            <h2>Add your makro goals</h2>
			: <h2>Edit your makro goals</h2>}
			<FormErrors formerrors={state.errors} />
            <div className='user-parameter'>
				<form onSubmit={handleSubmit} >
				
					<div className='field'>
						<p className='control'>
							<input
								className='input'
								type='text'
								id='kcalGoal'
								aria-describedby='kcalGoalHelp'
								placeholder='kcal'
								value={state.kcalGoal}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<input
								className='input'
								type='text'
								id='proteinGoal'
								aria-describedby='protienGoalHelp'
								placeholder='protein'
								value={state.proteinGoal}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<input
								className='input'
								type='text'
								id='fatGoal'
								aria-describedby='fatGoalHelp'
								placeholder='fat'
								value={state.fatGoal}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<input
								className='input'
								type='text'
								id='carbGoal'
								aria-describedby='carbGoalHelp'
								placeholder='carb'
								value={state.carbGoal}
								onChange={onInputChange}
							/>
						</p>
					</div>
					<div className='field'>
						<p className='control'>
							<button className='button is-success' type='submit' >
								Submit
							</button>
						</p>
					</div>
            	</form>
			</div> 
		</div>
	);
};
export default AddEditParameter;
