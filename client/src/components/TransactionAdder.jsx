import React from 'react';
import { IoAddOutline } from 'react-icons/all';
import { IconContext } from 'react-icons';

const TransactionAdder = () => {
	return (
		<div className="dashboard-top">
			<div className="add-transaction-wrapper">
				<div className="add-transaction">
					<span className="add-transaction-text add-transaction-placeholder">
						from Wallet to Groceries $20 05/27/2021 #tag comment
					</span>

					<button disabled className="add-transaction-submit">
						<IconContext.Provider
							value={{
								size: '2.5em',
								color: 'white'
							}}
						>
							<IoAddOutline />
						</IconContext.Provider>
					</button>
				</div>
			</div>
		</div>
	);
};

export default TransactionAdder;
