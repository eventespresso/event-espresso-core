/**
 * Internal dependencies
 */
import {
	getItems,
	getEntities,
	isRequestingItems,
	isRequestingEntities,
} from '../selectors';

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

describe( 'testing getters', () => {
	const testConditions = [
		[
			{ generic: { 'some_query_string=1': [ { id: 1 } ] } },
			getItems,
			'getItems()',
			'identifier',
			'generic',
			[],
			[ { id: 1 } ],
		],
		[
			{ event: { 'some_query_string=1': { 1: {} } } },
			getEntities,
			'getEntities()',
			'modelName',
			'event',
			new Map(),
			{ 1: {} },
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
		} );
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
		const state = {
			generic: {},
		};
		it( 'throws an exception when identifier is invalid', () => {
			const testCondition = () => {
				isRequestingItems( state, 'invalid', 'some_query_string=1' );
			};
			expect( testCondition ).toThrowError( Exception );
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
		const state = {
			event: {},
		};
		it( 'throws an exception when identifier is invalid', () => {
			const testCondition = () => {
				isRequestingItems( state, 'invalid', 'some_query_string=1' );
			};
			expect( testCondition ).toThrowError( Exception );
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
