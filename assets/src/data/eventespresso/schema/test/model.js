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
import { createEntitySelectors, createEntityResolvers } from '../model';
import { mockStateForTests } from './fixtures';
import * as selectors from '../selectors';
import * as resolvers from '../resolvers';
import { resolveSelect } from '../../base-controls';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../constants';

jest.mock( '../../../model', () => ( {
	...require.requireActual( '../../../model' ),
	MODEL_NAMES: [ 'event', 'datetime' ],
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
			{ path: '/ee/v4.8.36/events', method: 'OPTIONS' },
		],
		[
			'getEventFactory',
			[ SCHEMA_REDUCER_KEY, 'getSchemaForModel', 'event' ],
		],
		[
			'getDatetimeSchema',
			{ path: '/ee/v4.8.36/datetimes', method: 'OPTIONS' },
		],
		[
			'getDatetimeFactory',
			[ SCHEMA_REDUCER_KEY, 'getSchemaForModel', 'datetime' ],
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
						expect( initialResponse ).toEqual(
							resolveSelect( ...expectedResponse )
						);
					}
				} );
			} );
		} );
	} );
} );
