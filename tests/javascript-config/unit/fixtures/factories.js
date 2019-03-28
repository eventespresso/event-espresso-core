/**
 * External dependencies
 */
import { createEntityFactory, MODEL_PREFIXES } from '@eventespresso/model';
import { EventSchema } from './event-schema';
import { DateTimeSchema } from './datetime-schema';
import { CheckinSchema } from './checkin-schema';

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
