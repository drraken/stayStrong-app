import React,{useState} from 'react';
import './NewProduct.scss';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import Loading from '../../components/Loader/Loader';



const NewProduct = () => {
	const defaultState={
		name: '',
		company:0,
		kcal: '',
		proteins: '',
		fats: '',
		saturated: 0,
		carbs: '',
		sugars: 0,
		salt: 0
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
	};
	  return (
		<div className="NewNote">
		  <form onSubmit={handleSubmit}>
			<div className="header-newp">
				<i className="fas fa-arrow-left"></i>
				<h4 className="p-header">New product</h4>
				<div className='field'>
				<p className='control'>
					<button className='button is-success' type='submit'>
						Save
					</button>
				</p>
				</div>
			</div>
			
		  	<div className='field'>
				<h4 className="li-newp-name">Name*</h4>
				<p className='control'>
					<input
						className='input-name'
						type='text'
						id='name'
						aria-describedby='nameHelp'
						placeholder=''
						value={state.name}
						onChange={onInputChange}
					/>
				</p>
			</div>
			<div className='field'>
			<h4 className="li-newp">Brand</h4>
				<p className='control'>
					<input
						className='input-brand'
						type='text'
						id='company'
						aria-describedby='companyHelp'
						placeholder=''
						value={state.company === 0 ? '' : state.company}
						onChange={onInputChange}
					/>
				</p>
			</div>
			<div className='field'>
				<h4 className="li-newp">Calories*</h4>
				<p className='control'>
					<input
						className='input1'
						type='text'
						id='kcal'
						aria-describedby='kcalHelp'
						placeholder=''
						value={state.kcal}
						onChange={onInputChange}
					/>
					<h4 className="units">kcal</h4>
				</p>
			</div>
			<div className='field'>
				<h4 className="li-newp">Proteins*</h4>
				<p className='control'>
					<input
						className='input1'
						type='text'
						id='proteins'
						aria-describedby='proteinsHelp'
						placeholder=''
						value={state.proteins}
						onChange={onInputChange}
					/>
					<h4 className="units">g</h4>
				</p>
			</div>
			<div className='field'>
				<h4 className="li-newp">Fat*</h4>
				<p className='control'>
					<input
						className='input1'
						type='text'
						id='fats'
						aria-describedby='fatsHelp'
						placeholder=''
						value={state.fats}
						onChange={onInputChange}
					/>
					<h4 className="units">g</h4>
				</p>
			</div>
			<div className='field'>
				<h4 className="li-newp-s">Saturated</h4>
				<p className='control'>
					<input
						className='input1'
						type='text'
						id='saturated'
						aria-describedby='saturatedHelp'
						placeholder=''
						value={state.saturated === 0 ? '' : state.saturated}
						onChange={onInputChange}
					/>
					<h4 className="units">g</h4>
				</p>
			</div>
			<div className='field'>
				<h4 className="li-newp">Carbs*</h4>
				<p className='control'>
					<input
						className='input1'
						type='text'
						id='carbs'
						aria-describedby='carbsHelp'
						placeholder=''
						value={state.carbs}
						onChange={onInputChange}
					/>
					<h4 className="units">g</h4>
				</p>
			</div>
			<div className='field'>
				<h4 className="li-newp-s">Sugars</h4>
				<p className='control'>
					<input
						className='input1'
						type='text'
						id='sugars'
						aria-describedby='sugarsHelp'
						placeholder=''
						value={state.sugars === 0 ? '' : state.sugars}
						onChange={onInputChange}
					/>
					<h4 className="units">g</h4>
				</p>
			</div>
			<div className='field'>
				<h4 className="li-newp">Salt</h4>
				<p className='control'>
					<input
						className='input1'
						type='text'
						id='salt'
						aria-describedby='saltHelp'
						placeholder=''
						value={state.salt === 0 ? '' : state.salt}
						onChange={onInputChange}
					/>
					<h4 className="units">g</h4>
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
