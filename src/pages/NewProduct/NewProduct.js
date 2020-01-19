/* eslint-disable react/prop-types */
import React,{useState} from 'react';
import './NewProduct.scss';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import Loading from '../../components/Loader/Loader';



const NewProduct = props => {
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
	const { match } = props;

	const {type} = match.params;
	const{day} = match.params;
	
	function createProduct(product){
		return API.post('products','/products',{
			body: product
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		try{
			const returnData = await createProduct(state);
			history.push(`/products/${type}/${day}/${returnData.productId}`);
		} catch(e){
			console.log(e);
			setIsLoading(false);
		}
	}

	const onInputChange = event => {
		setState({
			...state,
			[event.target.id]: event.target.value.replace(/,/g, '.')
		});
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
						value={state.company === 0 ? '' : state.company}
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
						id='saturated'
						aria-describedby='saturatedHelp'
						placeholder='Saturated'
						value={state.saturated === 0 ? '' : state.saturated}
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
					<input
						className='input'
						type='text'
						id='sugars'
						aria-describedby='sugarsHelp'
						placeholder='Sugars'
						value={state.sugars === 0 ? '' : state.sugars}
						onChange={onInputChange}
					/>
				</p>
			</div>
			<div className='field'>
				<p className='control'>
					<input
						className='input'
						type='text'
						id='salt'
						aria-describedby='saltHelp'
						placeholder='Salt'
						value={state.salt === 0 ? '' : state.salt}
						onChange={onInputChange}
					/>
				</p>
			</div>
			 <div className='field'>
				<p className='control'>
					<button className='button is-success' type='submit'>
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
