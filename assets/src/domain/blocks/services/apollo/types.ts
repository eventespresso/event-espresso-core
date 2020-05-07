import { Address, Entity, EntityEdge } from '@dataServices/types';
import {
	AttendeesList as AttendeeList,
	EventsList as EventList,
	DatetimesList as DatetimeList,
	TicketsList as TicketList,
} from '@dataServices/apollo/queries';

export interface Attendee extends Entity, Address {
	avatar?: string;
	bio?: string;
	email?: string;
	firstName: string;
	fullName: string;
	lastName: string;
	phone?: string;
	shortBio?: string;
}

export type AttendeeEdge<Connection = 'EspressoRootQueryAttendeesConnection'> = EntityEdge<Attendee, Connection>;

export type AttendeesList = AttendeeList<AttendeeEdge>;

export interface Event extends Entity {
	name: string;
}

export type EventEdge<Connection = 'RootQueryToEspressoEventConnection'> = EntityEdge<Event, Connection>;

export type EventsList = EventList<EventEdge>;

export interface Datetime extends Entity {
	name: string;
}

export type DatetimeEdge<Connection = 'EspressoRootQueryDatetimesConnection'> = EntityEdge<Datetime, Connection>;

export type DatetimesList = DatetimeList<DatetimeEdge>;

export interface Ticket extends Entity {
	name: string;
}

export type TicketEdge<Connection = 'EspressoRootQueryTicketsConnection'> = EntityEdge<Ticket, Connection>;

export type TicketsList = TicketList<TicketEdge>;
