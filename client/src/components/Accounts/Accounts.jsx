import React from 'react';
import Header from './Header';
import Body from './Body';
import AuthService from '../../services/auth.service';

const Accounts = ({ source }) => {
	let currentUser = AuthService.getCurrentUser();
	return (
		<div className="accounts-container">
			<Header source={source} currentUser={currentUser} />
			<Body source={source} currentUser={currentUser} />
		</div>
	);
};

export default Accounts;
