/**
 * Internal dependencies
 */
import { mockStateForTests } from './fixtures';
import {
	EventEntities,
	DateTimeEntities,
} from '../../test/fixtures/base';
import {
	createEntitySelectors,
	createEntityResolvers,
} from '../entities';
import * as selectors from '../selectors';
import * as resolvers from '../resolvers';
import { select } from '@wordpress/data';

jest.mock( '../../../model', () => ( {
	...require.requireActual( '../../../model' ),
	MODEL_NAMES: [ 'event', 'datetime' ],
} ) );

jest.mock( '@wordpress/data', () => ( {
	...require.requireActual( '@wordpress/data' ),
	select: jest.fn().mockReturnValue( {} ),
} ) );

describe( 'createEntitySelectors()', () => {
	beforeAll( () => {
		select( 'core/data' ).isResolving = jest.fn().mockReturnValue( false );
	} );
	afterAll( () => {
		select( 'core/data' ).isResolving.mockRestore();
	} );
	const newSelectors = createEntitySelectors( selectors );
	const expectedSelectors = [
		[
			'getEvents',
			'testQueryA',
			new Map( [
				[ 10, EventEntities.a ],
				[ 20, EventEntities.b ],
			] ),
		],
		[
			'isRequestingEvents',
			'testQueryA',
			false,
		],
		[
			'getDatetimes',
			'testQueryB',
			new Map( [
				[ 53, DateTimeEntities.b ],
				[ 54, DateTimeEntities.c ],
			] ),
		],
		[
			'isRequestingDatetimes',
			'testQueryB',
			false,
		],
	];
	describe( 'creates expected selectors for given modelNames', () => {
		expectedSelectors.forEach( ( [
			expectedSelector,
			queryString,
			expectedResponse,
		] ) => {
			describe( expectedSelector + '()', () => {
				it( 'is defined.', () => {
					expect( newSelectors[ expectedSelector ] ).toBeDefined();
				} );
				it( 'returns expected value', () => {
					expect( newSelectors[ expectedSelector ](
						mockStateForTests,
						queryString,
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
			'getEvents',
			'testQueryA',
			{ path: '/ee/v4.8.36/events?testQueryA' },
		],
		[
			'getDatetimes',
			'testQueryB',
			{ path: '/ee/v4.8.36/datetimes?testQueryB' },
		],
	];
	describe( 'creates expected resolvers for given modelNames', () => {
		expectedResolvers.forEach( ( [
			expectedResolver,
			queryString,
			expectedApiFetchRequestValue,
		] ) => {
			describe( expectedResolver + '()', () => {
				it( 'is defined.', () => {
					expect( newResolvers[ expectedResolver ] ).toBeDefined();
				} );
				it( 'yields expected result for api fetch action ' +
					'object', () => {
					const fulfillment = newResolvers[ expectedResolver ](
						queryString
					);
					const { value: apiFetchAction } = fulfillment.next();
					expect( apiFetchAction.request ).toEqual(
						expectedApiFetchRequestValue
					);
				} );
			} );
		} );
	} );
} );
