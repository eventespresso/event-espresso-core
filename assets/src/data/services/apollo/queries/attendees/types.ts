import { EntityQueryArgs, EntityQueryOrderBy } from '../types';
import { EntityEdge, EntityId } from '@dataServices/types';
import { RegistrationStatus } from '../registrations/types';

export interface AttendeesQueryWhereArgs {
	event?: EntityId;
	orderby?: EntityQueryOrderBy<AttendeesOrderByFields>;
	regStatus?: RegistrationStatus;
	regTicket?: string;
	regTicketId?: number;
	regTicketIdIn?: Array<number>;
	regTicketIn?: Array<string>;
}

export type AttendeesOrderByFields = 'ID' | 'FIRST_NAME' | 'LAST_NAME';

export type AttendeesQueryArgs = EntityQueryArgs<AttendeesQueryWhereArgs>;

export interface AttendeesList<Edge extends EntityEdge> {
	espressoAttendees: Edge;
}
