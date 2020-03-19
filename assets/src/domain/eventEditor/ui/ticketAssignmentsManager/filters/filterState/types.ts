import { Reducer } from 'react';

export interface FilterState {
	datesByMonth: [number, number]; //[year, month]
	showTrashedDates: boolean;
	showExpiredTickets: boolean;
	showTrashedTickets: boolean;
}

export type FilterActionType =
	| 'SET_DATES_BY_MONTH'
	| 'SET_SHOW_TRASHED_DATES'
	| 'SET_SHOW_EXPIRED_TICKETS'
	| 'SET_SHOW_TRASHED_TICKETS';

export interface FilterAction extends Partial<FilterState> {
	type: FilterActionType;
}

export type FilterStateManagerHook = () => FilterStateManager;

export interface FilterStateManager extends FilterState {
	setDatesByMonth: (datesByMonth: string) => void;
	setShowTrashedDates: (showTrashedDates: boolean) => void;
	setShowExpiredTickets: (showExpiredTickets: boolean) => void;
	setShowTrashedTickets: (showTrashedTickets: boolean) => void;
}

export type FilterStateReducer = Reducer<FilterState, FilterAction>;
