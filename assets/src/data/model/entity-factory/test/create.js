/**
 * External imports
 */
import { InvalidArgument } from '@eventespresso/eejs';

/**
 * Internal Imports
 */
import {
	createGetter,
	createCallbackGetter,
	createGetterAndSetter,
	createAliasGetterAndSetter,
	createRenderedGetters,
	createPrimaryKeyFieldGetters,
	setCalculatedFieldAndValues,
	setResources,
	setRelationsResource,
	setSaveState,
} from '../create';

import { PRIVATE_PROPERTIES, SAVE_STATE } from '../constants';

describe( 'testing create functions for model-entity factory', () => {
	const mockInstance = class mockClass {};
	const getMockInstance = () => new mockInstance();
	describe( 'createGetter()', () => {
		describe( 'sets up new getter on provided instance', () => {
			const testInstance = getMockInstance();
			createGetter( testInstance, 'someField', 10 );
			it( 'has getter', () => {
				expect( testInstance.someField ).toBeDefined();
			} );
			it( 'returns expected value', () => {
				expect( testInstance.someField ).toEqual( 10 );
			} );
		} );
	} );
	describe( 'createCallbackGettter', () => {
		describe( 'sets up new getter that provided callback', () => {
			const testInstance = getMockInstance();
			const mockCallback = jest.fn().mockReturnValue( 10 );
			createCallbackGetter( testInstance, 'someTest', mockCallback );
			it( 'has getter', () => {
				expect( testInstance.someTest ).toBeDefined();
			} );
			it( 'invokes callback.', () => {
				expect( mockCallback ).toHaveBeenCalled();
			} );
			it( 'invokes callback with instance as argument', () => {
				expect( mockCallback ).toHaveBeenCalledWith( testInstance );
			} );
			it( 'returns expected value', () => {
				expect( testInstance.someTest ).toEqual( 10 );
			} );
		} );
	} );
	describe( 'createGetterAndSetter', () => {
		const testInstance = getMockInstance();
		testInstance.schema = { someProp: { type: 'number' } };
		createGetterAndSetter( testInstance, 'someProp', 10 );
		// initialize saveState
		testInstance[ PRIVATE_PROPERTIES.SAVE_STATE ] = SAVE_STATE.CLEAN;
		it( 'has getter', () => {
			expect( testInstance.someProp ).toBeDefined();
		} );
		it( 'returns initial set value', () => {
			expect( testInstance.someProp ).toEqual( 10 );
		} );
		describe( 'testing setting values', () => {
			it( 'throws TypeError for value that doesn\'t match type in ' +
				'schema', () => {
				const setInvalidValue = () => testInstance.someProp = 'invalid';
				expect( setInvalidValue ).toThrow( TypeError );
			} );
			it( 'sets new value', () => {
				testInstance.someProp = 20;
				expect( testInstance.someProp ).toEqual( 20 );
			} );
			it( 'After setting, save state should be dirty', () => {
				expect( testInstance[ PRIVATE_PROPERTIES.SAVE_STATE ] ).toBe(
					SAVE_STATE.DIRTY
				);
			} );
		} );
	} );
	describe( 'createAliasGetterAndSetter()', () => {
		const testInstance = getMockInstance();
		testInstance.schema = { originalField: { type: 'number' } };
		createGetterAndSetter( testInstance, 'originalField', 42 );
		createAliasGetterAndSetter(
			testInstance,
			'originalField',
			'aliasField'
		);
		it( 'has expected getter', () => {
			expect( testInstance.aliasField ).toBeDefined();
		} );
		it( 'returns expected value for initial creation', () => {
			expect( testInstance.aliasField ).toEqual( 42 );
		} );
		describe( 'testing setting new value', () => {
			it( 'throws TypeError for value that doesn\'t match type in ' +
				'schema', () => {
				const setInvalidValue = () =>
					testInstance.aliasField = 'invalid';
				expect( setInvalidValue ).toThrow( TypeError );
			} );
			it( 'sets new value on original prop', () => {
				testInstance.aliasField = 20;
				expect( testInstance.originalField ).toEqual( 20 );
			} );
			it( 'sets new value on alias prop', () => {
				expect( testInstance.aliasField ).toEqual( 20 );
			} );
		} );
	} );
	describe( 'createRenderedGetters()', () => {
		const testInstance = getMockInstance();
		testInstance.fieldPrefixes = [];
		createRenderedGetters( testInstance, 'someProp', 42 );
		it( 'has field getter', () => {
			expect( testInstance.somePropRendered ).toBeDefined();
		} );
		it( 'returns expected value using field getter', () => {
			expect( testInstance.somePropRendered ).toEqual( 42 );
		} );
		it( 'has general `getRendered` getter', () => {
			expect( testInstance.getRendered ).toBeDefined();
		} );
		it( 'has expected value using general `getRendered` getter', () => {
			expect( testInstance.getRendered( 'someProp' ) )
				.toEqual( 42 );
		} );
		it( 'does not error when attempting to create a new ' +
			'renderedGetter', () => {
			expect(
				() => createRenderedGetters( testInstance, 'someOtherProp', 35 )
			).not.toThrow();
		} );
	} );
	describe( 'createPrimaryKeyFieldGetters()', () => {
		const testSingleKeyInstance = getMockInstance();
		const testMultiKeyInstance = getMockInstance();
		testSingleKeyInstance.schema = {
			pk: { primary_key: true, type: 'number' },
		};
		testMultiKeyInstance.schema = {
			pk1: { primary_key: true, type: 'string' },
			pk2: { primary_key: true, type: 'string' },
		};
		describe( 'expected single primary key results', () => {
			const executeMethod = ( keys ) =>
				createPrimaryKeyFieldGetters( testSingleKeyInstance, keys );
			it( 'does nothing if primaryKeys argument is not an array', () => {
				executeMethod( 'invalid' );
				expect( testSingleKeyInstance.pk ).not.toBeDefined();
			} );
			describe( 'has expected getters and setters', () => {
				executeMethod( [ 'pk' ] );
				describe( 'instance.primaryKey', () => {
					it( 'is set', () => {
						expect( testSingleKeyInstance.primaryKey ).toBeDefined();
					} );
					it( 'has expected value', () => {
						expect( testSingleKeyInstance.primaryKey ).toBe( 'pk' );
					} );
				} );
				describe( 'instance.primaryKeys', () => {
					it( 'is set', () => {
						expect( testSingleKeyInstance.primaryKeys )
							.toBeDefined();
					} );
					it( 'has expected value', () => {
						expect( testSingleKeyInstance.primaryKeys )
							.toEqual( [ 'pk' ] );
					} );
				} );
				describe( 'instance.hasMultiplePrimaryKeys', () => {
					it( 'is set', () => {
						expect( testSingleKeyInstance.hasMultiplePrimaryKeys )
							.toBeDefined();
					} );
					it( 'has expected value', () => {
						expect( testSingleKeyInstance.hasMultiplePrimaryKeys )
							.toBe( false );
					} );
				} );
			} );
		} );
		describe( 'expected multiple primary key results', () => {
			createPrimaryKeyFieldGetters(
				testMultiKeyInstance,
				[ 'pk1', 'pk2' ]
			);
			describe( 'has expected getters and setters', () => {
				describe( 'instance.primaryKey', () => {
					it( 'is set', () => {
						expect( testMultiKeyInstance.primaryKey ).toBeDefined();
					} );
					it( 'has expected value', () => {
						expect( testMultiKeyInstance.primaryKey ).toBe( 'pk1' );
					} );
				} );
				describe( 'instance.primaryKeys', () => {
					it( 'is set', () => {
						expect( testMultiKeyInstance.primaryKeys )
							.toBeDefined();
					} );
					it( 'has expected value', () => {
						expect( testMultiKeyInstance.primaryKeys )
							.toEqual( [ 'pk1', 'pk2' ] );
					} );
				} );
				describe( 'instance.hasMultiplePrimaryKeys', () => {
					it( 'is set', () => {
						expect( testMultiKeyInstance.hasMultiplePrimaryKeys )
							.toBeDefined();
					} );
					it( 'has expected value', () => {
						expect( testMultiKeyInstance.hasMultiplePrimaryKeys )
							.toBe( true );
					} );
				} );
			} );
		} );
	} );
	describe( 'setCalculatedFieldAndValues()', () => {
		const testInstance = getMockInstance();
		const calculatedFieldsAndValues = {
			registration_count: 10,
		};
		setCalculatedFieldAndValues( testInstance, calculatedFieldsAndValues );
		describe( 'creates individual field getters', () => {
			it( 'has getter', () => {
				expect( testInstance.registrationCount ).toBeDefined();
			} );
			it( 'has expected value for getter', () => {
				expect( testInstance.registrationCount ).toEqual( 10 );
			} );
		} );
		describe( 'creates hasCalculatedField method', () => {
			it( 'has method', () => {
				expect( testInstance.hasCalculatedField ).toBeDefined();
			} );
			it( 'has expected value when called with known calculated field',
				() => {
					expect(
						testInstance.hasCalculatedField( 'registrationCount' )
					).toBe( true );
				} );
			it( 'has expected value when called for a calculated field that ' +
				'does not exist', () => {
				expect( testInstance.hasCalculatedField( 'nothere' ) )
					.toBe( false );
			} );
		} );
	} );
	describe( 'setResources()', () => {
		const testInstance = getMockInstance();
		const resources = {
			self: [
				{ href: 'self link' },
			],
			collection: [
				{ href: 'collection link' },
			],
			'https://api.eventespresso.com/event': [
				{ href: 'event relation', single: true },
			],
			'https://api.eventespresso.com/transaction': [
				{ href: 'transaction relation', single: true },
			],
		};
		setResources( testInstance, resources );
		describe( 'set expected resourceLink getter', () => {
			it( 'is created', () => {
				expect( testInstance.resourceLink ).toBeDefined();
			} );
			it( 'has expected value', () => {
				expect( testInstance.resourceLink ).toEqual( 'self link' );
			} );
		} );
		describe( 'set expected collectionResourceLinkGetter', () => {
			it( 'is created', () => {
				expect( testInstance.collectionResourceLink ).toBeDefined();
			} );
			it( 'has expected value', () => {
				expect( testInstance.collectionResourceLink )
					.toEqual( 'collection link' );
			} );
		} );
		describe( 'relation resource properties are as expected', () => {
			it( 'has expected properties', () => {
				expect( testInstance.eventsResource ).toBeDefined();
				expect( testInstance.transactionsResource ).toBeDefined();
			} );
		} );
		describe( 'getRelations getter is defined and has expected value',
			() => {
				it( 'is created', () => {
					expect( testInstance.getRelations ).toBeDefined();
				} );
				it( 'has expected value', () => {
					expect( testInstance.getRelations ).toEqual(
						[ 'events', 'transactions' ]
					);
				} );
			} );
	} );
	describe( 'setRelationsResource()', () => {
		const testInstance = getMockInstance();
		const relationsResourceInfo = [
			{ href: 'resource link', single: true },
		];
		setRelationsResource( testInstance, 'relation', relationsResourceInfo );
		describe( 'creates expected relation property getter', () => {
			it( 'has property created', () => {
				expect( testInstance.relation ).toBeDefined();
			} );
			it( 'has expected value for property', () => {
				expect( testInstance.relation )
					.toEqual( {
						resourceLink: 'resource link',
						single: true,
					} );
			} );
		} );
		describe( 'creates expected getRelationResource property', () => {
			it( 'has been created', () => {
				expect( testInstance.getRelationResource ).toBeDefined();
			} );
			it( 'returns expected value for known resource', () => {
				expect( testInstance.getRelationResource( 'relation' ) )
					.toEqual(
						{
							resourceLink: 'resource link',
							single: true,
						}
					);
			} );
			it( 'returns expected value for non valid resource', () => {
				expect( testInstance.getRelationResource( 'invalid' ) )
					.not.toBeDefined();
			} );
		} );
	} );
	describe( 'setSaveState()', () => {
		const testInstance = getMockInstance();
		describe( 'when current state is clean', () => {
			beforeEach( () => {
				testInstance[ PRIVATE_PROPERTIES.SAVE_STATE ] =
					SAVE_STATE.CLEAN;
			} );
			const testConditions = [
				[ 'dirty', SAVE_STATE.DIRTY, SAVE_STATE.DIRTY ],
				[ 'new', SAVE_STATE.NEW, SAVE_STATE.NEW ],
				[ 'clean', SAVE_STATE.CLEAN, SAVE_STATE.CLEAN ],
			];
			testConditions.forEach( ( [
				description,
				stateToSet,
				expectedState,
			] ) => {
				it( 'returns expected value for setting ' + description +
					' state', () => {
					setSaveState( testInstance, stateToSet );
					expect( testInstance[ PRIVATE_PROPERTIES.SAVE_STATE ] )
						.toEqual( expectedState );
				} );
			} );
		} );
		describe( 'when current state is dirty', () => {
			beforeEach( () => {
				testInstance[ PRIVATE_PROPERTIES.SAVE_STATE ] =
					SAVE_STATE.DIRTY;
			} );
			const testConditions = [
				[ 'dirty', SAVE_STATE.DIRTY, SAVE_STATE.DIRTY ],
				[ 'new', SAVE_STATE.NEW, SAVE_STATE.DIRTY ],
				[ 'clean', SAVE_STATE.CLEAN, SAVE_STATE.DIRTY ],
			];
			testConditions.forEach( ( [
				description,
				stateToSet,
				expectedState,
			] ) => {
				it( 'returns expected value for setting ' + description +
					' state', () => {
					setSaveState( testInstance, stateToSet );
					expect( testInstance[ PRIVATE_PROPERTIES.SAVE_STATE ] )
						.toEqual( expectedState );
				} );
			} );
		} );
		describe( 'when current state is new', () => {
			beforeEach( () => {
				testInstance[ PRIVATE_PROPERTIES.SAVE_STATE ] =
					SAVE_STATE.NEW;
			} );
			const testConditions = [
				[ 'dirty', SAVE_STATE.DIRTY, SAVE_STATE.NEW ],
				[ 'new', SAVE_STATE.NEW, SAVE_STATE.NEW ],
				[ 'clean', SAVE_STATE.CLEAN, SAVE_STATE.NEW ],
			];
			testConditions.forEach( ( [
				description,
				stateToSet,
				expectedState,
			] ) => {
				it( 'returns expected value for setting ' + description +
					' state', () => {
					setSaveState( testInstance, stateToSet );
					expect( testInstance[ PRIVATE_PROPERTIES.SAVE_STATE ] )
						.toEqual( expectedState );
				} );
			} );
		} );
		describe( 'when provided state is an invalid state', () => {
			it( 'throws InvalidArgument', () => {
				expect(
					() => setSaveState( testInstance, 'invalid' )
				).toThrow( InvalidArgument );
			} );
		} );
	} );
} );
