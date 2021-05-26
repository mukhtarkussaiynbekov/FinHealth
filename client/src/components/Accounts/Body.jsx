import React from 'react';
import Icon from './Icon';
import { BsPlusCircle } from 'react-icons/all';
import { IconContext } from 'react-icons';
import { CATEGORY, INCOME } from '../../constants';
import { formatter } from '../Profile';

const Body = ({ source, setPopUpState, collection, currentUser }) => {
	let accounts = currentUser[collection] ? currentUser[collection] : [];

	// Create our number formatter.
	var numberFormatter = new Intl.NumberFormat('en-US', {
		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
	});

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
						<div className="category-actual-amount">
							{source === INCOME
								? formatter.format(account.amount)
								: formatter.format(account.balance)}
						</div>
						{source === CATEGORY && (
							<div className="category-planned-amount">
								{account.budget !== 0 && numberFormatter.format(account.budget)}
							</div>
						)}
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
