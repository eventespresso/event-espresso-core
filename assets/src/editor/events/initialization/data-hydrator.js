/**
 * External imports
 */
const { receiveSchemaForModel } = wp.data.dispatch( 'eventespresso/schema' );
const {
	hydrateEntity,
	receiveEntityAndResolve,
} = wp.data.dispatch( 'eventespresso/core' );

/**
 * adds all event editor data to the store
 *
 * @param {Object} eventData
 */
const hydrateData = function*( eventData ) {
	const { eventId, models, relations, ...data } = eventData;
	if ( models ) {
		const schemas = Object.entries( models );
		for ( const [ model, schema ] of schemas ) {
			receiveSchemaForModel( model, schema );
		}
	}
	if ( data ) {
		const modelEntities = Object.entries( data );
		for ( const [ model, entityData ] of modelEntities ) {
			const modelSchema = models[ model ] && models[ model ].properties
				? models[ model ].properties
				: null;
			yield hydrateEntities( model, modelSchema, entityData ).then(
				( hydratedEntities ) => {
					return { [ model ]: hydratedEntities };
				}
			);
		}
	}
};

/**
 * adds entity data to the store
 *
 * @param {string} model
 * @param {Object} modelSchema
 * @param {Object[]|Object[][]} entityData
 * @return {Object[]} entities
 */
const hydrateEntities = async ( model, modelSchema, entityData ) => {
	if ( Array.isArray( entityData ) ) {
		return hydrateAndReceiveEntities(
			model,
			modelSchema,
			entityData
		);
	} else if ( typeof entityData === 'object' ) {
		let entities = [];
		for ( const [ ID, relatedEntityData ] of Object.entries( entityData ) ) {
			const relatedEntities = await hydrateAndReceiveEntities(
				model,
				modelSchema,
				relatedEntityData
			);
			entities = [ ...entities, ...relatedEntities ];
		}
		return entities;
	}
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
	const resolvedEntities = [];
	if ( Array.isArray( entities ) ) {
		for ( const entityData of entities ) {
			const entity = await hydrateEntity(
				model,
				entityData
			);
			receiveEntityAndResolve( entity );
			resolvedEntities.push( entity );
		}
	}
	return resolvedEntities;
};

export default hydrateData;
