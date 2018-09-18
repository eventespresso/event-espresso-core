/**
 * External imports
 */
import {
	camelCase,
	capitalize,
	forEach,
	isUndefined,
	isArray,
	keys,
} from 'lodash';
import cuid from 'cuid';
import { InvalidArgument } from '@eventespresso/eejs';

/**
 * Internal imports
 */
import {
	assertValidFieldAndValueAgainstSchema,
	assertValidValueForPreparedField,
} from './assertions';
import {
	deriveRenderedValue,
	derivePreparedValueForField,
	getRelationNameFromLink,
	getBaseFieldsAndValuesForPersisting,
	getPrimaryKeyFieldsFromSchema,
	getEntityFieldsFromSchema,
	getDefaultValueForField,
} from './extractors';
import {
	isEntityField,
	isPrimaryKeyField,
} from './booleans';
import { PRIVATE_PROPERTIES, SAVE_STATE } from './constants';

/**(
 * A generic getter creator for a provided instance.
 *
 * @param {Object} instance
 * @param {string} fieldName  The name of the accessor.
 * @param {*} fieldValue
 * @param {Object} opts used to pass through additional options for the
 * Object.defineProperty call.
 */
export const createGetter = ( instance, fieldName, fieldValue, opts = {} ) => {
	Object.defineProperty( instance, fieldName, {
		get() {
			return fieldValue;
		},
		...opts,
	} );
};

/**
 * This creates a getter that calls the provided callback when invoked.
 *
 * The callback receives the `instance` argument passed through
 *
 * @param {Object} instance
 * @param {string} propertyName
 * @param {function(Object)} callBack
 */
export const createCallbackGetter = ( instance, propertyName, callBack ) => {
	Object.defineProperty( instance, propertyName, {
		get() {
			return callBack( instance );
		},
	} );
};

/**
 * A generic getter and setter creator for a provided instance
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*}  initialFieldValue
 * @param {Object} opts Optional, pass through options used by
 * Object.defineProperty
 */
export const createGetterAndSetter = (
	instance,
	fieldName,
	initialFieldValue,
	opts = {}
) => {
	let property = initialFieldValue;
	Object.defineProperty( instance, fieldName, {
		get() {
			return property;
		},
		set( receivedValue ) {
			assertValidValueForPreparedField(
				property,
				receivedValue,
				instance.schema
			);
			setSaveState( instance, SAVE_STATE.DIRTY );
			property = receivedValue;
		},
		...opts,
	} );
};

/**
 * A getter and setter creator for an field alias.
 *
 * @param {Object} instance
 * @param {string} originalFieldName
 * @param {string} aliasFieldName
 */
export const createAliasGetterAndSetter = (
	instance,
	originalFieldName,
	aliasFieldName
) => {
	Object.defineProperty( instance, aliasFieldName, {
		get() {
			return instance[ originalFieldName ];
		},
		set( receivedValue ) {
			return instance[ originalFieldName ] = receivedValue;
		},
	} );
};

/**
 * Creates a fluent setter on the provided instance for the given field name.
 *
 * @param {Object} instance
 * @param {string} fieldName
 */
export const createFluentSetter = ( instance, fieldName ) => {
	Object.defineProperty( instance, 'set' + capitalize( fieldName ), {
		get() {
			return ( receivedValue ) => {
				instance[ fieldName ] = receivedValue;
				return instance;
			};
		},
	} );
};

/**
 * Creates initial getters and setters for entities on the provided entity
 * instance using the given data.
 * @param {Object} instance
 * keys on instance.
 */
export const createEntityGettersAndSetters = ( instance ) => {
	const primaryKeys = [];
	forEach(
		instance.originalFieldsAndValues,
		( fieldValue, fieldName ) => {
			assertValidFieldAndValueAgainstSchema(
				instance.modelName,
				fieldName,
				fieldValue,
				instance.schema
			);
			if ( isEntityField( fieldName, instance.schema ) ) {
				setInitialEntityFieldsAndValues(
					instance,
					fieldName,
					fieldValue
				);
			}
			if ( fieldName === '_calculated_fields' ) {
				setCalculatedFieldAndValues( instance, fieldValue );
			}
			if ( fieldName === 'link' ) {
				createGetter( instance, 'link', fieldValue );
			}
			if ( fieldName === '_links' ) {
				setResources( instance, fieldValue );
			}
			if (
				! instance.isNew &&
				isPrimaryKeyField( fieldName, instance.schema )
			) {
				primaryKeys.push( fieldName );
			}
		}
	);
	if ( ! instance.isNew && primaryKeys.length ) {
		createPrimaryKeyFieldGetters( instance, primaryKeys );
	}

	populatePrimaryKeys( instance );
	populateMissingFields( instance );
};

/**
 * This populates primary key fields.
 * Note that it also overrides any primary key values/properties that are
 * already set in the entity so is only processed when the instance is new.
 *
 * @param {Object} instance
 */
const populatePrimaryKeys = ( instance ) => {
	if ( ! instance.isNew ) {
		return;
	}
	const primaryKeys = getPrimaryKeyFieldsFromSchema( instance );
	forEach( primaryKeys, (
		schemaProperties,
		schemaField
	) => {
		// always delete and override what is existing.
		if ( instance[ schemaField ] ) {
			delete instance[ schemaField ];
		}
		createGetter(
			instance,
			schemaField,
			cuid(),
			{ configurable: true }
		);
	} );
	createPrimaryKeyFieldGetters(
		instance,
		keys( primaryKeys )
	);
};

/**
 *  Populates missing fields and values using defaults provided by schema.  If
 *  schema doesn't provide a default then this will populate the field with a
 *  default value that matches the type.
 *
 * @param {Object} instance
 */
const populateMissingFields = ( instance ) => {
	if ( ! instance.isNew ) {
		return;
	}
	forEach(
		getEntityFieldsFromSchema( instance ),
		( schemaProperties, fieldName ) => {
			if (
				! instance[ fieldName ] &&
				! isPrimaryKeyField( fieldName, instance.schema )
			) {
				setInitialEntityFieldsAndValues(
					instance,
					fieldName,
					getDefaultValueForField( fieldName, instance.schema )
				);
			}
		}
	);
};

/**
 * Returns a plain object of the entity fields and values from this entity
 * instance prepared for use in an update request.
 *
 * @param {Object} instance
 * @return {Object} Plain object of field:value pairs.
 */
const forUpdate = ( instance ) => {
	return getBaseFieldsAndValuesForPersisting( instance );
};

/**
 * Returns a plain object of the entity fields and values from this entity
 * instance prepared for use in an insert request.
 *
 * @param {Object} instance
 * @return {Object} Plain object of field:value pairs.
 */
const forInsert = ( instance ) => {
	const entityValues = getBaseFieldsAndValuesForPersisting( instance );
	instance.primaryKeys.forEach( ( primaryKey ) => {
		entityValues[ primaryKey ] = instance[ primaryKey ];
	} );
	return entityValues;
};

/**
 * Returns a plain object of the entity fields and values from this entity
 * instance prepared for use in either an insert or update request.  The type
 * is automatically derived from the determining whether the entity is "new" or
 * not.
 *
 * @param {Object} instance
 * @return {Object} Plain object of field:value pairs.
 */
const forPersist = ( instance ) => {
	if ( instance.isNew ) {
		return forInsert( instance );
	}
	return forUpdate( instance );
};

/**
 * Creates getters for retrieving the fields and values of the entity instance
 * for insert or update requests.
 *
 * @param {Object} instance
 */
export const createPersistingGettersAndSetters = ( instance ) => {
	createGetter( instance, 'forUpdate', forUpdate );
	createGetter( instance, 'forInsert', forInsert );
	createGetter( instance, 'forPersist', forPersist );
};

/**
 * Creates initial entity field accessors.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*} fieldValue
 */
export const setInitialEntityFieldsAndValues = (
	instance,
	fieldName,
	fieldValue,
) => {
	createRawEntityGettersSetters(
		instance,
		fieldName,
		derivePreparedValueForField( fieldName, fieldValue, instance.schema )
	);
	createRenderedGetters(
		instance,
		fieldName,
		deriveRenderedValue( fieldValue )
	);
};

/**
 * Creates raw entity getters and setters.  These are the properties of an
 * entity that have the values used for not only getting but also setting.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*} fieldValue
 */
export const createRawEntityGettersSetters = (
	instance,
	fieldName,
	fieldValue,
) => {
	const opts = isPrimaryKeyField( fieldName, instance.schema ) ?
		{ configurable: true } :
		{};
	// this allows for private property holding the actual field value that can be changed via setter but NOT directly.
	createGetterAndSetter(
		instance,
		fieldName,
		fieldValue,
		opts
	);
	createFluentSetter( instance, fieldName );
	createAliasGettersSetters( instance, fieldName );
};

/**
 * Creates "alias" getters for fields on the entity instance.
 *
 * Example: Datetime entities have a `DTT_EVT_start` field.  On the entity
 * instance, you will be able to access the value of that field via:
 * - datetime.DTT_EVT_start
 * - datetime.dttEvtStart
 * - datetime.evtStart
 * - datetime.start
 *
 * @param {Object} instance
 * @param {string} fieldName
 */
export const createAliasGettersSetters = ( instance, fieldName ) => {
	// camelCase getter for full field name (eg. EVT_desc => evtDesc)
	createAliasGetterAndSetter( instance, fieldName, camelCase( fieldName ) );
	// strip field prefixes and camelCase (if there are field prefixes for the
	// entity. (eg. EVT_desc => desc);
	if ( instance.fieldPrefixes ) {
		let newFieldName = '';
		// Yes, its intended that if there are multiple prefixes, this could
		// end up creating multiple aliased getters (eg Datetime: DTT_EVT_start
		// would end up with `evtStart` and `start` as getter accessors).
		instance.fieldPrefixes.forEach( ( fieldPrefix ) => {
			newFieldName = fieldName.replace( fieldPrefix + '_', '' );
			if ( newFieldName !== fieldName ) {
				createAliasGetterAndSetter(
					instance,
					fieldName,
					camelCase( newFieldName )
				);
			}
		} );
	}
};

/**
 * Returns a callback that is used in the `getRendered` field getter.
 * @param {Object} instance
 * @return {function(string): *}  A callback.
 */
const getRenderedCallback = ( instance ) => ( requestedFieldName ) => instance[ requestedFieldName + 'Rendered' ];

/**
 * This creates the getters for the rendered property of model fields.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*}  fieldValue
 */
export const createRenderedGetters = ( instance, fieldName, fieldValue ) => {
	createGetter( instance, fieldName + 'Rendered', fieldValue );
	createGetter( instance, 'getRendered', getRenderedCallback( instance ) );
};

/**
 * Callback for the `hasMultiplePrimaryKeys` getter.
 *
 * @param {Object} instance
 * @return {function(): boolean} The callback for hasMultiplePrimaryKeys getter
 */
export const hasMultiplePrimaryKeysCallback = ( instance ) => () => {
	return instance.primaryKeys.length > 1;
};

/**
 * Creates getters for primary key related data.
 *
 * @param {Object} instance
 * @param {Array} primaryKeys
 */
export const createPrimaryKeyFieldGetters = ( instance, primaryKeys, ) => {
	if ( isArray( primaryKeys ) ) {
		createGetter(
			instance,
			'primaryKey',
			primaryKeys[ 0 ],
			{ configurable: true }
		);
		createGetterAndSetter(
			instance,
			'primaryKeys',
			primaryKeys,
			{ configurable: true },
		);
		createGetter(
			instance,
			'hasMultiplePrimaryKeys',
			hasMultiplePrimaryKeysCallback( instance ),
			{ configurable: true }
		);
	}
};

/**
 * @param {Object} instance
 * @return {function(string): boolean} Returns a callback for the
 * hasCalculatedField getter
 */
export const hasCalculatedFieldCallback = ( instance ) =>
	( fieldNameToCheck ) => ! isUndefined( instance[ fieldNameToCheck ] );

/**
 * Creates the getters for all the calculated fields and value on the entity.
 * @param {Object} instance
 * @param {Object.<string,*>}fieldsAndValues
 */
export const setCalculatedFieldAndValues = ( instance, fieldsAndValues ) => {
	forEach( fieldsAndValues, ( calculatedFieldValue, calculatedFieldName ) => {
		createGetter( instance, camelCase( calculatedFieldName ), calculatedFieldValue );
		createGetter( instance, 'hasCalculatedField', hasCalculatedFieldCallback( instance ) );
	} );
};

/**
 * Create getters for the various resource links on the entity.
 *
 * @param {Object} instance
 * @param {Object.<string,*>}fieldsAndValues
 */
export const setResources = ( instance, fieldsAndValues ) => {
	const relations = [];
	let relationName;
	forEach( fieldsAndValues, ( resourceValue, resourceName ) => {
		if ( resourceName === 'self' ) {
			createGetter( instance, 'resourceLink', resourceValue[ 0 ].href );
		} else if ( resourceName === 'collection' ) {
			createGetter( instance, 'collectionResourceLink', resourceValue[ 0 ].href );
		} else {
			relationName = getRelationNameFromLink( resourceName );
			relations.push( relationName );
			setRelationsResource( instance, relationName, resourceValue );
		}
	} );
	//set relations getter
	createGetter( instance, 'getRelations', relations );
};

/**
 * @param {Object} instance
 * @return {function(string): Object} Returns the callback for getting a
 * relation resource
 */
export const getRelationResourceCallback = ( instance ) => ( relationName ) => instance[ relationName ];

/**
 * Creates getters for the relations resource object.
 *
 * @param {Object} instance
 * @param {string} relationName
 * @param {Object.<string, string>} resourceInfo
 */
export const setRelationsResource = ( instance, relationName, resourceInfo ) => {
	createGetter(
		'instance',
		relationName,
		{
			resourceLink: resourceInfo[ 0 ].href,
			single: resourceInfo[ 0 ].single,
		}
	);
	createGetter( instance, 'getRelationResource', getRelationResourceCallback( instance ) );
};

/**
 * Sets the internal save state to the given value.
 *
 * @param {Object} instance
 * @param {string} saveState Expected to be one of SAVE_STATE constant values.
 */
export const setSaveState = ( instance, saveState ) => {
	const currentState = instance[ PRIVATE_PROPERTIES.SAVE_STATE ];
	switch ( saveState ) {
		case SAVE_STATE.DIRTY:
		case SAVE_STATE.NEW:
		case SAVE_STATE.CLEAN:
			instance[ PRIVATE_PROPERTIES.SAVE_STATE ] =
				currentState === SAVE_STATE.CLEAN ?
					saveState :
					currentState;
			break;
		default:
			throw new InvalidArgument(
				'Save state for entity can only be set to either ' +
				'SAVE_STATE.DIRTY, SAVE_STATE.NEW or SAVE_STATE.CLEAN'
			);
	}
};
