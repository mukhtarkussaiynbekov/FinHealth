import React, { useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/auth.service';
import authHeader from '../../services/auth-header.js';
import { IoAddOutline } from 'react-icons/all';
import { IconContext } from 'react-icons';
import StyledAutocomplete from './StyledAutocomplete';
import StyledTextField from './StyledTextField';
import {
	AMOUNT,
	TRANSACTION,
	CATEGORY,
	ACCOUNT,
	DATE,
	TAG
} from '../../constants';
import StyledDatePicker from './StyledDatePicker';
import moment from 'moment';

const useFocus = () => {
	const htmlElRef = useRef(null);
	const setFocus = () => {
		htmlElRef.current && htmlElRef.current.focus();
	};

	return [htmlElRef, setFocus];
};

const TransactionAdder = ({
	incomeList,
	accountsList,
	categoriesList,
	authChanger
}) => {
	const getTopMatchingValue = (options, input) => {
		let optionsContainingInput = options.filter(option =>
			option.name.includes(input)
		);
		return optionsContainingInput.length > 0 ? optionsContainingInput[0] : null;
	};

	const isIncome = account => {
		return AMOUNT in account;
	};

	const [inputSelected, setInputSelected] = useState(false);

	// Format today
	const today = moment();
	const todayFormatted = today.format('DD.MM.YYYY');

	// Select source account
	const fromList = incomeList.concat(accountsList);
	const [from, setFrom] = useState('');
	const [fromOption, setFromOption] = useState(null);
	const [fromOptionSelected, setFromOptionSelected] = useState(false);
	const [fromRef, setFromFocus] = useFocus();

	// Select destination account
	const [toList, setToList] = useState([]);
	const [to, setTo] = useState('');
	const [toOption, setToOption] = useState(null);
	const [toOptionSelected, setToOptionSelected] = useState(false);
	const [toRef, setToFocus] = useFocus();

	// Input money
	const [money, setMoney] = useState('');
	const [moneySelected, setMoneySelected] = useState(false);
	const [moneyRef, setMoneyFocus] = useFocus();

	// Select date
	const [dateSelected, setDateSelected] = useState(false);
	const [date, setDate] = useState(moment());
	const [dateRef, setDateFocus] = useFocus();

	// Write comments
	const [comment, setComment] = useState('');
	const [commentRef, setCommentFocus] = useFocus();

	useLayoutEffect(() => {
		setFromFocus();
		setToFocus();
		setMoneyFocus();
		setDateFocus();
		setCommentFocus();
	}, [
		inputSelected,
		fromOptionSelected,
		toOptionSelected,
		moneySelected,
		dateSelected
	]);

	const cleanUp = () => {
		setInputSelected(false);
		setFromOption(null);
		setToOption(null);
		setFromOptionSelected(false);
		setToOptionSelected(false);
		setMoneySelected(false);
		setDateSelected(false);
		setFrom('');
		setTo('');
		setMoney('');
		setDate(moment());
	};

	const postTransaction = () => {
		let transaction = {
			[DATE]: date.format('YYYY-MM-DD'),
			[TRANSACTION]: parseInt(money),
			[ACCOUNT]: from,
			[CATEGORY]: to,
			[TAG]: comment
		};

		// Make call to the server to add new data
		axios
			.post(API_URL + TRANSACTION, transaction, { headers: authHeader() })
			.then(response => {
				console.log(response);
				authChanger();
			})
			.catch(err => console.log(err));
		cleanUp();
	};

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
			setFromFocus();
			setToFocus();
			setMoneyFocus();
			setDateFocus();
			setCommentFocus();
		}
	};

	const moveCursorToStart = inputRef => {
		if (inputRef.current) {
			inputRef.current.setSelectionRange(0, 0);
		}
	};

	const handleActionKey = event => {
		const { key } = event;
		if (key === 'Backspace' || key === 'Delete') {
			if (dateSelected && comment === '') {
				setDateSelected(false);
				moveCursorToStart(dateRef);
			} else if (moneySelected && !dateSelected) {
				setMoneySelected(false);
				moveCursorToStart(moneyRef);
			} else if (toOptionSelected && money === '') {
				setToOptionSelected(false);
				moveCursorToStart(toRef);
			} else if (fromOptionSelected && to === '') {
				setFromOptionSelected(false);
				moveCursorToStart(fromRef);
			}
		} else if (key === 'Enter') {
			if (dateSelected) {
				postTransaction();
			} else if (moneySelected) {
				setDateSelected(true);
			} else if (money !== '') {
				setMoneySelected(true);
			}
		}
	};

	return (
		<div
			className="dashboard-top"
			onClick={handleClick}
			onKeyDown={handleActionKey}
		>
			<div className="add-transaction-wrapper">
				{inputSelected && <div className="transaction-adder-focus"></div>}
				<div className="add-transaction">
					{!inputSelected ? (
						<span className="add-transaction-text add-transaction-placeholder">
							from Wallet to Shopping ₩100,000 {todayFormatted} comment
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
										inputValue={from}
										value={getTopMatchingValue(fromList, from)}
										open={!fromOptionSelected}
										disabled={fromOptionSelected}
										onClose={(event, reason) => {
											if (reason === 'select-option') {
												setFrom(fromOption.name);
												setFromOptionSelected(true);
												if (isIncome(fromOption)) {
													setToList(accountsList);
												} else {
													setToList(categoriesList);
												}
											}
										}}
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
													inputRef={fromRef}
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
													setTo(toOption.name);
													setToOptionSelected(true);
												}
											}}
											inputValue={to}
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
														inputRef={toRef}
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
										<StyledTextField
											disabled={moneySelected}
											style={{ marginLeft: '3px' }}
											placeholder="100000"
											autoFocus
											InputProps={{ disableUnderline: true }}
											inputRef={moneyRef}
											value={money}
											onChange={event => {
												let newAmount = event.target.value;
												if (newAmount === '' || newAmount.match('^[1-9]\\d*$'))
													setMoney(event.target.value);
											}}
										/>
									</div>
								</div>
							)}
							{moneySelected && (
								<StyledDatePicker
									format="DD.MM.YYYY"
									value={date}
									onChange={setDate}
									InputProps={{ disableUnderline: dateSelected }}
									disabled={dateSelected}
									inputRef={dateRef}
									autoOk={true}
									okLabel=""
									cancelLabel=""
								/>
							)}
							{dateSelected && (
								<StyledTextField
									type="text"
									placeholder="comment"
									value={comment}
									onChange={event => setComment(event.target.value)}
									inputRef={commentRef}
									autoFocus
									InputProps={{ disableUnderline: true }}
									className=""
								/>
							)}
						</div>
					)}

					<button
						disabled={!dateSelected}
						className="add-transaction-submit"
						onClick={postTransaction}
					>
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
