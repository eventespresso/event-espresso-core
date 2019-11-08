/**
 * External imports
 */
import warning from 'warning';
import { pluralModelName } from '@eventespresso/model';
import { hydrateRelationSchema } from '@eventespresso/model-schema';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { dispatch } from '@wordpress/data';

const {
	hydrateEntity,
	resolveRelationRecordForRelation,
	resolveGetRelatedEntitiesForIds,
} = dispatch( 'eventespresso/core' );

const {
	receiveEntityResponse,
	resolveGetEntities,
} = dispatch( 'eventespresso/lists' );
const { receiveSchemaForModelAndResolve } = dispatch( 'eventespresso/schema' );

/**
 * adds all event editor data to the store
 *
 * @param {Object} eventData
 */
const hydrateData = async function*( eventData ) {
	/*eslint no-unused-vars: "off"*/
	const { schemas, relations, tktRegCount, ...rawData } = eventData;
	if ( rawData.hasOwnProperty( 'eventId' ) ) {
		delete rawData.eventId;
	}
	await hydrateSchemas( schemas, relations );
	const hydratedEntities = await hydrateEntityData( rawData, schemas );
	await hydrateRelations( rawData, hydratedEntities, relations );
	yield hydratedEntities;
};

/**
 * adds entity data to the store
 *
 * @param {Object} schemas
 * @param {Object} relations
 * @return {Object[]} entities
 */
const hydrateSchemas = async ( schemas, relations ) => {
	const relationSchemas = [];
	if ( schemas ) {
		const modelSchemas = Object.entries( schemas );
		for ( const [ model, schemaData ] of modelSchemas ) {
			if ( ! schemaData.hasOwnProperty( 'schema' ) ) {
				throw new TypeError( 'Invalid Schema ' );
			}
			const schema = await receiveSchemaForModelAndResolve(
				model,
				schemaData
			);
			if ( relations.hasOwnProperty( model ) &&
				schema.hasOwnProperty( 'schema' ) &&
				schema.schema.hasOwnProperty( 'schema' ) &&
				schema.schema.schema.hasOwnProperty( 'properties' )
			) {
				const modelSchema = schema.schema.schema.properties;
				let modelRelations = Object.values( relations[ model ] );
				modelRelations = Array.isArray( modelRelations ) ?
					modelRelations.pop() :
					{};
				modelRelations = isDataObject( modelRelations ) ?
					modelRelations :
					{};
				for ( const modelRelation of Object.keys( modelRelations ) ) {
					const relationSingular = modelRelation.toLowerCase();
					const relationPlural = pluralModelName( relationSingular );
					if ( modelSchema.hasOwnProperty( relationPlural ) ) {
						const generator = hydrateRelationSchema(
							{ schema: modelSchema[ relationPlural ] },
							model,
							relationSingular
						);
						const getRelationSchema = async ( gen ) => {
							for await ( const resolved of gen ) {
								if ( resolved.hasOwnProperty(
									'relationSchema'
								) && resolved.relationSchema
									.hasOwnProperty( 'schema' )
								) {
									relationSchemas.push(
										resolved.relationSchema.schema
									);
								} else {
									warning(
										false,
										'INVALID RELATION SCHEMA'
									);
								}
							}
						};
						await getRelationSchema( generator );
					}
				}
			}
		}
	}
	return relationSchemas;
};

/**
 * adds entity data to the store
 *
 * @param {Object} rawData
 * @param {Object} schemas
 * @return {Object[]} entities
 */
const hydrateEntityData = async ( rawData, schemas ) => {
	let allHydratedEntities = {};
	if ( rawData ) {
		const modelEntities = Object.entries( rawData );
		for ( const [ model, entityData ] of modelEntities ) {
			let modelSchema = schemas[ model ] ? schemas[ model ] : null;
			modelSchema = modelSchema.hasOwnProperty( 'schema' ) ?
				modelSchema.schema :
				null;
			const entities = await hydrateEntities(
				model,
				modelSchema,
				entityData
			).then(
				( hydratedEntities ) => {
					return { [ model ]: hydratedEntities };
				}
			);
			if ( model === 'price_type' ) {
				receiveEntityResponse(
					model,
					undefined,
					Object.values( entities[ model ] ),
				);
				resolveGetEntities( model );
			}
			allHydratedEntities = { ...allHydratedEntities, ...entities };
		}
	}
	return allHydratedEntities;
};

/**
 * adds entity data to the store
 *
 * @param {string} model
 * @param {Object} modelSchema
 * @param {Array|Object} rawData - entities indexed by entityID
 * @return {Object[]} entities
 */
const hydrateEntities = async ( model, modelSchema, rawData ) => {
	const entityData = isDataObject( rawData ) ?
		Object.values( rawData ) :
		rawData;
	if ( isDataObject( entityData ) ) {
		let hydratedEntities = {};
		for ( const moreEntityData of Object.values( entityData ) ) {
			const entities = await hydrateEntities(
				model,
				modelSchema,
				moreEntityData
			);
			hydratedEntities = { ...hydratedEntities, ...entities };
		}
		return hydratedEntities;
	}
	return hydrateAndReceiveEntities(
		model,
		modelSchema,
		entityData
	);
};

/**
 * creates entities from data amd adds them to the store
 *
 * @param {string} model
 * @param {Object} modelSchema
 * @param {Object[]} entities
 * @return {Object[]} entities
 */
const hydrateAndReceiveEntities = async ( model, modelSchema, entities ) => {
	const resolvedEntities = {};
	if ( Array.isArray( entities ) ) {
		for ( const entityData of entities ) {
			const entity = await hydrateEntity(
				model,
				{ schema: modelSchema },
				entityData
			);
			if ( isModelEntityOfModel( entity, model ) ) {
				resolvedEntities[ entity.id ] = entity;
			} else {
				warning(
					false,
					'INVALID ENTITY'
				);
			}
		}
	}
	return resolvedEntities;
};

/**
 * adds entity data to the store
 *
 * @param {Object} rawData
 * @param {Object[]} hydratedEntities
 * @param {Object} related
 * @return {Object[]} entities
 */
const hydrateRelations = async ( rawData, hydratedEntities, related ) => {
	if ( isDataObject( hydratedEntities ) && isDataObject( related ) ) {
		for ( const [ modelName, entities ]
			of Object.entries( hydratedEntities )
		) {
			if ( related.hasOwnProperty( modelName ) ) {
				const relatedEntities = related[ modelName ];
				const relatedIds = {};
				for ( const entity of Object.values( entities ) ) {
					if ( relatedEntities.hasOwnProperty( entity.id ) ) {
						for ( const [ relatedModelName, relatedEntityIds ]
							of Object.entries( relatedEntities[ entity.id ] )
						) {
							relatedIds[ relatedModelName ] =
								relatedIds[ relatedModelName ] || [];
							relatedIds[ relatedModelName ].push( entity.id );
							if ( Array.isArray( relatedEntityIds ) ) {
								for ( const relatedEntityId
									of relatedEntityIds
								) {
									const relatedEntity = retrieveHydratedEntity(
										relatedModelName,
										relatedEntityId,
										hydratedEntities
									);
									if ( isModelEntityOfModel(
										relatedEntity,
										relatedModelName
									)
									) {
										resolveRelationRecordForRelation(
											relatedEntity,
											modelName,
											entity.id
										);
									} else {
										warning(
											false,
											'INVALID ENTITY RELATION'
										);
									}
								}
							}
						}
					}
				}
				resolveGetRelatedEntitiesForIds( modelName, relatedIds );
			}
		}
	}
};

/**
 * @param {string} modelName
 * @param {number|string} entityID
 * @param {Object} hydratedEntities
 * @return {Object} entity
 */
const retrieveHydratedEntity = ( modelName, entityID, hydratedEntities ) => {
	if ( hydratedEntities.hasOwnProperty( modelName ) &&
		hydratedEntities[ modelName ].hasOwnProperty( entityID )
	) {
		return hydratedEntities[ modelName ][ entityID ];
	}
	return null;
};

const isDataObject = ( dataObject ) => typeof dataObject === 'object' &&
	! Array.isArray( dataObject );

export default hydrateData;
