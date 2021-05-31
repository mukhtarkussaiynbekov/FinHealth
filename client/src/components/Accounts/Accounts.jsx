import React from 'react';
import Header from './Header';
import Body from './Body';

const Accounts = ({
	source,
	setPopUpState,
	currentUser,
	collection,
	authChanger,
	renderLimit
}) => {
	return (
		<div className="accounts-container">
			<Header
				source={source}
				currentUser={currentUser}
				collection={collection}
				authChanger={authChanger}
			/>
			<Body
				source={source}
				currentUser={currentUser}
				setPopUpState={setPopUpState}
				collection={collection}
				renderLimit={renderLimit}
			/>
		</div>
	);
};

export default Accounts;
