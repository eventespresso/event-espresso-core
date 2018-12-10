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
	relations: {
		index: {
			datetimes: {
				52: { event: [ 10 ] },
				53: { event: [ 20 ] },
				54: { event: [ 30 ] },
			},
		},
		entityMap: {
			event: {
				10: {
					datetimes: [ 52 ],
				},
				20: {
					datetimes: [ 53 ],
				},
				30: {
					datetimes: [ 54 ],
				},
			},
		},
	},
	dirty: {
		relations: {
			index: {},
			delete: {},
			add: {},
		},
		trash: {},
		delete: {},
	},
};
