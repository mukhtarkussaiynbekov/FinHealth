import React from 'react';
import Icon, { icons } from './Icon';

const Icons = ({ source, onIconSelect }) => {
	return (
		<div className={`popup-block icon-picker-wrapper popup-block-${source}`}>
			<div className="card-list">
				{Object.keys(icons).map((iconName, index) => (
					<Icon
						source={source}
						key={source + index.toString()}
						iconName={iconName}
						onIconSelect={onIconSelect}
					/>
				))}
			</div>
		</div>
	);
};

export default Icons;
