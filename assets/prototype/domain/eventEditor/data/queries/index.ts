import { GET_DATETIME, GET_DATETIMES } from './datetimes';
import { GET_TICKET, GET_TICKETS } from './tickets';
import { GET_PRICE, GET_PRICES } from './prices';
import { GET_PRICE_TYPE, GET_PRICE_TYPES } from './priceTypes';
import { GET_CURRENT_USER, GET_GENERAL_SETTINGS } from '../../../shared/data/queries';

import { EntityEdge, DatetimeEdge, TicketEdge, PriceEdge, PriceTypeEdge } from '../types';

export const queries = {
	/* datetimes */
	GET_DATETIME,
	GET_DATETIMES,
	/* tickets */
	GET_TICKET,
	GET_TICKETS,
	/* prices */
	GET_PRICE,
	GET_PRICES,
	/* prices */
	GET_PRICE_TYPE,
	GET_PRICE_TYPES,
	/* config */
	GET_CURRENT_USER,
	GET_GENERAL_SETTINGS,
};

export const DEFAULT_ENTITY_LIST_DATA: EntityEdge = {
	nodes: [],
	__typename: '',
};

export const DEFAULT_DATETIME_LIST_DATA: DatetimeEdge = {
	...DEFAULT_ENTITY_LIST_DATA,
	__typename: 'EspressoRootQueryDatetimesConnection',
};

export const DEFAULT_TICKET_LIST_DATA: TicketEdge = {
	...DEFAULT_ENTITY_LIST_DATA,
	__typename: 'EspressoRootQueryTicketsConnection',
};

export const DEFAULT_PRICE_LIST_DATA: PriceEdge = {
	...DEFAULT_ENTITY_LIST_DATA,
	__typename: 'EspressoRootQueryPricesConnection',
};

export const DEFAULT_PRICE_TYPE_LIST_DATA: PriceTypeEdge = {
	...DEFAULT_ENTITY_LIST_DATA,
	__typename: 'EspressoRootQueryPriceTypesConnection',
};
