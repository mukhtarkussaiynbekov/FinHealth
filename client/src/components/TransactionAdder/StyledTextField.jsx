import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const StyledTextField = withStyles({
	root: {
		fontWeight: 300,
		minHeight: '20px',
		color: '#757474',
		fontSize: 'inherit',
		fontFamily: 'Roboto',
		whiteSpace: 'nowrap',
		maxWidth: '200px',
		flexDirection: 'column',
		display: 'flex',
		alignSelf: 'flex-end'
	}
})(TextField);

export default StyledTextField;
