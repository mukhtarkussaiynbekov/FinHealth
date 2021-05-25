import React, { useState } from 'react';
import { ACCOUNT, CATEGORY, INCOME } from '../constants';
import Accounts from './Accounts/Accounts';
import Transactions from './Transactions/Transactions';
import PopUp from './Accounts/PopUp';

const Profile = () => {
	const [popUpState, setPopUpState] = useState({
		popUpSeen: false,
		isAdd: false,
		selectedIdx: -1,
		source: [INCOME]
	});

	const togglePop = () => {
		setPopUpState({ ...popUpState, popUpSeen: !popUpState.popUpSeen });
	};

	return (
		<div className="data-container container-dashboard">
			<div className="dashboard">
				<div className="dashboard-body">
					<div className="dashboard-column" style={{ minWidth: 540 }}>
						<Accounts source={INCOME} setPopUpState={setPopUpState} />
						<Accounts source={ACCOUNT} setPopUpState={setPopUpState} />
						<Accounts source={CATEGORY} setPopUpState={setPopUpState} />
						{popUpState.popUpSeen && (
							<PopUp
								toggle={togglePop}
								source={popUpState.source}
								isAdd={popUpState.isAdd}
								selectedIdx={popUpState.selectedIdx}
							/>
						)}
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
