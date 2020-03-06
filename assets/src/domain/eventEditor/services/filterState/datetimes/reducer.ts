import { DatetimesFilterStateReducer } from './types';

const reducer: DatetimesFilterStateReducer = (state, action) => {
	const { type, displayStartOrEndDate, datetimesToShow } = action;
	switch (type) {
		case 'SET_DISPLAY_START_OR_END_DATE':
			return { ...state, displayStartOrEndDate };
		case 'SET_DATETIMES_TO_SHOW':
			return { ...state, datetimesToShow };
		default:
			throw new Error('Unknown action');
	}
};

export default reducer;
