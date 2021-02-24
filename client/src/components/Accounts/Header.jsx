import React from 'react';

const Header = ({ title }) => {
	return (
		<div className="row category-block-header">
			<div className="col-6 category-block-title">
				<div className="category-block-name">Income</div>
				<div className="category-block-date">01/25/2021-02/24/2021</div>
			</div>
			<div className="col-6 category-block-stats">
				<div className="category-block-stats-item">
					<div className="category-block-stats-amount">733,755</div>
					<div className="category-block-stats-title">received</div>
				</div>
				<div className="category-block-stats-item">
					<div className="category-block-stats-amount">575,000</div>
					<div className="category-block-stats-title">budget</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
