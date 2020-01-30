/**
 * External imports
 */
import { Set, fromJS } from 'immutable';
import { DEFAULT_CORE_STATE } from '@eventespresso/model';

/**
 * Internal dependencies
 */
import {
	deleteEntity,
	trashEntity,
} from '../dirty-entities';
import { mockStateForTests } from '../../test/fixtures';
import { ACTION_TYPES } from '../../actions/action-types';

const { entities: types, resets: resetTypes } = ACTION_TYPES;
const testAction = ( type ) => ( {
	type,
	modelName: 'event',
	entityId: 10,
} );

const testRun = ( actionType, methodTested, originalStateProperty ) => {
	const originalState = mockStateForTests.dirty[ originalStateProperty ];
	describe( methodTested.name + '()', () => {
		switch ( actionType ) {
			case types.RECEIVE_DELETE_ENTITY_ID:
			case types.RECEIVE_TRASH_ENTITY_ID:
				describe( actionType + ' action type', () => {
					const receiveAction = testAction( actionType );
					it( 'returns expected default data when there the entity ' +
						'id already exists', () => {
						const testState = originalState
							.set( 'event', Set.of( 10, 20 ) );
						expect( methodTested( testState, receiveAction ) )
							.toBe( testState );
					} );
					it( 'setting the id on the default data when it ' +
						'already exists in state', () => {
						const result = methodTested(
							originalState,
							receiveAction
						);
						expect( result ).not.toBe( originalState );
						expect( result.get( 'event' ) )
							.toEqual( Set.of( 10 ) );
					} );
				} );
				break;
			case types.REMOVE_DELETE_ENTITY_ID:
			case types.REMOVE_TRASH_ENTITY_ID:
				describe( actionType + ' action type', () => {
					const deleteAction = testAction( actionType );
					it( 'returns expected default data when the entity id ' +
						'does not exist in the state', () => {
						expect( methodTested( originalState, deleteAction ) )
							.toBe( originalState );
					} );
					it( 'returns a new state with the entity id removed when ' +
						'it exists in the state', () => {
						const testState = originalState.set(
							'event',
							Set.of( 10, 20 )
						);
						const result = methodTested( testState, deleteAction );
						expect( result ).not.toBe( testState );
						expect( result.get( 'event' ) )
							.toEqual( Set.of( 20 ) );
					} );
					it( 'also deletes the model property in the state if ' +
						'removing the id results in an empty array', () => {
						const testState = originalState
							.set( 'event', Set.of( 10 ) );
						const result = methodTested( testState, deleteAction );
						expect( result ).not.toBe( testState );
						expect( result.get( 'event' ) ).toBeUndefined();
					} );
				} );
				break;
		}
	} );
};

[
	[
		types.RECEIVE_DELETE_ENTITY_ID,
		deleteEntity,
		'delete',
	],
	[
		types.REMOVE_DELETE_ENTITY_ID,
		deleteEntity,
		'delete',
	],
	[
		types.RECEIVE_TRASH_ENTITY_ID,
		trashEntity,
		'trash',
	],
	[
		types.REMOVE_TRASH_ENTITY_ID,
		trashEntity,
		'trash',
	],
].forEach( ( args ) => testRun( ...args ) );

describe( 'RESET_ALL_STATE action', () => {
	const getTestState = ( type ) => {
		return mockStateForTests.dirty[ type ].set(
			'event',
			[ 10, 20, 30 ]
		).set(
			'datetimes',
			[ 40, 50 ]
		);
	};
	it( 'removes all state for trash', () => {
		const originalState = getTestState( 'trash' );
		const newState = trashEntity(
			originalState,
			{ type: resetTypes.RESET_ALL_STATE }
		);
		expect( newState ).not.toBe( originalState );
		expect( newState ).toEqual(
			fromJS( DEFAULT_CORE_STATE.dirty.trash )
		);
	} );
	it( 'removes all state for delete', () => {
		const originalState = getTestState( 'delete' );
		const newState = deleteEntity(
			originalState,
			{ type: resetTypes.RESET_ALL_STATE }
		);
		expect( newState ).not.toBe( originalState );
		expect( newState ).toEqual(
			fromJS( DEFAULT_CORE_STATE.dirty.delete )
		);
	} );
} );

describe( 'RESET_STATE_FOR_MODEL action', () => {
	const getTestState = ( type ) => {
		return mockStateForTests.dirty[ type ].set(
			'event',
			[ 10, 20, 30 ]
		).set(
			'datetime',
			[ 40, 50 ]
		);
	};
	const getAction = ( modelName ) => (
		{
			type: resetTypes.RESET_STATE_FOR_MODEL,
			modelName,
		}
	);
	it( 'removes only the state for the given model on the trash ' +
		'state', () => {
		const originalState = getTestState( 'trash' );
		const newState = trashEntity(
			originalState,
			getAction( 'event' ),
		);
		expect( newState ).toEqual(
			originalState.delete( 'event' )
		);
	} );
	it( 'removes only the state for the given model on the delete ' +
		'state', () => {
		const originalState = getTestState( 'delete' );
		const newState = deleteEntity(
			originalState,
			getAction( 'datetime' )
		);
		expect( newState ).toEqual(
			originalState.delete( 'datetime' )
		);
	} );
	it( 'normalizes incoming modelName for affecting state', () => {
		const originalState = getTestState( 'delete' );
		const newState = deleteEntity(
			originalState,
			getAction( 'events' )
		);
		expect( newState ).toEqual(
			originalState.delete( 'event' )
		);
	} );
} );
