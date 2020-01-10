/* eslint-disable no-shadow */
import React,{useState,useEffect} from 'react';
import './AddProduct.scss';
import { NavLink } from 'react-router-dom';
import { API } from 'aws-amplify';
import { useStateValue } from '../../stateProvider.js';
import Loading from '../../components/Loader/Loader';


const AddProduct = () => {
	const [productsState,setProductsState] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [{user},dispatch] = useStateValue();

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
			} catch (e) {
			  console.log(e);
			}
		
			setIsLoading(false);
		  }
		
		  onLoad();
	},[user.isAuthenticated])


	function renderProductList(productsState){
		return [{}].concat(productsState).map((item) =>
			item != null ?
			<NavLink key={item.productId} to={`/products/${item.productId}`}>		
				<h3>{item.name}</h3>
				<p>100 g</p>
				<p>{item.kcal} kcal</p>		
			</NavLink>
			:
			''
		);
	}
	console.log(user);
	return (
		isLoading ? <Loading/> :
		<div className='add-product-view'>
			<div className='search-box'>
				Write name of the product
			</div>
			<ul>
				{!isLoading && renderProductList(productsState)}
			</ul>
			<NavLink to='/newproduct'>
				<button type='button'><i className='fas fa-plus-circle'></i>Add the new product</button>
			</NavLink>
		</div>
		
	);
};
export default AddProduct; 
