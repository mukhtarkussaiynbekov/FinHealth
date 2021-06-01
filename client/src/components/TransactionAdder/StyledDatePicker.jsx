import { withStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

const StyledDatePicker = withStyles({
	root: {
		display: 'inline-block',
		verticalAlign: 'middle'
	}
})(DatePicker);

export default StyledDatePicker;
