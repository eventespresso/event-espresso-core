import { Ticket } from '@edtrServices/apollo/types';

export type TicketFilterFn = (dates: Array<Ticket>) => Array<Ticket>;
