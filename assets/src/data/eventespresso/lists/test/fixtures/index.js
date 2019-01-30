/**
 * Internal dependencies
 */
import {
	EventEntities,
	DateTimeEntities,
} from '../../../test/fixtures/base';

/**
 * External imports
 */
import { Map, OrderedMap } from 'immutable';

export const genericObjects = [
	{ item: 1 },
	{ item: 2 },
	{ item: 3 },
];

export const eventEntityItems = [
	EventEntities.b,
	EventEntities.a,
];

export const dateTimeEntityItems = [
	DateTimeEntities.c,
	DateTimeEntities.b,
];

export const mockStateForTests = Map().set(
	'event',
	Map().set(
		'testQueryA',
		OrderedMap( eventEntityItems.map(
			( entity ) => [ entity.id, entity ] )
		)
	).set(
		'[EVT_ID][IN]=20,10',
		OrderedMap( eventEntityItems.map(
			( entity ) => [ entity.id, entity ] )
		)
	)
).set(
	'datetime',
	Map().set(
		'testQueryB',
		OrderedMap( dateTimeEntityItems.map(
			( entity ) => [ entity.id, entity ]
		) )
	)
);
