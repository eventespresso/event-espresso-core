/**
 * External dependencies
 */
import { EventSchema } from '@test/fixtures';

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
	receiveFactoryForModel,
	receiveRelationSchema,
} from '../actions';
import { EventEntities } from '../../test/fixtures/base';
import { resolveSelect } from '../../base-controls';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../../core/constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../constants';

describe( 'TEST SCHEMA RESOLVERS', () => {

	describe( 'getSchemaForModel()', () => {

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
			const { done } = generator.next();
			expect( done ).toBe( true );
			// can't test schema being returned
			// without mocking entire store and state
		} );
	} );

	describe( 'getFactoryForModel()', () => {

		describe( 'when no schema is provided', () => {

			const generator = getFactoryForModel( 'event' );
			it( 'yields expected generator for schema selector', () => {
				const { value, done } = generator.next();
				expect( done ).toBe( false );
				expect( value ).toEqual( {
					type: 'RESOLVE_SELECT',
					reducerKey: SCHEMA_REDUCER_KEY,
					selectorName: 'getSchemaForModel',
					args: [ 'event' ],
				} );
			} );

			it( 'returns null when there is no schema for the given model', () => {
				const { value, done } = generator.next( {} );
				expect( value ).toBe( null );
				expect( done ).toBe( true );
			} );
		} );

		describe( 'when schema is provided', () => {

			const generator = getFactoryForModel( 'event', EventSchema );

			it( 'yields receiveFactoryForModel dispatch action', () => {
				const { value, done } = generator.next();
				expect( done ).toBe( false );
				// console.log( value.args );
				expect( value ).toEqual( {
					type: 'DISPATCH',
					reducerKey: SCHEMA_REDUCER_KEY,
					dispatchName: 'receiveFactoryForModel',
					args: expect.arrayContaining( [
						expect.objectContaining( {
							classDef: expect.any( Function ),
							createNew: expect.any( Function ),
							fromExisting: expect.any( Function ),
							modelName: 'event',
						} ),
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

			it( 'returns factory', () => {
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

	describe( 'getRelationEndpointForEntityId()', () => {

		let generator;
		const reset = () => generator = getRelationEndpointForEntityId(
			'event',
			10,
			'datetimes'
		);

		describe( 'when entity does not exist in state', () => {

			it( 'yields resolve select control action', () => {
				reset();
				const { value, done } = generator.next();
				expect( done ).toBe( false );
				expect( value ).toEqual( {
					type: 'RESOLVE_SELECT',
					reducerKey: CORE_REDUCER_KEY,
					selectorName: 'getEntityById',
					args: [ 'event', 10 ],
				} );
			} );

			it( 'yields FETCH action for retrieving the entity', () => {
				const { value, done } = generator.next();
				expect( done ).toBe( false );
				expect( value ).toEqual( {
					type: 'FETCH_FROM_API',
					request: { path: '/ee/v4.8.36/events/10' },
				} );
			} );

			it(
				'returns empty string when there is no response for endpoint',
				() => {
					const { value, done } = generator.next( {} );
					expect( value ).toEqual( '' );
					expect( done ).toBe( true );
				}
			);
		} );

		describe( 'when there is no endpoint for the given relation', () => {

			it( 'returns empty string', () => {
				reset();
				generator.next(); // RESOLVE_SELECT
				generator.next( {} ); // return {} for entity
				// return endpoint with no corresponding entity resource
				const { value, done } = generator.next( {
					_links: {
						'https://api.eventespresso.com/tickets':
							'https://some_endpoint',
					},
				} );
				expect( value ).toEqual( '' );
				expect( done ).toBe( true );
			} );
		} );

		describe( 'when endpoint exists for the given relation', () => {

			it(
				'yields RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY action',
				() => {
					reset();
					generator.next(); // RESOLVE_SELECT
					generator.next( {} ); // return {} for entity
					// return valid endpoint for entity resource
					const { value, done } = generator.next( {
						_links: {
							'https://api.eventespresso.com/datetimes':
								'https://valid_endpoint',
						},
					} );
					expect( done ).toBe( false );
					expect( value ).toEqual( {
						type: 'RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY',
						modelName: 'event',
						entityId: 10,
						relationName: 'datetime',
						endpoint: 'https://valid_endpoint',
					} );
					const finalStep = generator.next();
					expect( finalStep.done ).toBe( true );
				}
			);
		} );

		describe( 'when entity exists in state', () => {

			it(
				'yields RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY action',
				() => {
					reset();
					generator.next(); // RESOLVE_SELECT
					// return valid entity with valid resource endpoint
					const { value, done } = generator.next( EventEntities.a );
					expect( done ).toBe( false );
					expect( value ).toEqual( {
						type: 'RECEIVE_RELATION_ENDPOINT_FOR_MODEL_ENTITY',
						modelName: 'event',
						entityId: 10,
						relationName: 'datetime',
						endpoint: 'ee/v4.8.36/events/10/datetimes',
					} );
					const finalStep = generator.next();
					expect( finalStep.done ).toBe( true );
				}
			);
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
		const reset = () => generator = getRelationType(
			'event',
			'datetimes'
		);

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
		const reset = () => generator = getRelationSchema(
			'event',
			'datetimes'
		);

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
	} );
} );
