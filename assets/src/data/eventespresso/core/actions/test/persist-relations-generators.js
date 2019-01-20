/**
 * External imports
 */
import { isGenerator } from '@eventespresso/validators';
import cuid from 'cuid';

/**
 * Internal imports
 */
import {
	persistAddRelationsForModel,
	persistDeleteRelationsForModel,
	persistRelationsForModel,
	persistRelationsForEntityId,
	persistRelationsForEntityIdAndRelation,
	persistRelationsForEntityIdAndRelationId,
	persistNewEntityAndRemoveDirtyRelations,
	removeDirtyRelations,
	getRelationState,
} from '../persist-relations-generators';
import { fetch, select, dispatch } from '../../../base-controls';
import {
	removeDirtyRelationForType,
	removeDirtyRelationIndex,
} from '../remove-relations';
import { EventEntities } from '../../../test/fixtures/base';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../../constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../../schema/constants';

describe( 'persistAddRelationsForModel()', () => {
	const fulfillment = persistAddRelationsForModel( 'event' );
	it( 'yields generator for persisting relations for the given model', () => {
		const { value } = fulfillment.next();
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns an object from the generator response', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toEqual( {} );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistDeleteRelationsforModel()', () => {
	const fulfillment = persistDeleteRelationsForModel( 'event' );
	it( 'yields generator for persisting relations for the given model', () => {
		const { value } = fulfillment.next();
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns an object from the generator response', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toEqual( {} );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistRelationsForModel()', () => {
	let fulfillment;
	const reset = () => fulfillment = persistRelationsForModel( 'event' );
	it( 'yields generator for getting relation state', () => {
		reset();
		const { value } = fulfillment.next();
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns an empty object if there is no relation state for the ' +
		'model', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toEqual( {} );
		expect( done ).toBe( true );
	} );
	it( 'yields generator for persisting relations for each entity id in ' +
		'state for the given model.', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next( { 10: {} } );
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns expected object on successful completion', () => {
		const { value, done } = fulfillment.next( { datetimes: [ 10 ] } );
		expect( value ).toEqual(
			{
				10: {
					datetimes: [ 10 ],
				},
			}
		);
		expect( done ).toBe( true );
	} );
} );

describe( 'persistRelationsForEntityId()', () => {
	let fulfillment;
	const reset = () => fulfillment = persistRelationsForEntityId(
		'event',
		10
	);
	it( 'yields generator for getting relation state', () => {
		reset();
		const { value } = fulfillment.next();
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns empty object when relation state doesn\'t exist for ' +
		'entity id', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toEqual( {} );
		expect( done ).toBe( true );
	} );
	it( 'returns empty object when there are no relation names ' +
		'retrieved', () => {
		reset();
		fulfillment.next();
		const { value, done } = fulfillment.next( { 10: {} } );
		expect( value ).toEqual( {} );
		expect( done ).toBe( true );
	} );
	it( 'yields generators for each relation for persisting.', () => {
		reset();
		fulfillment.next();
		const { value: persistRelationsAction } = fulfillment.next(
			{ 10: { datetime: [], message_template: [] } }
		);
		expect( isGenerator( persistRelationsAction ) ).toBe( true );
		const { value: persistRelationsAction2 } = fulfillment.next(
			[ 10, 20 ]
		);
		expect( isGenerator( persistRelationsAction2 ) ).toBe( true );
	} );
	it( 'returns an object of relations and ids that were persisted', () => {
		const { value, done } = fulfillment.next( [ 30, 40 ] );
		expect( value ).toEqual( {
			datetime: [ 10, 20 ],
			message_template: [ 30, 40 ],
		} );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistRelationsForEntityIdAndRelation', () => {
	let fulfillment;
	const reset = () => fulfillment = persistRelationsForEntityIdAndRelation(
		'event',
		10,
		'datetime'
	);
	it( 'yields generator for getting relation state', () => {
		reset();
		const { value } = fulfillment.next();
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns an empty array if there are no entity ids for the given ' +
		'relations', () => {
		const { value, done } = fulfillment.next( [] );
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields generators for each relation id', () => {
		reset();
		fulfillment.next();
		const { value: relationAction } = fulfillment.next( {
			10: {
				datetime: [ 10, 20 ],
			},
		} );
		expect( isGenerator( relationAction ) ).toBe( true );
		const { value: relationAction2 } = fulfillment.next( 10 );
		expect( isGenerator( relationAction2 ) ).toBe( true );
	} );
	it( 'yields expected array of ids for successful persistence', () => {
		const { value, done } = fulfillment.next( 20 );
		expect( value ).toEqual( [ 10, 20 ] );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistRelationsForEntityIdAndRelationId()', () => {
	let fulfillment;
	const reset = ( entityId, relationId, addRelation = true ) => fulfillment =
		persistRelationsForEntityIdAndRelationId(
			'event',
			entityId,
			'datetime',
			relationId,
			addRelation
		);
	const testCuid = cuid();
	const testRelationState = {
		event: {
			10: {
				datetime: [ 20 ],
			},
		},
	};
	it( 'yields generator for getting relation state', () => {
		reset( 10, 20 );
		const { value } = fulfillment.next();
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns 0 when there is no relation state for the given data', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toBe( 0 );
		expect( done ).toBe( true );
	} );
	it( 'yields the generator for persisting new entity and removing dirty ' +
		'relations when the entityId is a cuid', () => {
		reset( testCuid, 20 );
		fulfillment.next();
		const { value } = fulfillment.next( testRelationState );
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns 0 when the new entity id could not be persisted', () => {
		const { value, done } = fulfillment.next( 0 );
		expect( value ).toBe( 0 );
		expect( done ).toBe( true );
	} );
	it( 'yields a generator for persisting new entity and removing dirty ' +
		'relations when the relationId is a cuid', () => {
		reset( 10, testCuid );
		fulfillment.next();
		const { value } = fulfillment.next( testRelationState );
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns 0 when the new relation id could not be persisted', () => {
		const { value, done } = fulfillment.next( 0 );
		expect( value ).toBe( 0 );
		expect( done ).toBe( true );
	} );
	it( 'yeilds expected select action for getting the relation endpoint ' +
		'when adding a relation', () => {
		reset( 10, 20 );
		fulfillment.next();
		const { value } = fulfillment.next( testRelationState );
		expect( value ).toEqual(
			select(
				SCHEMA_REDUCER_KEY,
				'getRelationEndpointForEntityId',
				'event',
				10,
				'datetime'
			)
		);
	} );
	it( 'yields expected fetch action for the relation endpoint when adding ' +
		'relation and schema store does not have it.', () => {
		reset( 10, 20 );
		fulfillment.next();
		fulfillment.next( testRelationState );
		const { value } = fulfillment.next( '' );
		expect( value ).toEqual(
			fetch( {
				path: '',
				method: 'PUT',
			} )
		);
	} );
	it( 'yields expected fetch action for the relation endpoint when removing ' +
		'a relation', () => {
		reset( 10, 20, false );
		fulfillment.next();
		fulfillment.next( testRelationState );
		const { value } = fulfillment.next( '' );
		expect( value ).toEqual(
			fetch( {
				path: '',
				method: 'DELETE',
			} )
		);
	} );
	it( 'yields removing dirty relations generator when there is ' +
		'success', () => {
		const { value } = fulfillment.next( true );
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns relationId on successful request', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toBe( 20 );
		expect( done ).toBe( true );
	} );
	it( 'returns 0 when the request fails', () => {
		reset( 10, 20 );
		fulfillment.next();
		fulfillment.next( testRelationState );
		fulfillment.next( '' );
		const { value, done } = fulfillment.next( false );
		expect( value ).toBe( 0 );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistNewEntityAndRemoveDirtyRelations()', () => {
	let fulfillment;
	const reset = ( doRelationRemoval = true ) => fulfillment =
		persistNewEntityAndRemoveDirtyRelations(
			'datetimes',
			20,
			'event',
			10,
			true,
			[ 'event', 10 ],
			doRelationRemoval
		);
	it( 'yields dispatch action for persisting the entity', () => {
		reset( false );
		const { value } = fulfillment.next();
		expect( value ).toEqual( dispatch(
			CORE_REDUCER_KEY,
			'persistForEntityId',
			[ 'event', 10 ]
		) );
	} );
	it( 'returns 0 if a model entity is not returned', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toBe( 0 );
		expect( done ).toBe( true );
	} );
	it( 'yields a generator for removing dirty relations when ' +
		'doRelationRemoval is true', () => {
		reset( true );
		fulfillment.next();
		const { value } = fulfillment.next( EventEntities.b );
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns the persisted entity id on complete', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toBe( EventEntities.b.id );
		expect( done ).toBe( true );
	} );
} );

describe( 'removeDirtyRelations()', () => {
	const fulfillment = removeDirtyRelations(
		'datetime',
		20,
		'event',
		10,
		true
	);
	it( 'yields action for removing dirty relation for type', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual( removeDirtyRelationForType(
			'datetime',
			20,
			'event',
			10,
			true
		) );
	} );
	it( 'yields action for removing dirty relation index', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual( removeDirtyRelationIndex(
			'datetime',
			20,
			'event',
			10,
			true
		) );
	} );
} );

describe( 'getRelationState()', () => {
	let fulfillment;
	const reset = ( addRelation, relationState ) => fulfillment =
		getRelationState( 'event', addRelation, relationState );
	it( 'yields select action for getting relation state when addRelation ' +
		'is true', () => {
		reset( true, {} );
		const { value } = fulfillment.next();
		expect( value ).toEqual( select(
			CORE_REDUCER_KEY,
			'getRelationAdditionsQueuedForModel',
			'event'
		) );
	} );
	it( 'yields select action for getting relation state when addRelation ' +
		'is false', () => {
		reset( false, {} );
		const { value } = fulfillment.next();
		expect( value ).toEqual( select(
			CORE_REDUCER_KEY,
			'getRelationDeletionsQueuedForModel',
			'event',
		) );
	} );
	it( 'returns relation state if one is already provided', () => {
		reset( true, { someState: 1 } );
		const { value, done } = fulfillment.next();
		expect( value ).toEqual( { someState: 1 } );
		expect( done ).toBe( true );
	} );
} );
