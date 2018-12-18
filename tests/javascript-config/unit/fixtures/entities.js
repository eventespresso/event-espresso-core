/**
 * Internal Imports
 */
import { EventFactory, DateTimeFactory } from './factories';
import { EventResponse } from './event-response-non-authed';
import { AuthedEventResponse } from './event-response-authed';
import { AuthedDateTimeResponse } from './datetime-response-authed';

export const EventEntity = EventFactory.fromExisting( EventResponse );
export const AuthedEventEntity = EventFactory
	.fromExisting( AuthedEventResponse );
export const AuthedDateTimeEntity = DateTimeFactory
	.fromExisting( AuthedDateTimeResponse );
