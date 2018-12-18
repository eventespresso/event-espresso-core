/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	default as receiveEntityRecords,
} from '../reducers';
import {
	receiveEntityRecords as receiveRecordsAction,
} from '../actions';
import { mockStateForTests } from './fixtures';

describe( 'receiveEntityRecords()', () => {
	const originalState = deepFreeze( mockStateForTests );
	it( 'returns original state when provided modelName is not in state',
		() => {
			const state = receiveEntityRecords(
				originalState,
				receiveRecordsAction(
					'ticket',
					{ 10: { TKT_ID: 10, name: 'Ticket 10' } },
				),
			);
			expect( state ).toBe( originalState );
		},
	);

	describe( 'testing adding new records', () => {
		const state = receiveEntityRecords(
			originalState,
			receiveRecordsAction(
				'event',
				new Map( [ [ 60, mockStateForTests.entities.event[ 30 ] ] ] ),
			),
		);
		const expectedState = {
			entities: {
				...originalState.entities,
				event: {
					...originalState.entities.event,
					60: mockStateForTests.entities.event[ 30 ],
				},
			},
			entityIds: {
				...originalState.entityIds,
				event: [ ...originalState.entityIds.event, '60' ],
			},
		};

		it( 'does not change original state for new records', () => {
			expect( originalState ).not.toBe( state );
			expect( originalState ).toEqual( mockStateForTests );
		} );

		it( 'returns original state when incoming entities are not a Map',
			() => {
				const testState = receiveEntityRecords(
					originalState,
					receiveRecordsAction(
						'event',
						{ 60: {} }
					)
				);
				expect( originalState ).toBe( testState );
			} );

		it( 'adds new record to state', () => {
			expect( state ).toEqual( expectedState );
		} );
	} );
} );
