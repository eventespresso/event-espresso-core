/**
 * External imports
 */
import {
	createAndKeyEntitiesByPrimaryKeyValue,
	keyEntitiesByPrimaryKeyValue,
	pluralModelName,
	singularModelName,
	stripBaseRouteFromUrl,
	getPrimaryKeyQueryString,
	getPrimaryKey,
	getEndpoint,
} from '@eventespresso/model';
import {
	isModelEntityFactoryOfModel,
	isModelEntity,
} from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';
import warning from 'warning';
import { isEmpty, startCase, isUndefined, isArray } from 'lodash';
import { Map } from 'immutable';

/**
 * Internal Imports
 */
import {
	fetch,
	dispatch,
	select,
	resolveSelect,
	resolveGetEntityByIdForIds,
	resolveGetRelatedEntities,
} from '../../base-controls';
import {
	receiveEntityRecords,
	receiveRelatedEntities,
} from './../actions';
import { keepExistingEntitiesInObject } from '../../base-model';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../schema/constants';

const DEFAULT_EMPTY_ARRAY = [];

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
		return DEFAULT_EMPTY_ARRAY;
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
		return DEFAULT_EMPTY_ARRAY;
	}

	const factory = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		singularRelationName
	);
	if ( ! isModelEntityFactoryOfModel(
		factory,
		singularRelationName
	) ) {
		return DEFAULT_EMPTY_ARRAY;
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

export function* getRelatedEntitiesForIds(
	modelName,
	entityIds,
	relationName
) {
	let path, response, records;
	const hasJoinTable = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'hasJoinTableRelation',
		modelName,
		relationName,
	);
	const relationSchema = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getRelationSchema',
		modelName,
		relationName,
	);
	const relationPrimaryKey = getPrimaryKey(
		singularModelName( relationName )
	);
	const modelPrimaryKey = getPrimaryKey( singularModelName( modelName ) );
	const singularRelationName = singularModelName( relationName );
	const pluralRelationName = pluralModelName( relationName );
	if ( relationSchema === null ) {
		return DEFAULT_EMPTY_ARRAY;
	}
	const factory = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		relationName
	);
	let hasSetMap = Map();
	if ( hasJoinTable ) {
		// prepare a fetch using the join table with relations in the response.
		const joinModel = pluralModelName( relationSchema.joining_model_name );
		path = getEndpoint( joinModel ) +
			'/?where' +
			getPrimaryKeyQueryString(
				singularModelName( modelName ),
				entityIds
			) +
			'&include=' + getModelNameForRequest( relationName ) + '.*';
		response = yield fetch( { path } );
		if ( ! response.length ) {
			return;
		}
		records = [ ...response ];
		while ( records.length > 0 ) {
			const record = records.pop();
			let relationRecords = record[ pluralRelationName ] || null;
			relationRecords = relationRecords === null &&
			! isUndefined( record[ singularRelationName ] ) ?
				record[ singularRelationName ] :
				relationRecords;
			relationRecords = relationRecords !== null &&
				! isArray( relationRecords ) ?
				[ relationRecords ] :
				relationRecords;
			while ( relationRecords.length > 0 ) {
				const modelId = record[ modelPrimaryKey ];
				const relationId = record[ relationPrimaryKey ];
				const relationRecord = relationRecords.pop();
				if ( relationRecord !== null &&
					! hasSetMap.hasIn( [ modelId, relationId ] )
				) {
					const relationEntity = factory.fromExisting( relationRecord );
					yield dispatch(
						CORE_REDUCER_KEY,
						'resolveRelationRecordForRelation',
						relationEntity,
						modelName,
						modelId,
					);
					hasSetMap = hasSetMap.setIn(
						[ modelId, relationId ],
						true
					);
				}
			}
		}
	} else {
		path = getEndpoint( singularRelationName ) +
			'?where' + getPrimaryKeyQueryString( modelName, entityIds );
		response = yield fetch( { path } );
		if ( ! response.length ) {
			return;
		}
		records = [ ...response ];
		while ( records.length > 0 ) {
			const record = records.pop();
			const modelId = record[ modelPrimaryKey ];
			const relationId = record[ relationPrimaryKey ];
			if ( ! hasSetMap.hasIn( [ modelId, relationId ] ) ) {
				const relationEntity = factory.fromExisting( record );
				yield dispatch(
					CORE_REDUCER_KEY,
					'resolveRelationRecordForRelation',
					relationEntity,
					modelName,
					modelId,
				);
				hasSetMap = hasSetMap.setIn(
					[ modelId, relationId ],
					true
				);
			}
		}
	}
}

const getModelNameForRequest = ( modelName ) => {
	modelName = singularModelName( modelName );
	modelName = modelName.replace( '_', ' ' );
	modelName = startCase( modelName );
	return modelName.replace( ' ', '_' );
};