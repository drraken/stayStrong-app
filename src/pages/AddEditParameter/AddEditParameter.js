/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import { API } from 'aws-amplify';
import './AddEditParameter.scss';

const AddEditParameter = () => {
    const defaultState={
		kcalGoal: '',
		proteinGoal: '',
		fatGoal: '',
		carbGoal:''
    };
    const [isLoading, setIsLoading] = useState(false);
    const[state,setState] = useState(defaultState);

    function getParameter(parameter){
        return API.get('usersParameters','/usersParameters',{
			body: parameter
		});
    }
    function createParameter(parameter){
		return API.post('usersParameters','/usersParameters',{
			body: parameter
		});
	}
	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		try{
			await createParameter(state);
		} catch(e){
			console.log(e);
			setIsLoading(false);
		}
	}
	const onInputChange = event => {
		setState({
			...state,
			[event.target.id]: event.target.value
		});
    };
    
	return (
		<div className='AddEditParameter-view'>
            <h2>Add your makro goals</h2>
            <div className='user-parameter'>
				<form onSubmit={handleSubmit}>
				
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
