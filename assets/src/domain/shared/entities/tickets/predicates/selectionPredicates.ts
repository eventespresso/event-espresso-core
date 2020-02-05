import { assoc, indexOf, map, propEq, when } from 'ramda';

import { ticketFields } from './ticketFields';
import { entityHasGuid } from '../../../services/predicates/selectionPredicates';

const NO_INDEX = -1;

export const isTicketField = (val, key) => indexOf(key, ticketFields) > NO_INDEX;
export const isExpired = propEq('isExpired', true);
export const updateTicketPrice = (amount) => assoc('price', amount);
export const updateReverseCalculate = (reverseCalculate) => assoc('reverseCalculate', reverseCalculate);

export const updateTicketPriceForTicket = ({ tickets, guid, amount }) =>
	map(when(entityHasGuid(guid), updateTicketPrice(amount)), tickets);
export const updateTicketReverseCalculate = ({ tickets, guid, reverseCalculate }) =>
	map(when(entityHasGuid(guid), updateReverseCalculate(reverseCalculate)), tickets);
