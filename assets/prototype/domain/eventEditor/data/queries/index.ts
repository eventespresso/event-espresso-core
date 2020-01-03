import { GET_DATETIME, GET_DATETIMES } from './datetimes';
import { GET_TICKET, GET_TICKETS } from './tickets';
import { GET_PRICE, GET_PRICES } from './prices';
import { GET_PRICE_TYPE, GET_PRICE_TYPES } from './priceTypes';
import { GET_CURRENT_USER } from './currentUser';
import { GET_GENERAL_SETTINGS } from './generalSettings';

import { EntityListName } from './types';

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

export const DEFAULT_ENTITY_LIST_DATA = (entity: EntityListName) => {
	return {
		nodes: [],
		__typename: `EspressoRootQuery${entity}Connection`,
	};
};
