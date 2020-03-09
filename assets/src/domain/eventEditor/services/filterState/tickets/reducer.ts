import { TicketsFilterStateReducer } from './types';

const reducer: TicketsFilterStateReducer = (state, action) => {
	const { type, displayStartOrEndDate, ticketsToShow } = action;
	switch (type) {
		case 'SET_DISPLAY_START_OR_END_DATE':
			return { ...state, displayStartOrEndDate };
		case 'SET_TICKETS_TO_SHOW':
			return { ...state, ticketsToShow };
		case 'TOGGLE_IS_CHAINED':
			return { ...state, isChained: !state.isChained };
		default:
			throw new Error('Unknown action');
	}
};

export default reducer;
