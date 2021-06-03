import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/auth.service';
import authHeader from '../../services/auth-header.js';
import { TRANSACTION } from '../../constants';
import Transaction from './Transaction';
import moment from 'moment';

const Transactions = ({ currentUser, authChanger }) => {
	const [transactions, setTransactions] = useState([]);
	const getAllTransactions = () => {
		// Make call to the server to get transactions
		axios
			.get(API_URL + TRANSACTION, { headers: authHeader() })
			.then(response => {
				let dateTransactions = [...response.data];
				dateTransactions.sort(
					(earlierDateTransactions, laterDateTransactions) => {
						// later date transactions must come first to show recent ones first
						return earlierDateTransactions._id < laterDateTransactions._id
							? 1
							: -1;
					}
				);
				setTransactions(dateTransactions);
			})
			.catch(err => console.log(err));
	};
	useEffect(() => getAllTransactions(), [currentUser]);
	return (
		<div className="feed">
			{transactions.map(daySlice => {
				let date = moment(daySlice._id);
				let dayOfWeek = date.format('dddd');
				let formattedDate = date.format('D MMMM');
				const dayTransactions = [...daySlice.transactions].reverse();
				const dayTotal = dayTransactions.reduce(
					(acc, transaction) => acc + transaction.transaction,
					0
				);
				const totalSign = dayTotal >= 0 ? 'positive' : 'negative';
				return (
					<div className="day-slice" key={date}>
						<div className="day-slice-date">
							<span className="day-slice-week-day">{dayOfWeek}, </span>
							{formattedDate}
						</div>
						<div className="day-slice-body">
							<div className="day-slice-transactions">
								{dayTransactions.map(transaction => (
									<Transaction
										key={transaction._id}
										transaction={transaction}
									/>
								))}
							</div>
							<div className={`day-slice-footer day-slice-footer-${totalSign}`}>
								{/* <div className="day-slice-balance">
							<div className="day-slice-footer-value">582,022</div>
							<div className="day-slice-footer-title">balance</div>
						</div> */}
								<div className="day-slice-total">
									<div className="day-slice-footer-value">{dayTotal}</div>
									<div className="day-slice-footer-title">total</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Transactions;
