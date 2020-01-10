/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import './Product.scss';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loader/Loader';


const Product = (props) => {
    const defaultState={
		name: '',
		company:'',
		kcal: '',
		proteins: '',
		fats: '',
		carbs: ''
    };
    const defaultMealState={
		amount: '',
        type: '',
        name: '',
		kcal: '',
		proteins: '',
		fats: '',
		carbs: ''
    }
    const [state, setState] = useState(defaultState)
    const [isLoading,setIsLoading] = useState(true)
    const history = useHistory();

    const[mealState,setMealState] = useState(defaultMealState)
    
    useEffect(()=>{
        function loadProduct() {
            return API.get('products', `/products/${props.match.params.id}`);
        }
      
        async function onLoad() {
            try {
                const product= await loadProduct();
                // const { name,company,kcal,proteins,fats,carbs } = product;
                setState(product);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            } 
        }
        onLoad();   
    },[props.match.params.id]);
    useEffect(()=>{
        setMealState({
            ...mealState,
            name: state.name,
            kcal: (state.kcal * mealState.amount /100).toFixed(1),
            proteins: (state.proteins * mealState.amount /100).toFixed(1),
            fats: (state.fats * mealState.amount /100).toFixed(1),
            carbs: (state.carbs * mealState.amount /100).toFixed(1)
        });
    },[mealState.amount])
    console.log(mealState);
    function createMeal(meal){
		return API.post('meals',`/meals/${props.match.params.id}`,{ 
			body: meal
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		try{
			await createMeal(mealState);
			history.push('/');
		} catch(e){
			console.log(e);
			setIsLoading(false);
		}
    }
    
    const onInputChange = event => {
		setMealState({
			...mealState,
			[event.target.id]: event.target.value
		});
	};
    
	return (
        isLoading ? <Loading/> :
		<div className='product-view'>
			<h2>{state.name}</h2>

            <form onSubmit={handleSubmit}>
                <select id='type' className='select-type' value={mealState.type} onChange={onInputChange}>
                    <option>Select meal</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Snack1">Snack I</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snack2">Snack II</option>
                    <option value="Dinner">Dinner</option>
                </select>
                <div className='field'>
                    <p className='control'>
                        <input
                            className='input'
                            type='text'
                            id='amount'
                            aria-describedby='amountHelp'
                            placeholder='Amount in g'
                            value={mealState.amount}
                            onChange={onInputChange}
                        />
                    </p>
			    </div>
                <div className='field'>
                    <p className='control'>
                        <button className='button is-success' type='submit' >
                            Add product
                        </button>
                    </p>
			    </div>
            </form>
		</div>
	);
};
export default Product;
