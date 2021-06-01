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
		display: 'inline-block',
		verticalAlign: 'middle'
	}
})(TextField);

export default StyledTextField;
