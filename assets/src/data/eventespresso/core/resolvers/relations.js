/**
 * External imports
 */
import {
	createAndKeyEntitiesByPrimaryKeyValue,
	keyEntitiesByPrimaryKeyValue,
	pluralModelName,
	singularModelName,
} from '@eventespresso/model';
import {
	isModelEntityFactoryOfModel,
	isModelEntity,
} from '@eventespresso/validators';
import {
	convertToObjectFromMap,
	convertToMapFromObject,
} from '@eventespresso/helpers';
import { InvalidModelEntity } from '@eventespresso/eejs';
import warning from 'warning';
import { values, isEmpty } from 'lodash';

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
import { REDUCER_KEY as CORE_REDUCER_KEY } from './../constants';
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
	const modelName = entity.modelName;
	const pluralRelationName = pluralModelName( relationModelName );
	const relationResourceProperty = pluralRelationName + 'Resource';
	const relationEndpoint = entity[ relationResourceProperty ] ?
		entity[ relationResourceProperty ].resourceLink :
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

	const factory = getFactoryByModel(
		singularModelName( relationModelName )
	);
	if ( ! isModelEntityFactoryOfModel(
		factory,
		singularModelName( relationModelName )
	) ) {
		return [];
	}
	let fullEntities = keyEntitiesByPrimaryKeyValue( relationEntities );
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
		entityIds
	);

	if ( ! isEmpty( existingEntities ) ) {
		fullEntities = keepExistingEntitiesInObject(
			existingEntities,
			fullEntities,
		);
	}

	// if fullEntities is not a map, then we need to make it a map
	fullEntities = ! ( fullEntities instanceof Map ) ?
		convertToMapFromObject( fullEntities ) :
		fullEntities;

	yield receiveEntityRecords(
		singularModelName( relationModelName ),
		fullEntities
	);
	yield receiveRelatedEntities(
		modelName,
		entity.id,
		pluralRelationName,
		entityIds,
	);
	yield resolveGetRelatedEntities(
		entity,
		relationEntities,
		entityIds,
	);
	yield resolveGetEntityByIdForIds(
		singularModelName( relationModelName ),
		entityIds
	);
	return values( convertToObjectFromMap( fullEntities ) );
}
