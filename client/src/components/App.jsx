import React from 'react';
import FinHealthHeader from './FinHealthHeader';
import Accounts from './Accounts/Accounts';
import Transactions from './Transactions/Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<div>
			<FinHealthHeader />
			<div className="data-container container-dashboard">
				<div className="dashboard">
					<div className="dashboard-body">
						<div className="dashboard-column" style={{ minWidth: 540 }}>
							<Accounts />
						</div>
						<div className="dashboard-column">
							<Transactions />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
