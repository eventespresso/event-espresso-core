import { assoc, indexOf, map, propEq, when } from 'ramda';

import { ticketFields } from './ticketFields';
import { entityHasGuid } from '../../../services/predicates';
import { Ticket } from '../../../../eventEditor/services/apollo/types';
const NO_INDEX = -1;

export const isTicketField = (val, key): boolean => indexOf(key, ticketFields) > NO_INDEX;
export const isExpired = propEq('isExpired', true);
export const updateTicketPrice = (amount): ((obj: Ticket) => Record<keyof Ticket, number> & Ticket) =>
	assoc<number, keyof Ticket>('price', amount);
export const updateReverseCalculate = (reverseCalculate): ((obj: Ticket) => Record<keyof Ticket, number> & Ticket) =>
	assoc<number, keyof Ticket>('reverseCalculate', reverseCalculate);

export const updateTicketPriceForTicket = ({ tickets, guid, amount }): Ticket[] =>
	map(when(entityHasGuid(guid), updateTicketPrice(amount)), tickets);
export const updateTicketReverseCalculate = ({ tickets, guid, reverseCalculate }): Ticket[] =>
	map(when(entityHasGuid(guid), updateReverseCalculate(reverseCalculate)), tickets);
