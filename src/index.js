import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Amplify from 'aws-amplify';
import App from './App';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
	Auth: {
		mandatorySignId: true,
		region: process.env.REGION,
		userPoolId: process.env.USER_POOL_ID,
		identityPoolId: process.env.IDENTITY_POOL_ID,
		userPoolWebClientId: process.env.APP_CLIENT_ID
	},
	API:{
		endpoints:[
			{
				name: 'products',
				endpoint: process.env.URL,
				region: process.env.REGION
			},
			{
				name: 'meals',
				endpoint: process.env.URL,
				region: process.env.REGION
			},
			{
				name: 'usersParameters',
				endpoint: process.env.URL,
				region: process.env.REGION
			}
		]
	}
});
console.log(process.env.APP_CLIENT_ID);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
