import { Ticket } from '@edtrServices/apollo';
import { TicketsToShow } from '@edtrServices/filterState';

export interface FilterTickets {
	tickets: Ticket[];
	show?: TicketsToShow;
}

export type TicketFilterFn = (tickets: Array<Ticket>) => Array<Ticket>;
