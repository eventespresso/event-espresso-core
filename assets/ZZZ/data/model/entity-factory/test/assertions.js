/**
 * External imports
 */
import { InvalidSchema } from '@eventespresso/eejs';
import { DateTime, Money, SiteCurrency } from '@eventespresso/value-objects';
import {
	EventSchema,
	RegistrationSchemaProperties,
	EventSchemaProperties,
} from '@test/fixtures';

/**
 * Internal imports
 */
import {
	maybeAssertValueObject,
	assertValidSchema,
	assertValidSchemaFieldProperties,
	assertValidValueForPreparedField,
	assertValidFieldAndValueAgainstSchema,
} from '../assertions';
import { PRIVATE_PROPERTIES, VALIDATE_TYPE } from '../constants';

describe( 'Testing assertions for model-entity factory.', () => {
	const getMockInstance = ( schema, validationType ) => {
		return {
			schema,
			[ PRIVATE_PROPERTIES.VALIDATE_TYPES ]: validationType,
		};
	};
	describe( 'maybeAssertValueObject()', () => {
		const assertTest = ( fieldName, fieldValue, schema ) => () =>
			maybeAssertValueObject( fieldName, fieldValue, schema );
		const tests = [
			[
				'Does not throw exception for field not in schema',
				'bogusField',
				'bogusValue',
				EventSchemaProperties,
				null,
			],
			[
				'Throws TypeError error for datetime field with invalid value.',
				'EVT_visible_on',
				'invalidDate',
				EventSchemaProperties,
				TypeError,
			],
			[
				'Throws TypeError error for money field with invalid value',
				'REG_final_price',
				'24',
				RegistrationSchemaProperties,
				TypeError,
			],
			[
				'Does not throw exception for valid field that is not a ' +
				'value object',
				'EVT_desc',
				'Some description',
				EventSchemaProperties,
				null,
			],
			[
				'Does not throw exception for datetime field with ' +
				'valid DateTime value object as value',
				'EVT_visible_on',
				DateTime.fromJSDate( new Date() ),
				EventSchemaProperties,
				null,
			],
			[
				'Does not throw exception for money field with ' +
				'valid Money value object as value',
				'REG_final_price',
				new Money( 1.25, SiteCurrency ),
				RegistrationSchemaProperties,
				null,
			],
		];
		tests.forEach( ( [
			description,
			fieldName,
			fieldValue,
			schema,
			expectedException,
		] ) => {
			it( description, () => {
				if ( expectedException === null ) {
					expect( assertTest( fieldName, fieldValue, schema ) )
						.not.toThrow();
				} else {
					expect( assertTest( fieldName, fieldValue, schema ) )
						.toThrow( expectedException );
				}
			} );
		} );
	} );
	describe( 'assertValidSchema()', () => {
		const testRunner = ( schema ) => () => assertValidSchema( schema );
		it( 'Throws an error with invalid schema.', () => {
			expect( testRunner( {} ) ).toThrow( InvalidSchema );
		} );
		it( 'Does not throw an error with valid schema.', () => {
			expect( testRunner( EventSchema.schema ) ).not.toThrow();
		} );
	} );
	describe( 'assertValidSchemaFieldProperties()', () => {
		const assertTest = (
			modelName,
			fieldName,
			schema
		) => () => assertValidSchemaFieldProperties(
			modelName,
			fieldName,
			schema
		);
		const tests = [
			[
				'Throws TypeError for field not found in schema.',
				'invalid_field',
				EventSchemaProperties,
				TypeError,
			],
			[
				'Throws InvalidSchema error for schema that has field in the ' +
				'schema, but the type for that field is "object", and there ' +
				'is no "properties" property in the schema.',
				'EVT_desc',
				{
					EVT_desc: {
						type: 'object',
					},
				},
				InvalidSchema,
			],
			[
				'Throws InvalidSchema error for schema that has field in the ' +
				'schema, but the type for that field is "object", and there ' +
				'is no "properties.raw" property in the schema.',
				'EVT_desc',
				{
					EVT_desc: {
						type: 'object',
						properties: {},
					},
				},
				InvalidSchema,
			],
			[
				'Throws InvalidSchema error for schema that has field in the ' +
				'schema, but the type for that field is "object", and ' +
				'although there is a "properties.raw" property in the schema, ' +
				'the "raw" property does not have a "type" property defined.',
				'EVT_desc',
				{
					EVT_desc: {
						type: 'object',
						properties: {
							raw: {},
						},
					},
				},
				InvalidSchema,
			],
			[
				'Does not throw any errors for a valid schema for the field',
				'EVT_desc',
				EventSchemaProperties,
				null,
			],
		];
		tests.forEach( ( [
			description,
			fieldName,
			schema,
			expectedException,
		] ) => {
			it( description, () => {
				if ( expectedException === null ) {
					expect( assertTest( 'Event', fieldName, schema ) )
						.not
						.toThrow();
				} else {
					expect( assertTest( 'Event', fieldName, schema ) )
						.toThrow( expectedException );
				}
			} );
		} );
	} );
	describe( 'assertValidValueForPreparedField()', () => {
		const assertTest = (
			fieldName,
			fieldValue,
			schema,
			validationType = VALIDATE_TYPE.RAW,
		) => () => assertValidValueForPreparedField(
			fieldName,
			fieldValue,
			getMockInstance( schema, { [ fieldName ]: validationType } )
		);
		const tests = [
			[
				'Throws a TypeError when a provided primitive value is not ' +
				'of the correct type for the provided field.',
				'EVT_name',
				10,
				EventSchemaProperties,
				TypeError,
			],
			[
				'Throws an InvalidDateTime error when the provided value for ' +
				'a DateTime field is not an instance of DateTime value object',
				'EVT_visible_on',
				'invalid datetime',
				EventSchemaProperties,
				TypeError,
			],
			[
				'Throws a TypeError when the provided value for a Money ' +
				'field is not an instance of the Money value object',
				'REG_final_price',
				0,
				RegistrationSchemaProperties,
				TypeError,
			],
			[
				'Throws a TypeError when a provided primitive value on a ' +
				'object type field does not match the expected type for the ' +
				'raw property schema for that object',
				'EVT_desc',
				10,
				EventSchemaProperties,
				TypeError,
			],
			[
				'Does not throw an error when the provided primitive value ' +
				'is of the correct type for the field.',
				'EVT_name',
				'Some title.',
				EventSchemaProperties,
				null,
			],
			[
				'Does not throw an error when the provided DateTime value ' +
				'object is of the correct type for the field.',
				'EVT_visible_on',
				DateTime.fromJSDate( new Date() ),
				EventSchemaProperties,
				null,
			],
			[
				'Does not throw an error when the provided Money value ' +
				'object is of the correct type for the field.',
				'REG_final_price',
				new Money( 0, SiteCurrency ),
				RegistrationSchemaProperties,
				null,
			],
			[
				'Does not throw an error when the provided primitive value ' +
				'on an object type field does match the expected type for the ' +
				'raw property schema for that object.',
				'EVT_desc',
				'Some description',
				EventSchemaProperties,
				null,
			],
		];
		tests.forEach( ( [
			description,
			fieldName,
			fieldValue,
			schema,
			expectedException,
		] ) => {
			it( description, () => {
				if ( expectedException === null ) {
					expect( assertTest( fieldName, fieldValue, schema ) )
						.not
						.toThrow();
				} else {
					expect( assertTest( fieldName, fieldValue, schema ) )
						.toThrow( expectedException );
				}
			} );
		} );
	} );
	describe( 'assertValidFieldAndValueAgainstSchema()', () => {
		const assertTest = (
			modelName,
			fieldName,
			fieldValue,
			schema,
			validationType = VALIDATE_TYPE.RAW
		) => () => {
			assertValidFieldAndValueAgainstSchema(
				modelName,
				fieldName,
				fieldValue,
				getMockInstance( schema, { [ fieldName ]: validationType } ),
			);
		};
		const tests = [
			[
				'Throws a TypeError when a provided primitive value is not ' +
				'of the correct type for the provided field.',
				'Event',
				'EVT_name',
				10,
				EventSchemaProperties,
				TypeError,
			],
			[
				'Throws a TypeError when the provided value for ' +
				'a DateTime field is not the correct type',
				'Event',
				'EVT_visible_on',
				10,
				EventSchemaProperties,
				TypeError,
			],
			[
				'Throws a TypeError when the provided value for a Money ' +
				'field is not the correct type',
				'Registration',
				'REG_final_price',
				1.25,
				RegistrationSchemaProperties,
				TypeError,
			],
			[
				'Throws a TypeError when a provided primitive value on a ' +
				'object type field does not match the expected type for the ' +
				'raw property schema for that object',
				'Event',
				'EVT_desc',
				'some description',
				EventSchemaProperties,
				TypeError,
			],
			[
				'Does not throw an error when the provided primitive value ' +
				'is of the correct type for the field.',
				'Event',
				'EVT_name',
				'Some title.',
				EventSchemaProperties,
				null,
			],
			[
				'Does not throw an error when the provided DateTime value ' +
				'object is of the correct type for the field.',
				'Event',
				'EVT_visible_on',
				( new Date() ).toISOString(),
				EventSchemaProperties,
				null,
			],
			[
				'Does not throw an error when the provided Money value ' +
				'object is of the correct type for the field.',
				'Registration',
				'REG_final_price',
				{ raw: 1.25 },
				RegistrationSchemaProperties,
				null,
			],
			[
				'Does not throw an error when the provided primitive value ' +
				'on an object type field does match the expected type for the ' +
				'raw property schema for that object.',
				'Event',
				'EVT_desc',
				{ raw: 'some description' },
				EventSchemaProperties,
				null,
			],
		];
		tests.forEach( ( [
			description,
			modelName,
			fieldName,
			fieldValue,
			schema,
			expectedException,
		] ) => {
			it( description, () => {
				if ( expectedException === null ) {
					expect(
						assertTest( modelName, fieldName, fieldValue, schema )
					)
						.not
						.toThrow();
				} else {
					expect(
						assertTest( modelName, fieldName, fieldValue, schema )
					)
						.toThrow( expectedException );
				}
			} );
		} );
	} );
} );
