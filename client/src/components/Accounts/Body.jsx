import React, { useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AddIcon from '@material-ui/icons/Add';
import AddPopUp from './AddPopUp';

const Body = ({ source, userID }) => {
	const [addPopUpSeen, setAddPopUpSeen] = useState(false);

	const togglePop = () => {
		setAddPopUpSeen(!addPopUpSeen);
	};

	return (
		<div className="category-block-body">
			<div className={`category category-${source}`}>
				<div className="category-title" title={source}>
					{source}
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
			<div className="category category-add-category" onClick={togglePop}>
				<div className="category-icon-wrapper">
					<div className="category-fill"></div>
					<div className="category-icon">
						<AddIcon fontSize="large" />
					</div>
				</div>
			</div>
			{addPopUpSeen && (
				<AddPopUp toggle={togglePop} source={source} userID={userID} />
			)}
		</div>
	);
};

export default Body;
