import {
	EntityFilterState,
	EntityFilterAction,
	EntityFilterActionType,
	EntityFilterStateManager,
	EntityFilterStateReducer,
} from '@sharedServices/filterState';
import { EntityListFilterStateManager } from '@appLayout/entityList/filterBar';

export interface DatetimesFilterState extends EntityFilterState {
	datetimesToShow: DatetimesToShow;
}

export type DatetimesFilterActionType = 'SET_DATETIMES_TO_SHOW' | EntityFilterActionType;

export interface DatetimesFilterAction
	extends Partial<DatetimesFilterState>,
		EntityFilterAction<DatetimesFilterActionType> {}

export interface DatetimesFilterStateManager
	extends EntityListFilterStateManager,
		EntityFilterStateManager,
		DatetimesFilterState {
	setDatetimesToShow: (datetimesToShow: DatetimesToShow) => void;
}

export type DatetimesFilterStateReducer = EntityFilterStateReducer<DatetimesFilterState, DatetimesFilterAction>;

export enum DatetimesToShow {
	activeUpcoming = 'activeUpcoming',
	activeOnly = 'activeOnly',
	above90Capacity = 'above90Capacity',
	above75Capacity = 'above75Capacity',
	above50Capacity = 'above50Capacity',
	all = 'all',
	below50Capacity = 'below50Capacity',
	expiredOnly = 'expiredOnly',
	nextActiveUpcomingOnly = 'nextActiveUpcomingOnly',
	recentlyExpiredOnly = 'recentlyExpiredOnly',
	soldOutOnly = 'soldOutOnly',
	trashedOnly = 'trashedOnly',
	upcomingOnly = 'upcomingOnly',
}
