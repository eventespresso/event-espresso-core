import { pickBy } from 'ramda';
import { isTicketField } from './selectionPredicates';

export const copyTicketFields = (ticket) => pickBy(isTicketField, ticket);
