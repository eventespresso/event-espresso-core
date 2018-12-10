/**
 * External imports
 */
import deepFreeze from 'deep-freeze';
import { set } from 'lodash';

/**
 * Internal dependencies
 */
import {
	deleteEntity,
	trashEntity,
} from '../dirty-entities';
import { mockStateForTests } from '../../test/fixtures';
import { ACTION_TYPES } from '../../actions/action-types';

const { entities: types } = ACTION_TYPES;
const testAction = ( type ) => ( {
	type,
	modelName: 'event',
	entityId: 10,
} );

const testRun = ( actionType, methodTested, originalStateProperty ) => {
	const originalState = deepFreeze(
		mockStateForTests.dirty[ originalStateProperty ]
	);
	describe( methodTested.name + '()', () => {
		switch ( actionType ) {
			case types.RECEIVE_DELETE_ENTITY_ID:
			case types.RECEIVE_TRASH_ENTITY_ID:
				describe( actionType + ' action type', () => {
					const receiveAction = testAction( actionType );
					it( 'returns expected default data when there the entity ' +
						'id already exists', () => {
						let testState = { ...originalState };
						set(
							testState,
							[ 'event' ],
							[ 10, 20 ]
						);
						testState = deepFreeze( testState );
						expect( methodTested( testState, receiveAction ) )
							.toBe( testState );
					} );
					it( 'sets the id on the default data does not already ' +
						'exist in state', () => {
						const result = methodTested(
							originalState,
							receiveAction
						);
						expect( result ).not.toBe( originalState );
						expect( result.event ).toEqual( [ 10 ] );
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
						let testState = { ...originalState };
						set(
							testState,
							[ 'event' ],
							[ 10, 20 ]
						);
						testState = deepFreeze( testState );
						const result = methodTested( testState, deleteAction );
						expect( result ).not.toBe( testState );
						expect( result.event ).toEqual( [ 20 ] );
					} );
					it( 'also deletes the model property in the state if ' +
						'removing the id results in an empty array', () => {
						let testState = { ...originalState };
						set(
							testState,
							[ 'event' ],
							[ 10 ]
						);
						testState = deepFreeze( testState );
						const result = methodTested( testState, deleteAction );
						expect( result ).not.toBe( testState );
						expect( result.event ).toBeUndefined();
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
