/**
 * External imports
 */
import { isUndefined } from 'lodash';
import { sprintf } from '@eventespresso/i18n';
import { InvalidSchema } from '@eventespresso/eejs';
import { isSchema } from '@eventespresso/validators';
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
	validateTypeForField,
} from './validators';
import { maybeConvertFromValueObjectWithAssertions } from './extractors';

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
	if ( ! isSchema( schema ) ) {
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
	if ( schema[ fieldName ].type === 'object' ) {
		if ( isUndefined( schema[ fieldName ].properties ) ) {
			throw new InvalidSchema(
				sprintf(
					'The schema for the field %s on the model %s is of type ' +
					'"object" but does not have a properties property.',
					fieldName,
					modelName
				)
			);
		}
		if ( isUndefined( schema[ fieldName ].properties.raw ) ) {
			throw new InvalidSchema(
				sprintf(
					'The schema for the field %s on the model %s is of type ' +
					'"object" but does not have a raw property in it\'s ' +
					'"properties" property.',
					fieldName,
					modelName
				)
			);
		}
		if ( isUndefined( schema[ fieldName ].properties.raw.type ) ) {
			throw new InvalidSchema(
				sprintf(
					'The schema for the field %s on the model %s is of type ' +
					'"object" and has a properties.raw property, however there' +
					'is no "type" defined for the raw property.',
					fieldName,
					modelName
				),
			);
		}
	}
};

/**
 * Asserts that the value provided for the prepared field is valid according to
 * the schema.
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
 * @param {Object} instance
 * @throws TypeError
 * @throws InvalidDateTime
 */
export const assertValidValueForPreparedField = (
	fieldName,
	fieldValue,
	instance,
) => {
	const { schema } = instance;
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
			validateType(
				schema[ fieldName ].properties.raw.type,
				maybeConvertFromValueObjectWithAssertions(
					fieldName,
					fieldValue,
					schema
				)
			);
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
 * This is used on entity construction and does not validate prepared field
 * values (see assert assertValidValueForPreparedField).
 *
 * This method also asserts that the schema has valid schema field properties.
 *
 * @param {string} modelName
 * @param {string} fieldName
 * @param {*} fieldValue
 * @param {Object} instance
 * @throws TypeError
 * @throws InvalidSchema
 */
export const assertValidFieldAndValueAgainstSchema = (
	modelName,
	fieldName,
	fieldValue,
	instance,
) => {
	const schema = instance.schema;
	const validationType = validateTypeForField( fieldName, instance );
	assertValidSchemaFieldProperties( modelName, fieldName, schema );
	let isValid = isShallowValidValueForField(
		fieldName,
		fieldValue,
		schema,
		false,
	);
	// account for fieldName fieldValues that have property schema. For Model
	// Entities, only the VALIDATE_TYPE property is cared about.
	if ( schema[ fieldName ].type === 'object' &&
		schema[ fieldName ].properties
	) {
		if ( isUndefined( fieldValue[ validationType ] ) ) {
			throw new TypeError(
				sprintf(
					'The given "%1$s" value is not valid for the defined ' +
					'schema. It must be an object and it must have a ' +
					'`%2$s` key.',
					fieldName,
					validationType,
				),
			);
		}
		isValid = schema[ fieldName ].properties[ validationType ].enum ?
			validateEnumType(
				schema[ fieldName ].properties[ validationType ].type,
				schema[ fieldName ].properties.raw.enum,
				fieldValue[ validationType ],
			) :
			validateType(
				schema[ fieldName ].properties[ validationType ].type,
				fieldValue[ validationType ]
			);
		if ( ! isValid ) {
			throw new TypeError(
				sprintf(
					'The given "%1$s" value is not valid for the defined ' +
					'schema.  It\'s `%2$s` property value (%3$s) is not ' +
					'the correct expected type (%4$s).',
					fieldName,
					validationType,
					fieldValue,
					schema[ fieldName ].properties[ validationType ].type,
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
