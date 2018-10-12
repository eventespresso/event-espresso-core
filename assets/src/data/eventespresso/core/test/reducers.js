/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';
import { AuthedEventResponse } from '@test/fixtures';

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
import { eventFactory } from '../../test/fixtures/base';

describe( 'receiveEntityRecords()', () => {
	const originalState = deepFreeze( mockStateForTests );
	it( 'returns original state when provided modelName is not in state',
		() => {
			const state = receiveEntityRecords(
				originalState,
				receiveRecordsAction(
					{ modelName: 'ticket' },
					{ 10: { TKT_ID: 10, name: 'Ticket 10' } },
				),
			);
			expect( state ).toBe( originalState );
		},
	);

	it( 'does not change original state for new records', () => {
		const testEventResponse = { ...AuthedEventResponse, EVT_ID: 30 };
		const state = receiveEntityRecords(
			originalState,
			receiveRecordsAction(
				eventFactory,
				{ 30: testEventResponse },
			),
		);

		expect( originalState ).not.toBe( state );
		expect( originalState ).toEqual( mockStateForTests );
	} );

	it( 'adds new record to state', () => {
		const testEventResponse = { ...AuthedEventResponse, EVT_ID: 60 };
		const state = receiveEntityRecords(
			originalState,
			receiveRecordsAction(
				eventFactory,
				{ 60: testEventResponse },
			),
		);
		const expectedState = {
			entities: {
				...originalState.entities,
				event: {
					...originalState.entities.event,
					60: eventFactory.fromExisting( testEventResponse ),
				},
			},
			entityIds: {
				...originalState.entityIds,
				event: [ ...originalState.entityIds.event, '60' ],
			},
		};
		expect( state ).toEqual( expectedState );
	} );
} );
