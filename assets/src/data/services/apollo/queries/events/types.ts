import { EntityQueryArgs } from '../types';
import { EntityEdge } from '@dataServices/types';

export type EventsQueryArgs = EntityQueryArgs<{}>;

export interface EventsList<Edge extends EntityEdge> {
	espressoEvents: Edge;
}
