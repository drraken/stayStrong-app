import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const AuthenticatedRoute = ({ component: C, props: cProps, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				cProps.isAuthenticated ? (
					<C {...props} {...cProps} />
				) : (
					<Redirect
						to={`/login?redirect=${props.location.pathname}${
							props.location.search
						}`}
					/>
				)
			}
		/>
	)
}
AuthenticatedRoute.propTypes = {
	component: PropTypes.func,
	props: PropTypes.object,
	rest: PropTypes.object,
	location: PropTypes.shape({
		search: PropTypes.string,
		pathname: PropTypes.string,
	}),
}
export default AuthenticatedRoute
