import React from 'react';
import { RiDeleteBin5Fill, BiCalendarEvent } from 'react-icons/all';
import { IconContext } from 'react-icons';

const Transaction = ({ transaction }) => {
	const {
		transaction: amount,
		account: source,
		category: destination,
		tag: comment
	} = transaction;
	const sign = amount >= 0 ? 'positive' : 'negative';
	return (
		<div className={`transaction transaction-type-${sign}`}>
			<div className="transaction-body">
				<div className="transaction-categories">
					<div className="transaction-source">{source}</div>
					<div className="transaction-destination">{destination}</div>
				</div>
				<div className="transaction-data">
					<div className="transaction-amount">{amount}</div>
					<div className="license-locker">
						{/* <div className="transaction-tags-wrapper transaction-tags-wrapper-no-hide">
          #Mejom
        </div> */}
						<div className="transaction-comment">
							{comment === '' ? 'Add comment' : comment}
						</div>
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
	);
};

export default Transaction;
