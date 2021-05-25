import React from 'react';
import { ACCOUNT, CATEGORY, HEADER, INCOME, messages } from '../../constants';

const Header = ({ source, currentUser }) => {
	const reducer = property => (accumulator, currentValue) =>
		accumulator + parseInt(currentValue[property]);
	let totalAccumulated = currentUser[source]
		? currentUser[source].reduce(
				reducer(source === INCOME ? 'amount' : 'balance'),
				0
		  )
		: 0;

	let totalPlanned =
		source === CATEGORY && currentUser[source]
			? currentUser[source].reduce(reducer('budget'), 0)
			: 0;

	// Create our number formatter.
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'KRW',

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
	});

	return (
		<div className="category-block-header">
			<div className="category-block-title">
				<div className="category-block-name">{source}</div>
				{source !== ACCOUNT && (
					<div className="category-block-date">01/25/2021-02/24/2021</div>
				)}
			</div>
			<div className="category-block-stats">
				<div className="category-block-stats-item">
					<div className="category-block-stats-amount">
						{formatter.format(totalAccumulated)}
					</div>
					<div className="category-block-stats-title">
						{messages[HEADER][source]}
					</div>
				</div>
				{source === CATEGORY && (
					<div className="category-block-stats-item">
						<div className="category-block-stats-amount">
							{formatter.format(totalPlanned)}
						</div>
						<div className="category-block-stats-title">planned</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
