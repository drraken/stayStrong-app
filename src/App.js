import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { StateProvider, useStateValue } from './stateProvider.js';
import './App.scss';
import AppContent from './AppContent.js';

const App = () => {
	const initialState = {
		app: {
			language: 'en',
			theme: 'black'	
		},
		user: {
			isAuthenticated: false,
			isAuthenticating: true,
			userName: ''
		},
		users: []
	};
	const [sessionState, setSessionState] = useState(initialState);
	useEffect(() => {
		function checkCurrentSession() {
			Auth.currentAuthenticatedUser({
				bypassCache: false
			})
				.then(data =>
					setSessionState({
						...sessionState,
						user: {
							...sessionState.user,
							isAuthenticated: true,
							isAuthenticating: false,
							userName: data.username
						}
					})
				)
				.catch(err =>
					setSessionState({
						...sessionState,
						user: {
							...sessionState.user,
							isAuthenticating: false
						}
					})
				);
		}
		if (sessionState !== null) {
			checkCurrentSession();
		}
	}, []);

	const reducer = (state, action) => {
		switch (action.type) {
			case 'reset':
				return { sessionState };
			case 'authentication-user':
				return {
					...state,
					user: {
						...state.user,
						isAuthenticated: action.isAuthenticated,
						userName: action.userName
					}
				};
			case 'authenticating':
				return {
					...state,
					user: {
						...state.user,
						isAuthenticating: action.isAuthenticating
					}
				};
			case 'location':
				return {
					...state,
					app: {
						...state.app,
						location: action.newLocation
					}
				};
			case 'header':
				return {
					...state,
					app: {
						...state.app,
						headerMode: action.newHeaderMode
					}
				};
			default:
				return state;
		}
	};
	return (
		!sessionState.user.isAuthenticating && (
			<StateProvider initialState={sessionState} reducer={reducer}>
				<AppContent />
			</StateProvider>
		)
	);
};

export default App;
