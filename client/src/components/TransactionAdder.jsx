import React, { useState } from 'react';
import { IoAddOutline } from 'react-icons/all';
import { IconContext } from 'react-icons';

const TransactionAdder = () => {
	const [inputSelected, setInputSelected] = useState(false);
	const handleClick = event => {
		let targetClass = event.target.className;
		let classType = typeof targetClass;
		if (classType !== 'string') {
			return;
		}

		if (!targetClass.includes('dashboard-top')) {
			setInputSelected(false);
		}

		if (
			targetClass.includes('add-transaction-text') ||
			targetClass.includes('add-transaction')
		) {
			setInputSelected(true);
		}
	};
	return (
		<div className="dashboard-top" onClick={handleClick}>
			<div className="add-transaction-wrapper">
				{inputSelected && <div className="transaction-adder-focus"></div>}
				<div className="add-transaction">
					{!inputSelected ? (
						<span className="add-transaction-text add-transaction-placeholder">
							from Wallet to Groceries $20 05/27/2021 #tag comment
						</span>
					) : (
						<div className="add-transaction-steps-wrapper"></div>
					)}

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
