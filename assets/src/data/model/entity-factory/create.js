/**
 * External imports
 */
import {
	camelCase,
	upperFirst,
	forEach,
	isUndefined,
	isArray,
	keys,
	sortBy,
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
	deriveValidateTypeForField,
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
 * @param {Object} opts
 */
export const createCallbackGetter = (
	instance,
	propertyName,
	callBack,
	opts = {}
) => {
	Object.defineProperty( instance, propertyName, {
		get() {
			return callBack( instance );
		},
		...opts,
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
	opts = {},
) => {
	let propertyValue = initialFieldValue;
	Object.defineProperty( instance, fieldName, {
		get() {
			return propertyValue;
		},
		set( receivedValue ) {
			assertValidValueForPreparedField(
				fieldName,
				receivedValue,
				instance
			);
			setSaveState( instance, SAVE_STATE.DIRTY );
			setFieldToPersist( instance, fieldName );
			propertyValue = receivedValue;
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
 * @param {Object} opts
 */
export const createAliasGetterAndSetter = (
	instance,
	originalFieldName,
	aliasFieldName,
	opts = {},
) => {
	if ( originalFieldName !== aliasFieldName ) {
		Object.defineProperty( instance, aliasFieldName, {
			get() {
				return instance[ originalFieldName ];
			},
			set( receivedValue ) {
				return instance[ originalFieldName ] = receivedValue;
			},
			...opts,
		} );
	}
};

/**
 * A getter creator for a field alias.
 *
 * @param {Object} instance
 * @param {string} originalFieldName
 * @param {string} aliasFieldName
 * @param {Object} opts
 */
export const createAliasGetter = (
	instance,
	originalFieldName,
	aliasFieldName,
	opts = {},
) => {
	if ( originalFieldName !== aliasFieldName ) {
		Object.defineProperty( instance, aliasFieldName, {
			get() {
				return instance[ originalFieldName ];
			},
			...opts,
		} );
	}
};

/**
 * Creates a fluent setter on the provided instance for the given field name.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {Object} opts  Options for Object.defineProperty
 */
export const createFluentSetter = ( instance, fieldName, opts = {} ) => {
	Object.defineProperty( instance, 'set' + upperFirst( fieldName ), {
		get() {
			return ( receivedValue ) => {
				instance[ fieldName ] = receivedValue;
				return instance;
			};
		},
		...opts,
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
			const isPrimaryKey = isPrimaryKeyField( fieldName, instance.schema );
			setValidateTypeForField( instance, fieldName, fieldValue );
			if ( isEntityField( fieldName, instance.schema ) ) {
				if ( instance.isNew ) {
					assertValidValueForPreparedField(
						fieldName,
						fieldValue,
						instance
					);
				} else {
					assertValidFieldAndValueAgainstSchema(
						instance.modelName,
						fieldName,
						fieldValue,
						instance
					);
				}
				setInitialEntityFieldsAndValues(
					instance,
					fieldName,
					fieldValue,
					isPrimaryKey
				);
			}
			if ( fieldName === '_calculated_fields' ) {
				setCalculatedFieldAndValues( instance, fieldValue );
			}
			if ( fieldName === '_protected' ) {
				populateProtectedFieldsProperty( instance, fieldValue );
			}
			if ( fieldName === 'link' ) {
				createGetter( instance, 'link', fieldValue );
			}
			if ( fieldName === '_links' ) {
				setResources( instance, fieldValue );
			}
			if ( ! instance.isNew && isPrimaryKey ) {
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
 * Populates the `protectedFields` property on the instance.
 *
 * @param {Object} instance
 * @param {Array} protectedFields
 */
const populateProtectedFieldsProperty = ( instance, protectedFields ) => {
	// get any calculated protected fields.
	const calculatedFields = instance
		.originalFieldsAndValues
		._calculated_fields || {};
	if (
		calculatedFields._protected &&
		isArray( calculatedFields._protected )
	) {
		protectedFields = [
			...protectedFields,
			...calculatedFields._protected,
		];
	}
	createGetter( instance, 'protectedFields', protectedFields );
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
			{ configurable: true, enumerable: true }
		);
		createAliasGetterForField( instance, schemaField );
	} );
	createPrimaryKeyFieldGetters(
		instance,
		keys( primaryKeys )
	);
};

/**
 * Sets the validate type for a field property.
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*} fieldValue
 */
const setValidateTypeForField = ( instance, fieldName, fieldValue ) => {
	instance[ PRIVATE_PROPERTIES.VALIDATE_TYPES ][ fieldName ] =
		deriveValidateTypeForField( fieldName, fieldValue, instance.schema );
};

/**
 *  Populates missing fields and values using defaults provided by schema.  If
 *  schema doesn't provide a default then this will populate the field with a
 *  default value that matches the type.
 *
 * @param {Object} instance
 */
const populateMissingFields = ( instance ) => {
	if ( typeof instance.protectedFields === 'undefined' ) {
		populateProtectedFieldsProperty( instance, [] );
	}
	if ( ! instance.isNew ) {
		return;
	}
	forEach(
		getEntityFieldsFromSchema( instance ),
		( schemaProperties, fieldName ) => {
			if (
				typeof instance[ fieldName ] === 'undefined' &&
				! isPrimaryKeyField( fieldName, instance.schema )
			) {
				setInitialEntityFieldsAndValues(
					instance,
					fieldName,
					undefined,
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
	const entityValues = getBaseFieldsAndValuesForPersisting(
		instance,
		true
	);
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
	createCallbackGetter( instance, 'forUpdate', forUpdate );
	createCallbackGetter( instance, 'forInsert', forInsert );
	createCallbackGetter( instance, 'forPersist', forPersist );
};

/**
 * Creates initial entity field accessors.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {boolean} isPrimaryKey
 */
const setInitialEntityFieldsAndValues = (
	instance,
	fieldName,
	fieldValue,
	isPrimaryKey = false,
) => {
	if ( isUndefined( fieldValue ) ) {
		fieldValue = getDefaultValueForField( fieldName, instance.schema );
		setValidateTypeForField( instance, fieldName, fieldValue );
	}
	createRawEntityGettersSetters(
		instance,
		fieldName,
		derivePreparedValueForField( fieldName, fieldValue, instance ),
		isPrimaryKey
	);
	if ( ! isPrimaryKey ) {
		createRenderedGetters(
			instance,
			fieldName,
			deriveRenderedValue( fieldValue )
		);
	}
};

/**
 * Creates raw entity getters and setters.  These are the properties of an
 * entity that have the values used for not only getting but also setting.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {boolean} isPrimaryKey set to true if field is the model's primary key
 */
export const createRawEntityGettersSetters = (
	instance,
	fieldName,
	fieldValue,
	isPrimaryKey = false,
) => {
	const opts = { enumerable: true };
	// primary key is immutable
	if ( isPrimaryKey ) {
		createGetter(
			instance,
			fieldName,
			fieldValue,
			opts
		);
		createAliasGetterForField( instance, fieldName );
	} else {
		createGetterAndSetter(
			instance,
			fieldName,
			fieldValue,
			opts
		);
		createFluentSetter( instance, fieldName );
		createAliasGetterAndSetterForField( instance, fieldName );
	}
};

/**
 * Creates "alias" getter for the given field name on the entity instance.
 * @param {Object} instance
 * @param {string} fieldName
 */
export const createAliasGetterForField = ( instance, fieldName ) => {
	createAliasesForMethod( instance, fieldName, createAliasGetter );
};

/**
 * Creates "alias" getters and setters for the given field on the entity
 * instance.
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
export const createAliasGetterAndSetterForField = ( instance, fieldName ) => {
	createAliasesForMethod( instance, fieldName, createAliasGetterAndSetter );
};

/**
 * Creates Aliases using the provided method.
 * @param {Object} instance
 * @param {string} fieldName
 * @param {function} method
 */
const createAliasesForMethod = ( instance, fieldName, method ) => {
	// camelCase getter (or setter) for full field name (eg. EVT_desc => evtDesc)
	method( instance, fieldName, camelCase( fieldName ) );
	// strip field prefixes and camelCase (if there are field prefixes for the
	// entity. (eg. EVT_desc => desc);
	if ( instance.fieldPrefixes ) {
		let newFieldName = '';
		// Yes, its intended that if there are multiple prefixes, this could
		// end up creating multiple aliased getters (or setters)
		// (eg Datetime: DTT_EVT_start would end up with `evtStart` and `start`
		// as getter accessors).
		instance.fieldPrefixes.forEach( ( fieldPrefix ) => {
			newFieldName = fieldName.replace( fieldPrefix + '_', '' );
			if ( newFieldName !== fieldName ) {
				method(
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
const getRenderedCallback = ( instance ) => ( requestedFieldName ) =>
	instance[ requestedFieldName + 'Rendered' ];

/**
 * Returns a fieldName stripped of all possible prefixes.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @return {string} The prefix free fieldName.
 */
const removePrefixesFromField = ( instance, fieldName ) => {
	const prefixesToRemove = sortBy(
		instance.fieldPrefixes,
		( prefix ) => prefix.length * -1
	);
	let newFieldName = fieldName;
	forEach( prefixesToRemove, ( prefix ) => {
		newFieldName = fieldName.replace( prefix, '' );
		if ( newFieldName !== fieldName ) {
			return false;
		}
	} );
	return newFieldName;
};

/**
 * This creates the getters for the rendered property of model fields.
 *
 * @param {Object} instance
 * @param {string} fieldName
 * @param {*}  fieldValue
 */
export const createRenderedGetters = ( instance, fieldName, fieldValue ) => {
	createGetter(
		instance,
		camelCase( removePrefixesFromField( instance, fieldName ) ) +
		'Rendered',
		fieldValue
	);
	if ( isUndefined( instance.getRendered ) ) {
		createCallbackGetter(
			instance,
			'getRendered',
			getRenderedCallback,
		);
	}
};

/**
 * Callback for the `hasMultiplePrimaryKeys` getter.
 *
 * @param {Object} instance
 * @return {function(): boolean} The callback for hasMultiplePrimaryKeys getter
 */
const hasMultiplePrimaryKeysCallback = ( instance ) =>
	instance.primaryKeys.length > 1;

/**
 * Creates getters for primary key related data.
 *
 * @param {Object} instance
 * @param {Array} primaryKeys
 */
export const createPrimaryKeyFieldGetters = ( instance, primaryKeys ) => {
	const opts = { configurable: true };
	if ( isArray( primaryKeys ) ) {
		createGetter(
			instance,
			'primaryKey',
			primaryKeys[ 0 ],
			opts
		);
		createGetterAndSetter(
			instance,
			'primaryKeys',
			primaryKeys,
			opts
		);
		createCallbackGetter(
			instance,
			'hasMultiplePrimaryKeys',
			hasMultiplePrimaryKeysCallback,
			opts
		);
	}
};

/**
 * @param {Object} instance
 * @return {function(string): boolean} Returns a callback for the
 * hasCalculatedField getter
 */
const hasCalculatedFieldCallback = ( instance ) =>
	( fieldNameToCheck ) => ! isUndefined( instance[ fieldNameToCheck ] );

/**
 * Creates the getters for all the calculated fields and value on the entity.
 * @param {Object} instance
 * @param {Object.<string,*>}fieldsAndValues
 */
export const setCalculatedFieldAndValues = ( instance, fieldsAndValues ) => {
	forEach( fieldsAndValues, ( calculatedFieldValue, calculatedFieldName ) => {
		if ( calculatedFieldName !== '_protected' ) {
			createGetter(
				instance,
				camelCase( calculatedFieldName ),
				calculatedFieldValue
			);
		}
	} );
	createCallbackGetter(
		instance,
		'hasCalculatedField',
		hasCalculatedFieldCallback
	);
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
			createGetter(
				instance,
				'collectionResourceLink',
				resourceValue[ 0 ].href
			);
		} else {
			relationName = getRelationNameFromLink( resourceName );
			relations.push( relationName );
			setRelationsResource(
				instance,
				relationName + 'Resource',
				resourceValue
			);
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
const getRelationResourceCallback = ( instance ) =>
	( relationName ) => instance[ relationName.replace( 'Resource', '' ) ];

/**
 * Creates getters for the relations resource object.
 *
 * @param {Object} instance
 * @param {string} relationName
 * @param {Object.<string, string>} resourceInfo
 */
export const setRelationsResource = (
	instance,
	relationName,
	resourceInfo
) => {
	createGetter(
		instance,
		relationName,
		{
			resourceLink: resourceInfo[ 0 ].href,
			single: resourceInfo[ 0 ].single,
		}
	);
	if ( isUndefined( instance.getRelationResource ) ) {
		createCallbackGetter( instance,
			'getRelationResource',
			getRelationResourceCallback
		);
	}
};

/**
 * Sets the internal save state to the given value when current state is
 * SAVE_STATE.clean otherwise current save state is retained.
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

/**
 * Add the field name to the fieldToPersistOnInsert property on the instance
 * if it exists.
 *
 * @param {Object} instance
 * @param {string} fieldName
 */
export const setFieldToPersist = ( instance, fieldName ) => {
	if ( instance.fieldsToPersistOnInsert ) {
		instance.fieldsToPersistOnInsert.add( fieldName );
	}
};
