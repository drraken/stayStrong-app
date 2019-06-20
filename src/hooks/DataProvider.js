import React, { useEffect } from 'react';
import { useStateValue } from '../stateProvider.js';

const DataProvider = ({ props: dataType }) => {
	// eslint-disable-next-line
	const [{ user }, dispatch] = useStateValue({});
	
	return (
		<></>
	);
};

export default DataProvider;
