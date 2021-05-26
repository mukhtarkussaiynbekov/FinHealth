import React, { useState } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header.js';
import Icons from './Icons';
import Icon from './Icon';
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
		setIsInputFocused(event.target.title === 'name');
		if (event.target.className === 'popup-message') {
			toggle();
		}
	};

	const [inputValues, setInputValues] = useState({
		name: '',
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

	const getSaveValues = () => {
		if (source === INCOME) {
			return {
				name: inputValues.name,
				amount: inputValues.amount === '' ? 0 : parseInt(inputValues.amount)
			};
		} else if (source === ACCOUNT) {
			return {
				name: inputValues.name,
				balance: inputValues.balance === '' ? 0 : parseInt(inputValues.balance)
			};
		} else if (source === CATEGORY) {
			return {
				name: inputValues.name,
				budget: inputValues.budget === '' ? 0 : parseInt(inputValues.budget)
			};
		}
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

		// Currently it just adds new data
		if (saveValues.name && !nameExists) {
			// Make call to the server to change existing data
			var config = {
				method: 'put',
				url: `http://localhost:8080/${source}`,
				headers: {
					...authHeader(),
					'Content-Type': 'application/json'
				},
				data: {
					prevName: selectedAccount.name,
					val: { selectedAccount, ...saveValues }
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
			url: `http://localhost:8080/${source}`,
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
								<div
									className="icon-picker-icon"
									onClick={() => setIconPressed(!iconPressed)}
								>
									<Icon
										key="FaCoins"
										title="FaCoins"
										icon="FaCoins"
										source={source}
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
											type="number"
											value={
												source === ACCOUNT
													? inputValues.balance
													: inputValues.budget
											}
											onChange={updateInputValues}
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
					{iconPressed && <Icons source={source} />}
				</div>
			</div>
		</div>
	);
};

export default PopUp;
