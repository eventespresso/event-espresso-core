/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';
import { EventSchema } from '@test/fixtures';

/**
 * Internal dependencies
 */
import { receiveSchema, receiveFactory } from '../reducers';
import { eventFactory } from '../../test/fixtures/base';

const expectedDefaultState = {
	schema: { datetime: {}, event: {}, term: {}, ticket: {}, venue: {} },
	factory: { datetime: {}, event: {}, term: {}, ticket: {}, venue: {} },
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
		expect( state ).toEqual( expectedDefaultState.schema );
	} );
	describe( 'RECEIVE_SCHEMA_RECORD action handling', () => {
		describe( 'returns correct state for multiple consecutive ' +
			'queries', () => {
			const originalState = deepFreeze( expectedDefaultState.schema );
			const testConditions = [
				[
					'datetime',
					{},
					expectedDefaultState.schema,
					true,
				],
				[
					'event',
					{ schema: EventSchema },
					{
						...expectedDefaultState.schema,
						event: EventSchema,
					},
					false,
				],
				[
					'event',
					{ schema: EventSchema },
					{
						...expectedDefaultState.schema,
						event: EventSchema,
					},
					true,
				],
			];
			testRunner(
				testConditions,
				originalState,
				'RECEIVE_SCHEMA_RECORD',
				receiveSchema,
			);
		} );
	} );
	describe( 'RECEIVE_FACTORY_FOR_MODEL action handling', () => {
		describe( 'returns correct state for multiple consecutive ' +
			'queries', () => {
			const originalState = deepFreeze( expectedDefaultState.factory );
			const testConditions = [
				[
					'datetime',
					{},
					expectedDefaultState.factory,
					true,
				],
				[
					'event',
					{ factory: eventFactory },
					{
						...expectedDefaultState.factory,
						event: eventFactory,
					},
					false,
				],
				[
					'event',
					{ factory: eventFactory },
					{
						...expectedDefaultState.factory,
						event: eventFactory,
					},
					true,
				],
			];
			testRunner(
				testConditions,
				originalState,
				'RECEIVE_FACTORY_FOR_MODEL',
				receiveFactory,
			);
		} );
	} );
} );
