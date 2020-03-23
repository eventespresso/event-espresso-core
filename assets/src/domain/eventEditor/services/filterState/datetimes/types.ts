import {
	SortBy,
	EntityFilterState,
	EntityFilterAction,
	EntityFilterActionType,
	EntityFilterStateManager,
	EntityFilterStateReducer,
} from '@sharedServices/filterState';
import { EntityListFilterStateManager } from '@appLayout/entityList/filterBar';

export interface DatetimesFilterState extends EntityFilterState {
	sales: Sales;
	status: Status;
}

export type DatetimesFilterActionType = 'SET_SALES' | 'SET_STATUS' | EntityFilterActionType;

export interface DatetimesFilterAction
	extends Partial<DatetimesFilterState>,
		EntityFilterAction<DatetimesFilterActionType> {}

export interface DatetimesFilterStateManager
	extends EntityListFilterStateManager<SortBy>,
		EntityFilterStateManager,
		DatetimesFilterState {
	setSales: (sales: Sales) => void;
	setStatus: (status: Status) => void;
}

export type DatetimesFilterStateReducer = EntityFilterStateReducer<DatetimesFilterState, DatetimesFilterAction>;

export enum Status {
	activeUpcoming = 'activeUpcoming',
	activeOnly = 'activeOnly',
	all = 'all',
	expiredOnly = 'expiredOnly',
	nextActiveUpcomingOnly = 'nextActiveUpcomingOnly',
	recentlyExpiredOnly = 'recentlyExpiredOnly',
	soldOutOnly = 'soldOutOnly',
	trashedOnly = 'trashedOnly',
	upcomingOnly = 'upcomingOnly',
}

export enum Sales {
	above90Capacity = 'above90Capacity',
	above75Capacity = 'above75Capacity',
	above50Capacity = 'above50Capacity',
	all = 'all',
	below50Capacity = 'below50Capacity',
}
