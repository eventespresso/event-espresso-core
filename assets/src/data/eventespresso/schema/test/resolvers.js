/**
 * External dependencies
 */
// import { fromJS } from 'immutable';
import { EventSchema } from '@test/fixtures';
// import { createRegistry } from '@wordpress/data';
import { getEndpoint, DEFAULT_SCHEMA_STATE } from '@eventespresso/model';

/**
 * Internal imports
 */
import {
	getSchemaForModel,
	getFactoryForModel,
	getRelationEndpointForEntityId,
	hasJoinTableRelation,
	getRelationType,
	getRelationSchema,
	getRelationResponseType,
	getRelationPrimaryKeyString,
} from '../resolvers';
import {
	receiveSchemaForModel,
	receiveSchemaForModelAndResolve,
	receiveFactoryForModel,
	receiveRelationEndpointForModelEntity,
	receiveRelationSchema,
} from '../actions';
import {
	getSchemaForModel as getEventSchema
} from '../selectors';
import { eventFactory, EventEntities } from '../../test/fixtures/base';
import { fetch, resolveSelect } from '../../base-controls';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../../core/constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../constants';

// const poorManSerializer = ( item ) => {
// 	return JSON.parse( JSON.stringify( item ) );
// };

// const defaultSchemaState = fromJS( DEFAULT_SCHEMA_STATE );

describe( 'TEST SCHEMA RESOLVERS', () => {

	// let registry;
	// let mockStore;

	describe( 'getSchemaForModel()', () => {

		// registry = createRegistry();
		// mockStore = registry.registerStore( SCHEMA_REDUCER_KEY, {
		// 	initialState: defaultSchemaState,
		// 	actions: { receiveSchemaForModel },
		// 	resolvers: { getSchemaForModel },
		// 	selectors: { getSchemaForModel: getEventSchema },
		// 	controls: {
		// 		FETCH_FROM_API( { request } ) {
		// 			if ( request.method === 'OPTIONS' &&
		// 				request.path === '/ee/v4.8.36/events'
		// 			) {
		// 				return EventSchema;
		// 			}
		// 			return request;
		// 		},
		// 	},
		// 	reducer: () => ( state, action ) => {
		// 		if ( action.type === 'RECEIVE_SCHEMA_RECORD' ) {
		// 			return state.schema.set( 'event', EventSchema );
		// 		}
		// 		return state;
		// 	},
		// } );

		const generator = getSchemaForModel( 'event' );
		it( 'yields api fetch action', () => {
			const { value, done } = generator.next();
			expect( done ).toBe( false );
			expect( value ).toEqual( {
				type: 'FETCH_FROM_API',
				request: { path: '/ee/v4.8.36/events', method: 'OPTIONS' },
			} );
		} );
		it( 'yields receiveSchemaForModel dispatch action', () => {
			const { value, done } = generator.next();
			expect( done ).toBe( false );
			expect( value ).toEqual( {
				type: 'DISPATCH',
				reducerKey: SCHEMA_REDUCER_KEY,
				dispatchName: 'receiveSchemaForModel',
				args: [ 'event', {} ],
			} );
		} );
		it( 'yields finishResolution dispatch action', () => {
			const { value, done } = generator.next();
			expect( done ).toBe( false );
			expect( value ).toEqual( {
				type: 'DISPATCH',
				reducerKey: 'core/data',
				dispatchName: 'finishResolution',
				args: [
					SCHEMA_REDUCER_KEY,
					'getSchemaForModel',
					[ 'event' ]
				],
			} );
		} );
		it( 'returns schema', () => {
			const { value, done } = generator.next();
			expect( done ).toBe( true );
			// registry.select( SCHEMA_REDUCER_KEY ).getSchemaForModel( 'event' )
			// expect( value ).toEqual( EventSchema );
		} );
	} );

	describe( 'getFactoryForModel()', () => {
		let generator;
		describe( 'when no schema is provided', () => {
			it( 'yields expected generator for schema selector', () => {
				generator = getFactoryForModel( 'event' );
				const { value, done } = generator.next();
				expect( done ).toBe( false );
				expect( value ).toEqual( {
					type: 'RESOLVE_SELECT',
					reducerKey: SCHEMA_REDUCER_KEY,
					selectorName: 'getSchemaForModel',
					args: [ 'event' ],
				} );
			} );
			it( 'returns null because factory can not be resolved', () => {
				const { value, done } = generator.next( {} );
				expect( value ).toBe( null );
				expect( done ).toBe( true );
			} );
		} );
		describe( 'when model schema is provided', () => {
			it( 'yields receiveFactoryForModel dispatch action', () => {
				generator = getFactoryForModel( 'event', EventSchema );
				const { value, done } = generator.next();
				expect( done ).toBe( false );
				expect( value ).toEqual( {
					type: 'DISPATCH',
					reducerKey: SCHEMA_REDUCER_KEY,
					dispatchName: 'receiveFactoryForModel',
					args: expect.arrayContaining( [
						'event',
						expect.objectContaining( {
							classDef: expect.any( Function ),
							createNew: expect.any( Function ),
							fromExisting: expect.any( Function ),
							modelName: 'event',
						} )
					] ),
				} );
			} );

			it( 'yields finishResolution dispatch action', () => {
				const { value, done } = generator.next();
				expect( done ).toBe( false );
				expect( value ).toEqual( {
					type: 'DISPATCH',
					reducerKey: 'core/data',
					dispatchName: 'finishResolution',
					args: [
						SCHEMA_REDUCER_KEY,
						'getFactoryForModel',
						[ 'event' ]
					],
				} );
			} );
			it( 'returns entity factory', () => {
				const { value, done } = generator.next();
				expect( done ).toBe( true );
				expect( value ).toEqual(
					expect.objectContaining( {
						classDef: expect.any( Function ),
						createNew: expect.any( Function ),
						fromExisting: expect.any( Function ),
						modelName: 'event',
					} )
				);
			} );
		} );
	} );

	/*describe( 'getRelationEndpointForEntityId()', () => {
		let generator;
		const reset = () => generator = getRelationEndpointForEntityId(
			'event',
			10,
			'datetimes'
		);
		it( 'yields resolve select control action for getting entity by id', () => {
			reset();
			const { value } = generator.next();
			expect( value ).toEqual( resolveSelect(
				CORE_REDUCER_KEY,
				'getEntityById',
				'event',
				10
			) );
		} );
		it( 'when entity endpoint is available for retrieved entity yields receive' +
			' relation endpoint active', () => {
			const { value } = generator.next( EventEntities.a );
			expect( value ).toEqual(
				receiveRelationEndpointForModelEntity(
					'event',
					10,
					'datetime',
					'ee/v4.8.36/events/10/datetimes'
				)
			);
		} );
		it( 'yields fetch action for retrieving the entity', () => {
			reset();
			generator.next();
			const { value } = generator.next( {} );
			expect( value ).toEqual( fetch(
				{
					path: getEndpoint( 'event' ) + '/' + 10,
				}
			) );
		} );
		it( 'returns empty string when there is no response for that ' +
			'endpoint', () => {
			const { value, done } = generator.next( {} );
			expect( value ).toEqual( '' );
			expect( done ).toBe( true );
		} );
		it( 'returns empty string when there is no endpoint for the given ' +
			'relation', () => {
			reset();
			generator.next();
			generator.next( {} );
			const { value, done } = generator.next( {
				_links: {
					'https://api.eventespresso.com/tickets': 'https://some_endpoint',
				},
			} );
			expect( value ).toEqual( '' );
			expect( done ).toBe( true );
		} );
		it( 'yields receive relation endpoint action object for relation existing ' +
			'in the response', () => {
			reset();
			generator.next();
			generator.next( {} );
			const { value } = generator.next( {
				_links: {
					'https://api.eventespresso.com/datetimes':
						'https://some_endpoint',
				},
			} );
			expect( value ).toEqual(
				receiveRelationEndpointForModelEntity(
					'event',
					10,
					'datetime',
					'https://some_endpoint'
				)
			);
		} );
		it( 'returns endpoint for valid data', () => {
			const { value, done } = generator.next();
			expect( value ).toEqual( 'https://some_endpoint' );
			expect( done ).toBe( true );
		} );
	} );

	describe( 'hasJoinTableRelation()', () => {
		let generator;
		const reset = () => generator = hasJoinTableRelation(
			'event',
			'datetimes'
		);
		it( 'yields resolveSelect control for getting the relation type', () => {
			reset();
			const { value } = generator.next();
			expect( value ).toEqual(
				resolveSelect(
					SCHEMA_REDUCER_KEY,
					'getRelationType',
					'event',
					'datetime'
				)
			);
		} );
		it( 'returns expected value when relation type is not a join table', () => {
			const { value, done } = generator.next( 'BELONGS_TO' );
			expect( value ).toBe( false );
			expect( done ).toBe( true );
		} );
	} );

	describe( 'getRelationType()', () => {
		let generator;
		const reset = () => generator = getRelationType( 'event', 'datetimes' );
		it( 'yields resolveSelect control action for getting the relation ' +
			'schema', () => {
			reset();
			const { value } = generator.next();
			expect( value ).toEqual(
				resolveSelect(
					SCHEMA_REDUCER_KEY,
					'getRelationSchema',
					'event',
					'datetime',
				)
			);
		} );
		it( 'returns empty string if schema returns null', () => {
			const { value, done } = generator.next( null );
			expect( value ).toBe( '' );
			expect( done ).toBe( true );
		} );
		it( 'returns relation type from schema if schema is not null', () => {
			reset();
			generator.next();
			const { value, done } = generator.next( { relation_type: 'foo' } );
			expect( value ).toBe( 'foo' );
			expect( done ).toBe( true );
		} );
	} );
	describe( 'getRelationResponseType', () => {
		let generator;
		const reset = () => generator = getRelationResponseType(
			'event',
			'datetimes'
		);
		it( 'yields resolve select control for getRelationSchema', () => {
			reset();
			const { value } = generator.next();
			expect( value ).toEqual(
				resolveSelect(
					SCHEMA_REDUCER_KEY,
					'getRelationSchema',
					'event',
					'datetime',
				)
			);
		} );
		it( 'returns empty string if relationSchema not available', () => {
			const { value, done } = generator.next( null );
			expect( value ).toBe( '' );
			expect( done ).toBe( true );
		} );
		it( 'returns expected value if relationSchema available', () => {
			reset();
			generator.next();
			const { value, done } = generator.next( { type: 'array' } );
			expect( value ).toBe( 'array' );
			expect( done ).toBe( true );
		} );
	} );
	describe( 'getRelationSchema()', () => {
		let generator;
		const reset = () => generator = getRelationSchema( 'event', 'datetimes' );
		it( 'yields resolveSelect control for getting the Schema for the ' +
			'model', () => {
			reset();
			const { value } = generator.next();
			expect( value ).toEqual(
				resolveSelect(
					SCHEMA_REDUCER_KEY,
					'getSchemaForModel',
					'event'
				)
			);
		} );
		it( 'throws an error if a schema is not returned', () => {
			const test = () => generator.next( null );
			expect( test ).toThrow();
		} );
		it( 'throws an error if there is no schema for the relation in the returned' +
			'model schema', () => {
			reset();
			generator.next();
			const test = () => generator.next( {} );
			expect( test ).toThrow();
		} );
		it( 'yields the receiveRelationSchema action when a schema is ' +
			'returned', () => {
			reset();
			generator.next();
			const { value } = generator.next( {
				schema: {
					properties: {
						datetimes: 'foo',
					},
				},
			} );
			expect( value ).toEqual(
				receiveRelationSchema(
					'event',
					'datetime',
					'foo'
				)
			);
		} );
	} );
	describe( 'getRelationPrimaryKeyString()', () => {
		let generator;
		const reset = () => generator = getRelationPrimaryKeyString(
			'event',
			'datetime'
		);
		it( 'yields resolve select action for the getRelationType selector', () => {
			reset();
			const { value } = generator.next();
			expect( value ).toEqual(
				resolveSelect(
					SCHEMA_REDUCER_KEY,
					'getRelationType',
					'event',
					'datetime'
				)
			);
		} );
		it( 'returns empty string if relation type cannot be retrieved', () => {
			const { value, done } = generator.next( '' );
			expect( value ).toBe( '' );
			expect( done ).toBe( true );
		} );
		it( 'returns expected value when relationType is ' +
			'EE_Belongs_To_Relation', () => {
			reset();
			generator.next();
			const { value, done } = generator.next( 'EE_Belongs_To_Relation' );
			expect( value ).toBe( 'DTT_ID' );
			expect( done ).toBe( true );
		} );
		it( 'returns expected value when relationType is not ' +
			'EE_Belongs_To_Relation', () => {
			reset();
			generator.next();
			const { value, done } = generator.next( 'foo' );
			expect( value ).toBe( 'Datetime.DTT_ID' );
			expect( done ).toBe( true );
		} );
	} );*/
} );
