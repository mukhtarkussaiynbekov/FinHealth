import React from 'react';
import { RiDeleteBin5Fill, BiCalendarEvent } from 'react-icons/all';
import { IconContext } from 'react-icons';
import '../../css/transactions.css';

const Transaction = () => {
	return (
		<div className="feed">
			<div className="day-slice">
				<div className="day-slice-date">
					<span className="day-slice-week-day">Today, </span>2 March
				</div>
				<div className="day-slice-body">
					<div className="day-slice-transactions">
						<div className="transaction transaction-type-negative">
							<div className="transaction-body">
								<div className="transaction-categories">
									<div className="transaction-source">Bank account</div>
									<div className="transaction-destination">Food</div>
								</div>
								<div className="transaction-data">
									<div className="transaction-amount">-4,700</div>
									<div className="license-locker">
										<div className="transaction-tags-wrapper transaction-tags-wrapper-no-hide">
											#Mejom
										</div>
										<div className="transaction-comment">Add comment</div>
									</div>
								</div>
							</div>
							<div className="transaction-edit">
								<IconContext.Provider
									value={{
										size: '1em'
									}}
								>
									<div className="transaction-delete">
										<RiDeleteBin5Fill />
									</div>
									<div className="transaction-calendar">
										<BiCalendarEvent />
									</div>
								</IconContext.Provider>
							</div>
						</div>
					</div>
					<div className="day-slice-footer day-slice-footer-positive">
						<div className="day-slice-balance">
							<div className="day-slice-footer-value">582,022</div>
							<div className="day-slice-footer-title">balance</div>
						</div>
						<div className="day-slice-total">
							<div className="day-slice-footer-value">2,080</div>
							<div className="day-slice-footer-title">total</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Transaction;
