import React, { useState } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header.js';
import Icons from './Icons';
import Icon, { icons } from './Icon';
import {
	INCOME,
	POPUP_TITLE,
	POPUP_AMOUNT,
	messages,
	BALANCE,
	BUDGET,
	ACCOUNT,
	CATEGORY
} from '../../constants';
import { API_URL } from '../../services/auth.service';
import { updateStorage } from '../App';

const PopUp = ({
	toggle,
	source,
	isAdd,
	selectedIdx,
	collection,
	currentUser,
	authChanger
}) => {
	let selectedAccount =
		selectedIdx !== -1 ? currentUser[collection][selectedIdx] : {};
	const handleClick = event => {
		let titleType = typeof event.target.title;
		let classType = typeof event.target.className;
		if (titleType !== 'string' || classType !== 'string') {
			return;
		}
		setIsInputFocused(event.target.title === 'name');
		if (event.target.className === 'popup-message') {
			toggle();
		}
	};

	const [inputValues, setInputValues] = useState({
		name: '',
		iconName: 'FaCoins',
		amount: '',
		balance: '',
		budget: '',
		...selectedAccount
	});
	const [iconPressed, setIconPressed] = useState(false);
	const [isInputFocused, setIsInputFocused] = useState(false);
	let accounts = currentUser[collection] ? currentUser[collection] : [];
	let nameExists = accounts.some(
		(object, index) => object.name === inputValues.name && selectedIdx !== index
	);

	const updateInputValues = event => {
		let title = event.target.title;
		let newValue = event.target.value;
		setInputValues({ ...inputValues, [title]: newValue });
	};

	const updateIconName = event => {
		let selectedIconName = event.currentTarget.title;
		if (Object.keys(icons).includes(selectedIconName)) {
			setInputValues({ ...inputValues, iconName: selectedIconName });
		}
	};

	const getSaveValues = () => {
		let saveValues = { name: inputValues.name, iconName: inputValues.iconName };
		if (source === INCOME) {
			saveValues.amount =
				inputValues.amount === '' ? 0 : parseInt(inputValues.amount);
		} else if (source === ACCOUNT) {
			saveValues.balance =
				inputValues.balance === '' ? 0 : parseInt(inputValues.balance);
		} else if (source === CATEGORY) {
			saveValues.budget =
				inputValues.budget === '' ? 0 : parseInt(inputValues.budget);
		}
		return saveValues;
	};

	const onAdd = () => {
		let saveValues = getSaveValues();

		if (saveValues.name && !nameExists) {
			// Make call to the server to add new data
			axios
				.post(API_URL + source, saveValues, { headers: authHeader() })
				.then(response => {
					updateStorage({ ...currentUser, [collection]: response.data.field });
					authChanger();
					toggle();
				});
		}
	};

	const onChange = () => {
		let saveValues = getSaveValues();
		let databaseUpdateValues = { ...selectedAccount, ...saveValues };
		console.log(databaseUpdateValues);

		// Currently it just adds new data
		if (saveValues.name && !nameExists) {
			// Make call to the server to change existing data
			var config = {
				method: 'put',
				url: API_URL + source,
				headers: {
					...authHeader(),
					'Content-Type': 'application/json'
				},
				data: {
					prevName: selectedAccount.name,
					val: databaseUpdateValues
				}
			};

			axios(config)
				.then(response => {
					updateStorage({ ...currentUser, [collection]: response.data.field });
					authChanger();
					toggle();
				})
				.catch(error => {
					console.log(error);
				});
		}
	};

	const onDelete = () => {
		// Make call to the server to delete existing data
		var data = JSON.stringify({
			name: currentUser[collection][selectedIdx].name
		});

		var config = {
			method: 'delete',
			url: API_URL + source,
			headers: {
				...authHeader(),
				'Content-Type': 'application/json'
			},
			data: data
		};

		axios(config)
			.then(response => {
				updateStorage({ ...currentUser, [collection]: response.data.field });
				authChanger();
				toggle();
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<div className="popup-block" onClick={handleClick}>
			<div className="popup-message">
				<div className="popup-content">
					<div className={`popup-block popup-block-${source}`}>
						<div>
							<div className="create-input create-input-sep">
								<div className="form-item">
									<input
										className="popup-input"
										placeholder={`${messages[POPUP_TITLE][source]} *`}
										title="name"
										value={inputValues.name}
										onChange={updateInputValues}
									/>
									{nameExists && (
										<div className="popup-input-sub popup-input-sub-error">
											* Name already exists. Change to different name
										</div>
									)}
									{isInputFocused && !nameExists && (
										<div className="popup-input-sub">* Required field</div>
									)}
									{inputValues.name === '' && !isInputFocused && (
										<div className="popup-input-sub popup-input-sub-error">
											* Enter {source} title
										</div>
									)}
								</div>
								<div className="icon-picker-icon">
									<Icon
										iconName={inputValues.iconName}
										source={source}
										onIconSelect={() => setIconPressed(!iconPressed)}
									/>
									{/* <div className={`card-item-icon card-item-icon-${source}`}>
										<div className="card-item-icon-miscellaneous">
										</div>
									</div> */}
								</div>
							</div>

							{source !== INCOME && (
								<div className="create-input create-input-sep">
									<div className="form-item">
										<input
											className="popup-input popup-input-number"
											placeholder={`${messages[POPUP_AMOUNT][source]} *`}
											title={source === ACCOUNT ? BALANCE : BUDGET}
											value={
												source === ACCOUNT
													? inputValues.balance
													: inputValues.budget
											}
											onChange={event => {
												let newAmount = event.target.value;
												if (source === ACCOUNT && newAmount.match('^-?\\d*$')) {
													setInputValues({
														...inputValues,
														[BALANCE]: newAmount
													});
												} else if (
													source === CATEGORY &&
													newAmount.match('^\\d*$')
												) {
													setInputValues({
														...inputValues,
														[BUDGET]: newAmount
													});
												}
											}}
										/>
									</div>
								</div>
							)}

							<div className="form-action">
								<input
									type="button"
									value={isAdd ? 'add' : 'change'}
									className={`btn-create btn-create-${source}`}
									onClick={isAdd ? onAdd : onChange}
								/>
							</div>
							{!isAdd && (
								<div className="form-action">
									<input
										type="button"
										value="delete"
										className={`btn-delete btn-delete-${source}`}
										onClick={onDelete}
									/>
								</div>
							)}
						</div>
					</div>
					{iconPressed && (
						<Icons source={source} onIconSelect={updateIconName} />
					)}
				</div>
			</div>
		</div>
	);
};

export default PopUp;
