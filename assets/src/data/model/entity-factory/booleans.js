/**
 * External imports
 */
import { isPlainObject } from 'lodash';

/**
 * Indicates whether the provided value has a "raw" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has a `raw` property.
 */
export const hasRawProperty = ( value ) => isPlainObject( value ) && value.raw;

/**
 * Indicates whether the provided value has a "pretty" property.
 *
 * @param {*} value
 * @return {*} True if the value is a plain object and has a `pretty` property.
 */
export const hasPrettyProperty = ( value ) => isPlainObject( value ) &&
	value.pretty;

/**
 * Indicates whether the provided value has a "rendered" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has a `rendered` property.
 */
export const hasRenderedProperty = ( value ) => isPlainObject( value ) &&
	value.rendered;

/**
 * Indicates whether the provided value has a "format" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has a `format` property.
 */
export const hasFormatProperty = ( value ) => isPlainObject( value ) &&
	value.format;

/**
 * Indicates whether the provided value has a "enum" property.
 *
 * @param {*} value
 * @return {boolean} True if the value is a plain object and has an enum
 * property.
 */
export const hasEnumProperty = ( value ) => isPlainObject( value ) &&
	value.enum;

/**
 * Indicates whether the provided field is a date-time field according to the
 * provided schema.
 *
 * @param {string} field
 * @param {Object} schema
 * @return {boolean} True means it is a date-time field.
 */
export const isDateTimeField = ( field, schema ) => schema[ field ] &&
	hasFormatProperty( schema[ field ] ) &&
	schema[ field ].format === 'date-time';

/**
 * Indicates whether the provided field is a UTC date-time field.
 *
 * If schema is provided, this also considers whether this is a date-time field.
 *
 * @param {string} dateTimeFieldName
 * @param {Object} schema [optional]
 * @return {boolean} True means this is a UTC field.  If schema is provided it
 * means this is also a date-time field.
 */
export const isUTCDateTimeField = ( dateTimeFieldName, schema = null ) => {
	return schema !== null ?
		isDateTimeField( dateTimeFieldName, schema ) &&
			dateTimeFieldName.indexOf( '_gmt' ) > -1 :
		dateTimeFieldName.indexOf( '_gmt' ) > -1;
};

/**
 * Returns whether the provided field represents a primary key field using the
 * provided schema.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean}  True means it is a primary key field.
 */
export const isPrimaryKeyField = ( fieldName, schema ) => schema[ fieldName ] &&
	schema[ fieldName ].primary_key;

/**
 * Returns whether the provided field represents a readonly field using the
 * provided schema.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean}  True means it is a readonly field.
 */
export const isReadOnly = ( fieldName, schema ) => schema[ fieldName ] &&
	schema[ fieldName ].readonly;

/**
 * Indicates whether the provided field is a "entity" field using the provided
 * schema.
 *
 * An "entity" field is any field that satisfies the following conditions:
 *
 * - field exists in the schema
 * - it is not readonly or is a primary key field.
 * - it is not a utc field.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean} True if this is an entity field
 */
export const isEntityField = ( fieldName, schema ) => schema[ fieldName ] &&
	( ! isReadOnly( fieldName, schema ) ||
		isPrimaryKeyField( fieldName, schema )
	) &&
	! isUTCDateTimeField( fieldName );

/**
 * Indicates whether the field represents a value of money from the provided
 * schema.
 *
 * A field is a money field if the following conditions are satisfied:
 *
 * - It exists in the schema
 * - It has a pretty property
 * - The pretty property value has a format property.
 * - The format property is equal to 'money'
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean} True if it is a money field.
 */
export const isMoneyField = ( fieldName, schema ) => schema[ fieldName ] &&
	schema[ fieldName ].properties &&
	hasPrettyProperty( schema[ fieldName ].properties ) &&
	hasFormatProperty( schema[ fieldName ].properties.pretty ) &&
	schema[ fieldName ].properties.pretty.format === 'money';

/**
 * Indicates whether the field is an enum type field as defined in the provided
 * schema.
 *
 * Note: this only evaluates the top-level for the field schema.  If the field
 * in the schema is of type 'object' and one of the object properties is of type
 * 'enum' this will not consider it an "enum" field.
 *
 * @param {string} fieldName
 * @param {Object} schema
 * @return {boolean}  True if the field is an enum type field.
 */
export const isEnumField = ( fieldName, schema ) => schema[ fieldName ] &&
	hasEnumProperty( schema[ fieldName ] ) &&
	schema[ fieldName ].enum.length;
