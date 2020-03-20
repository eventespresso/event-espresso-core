import isExpired from '../../isExpired';
import { TicketFilterFn } from '../types';

const expiredOnly: TicketFilterFn = (tickets) => tickets.filter((ticket) => isExpired(ticket));

export default expiredOnly;
