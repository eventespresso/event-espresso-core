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
		event: {
			10: { EVT_ID: 10, name: 'Event 10' },
			20: { EVT_ID: 20, name: 'Event 20' },
			30: { EVT_ID: 30, name: 'Event 30' },
		},
		term: {
			'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
			'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
		},
	},
	entityIds: {
		event: [ '10', '20', '30' ],
		term: [ '10:10', '20:20' ],
	},
	dirty: {
		event: [ '20' ],
		term: [ '20:20' ],
	},
};

describe( 'receiveEntityRecords()', () => {
	const originalState = deepFreeze( mockStateForTests );
	it( 'returns original state when provided modelName is not in state',
		() => {
			const state = receiveEntityRecords(
				originalState,
				receiveRecordsAction(
					'ticket',
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
				'event',
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
				'event',
				[ { EVT_ID: 40, name: 'Event 40' } ],
			),
		);
		const expectedState = {
			entities: {
				event: {
					10: { EVT_ID: 10, name: 'Event 10' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
					40: { EVT_ID: 40, name: 'Event 40' },
				},
				term: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				},
			},
			entityIds: {
				event: [ '10', '20', '30', '40' ],
				term: [ '10:10', '20:20' ],
			},
			dirty: {
				event: [ '20' ],
				term: [ '20:20' ],
			},
		};

		expect( state ).toEqual( expectedState );
	} );

	it( 'adds a new record to state for a model entity with combined primary' +
		' keys', () => {
		const state = receiveEntityRecords(
			originalState,
			receiveRecordsAction(
				'term',
				[ { TERM_ID: 20, TAXONOMY_ID: 30, name: 'Term 20' } ],
			),
		);
		const expectedState = {
			entities: {
				event: {
					10: { EVT_ID: 10, name: 'Event 10' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
				},
				term: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
					'20:30': { TERM_ID: 20, TAXONOMY_ID: 30, name: 'Term 20' },
				},
			},
			entityIds: {
				event: [ '10', '20', '30' ],
				term: [ '10:10', '20:20', '20:30' ],
			},
			dirty: {
				event: [ '20' ],
				term: [ '20:20' ],
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
				'event',
				[
					{ EVT_ID: 10, name: 'Event 10' },
					{ EVT_ID: 50, name: 'Event 50' },
				],
			),
		);
		const expectedState = {
			entities: {
				event: {
					10: { EVT_ID: 10, name: 'Event 10' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
					50: { EVT_ID: 50, name: 'Event 50' },
				},
				term: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				},
			},
			entityIds: {
				event: [ '10', '20', '30', '50' ],
				term: [ '10:10', '20:20' ],
			},
			dirty: {
				event: [ '20' ],
				term: [ '20:20' ],
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
				'event',
				[
					{ EVT_ID: 10, name: 'Event 10 Modified' },
					{ EVT_ID: 50, name: 'Event 50' },
				],
			),
		);
		const expectedState = {
			entities: {
				event: {
					10: { EVT_ID: 10, name: 'Event 10 Modified' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
					50: { EVT_ID: 50, name: 'Event 50' },
				},
				term: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				},
			},
			entityIds: {
				event: [ '10', '20', '30', '50' ],
				term: [ '10:10', '20:20' ],
			},
			dirty: {
				event: [ '20', '10' ],
				term: [ '20:20' ],
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
				'ticket',
				[ { TKT_ID: 10, name: 'Ticket 10' } ],
			),
		);
		expect( state ).toBe( originalState );
	} );

	it( 'returns new state when entities are cleaned', () => {
		const state = cleanEntities(
			originalState,
			cleanEntitiesAction(
				'event',
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
				'event',
				[
					{ EVT_ID: 20, name: 'Event 20' },
					{ EVT_ID: 50, name: 'Event 50' },
				],
			),
		);
		const expectedState = {
			entities: {
				event: {
					10: { EVT_ID: 10, name: 'Event 10' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
				},
				term: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				},
			},
			entityIds: {
				event: [ '10', '20', '30' ],
				term: [ '10:10', '20:20' ],
			},
			dirty: {
				event: [],
				term: [ '20:20' ],
			},
		};
		expect( state ).toEqual( expectedState );
	} );

	it( 'sets dirty property correctly for provided entities belonging to' +
		' a model that has combined primary keys', () => {
		const state = cleanEntities(
			originalState,
			cleanEntitiesAction(
				'term',
				[
					{ TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				],
			),
		);
		const expectedState = {
			entities: {
				event: {
					10: { EVT_ID: 10, name: 'Event 10' },
					20: { EVT_ID: 20, name: 'Event 20' },
					30: { EVT_ID: 30, name: 'Event 30' },
				},
				term: {
					'10:10': { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					'20:20': { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				},
			},
			entityIds: {
				event: [ '10', '20', '30' ],
				term: [ '10:10', '20:20' ],
			},
			dirty: {
				event: [ '20' ],
				term: [],
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
			cleanEntityByIdAction( 'ticket', 10 ),
		);
		expect( state ).toBe( originalState );
	} );

	it( 'returns original state when modelName is valid but id does not' +
		' exist in state', () => {
		const state = cleanEntityById(
			originalState,
			cleanEntityByIdAction( 'event', 50 ),
		);
		expect( state ).toBe( originalState );
	} );

	it( 'sets dirty state to false for entity id that exists and is' +
		' not false', () => {
		const state = cleanEntityById(
			originalState,
			cleanEntityByIdAction( 'event', 20 ),
		);
		expect( state ).not.toBe( originalState );
		expect( state ).toEqual(
			{
				entities: {
					event: {
						10: { EVT_ID: 10, name: 'Event 10' },
						20: { EVT_ID: 20, name: 'Event 20' },
						30: { EVT_ID: 30, name: 'Event 30' },
					},
					term: {
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
					event: [ '10', '20', '30' ],
					term: [ '10:10', '20:20' ],
				},
				dirty: {
					event: [],
					term: [ '20:20' ],
				},
			},
		);
	} );

	it( 'sets dirty state to false for entity id that exists and is' +
		' part of a combined primary keys model', () => {
		const state = cleanEntityById(
			originalState,
			cleanEntityByIdAction( 'term', '20:20' ),
		);
		expect( state ).not.toBe( originalState );
		expect( state ).toEqual(
			{
				entities: {
					event: {
						10: { EVT_ID: 10, name: 'Event 10' },
						20: { EVT_ID: 20, name: 'Event 20' },
						30: { EVT_ID: 30, name: 'Event 30' },
					},
					term: {
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
					event: [ '10', '20', '30' ],
					term: [ '10:10', '20:20' ],
				},
				dirty: {
					event: [ '20' ],
					term: [],
				},
			},
		);
	} );
} );
