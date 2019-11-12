/**
 * Internal dependencies
 */
import { isResolving, hasFinishedResolving } from '../base-selectors';
import { REDUCER_KEY, JOIN_RELATION_TYPES } from './constants';

/**
 * External imports
 */
import {
	singularModelName,
	getPrimaryKey,
	modelNameForQueryString,
} from '@eventespresso/model';
import { normalizeEntityId } from '@eventespresso/helpers';
import { Map } from 'immutable';
import createSelector from 'rememo';

/**
 * Selector for returning the schema object for a given model name from the
 * state.
 * @param {Object} state
 * @param {string} modelName
 * @return {Object} The schema object or null if it doesn't exist.
 */
export function getSchemaForModel( state, modelName ) {
	return state.schema.get( singularModelName( modelName ), null );
}

/**
 * Selector for returning whether the schema is being requested or not for the
 * given model name.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean}  True means its being requested.
 */
export function isRequestingSchemaForModel( state, modelName ) {
	return isResolving(
		REDUCER_KEY,
		'getSchemaForModel',
		singularModelName( modelName )
	);
}

/**
 * Selector for returning whether the schema has been resolved or not for the
 * given model name.
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean} True means that the schema has finished resolving for this
 * model name.
 */
export function hasResolvedSchemaForModel( state, modelName ) {
	return hasFinishedResolving(
		REDUCER_KEY,
		'getSchemaForModel',
		singularModelName( modelName )
	);
}

/**
 * Selector for returning the model entity factory object for a given
 * model name from the state.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {Object} Returns the model entity factory or null if it doesn't
 * exist.
 */
export function getFactoryForModel( state, modelName ) {
	const factory = state.factory.get( singularModelName( modelName ), null );
	return ! ( factory instanceof Map ) ? factory : null;
}

/**
 * Selector for returning whether the model entity factory is being requested
 * or not for the given model name from the state.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean}  True means it is being requested.
 */
export function isRequestingFactoryForModel( state, modelName ) {
	return isResolving(
		REDUCER_KEY,
		'getFactoryForModel',
		singularModelName( modelName )
	);
}

/**
 * Selector for returning whether the factory has been resolved or not for the
 * given model name.
 *
 * @param {Object} state
 * @param {string} modelName
 * @return {boolean} True means that the factory has finished resolving for this
 * model name.
 */
export function hasResolvedFactoryForModel( state, modelName ) {
	return hasFinishedResolving(
		REDUCER_KEY,
		'getFactoryForModel',
		singularModelName( modelName )
	);
}

/**
 * Return the relation endpoint for the given model, entity id and relation.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @param {string} relationModelName
 * @return {string} Returns the relation endpoint if available or an empty
 * string.
 */
export function getRelationEndpointForEntityId(
	state,
	modelName,
	entityId,
	relationModelName
) {
	modelName = singularModelName( modelName );
	relationModelName = singularModelName( relationModelName );
	entityId = normalizeEntityId( entityId );
	return state.relationEndpoints.getIn(
		[ modelName, entityId, relationModelName ]
	) || '';
}

/**
 * Selector for returning whether the relation endpoint is being requested
 * or not for the given model name, entity id, and relation from the state.
 * @param {Object} state
 * @param {string} modelName
 * @param {number|string} entityId
 * @param {string} relationModelName
 * @return {boolean}  True means it is being requested.
 */
export function isRequestingRelationEndpointForEntityId(
	state,
	modelName,
	entityId,
	relationModelName
) {
	modelName = singularModelName( modelName );
	entityId = normalizeEntityId( entityId );
	relationModelName = singularModelName( relationModelName );
	return isResolving(
		REDUCER_KEY,
		'getRelationEndpointForEntityId',
		modelName,
		entityId,
		relationModelName,
	);
}

/**
 * Selector for returning the primary key string to use in a query for the given
 * model and relation.  This considers the join type for the relation.
 *
 * For example:  If you were doing a query to get the registrations related to an
 * attendee, you would need the string to use for the `REG_ID` primary key in
 * the query.  Since the join type for registrations to attendees is
 * EE_Has_Many_Relation, then the query string would need to be
 * `Registration.REG_ID`.  If however you were getting the attendee related
 * to a registration, then the join type for attendees on registrations is
 * EE_Belongs_To_Relation, in which case the attendee primary key would be
 * `ATT_ID` (the registration table has the foreign key on it).
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} relationName
 *
 * @return {string} The primary key string to use or an empty string if relation
 * type could not be determined.
 */
export const getRelationPrimaryKeyString = createSelector(
	(
		state,
		modelName,
		relationName
	) => {
		modelName = singularModelName( modelName );
		relationName = singularModelName( relationName );
		const relationType = getRelationType( state, modelName, relationName );
		if ( relationType === '' ) {
			return '';
		}
		const relationPrimaryKey = getPrimaryKey( relationName );
		return relationType === 'EE_Belongs_To_Relation' ?
			relationPrimaryKey :
			`${ modelNameForQueryString( relationName ) }.${ relationPrimaryKey }`;
	},
	( state, modelName, relationName ) => {
		modelName = singularModelName( modelName );
		relationName = singularModelName( relationName );
		return [
			state.relationSchema.getIn( [ modelName, relationName ], '' ),
		];
	},
);

/**
 * Selector returning the relation response type for the given relation.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} relationName
 * @return {string} The type for the relation returned for the given model and
 * relation.
 */
export const getRelationResponseType = ( state, modelName, relationName ) => {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	const relationSchema = getRelationSchema( state, modelName, relationName );
	return relationSchema !== null ?
		relationSchema.type :
		'';
};

/**
 * Selector returning whether the relation between the given model name and
 * relation name has a join table.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} relationName
 * @return {boolean} True means there is a join table, false means there isn't.
 */
export const hasJoinTableRelation = ( state, modelName, relationName ) => {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	const relationType = getRelationType( state, modelName, relationName );
	return JOIN_RELATION_TYPES.indexOf( relationType ) > -1;
};

/**
 * Selector returning the relation type describing the relation between the
 * given model name and relation name.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} relationName
 * @return {string}  The relation type (eg. "EE_HABTM_Relation")
 */
export const getRelationType = ( state, modelName, relationName ) => {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	const relationSchema = getRelationSchema( state, modelName, relationName );
	return relationSchema !== null ?
		relationSchema.relation_type :
		'';
};

/**
 * Selector returning the relation schema describing the relation between the
 * given model name and relation name.
 *
 * @param {Object} state
 * @param {string} modelName
 * @param {string} relationName
 * @return {Object|null} An object or null if there is no relation schema.
 */
export const getRelationSchema = ( state, modelName, relationName ) => {
	modelName = singularModelName( modelName );
	relationName = singularModelName( relationName );
	return state.relationSchema.getIn( [ modelName, relationName ], null );
};
