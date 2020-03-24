import { Ticket } from '@edtrServices/apollo';
import { TicketsSales, TicketsStatus } from '@edtrServices/filterState';

export interface SalesFilter {
	tickets: Ticket[];
	sales: TicketsSales;
}

export interface StatusFilter {
	tickets: Ticket[];
	status: TicketsStatus;
}

export type TicketFilterFn = (tickets: Array<Ticket>) => Array<Ticket>;
