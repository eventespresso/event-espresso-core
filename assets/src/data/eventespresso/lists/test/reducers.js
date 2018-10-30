/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { receiveListItems } from '../reducers';
import {
	genericObjects,
	eventEntityItems,
} from './fixtures';

describe( 'receiveListItems()', () => {
	const testRunner = (
		testConditions,
		formerState,
		actionType,
		identifier,
	) => testConditions.forEach( ( [
		queryString,
		items,
		expectedState,
		isEqualIncomingState,
	] ) => {
		const oldState = formerState;
		const newState = receiveListItems(
			formerState, {
				type: actionType,
				identifier,
				queryString,
				items,
			}
		);
		it( 'has expected match to former state', () => {
			if ( isEqualIncomingState ) {
				expect( newState ).toBe( oldState );
			} else {
				expect( newState ).not.toEqual( oldState );
			}
		} );
		it( 'returns expected value', () => {
			expect( newState ).toEqual( expectedState );
		} );
		formerState = newState;
	} );
	it( 'returns the expected default object (from mock data)', () => {
		const state = receiveListItems( undefined, {} );
		expect( state ).toEqual(
			{ datetime: {}, event: {}, term: {}, ticket: {}, venue: {} },
		);
	} );
	describe( 'RECEIVE_LIST action handling', () => {
		describe( 'returns correct state for multiple consecutive ' +
			'queries', () => {
			const originalState = deepFreeze( { event: {} } );
			const testConditions = [
				[
					'?some_value=1',
					genericObjects,
					{
						event: {},
						generic: {
							'?some_value=1': genericObjects,
						},
					},
					false,
				],
				[
					'?some_other_value=1',
					genericObjects,
					{
						event: {},
						generic: {
							'?some_value=1': genericObjects,
							'?some_other_value=1': genericObjects,
						},
					},
					false,
				],
				[
					'?some_value=1',
					genericObjects,
					{
						event: {},
						generic: {
							'?some_value=1': genericObjects,
							'?some_other_value=1': genericObjects,
						},
					},
					true,
				],
			];
			testRunner(
				testConditions,
				originalState,
				'RECEIVE_LIST',
				'generic'
			);
		} );
	} );
	describe( 'RECEIVE_ENTITY_LIST action handling', () => {
		it( 'returns with received events for known model and does not affect' +
			' original state', () => {
			const originalState = deepFreeze( { event: {} } );
			const state = receiveListItems( originalState, {
				type: 'RECEIVE_ENTITY_LIST',
				identifier: 'event',
				queryString: '?some_value=1',
				items: eventEntityItems,
			} );
			expect( state ).not.toEqual( originalState );
			expect( state ).toEqual( {
				event: {
					'?some_value=1': eventEntityItems,
				},
			} );
		} );
		describe( 'returns correct state for multiple consecutive queries',
			() => {
				const originalState = deepFreeze( { event: {} } );
				const testConditions = [
					[
						'?some_value=1',
						eventEntityItems,
						{
							event: {
								'?some_value=1': eventEntityItems,
							},
						},
						false,
					],
					[
						'?some_other_value=1',
						eventEntityItems,
						{
							event: {
								'?some_value=1': eventEntityItems,
								'?some_other_value=1': eventEntityItems,
							},
						},
						false,
					],
					[
						'?some_value=1',
						eventEntityItems,
						{
							event: {
								'?some_value=1': eventEntityItems,
								'?some_other_value=1': eventEntityItems,
							},
						},
						true,
					],
				];
				testRunner(
					testConditions,
					originalState,
					'RECEIVE_ENTITY_LIST',
					'event',
				);
			} );
	} );
} );
