import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Amplify from 'aws-amplify';
import App from './App';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
	Auth: {
		mandatorySignId: true,
		region: process.env.REACT_APP_REGION,
		userPoolId: process.env.REACT_APP_USER_POOL_ID,
		identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
		userPoolWebClientId: process.env.REACT_APP_CLIENT_ID
	},
	API:{
		endpoints:[
			{
				name: 'products',
				endpoint: process.env.REACT_APP_URL,
				region: process.env.REACT_APP_REGION
			},
			{
				name: 'meals',
				endpoint: process.env.REACT_APP_URL,
				region: process.env.REACT_APP_REGION
			},
			{
				name: 'usersParameters',
				endpoint: process.env.REACT_APP_URL,
				region: process.env.REACT_APP_REGION
			}
		]
	}
});
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
