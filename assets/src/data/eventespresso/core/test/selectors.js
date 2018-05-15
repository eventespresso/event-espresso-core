/**
 * Internal dependencies
 */
import {
	isEntityDirty,
	getEntityRecordsForModel,
	getEntitiesForModel,
	getEntityById,
} from '../selectors';

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
		events: [ 10, 20, 30 ],
		terms: [ '10:10', '20:20' ],
	},
	dirty: {
		events: [ '20' ],
		terms: [ '20:20' ],
	},
};

describe( 'getEntitiesForModel()', () => {
	it( 'returns null when modelName is not in state',
		() => {
			expect( getEntitiesForModel( mockStateForTests, 'tickets' ) )
				.toBeNull();
		},
	);

	it( 'returns expected objects for the modelName in the state',
		() => {
			const expected = [
				{ EVT_ID: 10, name: 'Event 10' },
				{ EVT_ID: 20, name: 'Event 20' },
				{ EVT_ID: 30, name: 'Event 30' },
			];
			expect( getEntitiesForModel( mockStateForTests, 'events' ) )
				.toEqual( expected );
		},
	);
} );

describe( 'getEntityRecordsForModel()', () => {
	it( 'returns null when modelName is not in state', () => {
		expect( getEntityRecordsForModel( mockStateForTests, 'tickets' ) )
			.toBeNull();
	} );
	it( 'returns expected objects for the modelName in the state', () => {
		const expected = {
			10: { EVT_ID: 10, name: 'Event 10' },
			20: { EVT_ID: 20, name: 'Event 20' },
			30: { EVT_ID: 30, name: 'Event 30' },
		};
		expect( getEntityRecordsForModel( mockStateForTests, 'events' ) )
			.toEqual( expected );
	} );
} );

describe( 'getEntityById()', () => {
	it( 'returns null when modelName is not in state', () => {
		expect( getEntityById( mockStateForTests, 'tickets', 10 ) )
			.toBeNull();
	} );

	it( 'returns null when modelName is in state but not id', () => {
		expect( getEntityById( mockStateForTests, 'events', 50 ) )
			.toBeNull();
	} );

	it( 'returns expected object for valid modelName and entity id' +
		' (when id is given as number)', () => {
		expect( getEntityById( mockStateForTests, 'events', 20 ) )
			.toEqual(
				{ EVT_ID: 20, name: 'Event 20' },
			);
	} );

	it( 'returns expected object for valid modelName and entity id' +
		' (when id is given as string)', () => {
		expect( getEntityById( mockStateForTests, 'events', '20' ) )
			.toEqual(
				{ EVT_ID: 20, name: 'Event 20' },
			);
	} );
} );

describe( 'isEntityDirty()', () => {
	it( 'returns false when modelName is not in state', () => {
		expect( isEntityDirty( mockStateForTests, 'tickets', 10 ) )
			.toBe( false );
	} );

	it( 'returns false when modelName is in state but entity id is not', () => {
		expect( isEntityDirty( mockStateForTests, 'events', 50 ) )
			.toBe( false );
	} );

	it( 'returns expected value for valid modelName and entity id ' +
		'(when id is given as number)', () => {
		expect( isEntityDirty( mockStateForTests, 'events', 10 ) )
			.toBe( false );
	} );

	it( 'returns expected value for valid modelName and entity id ' +
		'(when id is given as string)', () => {
		expect( isEntityDirty( mockStateForTests, 'events', '20' ) )
			.toBe( true );
	} );
} );
