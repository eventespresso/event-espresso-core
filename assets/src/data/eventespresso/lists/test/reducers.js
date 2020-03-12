/**
 * External imports
 */
import { fromJS, OrderedMap, Map, Set } from 'immutable';
import { DEFAULT_LISTS_STATE } from '@eventespresso/model';

/**
 * Internal dependencies
 */
import { receiveListItems } from '../reducers';
import {
	ACTION_TYPES as types,
	RESET_TYPES as resetTypes,
} from '../action-types';
import {
	genericObjects,
	eventEntityItems,
	mockStateForTests,
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
				datetime_ticket: {},
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
describe( 'RESET_ALL_STATE', () => {
	it( 'returns expected state', () => {
		expect( receiveListItems(
			mockStateForTests,
			{ type: resetTypes.RESET_ALL_STATE }
		) ).toEqual( fromJS( DEFAULT_LISTS_STATE ) );
	} );
} );
describe( 'RESET_STATE_FOR_IDENTIFIER', () => {
	it( 'returns expected state when identifier does not exist', () => {
		const newState = receiveListItems(
			mockStateForTests,
			{
				type: resetTypes.RESET_STATE_FOR_IDENTIFIER,
				identifier: 'bogus',
			}
		);
		expect( newState ).toBe( mockStateForTests );
	} );
	it( 'returns expected state when identifier exists', () => {
		const expectedState = mockStateForTests.delete( 'event' );
		const newState = receiveListItems(
			mockStateForTests,
			{
				type: resetTypes.RESET_STATE_FOR_IDENTIFIER,
				identifier: 'event',
			}
		);
		expect( newState ).toEqual( expectedState );
	} );
} );
describe( 'RESET_SPECIFIC_STATE_FOR_IDENTIFIER', () => {
	it( 'returns expected state when identifier exists but query string ' +
		'does not', () => {
		const newState = receiveListItems(
			mockStateForTests,
			{
				type: resetTypes.RESET_SPECIFIC_STATE_FOR_IDENTIFIER,
				identifier: 'event',
				queryString: 'invalid',
			}
		);
		expect( newState ).toBe( mockStateForTests );
	} );
	it( 'returns expected state when identifier and query string ' +
		'exists in it', () => {
		const newState = receiveListItems(
			mockStateForTests,
			{
				type: resetTypes.RESET_SPECIFIC_STATE_FOR_IDENTIFIER,
				identifier: 'event',
				queryString: '[EVT_ID][IN]=20,10',
			}
		);
		expect( newState ).toEqual(
			mockStateForTests
				.deleteIn( [ 'event', '[EVT_ID][IN]=20,10' ] )
		);
	} );
} );
