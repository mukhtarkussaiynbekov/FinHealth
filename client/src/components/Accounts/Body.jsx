import React, { useState } from 'react';
import Icon from './Icon';
import { BsPlusCircle } from 'react-icons/all';
import { IconContext } from 'react-icons';
import { CATEGORY, INCOME } from '../../constants';
import { formatter } from '../Profile';

// Create our number formatter.
var numberFormatter = new Intl.NumberFormat('en-US', {
	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
});

const Body = ({
	source,
	setPopUpState,
	collection,
	currentUser,
	renderLimit
}) => {
	const [expanded, setExpanded] = useState(false);
	let accounts = currentUser[collection] ? currentUser[collection] : [];

	let accountComponents = accounts.map((account, idx) => (
		<div
			className={`category category-${source}`}
			key={source + idx.toString()}
		>
			<div className="category-title" title={account.name}>
				{account.name}
			</div>
			<div className="category-icon-wrapper">
				<div className="category-fill">
					<Icon
						iconName={account.iconName}
						source={source}
						onIconSelect={() =>
							setPopUpState({
								isAdd: false,
								popUpSeen: true,
								selectedIdx: idx,
								source: source
							})
						}
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
	));

	accountComponents.push(
		<div className="category category-add-category" key={`${source}-add`}>
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
	);

	return expanded ? (
		<div className="category-block-body">
			{accountComponents}
			<div
				className="category-block-trigger category-block-trigger-opened"
				onClick={() => setExpanded(false)}
			></div>
		</div>
	) : (
		<div className="category-block-body">
			{accountComponents.slice(0, renderLimit)}

			{accountComponents.length > renderLimit && (
				<div
					className="category-block-trigger"
					onClick={() => setExpanded(true)}
				></div>
			)}
		</div>
	);
};

export default Body;
