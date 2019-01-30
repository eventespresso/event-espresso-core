/**
 * External dependencies
 */
import { forEach } from 'lodash';
import {
	AuthedEventResponse,
	AuthedDateTimeResponse,
	EventFactory,
	DateTimeFactory,
} from '@test/fixtures';

export const eventFactory = EventFactory;
export const dateTimeFactory = DateTimeFactory;

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
EventEntities.d = eventFactory.createNew( 'Test New Event' );
const DateTimeEntities = {};
forEach( DateTimeResponses, ( response, key ) => {
	DateTimeEntities[ key ] = dateTimeFactory.fromExisting( response );
} );
DateTimeEntities.d = dateTimeFactory.createNew(
	'Test New Datetime'
);
export { EventEntities, DateTimeEntities };
