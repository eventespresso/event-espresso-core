/**
 * Internal Imports
 */
import {
	EventFactory,
	DateTimeFactory,
	CheckinFactory,
	TicketFactory,
} from './factories';
import { EventResponse } from './event-response-non-authed';
import { AuthedEventResponse } from './event-response-authed';
import { AuthedDateTimeResponse } from './datetime-response-authed';
import { AuthedCheckinResponse } from './checkin-response-authed'
import { AuthedTicketResponse } from './ticket-response-authed';

export const EventEntity = EventFactory.fromExisting( EventResponse );
export const AuthedEventEntity = EventFactory
	.fromExisting( AuthedEventResponse );
export const AuthedDateTimeEntity = DateTimeFactory
	.fromExisting( AuthedDateTimeResponse );
export const AuthedCheckinEntity = CheckinFactory
	.fromExisting( AuthedCheckinResponse );
export const AuthedTicketEntity = TicketFactory
	.fromExisting( AuthedTicketResponse );
