/**
 * External imports
 */
import { EventSchema, DateTimeSchema } from '@test/fixtures';
import { select } from '@wordpress/data';
import { isUndefined } from 'lodash';

/**
 * Internal imports
 */
import { eventFactory, dateTimeFactory } from '../../test/fixtures/base';
import { createEntitySelectors, createEntityResolvers } from '../entities';
import { mockStateForTests } from './fixtures';
import * as selectors from '../selectors';
import * as resolvers from '../resolvers';
import { REDUCER_KEY } from '../constants';

jest.mock( '../../../model', () => ( {
	...require.requireActual( '../../../model' ),
	MODEL_NAMES: [ 'event', 'datetime' ],
} ) );

jest.mock( '@wordpress/data', () => ( {
	...require.requireActual( '@wordpress/data' ),
	select: jest.fn().mockReturnValue( {} ),
} ) );

describe( 'createEntitySelectors', () => {
	beforeAll( () => {
		select( 'core/data' ).isResolving = jest.fn().mockReturnValue( false );
	} );
	afterAll( () => {
		select( 'core/data' ).isResolving.mockRestore();
	} );
	const newSelectors = createEntitySelectors( selectors );
	const expectedSelectors = [
		[
			'getEventSchema',
			EventSchema,
		],
		[
			'isRequestingEventSchema',
			false,
		],
		[
			'getEventFactory',
			eventFactory,
		],
		[
			'isRequestingEventFactory',
			false,
		],
		[
			'getDatetimeSchema',
			DateTimeSchema,
		],
		[
			'isRequestingDatetimeSchema',
			false,
		],
		[
			'getDatetimeFactory',
			dateTimeFactory,
		],
		[
			'isRequestingDatetimeFactory',
			false,
		],
	];
	describe( 'creates expected selectors for given modelNames', () => {
		expectedSelectors.forEach( ( [
			expectedSelector,
			expectedResponse,
		] ) => {
			describe( expectedSelector + '()', () => {
				it( 'is defined', () => {
					expect( newSelectors[ expectedSelector ] ).toBeDefined();
				} );
				it( 'returns expected value', () => {
					expect( newSelectors[ expectedSelector ](
						mockStateForTests
					) ).toEqual( expectedResponse );
				} );
			} );
		} );
	} );
} );

describe( 'createEntityResolvers()', () => {
	const newResolvers = createEntityResolvers( resolvers );
	const expectedResolvers = [
		[
			'getEventSchema',
			{ path: '/wp-json/ee/v4.8.36/events', method: 'OPTIONS' },
		],
		[
			'getEventFactory',
			{
				type: 'SELECT',
				reducerKey: REDUCER_KEY,
				selectorName: 'getSchemaForModel',
				args: [ 'event' ],
			},
		],
		[
			'getDatetimeSchema',
			{ path: '/wp-json/ee/v4.8.36/datetimes', method: 'OPTIONS' },
		],
		[
			'getDatetimeFactory',
			{
				type: 'SELECT',
				reducerKey: REDUCER_KEY,
				selectorName: 'getSchemaForModel',
				args: [ 'datetime' ],
			},
		],
	];
	describe( 'creates expected resolvers for given modelNames', () => {
		expectedResolvers.forEach( ( [
			expectedResolver,
			expectedResponse,
		] ) => {
			describe( expectedResolver + '()', () => {
				it( 'is defined', () => {
					expect( newResolvers[ expectedResolver ] ).toBeDefined();
				} );
				it( 'yields expected result for initial generator ' +
					'yield', () => {
					const fulfillment = newResolvers[ expectedResolver ]();
					const { value: initialResponse } = fulfillment.next();
					if ( ! isUndefined( initialResponse.request ) ) {
						expect( initialResponse.request ).toEqual(
							expectedResponse
						);
					} else {
						expect( initialResponse ).toEqual( expectedResponse );
					}
				} );
			} );
		} );
	} );
} );
