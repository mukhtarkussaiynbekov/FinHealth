import React from 'react';
import Header from './Header';
import Body from './Body';

const Accounts = ({ source }) => {
	return (
		<div className="accounts-container">
			<Header source={source} />
			<Body source={source} />
		</div>
	);
};

export default Accounts;
