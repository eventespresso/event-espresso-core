import { EdtrStateReducer } from './types';

const reducer: EdtrStateReducer = (state, action) => {
	const { type, visibleDatetimeIds } = action;

	switch (type) {
		case 'SET_VISIBLE_DATETIME_IDS':
			return { ...state, visibleDatetimeIds };

		default:
			throw new Error('Unexpected action');
	}
};

export default reducer;
