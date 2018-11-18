/**
 * External imports
 */
import {
	isPlainObject,
	camelCase,
	last,
	reduce,
	pick,
	pickBy,
	isArray,
} from 'lodash';

/**
 * Internal imports
 */
import {
	Money,
	SiteCurrency,
	ServerDateTime as DateTime,
} from '../../../vo';

import {
	hasRawProperty,
	hasPrettyProperty,
	hasRenderedProperty,
	isDateTimeField,
	isMoneyField,
	isPrimaryKeyField,
	isEntityField,
} from './booleans';
import { maybeAssertValueObject } from './assertions';
import { validateTypeForField } from './validators';
import { VALIDATE_TYPE } from './constants';

/**
 * This receives a field name, it's value and the schema and converts it to the
 * related value object IF the schema indicates it is of a type that there is a
 * known value object for.
 *
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} schema
 * @return {DateTime|Money|*}  If this is not a value object, the original field
 * value is returned.
 */
export const maybeConvertToValueObject = ( fieldName, fieldValue, schema ) => {
	if (
		isDateTimeField( fieldName, schema ) &&
		! DateTime.validateIsDateTime( fieldValue )
	) {
		return DateTime.fromISO( fieldValue );
	}
	if (
		isMoneyField( fieldName, schema ) &&
		! ( fieldValue instanceof Money )
	) {
		return new Money( fieldValue, SiteCurrency );
	}
	// if more VOs get added, then instead of adding more if else blocks
	// to this function and the ones below, all VO logic should be extracted
	// into some kind of  ValueObjectExtractor object that would hold all of
	// the necessary callbacks for managing the detection of VO fields and
	// conversion of data to and from the various VOs
	// plz see:
	// https://github.com/eventespresso/event-espresso-core/pull/637/files#r228690789
	return fieldValue;
};

/**
 * This converts the incoming value for a field to its equivalent "raw" value
 * from a value object if it is a value object.  Otherwise it just returns the
 * original incoming value.  This also asserts that if the provided field is
 * expected to be a value object that the incoming value IS a valid value object
 * and it is the expected instance of a value object.
 *
 * @param {string} fieldName
 * @param {*|Money|DateTime} fieldValue
 * @param {Object} schema
 * @return {string|number|*}  If the value is not a value object, returns the
 * original value
 */
export const maybeConvertFromValueObjectWithAssertions = (
	fieldName,
	fieldValue,
	schema
) => {
	maybeAssertValueObject( fieldName, fieldValue, schema );
	if ( isDateTimeField( fieldName, schema ) ) {
		DateTime.assertIsDateTime( fieldValue );
		fieldValue = fieldValue.toISO();
	} else if ( isMoneyField( fieldName, schema ) ) {
		Money.assertMoney( fieldValue );
		fieldValue = fieldValue.toNumber();
	}
	return fieldValue;
};

/**
 * This converts the incoming value for a field to its equivalent "raw" value
 * if the incoming value  is a value object.  Otherwise it just returns the
 * original incoming value.
 *
 * @param {*|DateTime|Money}fieldValue
 * @return {*} The raw value for the value object or the original value.
 */
export const maybeConvertFromValueObject = ( fieldValue ) => {
	if ( DateTime.validateIsDateTime( fieldValue ) ) {
		fieldValue = fieldValue.toISO();
	} else if ( fieldValue instanceof Money ) {
		fieldValue = fieldValue.toNumber();
	}
	return fieldValue;
};

/**
 * This derives the "prepared" value for the given field and value.
 *
 * "Prepared" means:
 *
 * - converting to a value object if this is a field that there are defined
 *   value objects for.
 * - retrieving the "raw" value from field values that have `raw` and `rendered`
 *   or `pretty` properties.
 *
 * @param {string} fieldName
 * @param {*}  fieldValue
 * @param {Object} instance
 * @return {DateTime|Money|*}  Returns the original incoming value if it does
 * not have a raw equivalent or is not a value object.
 */
export const derivePreparedValueForField = (
	fieldName,
	fieldValue,
	instance
) => {
	const validationType = validateTypeForField( fieldName, instance );
	fieldValue = isPlainObject( fieldValue ) ?
		fieldValue[ validationType ] :
		fieldValue;
	return maybeConvertToValueObject( fieldName, fieldValue, instance.schema );
};

/**
 * This returns the "rendered" or "pretty" equivalent from a value if it exists
 * as a property on it.
 *
 * @param {*} value
 * @return {*}  The original value is returned if its not a plain object or if
 * it has no `rendered` or `pretty` property.  However, if it is a plain object
 * and has no pretty/rendered properties but DOES have a raw property, then that
 * is returned.
 */
export const deriveRenderedValue = ( value ) => {
	if ( ! isPlainObject( value ) ) {
		return value;
	}
	value = hasPrettyProperty( value ) ? value.pretty : value;
	value = hasRenderedProperty( value ) ? value.rendered : value;
	return hasRawProperty( value ) ? value.raw : value;
};

/**
 * Returns the name of a resource from the given `resourceLink`.
 *
 * eg. "https://api.eventespresso.com/registration" will return 'registration';

 * @param {string} resourceLink
 * @return {string} Returns the name of the resource from a provided resource
 * link.
 */
export const getRelationNameFromLink = ( resourceLink ) => {
	return camelCase( last( resourceLink.split( '/' ) ) );
};

/**
 * Returns a plain object containing the entity field name and values from the
 * provided entity instance
 * @param {Object} entityInstance
 * @return {Object} A plain object
 */
export const getBaseFieldsAndValuesForPersisting = ( entityInstance ) => {
	return reduce( entityInstance.originalFieldsAndValues, (
		fieldsAndValues,
		originalFieldValue,
		fieldName
	) => {
		if (
			isEntityField( fieldName, entityInstance.schema ) &&
			! isPrimaryKeyField( fieldName, entityInstance.schema )
		) {
			fieldsAndValues[ fieldName ] = maybeConvertFromValueObject(
				entityInstance[ fieldName ],
			);
			return fieldsAndValues;
		}
	}, {} );
};

/**
 * Returns the primary key(s) and values for the given entityInstance
 *
 * @param {Object} entityInstance
 * @return {Object} an array of values for the primary keys.
 */
export const getPrimaryKeyValues = ( entityInstance ) => pick(
	entityInstance,
	entityInstance.primaryKeys
);

/**
 * This returns a plain object of entity fields from the schema for the entity
 * instance (schema for fields are extracted as well).
 *
 * @param {Object} entityInstance
 * @return {Object} A plain object with fields and schema properties that are
 * entity properties.
 */
export const getEntityFieldsFromSchema = ( entityInstance ) => pickBy(
	entityInstance.schema,
	( fieldValue, fieldName ) => isEntityField(
		fieldName,
		entityInstance.schema
	)
);

/**
 * This returns a plain object of extracted primaryKey fields from the schema
 * for the entity instance.
 *
 * @param {Object} entityInstance
 * @return {Object} A plain object with fields and schema properties that
 * 					represent primary key fields.
 */
export const getPrimaryKeyFieldsFromSchema = ( entityInstance ) => pickBy(
	entityInstance.schema,
	( fieldValue, fieldName ) => isPrimaryKeyField(
		fieldName,
		entityInstance.schema
	)
);

/**
 * Derives the default value to use for a given type.
 *
 * @param {string} type
 * @return {*}  A value to use for the given type.
 */
export const deriveDefaultValueForType = ( type ) => {
	if ( isArray( type ) ) {
		return type.indexOf( 'null' ) > -1 ?
			null :
			deriveDefaultValueForType( type[ 0 ] );
	}
	switch ( type ) {
		case 'string':
			return '';
		case 'number':
		case 'integer':
			return 0;
		case 'null':
		case 'object':
			return null;
		case 'boolean':
		case 'bool':
			return false;
		case 'date-time':
			return ( new Date() ).toISOString();
	}
	return null;
};

/**
 * Derives what `type` a field is from the schema.
 * It accounts for cases where the "type" of a field might be `date-time` or
 * where the type is an object and thus the `type` for the purposes of model
 * entities is defined by the `raw` property for the field.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {*}  What type the filed is.
 */
export const deriveTypeForField = ( fieldName, schema ) => {
	if ( isDateTimeField( fieldName, schema ) ) {
		return 'date-time';
	}
	if ( schema[ fieldName ] && schema[ fieldName ].type ) {
		if ( schema[ fieldName ].type === 'object' ) {
			if (
				schema[ fieldName ].properties &&
				hasRawProperty( schema[ fieldName ].properties )
			) {
				return schema[ fieldName ].properties.raw.type ?
					schema[ fieldName ].properties.raw.type :
					null;
			}
			return null;
		}
		return schema[ fieldName ].type;
	}
	return null;
};

/**
 * This derives the validate type from the incoming field and value according
 * to the schema and incoming value.
 *
 * This accounts for the fact that entities may be constructed from the
 * following contexts:
 *
 * 1. Authed REST response (which could have both raw, rendered or pretty
 *    values in the field value).
 * 2. Non-authed REST response (which will not have a raw value, but could have
 *    a pretty or rendered value).  This is potentially problematic if the
 *    rendered or pretty value is of a different data type than the raw value.
 * 3. New entities built client side, which will be assumed to be prepared
 *    against the "raw" validate type.
 *
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} schema
 * @return {Symbol}  The validate type for the field.
 */
export const deriveValidateTypeForField = ( fieldName, fieldValue, schema ) => {
	if ( hasRawProperty( fieldValue ) ) {
		return VALIDATE_TYPE.RAW;
	}
	if ( schema[ fieldName ] && schema[ fieldName ].type ) {
		if (
			schema[ fieldName ].type === 'object' &&
			isPlainObject( fieldValue )
		) {
			return hasRenderedProperty( fieldValue ) ?
				VALIDATE_TYPE.RENDERED :
				VALIDATE_TYPE.PRETTY;
		}
	}
	return VALIDATE_TYPE.RAW;
};

/**
 * This gets the default value for a field from the provided schema.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {*} The default value for the field from the schema or if not
 * present in the schema, a derived default value from the schema type.
 */
export const getDefaultValueForField = ( fieldName, schema ) => {
	if ( schema[ fieldName ] ) {
		return schema[ fieldName ].default ?
			schema[ fieldName ].default :
			deriveDefaultValueForType( schema[ fieldName ].type );
	}
	return null;
};
