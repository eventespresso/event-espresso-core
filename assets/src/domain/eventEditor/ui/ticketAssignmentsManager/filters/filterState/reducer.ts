import { FilterStateReducer } from './types';

const reducer: FilterStateReducer = (state, action) => {
	const { type, datesByMonth, showTrashedDates, showExpiredTickets, showTrashedTickets } = action;

	switch (type) {
		case 'SET_DATES_BY_MONTH':
			return { ...state, datesByMonth };

		case 'SET_SHOW_TRASHED_DATES':
			return { ...state, showTrashedDates };

		case 'SET_SHOW_EXPIRED_TICKETS':
			return { ...state, showExpiredTickets };

		case 'SET_SHOW_TRASHED_TICKETS':
			return { ...state, showTrashedTickets };

		default:
			throw new Error('Unexpected action');
	}
};

export default reducer;
