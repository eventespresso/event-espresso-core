import { pickBy } from 'ramda';
import { isTicketField } from './selectionPredicates';
import { Ticket } from '@edtrServices/apollo/types';

export const copyTicketFields = (ticket: Ticket, predicate = isTicketField): Ticket =>
	pickBy<Ticket, Ticket>(predicate, ticket);
