import { Exception } from '@eventespresso/eejs';

import {
	primaryKeys,
	valuesForCombinedPrimaryKeys,
	valueForPrimaryKey,
	getPrimaryKey,
	getPrimaryKeyQueryString,
	getEntityPrimaryKeyValues,
	keyEntitiesByPrimaryKeyValue,
} from '../primary-keys';

describe( 'primaryKeys', () => {
	it( 'has the expected values from the mock data', () => {
		expect( primaryKeys ).toEqual(
			{
				datetime: 'DTT_ID',
				event: 'EVT_ID',
				ticket: 'TKT_ID',
				venue: 'VNU_ID',
				term: [ 'TERM_ID', 'TAXONOMY_ID' ],
				checkin: [ 'CHK_ID' ],
				registration: [ 'REG_ID' ],
			},
		);
	} );
} );

describe( 'valuesForCombinedPrimaryKeys()', () => {
	it( 'throws an Exception if the provided keys argument is not' +
		' an array', () => {
		const t = () => {
			valuesForCombinedPrimaryKeys( 'EVT_ID', {} );
		};
		expect( t ).toThrow( Exception );
		expect( t ).toThrowError( 'The provided value is not an array.' );
	} );

	it( 'throws an Exception if the provided entity does not have any' +
		' of the keys provided', () => {
		const t = () => {
			valuesForCombinedPrimaryKeys(
				[ 'TERM_ID', 'TAXONOMY_ID' ],
				{ EVT_ID: 1 },
			);
		};
		expect( t ).toThrow( Exception );
		expect( t ).toThrow( /does not have the given property/ );
	} );
	it( 'returns the expected values from the object formatted' +
		' like "%s.%s"', () => {
		expect(
			valuesForCombinedPrimaryKeys(
				[ 'TERM_ID', 'TAXONOMY_ID' ],
				{ TERM_ID: 20, TAXONOMY_ID: 30, extra: 'something' },
			),
		).toEqual( '20:30' );
	} );
} );

describe( 'valueForPrimaryKey()', () => {
	it( 'throws an Exception if the provided key argument does not exist in' +
		' the provided entity', () => {
		const t = () => {
			valueForPrimaryKey( 'EVT_ID', { TERM_ID: 10 } );
		};
		expect( t ).toThrow( Exception );
		expect( t ).toThrowError( /does not have the given property/ );
	} );
	it( 'returns the expected value for the provided key from the provided' +
		' entity.', () => {
		expect( valueForPrimaryKey( 'EVT_ID', { EVT_ID: 10, name: 'Event' } ) )
			.toEqual( 10 );
	} );
} );

describe( 'getPrimaryKey()', () => {
	it( 'throws an Exception if the provided model does not exist in the data',
		() => {
			const t = () => {
				getPrimaryKey( 'invalid_model' );
			};
			expect( t ).toThrow( Exception );
			expect( t ).toThrowError( /does not have the given property/ );
		},
	);

	it( 'returns the expected key from the mock data for the provided' +
		' modelName', () => {
		expect( getPrimaryKey( 'event' ) ).toEqual( 'EVT_ID' );
		expect( getPrimaryKey( 'term' ) )
			.toEqual( [ 'TERM_ID', 'TAXONOMY_ID' ] );
	} );
} );

describe( 'getPrimaryKeyQueryString()', () => {
	it( 'throws an Exception if the provided model does not exist in the ' +
		'data', () => {
		const t = () => getPrimaryKeyQueryString( 'cheese', [ 2 ] );
		expect( t ).toThrow( Exception );
		expect( t ).toThrowError( /does not have the given property/ );
	} );
	it( 'returns the expected query string for the given model', () => {
		expect( getPrimaryKeyQueryString( 'event', [ 10, 11 ] ) ).toEqual(
			'[EVT_ID][IN]=10,11'
		);
	} );
} );

describe( 'getEntityPrimaryKeyValues()', () => {
	it( 'returns expected value from provided entity belonging to a model' +
		' with a singular primary key', () => {
		expect( getEntityPrimaryKeyValues( 'event', { EVT_ID: 10 } ) )
			.toEqual( 10 );
	} );
	it( 'returns expected value from provided entity belonging to a model ' +
		'with combined primary keys', () => {
		expect( getEntityPrimaryKeyValues(
			'term',
			{ TERM_ID: 10, TAXONOMY_ID: 20 },
		) ).toEqual( '10:20' );
	} );
} );

describe( 'keyEntitiesByPrimaryKeyValue()', () => {
	it( 'throws an error if entities is empty', () => {
		const t = () => {
			keyEntitiesByPrimaryKeyValue( 'event', [] );
		};
		expect( t ).toThrow( Exception );
		expect( t )
			.toThrowError( 'The provided array of entities must not be empty' );
	} );
	it( 'throws an error if entities is not an array', () => {
		const t = () => {
			keyEntitiesByPrimaryKeyValue( 'event', { EVT_ID: 10 } );
		};
		expect( t ).toThrow( Exception );
		expect( t )
			.toThrowError( 'The provided value is not an array.' );
	} );
	it( 'returns the expected format for the entity records which is a ' +
		'collection indexed by the primary keys for the entities' +
		' (singular primary key)', () => {
		const expectedResponse = new Map(
			[
				[ 10, { EVT_ID: 10 } ],
				[ 20, { EVT_ID: 20 } ],
				[ 50, { EVT_ID: 50 } ],
			]
		);
		expect( keyEntitiesByPrimaryKeyValue(
			'event',
			[
				{ EVT_ID: 10 },
				{ EVT_ID: 20 },
				{ EVT_ID: 50 },
			],
		) ).toEqual( expectedResponse );
	} );
	it( 'returns the expected format for the entity records which is a ' +
		'collection indexed by the primary keys for the entities' +
		' (combined primary keys)', () => {
		const expectedResponse = new Map(
			[
				[ '10:20', { TERM_ID: 10, TAXONOMY_ID: 20 } ],
				[ '20:10', { TERM_ID: 20, TAXONOMY_ID: 10 } ],
				[ '50:6', { TERM_ID: 50, TAXONOMY_ID: 6 } ],
			]
		);
		expect( keyEntitiesByPrimaryKeyValue(
			'term',
			[
				{ TERM_ID: 10, TAXONOMY_ID: 20 },
				{ TERM_ID: 20, TAXONOMY_ID: 10 },
				{ TERM_ID: 50, TAXONOMY_ID: 6 },
			],
		) ).toEqual( expectedResponse );
	} );
} );
