import React from 'react';
import {
	FaBeer,
	FaCoins,
	IoMdAirplane,
	IoBandageOutline,
	RiBankLine,
	SiMailDotRu,
	HiOutlinePresentationChartLine,
	BiDrink,
	FaSprayCan,
	FaBicycle,
	BsBook,
	RiBook3Line,
	IoStatsChartOutline,
	AiFillCamera,
	FaCreditCard,
	BiCar,
	RiWallet3Line,
	RiBuildingLine,
	FaCoffee,
	BsController,
	BiCalculator,
	FaBalanceScaleRight,
	GiInvertedDice6,
	MdDesktopMac,
	FaTheaterMasks,
	BiDumbbell,
	IoFastFoodSharp,
	GiFlowerPot,
	GiForkKnifeSpoon,
	RiOilLine,
	GiPresent,
	IoGlobeOutline,
	FaGraduationCap,
	GiGrapes,
	GiWaterBottle,
	FaGuitar,
	IoHammerOutline,
	BiHeartSquare,
	BsHouseDoor,
	AiOutlineSafetyCertificate,
	IoIosCellular,
	AiOutlinePercentage,
	IoIosPhonePortrait,
	BsMusicPlayer,
	FaBaby,
	VscAccount,
	FaBriefcaseMedical,
	FaRegNewspaper,
	FaItunesNote,
	AiOutlineFormatPainter,
	MdPets,
	FiPhone,
	MdFilterFrames,
	BiPieChartAlt2,
	IoFlowerOutline,
	FaSkullCrossbones,
	FaRegBuilding,
	RiRecordMailLine,
	GiNoodles,
	GiMoneyStack,
	GiPiggyBank,
	HiOutlineShoppingBag,
	GiShoppingCart,
	GiSpiderWeb,
	GiTrophyCup,
	IoBusOutline,
	IoMdGlobe,
	IoShirtOutline,
	GiHanger,
	FaWrench
} from 'react-icons/all';
import { IconContext } from 'react-icons';
import '../../css/icons.css';

export const icons = {
	FaCoins: <FaCoins />,
	FaBeer: <FaBeer />,
	IoMdAirplane: <IoMdAirplane />,
	IoBandageOutline: <IoBandageOutline />,
	RiBankLine: <RiBankLine />,
	SiMailDotRu: <SiMailDotRu />,
	HiOutlinePresentationChartLine: <HiOutlinePresentationChartLine />,
	BiDrink: <BiDrink />,
	FaSprayCan: <FaSprayCan />,
	FaBicycle: <FaBicycle />,
	BsBook: <BsBook />,
	RiBook3Line: <RiBook3Line />,
	IoStatsChartOutline: <IoStatsChartOutline />,
	AiFillCamera: <AiFillCamera />,
	FaCreditCard: <FaCreditCard />,
	BiCar: <BiCar />,
	RiWallet3Line: <RiWallet3Line />,
	RiBuildingLine: <RiBuildingLine />,
	FaCoffee: <FaCoffee />,
	BsController: <BsController />,
	BiCalculator: <BiCalculator />,
	FaBalanceScaleRight: <FaBalanceScaleRight />,
	GiInvertedDice6: <GiInvertedDice6 />,
	MdDesktopMac: <MdDesktopMac />,
	FaTheaterMasks: <FaTheaterMasks />,
	BiDumbbell: <BiDumbbell />,
	IoFastFoodSharp: <IoFastFoodSharp />,
	GiFlowerPot: <GiFlowerPot />,
	GiForkKnifeSpoon: <GiForkKnifeSpoon />,
	RiOilLine: <RiOilLine />,
	GiPresent: <GiPresent />,
	IoGlobeOutline: <IoGlobeOutline />,
	FaGraduationCap: <FaGraduationCap />,
	GiGrapes: <GiGrapes />,
	GiWaterBottle: <GiWaterBottle />,
	FaGuitar: <FaGuitar />,
	IoHammerOutline: <IoHammerOutline />,
	BiHeartSquare: <BiHeartSquare />,
	BsHouseDoor: <BsHouseDoor />,
	AiOutlineSafetyCertificate: <AiOutlineSafetyCertificate />,
	IoIosCellular: <IoIosCellular />,
	AiOutlinePercentage: <AiOutlinePercentage />,
	IoIosPhonePortrait: <IoIosPhonePortrait />,
	BsMusicPlayer: <BsMusicPlayer />,
	FaBaby: <FaBaby />,
	VscAccount: <VscAccount />,
	FaBriefcaseMedical: <FaBriefcaseMedical />,
	FaRegNewspaper: <FaRegNewspaper />,
	FaItunesNote: <FaItunesNote />,
	AiOutlineFormatPainter: <AiOutlineFormatPainter />,
	MdPets: <MdPets />,
	FiPhone: <FiPhone />,
	MdFilterFrames: <MdFilterFrames />,
	BiPieChartAlt2: <BiPieChartAlt2 />,
	IoFlowerOutline: <IoFlowerOutline />,
	FaSkullCrossbones: <FaSkullCrossbones />,
	FaRegBuilding: <FaRegBuilding />,
	RiRecordMailLine: <RiRecordMailLine />,
	GiNoodles: <GiNoodles />,
	GiMoneyStack: <GiMoneyStack />,
	GiPiggyBank: <GiPiggyBank />,
	HiOutlineShoppingBag: <HiOutlineShoppingBag />,
	GiShoppingCart: <GiShoppingCart />,
	GiSpiderWeb: <GiSpiderWeb />,
	GiTrophyCup: <GiTrophyCup />,
	IoBusOutline: <IoBusOutline />,
	IoMdGlobe: <IoMdGlobe />,
	IoShirtOutline: <IoShirtOutline />,
	GiHanger: <GiHanger />,
	FaWrench: <FaWrench />
};

const Icon = ({ source, iconName, onIconSelect }) => {
	return (
		<div
			className={`card-item-icon card-item-icon-${source}`}
			title={iconName}
			onClick={onIconSelect}
		>
			<IconContext.Provider
				value={{ size: '2em', color: 'white', className: 'card-icon' }}
			>
				{icons[iconName]}
			</IconContext.Provider>
		</div>
	);
};

export default Icon;
