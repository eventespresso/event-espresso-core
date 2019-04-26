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
} from '../model';
import * as selectors from '../selectors';
import * as resolvers from '../resolvers';
import { select } from '@wordpress/data';

jest.mock( '../../../model', () => ( {
	...require.requireActual( '../../../model' ),
	MODEL_NAMES: [ 'event', 'datetime' ],
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
			[
				EventEntities.b,
				EventEntities.a,
			],
		],
		[
			'getEventsByIds',
			[ 20, 10 ],
			[
				EventEntities.b,
				EventEntities.a,
			],
		],
		[
			'getEventsByIds',
			[ 10, 50 ],
			[],
		],
		[
			'isRequestingEvents',
			'testQueryA',
			false,
		],
		[
			'getDatetimes',
			'testQueryB',
			[
				DateTimeEntities.c,
				DateTimeEntities.b,
			],
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
			arg,
			expectedResponse,
		] ) => {
			describe( expectedSelector + '()', () => {
				it( 'is defined.', () => {
					expect( newSelectors[ expectedSelector ] ).toBeDefined();
				} );
				it( 'returns expected value', () => {
					expect( newSelectors[ expectedSelector ](
						mockStateForTests,
						arg,
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
			'getEventsByIds',
			[ 10, 20 ],
			{ path: '/ee/v4.8.36/events?[EVT_ID][IN]=10,20' },
		],
		[
			'getDatetimes',
			'testQueryB',
			{ path: '/ee/v4.8.36/datetimes?testQueryB' },
		],
		[
			'getDatetimesByIds',
			[ 30 ],
			{ path: '/ee/v4.8.36/datetimes?[DTT_ID][IN]=30' },
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
