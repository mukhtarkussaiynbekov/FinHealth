import React from 'react';
import FinHealthHeader from './FinHealthHeader';
import Accounts from './Accounts/Accounts';
import Transactions from './Transactions/Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<div>
			<FinHealthHeader />
			<div className="row data-container">
				<div className="col-6">
					<Accounts />
				</div>
				<div className="col-6">
					<Transactions />
				</div>
			</div>
		</div>
	);
};

export default App;
