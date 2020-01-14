/* eslint-disable no-shadow */
import React,{useState,useEffect} from 'react';
import './AddProduct.scss';
import { NavLink } from 'react-router-dom';
import { API } from 'aws-amplify';
import { useStateValue } from '../../stateProvider.js';
import Loading from '../../components/Loader/Loader';
import Product from '../Product/Product';


const AddProduct = () => {
	const [productsState,setProductsState] = useState([]);
	const [newProductSate,setNewProductState] = useState([])
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
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
	return (
		isLoading ? <Loading/> :
		<div className='add-product-view'>
			<div className='search-box'>
				<input placeholder='Write name of the product' type='text' className='search-box' value={search} onChange={event=>setSearch(event.target.value.toLowerCase())
				}/>
			</div>
			<ul>
				{!isLoading && renderProductList(newProductSate)}
			</ul>
			<NavLink to='/newproduct'>
				<button type='button'><i className='fas fa-plus-circle'></i>Add the new product</button>
			</NavLink>
		</div>
		
	);
};
export default AddProduct; 
