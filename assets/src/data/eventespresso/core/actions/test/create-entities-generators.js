/**
 * External dependencies
 */
import { isModelEntity } from '@eventespresso/validators';

/**
 * Internal imports
 */
import {
	createEntity,
	receiveEntityAndResolve,
	receiveEntitiesAndResolve,
} from '../create-entities-generators';
import { eventFactory } from '../../../test/fixtures/base';
import { resolveSelect, dispatch } from '../../../base-controls';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../../schema/constants';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../../constants';

describe( 'createEntity()', () => {
	describe( 'yields with expected response', () => {
		const TestEvent = { EVT_name: 'test event' };
		let fulfillment;
		const reset = () =>
			fulfillment = createEntity( 'event', TestEvent );
		it( 'yields a resolveSelect action for retrieving an Event ' +
			'factory', () => {
			reset();
			const { value } = fulfillment.next();
			expect( value ).toEqual(
				resolveSelect(
					SCHEMA_REDUCER_KEY,
					'getFactoryForModel',
					'event'
				)
			);
		} );
		it( 'yields null when invalid factory retrieved', () => {
			const { value } = fulfillment.next();
			expect( value ).toBe( null );
		} );
		it( 'yields expected dispatch action for valid factory retrieved', () => {
			reset();
			fulfillment.next();
			const { value } = fulfillment.next( eventFactory );
			expect( value.type ).toBe( 'DISPATCH' );
			expect( value.reducerKey ).toBe( CORE_REDUCER_KEY );
			expect( value.args[ 1 ].EVT_name ).toBe( 'test event' );
		} );
		it( 'returns entityInstance', () => {
			const { value: event } = fulfillment.next();
			expect( isModelEntity( event ) ).toBe( true );
			expect( event.EVT_name ).toEqual( 'test event' );
		} );
	} );
} );

describe( 'receiveEntityAndResolve()', () => {
	let fulfillment;
	const TestEvent = eventFactory.createNew(
		{ EVT_name: 'test event' }
	);
	const reset = () => fulfillment = receiveEntityAndResolve(
		'event',
		TestEvent
	);
	it( 'yields dispatch action for receiving the entity', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				CORE_REDUCER_KEY,
				'receiveEntity',
				TestEvent
			)
		);
	} );
	it( 'yields dispatch action for finishing the resolution on ' +
		'`getEntityById` for this entity id', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'finishResolution',
				CORE_REDUCER_KEY,
				'getEntityById',
				[ 'event', TestEvent.id ]
			)
		);
	} );
} );
describe( 'receiveEntitiesAndResolve()', () => {
	let fulfillment;
	const TestEventA = eventFactory.createNew(
		{ EVT_name: 'test event a' }
	);
	const TestEventB = eventFactory.createNew(
		{ EVT_name: 'test event b' }
	);
	const reset = () => fulfillment = receiveEntitiesAndResolve(
		'event',
		[ TestEventA, TestEventB ]
	);
	it( 'yields dispatch action for finishing the resolution on ' +
		'TestEventB', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'finishResolution',
				CORE_REDUCER_KEY,
				'getEntityById',
				[ 'event', TestEventB.id ]
			)
		);
	} );
	it( 'yields dispatch action for finishing the resolution on ' +
		'TestEventA', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'finishResolution',
				CORE_REDUCER_KEY,
				'getEntityById',
				[ 'event', TestEventA.id ]
			)
		);
	} );
	it( 'yields dispatch action for receivingEntityRecords', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				CORE_REDUCER_KEY,
				'receiveEntityRecords',
				'event',
				[ TestEventA, TestEventB ]
			)
		);
	} );
} );
