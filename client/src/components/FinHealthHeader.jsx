import React from 'react';
import { MdMonetizationOn } from 'react-icons/all';
import { IconContext } from 'react-icons';

const FinHealthHeader = ({ email, onLogOut }) => {
	return (
		<header className="header">
			<div className="header_container">
				<div className="header_left">
					<IconContext.Provider
						value={{
							size: '4em',
							className: 'header_logo'
						}}
					>
						<MdMonetizationOn />
					</IconContext.Provider>
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
							{email}
							{/* <div class="underbar"></div> */}
						</div>
						{/* <div className="header_dropdown-menu profile-dropdown-menu">
							<AccountCircleIcon fontSize="large" />
						</div> */}
						<a href="/login" className="nav-link" onClick={onLogOut}>
							LogOut
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default FinHealthHeader;
