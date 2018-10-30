/**
 * External imports
 */
import {
	isArray,
	isInteger,
	isString,
	isPlainObject,
	isBoolean,
	isNumber,
} from 'lodash';
import { sprintf } from '@eventespresso/i18n';

/**
 * Internal Imports
 */
import { isEnumField, isPrimaryKeyField, isValueObjectField } from './booleans';
import { maybeConvertFromValueObjectWithAssertions } from './extractors';
import { PRIVATE_PROPERTIES, VALIDATE_TYPE } from './constants';

/**
 * Validates the incoming value for given type.  Types allowed are:
 *
 * - integer: checks if value is an integer.
 * - number: checks if value is classified as a Number primitive or object (this
 *   means `Infinity`, `-Infinity`, and `NaN` are considered valid for this type
 * - string
 * - object - this validates as a "plainObject", that is an object created by
 *   the Object constructor or one with a [[Prototype]] of null.
 * - boolean
 * - bool: (same as boolean check)
 * - null: value must explicitly be `null`
 *
 * Note: if the passed in type does not exist, then the value is considered
 * invalid.
 *
 * @param {string|Array} type  The type or types to check
 * @param {*} value  The value being validated
 * @return {boolean}  True means the value is valid for the given type.
 */
export const validateType = ( type, value ) => {
	let valid = false;
	// account for type definitions that are an array of allowed types.
	if ( isArray( type ) ) {
		for ( const singleType of type ) {
			valid = validateType( singleType, value );
			if ( valid ) {
				break;
			}
		}
		// return right away because we've determined the validity of the type.
		return valid;
	}
	switch ( type ) {
		case 'integer':
			valid = isInteger( value );
			break;
		case 'number':
			valid = isNumber( value );
			break;
		case 'string':
			valid = isString( value );
			break;
		case 'object':
			valid = isPlainObject( value );
			break;
		case 'boolean':
		case 'bool':
			valid = isBoolean( value );
			break;
		case 'null':
			valid = value === null;
			break;
	}
	return valid;
};

/**
 * This validates enum type of values.
 *
 * This means that the value must be one of the provided array of enumValues as
 * well as being of the expected type.
 *
 * @param {string} type
 * @param {Array} enumValues
 * @param {*} value
 * @return {boolean}  True means this value is valid.
 */
export const validateEnumType = ( type, enumValues, value ) => {
	return validateType( type, value ) &&
		isArray( enumValues ) &&
		enumValues.indexOf( value ) > -1;
};

/**
 * This method does a shallow validation for the given value and field.
 *
 * "Shallow" here means that if the field schema is of type 'object', then the
 * validation only verifies that the value is an object.  The object contents
 * are not validated.
 *
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} schema
 * @param {boolean} expectValueObjects  If true, then this flags the validator
 * to assume the value might be a value object and attempt to retrieve the raw
 * value from that value object for validation against the expected type in the
 * schema for that field.
 * @return {boolean}  True means the value is valid.
 * @throws TypeError
 * @throws InvalidDateTime
 */
export const isShallowValidValueForField = (
	fieldName,
	fieldValue,
	schema,
	expectValueObjects = true
) => {
	// if field is a primary Key field then we override the validation so it can
	// be either string or number
	if ( isPrimaryKeyField( fieldName, schema ) ) {
		return validateType( 'string', fieldValue ) ||
			validateType( 'number', fieldValue );
	}
	const isEnum = isEnumField( fieldName, schema );
	const isValueObject = isValueObjectField( fieldName, schema );
	fieldValue = expectValueObjects && isValueObject ?
		maybeConvertFromValueObjectWithAssertions(
			fieldName,
			fieldValue,
			schema
		) :
		fieldValue;
	fieldValue = expectValueObjects &&
			schema[ fieldName ].type === 'object' &&
			isValueObject ?
		{ raw: fieldValue } :
		fieldValue;
	const isValid = isEnum ?
		validateEnumType(
			schema[ fieldName ].type,
			schema[ fieldName ].enum,
			fieldValue
		) :
		validateType( schema[ fieldName ].type, fieldValue );
	// if isEnum and not valid, then lets bail with error
	if ( isEnum && ! isValid ) {
		throw new TypeError(
			sprintf(
				'The given "%s" fieldName is not valid for the defined ' +
				'schema.  It must be a "%s" and it must be one of "%s". ' +
				'The fieldValue given was "%s"',
				fieldName,
				schema[ fieldName ].enum.join(),
				fieldValue
			)
		);
	}
	return isValid;
};

/**
 * Returns what is set as the validateType for the given field and instance.
 *
 * @param {string} fieldName
 * @param {Object} instance
 * @return {string} The validation type for the given field and instance.
 */
export const validateTypeForField = ( fieldName, instance ) => {
	return instance[ PRIVATE_PROPERTIES.VALIDATE_TYPES ][ fieldName ] ?
		instance[ PRIVATE_PROPERTIES.VALIDATE_TYPES ][ fieldName ] :
		VALIDATE_TYPE.RAW;
};
