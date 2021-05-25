import React from 'react';
import Header from './Header';
import Body from './Body';
import AuthService from '../../services/auth.service';

const Accounts = ({ source, setPopUpState }) => {
	let currentUser = AuthService.getCurrentUser();
	return (
		<div className="accounts-container">
			<Header source={source} currentUser={currentUser} />
			<Body
				source={source}
				currentUser={currentUser}
				setPopUpState={setPopUpState}
			/>
		</div>
	);
};

export default Accounts;
