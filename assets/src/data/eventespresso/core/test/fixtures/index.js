/**
 * Internal dependencies
 */
import {
	EventEntities,
	DateTimeEntities,
} from '../../../test/fixtures/base';

export const mockStateForTests = {
	entities: {
		event: {
			10: EventEntities.a,
			20: EventEntities.b,
			30: EventEntities.c,
		},
		datetime: {
			52: DateTimeEntities.a,
			53: DateTimeEntities.b,
			54: DateTimeEntities.c,
		},
	},
	entityIds: {
		event: [ '10', '20', '30' ],
		datetime: [ '52', '53', '54' ],
	},
};
