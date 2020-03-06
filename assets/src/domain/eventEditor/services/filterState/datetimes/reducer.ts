import { DatetimesFilterStateReducer } from './types';

const reducer: DatetimesFilterStateReducer = (state, action) => {
	const { type, dateToDisplay, datetimesToShow } = action;
	switch (type) {
		case 'SET_DATE_TO_DISPLAY':
			return { ...state, dateToDisplay };
		case 'SET_DATETIMES_TO_SHOW':
			return { ...state, datetimesToShow };
		default:
			throw new Error('Unknown action');
	}
};

export default reducer;
