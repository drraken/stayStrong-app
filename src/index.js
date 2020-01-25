import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Amplify from 'aws-amplify';
import App from './App';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
	Auth: {
		mandatorySignId: true,
		region: Amplify.REGION,
		userPoolId: Amplify.USER_POOL_ID,
		identityPoolId: Amplify.IDENTITY_POOL_ID,
		userPoolWebClientId: Amplify.APP_CLIENT_ID
	},
	API:{
		endpoints:[
			{
				name: 'products',
				endpoint: Amplify.URL,
				region: Amplify.REGION
			},
			{
				name: 'meals',
				endpoint: Amplify.URL,
				region:Amplify.REGION
			},
			{
				name: 'usersParameters',
				endpoint: Amplify.URL,
				region: Amplify.REGION
			}
		]
	}
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
