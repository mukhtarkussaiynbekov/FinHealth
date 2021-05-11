import React, { useState } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header.js';
const API_URL = 'http://localhost:8080/';

const AddPopUp = ({ toggle, source, userID }) => {
	const handleClick = event => {
		setIsInputFocused(event.target.title === 'name');
		if (event.target.className === 'popup-message') {
			toggle();
		}
	};

	const [inputValues, setInputValues] = useState({ name: '', money: '' });
	const [isInputFocused, setIsInputFocused] = useState(false);

	const updateInputValues = event => {
		let title = event.target.title;
		let newValue = event.target.value;
		setInputValues({ ...inputValues, [title]: newValue });
	};

	const onAdd = () => {
		if (inputValues.name) {
			// Make call to the server to add new data
			axios.post(
				API_URL + source,
				{
					name: inputValues.name,
					amount: inputValues.money
				},
				{ headers: authHeader() }
			);
			toggle();
		}
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
										placeholder="Where does money come from? *"
										title="name"
										value={inputValues.name}
										onChange={updateInputValues}
									/>
									{isInputFocused && (
										<div className="popup-input-sub">* Required field</div>
									)}
									{inputValues.name === '' && !isInputFocused && (
										<div className="popup-input-sub popup-input-sub-error">
											* Enter income source title
										</div>
									)}
								</div>
								<div className="icon-picker-icon">
									<div className={`card-item-icon card-item-icon-${source}`}>
										<div className="card-item-icon-miscellaneous"></div>
									</div>
								</div>
							</div>

							<div className="create-input create-input-sep">
								<div className="form-item">
									<input
										className="popup-input popup-input-number"
										placeholder="Planning to receive per month"
										title="money"
										type="number"
										value={inputValues.money}
										onChange={updateInputValues}
									/>
								</div>
							</div>

							<div className="form-action">
								<input
									type="button"
									value="add"
									className={`btn-create btn-create-${source}`}
									onClick={onAdd}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddPopUp;
