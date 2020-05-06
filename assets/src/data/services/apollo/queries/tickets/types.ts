import { EntityQueryArgs } from '../types';
import { EntityEdge } from '@dataServices/types';

export interface TicketsQueryWhereArgs {
	datetime?: string;
	datetimeId?: number;
	datetimeIdIn?: Array<number>;
	datetimeIn?: Array<string>;
}

export type TicketsQueryArgs = EntityQueryArgs<TicketsQueryWhereArgs>;

export interface TicketsList<Edge extends EntityEdge> {
	espressoTickets: Edge;
}
