/**
 * External imports
 */
import {
	getPrimaryKey,
	applyQueryString,
	createAndKeyEntitiesByPrimaryKeyValue,
	pluralModelName,
	singularModelName,
} from '@eventespresso/model';
import {
	isModelEntityFactoryOfModel,
	isModelEntityOfModel,
} from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';
import warning from 'warning';

/**
 * Internal Imports
 */
import { fetch, dispatch, select } from '../base-controls';
import {
	getFactoryByModel,
	resolveGetEntityByIdForIds,
} from '../base-resolvers';
import {
	receiveEntityRecords,
	receiveRelatedEntities,
} from './actions';
import { isEmpty } from 'lodash';
import { keepExistingEntitiesInObject } from '../base-entities';

export function* getEntityById( modelName, entityId ) {
	const primaryKeyForModel = getPrimaryKey( modelName );
	let entity = yield fetch( {
		path: applyQueryString(
			modelName,
			primaryKeyForModel + '=' + entityId
		),
	} );
	entity = {
		[ entityId ]: entity,
	};
	const factory = yield getFactoryByModel( modelName );
	if ( ! isModelEntityFactoryOfModel( factory, modelName ) ) {
		return;
	}
	const fullEntity = createAndKeyEntitiesByPrimaryKeyValue( factory, entity );
	yield receiveEntityRecords( modelName, fullEntity );
}

export function* getRelationEntitiesForEntity(
	modelName,
	entity,
	relationModelName
) {
	if ( ! isModelEntityOfModel( entity, modelName ) ) {
		throw new InvalidModelEntity( '', entity );
	}
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
		return;
	}
	yield dispatch(
		'eventespresso/schema',
		'receiveRelationEndpointForModelEntity',
		modelName,
		entity.id,
		pluralRelationName,
		relationEndpoint
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		'eventespresso/schema',
		'receiveRelationEndpointForModelEntity',
		[ modelName, entity.id, pluralRelationName, relationEndpoint ]
	);
	const relationEntities = yield fetch( {
		path: relationEndpoint,
	} );
	if ( ! relationEntities.length ) {
		return;
	}

	const factory = getFactoryByModel(
		singularModelName( relationModelName )
	);
	if ( ! isModelEntityFactoryOfModel(
		factory,
		singularModelName( relationModelName )
	) ) {
		return;
	}
	let fullEntities = createAndKeyEntitiesByPrimaryKeyValue(
		factory,
		relationEntities,
	);
	const entityIds = Array.from( fullEntities.keys() );

	// are there already entities for the ids in the store? If so...we use
	// those.
	const existingEntities = yield select(
		'eventespresso/core',
		'getEntitiesByIds',
		entityIds
	);

	if ( ! isEmpty( existingEntities ) ) {
		fullEntities = keepExistingEntitiesInObject(
			existingEntities,
			fullEntities,
		);
	}
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
	yield resolveGetEntityByIdForIds(
		singularModelName( relationModelName ),
		entityIds
	);
	return fullEntities;
}
