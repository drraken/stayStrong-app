import React from 'react';
import { StateProvider } from './stateProvider';
import './App.scss';
import AppContent from './AppContent.js';

const App = () => {
	const initialState = {
		app: {
			language: 'en',
			theme: 'black',
			location:
				window.location.pathname.replace('/', '').length > 0
					? window.location.pathname.replace('/', '').indexOf('/') ===
					  -1
						? window.location.pathname.replace('/', '')
						: window.location.pathname
								.replace('/', '')
								.substring(
									0,
									window.location.pathname
										.replace('/', '')
										.indexOf('/')
								)
					: 'home',
		},
		user: {
			isAuthenticated: true,
			role: '',
			firstName: 'User',
			lastName: 'Name',
			uid: window.localStorage.getItem('UID')
				? window.localStorage.getItem('UID')
				: '',
		},
		users: [],
		solutions: [],
		tasks: [],
		orders: [],
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case 'reset':
				return { initialState };
			case 'authentication':
				return {
					...state,
					user: {
						...state.user,
						isAuthenticated: action.authenticated,
					},
				};
			case 'orders':
				return {
					...state,
					orders: action.data,
				};
			case 'location':
				return {
					...state,
					app: {
						...state.app,
						location: action.newLocation,
					},
				};
			case 'header':
				return {
					...state,
					app: {
						...state.app,
						headerMode: action.newHeaderMode,
					},
				};
			case 'user':
				return {
					...state,
					user: {
						...state.user,
						uid: action.uid,
					},
				};
			case 'user-name':
				return {
					...state,
					user: {
						...state.user,
						firstName: action.firstName,
						lastName: action.lastName,
					},
				};
			case 'users':
				return {
					...state,
					users: action.data,
				};
			case 'solutions':
				return {
					...state,
					solutions: action.data,
				};
			case 'tasks':
				return {
					...state,
					tasks: action.data,
				};
			case 'role':
				return {
					...state,
					user: {
						...state.user,
						role: action.newRole,
					},
				};
			default:
				return state;
		}
	};

	return (
		<StateProvider initialState={initialState} reducer={reducer}>
			<AppContent />
		</StateProvider>
	);
};

export default App;
