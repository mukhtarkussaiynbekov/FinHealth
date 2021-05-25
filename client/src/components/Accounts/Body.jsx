import React from 'react';
import Icon from './Icon';
import { BsPlusCircle } from 'react-icons/all';
import { IconContext } from 'react-icons';

const Body = ({ source, currentUser, setPopUpState }) => {
	let accounts = currentUser[source] ? currentUser[source] : [];

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
								popUpSeen: true,
								selectedIdx: idx,
								source: source
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
						</div>
					</div>
					<div className="category-amount">
						<div className="category-actual-amount">{account.amount}</div>
					</div>
				</div>
			))}

			<div className="category category-add-category">
				<div className="category-icon-wrapper">
					<div
						className="category-fill"
						onClick={() =>
							setPopUpState({
								isAdd: true,
								popUpSeen: true,
								selectedIdx: -1,
								source: source
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
		</div>
	);
};

export default Body;
