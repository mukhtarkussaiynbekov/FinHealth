import React, { useRef, useState } from 'react';
import { IoAddOutline } from 'react-icons/all';
import { IconContext } from 'react-icons';
import StyledAutocomplete from './StyledAutocomplete';
import StyledTextField from './StyledTextField';
import { AMOUNT } from '../../constants';

const useFocus = () => {
	const htmlElRef = useRef(null);
	const setFocus = () => {
		htmlElRef.current && htmlElRef.current.focus();
	};

	return [htmlElRef, setFocus];
};

const TransactionAdder = ({ incomeList, accountsList, categoriesList }) => {
	const getTopMatchingValue = (options, input) => {
		let optionsContainingInput = options.filter(option =>
			option.name.includes(input)
		);
		return optionsContainingInput.length > 0 ? optionsContainingInput[0] : null;
	};
	const [inputRef, setInputFocus] = useFocus();

	const isIncome = account => {
		return AMOUNT in account;
	};

	// Selecting source account
	const fromList = incomeList.concat(accountsList);
	const [inputSelected, setInputSelected] = useState(false);
	const [from, setFrom] = useState('');
	const [fromOption, setFromOption] = useState(null);
	const [fromOptionSelected, setFromOptionSelected] = useState(false);

	// Selecting destination account
	const [toList, setToList] = useState([]);
	const [to, setTo] = useState('');
	const [toOption, setToOption] = useState(null);
	const [toOptionSelected, setToOptionSelected] = useState(false);

	// Input money
	const [money, setMoney] = useState('');
	const [moneySelected, setMoneySelected] = useState(false);

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
			setFromOption(null);
			setToOption(null);
			setFromOptionSelected(false);
			setToOptionSelected(false);
		} else if (currentTargetClass.includes('dashboard-top')) {
			setInputSelected(true);
			setInputFocus();
		}
	};
	return (
		<div className="dashboard-top" onClick={handleClick}>
			<div className="add-transaction-wrapper">
				{inputSelected && <div className="transaction-adder-focus"></div>}
				<div className="add-transaction">
					{!inputSelected ? (
						<span className="add-transaction-text add-transaction-placeholder">
							from Wallet to Shopping ₩100,000 05/27/2021 #tag comment
						</span>
					) : (
						<div className="add-transaction-steps-wrapper">
							<div className="add-transaction-step add-transaction-tooltip onboarding-tooltip">
								<span className="add-transaction-text">from</span>
								<div className="autocomplete-wrapper">
									<StyledAutocomplete
										id="from"
										options={fromList}
										getOptionLabel={option => option.name}
										value={getTopMatchingValue(fromList, from)}
										open={!fromOptionSelected}
										disabled={fromOptionSelected}
										onClose={(event, reason) => {
											if (reason === 'select-option') {
												setFromOptionSelected(true);
												if (isIncome(fromOption)) {
													setToList(accountsList);
												} else {
													setToList(categoriesList);
												}
											}
										}}
										inputValue={fromOptionSelected ? fromOption.name : from}
										onHighlightChange={(event, newOption) =>
											setFromOption(newOption)
										}
										renderInput={params => (
											<div ref={params.InputProps.ref}>
												<StyledTextField
													{...params.inputProps}
													type="text"
													placeholder="Wallet"
													onChange={event => setFrom(event.target.value)}
													inputRef={inputRef}
													autoFocus
													InputProps={{ disableUnderline: true }}
												/>
											</div>
										)}
									/>
								</div>
							</div>
							{fromOptionSelected && (
								<div className="add-transaction-step add-transaction-tooltip onboarding-tooltip">
									<span className="add-transaction-text">to</span>
									<div className="autocomplete-wrapper">
										<StyledAutocomplete
											id="to"
											options={toList}
											getOptionLabel={option => option.name}
											value={getTopMatchingValue(toList, to)}
											open={!toOptionSelected}
											disabled={toOptionSelected}
											onClose={(event, reason) => {
												if (reason === 'select-option') {
													setToOptionSelected(true);
												}
											}}
											inputValue={toOptionSelected ? toOption.name : to}
											onHighlightChange={(event, newOption) =>
												setToOption(newOption)
											}
											renderInput={params => (
												<div ref={params.InputProps.ref}>
													<StyledTextField
														{...params.inputProps}
														type="text"
														placeholder="Shopping"
														onChange={event => setTo(event.target.value)}
														inputRef={inputRef}
														autoFocus
														InputProps={{ disableUnderline: true }}
													/>
												</div>
											)}
										/>
									</div>
								</div>
							)}
							{toOptionSelected && (
								<div className="add-transaction-step add-transaction-tooltip onboarding-tooltip add-transaction-amount">
									<span className="ck-add-transaction-money-sign">₩</span>
									<div className="add-transaction-amount-component">
										<input
											disabled={moneySelected}
											className="add-transaction-money-input"
											placeholder="100000"
											autoFocus
											ref={inputRef}
											value={money}
											onChange={event => {
												let newAmount = event.target.value;
												if (newAmount.match('^\\d*$'))
													setMoney(event.target.value);
											}}
										/>
									</div>
								</div>
							)}
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
