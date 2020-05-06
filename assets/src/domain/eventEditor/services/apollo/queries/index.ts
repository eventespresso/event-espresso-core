import { DatetimeEdge, TicketEdge, PriceEdge, PriceTypeEdge } from '../types';
import { EntityEdge } from '@dataServices/types';

export const DEFAULT_ENTITY_LIST_DATA: EntityEdge = {
	nodes: [],
	__typename: '',
};

export const DEFAULT_DATETIME_LIST_DATA: DatetimeEdge = {
	nodes: [],
	__typename: 'EspressoRootQueryDatetimesConnection',
};

export const DEFAULT_TICKET_LIST_DATA: TicketEdge = {
	nodes: [],
	__typename: 'EspressoRootQueryTicketsConnection',
};

export const DEFAULT_PRICE_LIST_DATA: PriceEdge = {
	nodes: [],
	__typename: 'EspressoRootQueryPricesConnection',
};

export const DEFAULT_PRICE_TYPE_LIST_DATA: PriceTypeEdge = {
	nodes: [],
	__typename: 'EspressoRootQueryPriceTypesConnection',
};

export * from './datetimes';

export * from './events';

export * from './tickets';

export * from './prices';

export * from './priceTypes';

export * from './types';
