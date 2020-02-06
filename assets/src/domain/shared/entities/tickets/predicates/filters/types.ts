import { Ticket } from '../../../../../eventEditor/services/apollo/types';

export type TicketFilterFn = (dates: Array<Ticket>) => Array<Ticket>;
