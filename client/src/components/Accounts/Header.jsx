import React from 'react';
import {
	CATEGORIES,
	CATEGORY,
	HEADER,
	INCOME,
	messages
} from '../../constants';
import { formatter } from '../Profile';
import { API_URL } from '../../services/auth.service';
import axios from 'axios';
import authHeader from '../../services/auth-header.js';
import { updateStorage } from '../App';
import '../../css/accounts.css';

const Header = ({ source, collection, currentUser, authChanger }) => {
	const reducer = property => (accumulator, currentValue) =>
		accumulator + currentValue[property];
	let totalAccumulated = currentUser[collection]
		? currentUser[collection].reduce(
				reducer(source === INCOME ? 'amount' : 'balance'),
				0
		  )
		: 0;

	let totalPlanned =
		source === CATEGORY && currentUser[collection]
			? currentUser[collection].reduce(reducer('budget'), 0)
			: 0;

	const onReset = () => {
		axios
			.post(API_URL + 'reset', {}, { headers: authHeader() })
			.then(response => {
				updateStorage({
					...currentUser,
					[CATEGORIES]: response.data[CATEGORIES],
					[INCOME]: response.data[INCOME]
				});
				authChanger();
			});
	};

	return (
		<div className="category-block-header">
			<div className="category-block-title">
				<div className="category-block-name">{source}</div>
				{source === INCOME && (
					// Resets amount of incomes and balance of categories
					<button onClick={onReset}>Reset</button>
					//<div className="category-block-date">01/25/2021-02/24/2021</div>
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
