/**
 * Internal dependencies
 */
import {
	getSchemaForModel,
	isRequestingSchemaForModel,
	getFactoryForModel,
	isRequestingFactoryForModel,
	hasResolvedFactoryForModel,
	hasResolvedSchemaForModel,
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
		],
		[
			getFactoryForModel,
			'factory',
		],
	];
	testConditions.forEach( ( [
		selectorToTest,
		stateProperty,
	] ) => {
		describe( selectorToTest.name + '()', () => {
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
describe( 'testing isRequesting and hasResolved methods', () => {
	beforeAll( () => {
		select( 'core/data' ).isResolving = jest.fn().mockReturnValue( false );
		select( 'core/data' ).hasFinishedResolution = jest.fn().mockReturnValue(
			false
		);
	} );
	afterAll( () => {
		select( 'core/data' ).isResolving.mockRestore();
		select( 'core/data' ).hasFinishedResolution.mockRestore();
	} );

	function setIsResolving(
		isResolving,
		selectorKey = 'getSchemaForModel',
	) {
		const implementationFunction = ( reducerKey, selectorName ) => (
			isResolving &&
			reducerKey === 'eventespresso/schema' &&
			selectorName === selectorKey
		);
		select( 'core/data' ).isResolving.mockImplementation(
			implementationFunction
		);
		select( 'core/data' ).hasFinishedResolution.mockImplementation(
			implementationFunction
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
		[
			hasResolvedSchemaForModel,
			'getSchemaForModel',
		],
		[
			hasResolvedFactoryForModel,
			'getFactoryForModel',
		],
	];
	testConditions.forEach( ( [
		selectorMethod,
		methodDescription,
	] ) => {
		describe( selectorMethod.name + '()', () => {
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
