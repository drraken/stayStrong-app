/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './User.scss';
import { useStateValue } from '../../stateProvider.js';

const User = () => {
	const [{ user }, dispatch] = useStateValue();

	return (
		<div className="user-view">
			<div className="userprofile">
				<div className="user-section">
					<div className="user-icon">
						{user.firstName.slice(0, 1)}
					</div>
					<div className="user-details">
						<h2>{`${user.firstName} ${user.lastName}`}</h2>
					</div>
				</div>
			</div>
			Here will be your profile data and all the badges/prizes you collected over your whole training career.
		</div>
	);
};
export default User;
