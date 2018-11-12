/**
 * Internal dependencies
 */
import {
	EventEntities,
	DateTimeEntities,
} from '../../../test/fixtures/base';

export const genericObjects = [
	{ item: 1 },
	{ item: 2 },
	{ item: 3 },
];

export const eventEntityItems = new Map(
	[
		[ 10, EventEntities.a ],
		[ 20, EventEntities.b ],
	]
);

export const dateTimeEntityItems = new Map(
	[
		[ 53, DateTimeEntities.b ],
		[ 54, DateTimeEntities.c ],
	]
);

export const mockStateForTests = {
	event: {
		testQueryA: eventEntityItems,
	},
	datetime: {
		testQueryB: dateTimeEntityItems,
	},
};
