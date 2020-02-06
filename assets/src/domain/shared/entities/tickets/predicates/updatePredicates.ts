import { pickBy } from 'ramda';
import { isTicketField } from './selectionPredicates';
import { Ticket } from '../../../../eventEditor/services/apollo/types';

export const copyTicketFields = (ticket: Ticket): Ticket => pickBy<Ticket, Ticket>(isTicketField, ticket);
