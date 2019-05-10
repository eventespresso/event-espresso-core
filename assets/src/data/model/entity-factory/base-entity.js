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
import {
	SAVE_STATE,
	PRIVATE_PROPERTIES,
} from './constants';

/**
 * BaseEntity is the basic class for all entities.  createEntityFactory returns
 * an instance of this and all the getters/setters for fields etc are
 * dynamically created via the constructor.
 */
class BaseEntity {
	[ PRIVATE_PROPERTIES.SAVE_STATE ] = SAVE_STATE.CLEAN;
	[ PRIVATE_PROPERTIES.VALIDATE_TYPES ] = {};

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
		createGetter(
			this,
			'fieldsToPersistOnInsert',
			new Set( Object.keys( entityFieldsAndValues ) )
		);
		createEntityGettersAndSetters( this );
		createPersistingGettersAndSetters( this );
		Object.seal( this );
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

	/**
	 * Whether the current save state is SAVE_STATE.NEW
	 * @return {boolean}  True means SAVE_STATE.NEW is the save state.
	 */
	get isNew() {
		return this.saveState === SAVE_STATE.NEW;
	}

	/**
	 * Whether the current save state is SAVE_STATE.DIRTY
	 * @return {boolean}  True means SAVE_STATE.DIRTY is the save state.
	 */
	get isDirty() {
		return this.saveState === SAVE_STATE.DIRTY;
	}

	/**
	 * Whether the current save state is SAVE_STATE.CLEAN
	 * @return {boolean}  True means SAVE_STATE.CLEAN is the save state.
	 */
	get isClean() {
		return this.saveState === SAVE_STATE.CLEAN;
	}

	/**
	 * Whether the entity has any password protected fields.
	 * @return {boolean} True means it does, false means it doesn't.
	 */
	get isPasswordProtected() {
		return this.protectedFields.length > 0;
	}

	/**
	 * Whether the given fieldName is a password protected field.
	 * @return {function(string): boolean}  Returns a function that can be used
	 * to check if the given field name is a protected field in this entity.
	 */
	get isFieldPasswordProtected() {
		return ( fieldName ) => this.protectedFields.indexOf( fieldName ) > -1;
	}

	/**
	 * Used to clone the current entity object.  This results in an instance of
	 * BaseEntity that is equivalent as this current instance (except it will
	 * have a new generated id).
	 *
	 * @return {BaseEntity} A new instance of BaseEntity
	 */
	get clone() {
		return ( keepId = false ) => {
			// @todo memoize this
			const factory = createEntityFactory(
				this.modelName,
				{ $schema: {}, properties: this.schema },
				this.fieldPrefixes
			);
			const newEntity = factory.createNew( this.forClone );
			if ( keepId ) {
				newEntity.id = this.id;
				setSaveState( this, newEntity.saveState );
			}
			return newEntity;
		};
	}

	static name = 'BaseEntity'
}

/**
 * A function that gives a class the provided name
 * (and optionally extends the provided object).
 * @param {string} name
 * @param {Object} extendedClass
 * @return {Function} A function
 */
const nameClass = ( name, extendedClass ) => {
	return class extends extendedClass {
		static get name() {
			return name;
		}
	};
};

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
 * @return {Object} A factory for instantiating an entity instance.
 */
const createEntityFactory = ( modelName, schema, fieldPrefixes = [] ) => {
	const Entity = nameClass(
		upperFirst( camelCase( modelName ) ),
		BaseEntity
	);
	return {
		/**
		 * Exposes modelName so client code can derive what model this factory
		 * is for from any given factory.
		 * @type string
		 */
		modelName,
		/**
		 * This is the class definition for the Entity.  Typically this is
		 * retrieved for the ability to do instanceof checks.
		 */
		classDef: Entity,
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
		 * - This factory method expects fields and values to be "prepared".
		 *   What that means is that for any fields that the schema described as
		 *   having a `raw` property (i.e. { EVT_desc: { raw: 'something' } })
		 *   the value should be of the correct type for that raw property and.
		 *   This also means is that for any fields the schema describes as a
		 *   date-time (format) or money (format) field, the value is expected
		 *   to be the corresponding value object.
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
		 * - The incoming values are expected to be in the exact shape as
		 *   described by the schema for the entity model.
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
