import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import Navigation from './components/Navigation/Navigation.js';
import Header from './components/Header/Header.js';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute.js';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import Welcome from './pages/Auth/WelcomePage/Welcome';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import ForgotPasswordVerification from './pages/Auth/ForgotPasswordVerification/ForgotPasswordVerification';
import ChangePasswordConfirm from './pages/Auth/ChangePasswordConfirm/ChangePasswordConfirm.js';
import ChangePassword from './pages/Auth/ChangePassword/ChangePassword.js';
import NotFound from './pages/NotFound/NotFound';
import AddProduct from './pages/AddProduct/AddProduct.js';
import NewProduct from './pages/NewProduct/NewProduct.js';

import { useStateValue } from './stateProvider.js';





const AppContent = () => {
	const [{ user }, dispatch] = useStateValue();

	return (
		<Router>
			<Header />
			<main>
				<AuthenticatedRoute
					path='/'
					exact
					component={Home}
					props={user}
				/>
				<AuthenticatedRoute
					path='/user/'
					exact
					component={User}
					props={user}
				/>
				<Route
					path='/register/'
					exact
					component={Register}
					props={user}
				/>
				<Route path='/login/'
					exact 
					component={Login}
					props={user}
		        />
				<Route path='/welcome/'
					exact 
					component={Welcome}
					props={user}
		        />
				<Route path='/forgotpassword/'
					exact 
					component={ForgotPassword}
					props={user}
		        />
				<Route path='/forgotpasswordverification/'
					exact 
					component={ForgotPasswordVerification}
					props={user}
		        />
				<Route path='/changepasswordconfirm/'
					exact 
					component={ChangePasswordConfirm}
					props={user}
		        />
				<AuthenticatedRoute path='/changepassword/'
					exact 
					component={ChangePassword}
					props={user}
		        />
				<AuthenticatedRoute path='/addproduct/'
					exact 
					component={AddProduct}
					props={user}
		        />
				<AuthenticatedRoute path='/createproduct/'
					exact 
					component={NewProduct}
					props={user}
		        />
				{/* <Route component={NotFound}/> */}
				
			</main>
			{/* <Navigation /> */}
		</Router>
	);
};

export default AppContent;
