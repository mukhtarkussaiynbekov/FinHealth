import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AddIcon from '@material-ui/icons/Add';

const Body = () => {
	return (
		<div className="category-block-body">
			<div className="category category-income">
				<div className="category-title" title="Income">
					Income
				</div>
				<div className="category-icon-wrapper">
					<div className="category-fill"></div>
					<div className="category-icon">
						<LocalAtmIcon fontSize="large" />
					</div>
				</div>
				<div className="category-amount">
					<div className="category-actual-amount">0</div>
				</div>
				<div className="category-edit">
					<CreateIcon fontSize="small" />
				</div>
			</div>
			<div className="category category-add-category">
				<div className="category-icon-wrapper">
					<div className="category-fill"></div>
					<div className="category-icon">
						<AddIcon fontSize="large" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Body;
