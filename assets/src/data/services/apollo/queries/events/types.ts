import { EntityQueryArgs } from '../types';
import { EntityEdge } from '@dataServices/types';
import { AnyObject } from '@application/services/utilities/types';

export type EventsQueryArgs = EntityQueryArgs<AnyObject>;

export interface EventsList<Edge extends EntityEdge> {
	espressoEvents: Edge;
}
