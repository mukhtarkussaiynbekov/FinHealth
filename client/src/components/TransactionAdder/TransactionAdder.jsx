import React, { useState } from 'react';
import { IoAddOutline } from 'react-icons/all';
import { IconContext } from 'react-icons';
import StyledAutocomplete from './StyledAutocomplete';

const TransactionAdder = ({ incomeList, accountsList, categoriesList }) => {
	const [inputSelected, setInputSelected] = useState(false);
	const handleClick = event => {
		let targetClass = event.target.className;
		let classType = typeof targetClass;
		let currentTargetClass = event.currentTarget.className;
		let currentTargetClassType = typeof currentTargetClass;

		if (classType !== 'string' || currentTargetClassType !== 'string') {
			return;
		}

		if (targetClass.includes('transaction-adder-focus')) {
			setInputSelected(false);
		} else if (currentTargetClass.includes('dashboard-top')) {
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
						<div className="add-transaction-steps-wrapper">
							<div className="add-transaction-step">
								<span className="add-transaction-text">from</span>
								<div className="autocomplete-wrapper">
									<span>
										<StyledAutocomplete
											id="from-autocomplete"
											options={incomeList.concat(accountsList)}
											getOptionLabel={option => option.name}
											renderInput={params => (
												<div ref={params.InputProps.ref}>
													<input
														type="text"
														{...params.inputProps}
														placeholder="Wallet"
													/>
												</div>
											)}
										/>
									</span>
								</div>
							</div>
						</div>
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
