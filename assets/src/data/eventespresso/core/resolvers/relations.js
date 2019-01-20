/**
 * External imports
 */
import {
	createAndKeyEntitiesByPrimaryKeyValue,
	keyEntitiesByPrimaryKeyValue,
	pluralModelName,
	singularModelName,
	stripBaseRouteFromUrl,
} from '@eventespresso/model';
import {
	isModelEntityFactoryOfModel,
	isModelEntity,
} from '@eventespresso/validators';
import { convertToMapFromObject } from '@eventespresso/helpers';
import { InvalidModelEntity } from '@eventespresso/eejs';
import warning from 'warning';
import { isEmpty } from 'lodash';

/**
 * Internal Imports
 */
import { fetch, dispatch, select } from '../../base-controls';
import {
	getFactoryByModel,
	resolveGetEntityByIdForIds,
	resolveGetRelatedEntities,
} from '../../base-resolvers';
import {
	receiveEntityRecords,
	receiveRelatedEntities,
} from './../actions';
import { keepExistingEntitiesInObject } from '../../base-model';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../schema/constants';

/**
 * A resolver for getting relation entities for the given model name and entity
 * for that model.
 *
 * @param {BaseEntity} entity
 * @param {string} relationModelName
 * @return {[]|Array<BaseEntity>} If there are relations, returns an array of
 * BaseEntity instances for the relations, otherwise an empty array.
 */
export function* getRelatedEntities( entity, relationModelName ) {
	if ( ! isModelEntity( entity ) ) {
		throw new InvalidModelEntity( '', entity );
	}
	const modelName = entity.modelName.toLowerCase();
	const pluralRelationName = pluralModelName( relationModelName );
	const singularRelationName = singularModelName( relationModelName );
	const relationResourceProperty = pluralRelationName + 'Resource';
	const relationEndpoint = entity[ relationResourceProperty ] ?
		stripBaseRouteFromUrl(
			entity[ relationResourceProperty ].resourceLink
		) :
		'';
	if ( relationEndpoint === '' ) {
		warning(
			false,
			'There is no relation resource for the given model (%s) and requested relation (%s)',
			modelName,
			pluralRelationName
		);
		return [];
	}
	yield dispatch(
		SCHEMA_REDUCER_KEY,
		'receiveRelationEndpointForModelEntity',
		modelName,
		entity.id,
		pluralRelationName,
		relationEndpoint
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		SCHEMA_REDUCER_KEY,
		'receiveRelationEndpointForModelEntity',
		[ modelName, entity.id, pluralRelationName, relationEndpoint ]
	);
	const relationEntities = yield fetch( {
		path: relationEndpoint,
	} );
	if ( ! relationEntities.length ) {
		return [];
	}

	const factory = yield getFactoryByModel( singularRelationName );
	if ( ! isModelEntityFactoryOfModel(
		factory,
		singularRelationName
	) ) {
		return [];
	}

	let fullEntities = keyEntitiesByPrimaryKeyValue(
		singularRelationName,
		relationEntities
	);
	fullEntities = createAndKeyEntitiesByPrimaryKeyValue(
		factory,
		fullEntities,
	);
	const entityIds = Array.from( fullEntities.keys() );

	// are there already entities for the ids in the store? If so...we use
	// those.
	const existingEntities = yield select(
		CORE_REDUCER_KEY,
		'getEntitiesByIds',
		singularRelationName,
		entityIds
	);

	if ( ! isEmpty( existingEntities ) ) {
		fullEntities = keepExistingEntitiesInObject(
			existingEntities.map(
				( entitiesObject, entityObj ) =>
					entitiesObject[ entityObj.id ] = entity,
				{}
			),
			fullEntities,
		);
	}

	// if fullEntities is not a map, then we need to make it a map
	const entityArray = fullEntities instanceof Map ?
		Array.from( fullEntities.values() ) :
		fullEntities;

	yield receiveEntityRecords(
		singularRelationName,
		entityArray
	);
	yield receiveRelatedEntities(
		modelName,
		entity.id,
		pluralRelationName,
		entityIds,
	);
	yield resolveGetRelatedEntities(
		entity,
		fullEntities,
		entityIds,
	);
	yield resolveGetEntityByIdForIds(
		singularRelationName,
		entityIds
	);
	return entityArray;
}
