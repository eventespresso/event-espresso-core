/**
 * Internal dependencies
 */
import {
	getSchemaForModel,
	isRequestingSchemaForModel,
	getFactoryForModel,
	isRequestingFactoryForModel,
	hasResolvedFactoryForModel,
	hasResolvedSchemaForModel,
	getRelationEndpointForEntityId,
	isRequestingRelationEndpointForEntityId,
	hasJoinTableRelation,
	getRelationSchema,
	getRelationType,
	getRelationResponseType,
	getRelationPrimaryKeyString,
} from '../selectors';
import { mockStateForTests } from './fixtures';

/**
 * External dependencies
 */
import { select } from '@wordpress/data';
import { EventSchema, EventFactory } from '@test/fixtures';

jest.mock( '@wordpress/data', () => ( {
	...require.requireActual( '@wordpress/data' ),
	select: jest.fn().mockReturnValue( {} ),
} ) );

describe( 'testing getters', () => {
	[
		[
			getSchemaForModel,
			EventSchema,
		],
		[
			getFactoryForModel,
			EventFactory,
		],
	].forEach( ( [
		selectorToTest,
		expectedValue,
	] ) => {
		describe( selectorToTest.name + '()', () => {
			it( 'returns expected default value when model not found in ' +
				'state', () => {
				expect( selectorToTest(
					mockStateForTests,
					'invalid'
				) ).toEqual( null );
			} );
			it( 'returns expected value for model in state', () => {
				expect( selectorToTest(
					mockStateForTests,
					'event',
				) ).toBe( expectedValue );
			} );
		} );
	} );
} );
describe( 'testing isRequesting and hasResolved methods', () => {
	beforeAll( () => {
		select( 'core/data' ).isResolving = jest.fn().mockReturnValue( false );
		select( 'core/data' ).hasFinishedResolution = jest.fn().mockReturnValue(
			false
		);
	} );
	afterAll( () => {
		select( 'core/data' ).isResolving.mockRestore();
		select( 'core/data' ).hasFinishedResolution.mockRestore();
	} );

	function setIsResolving(
		isResolving,
		selectorKey = 'getSchemaForModel',
	) {
		const implementationFunction = ( reducerKey, selectorName ) => (
			isResolving &&
			reducerKey === 'eventespresso/schema' &&
			selectorName === selectorKey
		);
		select( 'core/data' ).isResolving.mockImplementation(
			implementationFunction
		);
		select( 'core/data' ).hasFinishedResolution.mockImplementation(
			implementationFunction
		);
	}
	const testConditions = [
		[
			isRequestingSchemaForModel,
			'getSchemaForModel',
			[],
		],
		[
			isRequestingFactoryForModel,
			'getFactoryForModel',
			[],
		],
		[
			hasResolvedSchemaForModel,
			'getSchemaForModel',
			[],
		],
		[
			hasResolvedFactoryForModel,
			'getFactoryForModel',
			[],
		],
		[
			isRequestingRelationEndpointForEntityId,
			'getRelationEndpointForEntityId',
			[ 10, 'datetimes' ],
		],
	];
	testConditions.forEach( ( [
		selectorMethod,
		methodDescription,
		extraArgs,
	] ) => {
		describe( selectorMethod.name + '()', () => {
			it( 'returns false if never requested or finished ' +
				'requesting', () => {
				expect( selectorMethod(
					mockStateForTests,
					'event',
					...extraArgs
				) ).toBe( false );
			} );
			it( 'returns true if resolution is started and not ' +
				'finished', () => {
				setIsResolving( true, methodDescription );
				expect( selectorMethod(
					mockStateForTests,
					'event',
					...extraArgs
				) ).toBe( true );
			} );
		} );
	} );
} );
describe( 'getRelationEndpointForEntityId', () => {
	[
		[
			'for the model',
			[ 'invalid', 10, 'datetime' ],
		],
		[
			'for the entity id',
			[ 'event', 20, 'datetime' ],
		],
		[
			'for the relation',
			[ 'event', 10, 'message_template_group' ],
		],
	].forEach( ( [
		descriptionPart,
		args,
	] ) => {
		it( 'returns an empty string when there is no state record ' +
			descriptionPart, () => {
			expect(
				getRelationEndpointForEntityId( mockStateForTests, ...args )
			).toBe( '' );
		} );
	} );
	it( 'returns expected value for given data that exists in ' +
		'state', () => {
		expect(
			getRelationEndpointForEntityId(
				mockStateForTests,
				'event',
				'10',
				'datetime'
			)
		).toEqual( '/ee/v4.8.36/events/10/datetimes' );
	} );
} );
describe( 'hasJoinTableRelation()', () => {
	it( 'returns false when there is not a join table ' +
		'relation', () => {
		expect(
			hasJoinTableRelation(
				mockStateForTests,
				'event',
				'datetimes'
			)
		).toBe( false );
	} );
	it( 'returns true when there is a join table ' +
		'relation', () => {
		expect(
			hasJoinTableRelation(
				mockStateForTests,
				'event',
				'venues',
			)
		).toBe( true );
	} );
	it( 'returns false when the relation does not exist for the ' +
		'given values', () => {
		expect(
			hasJoinTableRelation(
				mockStateForTests,
				'foo',
				'bar',
			)
		).toBe( false );
	} );
} );
describe( 'getRelationType()', () => {
	it( 'returns expected value for relation that exists', () => {
		expect(
			getRelationType(
				mockStateForTests,
				'event',
				'datetimes'
			)
		).toBe( 'EE_Has_Many_Relation' );
	} );
	it( 'returns empty string when relation does not exist', () => {
		expect(
			getRelationType(
				mockStateForTests,
				'foo',
				'bar',
			)
		).toBe( '' );
	} );
} );
describe( 'getRelationResponseType', () => {
	it( 'returns expected value for relation that exists', () => {
		expect(
			getRelationResponseType(
				mockStateForTests,
				'event',
				'datetime'
			)
		).toBe( 'array' );
	} );
	it( 'returns empty string when relation does not exist', () => {
		expect(
			getRelationType(
				mockStateForTests,
				'foo',
				'bar'
			)
		).toBe( '' );
	} );
} );
describe( 'getRelationSchema()', () => {
	it( 'returns expected value for relation that exists', () => {
		expect(
			getRelationSchema(
				mockStateForTests,
				'event',
				'datetimes',
			)
		).toEqual(
			EventSchema.schema.properties.datetimes
		);
	} );
	it( 'returns null for relation that does not exist', () => {
		expect(
			getRelationSchema(
				mockStateForTests,
				'foo',
				'bar',
			)
		).toBeNull();
	} );
} );
describe( 'getRelationPrimaryKeyString', () => {
	beforeEach( () => {
		getRelationPrimaryKeyString.clear();
	} );
	it( 'returns expected value for relation that exists on ' +
		'EE_Belongs_To_Relation', () => {
		expect(
			getRelationPrimaryKeyString(
				mockStateForTests,
				'datetime',
				'event'
			)
		).toBe( 'EVT_ID' );
	} );
	it( 'returns expected value for relation that exists when ' +
		'relation type is not EE_Belongs_To_Relation', () => {
		expect(
			getRelationPrimaryKeyString(
				mockStateForTests,
				'event',
				'datetime',
			)
		).toBe( 'Datetime.DTT_ID' );
	} );
	it( 'returns empty string for relation that does not exist', () => {
		expect(
			getRelationPrimaryKeyString(
				mockStateForTests,
				'foo',
				'bar',
			)
		).toBe( '' );
	} );
} );
