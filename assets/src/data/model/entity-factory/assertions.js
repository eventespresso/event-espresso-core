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

export const maybeAssertValueObject = ( fieldName, fieldValue, schema ) => {
	if ( isDateTimeField( fieldName, schema ) ) {
		DateTime.assertIsDateTime( fieldValue );
	}
	if ( isMoneyField( fieldName, schema ) ) {
		Money.assertMoney( fieldValue );
	}
};

export const assertValidSchema = ( schema ) => {
	if ( isUndefined( schema.properties ) ) {
		throw new InvalidSchema();
	}
};

export const assertValidSchemaFieldProperties = ( modelName, fieldName, schema ) => {
	if ( isUndefined( schema[ fieldName ] ) ) {
		throw new TypeError(
			sprintf(
				'The given "%s" fieldName does not have a defined schema ' +
				'for the model "%s"',
				fieldName,
				modelName
			)
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
				fieldName
			)
		);
	}
};

export const assertValidValueForPreparedField = ( fieldName, fieldValue, schema ) => {
	let isValid = isShallowValidValueForField(
		fieldName,
		fieldValue,
		schema
	);
	if ( schema[ fieldName ].type === 'object' &&
		schema[ fieldName ].properties
	) {
		isValid = schema[ fieldName ].properties.raw.enum ?
			validateEnumType(
				schema[ fieldName ].properties.raw.type,
				schema[ fieldName ].properties.raw.enum,
				fieldValue
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
					schema[ fieldName ].properties.raw.type
				)
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
				schema[ fieldName ].type
			)
		);
	}
};

export const assertValidFieldAgainstSchema = ( modelName, fieldName, fieldValue, schema ) => {
	assertValidSchemaFieldProperties( modelName, fieldName, schema );
	let isValid = isShallowValidValueForField(
		fieldName,
		fieldValue,
		schema,
		false
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
					'The given "%1$s" field is not valid for the defined ' +
					'schema. It must be an object and it must have a ' +
					'`raw` key.',
					fieldName,
				)
			);
		}
		isValid = schema[ fieldName ].properties.raw.enum ?
			validateEnumType( schema[ fieldName ].properties.raw.type,
				schema[ fieldName ].properties.raw.enum,
				fieldValue.raw
			) :
			validateType( schema[ fieldName ].properties.raw.type, fieldValue );
		if ( ! isValid ) {
			throw new TypeError(
				sprintf(
					'The given "%1$s" field is not valid for the defined ' +
					'schema.  It\'s `raw` property fieldValue (%2$s) is not ' +
					'the correct expected type (%3$s).',
					fieldName,
					fieldValue,
					schema[ fieldName ].properties.raw.type
				)
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
				schema[ fieldName ].type
			)
		);
	}
};
