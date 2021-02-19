import React from 'react';
import FinHealthHeader from './FinHealthHeader';
import Account from './Accounts/Account';
import Transaction from './Transactions/Transaction';

const App = () => {
	return (
		<div>
			<FinHealthHeader />
			<div className="row">
				<div className="col-6">
					<Account />
				</div>
				<div className="col-6">
					<Transaction />
				</div>
			</div>
		</div>
	);
};

export default App;
