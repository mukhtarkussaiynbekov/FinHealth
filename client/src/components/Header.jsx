import React from 'react';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Header = () => {
	return (
		<header>
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
						>
							email@gmail.com
							<span className="header__link-spacer"></span>
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

export default Header;
