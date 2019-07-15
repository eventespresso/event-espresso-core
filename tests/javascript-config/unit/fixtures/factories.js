/**
 * External dependencies
 */
import { createEntityFactory, MODEL_PREFIXES } from '@eventespresso/model';
import { EventSchema } from './event-schema';
import { DateTimeSchema } from './datetime-schema';
import { CheckinSchema } from './checkin-schema';
import { RegistrationSchema } from './registration-schema';
import { TicketSchema } from './ticket-schema';
import { VenueSchema } from './venue-schema';

export const EventFactory = createEntityFactory(
	'event',
	EventSchema.schema,
	MODEL_PREFIXES( 'event' )
);

export const DateTimeFactory = createEntityFactory(
	'datetime',
	DateTimeSchema.schema,
	MODEL_PREFIXES( 'datetime' ),
);

export const CheckinFactory = createEntityFactory(
	'checkin',
	CheckinSchema.schema,
	MODEL_PREFIXES( 'checkin' )
);

export const RegistrationFactory = createEntityFactory(
	'registration',
	RegistrationSchema.schema,
	MODEL_PREFIXES( 'registration' )
);

export const TicketFactory = createEntityFactory(
	'ticket',
	TicketSchema.schema,
	MODEL_PREFIXES( 'ticket' )
);

export const VenueFactory = createEntityFactory(
	'venue',
	VenueSchema.schema,
	MODEL_PREFIXES( 'venue' )
);
