import React from 'react';
import Icon, { icons } from './Icon';

const Icons = ({ source }) => {
	return (
		<div className={`popup-block icon-picker-wrapper popup-block-${source}`}>
			<div className="card-list">
				{Object.keys(icons).map(iconName => (
					<Icon
						source={source}
						key={iconName}
						title={iconName}
						icon={iconName}
					/>
				))}
			</div>
		</div>
	);
};

export default Icons;
