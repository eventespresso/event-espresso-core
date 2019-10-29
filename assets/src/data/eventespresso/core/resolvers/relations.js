/**
 * External imports
 */
import {
	createAndKeyEntitiesByPrimaryKeyValue,
	keyEntitiesByPrimaryKeyValue,
	singularModelName,
	pluralModelName,
	stripBaseRouteFromUrl,
	getPrimaryKeyQueryString,
	getPrimaryKey,
	getEndpoint,
	modelNameForQueryString,
} from '@eventespresso/model';
import {
	isModelEntityFactoryOfModel,
	isModelEntity,
} from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';
import warning from 'warning';
import { isEmpty, isUndefined } from 'lodash';
import { Map as ImmutableMap } from 'immutable';
import { sprintf } from '@eventespresso/i18n';

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
import { appendCalculatedFieldsToPath } from './utils';

const DEFAULT_EMPTY_ARRAY = [];

/**
 * A resolver for getting relation entities for the given model name and entity
 * for that model.
 *
 * @param {BaseEntity} entity
 * @param {string} relationModelName
 * @param {Array} calculatedFields
 * @return {[]|Array<BaseEntity>} If there are relations, returns an array of
 * BaseEntity instances for the relations, otherwise an empty array.
 */
export function* getRelatedEntities(
	entity,
	relationModelName,
	calculatedFields = DEFAULT_EMPTY_ARRAY
) {
	if ( ! isModelEntity( entity ) ) {
		throw new InvalidModelEntity( '', entity );
	}
	// if entity is new then there won't be any relations for it on the server
	// yet, so let's just return early.
	if ( entity.isNew ) {
		return DEFAULT_EMPTY_ARRAY;
	}
	relationModelName = singularModelName( relationModelName );
	const pluralRelationName = pluralModelName( relationModelName );
	const modelName = entity.modelName.toLowerCase();
	const relationResourceProperty = pluralRelationName + 'Resource';
	const relationEndpoint = entity[ relationResourceProperty ] ?
		stripBaseRouteFromUrl(
			entity[ relationResourceProperty ].resourceLink
		) :
		'';
	if ( relationEndpoint === '' ) {
		warning(
			false,
			sprintf(
				'There is no relation resource for the given model (%s) and requested relation (%s)',
				modelName,
				pluralRelationName
			)
		);
		return DEFAULT_EMPTY_ARRAY;
	}
	yield dispatch(
		SCHEMA_REDUCER_KEY,
		'receiveRelationEndpointForModelEntity',
		modelName,
		entity.id,
		relationModelName,
		relationEndpoint
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		SCHEMA_REDUCER_KEY,
		'receiveRelationEndpointForModelEntity',
		[ modelName, entity.id, relationModelName, relationEndpoint ]
	);

	// add calculatedFields to endpoint?
	const path = appendCalculatedFieldsToPath(
		relationEndpoint,
		calculatedFields
	);

	console.log(
		'%c FETCH RELATED ENTITIES :' + path,
		'color: #ff0066; font-size:12px;'
	);
	let relationEntities = yield fetch( { path } );
	if ( isEmpty( relationEntities ) ) {
		return DEFAULT_EMPTY_ARRAY;
	}
	relationEntities = ! Array.isArray( relationEntities ) ?
		[ relationEntities ] :
		relationEntities;

	const factory = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		relationModelName
	);
	if ( ! isModelEntityFactoryOfModel(
		factory,
		relationModelName
	) ) {
		return DEFAULT_EMPTY_ARRAY;
	}

	let fullEntities = keyEntitiesByPrimaryKeyValue(
		relationModelName,
		relationEntities
	);
	fullEntities = createAndKeyEntitiesByPrimaryKeyValue(
		factory,
		fullEntities,
	);
	const entityIds = Array.from( fullEntities.keys() );

	// are there already entities for the ids in the store?
	// If so...we use those.
	const existingEntities = yield select(
		CORE_REDUCER_KEY,
		'getEntitiesByIds',
		relationModelName,
		entityIds
	);

	if ( ! isEmpty( existingEntities ) ) {
		fullEntities = keepExistingEntitiesInObject(
			existingEntities.reduce(
				( entitiesObject, entityObj ) => {
					entitiesObject[ entityObj.id ] = entity;
					return entitiesObject;
				},
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
		relationModelName,
		entityArray
	);
	yield receiveRelatedEntities(
		modelName,
		entity.id,
		relationModelName,
		entityIds,
	);
	yield resolveGetRelatedEntities(
		entity,
		fullEntities,
		entityIds,
	);
	yield resolveGetEntityByIdForIds(
		relationModelName,
		entityIds
	);
	return entityArray;
}

/**
 * Resolver for the getRelatedEntitiesForIds selector
 *
 * @param {string} modelName
 * @param {Array<number>} entityIds
 * @param {string} relationName
 * @param {Array} calculatedFields  This will retrieve any named calculated
 * fields for the related entities.
 *
 * @return {Array|undefined} If there is no schema for the relation, an
 * empty array is returned.
 */
export function* getRelatedEntitiesForIds(
	modelName,
	entityIds,
	relationName,
	calculatedFields = []
) {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
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
	if ( relationSchema === null ) {
		return DEFAULT_EMPTY_ARRAY;
	}
	const relationType = relationSchema.relation_type;

	const factory = yield resolveSelect(
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		relationName
	);
	const path = getRelationRequestUrl(
		modelName,
		entityIds,
		relationName,
		relationSchema,
		relationType,
		hasJoinTable,
		calculatedFields,
	);
	console.log(
		'%c getRelatedEntitiesForIds ' + modelName +
		'%c path %c' + path +
		'%c entityIds ',
		'color: #ff0066; font-size:16px;',
		'color: Grey;',
		'color: #ff0066; font-size:14px;',
		'color: Grey;',
		entityIds
	);
	const response = yield fetch( { path } );
	if ( ! response.length ) {
		return DEFAULT_EMPTY_ARRAY;
	}
	const relationPrimaryKey = getPrimaryKey( relationName );
	const modelPrimaryKey = getPrimaryKey( modelName );
	const pluralRelationName = pluralModelName( relationName );
	let hasSetMap = ImmutableMap();
	if ( hasJoinTable ) {
		while ( response.length > 0 ) {
			const record = response.pop();
			let relationRecords = record[ pluralRelationName ] || null;
			relationRecords = relationRecords === null &&
			! isUndefined( record[ relationName ] ) ?
				record[ relationName ] :
				relationRecords;
			relationRecords = relationRecords !== null &&
				! Array.isArray( relationRecords ) ?
				[ relationRecords ] :
				relationRecords;
			if ( relationRecords !== null ) {
				while ( relationRecords.length > 0 ) {
					const modelId = record[ modelPrimaryKey ];
					const relationId = record[ relationPrimaryKey ];
					const relationRecord = relationRecords.pop();
					if ( relationRecord !== null &&
						! hasSetMap.hasIn( [ modelId, relationId ] )
					) {
						const relationEntity = factory.fromExisting(
							relationRecord );
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
	} else {
		while ( response.length > 0 ) {
			const record = response.pop();
			const modelId = isBelongsToRelation( relationType ) ?
				record[ modelPrimaryKey ] :
				record[ modelName ].id;
			const relationId = record[ relationPrimaryKey ];
			if ( ! hasSetMap.hasIn( [ modelId, relationId ] ) ) {
				const relationEntity = factory.fromExisting(
					record[ relationName ]
				);
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

/**
 * Constructs and returns the url for a relation entity request using the given
 * arguments
 *
 * @param {string} modelName
 * @param {Array} entityIds
 * @param {string} relationName
 * @param {Object} relationSchema
 * @param {string} relationType
 * @param {boolean} hasJoinTable
 * @param {Array} calculatedFields
 * @return {string} A path to use for a relation request.
 */
const getRelationRequestUrl = (
	modelName,
	entityIds,
	relationName,
	relationSchema,
	relationType,
	hasJoinTable,
	calculatedFields,
) => {
	let path;
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	switch ( true ) {
		case hasJoinTable:
			path = getEndpoint(
				singularModelName( relationSchema.joining_model_name )
					.toLowerCase()
			);
			path += '/?where' + getPrimaryKeyQueryString(
				modelName,
				entityIds
			);
			path += `&include=${ modelNameForQueryString( relationName ) }.*`;
			path = appendCalculatedFieldsToPath(
				path,
				calculatedFields,
				relationName
			);
			break;
		case isBelongsToRelation( relationType ):
			path = getEndpoint( modelName );
			path += `/?where${ getPrimaryKeyQueryString( modelName, entityIds ) }`;
			path += `&include=${ modelNameForQueryString( relationName ) }.*`;
			path = appendCalculatedFieldsToPath(
				path,
				calculatedFields,
				relationName
			);
			break;
		default:
			// we do the reverse endpoint so that we are getting the belongs to
			// relation responses back and including the relation entities we
			// want in the response (belongs to).  So for instance if the
			// incoming arguments are:
			// `getRelatedEntitiesForEntityIds(
			// 		'attendee',
			// 		[ 10, 20],
			// 		'registration'
			// )
			// then the query would be:
			// /registrations/?where[ATT_ID][IN]=10,20&include=Attendee.*
			// basically the goal here is to get one to one relations returned
			// in the query for easier parsing/dispatching.
			// @todo, currently this will NOT account for paging.
			path = getEndpoint( relationName );
			path += `/?where${ getPrimaryKeyQueryString( modelName, entityIds ) }`;
			path += `&include=${ modelNameForQueryString( modelName ) }.*`;
			path = appendCalculatedFieldsToPath(
				path,
				calculatedFields,
			);
			break;
	}
	return path;
};

/**
 * Returns whether the given relationType is equal to `EE_Belongs_To_Relation`
 *
 * @param {string} relationType
 * @return {boolean}  True means the given relationType is `EE_Belongs_To_Relation`
 */
const isBelongsToRelation = ( relationType ) => {
	return relationType === 'EE_Belongs_To_Relation';
};
