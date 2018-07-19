/**
 * Internal dependencies
 */
import { getItems, isRequestingItems } from '../selectors';

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';

/**
 * External dependencies
 */
import { Exception } from '@eventespresso/eejs';

jest.mock( '@wordpress/data', () => ( {
	...require.requireActual( '@wordpress/data' ),
	select: jest.fn().mockReturnValue( {} ),
} ) );

describe( 'getItems()', () => {
	const state = {
		event: {
			'some_query_string=1': [ { id: 1 } ],
		},
	};
	it( 'returns empty array when modelName or queryString not found in state',
		() => {
			expect( getItems( state, 'event', 'notPresent=0' ) ).toEqual( [] );
			expect( getItems( state, 'invalid', 'some_query_string=1' ) )
				.toEqual( [] );
		},
	);

	it( 'returns value of model and queryString', () => {
		expect( getItems( state, 'event', 'some_query_string=1' ) )
			.toEqual( [ { id: 1 } ] );
	} );
} );

describe( 'isRequestingItems', () => {
	const state = {
		event: {},
	};
	beforeAll( () => {
		select( 'core/data' ).isResolving = jest.fn().mockReturnValue( false );
	} );
	afterAll( () => {
		select( 'core/data' ).isResolving.mockRestore();
	} );

	function setIsResolving( isResolving ) {
		select( 'core/data' ).isResolving.mockImplementation(
			( reducerKey, selectorName ) => (
				isResolving &&
				reducerKey === 'eventespresso/lists' &&
				selectorName === 'getItems'
			),
		);
	}

	it( 'throws an exception when modelName is invalid', () => {
		const t = () => {
			isRequestingItems( state, 'invalid', 'some_query_string=1' );
		};
		expect( t ).toThrowError( Exception );
	} );

	it( 'returns false if never requested',
		() => {
			expect( isRequestingItems( state, 'event', 'some_query_string=1' ) )
				.toBe( false );
		},
	);
	it( 'returns false if items resolution for model is finished',
		() => {
			expect( isRequestingItems( state,
				'event',
				'some_query_string=1',
			) )
				.toBe( false );
		},
	);
	it( 'returns true if items resolution for model is started', () => {
		setIsResolving( true );
		expect( isRequestingItems( state,
			'event',
			'some_query_string=1',
		) )
			.toBe( true );
	} );
} );
