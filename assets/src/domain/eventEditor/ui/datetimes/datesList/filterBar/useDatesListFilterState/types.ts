import { Datetime } from '../../../../../services/apollo/types';
import { DatesSorted, DisplayDates, ShowDates } from '../../../../../interfaces/datetimes/types';

export interface Action {
	payload: any;
	type: ActionType;
}

export enum ActionType {
	SET_DATES = 'SET_DATES',
	SET_DATES_SORTED_BY = 'SET_DATES_SORTED_BY',
	SET_DISPLAY_DATES = 'SET_DISPLAY_DATES',
	SET_SHOW_DATES = 'SET_SHOW_DATES',
}

export interface FilterState {
	dates: Datetime[];
	datesSortedBy: DatesSorted;
	displayDates: DisplayDates;
	filteredEntities: Datetime[];
	showDates: ShowDates;
}

export interface FilterStateManager extends FilterState {
	setDatesSortedBy: (datesSortedBy: DatesSorted) => void;
	setDisplayDates: (displayDates: DisplayDates) => void;
	setShowDates: (showDates: ShowDates) => void;
}
