import React from 'react';
import './AddProduct.scss';
import { NavLink } from 'react-router-dom';

const AddProduct = () => {

	return (
		<div className='add-product-view'>
			<NavLink to='/createproduct'>
					<button type='button'>New product</button>
			</NavLink>
		</div>
	);
};
export default AddProduct;
