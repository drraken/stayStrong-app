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
        console.log(mealState);
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
			[event.target.id]: event.target.value.replace(/,/g, '.')
		});
    };
    function dateTimeNow(){
		const today = new Date();
		const yesterday = new Date(today);
		const tomorrow = new Date(today);
		yesterday.setDate(today.getDate() -1);
		tomorrow.setDate(today.getDate() +1);
		const requestDay = new Date(day1 * 86400000);
		const slicedRequestDay = String(requestDay).slice(4,10);
		const slicedToday = String(today).slice(4,10);
		const slicedYesterday = String(yesterday).slice(4,10);
		const slicedTomorrow = String(tomorrow).slice(4,10);

		if(slicedRequestDay === slicedToday){
			return 'Today';
		}
		if(slicedRequestDay === slicedYesterday){
			return 'Yesterday';
		}
		if(slicedRequestDay === slicedTomorrow){
			return 'Tomorrow';
		}
		return slicedRequestDay;
	};
    function showMeal(){
		if(type1 === 'breakfast' || type1 === 'lunch' || type1 === 'dinner'){
			const mealName = type1.charAt(0).toUpperCase() + type1.slice(1);
			return mealName;
		}
		if(type1 === 'snack1'){
			const mealName = 'Snack I';
			return mealName;
		}
		if(type1 === 'snack2'){
			const mealName = 'Snack II';
			return mealName;
		}
    }
    
	return (
        isLoading ? <Loading/> :
		<div className='product-view'>			
            <div className='product-header'>
                    <h4 className='h4-header'>{showMeal()}</h4>
                    <p className='p-header'>{dateTimeNow()}</p>
            </div>
            <h4>{state.name}</h4>
            <FormErrors formerrors={state.errors} />
            <form onSubmit={handleSubmit}>
                
                <div className='product-100g'>
                    <p className='p-units'>100 g</p>
                    <p className='p-kcal'>{state.kcal} kcal</p>
                    <div className='field'>
                        <p className='control'>
                            <button className='button is-success' type='submit'
                             onClick={()=> setMealState({
                                    ...mealState,
                                    amount: 100,
                                    name: state.name,
                                    kcal: state.kcal,
                                    proteins: state.proteins,
                                    fats: state.fats,
                                    carbs: state.carbs
                                })} >
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
                                placeholder='Amount'
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
                        <p>{Number(mealState.kcal).toFixed(0)} kcal</p>
                    </div>
                    <div className='field'>
                        <p className='control'>
                            <button className='button is-success' type='submit' >
                                <i className="fas fa-chevron-circle-right"></i>
                            </button>
                        </p>
			        </div>
                </div>
                
            </form>
            <div className='details'>
                <div className='field'>
                    <p className='control'>
                        <button className='button-details' type='button'>
                            Natritional value
                        </button>
                    </p>
                </div>               
            </div>
            <div className='field-details'>
                    <p>Per 100g:</p>
                    <p className='p-units'>Calories (kcal)</p>
                        <p className='p-amount'>0</p>
                    <p className='p-units'>Proteins (g)</p>
                        <p className='p-amount'>0</p>
                    <p className='p-units'>Fat (g)</p>
                        <p className='p-amount'>0</p>
                    <p className='p-units-s'>Saturated (g)</p>
                        <p className='p-amount'>0</p>
                    <p className='p-units'>Carbs (g)</p>
                        <p className='p-amount'>0</p>
                    <p className='p-units-s'>Sugars (g)</p>
                        <p className='p-amount'>0</p>
            </div>      
		</div>
	);
};
export default Product;
