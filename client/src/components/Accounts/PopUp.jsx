import React, { useState } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header.js';
import Icons from './Icons';
import Icon from './Icon';
const API_URL = 'http://localhost:8080/';

const PopUp = ({ toggle, source, currentUser, isAdd, selectedIdx }) => {
	const handleClick = event => {
		setIsInputFocused(event.target.title === 'name');
		if (event.target.className === 'popup-message') {
			toggle();
		}
	};

	const [inputValues, setInputValues] = useState({ name: '', amount: '' });
	const [iconPressed, setIconPressed] = useState(false);
	const [isInputFocused, setIsInputFocused] = useState(false);
	let nameExists = currentUser[source].some(
		object => object.name === inputValues.name
	);

	const updateInputValues = event => {
		let title = event.target.title;
		let newValue = event.target.value;
		setInputValues({ ...inputValues, [title]: newValue });
	};

	const updateStorage = response => {
		currentUser[source] = response.data.field;
		localStorage.setItem('user', JSON.stringify(currentUser));
	};

	const onAdd = () => {
		if (inputValues.name && !nameExists) {
			// Make call to the server to add new data
			axios
				.post(API_URL + source, inputValues, { headers: authHeader() })
				.then(response => {
					updateStorage(response);
					toggle();
				});
		}
	};

	const onChange = () => {
		// TODO: change below lines to correctly change data.
		// Currently it just adds new data
		if (inputValues.name) {
			// Make call to the server to change existing data
			axios
				.post(
					API_URL + source,
					{
						name: inputValues.name,
						amount: inputValues.amount
					},
					{ headers: authHeader() }
				)
				.then(response => {
					updateStorage(response);
					toggle();
				});
		}
	};

	const onDelete = () => {
		// TODO: check correctness of this function
		// Make call to the server to delete existing data
		var data = JSON.stringify({
			name: currentUser[source][selectedIdx].name
		});

		var config = {
			method: 'delete',
			url: 'http://localhost:8080/income',
			headers: {
				...authHeader(),
				'Content-Type': 'application/json'
			},
			data: data
		};

		axios(config)
			.then(function (response) {
				console.log(response);
				updateStorage(response);
				toggle();
			})
			.catch(function (error) {
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
										placeholder="Where does amount come from? *"
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
											* Enter {source} source title
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

							<div className="create-input create-input-sep">
								<div className="form-item">
									<input
										className="popup-input popup-input-number"
										placeholder="Planning to receive per month"
										title="amount"
										type="number"
										value={inputValues.amount}
										onChange={updateInputValues}
									/>
								</div>
							</div>

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
										className="btn-delete"
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
