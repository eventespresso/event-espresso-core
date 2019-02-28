/**
 * External imports
 */
import { fromJS, OrderedMap, Map, Set } from 'immutable';

/**
 * Internal dependencies
 */
import { receiveListItems } from '../reducers';
import { ACTION_TYPES as types } from '../action-types';
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
			fromJS( {
				datetime: {},
				event: {},
				term: {},
				ticket: {},
				venue: {},
				checkin: {},
				registration: {},
			} ),
		);
	} );
	describe( 'RECEIVE_LIST action handling', () => {
		describe( 'returns correct state for multiple consecutive ' +
			'queries', () => {
			const originalState = fromJS( { event: {} } );
			const testConditions = [
				[
					'?some_value=1',
					genericObjects,
					originalState.set(
						'generic',
						Map().set(
							'?some_value=1',
							Set( genericObjects )
						)
					),
					false,
				],
				[
					'?some_other_value=1',
					genericObjects,
					originalState.set(
						'generic',
						Map().set(
							'?some_value=1',
							Set( genericObjects )
						).set(
							'?some_other_value=1',
							Set( genericObjects )
						)
					),
					false,
				],
				[
					'?some_value=1',
					genericObjects,
					originalState.set(
						'generic',
						Map().set(
							'?some_value=1',
							Set( genericObjects )
						).set(
							'?some_other_value=1',
							Set( genericObjects )
						)
					),
					true,
				],
			];
			testRunner(
				testConditions,
				originalState,
				types.RECEIVE_LIST,
				'generic'
			);
		} );
	} );
	describe( 'RECEIVE_ENTITY_LIST action handling', () => {
		it( 'returns with received events for known model and does not affect' +
			' original state', () => {
			const originalState = fromJS( { event: {} } );
			const state = receiveListItems( originalState, {
				type: types.RECEIVE_ENTITY_LIST,
				identifier: 'event',
				queryString: '?some_value=1',
				items: eventEntityItems,
			} );
			expect( state ).not.toEqual( originalState );
			expect( state ).toEqual(
				originalState.set(
					'event',
					Map().set(
						'?some_value=1',
						OrderedMap(
							eventEntityItems.map(
								( entity ) => [ entity.id, entity ]
							)
						)
					)
				)
			);
		} );
		describe( 'returns correct state for multiple consecutive queries',
			() => {
				const originalState = fromJS( { event: {} } );
				const testConditions = [
					[
						'?some_value=1',
						eventEntityItems,
						originalState.set(
							'event',
							Map().set(
								'?some_value=1',
								OrderedMap(
									eventEntityItems.map(
										( entity ) => [ entity.id, entity ]
									)
								)
							)
						),
						false,
					],
					[
						'?some_other_value=1',
						eventEntityItems,
						originalState.set(
							'event',
							Map().set(
								'?some_value=1',
								OrderedMap(
									eventEntityItems.map(
										( entity ) => [ entity.id, entity ]
									)
								),
							).set(
								'?some_other_value=1',
								OrderedMap(
									eventEntityItems.map(
										( entity ) => [ entity.id, entity ]
									)
								),
							)
						),
						false,
					],
					[
						'?some_value=1',
						eventEntityItems,
						originalState.set(
							'event',
							Map().set(
								'?some_value=1',
								OrderedMap(
									eventEntityItems.map(
										( entity ) => [ entity.id, entity ]
									)
								),
							).set(
								'?some_other_value=1',
								OrderedMap(
									eventEntityItems.map(
										( entity ) => [ entity.id, entity ]
									)
								),
							)
						),
						true,
					],
				];
				testRunner(
					testConditions,
					originalState,
					types.RECEIVE_ENTITY_LIST,
					'event',
				);
			} );
	} );
} );
