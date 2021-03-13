import React from 'react';

const AddPopUp = ({ toggle }) => {
	const handleClick = event => {
		if (event.target.className === 'popup-message') {
			toggle();
		}
	};

	return (
		<div className="popup-block" onClick={handleClick}>
			<div className="popup-message">
				<div className="popup-content">
					<div className="popup-block popup-block-income">
						<div>
							<div className="create-input create-input-sep">
								<div className="form-item">
									<input
										className="popup-input"
										placeholder="Where does money come from? *"
									/>
									<div className="popup-input-sub popup-input-sub-error">
										* Enter income source title
									</div>
								</div>
								<div className="icon-picker-icon">
									<div className="card-item-icon card-item-icon-income">
										<div className="card-item-icon-miscellaneous"></div>
									</div>
								</div>
							</div>

							<div className="create-input create-input-sep">
								<div className="form-item">
									<input
										className="popup-input popup-input-number"
										placeholder="Planning to receive per month"
									/>
								</div>
							</div>

							<div class="form-action">
								<input
									type="button"
									value="add"
									class="btn-create btn-create-income"
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
