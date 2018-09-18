/**
 * External imports
 */
import { isArray, upperFirst, camelCase } from 'lodash';

/**
 * Internal imports
 */
import { assertValidSchema } from './assertions';
import {
	createGetter,
	createEntityGettersAndSetters,
	createPersistingGettersAndSetters,
	setSaveState,
} from './create';
import { SAVE_STATE, PRIVATE_PROPERTIES } from './constants';

/**
 * @todo
 * - make sure schema parser accounts for when `type` is an array.
 * - as a separate issue (likely not a part of this file) I need to work out a way
 *   of both caching and invalidating the cache.  One idea I have is server side
 *   to create a hash of the schema that is returned on schema requests.  This hash
 *   is also returned as a part of the request object for a model so the internal
 *   schema can be validated.  However, really probably just tie the cache to the
 *   api version.  So if a new version is used in a request, that invalidates the
 *   schema.
 */

/**
 * BaseEntity is the basic class for all entities.  createEntityFactory returns
 * an instance of this and all the getters/setters for fields etc are
 * dynamically created via the constructor.
 */
class BaseEntity {
	[ PRIVATE_PROPERTIES.SAVE_STATE ] = SAVE_STATE.CLEAN;

	/**
	 * Constructor for Base Entity
	 * @param {string} modelName
	 * @param {Object} entityFieldsAndValues
	 * @param {Object} schema
	 * @param {Array}fieldPrefixes
	 * @param {boolean} isNew
	 */
	constructor(
		modelName,
		entityFieldsAndValues,
		schema,
		fieldPrefixes = [],
		isNew = false,
	) {
		assertValidSchema( schema );
		fieldPrefixes = isArray( fieldPrefixes ) ? fieldPrefixes : [];
		createGetter( this, 'fieldPrefixes', fieldPrefixes );
		createGetter( this, 'schema', schema.properties );
		setSaveState(
			this,
			isNew ? SAVE_STATE.NEW : SAVE_STATE.CLEAN
		);
		createGetter( this, 'modelName', modelName );
		createGetter( this, 'originalFieldsAndValues', entityFieldsAndValues );
		createEntityGettersAndSetters( this );
		createPersistingGettersAndSetters( this );
	}

	/**
	 * Returns the current save state on the entity.
	 *
	 * Save state describes whether the entity is:
	 *
	 * - SAVE_STATE.NEW: The entity has never been persisted to storage.
	 * - SAVE_STATE.CLEAN: The entity exists in storage and has not been mutated.
	 * - SAVE_STATE.DIRTY: The entity is mutated and changes have not been
	 * persisted to storage.
	 *
	 * @return {Symbol}  Returns the current save state for the entity.
	 */
	get saveState() {
		return this[ PRIVATE_PROPERTIES.SAVE_STATE ];
	}
}

/**
 * A function that gives a class the provided name
 * (and optionally extends the provided object).
 * @param {string} name
 * @param {Object} extendedClass
 * @return {Function} A function
 */
const nameClass = ( name, extendedClass = {} ) => (
	{ [ name ]: class extends extendedClass {} }
)[ name ];

/**
 * A factory for entity factories.
 *
 * Calling this returns an object of factory functions that instantiate an
 * instance of a named Entity.  The modelName is used as the name for the new
 * entity.
 *
 * Two methods are available on the object returned: `createNew` and
 * `fromExisting`.
 *
 * @param {string} modelName  The model for the entity
 * @param {Object} schema     The schema for the model. This is the schema
 * provided by the OPTIONS endpoint for the model.
 * @param {Array} fieldPrefixes An array of field prefixes for base fields on
 * on the model (eg. Event model has `[ EVT ]` prefixes on fields, Datetime model
 * has [ `DTT`, `DTT_EVT` ]
 * @return {function(*=)} A factory for instantiating an entity instance.
 */
export const createEntityFactory = ( modelName, schema, fieldPrefixes = [] ) => {
	const Entity = nameClass(
		upperFirst( camelCase( modelName ) ),
		BaseEntity
	);
	return {
		/**
		 * This returns an instance of Entity for the given arguments with the
		 * indication this is a new non-persisted entity.  This means:
		 *
		 * - All field values are populated and any not provided will be
		 *   populated with default values defined by the schema.
		 * - Generates temporary unique ids for the primary key fields on the
		 *   entity (using cuid).
		 * - Sets the `isNew` flag to true for the entity so client code is able
		 *   to discover which entities have never been persisted.
		 * - Sets the `dirty` flag to true because the entity has never been
		 *   persisted.
		 *
		 * @param {Object} fieldsAndValues
		 * @return {Entity} an instance of Entity
		 */
		createNew: ( fieldsAndValues ) => new Entity(
			modelName,
			fieldsAndValues,
			schema,
			fieldPrefixes,
			true
		),
		/**
		 * This returns an instance of Entity for the given arguments with the
		 * indication this represents the entity as is in the db.  This means:
		 *
		 * - All field values are NOT populated if missing values.  This is
		 *   especially important for contexts like unauthorized views where
		 *   only partial entities are returned in REST responses.
		 * - isNew flag is set to false (and never changes for this entity)
		 * - dirty flag is set to false
		 *
		 * @param {Object} fieldsAndValues
		 * @return {Entity} an instance of Entity
		 */
		fromExisting: ( fieldsAndValues ) => new Entity(
			modelName,
			fieldsAndValues,
			schema,
			fieldPrefixes
		),
	};
};
export default createEntityFactory;
export { SAVE_STATE };
