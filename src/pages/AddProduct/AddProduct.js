/* eslint-disable react/prop-types */

/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import React,{useState,useEffect} from 'react';
import './AddProduct.scss';
import { NavLink,useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import { useStateValue } from '../../stateProvider.js';
import Loading from '../../components/Loader/Loader';


const AddProduct = props => {
	const [productsState,setProductsState] = useState([]);
	const [newProductSate,setNewProductState] = useState([])
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [{user},dispatch] = useStateValue();
	const { match } = props;
	const history = useHistory();

	const {type} = match.params;
	const {day} = match.params;

	function loadProducts() {
		return API.get('products', '/products');
	  }

	useEffect(()=>{
		async function onLoad() {
			setIsLoading(true);
			if (!user.isAuthenticated) {
			  return;
			}
		
			try {
			  const products = await loadProducts();
			  setProductsState(products);
			  setNewProductState(products);
			} catch (e) {
			  console.log(e);
			}
		
			setIsLoading(false);
		  }
		
		  onLoad();
		 
	},[user.isAuthenticated])
	useEffect(()=>{
			const filteredProducts = productsState.filter(
				(item) => {
					return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
				}
			)
			setNewProductState(filteredProducts);
	},[productsState, search]);

	function renderProductList(newProductSate){
		return [{}].concat(newProductSate).map((item) =>
			item !== undefined ?
			<NavLink key={item.productId} to={`/products/${type}/${day}/${item.productId}`}>		
				<h3>{item.name}</h3>
				{item.company === 0 ? null : <p>{item.company}</p>}
				<p>100 g</p>
				<p>{item.kcal} kcal</p>		
			</NavLink>
			:
			''
		);
	}
	function dateTimeNow(){
		const today = new Date();
		const yesterday = new Date(today);
		const tomorrow = new Date(today);
		yesterday.setDate(today.getDate() -1);
		tomorrow.setDate(today.getDate() +1);
		const requestDay = new Date(day * 86400000)  
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
		if(type === 'breakfast' || type === 'lunch' || type === 'dinner'){
			const mealName = type.charAt(0).toUpperCase() + type.slice(1);
			return mealName;
		}
		if(type === 'snack1'){
			const mealName = 'Snack I';
			return mealName;
		}
		if(type === 'snack2'){
			const mealName = 'Snack II';
			return mealName;
		}
	}
	return (
		isLoading ? <Loading/> :
		<div className='add-product-view'>
			<div className='background-overlay'>
				<div className='header-day-meal'>
					
					<p>{showMeal()}</p>
					<p>{dateTimeNow()}</p>
					<span role='button' onClick={()=>{ history.push('/')}}>
						<i className="fas fa-arrow-left"></i>
					</span>
				</div>
				<div className='search-box'>
					<input placeholder='Write name of the product' type='text' className='search-box' value={search} onChange={event=>setSearch(event.target.value.toLowerCase())
					}/>
				</div>
			</div>
			<ul>
				{!isLoading && renderProductList(newProductSate)}
			</ul>
			<NavLink to={`/newproduct/${type}/${day}`}>
				<button type='button'><i className='fas fa-plus-circle'></i>Add the new product</button>
			</NavLink>
		</div>
		
	);
};
export default AddProduct; 
