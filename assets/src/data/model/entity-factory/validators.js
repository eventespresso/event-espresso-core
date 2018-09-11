/**
 * External imports
 */
import {
	isArray,
	isInteger,
	isString,
	isPlainObject,
	isBoolean,
} from 'lodash';
import { sprintf } from '@eventespresso/i18n';

/**
 * Internal Imports
 */
import { isEnumField } from './booleans';
import { maybeConvertFromValueObject } from './extractors';

export const validateType = ( type, value ) => {
	let valid = true;
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
		case 'number':
			valid = isInteger( value );
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
};

export const validateEnumType = ( type, enumValues, value ) => {
	return validateType( type, value ) &&
		enumValues.indexOf( value ) > -1;
};

export const isShallowValidValueForField = (
	fieldName,
	fieldValue,
	schema,
	expectValueObjects = true
) => {
	const isEnum = isEnumField( fieldName, schema );
	fieldValue = expectValueObjects ?
		maybeConvertFromValueObject( fieldValue ) :
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
