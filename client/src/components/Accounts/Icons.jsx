import React from 'react';
import { FaBeer, FaCoins } from 'react-icons/fa';
import { IoMdAirplane } from 'react-icons/io';
import { IoBandageOutline } from 'react-icons/io5';
import { RiBankLine } from 'react-icons/ri';
import { SiMailDotRu } from 'react-icons/si';
import { IconContext } from 'react-icons';

const Icons = ({ source }) => {
	return (
		<div className={`popup-block icon-picker-wrapper popup-block-${source}`}>
			<div className="card-list">
				<div className={`card-item-icon card-item-icon-${source}`}>
					<IconContext.Provider
						value={{ size: '2em', color: 'white', className: 'card-icon' }}
					>
						<FaCoins />
					</IconContext.Provider>
				</div>
				<div className={`card-item-icon card-item-icon-${source}`}>
					<IconContext.Provider
						value={{ size: '2em', color: 'white', className: 'card-icon' }}
					>
						<FaBeer />
					</IconContext.Provider>
				</div>
				<div className={`card-item-icon card-item-icon-${source}`}>
					<IconContext.Provider
						value={{ size: '2em', color: 'white', className: 'card-icon' }}
					>
						<IoMdAirplane />
					</IconContext.Provider>
				</div>
				<div className={`card-item-icon card-item-icon-${source}`}>
					<IconContext.Provider
						value={{ size: '2em', color: 'white', className: 'card-icon' }}
					>
						<SiMailDotRu />
					</IconContext.Provider>
				</div>
				<div className={`card-item-icon card-item-icon-${source}`}>
					<IconContext.Provider
						value={{ size: '2em', color: 'white', className: 'card-icon' }}
					>
						<IoBandageOutline />
					</IconContext.Provider>
				</div>
				<div className={`card-item-icon card-item-icon-${source}`}>
					<IconContext.Provider
						value={{ size: '2em', color: 'white', className: 'card-icon' }}
					>
						<RiBankLine />
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
};

export default Icons;
