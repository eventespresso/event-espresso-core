import { assoc, find, map, propEq, when } from 'ramda';

import { entityHasDbId, entityHasGuid, findEntityByDbId, findEntityByGuid } from '../shared/selectionPredicates';

export const isExpired = propEq('isExpired', true);
export const findTicketByDbId = (tickets) => findEntityByDbId(tickets);
export const findTicketByGuid = (tickets) => findEntityByGuid(tickets);
export const updateTicketPrice = (amount) => assoc('price', amount);
export const updateReverseCalculate = (reverseCalculate) => assoc('reverseCalculate', reverseCalculate);

export const updateTicketPriceForTicket = ({ tickets, guid, amount }) =>
	map(when(entityHasGuid(guid), updateTicketPrice(amount)), tickets);
export const updateTicketReverseCalculate = ({ tickets, guid, reverseCalculate }) =>
	map(when(entityHasGuid(guid), updateReverseCalculate(reverseCalculate)), tickets);
