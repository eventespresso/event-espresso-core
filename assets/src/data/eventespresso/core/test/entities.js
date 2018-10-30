/**
 * Internal dependencies
 */
import {
	mockStateForTests,
} from './fixtures';
import {
	EventEntities,
	DateTimeEntities,
} from '../../test/fixtures/base';
import * as selectors from '../selectors';
import { createEntitySelectors } from '../entities';

jest.mock( '../../../model', () => ( {
	...require.requireActual( '../../../model' ),
	MODEL_NAMES: [ 'event', 'datetime' ],
} ) );

describe( 'createEntitySelectors()', () => {
	const newSelectors = createEntitySelectors( selectors );
	const expectedSelectors = [
		[
			'getEventRecords',
			null,
			{
				10: EventEntities.a,
				20: EventEntities.b,
				30: EventEntities.c,
			},
		],
		[
			'getEvents',
			null,
			[ EventEntities.a, EventEntities.b, EventEntities.c ],
		],
		[
			'getEventById',
			10,
			EventEntities.a,
		],
		[
			'getEventsByIds',
			[ 10, 20 ],
			[ EventEntities.a, EventEntities.b ],
		],
		[
			'getDatetimeRecords',
			null,
			{
				52: DateTimeEntities.a,
				53: DateTimeEntities.b,
				54: DateTimeEntities.c,
			},
		],
		[
			'getDatetimes',
			null,
			[ DateTimeEntities.a, DateTimeEntities.b, DateTimeEntities.c ],
		],
		[
			'getDatetimeById',
			52,
			DateTimeEntities.a,
		],
		[
			'getDatetimesByIds',
			[ 52, 54 ],
			[ DateTimeEntities.a, DateTimeEntities.c ],
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
				it( 'returns expectedValue', () => {
					expect( newSelectors[ expectedSelector ](
						mockStateForTests,
						arg
					) ).toEqual( expectedResponse );
				} );
			} );
		} );
	} );
} );
