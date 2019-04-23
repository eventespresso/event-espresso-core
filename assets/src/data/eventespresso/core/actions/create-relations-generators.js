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
import { dispatch, select, resolveSelect } from '../../base-controls';
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
			singularRelationName,
		);
		return;
	}
	const relationIds = getIdsFromBaseEntityArray( relationEntities );
	const pluralRelationName = pluralModelName( relationName );
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
	const modelEntity = yield resolveSelect(
		REDUCER_KEY,
		'getEntityById',
		modelName,
		entityId,
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		REDUCER_KEY,
		'getRelatedEntities',
		[ modelEntity, pluralRelationName ]
	);
	const relationsToResolve = [ ...relationEntities ];
	while ( relationsToResolve.length > 0 ) {
		const relationEntity = relationsToResolve.pop();
		yield dispatch(
			REDUCER_KEY,
			'receiveDirtyRelationAddition',
			relationName,
			relationEntity.id,
			modelName,
			entityId,
		);
		yield dispatch(
			'core/data',
			'finishResolution',
			REDUCER_KEY,
			'getRelatedEntities',
			[ relationEntity, pluralModelName( modelName ) ]
		);
	}
}

/**
 * This action is used to ensure a relation Entity related to the given
 * model entity id is both added to the state and various selectors for these
 * are resolved so no additional resolution happens for these.
 *
 * The purpose for this action is to allow for doing more efficient batch
 * queries of entities from an api request and then triggering the resolution of
 * any more granular selectors that have resolvers.  This basically allows one
 * to hydrate the `eventespresso/core` state with more efficient queries.
 *
 * @param {BaseEntity} relationEntity
 * @param {string} modelName
 * @param {number|string} modelId
 */
function* resolveRelationRecordForRelation(
	relationEntity,
	modelName,
	modelId
) {
	const singularRelationName = singularModelName( relationEntity.modelName );
	const pluralRelationName = pluralModelName( relationEntity.modelName );
	const hasEntity = yield select(
		'core/data',
		'hasFinishedResolution',
		REDUCER_KEY,
		'getEntityById',
		[ singularRelationName, relationEntity.id ]
	);
	relationEntity = hasEntity ?
		yield select(
			REDUCER_KEY,
			'getEntityById',
			singularRelationName,
			relationEntity.id
		) :
		relationEntity;
	if ( ! hasEntity ) {
		yield dispatch(
			REDUCER_KEY,
			'receiveEntityAndResolve',
			relationEntity
		);
	}
	yield dispatch(
		REDUCER_KEY,
		'receiveRelatedEntities',
		modelName,
		modelId,
		pluralRelationName,
		[ relationEntity.id ]
	);
	const modelEntity = yield resolveSelect(
		REDUCER_KEY,
		'getEntityById',
		modelName,
		modelId
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		REDUCER_KEY,
		'getRelatedEntities',
		[ modelEntity, pluralRelationName ]
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		REDUCER_KEY,
		'getRelatedEntities',
		[ relationEntity, pluralModelName( modelName ) ]
	);
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

export { createRelation, createRelations, resolveRelationRecordForRelation };
