/**
 * Internal dependencies
 */
import {
	getItems,
	getEntities,
	getEntitiesByIds,
	isRequestingItems,
	isRequestingEntities,
} from '../selectors';

/**
 * External dependencies
 */
import { select } from '@wordpress/data';
import { Exception } from '@eventespresso/eejs';
import { Set, OrderedMap, Map } from 'immutable';

describe( 'testing getters', () => {
	const testConditions = [
		[
			Map().set(
				'generic',
				Map().set(
					'some_query_string=1',
					Set.of( { id: 1 } )
				)
			),
			getItems,
			'getItems()',
			'identifier',
			'generic',
			[],
			[ { id: 1 } ],
		],
		[
			Map().set(
				'event',
				Map().set(
					'some_query_string=1',
					OrderedMap().set( 1, {} )
				)
			),
			getEntities,
			'getEntities()',
			'modelName',
			'event',
			[],
			[ {} ],
		],
	];
	testConditions.forEach( ( [
		state,
		methodTested,
		describeDescription,
		testDescriptionPart,
		mainStateIdentifier,
		defaultEmptyValue,
		expectedResponse,
	] ) => {
		describe( describeDescription, () => {
			beforeEach( () => methodTested.clear() );
			it( 'returns expected default value when ' + testDescriptionPart +
				' or queryString not found in state', () => {
				expect( methodTested(
					state,
					mainStateIdentifier,
					'notPresent=1'
				) ).toEqual( defaultEmptyValue );
				expect( methodTested(
					state,
					'invalid',
					'some_query_string=1'
				) ).toEqual( defaultEmptyValue );
			} );
			it( 'returns value for ' + testDescriptionPart + ' and ' +
				'queryString', () => {
				expect( methodTested(
					state,
					mainStateIdentifier,
					'some_query_string=1',
				) ).toEqual( expectedResponse );
			} );
			it( 'returns cached value for key on repeated calls', () => {
				const testResult = methodTested(
					state,
					mainStateIdentifier,
					'some_query_string=1'
				);
				expect( methodTested(
					state,
					mainStateIdentifier,
					'some_query_string=1'
				) ).toBe( testResult );
			} );
		} );
	} );
} );

describe( 'getEntitiesByIds()', () => {
	const originalState = Map().set(
		'event',
		Map().set(
			'[EVT_ID][IN]=10,20',
			OrderedMap( [ [ 10, {} ], [ 20, {} ] ] )
		)
	);
	it( 'returns expected default value when model doesn\'t exist in the ' +
		'state', () => {
		expect( getEntitiesByIds( originalState, 'cheese', [ 10, 20 ] ) )
			.toEqual( [] );
	} );
	it( 'returns expected default value when ids do not exist in the ' +
		'state (for the query being made)', () => {
		expect( getEntitiesByIds( originalState, 'event', [ 10 ] ) )
			.toEqual( [] );
	} );
	it( 'returns expected value for query matching state contents', () => {
		expect( getEntitiesByIds( originalState, 'event', [ 10, 20 ] ) )
			.toEqual( [ {}, {} ] );
	} );
	it( 'returns expected cached value on repeated calls', () => {
		const testResult = getEntitiesByIds(
			originalState,
			'event',
			[ 10, 20 ]
		);
		expect( getEntitiesByIds( originalState, 'event', [ 10, 20 ] ) )
			.toBe( testResult );
	} );
} );

describe( 'isRequesting()', () => {
	beforeAll( () => {
		select( 'core/data' ).isResolving = jest.fn().mockReturnValue( false );
	} );
	afterAll( () => {
		select( 'core/data' ).isResolving.mockRestore();
	} );

	function setIsResolving(
		isResolving,
		selectorKey = 'getItems',
	) {
		select( 'core/data' ).isResolving.mockImplementation(
			( reducerKey, selectorName ) => (
				isResolving &&
				reducerKey === 'eventespresso/lists' &&
				selectorName === selectorKey
			),
		);
	}
	const testConditions = [
		[
			'returns false if never requested or finished requesting',
			false,
			false,
		],
		[
			'returns true if items resolution is started and not finished',
			true,
			true,
		],
	];

	describe( 'isRequestingItems()', () => {
		const state = Map().set( 'generic', Map() );
		it( 'throws an exception when identifier is invalid', () => {
			const testCondition = () => {
				isRequestingItems(
					state,
					'invalid',
					'some_query_string=1'
				);
			};
			expect( testCondition ).toThrow( Exception );
		} );
		testConditions.forEach( ( [
			description,
			setResolving,
			expectedResponse,
		] ) => {
			it( description, () => {
				setIsResolving( setResolving );
				expect( isRequestingItems(
					state,
					'generic',
					'some_query_string=1'
				) ).toBe( expectedResponse );
			} );
		} );
	} );
	describe( 'isRequestingEntities()', () => {
		const state = Map().set( 'event', Map() );
		it( 'throws an exception when identifier is invalid', () => {
			const testCondition = () => {
				isRequestingItems( state, 'invalid', 'some_query_string=1' );
			};
			expect( testCondition ).toThrow( Exception );
		} );
		testConditions.forEach( ( [
			description,
			setResolving,
			expectedResponse,
		] ) => {
			it( description, () => {
				setIsResolving( setResolving, 'getEntities' );
				expect( isRequestingEntities(
					state,
					'event',
					'some_query_string=1'
				) ).toBe( expectedResponse );
			} );
		} );
	} );
} );
