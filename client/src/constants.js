export const INCOME = 'income';
export const ACCOUNT = 'account';
export const CATEGORY = 'category';
export const ACCOUNTS = 'accounts';
export const CATEGORIES = 'categories';
export const HEADER = 'header';
export const POPUP_TITLE = 'popup_title';
export const POPUP_AMOUNT = 'popup_amount';
export const BALANCE = 'balance';
export const AMOUNT = 'amount';
export const BUDGET = 'budget';

export const messages = {
	[HEADER]: { [INCOME]: 'received', [ACCOUNT]: 'balance', [CATEGORY]: 'spent' },
	[POPUP_TITLE]: {
		[INCOME]: 'Where does income come from?',
		[ACCOUNT]: 'Where do you keep your money?',
		[CATEGORY]: 'Where do you spend money on?'
	},
	[POPUP_AMOUNT]: {
		[ACCOUNT]: 'How much money is there at the moment?',
		[CATEGORY]: 'Planning to spend per month'
	}
};

export const SOURCE_TO_COLLECTION = {
	[INCOME]: INCOME,
	[ACCOUNT]: ACCOUNTS,
	[CATEGORY]: CATEGORIES
};
