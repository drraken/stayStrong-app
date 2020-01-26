/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import './Product.scss';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loader/Loader';
import FormErrors from '../../components/Validation/FormErrorsProducts';
import Validate from '../../components/Validation/FormValidationAmount';


const Product = props => {
    const { match } = props;

    const {type1} = match.params;
    const {id} = match.params;
    const {day1} = match.params;

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
        type: type1,
        name: '',
		kcal: '',
		proteins: '',
		fats: '',
        carbs: '',
        day: day1,
        errors: {
			aws:null,
			blankfield: false,
			invalidFormat: false
		}
    }
    
    const [state, setState] = useState(defaultState)
    const [isLoading,setIsLoading] = useState(true)
    const history = useHistory();
    

    const[mealState,setMealState] = useState(defaultMealState)
    
    useEffect(()=>{
        function loadProduct() {
            return API.get('products', `/products/${id}`);
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
    },[id]);
    useEffect(()=>{
        setMealState({
            ...mealState,
            name: state.name,
            kcal: (Number(state.kcal) * Number(mealState.amount) /100).toFixed(1),
            proteins: (Number(state.proteins) * Number(mealState.amount) /100).toFixed(1),
            fats: (Number(state.fats) * Number(mealState.amount) /100).toFixed(1),
            carbs: (Number(state.carbs) * Number(mealState.amount) /100).toFixed(1)
        });
    },[mealState.amount])
    function createMeal(meal){
		return API.post('meals',`/meals/${id}`,{ 
			body: meal
		});
	}
    
	async function handleSubmit(event) {
		event.preventDefault();
        setIsLoading(true);
        const error = Validate(event, mealState);
		if (error) {
		  setState({
			...state,
			errors: { ...state.errors, ...error }
		  });
		  setIsLoading(false);
		} else{
            try{
                await createMeal(mealState);
                history.push('/');
            } catch(e){
                console.log(e);
                setIsLoading(false);
            }
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
            <div className='product-header'>
                    <h4 className='h4-header'>Zmiana</h4>
                    <p className='p-header'>Today-zmiana</p>
            </div>
            <h4>{state.name}</h4>
            <FormErrors formerrors={state.errors} />
            <form onSubmit={handleSubmit}>
                {/* <select id='type' className='select-type' value={mealState.type} onChange={onInputChange}>
                    <option>Select meal</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Snack1">Snack I</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snack2">Snack II</option>
                    <option value="Dinner">Dinner</option>
                </select> */}
                
                <div className='product-100g'>
                    <p className='p-units'>100g</p>
                    <p className='p-kcal'>98 kcal</p>
                    <div className='field'>
                        <p className='control'>
                            <button className='button is-success' type='submit' >
                                <i className="fas fa-chevron-circle-right"></i>
                            </button>
                        </p>
			        </div>
                </div>
                <div className='product-units'>
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
                            <select>
                                <option className='units'>g</option>
                                <option className='units'>ml</option>
                            </select>
                        </p>
			        </div>
                    <div className='field'>
                        <p>0 kcal</p>
                    </div>
                    <div className='field'>
                        <p className='control'>
                            <button className='button is-success' type='submit' >
                                <i class="fas fa-chevron-circle-right"></i>
                            </button>
                        </p>
			        </div>
                </div>
                
            </form>
            <div className='details'>
                <div className='field'>
                    <p className='control'>
                        <button className='button-details'>
                            Natritional value
                        </button>
                    </p>
                </div>
            </div>
		</div>
	);
};
export default Product;
