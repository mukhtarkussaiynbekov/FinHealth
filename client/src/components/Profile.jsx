import React, { useEffect, useState } from 'react';
import {
	ACCOUNTS,
	CATEGORIES,
	CATEGORY,
	INCOME,
	SOURCE_TO_COLLECTION,
	ACCOUNT
} from '../constants';
import Accounts from './Accounts/Accounts';
import Transactions from './Transactions/Transactions';
import PopUp from './Accounts/PopUp';
import { useDispatch, useSelector } from 'react-redux';

// Create our number formatter.
export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'KRW',

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
});

const Profile = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state);
	useEffect(() => {
		dispatch({ type: '' });
	});
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
				{currentUser && (
					<div className="dashboard-body">
						<div className="dashboard-column" style={{ minWidth: 540 }}>
							<Accounts
								source={INCOME}
								collection={INCOME}
								setPopUpState={setPopUpState}
							/>
							<Accounts
								source={ACCOUNT}
								collection={ACCOUNTS}
								setPopUpState={setPopUpState}
							/>
							<Accounts
								source={CATEGORY}
								collection={CATEGORIES}
								setPopUpState={setPopUpState}
							/>
							{popUpState.popUpSeen && (
								<PopUp
									toggle={togglePop}
									source={popUpState.source}
									isAdd={popUpState.isAdd}
									selectedIdx={popUpState.selectedIdx}
									collection={SOURCE_TO_COLLECTION[popUpState.source]}
								/>
							)}
						</div>
						<div className="dashboard-column">
							<Transactions />
						</div>
					</div>
				)}
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
