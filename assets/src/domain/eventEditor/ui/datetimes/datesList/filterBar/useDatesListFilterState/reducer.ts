import { Action, ActionType, FilterState } from './types';
import { DatesSorted, ShowDates } from '../../../../../interfaces/datetimes/types';
import { DisplayDates } from '@edtrInterfaces/types';
import { Datetime } from '../../../../../services/apollo/types';
import filters from '../../../../../../shared/entities/datetimes/predicates/filters';
import sorters from '../../../../../../shared/entities/datetimes/predicates/sorters';

const reducer = (state: FilterState, action: Action): FilterState => {
	let newState = state;
	let filteredEntities = [];
	switch (action.type) {
		case ActionType.SET_DATES:
			const dates: Datetime[] = action.payload;
			newState = { ...state, dates, filteredEntities: dates };
			break;

		case ActionType.SET_DATES_SORTED_BY:
			const datesSortedBy: DatesSorted = action.payload;
			filteredEntities = sorters({ dates: state.dates, order: datesSortedBy });
			newState = { ...state, datesSortedBy, filteredEntities };
			break;

		/**
		 * On SET_DISPLAY_DATES dates are not processed.
		 * The logic related to what needs to be shown is applied in EventDateCalendarDate.
		 */
		case ActionType.SET_DISPLAY_DATES:
			const displayDates: DisplayDates = action.payload;
			newState = { ...state, displayDates };
			break;

		case ActionType.SET_SHOW_DATES:
			const showDates: ShowDates = action.payload;
			filteredEntities = filters({ dates: state.dates, show: showDates });
			newState = { ...state, filteredEntities, showDates };
			break;
	}
	//console.log('%c newState', 'color: DarkOrange;', newState);
	return newState;
};

export default reducer;
