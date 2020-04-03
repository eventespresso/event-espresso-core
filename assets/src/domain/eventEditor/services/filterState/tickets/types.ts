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
	isChained: boolean;
	sales: TicketsSales;
	status: TicketsStatus;
}

export type TicketsFilterActionType = 'SET_SALES' | 'SET_STATUS' | 'TOGGLE_IS_CHAINED' | EntityFilterActionType;

export interface TicketsFilterAction extends Partial<TicketsFilterState>, EntityFilterAction<TicketsFilterActionType> {}

export interface TicketsFilterStateManager
	extends EntityListFilterStateManager<SortBy>,
		EntityFilterStateManager,
		TicketsFilterState {
	setSales: (sales: TicketsSales) => void;
	setStatus: (status: TicketsStatus) => void;
	toggleIsChained: VoidFunction;
	visibleDatesStr: string;
}

export type TicketsFilterStateReducer = EntityFilterStateReducer<TicketsFilterState, TicketsFilterAction>;

export enum TicketsSales {
	above50Sold = 'above-50-sold',
	above75Sold = 'above-75-sold',
	above90Sold = 'above-90-sold',
	all = 'all',
	below50Sold = 'below-50-sold',
}

export enum TicketsStatus {
	all = 'all',
	expiredOnly = 'expired-only',
	nextOnSaleOrPendingOnly = 'next-on-sale-or-pending-only',
	onSaleAndPending = 'on-sale-and-pending',
	onSaleOnly = 'on-sale-only',
	pendingOnly = 'pending-only',
	soldOutOnly = 'sold-out-only',
	trashedOnly = 'trashed-only',
}
