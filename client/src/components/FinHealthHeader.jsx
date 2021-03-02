import React from 'react';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const FinHealthHeader = () => {
	return (
		<header className="header">
			<div className="header_container">
				<div className="header_left">
					<MonetizationOnIcon
						className="header_logo"
						style={{ fontSize: '50px' }}
					/>
					<div className="header_title">FinHealth</div>
				</div>
				<div className="header_right">
					<div className="header_profile">
						<div
							className="profile_email"
							style={{ zIndex: 1, overflow: 'hidden' }}
							onMouseOver={event => {
								// event.target.style.textDecoration = 'underline';
							}}
						>
							HOW TO PASS ARGUMENT
							{/* <div class="underbar"></div> */}
						</div>
						<div className="header_dropdown-menu profile-dropdown-menu">
							<AccountCircleIcon fontSize="large" />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default FinHealthHeader;
