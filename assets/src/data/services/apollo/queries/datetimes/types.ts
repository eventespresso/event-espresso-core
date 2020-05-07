import { EntityQueryArgs } from '../types';
import { EntityEdge } from '@dataServices/types';

export interface DatetimesQueryWhereArgs {
	active?: boolean;
	event?: string;
	eventId?: number;
	eventIdIn?: Array<number>;
	eventIn?: Array<string>;
	expired?: boolean;
	ticket?: string;
	ticketId?: number;
	ticketIdIn?: Array<number>;
	ticketIn?: Array<string>;
	upcoming?: boolean;
}

export type DatetimesQueryArgs = EntityQueryArgs<DatetimesQueryWhereArgs>;

export interface DatetimesList<Edge extends EntityEdge> {
	espressoDatetimes: Edge;
}
