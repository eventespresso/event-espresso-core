/**
 * Internal imports
 */
import {
	isSchemaResponse,
	isSchema,
	isSchemaResponseOfModel,
	isSchemaOfModel,
} from '../is-schema';

/**
 * External Imports
 */
import {
	EventSchema,
	DateTimeSchema,
} from '@test/fixtures';

const expectedFails = [
	0,
	{},
	null,
	'fail',
	{ title: 'something', schema: 'soemthing else' },
	true,
];

describe( 'isSchemaResponse()', () => {
	expectedFails.forEach( ( testValue ) => {
		it( 'fails validation for given value', () => {
			expect( isSchemaResponse( testValue ) ).toBe( false );
		} );
	} );
	it( 'passes validation for schema response', () => {
		expect( isSchemaResponse( EventSchema ) ).toBe( true );
	} );
} );
describe( 'isSchema()', () => {
	[ ...expectedFails, EventSchema ].forEach( ( testValue ) => {
		it( 'fails validation for given value', () => {
			expect( isSchema( testValue ) ).toBe( false );
		} );
	} );
	it( 'passes validation for schema', () => {
		expect( isSchema( EventSchema.schema ) ).toBe( true );
	} );
} );
describe( 'isSchemaResponseOfModel()', () => {
	[ ...expectedFails, DateTimeSchema ].forEach( ( testValue ) => {
		it( 'fails validation for given value', () => {
			expect( isSchemaResponseOfModel( testValue, 'event' ) )
				.toBe( false );
		} );
	} );
	it( 'passes validation for schema', () => {
		expect( isSchemaResponseOfModel( EventSchema, 'event' ) )
			.toBe( true );
	} );
} );
describe( 'isSchemaOfModel()', () => {
	[ ...expectedFails, DateTimeSchema.schema ].forEach( ( testValue ) => {
		it( 'fails validation for given value', () => {
			expect( isSchemaOfModel( testValue, 'event' ) ).toBe( false );
		} );
	} );
	it( 'passes validation for schema', () => {
		expect( isSchemaOfModel( EventSchema.schema, 'event' ) ).toBe( true );
	} );
} );
