/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal depedencies
 */
import {
	receiveEntityRecords,
	cleanEntities,
	cleanEntityById,
} from '../reducers';
import {
	receiveEntityRecords as receiveRecordsAction,
	cleanEntities as cleanEntitiesAction,
	cleanEntityById as cleanEntityByIdAction,
} from '../actions';

const mockStateForTests = {
	entities: {
		events: {
			10: { EVT_ID: 10, name: 'Event 10' },
			20: { EVT_ID: 20, name: 'Event 20' },
			30: { EVT_ID: 30, name: 'Event 30' },
		},
		terms: {
			'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
			'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
		},
	},
	entityIds: {
		events: [ '10', '20', '30' ],
		terms: [ '10:10', '20:20' ],
	},
	dirty: {
		events: [ '20' ],
		terms: [ '20:20' ],
	},
};

describe( 'receiveEntityRecords()', () => {
	const originalState = deepFreeze( mockStateForTests );
	it( 'returns original state when provided modelName is not in state',
		() => {
			const state = receiveEntityRecords(
				originalState,
				receiveRecordsAction(
					'tickets',
					[ { TKT_ID: 10, name: 'Ticket 10' } ],
				),
			);
			expect( state ).toBe( originalState );
		},
	);

	it( 'does not change original state for new records', () => {
		const state = receiveEntityRecords(
			originalState,
			receiveRecordsAction(
				'events',
				[ { EVT_ID: 40, name: 'Event 40' } ],
			),
		);

		expect( originalState ).not.toBe( state );
		expect( originalState ).toEqual( mockStateForTests );
	} );

	it( 'adds new record to state with dirty set to false', () => {
		const state = receiveEntityRecords(
			originalState,
			receiveRecordsAction(
				'events',
				[ { EVT_ID: 40, name: 'Event 40' } ],
			),
		);
		const expectedState = {
			entities: {
				events: {
					10: { EVT_ID: 10, name: 'Event 10' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
					40: { EVT_ID: 40, name: 'Event 40' },
				},
				terms: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				},
			},
			entityIds: {
				events: [ '10', '20', '30', '40' ],
				terms: [ '10:10', '20:20' ],
			},
			dirty: {
				events: [ '20' ],
				terms: [ '20:20' ],
			},
		};

		expect( state ).toEqual( expectedState );
	} );

	it( 'adds a new record to state for a model entity with combined primary' +
		' keys', () => {
		const state = receiveEntityRecords(
			originalState,
			receiveRecordsAction(
				'terms',
				[ { TERM_ID: 20, TAXONOMY_ID: 30, name: 'Term 20' } ],
			),
		);
		const expectedState = {
			entities: {
				events: {
					10: { EVT_ID: 10, name: 'Event 10' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
				},
				terms: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
					'20:30': { TERM_ID: 20, TAXONOMY_ID: 30, name: 'Term 20' },
				},
			},
			entityIds: {
				events: [ '10', '20', '30' ],
				terms: [ '10:10', '20:20', '20:30' ],
			},
			dirty: {
				events: [ '20' ],
				terms: [ '20:20' ],
			},
		};

		expect( state ).toEqual( expectedState );
	} );

	it( 'leaves an existing record alone when there are no changes and' +
		' leaves the dirty property for that record alone.  However a record' +
		' that is new is added.', () => {
		const state = receiveEntityRecords(
			originalState,
			receiveRecordsAction(
				'events',
				[
					{ EVT_ID: 10, name: 'Event 10' },
					{ EVT_ID: 50, name: 'Event 50' },
				],
			),
		);
		const expectedState = {
			entities: {
				events: {
					10: { EVT_ID: 10, name: 'Event 10' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
					50: { EVT_ID: 50, name: 'Event 50' },
				},
				terms: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				},
			},
			entityIds: {
				events: [ '10', '20', '30', '50' ],
				terms: [ '10:10', '20:20' ],
			},
			dirty: {
				events: [ '20' ],
				terms: [ '20:20' ],
			},
		};

		expect( state ).toEqual( expectedState );
	} );

	it( 'modifies an existing record when there are changes and' +
		' sets the dirty property for that record to true.  Also a record' +
		' that is new is added.', () => {
		const state = receiveEntityRecords(
			originalState,
			receiveRecordsAction(
				'events',
				[
					{ EVT_ID: 10, name: 'Event 10 Modified' },
					{ EVT_ID: 50, name: 'Event 50' },
				],
			),
		);
		const expectedState = {
			entities: {
				events: {
					10: { EVT_ID: 10, name: 'Event 10 Modified' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
					50: { EVT_ID: 50, name: 'Event 50' },
				},
				terms: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				},
			},
			entityIds: {
				events: [ '10', '20', '30', '50' ],
				terms: [ '10:10', '20:20' ],
			},
			dirty: {
				events: [ '20', '10' ],
				terms: [ '20:20' ],
			},
		};

		expect( state ).toEqual( expectedState );
	} );
} );

describe( 'cleanEntities()', () => {
	const originalState = deepFreeze( mockStateForTests );

	it( 'returns original state when provided modelName is not currently in ' +
		'state.', () => {
		const state = cleanEntities(
			originalState,
			cleanEntitiesAction(
				'tickets',
				[ { TKT_ID: 10, name: 'Ticket 10' } ],
			),
		);
		expect( state ).toBe( originalState );
	} );

	it( 'returns new state when entities are cleaned', () => {
		const state = cleanEntities(
			originalState,
			cleanEntitiesAction(
				'events',
				[
					{ EVT_ID: 20, name: 'Event 20' },
				],
			),
		);
		expect( state ).not.toBe( originalState );
	} );

	it( 'sets dirty property for all provided entities that exist to false' +
		' and does not ADD any provided new entities', () => {
		const state = cleanEntities(
			originalState,
			cleanEntitiesAction(
				'events',
				[
					{ EVT_ID: 20, name: 'Event 20' },
					{ EVT_ID: 50, name: 'Event 50' },
				],
			),
		);
		const expectedState = {
			entities: {
				events: {
					10: { EVT_ID: 10, name: 'Event 10' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
				},
				terms: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				},
			},
			entityIds: {
				events: [ '10', '20', '30' ],
				terms: [ '10:10', '20:20' ],
			},
			dirty: {
				events: [],
				terms: [ '20:20' ],
			},
		};
		expect( state ).toEqual( expectedState );
	} );

	it( 'sets dirty property correctly for provided entities belonging to' +
		' a model that has combined primary keys', () => {
		const state = cleanEntities(
			originalState,
			cleanEntitiesAction(
				'terms',
				[
					{ TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				],
			),
		);
		const expectedState = {
			entities: {
				events: {
					10: { EVT_ID: 10, name: 'Event 10' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
				},
				terms: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				},
			},
			entityIds: {
				events: [ '10', '20', '30' ],
				terms: [ '10:10', '20:20' ],
			},
			dirty: {
				events: [ '20' ],
				terms: [],
			},
		};
		expect( state ).toEqual( expectedState );
	} );
} );

describe( 'cleanEntitybyId()', () => {
	const originalState = deepFreeze( mockStateForTests );
	it( 'returns original state when modelName not existing in state is' +
		' passed in.', () => {
		const state = cleanEntityById(
			originalState,
			cleanEntityByIdAction( 'tickets', 10 ),
		);
		expect( state ).toBe( originalState );
	} );

	it( 'returns original state when modelName is valid but id does not' +
		' exist in state', () => {
		const state = cleanEntityById(
			originalState,
			cleanEntityByIdAction( 'events', 50 ),
		);
		expect( state ).toBe( originalState );
	} );

	it( 'sets dirty state to false for entity id that exists and is' +
		' not false', () => {
		const state = cleanEntityById(
			originalState,
			cleanEntityByIdAction( 'events', 20 ),
		);
		expect( state ).not.toBe( originalState );
		expect( state ).toEqual(
			{
				entities: {
					events: {
						10: { EVT_ID: 10, name: 'Event 10' },
						20: { EVT_ID: 20, name: 'Event 20' },
						30: { EVT_ID: 30, name: 'Event 30' },
					},
					terms: {
						'10:10': {
							TERM_ID: 10,
							TAXONOMY_ID: 10,
							name: 'Term 10',
						},
						'20:20': {
							TERM_ID: 20,
							TAXONOMY_ID: 20,
							name: 'Term 20',
						},
					},
				},
				entityIds: {
					events: [ '10', '20', '30' ],
					terms: [ '10:10', '20:20' ],
				},
				dirty: {
					events: [],
					terms: [ '20:20' ],
				},
			},
		);
	} );

	it( 'sets dirty state to false for entity id that exists and is' +
		' part of a combined primary keys model', () => {
		const state = cleanEntityById(
			originalState,
			cleanEntityByIdAction( 'terms', '20:20' ),
		);
		expect( state ).not.toBe( originalState );
		expect( state ).toEqual(
			{
				entities: {
					events: {
						10: { EVT_ID: 10, name: 'Event 10' },
						20: { EVT_ID: 20, name: 'Event 20' },
						30: { EVT_ID: 30, name: 'Event 30' },
					},
					terms: {
						'10:10': {
							TERM_ID: 10,
							TAXONOMY_ID: 10,
							name: 'Term 10',
						},
						'20:20': {
							TERM_ID: 20,
							TAXONOMY_ID: 20,
							name: 'Term 20',
						},
					},
				},
				entityIds: {
					events: [ '10', '20', '30' ],
					terms: [ '10:10', '20:20' ],
				},
				dirty: {
					events: [ '20' ],
					terms: [],
				},
			},
		);
	} );
} );
