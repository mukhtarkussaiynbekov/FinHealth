import AuthService from '../services/auth.service';
import { CHANGE_SOURCE, INCOME, RESET, CATEGORIES } from '../constants';

export default (state = AuthService.getCurrentUser(), action) => {
	let updatedUser;
	switch (action.type) {
		case CHANGE_SOURCE:
			updatedUser = {
				...state,
				[action.payload.collection]: action.payload.data
			};
		case RESET:
			updatedUser = {
				...state,
				[CATEGORIES]: action.payload[CATEGORIES],
				[INCOME]: action.payload[INCOME]
			};
		default:
			updatedUser = AuthService.getCurrentUser();
	}
	localStorage.setItem('user', JSON.stringify(updatedUser));
	return updatedUser;
};
