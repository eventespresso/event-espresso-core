/**
 * External dependencies
 */
import { EventSchema } from '@test/fixtures';
import { DEFAULT_SCHEMA_STATE } from '@eventespresso/model';

/**
 * Internal dependencies
 */
import {
	receiveSchema,
	receiveFactory,
	receiveRelationEndpointForEntity,
} from '../reducers';
import { eventFactory } from '../../test/fixtures/base';
import { fromJS } from 'immutable';
import { ACTION_TYPES as types } from '../action-types';

const expectedDefaultState = {
	schema: fromJS(
		{ datetime: {}, event: {}, term: {}, ticket: {}, venue: {} }
	),
	factory: fromJS(
		{ datetime: {}, event: {}, term: {}, ticket: {}, venue: {} }
	),
	relationEndpoints: fromJS(
		{ datetime: {}, event: {}, term: {}, ticket: {}, venue: {} }
	),
};

describe( 'receiveSchema()', () => {
	const testRunner = (
		testConditions,
		formerState,
		actionType,
		reducerMethod,
	) => testConditions.forEach( ( [
		modelName,
		args,
		expectedState,
		isEqualIncomingState,
	] ) => {
		const oldState = formerState;
		const newState = reducerMethod(
			formerState, {
				type: actionType,
				modelName,
				...args,
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
		const state = receiveSchema( undefined, {} );
		expect( state ).toEqual( fromJS( DEFAULT_SCHEMA_STATE.schema ) );
	} );
	describe( types.RECEIVE_SCHEMA_RECORD + ' action handling', () => {
		describe( 'returns correct state for multiple consecutive ' +
			'queries', () => {
			const originalState = expectedDefaultState.schema;
			const testConditions = [
				[
					'datetime',
					{},
					originalState,
					true,
				],
				[
					'event',
					{ schema: EventSchema },
					originalState.set( 'event', EventSchema ),
					false,
				],
				[
					'event',
					{ schema: EventSchema },
					originalState.set( 'event', EventSchema ),
					true,
				],
			];
			testRunner(
				testConditions,
				originalState,
				types.RECEIVE_SCHEMA_RECORD,
				receiveSchema,
			);
		} );
	} );
	describe( types.RECEIVE_FACTORY_FOR_MODEL + ' action handling', () => {
		describe( 'returns correct state for multiple consecutive ' +
			'queries', () => {
			const originalState = expectedDefaultState.factory;
			const testConditions = [
				[
					'datetime',
					{},
					originalState,
					true,
				],
				[
					'event',
					{ factory: eventFactory },
					originalState.set( 'event', eventFactory ),
					false,
				],
				[
					'event',
					{ factory: eventFactory },
					originalState.set( 'event', eventFactory ),
					true,
				],
			];
			testRunner(
				testConditions,
				originalState,
				types.RECEIVE_FACTORY_FOR_MODEL,
				receiveFactory,
			);
		} );
	} );
	describe( types.RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY + ' action ' +
		'handling', () => {
		describe( 'returns correct state for multiple consecutive ' +
			'queries', () => {
			const originalState = expectedDefaultState.relationEndpoints;
			const testConditions = [
				[
					'datetime',
					{},
					originalState,
					true,
				],
				[
					'event',
					{
						entityId: '10',
						modelName: 'event',
						relationName: 'datetime',
						endpoint: 'event/10/datetimes',
					},
					originalState.setIn(
						[ 'event', 10, 'datetimes' ],
						'event/10/datetimes'
					),
					false,
				],
				[
					'event',
					{
						entityId: '10',
						relationName: 'datetime',
						endpoint: 'event/10/datetimes',
					},
					originalState.setIn(
						[ 'event', 10, 'datetimes' ],
						'event/10/datetimes'
					),
					true,
				],
			];
			testRunner(
				testConditions,
				originalState,
				types.RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY,
				receiveRelationEndpointForEntity
			);
		} );
	} );
} );
