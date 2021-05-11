import React from 'react';
import Header from './Header';
import Body from './Body';

const Accounts = ({ source, userID, accounts }) => {
	return (
		<div className="accounts-container">
			<Header source={source} userID={userID} />
			<Body source={source} userID={userID} accounts={accounts} />
		</div>
	);
};

export default Accounts;
