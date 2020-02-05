import { pickBy } from 'ramda';
import { isTicketField } from './selectionPredicates';
import { Ticket } from '../../../../../domain/eventEditor/services/apollo/types';

export const copyTicketFields = (ticket: Ticket): Ticket => pickBy<Ticket, Ticket>(isTicketField, ticket);
