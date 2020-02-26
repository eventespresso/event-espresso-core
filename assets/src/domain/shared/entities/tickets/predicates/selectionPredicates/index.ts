import { assoc, includes, map, when } from 'ramda';

import { TICKET_FIELDS, TICKET_INPUT_FIELDS } from '../ticketFields';
import { entityHasGuid } from '../../../../services/predicates';
import { EntityId } from '@appServices/apollo/types';
import { Ticket } from '@edtrServices/apollo/types';

interface UpdateTicketPriceForTicketProps {
	amount: number;
	guid: EntityId;
	tickets: Ticket[];
}

interface UpdateTicketReverseCalculateProps {
	guid: EntityId;
	reverseCalculate: boolean;
	tickets: Ticket[];
}

export const isTicketField = (_, field): boolean => includes(field, TICKET_FIELDS);

export const isTicketInputField = (_, field): boolean => includes(field, TICKET_INPUT_FIELDS);

export const updateTicketPrice = (amount: number): ((obj: Ticket) => Record<keyof Ticket, number> & Ticket) => {
	return assoc<number, keyof Ticket>('price', amount);
};

export const updateReverseCalculate = (
	reverseCalculate: boolean
): ((obj: Ticket) => Record<keyof Ticket, boolean> & Ticket) => {
	return assoc<boolean, keyof Ticket>('reverseCalculate', reverseCalculate);
};

export const updateTicketPriceForTicket = ({ amount, guid, tickets }: UpdateTicketPriceForTicketProps): Ticket[] => {
	return map(when(entityHasGuid(guid), updateTicketPrice(amount)), tickets);
};

export const updateTicketReverseCalculate = ({
	tickets,
	guid,
	reverseCalculate,
}: UpdateTicketReverseCalculateProps): Ticket[] => {
	return map(when(entityHasGuid(guid), updateReverseCalculate(reverseCalculate)), tickets);
};
