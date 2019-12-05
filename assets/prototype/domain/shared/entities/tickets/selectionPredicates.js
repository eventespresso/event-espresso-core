import { assoc, find, map, propEq, when } from 'ramda';

export const isExpired = propEq('isExpired', true);
export const ticketHasDbId = (dbid) => propEq('dbid', dbid);
export const ticketHasGuid = (guid) => propEq('id', guid);
export const findTicketByDbId = ({ tickets, dbid }) => find(ticketHasDbId(dbid))(tickets);
export const findTicketByGuid = ({ tickets, guid }) => find(ticketHasGuid(guid))(tickets);
export const updateTicketPrice = (amount) => assoc('price', amount);
export const updateReverseCalculate = (reverseCalculate) => assoc('reverseCalculate', reverseCalculate);

export const updateTicketPriceForTicket = ({ tickets, guid, amount }) => map(
	when(ticketHasGuid(guid), updateTicketPrice(amount)),
	tickets
);
export const updateTicketReverseCalculate = ({ tickets, guid, reverseCalculate }) => map(
	when(ticketHasGuid(guid), updateReverseCalculate(reverseCalculate)),
	tickets
);
