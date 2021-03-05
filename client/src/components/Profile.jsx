import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import Accounts from './Accounts/Accounts';
import Transactions from './Transactions/Transactions';

const Profile = () => {
	const [state, setState] = useState({
		currentUser: AuthService.getCurrentUser()
	});
	const { currentUser } = state;

	return (
		<div className="data-container container-dashboard">
			<div className="dashboard">
				<div className="dashboard-body">
					<div className="dashboard-column" style={{ minWidth: 540 }}>
						<Accounts />
					</div>
					<div className="dashboard-column">
						<Transactions />
					</div>
				</div>
			</div>
		</div>
	);
	// <div className="container">
	//   <header className="jumbotron">
	//     <h3>
	//       <strong>{currentUser.email}</strong> Profile
	//     </h3>
	//   </header>
	//   <p>
	//     <strong>Token:</strong>{" "}
	//     {currentUser.accessToken.substring(0, 20)} ...{" "}
	//     {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
	//   </p>
	//   <p>
	//     <strong>Id:</strong>{" "}
	//     {currentUser.id}
	//   </p>
	//   <strong>Authorities:</strong>
	//   <ul>
	//     {currentUser.roles &&
	//       currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
	//   </ul>
	// </div>
};

export default Profile;
