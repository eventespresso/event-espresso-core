/**
 * External dependencies
 */
import { createEntityFactory, MODEL_PREFIXES } from '@eventespresso/model';
import { forEach } from 'lodash';
import {
	EventSchema,
	DateTimeSchema,
	AuthedEventResponse,
	AuthedDateTimeResponse,
} from '@test/fixtures';

export const eventFactory = createEntityFactory(
	'event',
	EventSchema.schema,
	MODEL_PREFIXES.event
);
export const dateTimeFactory = createEntityFactory(
	'datetime',
	DateTimeSchema.schema,
	MODEL_PREFIXES.datetime
);

export const EventResponses = {
	a: AuthedEventResponse,
	b: { ...AuthedEventResponse, EVT_ID: 20 },
	c: { ...AuthedEventResponse, EVT_ID: 30 },
};

export const DateTimeResponses = {
	a: AuthedDateTimeResponse,
	b: { ...AuthedDateTimeResponse, DTT_ID: 53 },
	c: { ...AuthedDateTimeResponse, DTT_ID: 54 },
};

const EventEntities = {};
forEach( EventResponses, ( response, key ) => {
	EventEntities[ key ] = eventFactory.fromExisting( response );
} );
const DateTimeEntities = {};
forEach( DateTimeResponses, ( response, key ) => {
	DateTimeEntities[ key ] = dateTimeFactory.fromExisting( response );
} );
export { EventEntities, DateTimeEntities };
