import React from 'react';
import './Loader.scss';

const Loader = () => {
	return (
		<div className='loader'>
			<div className='lds-default'>
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
			</div>
			<p>Loading...</p>
		</div>
	);
};

export default Loader;
