export const INCOME = 'income';
export const ACCOUNT = 'account';
export const CATEGORY = 'category';
export const HEADER = 'header';
export const POPUP = 'popup';

export const messages = {
	[HEADER]: { [INCOME]: 'received', [ACCOUNT]: 'balance', [CATEGORY]: 'spent' },
	[POPUP]: {
		[INCOME]: 'Where does income come from?',
		[ACCOUNT]: 'Where do you keep your money?',
		[CATEGORY]: 'Where do you spend money on?'
	}
};
