import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AddIcon from '@material-ui/icons/Add';
import PopUp from './PopUp';

const Body = ({ source, currentUser }) => {
	let accounts = currentUser[source];
	const [popUpState, setPopUpState] = useState({
		popUpSeen: false,
		isAdd: false,
		selectedIdx: -1
	});

	const togglePop = () => {
		setPopUpState({ ...popUpState, popUpSeen: !popUpState.popUpSeen });
	};

	return (
		<div className="category-block-body">
			{accounts.map((account, idx) => (
				<div className={`category category-${source}`} key={idx}>
					<div className="category-title" title={account.name}>
						{account.name}
					</div>
					<div
						className="category-icon-wrapper"
						onClick={() =>
							setPopUpState({
								isAdd: false,
								popUpSeen: !popUpState.popUpSeen,
								selectedIdx: idx
							})
						}
					>
						<div className="category-fill"></div>
						<div className="category-icon">
							<LocalAtmIcon fontSize="large" />
						</div>
					</div>
					<div className="category-amount">
						<div className="category-actual-amount">{account.amount}</div>
					</div>
					{/* <div
						className="category-edit"
						onClick={() =>
							setPopUpState({
								isAdd: false,
								popUpSeen: !popUpState.popUpSeen,
								selectedIdx: idx
							})
						}
					>
						<CreateIcon fontSize="small" />
					</div> */}
				</div>
			))}

			<div
				className="category category-add-category"
				onClick={() =>
					setPopUpState({
						isAdd: true,
						popUpSeen: !popUpState.popUpSeen,
						selectedIdx: -1
					})
				}
			>
				<div className="category-icon-wrapper">
					<div className="category-fill"></div>
					<div className="category-icon">
						<AddIcon fontSize="large" />
					</div>
				</div>
			</div>
			{popUpState.popUpSeen && (
				<PopUp
					toggle={togglePop}
					source={source}
					currentUser={currentUser}
					isAdd={popUpState.isAdd}
					selectedIdx={popUpState.selectedIdx}
				/>
			)}
		</div>
	);
};

export default Body;
