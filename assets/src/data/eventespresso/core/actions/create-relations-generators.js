/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';
import {
	singularModelName,
	pluralModelName,
} from '@eventespresso/model';
import warning from 'warning';
import { InvalidModelEntity } from '@eventespresso/eejs';
import { getIdsFromBaseEntityArray } from '@eventespresso/helpers';

/**
 * Internal imports
 */
import { dispatch } from '../../base-controls';
import { REDUCER_KEY } from '../constants';

/**
 * Action generator yielding actions that add the relation to the state for a
 * single relation entity.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {BaseEntity} relationEntity
 */
function* createRelation(
	modelName,
	entityId,
	relationName,
	relationEntity
) {
	relationName = pluralModelName( relationName );
	const singularRelationName = singularModelName( relationName );
	if ( ! isModelEntityOfModel( relationEntity, singularRelationName ) ) {
		warning(
			false,
			'The provided relation entity (%s) is not a base entity instance' +
			' for the %s relation model',
			relationEntity,
			relationName
		);
		return;
	}
	yield dispatch(
		REDUCER_KEY,
		'receiveEntityAndResolve',
		singularRelationName,
		relationEntity
	);
	yield dispatch(
		REDUCER_KEY,
		'receiveRelatedEntities',
		modelName,
		entityId,
		relationName,
		[ relationEntity.id ]
	);
	yield dispatch(
		REDUCER_KEY,
		'receiveDirtyRelationAddition',
		relationName,
		relationEntity.id,
		modelName,
		entityId,
	);
}

/**
 * Action generator yielding actions that add the relation to the state for
 * multiple relation entities.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {Array<BaseEntity>} relationEntities
 */
function* createRelations(
	modelName,
	entityId,
	relationName,
	relationEntities,
) {
	relationName = pluralModelName( relationName );
	const singularRelationName = singularModelName( relationName );

	try {
		assertArrayHasEntitiesForModel( relationEntities, singularRelationName );
	} catch ( exception ) {
		warning(
			false,
			'Incoming relation Entities do not contain BaseEntity instances ' +
			'for the given relation model (%s)',
			'',
			singularRelationName,
		);
		return;
	}
	let relationIds = getIdsFromBaseEntityArray( relationEntities );
	yield dispatch(
		REDUCER_KEY,
		'receiveEntitiesAndResolve',
		singularRelationName,
		relationEntities
	);
	yield dispatch(
		REDUCER_KEY,
		'receiveRelatedEntities',
		modelName,
		entityId,
		relationName,
		relationIds,
	);
	relationIds = [ ...relationIds ];
	while ( relationIds.length > 0 ) {
		yield dispatch(
			REDUCER_KEY,
			'receiveDirtyRelationAddition',
			relationName,
			relationIds.pop(),
			modelName,
			entityId,
		);
	}
}

/**
 * Asserts that the provided map has BaseEntity instances for the expected
 * model name.
 *
 * @param {Array<BaseEntity>} entities
 * @param {string} relationModelName Expected to be the singular form for the
 * modelName.
 * @throws InvalidModelEntity
 */
const assertArrayHasEntitiesForModel = ( entities, relationModelName ) => {
	for ( const entity of entities ) {
		if ( ! isModelEntityOfModel( entity, relationModelName ) ) {
			throw new InvalidModelEntity( '', entity );
		}
	}
};

export { createRelation, createRelations };
