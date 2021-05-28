import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core';

const StyledAutocomplete = withStyles({
	listbox: {
		position: 'absolute',
		marginTop: '6px',
		backgroundColor: '#fff',
		borderRadius: '3px',
		boxShadow: '0 0 14px 0 rgb(0 0 0 / 17%)',
		fontFamily: 'Roboto',
		zIndex: 2,
		maxHeight: '170px',
		overflow: 'hidden',
		overflowY: 'auto',
		'& li': {
			height: '34px',
			minWidth: '200px',
			maxWidth: '320px',
			color: '#404040',
			fontSize: '16px',
			lineHeight: '34px',
			padding: '0 15px',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		},
		'& li[data-focus="true"]': {
			backgroundColor: '#989898',
			color: '#fff',
			textShadow: '0 0 8px rgb(0 0 0 / 26%)'
		}
	},
	option: {
		'&:first-child': {
			backgroundColor: '#989898',
			color: '#fff',
			textShadow: '0 0 8px rgb(0 0 0 / 26%)'
		}
	}
})(Autocomplete);

export default StyledAutocomplete;
