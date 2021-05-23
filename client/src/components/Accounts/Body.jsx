import React, { useState } from 'react';
import PopUp from './PopUp';
import Icon from './Icon';
import { BsPlusCircle } from 'react-icons/all';
import { IconContext } from 'react-icons';

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
						<div className="category-fill">
							<Icon
								key="FaCoins"
								title="FaCoins"
								icon="FaCoins"
								source={source}
							/>
							{/* <div className="category-icon"></div> */}
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

			<div className="category category-add-category">
				<div className="category-icon-wrapper">
					<div
						className="category-fill"
						onClick={() =>
							setPopUpState({
								isAdd: true,
								popUpSeen: !popUpState.popUpSeen,
								selectedIdx: -1
							})
						}
					>
						<IconContext.Provider
							value={{
								size: '4em',
								color: 'rgb(179,179,179)',
								className: 'category-icon-add'
							}}
						>
							<BsPlusCircle />
						</IconContext.Provider>
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
