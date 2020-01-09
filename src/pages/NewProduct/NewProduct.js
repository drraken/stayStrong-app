import React,{useState} from 'react';
import './NewProduct.scss';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import Loading from '../../components/Loader/Loader';



const NewProduct = () => {
	const defaultState={
		name: '',
		company:'',
		kcal: '',
		proteins: '',
		fats: '',
		carbs: ''
	};

	const [state, setState] = useState(defaultState);
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	
	function createProduct(product){
		return API.post('products','/products',{
			body: product
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		try{
			await createProduct(state);
			history.push('/');
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
		console.log(state);
	};
	  return (
		<div className="NewNote">
		  <form onSubmit={handleSubmit}>
		  	<div className='field'>
				<p className='control'>
					<input
						className='input'
						type='text'
						id='name'
						aria-describedby='nameHelp'
						placeholder='Name'
						value={state.name}
						onChange={onInputChange}
					/>
				</p>
			</div>
			<div className='field'>
				<p className='control'>
					<input
						className='input'
						type='text'
						id='company'
						aria-describedby='companyHelp'
						placeholder='Company'
						value={state.company}
						onChange={onInputChange}
					/>
				</p>
			</div>
			<div className='field'>
				<p className='control'>
					<input
						className='input'
						type='text'
						id='kcal'
						aria-describedby='kcalHelp'
						placeholder='Kcal'
						value={state.kcal}
						onChange={onInputChange}
					/>
				</p>
			</div>
			<div className='field'>
				<p className='control'>
					<input
						className='input'
						type='text'
						id='proteins'
						aria-describedby='proteinsHelp'
						placeholder='Proteins'
						value={state.proteins}
						onChange={onInputChange}
					/>
				</p>
			</div>
			<div className='field'>
				<p className='control'>
					<input
						className='input'
						type='text'
						id='fats'
						aria-describedby='fatsHelp'
						placeholder='Fats'
						value={state.fats}
						onChange={onInputChange}
					/>
				</p>
			</div>
			<div className='field'>
				<p className='control'>
					<input
						className='input'
						type='text'
						id='carbs'
						aria-describedby='carbsHelp'
						placeholder='Carbs'
						value={state.carbs}
						onChange={onInputChange}
					/>
				</p>
			</div>
			 <div className='field'>
				<p className='control'>
					<button className='button is-success' type='submit' isLoading={isLoading}>
						Create product
					</button>
				</p>
			</div>
			{isLoading === true ? (
					<Loading />
				) : 
				(
					<p></p>
				)}
		  </form>
		</div>
	  );
};
export default NewProduct;
