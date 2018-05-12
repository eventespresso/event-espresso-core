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
	events: {
		10: {
			entity: { EVT_ID: 10, name: 'Event 10' },
			dirty: false,
		},
		20: {
			entity: { EVT_ID: 20, name: 'Event 20' },
			dirty: true,
		},
		30: {
			entity: { EVT_ID: 30, name: 'Event 30' },
			dirty: false,
		},
	},
	terms: {
		'10.10': {
			entity: { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
			dirty: false,
		},
		'20.20': {
			entity: { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
			dirty: true,
		},
	},
};

jest.mock( '@eventespresso/eejs', () => ( {
	data: {
		paths: {
			primary_keys: {
				events: 'EVT_ID',
				terms: [
					'TERM_ID',
					'TAXONOMY_ID',
				],
			},
		},
	},
} ) );

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

		expect( originalState ).not.toEqual( state );
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
		const expectedEventsEntities = {
			10: {
				entity: { EVT_ID: 10, name: 'Event 10' },
				dirty: false,
			},
			20: {
				entity: { EVT_ID: 20, name: 'Event 20' },
				dirty: true,
			},
			30: {
				entity: { EVT_ID: 30, name: 'Event 30' },
				dirty: false,
			},
			40: {
				entity: { EVT_ID: 40, name: 'Event 40' },
				dirty: false,
			},
		};

		expect( state.events ).toEqual( expectedEventsEntities );
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
		const expectedTermsEntities = {
			'10.10': {
				entity: { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
				dirty: false,
			},
			'20.20': {
				entity: { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				dirty: true,
			},
			'20.30': {
				entity: { TERM_ID: 20, TAXONOMY_ID: 30, name: 'Term 20' },
				dirty: false,
			},
		};

		expect( state.terms ).toEqual( expectedTermsEntities );
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
		const expectedEventsEntities = {
			10: {
				entity: { EVT_ID: 10, name: 'Event 10' },
				dirty: false,
			},
			20: {
				entity: { EVT_ID: 20, name: 'Event 20' },
				dirty: true,
			},
			30: {
				entity: { EVT_ID: 30, name: 'Event 30' },
				dirty: false,
			},
			50: {
				entity: { EVT_ID: 50, name: 'Event 50' },
				dirty: false,
			},
		};

		expect( state.events ).toEqual( expectedEventsEntities );
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
		const expectedEventsEntities = {
			10: {
				entity: { EVT_ID: 10, name: 'Event 10 Modified' },
				dirty: true,
			},
			20: {
				entity: { EVT_ID: 20, name: 'Event 20' },
				dirty: true,
			},
			30: {
				entity: { EVT_ID: 30, name: 'Event 30' },
				dirty: false,
			},
			50: {
				entity: { EVT_ID: 50, name: 'Event 50' },
				dirty: false,
			},
		};

		expect( state.events ).toEqual( expectedEventsEntities );
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
		const expectedStateEntities = {
			10: {
				entity: { EVT_ID: 10, name: 'Event 10' },
				dirty: false,
			},
			20: {
				entity: { EVT_ID: 20, name: 'Event 20' },
				dirty: false,
			},
			30: {
				entity: { EVT_ID: 30, name: 'Event 30' },
				dirty: false,
			},
		};
		expect( state.events ).toEqual( expectedStateEntities );
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
		const expectedStateEntities = {
			'10.10': {
				entity: { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
				dirty: false,
			},
			'20.20': {
				entity: { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
				dirty: false,
			},
		};
		expect( state.terms ).toEqual( expectedStateEntities );
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
		expect( state.events ).toEqual(
			{
				10: {
					entity: { EVT_ID: 10, name: 'Event 10' },
					dirty: false,
				},
				20: {
					entity: { EVT_ID: 20, name: 'Event 20' },
					dirty: false,
				},
				30: {
					entity: { EVT_ID: 30, name: 'Event 30' },
					dirty: false,
				},
			},
		);
	} );

	it( 'sets dirty state to false for entity id that exists and is' +
		' part of a combined primary keys model', () => {
		const state = cleanEntityById(
			originalState,
			cleanEntityByIdAction( 'terms', '20.20' ),
		);
		expect( state ).not.toBe( originalState );
		expect( state.terms ).toEqual(
			{
				'10.10': {
					entity: { TERM_ID: 10, TAXONOMY_ID: 10, name: 'Term 10' },
					dirty: false,
				},
				'20.20': {
					entity: { TERM_ID: 20, TAXONOMY_ID: 20, name: 'Term 20' },
					dirty: false,
				},
			},
		);
	} );
} );
