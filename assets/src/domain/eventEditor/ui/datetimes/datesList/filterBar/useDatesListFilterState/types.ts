import { Datetime } from '../../../../../services/apollo/types';
import { DatesSorted, ShowDates } from '../../../../../interfaces/datetimes/types';
import { DisplayDates } from '@edtrInterfaces/shared/types';

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

export interface SetDatesSortedByInterface {
	(datesSortedBy: DatesSorted): void;
}

export interface SetDisplayDatesInterface {
	(displayDates: DisplayDates): void;
}

export interface SetShowDatesInterface {
	(showDates: ShowDates): void;
}

export interface FilterStateManager extends FilterState {
	setDatesSortedBy: SetDatesSortedByInterface;
	setDisplayDates: SetDisplayDatesInterface;
	setShowDates: SetShowDatesInterface;
}
