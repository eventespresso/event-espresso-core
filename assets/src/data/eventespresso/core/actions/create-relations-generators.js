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

/**
 * Internal imports
 */
import {
	receiveRelatedEntities,
	receiveDirtyRelationAddition,
	receiveDirtyRelationIndex,
} from './receive-relations';
import { receiveEntityRecords } from './receive-entities';
import { resolveGetEntityByIdForIds } from '../../base-resolvers';

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
	yield receiveEntityRecords(
		singularRelationName,
		new Map( [ [ relationEntity.id, relationEntity ] ] )
	);
	yield receiveRelatedEntities(
		modelName,
		entityId,
		relationName,
		[ relationEntity.id ]
	);
	yield receiveDirtyRelationIndex(
		relationName,
		relationEntity.id,
		modelName,
		entityId
	);
	yield receiveDirtyRelationAddition(
		relationName,
		relationEntity.id,
		modelName,
		entityId,
	);
	yield resolveGetEntityByIdForIds(
		singularRelationName,
		[ relationEntity.id ]
	);
}

/**
 * Action generator yielding actions that add the relation to the state for
 * multiple relation entities.
 *
 * @param {string} modelName
 * @param {number} entityId
 * @param {string} relationName
 * @param {Map} relationEntities
 */
function* createRelations(
	modelName,
	entityId,
	relationName,
	relationEntities,
) {
	relationName = pluralModelName( relationName );
	const singularRelationName = singularModelName( relationName );
	if ( ! ( relationEntities instanceof Map ) ) {
		warning(
			false,
			'Incoming relationEntities argument (%s) is expected to be an ' +
			'instance of Map.',
			relationEntities,
		);
		return;
	}

	try {
		assertMapHasEntitiesForModel( relationEntities, singularRelationName );
	} catch ( exception ) {
		warning(
			false,
			'Incoming relation Entities do not contain BaseEntity instances ' +
			'for the given relation model (%s)',
			singularRelationName
		);
		return;
	}
	const relationIds = Array.from( relationEntities.keys() );
	yield receiveEntityRecords( singularRelationName, relationEntities );
	yield receiveRelatedEntities(
		modelName,
		entityId,
		relationName,
		relationIds,
	);
	while ( relationIds.length > 0 ) {
		const relationId = relationIds.shift();
		yield receiveDirtyRelationIndex(
			relationName,
			relationId,
			modelName,
			entityId
		);
		yield receiveDirtyRelationAddition(
			relationName,
			relationId,
			modelName,
			entityId,
		);
	}
}

/**
 * Asserts that the provided map has BaseEntity instances for the expected
 * model name.
 *
 * @param {Map} relationMap
 * @param {string} relationModelName Expected to be the singular form for the
 * modelName.
 * @throws InvalidModelEntity
 */
const assertMapHasEntitiesForModel = ( relationMap, relationModelName ) => {
	for ( const entity of relationMap.values() ) {
		if ( ! isModelEntityOfModel( entity, relationModelName ) ) {
			throw new InvalidModelEntity( '', entity );
		}
	}
};

export { createRelation, createRelations };
