import {
	SortBy,
	EntityFilterState,
	EntityFilterAction,
	EntityFilterActionType,
	EntityFilterStateManager,
	EntityFilterStateReducer,
} from '@sharedServices/filterState';
import { EntityListFilterStateManager } from '@appLayout/entityList/filterBar';

export interface TicketsFilterState extends EntityFilterState {
	ticketsToShow: TicketsToShow;
	isChained: boolean;
}

export type TicketsFilterActionType = 'SET_TICKETS_TO_SHOW' | 'TOGGLE_IS_CHAINED' | EntityFilterActionType;

export interface TicketsFilterAction extends Partial<TicketsFilterState>, EntityFilterAction<TicketsFilterActionType> {}

export interface TicketsFilterStateManager
	extends EntityListFilterStateManager<SortBy>,
		EntityFilterStateManager,
		TicketsFilterState {
	setTicketsToShow: (ticketsToShow: TicketsToShow) => void;
	toggleIsChained: VoidFunction;
}

export type TicketsFilterStateReducer = EntityFilterStateReducer<TicketsFilterState, TicketsFilterAction>;

export enum TicketsToShow {
	above50Sold = 'above-50-sold',
	above75Sold = 'above-75-sold',
	above90Sold = 'above-90-sold',
	all = 'all',
	trashedOnly = 'trashed-only',
	below50Sold = 'below-50-sold',
	expiredOnly = 'expired-only',
	nextOnSaleOrPendingOnly = 'next-on-sale-or-pending-only',
	onSaleAndPending = 'on-sale-and-pending',
	onSaleOnly = 'on-sale-only',
	pendingOnly = 'pending-only',
	soldOutOnly = 'sold-out-only',
}
