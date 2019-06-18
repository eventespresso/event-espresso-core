/**
 * External imports
 */
import {
	EventSchema,
	DateTimeSchema,
	EventFactory,
	DateTimeFactory,
} from '@test/fixtures';
import { fromJS, Map } from 'immutable';

export const mockStateForTests = {
	schema: Map().set( 'event', EventSchema ).set( 'datetime', DateTimeSchema ),
	factory: Map().set( 'event', EventFactory ).set( 'datetime', DateTimeFactory ),
	relationEndpoints: Map().set(
		'event',
		Map().set(
			10,
			fromJS( { datetime: '/ee/v4.8.36/events/10/datetimes' } )
		)
	).set(
		'datetime',
		Map().set(
			52,
			fromJS( { event: '/ee/v4.8.36/datetimes/52/event' } )
		)
	),
	relationSchema: Map()
		.setIn(
			[ 'event', 'datetime' ],
			EventSchema.schema.properties.datetimes
		)
		.setIn(
			[ 'datetime', 'event' ],
			DateTimeSchema.schema.properties.event
		)
		.setIn(
			[ 'event', 'venue' ],
			EventSchema.schema.properties.venues
		),
};
