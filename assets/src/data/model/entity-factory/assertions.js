/**
 * External imports
 */
import { isUndefined } from 'lodash';
import { sprintf } from '@eventespresso/i18n';
import { InvalidSchema } from '@eventespresso/eejs';
/**
 * Internal imports
 */
import {
	isDateTimeField,
	isMoneyField,
} from './booleans';
import { Money, ServerDateTime as DateTime } from '../../../vo';
import {
	isShallowValidValueForField,
	validateEnumType,
	validateType,
} from './validators';

/**
 * Asserts whether the provided field value is a known value object.
 *
 * Note: this only asserts known value objects, if the value is not detected as
 * a known value object it is passed back as is.
 *
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} schema
 * @throws InvalidDateTime
 * @throws TypeError
 */
export const maybeAssertValueObject = ( fieldName, fieldValue, schema ) => {
	if ( isDateTimeField( fieldName, schema ) ) {
		DateTime.assertIsDateTime( fieldValue );
	}
	if ( isMoneyField( fieldName, schema ) ) {
		Money.assertMoney( fieldValue );
	}
};

/**
 * Asserts whether the provided object is a valid model schema object.
 *
 * Currently, an object is considered a valid model schema if it has a
 * 'properties' property.
 *
 * @param {*} schema
 * @throws InvalidSchema
 */
export const assertValidSchema = ( schema ) => {
	if ( isUndefined( schema.properties ) ) {
		throw new InvalidSchema(
			'This is an invalid schema for a model.',
		);
	}
};

/**
 * Asserts that the given field exists in the provided schema and the shape for
 * the schema entry on that field is expected.
 *
 * @param {string} modelName  The model the schema belongs to, this is used for
 * error messages.
 * @param {string} fieldName  The field being checked against the schema
 * @param {Object} schema     The schema for the model used for validation
 * @throws InvalidSchema
 * @throws TypeError
 */
export const assertValidSchemaFieldProperties = (
	modelName,
	fieldName,
	schema,
) => {
	if ( isUndefined( schema[ fieldName ] ) ) {
		throw new TypeError(
			sprintf(
				'The given "%s" fieldName does not have a defined schema ' +
				'for the model "%s"',
				fieldName,
				modelName,
			),
		);
	}
	if ( schema[ fieldName ].type === 'object' &&
		schema[ fieldName ].properties &&
		isUndefined( schema[ fieldName ].properties.raw ) &&
		isUndefined( schema[ fieldName ].properties.raw.type )
	) {
		throw new InvalidSchema(
			sprintf(
				'This schema has a properties object, however the fieldName ' +
				'(%s) also has a properties object but no "raw" ' +
				'property. Model Entities operate expecting `raw` fieldName ' +
				'properties when a fieldName value is a plain object.',
				fieldName,
			),
		);
	}
};

/**
 * Asserts that the value provided for the field is of valid according to the
 * schema.
 *
 * Prepared fields are:
 *
 * - fields having values that are set as a value object and expect a value
 *   object on updates/inserts.
 * - fields that are the equivalent `raw` value when the field in the schema is
 *   defined to have raw and rendered/pretty values.
 *
 * Note:  This validates against prepared fields which means that:
 *
 * - if the prepared field has a value object as its value, then that value
 *   object is validated before any other validation.
 * - if the prepared field represents an object in the schema, then its value is
 *   validated against the `raw` type in the schema.
 *
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} schema
 * @throws TypeError
 * @throws InvalidDateTime
 */
export const assertValidValueForPreparedField = (
	fieldName,
	fieldValue,
	schema,
) => {
	let isValid = isShallowValidValueForField(
		fieldName,
		fieldValue,
		schema,
	);
	if ( ! isValid && schema[ fieldName ].type === 'object' &&
		schema[ fieldName ].properties
	) {
		isValid = schema[ fieldName ].properties.raw.enum ?
			validateEnumType(
				schema[ fieldName ].properties.raw.type,
				schema[ fieldName ].properties.raw.enum,
				fieldValue,
			) :
			validateType( schema[ fieldName ].properties.raw.type, fieldValue );
		if ( ! isValid ) {
			throw new TypeError(
				sprintf(
					'The given "%1$s" field  is not valid for the defined ' +
					'schema.  It\'s `raw` property Value (%2$s) is not ' +
					'the correct expected type (%3$s).',
					fieldName,
					fieldValue,
					schema[ fieldName ].properties.raw.type,
				),
			);
		}
	}
	if ( ! isValid ) {
		throw new TypeError(
			sprintf(
				'The given "%1$s" field\'s Value (%2$s) is not valid for' +
				' the defined schema type (%3$s).',
				fieldName,
				fieldValue,
				schema[ fieldName ].type,
			),
		);
	}
};

/**
 * Asserts whether the value for the given field is valid according to the
 * schema.
 *
 * @param {string} modelName
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} schema
 * @throws TypeError
 * @throws InvalidSchema
 */
export const assertValidFieldAndValueAgainstSchema = (
	modelName,
	fieldName,
	fieldValue,
	schema,
) => {
	assertValidSchemaFieldProperties( modelName, fieldName, schema );
	let isValid = isShallowValidValueForField(
		fieldName,
		fieldValue,
		schema,
		false,
	);
	// account for fieldName fieldValues that have property schema. For Model
	// Entities, only the `raw` property is cared about.  Not the `pretty`.
	// Schema has already been validated for having a "raw" definition.
	if ( schema[ fieldName ].type === 'object' &&
		schema[ fieldName ].properties
	) {
		if ( isUndefined( fieldValue.raw ) ) {
			throw new TypeError(
				sprintf(
					'The given "%1$s" value is not valid for the defined ' +
					'schema. It must be an object and it must have a ' +
					'`raw` key.',
					fieldName,
				),
			);
		}
		isValid = schema[ fieldName ].properties.raw.enum ?
			validateEnumType( schema[ fieldName ].properties.raw.type,
				schema[ fieldName ].properties.raw.enum,
				fieldValue.raw,
			) :
			validateType( schema[ fieldName ].properties.raw.type, fieldValue );
		if ( ! isValid ) {
			throw new TypeError(
				sprintf(
					'The given "%1$s" value is not valid for the defined ' +
					'schema.  It\'s `raw` property value (%2$s) is not ' +
					'the correct expected type (%3$s).',
					fieldName,
					fieldValue,
					schema[ fieldName ].properties.raw.type,
				),
			);
		}
	}
	if ( ! isValid ) {
		throw new TypeError(
			sprintf(
				'The given "%1$s" field\'s value (%2$s) is not valid for' +
				' the defined schema type (%3$s).',
				fieldName,
				fieldValue,
				schema[ fieldName ].type,
			),
		);
	}
};
