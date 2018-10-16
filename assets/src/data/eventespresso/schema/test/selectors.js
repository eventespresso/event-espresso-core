/**
 * Internal dependencies
 */
import {
	getSchemaForModel,
	isRequestingSchemaForModel,
	getFactoryForModel,
	isRequestingFactoryForModel,
} from '../selectors';

/**
 * External dependencies
 */
import { select } from '@wordpress/data';

jest.mock( '@wordpress/data', () => ( {
	...require.requireActual( '@wordpress/data' ),
	select: jest.fn().mockReturnValue( {} ),
} ) );

describe( 'testing getters', () => {
	const testConditions = [
		[
			getSchemaForModel,
			'schema',
			'getSchemaForModel()',
		],
		[
			getFactoryForModel,
			'factory',
			'getFactoryForModel()',
		],
	];
	testConditions.forEach( ( [
		selectorToTest,
		stateProperty,
		description,
	] ) => {
		describe( description, () => {
			const state = { [ stateProperty ]: { event: {} } };
			it( 'returns expected default value when model not found in ' +
				'state', () => {
				expect( selectorToTest(
					state,
					'invalid'
				) ).toEqual( {} );
			} );
			it( 'returns expected value for model in state', () => {
				expect( selectorToTest(
					state,
					'event',
				) ).toEqual( {} );
			} );
		} );
	} );
} );
describe( 'testing isRequesting methods', () => {
	beforeAll( () => {
		select( 'core/data' ).isResolving = jest.fn().mockReturnValue( false );
	} );
	afterAll( () => {
		select( 'core/data' ).isResolving.mockRestore();
	} );

	function setIsResolving(
		isResolving,
		selectorKey = 'getSchemaForModel',
	) {
		select( 'core/data' ).isResolving.mockImplementation(
			( reducerKey, selectorName ) => (
				isResolving &&
				reducerKey === 'eventespresso/schema' &&
				selectorName === selectorKey
			),
		);
	}
	const testConditions = [
		[
			isRequestingSchemaForModel,
			'getSchemaForModel',
		],
		[
			isRequestingFactoryForModel,
			'getFactoryForModel',
		],
	];
	testConditions.forEach( ( [
		selectorMethod,
		methodDescription,
	] ) => {
		describe( methodDescription + '()', () => {
			it( 'returns false if never requested or finished ' +
				'requesting', () => {
				expect( selectorMethod( 'event' ) ).toBe( false );
			} );
			it( 'returns true if resolution is started and not ' +
				'finished', () => {
				setIsResolving( true, methodDescription );
				expect( selectorMethod( 'event' ) ).toBe( true );
			} );
		} );
	} );
} );
