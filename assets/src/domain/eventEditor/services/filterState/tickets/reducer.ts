import { TicketsFilterStateReducer } from './types';

const reducer: TicketsFilterStateReducer = (state, action) => {
	const { displayStartOrEndDate, sales, status, type } = action;
	switch (type) {
		case 'SET_DISPLAY_START_OR_END_DATE':
			return { ...state, displayStartOrEndDate };
		case 'SET_SALES':
			return { ...state, sales };
		case 'SET_STATUS':
			return { ...state, status };
		case 'TOGGLE_IS_CHAINED':
			return { ...state, isChained: !state.isChained };
		default:
			throw new Error('Unknown action');
	}
};

export default reducer;
