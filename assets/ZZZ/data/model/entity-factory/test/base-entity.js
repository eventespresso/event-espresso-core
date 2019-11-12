/**
 * External imports
 */
import { ServerDateTime } from '@eventespresso/value-objects';
import { PRIVATE_PROPERTIES, SAVE_STATE } from '../constants';
import { isCuid } from 'cuid';
import { isArray } from 'lodash';
import {
	EventSchema,
	EventResponse,
	PasswordProtectedEventResponse,
	DateTimeSchema,
	AuthedDateTimeResponse,
	AuthedEventResponse,
} from '@test/fixtures';

/**
 * Internal imports
 */
import createEntityFactory from '../base-entity';

describe( 'createEntityFactory()', () => {
	const EventFactory = createEntityFactory(
		'event',
		EventSchema.schema,
		[ 'EVT' ]
	);
	const Event = EventFactory.classDef;
	const baseTests = ( event, allProperties ) => {
		it( 'returns instance of', () => {
			expect( event ).toBeInstanceOf( Event );
		} );
		it( 'has expected name for class', () => {
			expect( Event.name ).toBe( 'Event' );
		} );
		it( 'has expected enumerable properties', () => {
			expect( Object.keys( event ).sort() )
				.toEqual( enumerableProperties.sort() );
		} );
		it( 'has expected properties (enumerable and non-enumerable)', () => {
			expect( Object.getOwnPropertyNames( event ).sort() )
				.toEqual( allProperties.sort() );
		} );
		it( 'has expected Symbol properties', () => {
			expect( Object.getOwnPropertySymbols( event ) ).toEqual(
				[
					PRIVATE_PROPERTIES.SAVE_STATE,
					PRIVATE_PROPERTIES.VALIDATE_TYPES,
				]
			);
		} );
	};
	const enumerableProperties = [
		'EVT_ID',
		'EVT_name',
		'EVT_desc',
		'EVT_slug',
		'EVT_created',
		'EVT_short_desc',
		'EVT_modified',
		'EVT_wp_user',
		'parent',
		'EVT_order',
		'status',
		'comment_status',
		'ping_status',
		'EVT_display_desc',
		'EVT_display_ticket_selector',
		'EVT_visible_on',
		'EVT_additional_limit',
		'EVT_default_registration_status',
		'EVT_member_only',
		'EVT_phone',
		'EVT_allow_overflow',
		'EVT_timezone_string',
		'EVT_external_URL',
		'EVT_donations',
	];
	const nonEnumerableEntityProperties = [
		'id',
		'name',
		'desc',
		'slug',
		'created',
		'shortDesc',
		'modified',
		'wpUser',
		'order',
		'displayDesc',
		'displayTicketSelector',
		'visibleOn',
		'additionalLimit',
		'defaultRegistrationStatus',
		'memberOnly',
		'phone',
		'allowOverflow',
		'timezoneString',
		'externalUrl',
		'donations',
		'forClone',
		'forUpdate',
		'forInsert',
		'forPersist',
		'primaryKey',
		'primaryKeys',
		'hasMultiplePrimaryKeys',
		'fieldPrefixes',
		'fieldsToPersistOnInsert',
		'schema',
		'modelName',
		'originalFieldsAndValues',
		'protectedFields',
	];
	const calculatedFieldProperties = [
		'hasCalculatedField',
	];
	const resourceProperties = [
		'link',
		'resourceLink',
		'collectionResourceLink',
		'registrationsResource',
		'datetimesResource',
		'questionGroupsResource',
		'venuesResource',
		'termRelationshipsResource',
		'termTaxonomiesResource',
		'messageTemplateGroupsResource',
		'attendeesResource',
		'wpUsersResource',
		'postMetasResource',
		'extraMetasResource',
		'changeLogsResource',
		'peopleResource',
		'personPostsResource',
		'getRelations',
		'getRelationResource',
	];
	describe( 'creating new entity', () => {
		const props = {
			EVT_name: 'Some Event',
			EVT_desc: 'Some description',
		};
		const event = EventFactory.createNew( props );
		const allProperties = [
			...enumerableProperties,
			...nonEnumerableEntityProperties,
		];
		baseTests( event, allProperties );
		describe( 'Test of expected values for props', () => {
			const testConditions = [
				[
					[ 'EVT_name', 'name' ],
					'Some Event',
				],
				[
					[ 'EVT_desc', 'desc' ],
					'Some description',
				],
				[
					[ 'EVT_slug', 'slug' ],
					'',
				],
				[
					[ 'EVT_wp_user', 'wpUser' ],
					1,
				],
				[
					[ 'parent' ],
					0,
				],
				[
					[ 'status' ],
					'draft',
				],
				[
					[
						'EVT_display_ticket_selector',
						'displayTicketSelector',
					],
					true,
				],
				[
					[
						'EVT_default_registration_status',
						'defaultRegistrationStatus',
					],
					'RPP',
				],
			];
			testConditions.forEach( ( [
				propertiesToTest,
				expectedValue,
			] ) => {
				propertiesToTest.forEach( ( propertyName ) => {
					it( 'event.' + propertyName + ' has expected value', () => {
						expect( event[ propertyName ] )
							.toEqual( expectedValue );
					} );
				} );
			} );
			describe( 'has expected value object for date time properties',
				() => {
					const testProperties = [
						'EVT_visible_on',
						'visibleOn',
					];
					testProperties.forEach( ( testProperty ) => {
						it( 'event.' + testProperty + ' is instance of ' +
							'DateTime', () => {
							expect( event[ testProperty ] )
								.toBeInstanceOf( ServerDateTime );
						} );
					} );
				} );
			describe( 'primary key property values are a cuid (and the same ' +
				'cuid)', () => {
				const idProps = [ 'EVT_ID', 'id' ];
				const canonicalCuid = event.EVT_ID;
				idProps.forEach( ( idProp ) => {
					it( 'event.' + idProp + ' is a cuid', () => {
						expect( isCuid( event[ idProp ] ) ).toBe( true );
					} );
					it( 'event.' + idProp + ' is the same cuid for all ' +
						'values', () => {
						expect( event[ idProp ] ).toBe( canonicalCuid );
					} );
				} );
			} );
		} );
		describe( 'Has instance getters', () => {
			const testConditions = [
				[
					'saveState',
					SAVE_STATE.NEW,
				],
				[
					'isNew',
					true,
				],
				[
					'isDirty',
					false,
				],
				[
					'isClean',
					false,
				],
			];
			testConditions.forEach( ( [
				methodName,
				expectedValue,
			] ) => {
				it( 'event.' + methodName + ' is defined', () => {
					expect( event[ methodName ] ).toBeDefined();
				} );
				it( 'event.' + methodName + ' returns expected value', () => {
					expect( event[ methodName ] ).toBe( expectedValue );
				} );
			} );
		} );
	} );
	describe( 'creating entity from rest response', () => {
		const allProperties = [
			...enumerableProperties,
			...nonEnumerableEntityProperties,
			...calculatedFieldProperties,
			...resourceProperties,
		];
		const getExpectedValueForProp = (
			canonicalProp,
			expectedEventData
		) => {
			let expectedValue;
			if ( isArray( canonicalProp ) ) {
				const [ property, subProp ] = canonicalProp;
				if ( subProp === 'date' ) {
					expectedValue = ServerDateTime.fromISO(
						expectedEventData[ property ]
					);
				} else {
					expectedValue = expectedEventData[ property ][ subProp ];
				}
			} else {
				expectedValue = expectedEventData[ canonicalProp ];
			}
			return expectedValue;
		};
		const testRuns = ( event, testConditions, eventResponse ) => {
			testConditions.forEach( ( [
				canonicalProp,
				propertiesToTest,
			] ) => {
				const expectedValue = getExpectedValueForProp(
					canonicalProp,
					eventResponse
				);
				propertiesToTest.forEach( ( propertyName ) => {
					it( 'event.' + propertyName + ' has expected value', () => {
						expect( event[ propertyName ] )
							.toEqual( expectedValue );
					} );
				} );
			} );
		};
		describe( 'creating entity from non-authed rest response ' +
			'(fromExisting)', () => {
			describe( 'creating entity', () => {
				const event = EventFactory.fromExisting( EventResponse );
				baseTests( event, allProperties );
				describe( 'Test of expected values for props', () => {
					const testConditions = [
						[
							'EVT_name',
							[ 'EVT_name', 'name' ],
						],
						[
							[ 'EVT_desc', 'rendered' ],
							[ 'EVT_desc', 'desc' ],
						],
						[
							'EVT_slug',
							[ 'EVT_slug', 'slug' ],
						],
						[
							[ 'EVT_created', 'date' ],
							[
								'EVT_created',
								'created',
							],
						],
						[
							'EVT_created',
							[],
						],
						[
							'EVT_wp_user',
							[
								'EVT_wp_user',
								'wpUser',
							],
						],
						[
							[ 'status', 'raw' ],
							[ 'status' ],
						],
						[
							[ 'status', 'pretty' ],
							[],
						],
						[
							'parent',
							[ 'parent' ],
						],
						[
							'EVT_display_ticket_selector',
							[
								'EVT_display_ticket_selector',
								'displayTicketSelector',
							],
						],
						[
							[ 'EVT_default_registration_status', 'raw' ],
							[
								'EVT_default_registration_status',
								'defaultRegistrationStatus',
							],
						],
						[
							[ 'EVT_default_registration_status', 'pretty' ],
							[],
						],
					];
					testRuns( event, testConditions, EventResponse );
				} );
			} );
		} );
		describe( 'creating entity from authed rest response (fromExisting)',
			() => {
				describe( 'creating entity', () => {
					const event = EventFactory.fromExisting(
						AuthedEventResponse
					);
					baseTests( event, allProperties );
					describe( 'Test of expected values for props', () => {
						const testConditions = [
							[
								'EVT_name',
								[ 'EVT_name', 'name' ],
							],
							[
								[ 'EVT_desc', 'raw' ],
								[ 'EVT_desc', 'desc' ],
							],
							[
								[ 'EVT_desc', 'rendered' ],
								[],
							],
							[
								'EVT_slug',
								[ 'EVT_slug', 'slug' ],
							],
							[
								[ 'EVT_created', 'date' ],
								[
									'EVT_created',
									'created',
								],
							],
							[
								'EVT_created',
								[],
							],
							[
								'EVT_wp_user',
								[
									'EVT_wp_user',
									'wpUser',
								],
							],
							[
								[ 'status', 'raw' ],
								[ 'status' ],
							],
							[
								[ 'status', 'pretty' ],
								[],
							],
							[
								'parent',
								[ 'parent' ],
							],
							[
								'EVT_display_ticket_selector',
								[
									'EVT_display_ticket_selector',
									'displayTicketSelector',
								],
							],
							[
								[ 'EVT_default_registration_status', 'raw' ],
								[
									'EVT_default_registration_status',
									'defaultRegistrationStatus',
								],
							],
							[
								[ 'EVT_default_registration_status', 'pretty' ],
								[],
							],
						];
						testRuns( event, testConditions, AuthedEventResponse );
					} );
				} );
			} );
		describe( 'creating entity from authed password protected rest response' +
			' (fromExisting)', () => {
			describe( 'creating entity', () => {
				const event = EventFactory.fromExisting(
					PasswordProtectedEventResponse
				);
				baseTests( event, allProperties );
				it( 'has expected protected fields', () => {
					expect( event.protectedFields ).toEqual(
						[
							'password',
							'EVT_desc',
							'EVT_short_desc',
							'EVT_display_desc',
							'EVT_display_ticket_selector',
							'EVT_visible_on',
							'EVT_additional_limit',
							'EVT_default_registration_status',
							'EVT_member_only',
							'EVT_phone',
							'EVT_allow_overflow',
							'EVT_timezone_string',
							'EVT_external_URL',
							'EVT_donations',
							'dummy_field',
						]
					);
				} );
				it( 'isFieldPasswordProtected getter returns expected ' +
					'value', () => {
					expect( event.isFieldPasswordProtected( 'EVT_desc' ) )
						.toBe( true );
					expect( event.isFieldPasswordProtected( 'invalid' ) )
						.toBe( false );
				} );
				it( 'returns expected value for `isPasswordProtected` ' +
					'getter', () => {
					expect( event.isPasswordProtected ).toBe( true );
				} );
			} );
		} );
	} );
	describe( 'multiple key prefix handling', () => {
		const DateTimeFactory = createEntityFactory(
			'datetime',
			DateTimeSchema.schema,
			[ 'DTT_EVT', 'DTT' ],
		);
		const DateTimeEntity = DateTimeFactory.fromExisting(
			AuthedDateTimeResponse
		);
		const testConditions = [
			'DTT_ID',
			'id',
			'EVT_ID',
			'DTT_EVT_start',
			'start',
		];
		testConditions.forEach( ( fieldName ) => {
			test( 'The ' + fieldName + ' field exists', () => {
				expect( DateTimeEntity[ fieldName ] ).toBeDefined();
			} );
		} );
	} );
	describe( 'forPersist returns expected values', () => {
		const factory = createEntityFactory(
			'datetime',
			DateTimeSchema.schema,
			[ 'DTT_EVT', 'DTT' ]
		);
		it( 'returns expected values with nothing provided on new entity' +
			'instantiation', () => {
			const entity = factory.createNew( {} );
			expect( entity.forPersist ).toEqual( {
				DTT_ID: entity.id,
			} );
		} );
		it( 'returns expected values with nothing provided on new entity ' +
			'instantiation and setters used to set values', () => {
			const entity = factory.createNew( {} );
			entity.name = 'Test Datetime';
			expect( entity.forPersist ).toEqual(
				{
					DTT_ID: entity.id,
					DTT_name: 'Test Datetime',
				}
			);
		} );
	} );
	describe( 'clone property', () => {
		const factory = createEntityFactory(
			'event',
			EventSchema.schema,
			[ 'EVT' ]
		);
		let entity;
		beforeEach( () => {
			entity = factory.fromExisting( EventResponse );
		} );
		afterEach( () => {
			entity = null;
		} );
		describe( 'not keeping id of original', () => {
			it( 'returns a new instance of BaseEntity', () => {
				const newEntity = entity.clone();
				expect( newEntity ).not.toBe( entity );
			} );
			it( 'returns a new instance that differs only in id', () => {
				const newEntity = entity.clone();
				expect( newEntity.forUpdate ).toEqual( entity.forUpdate );
			} );
			it( 'has state of new', () => {
				const newEntity = entity.clone();
				expect( newEntity.isNew ).toBe( true );
			} );
			it( 'primary key can be modified', () => {
				const newEntity = entity.clone();
				newEntity.id = 999;
				expect( newEntity.id ).toEqual( 999 );
				expect( newEntity.isNew ).toBe( true );
			} );
		} );
		describe( 'keeping id of original', () => {
			it( 'returns a new instance of BaseEntity', () => {
				const newEntity = entity.clone( true );
				expect( newEntity ).not.toBe( entity );
			} );
			it( 'returns a new instance that shares the same id as ' +
				'original', () => {
				const newEntity = entity.clone( true );
				expect( newEntity.id ).toEqual( entity.id );
			} );
			it( 'has same state as original', () => {
				const newEntity = entity.clone( true );
				expect( newEntity.saveState ).toEqual( entity.saveState );
				expect( newEntity.isClean ).toBe( true );
			} );
			it( 'primary key can not be modified (when save state is not ' +
				'new)', () => {
				const newEntity = entity.clone( true );
				newEntity.id = 999;
				expect( newEntity.id ).toEqual( entity.id );
			} );
		} );
		describe( 'memized factory behaviour on clone', () => {
			const dttFactory = createEntityFactory(
				'datetime',
				DateTimeSchema.schema,
				[ 'DTT_EVT', 'DTT' ]
			);
			const dttEntity = dttFactory.fromExisting( AuthedDateTimeResponse );
			it( 'keeps different entity factories separate', () => {
				// first clone event entity to set the memized factory value.
				entity.clone();
				// next clone datetime entity
				const dateClone = dttEntity.clone( true );
				expect( dateClone.id ).toEqual( dttEntity.id );

				//clone event again
				const eventClone = entity.clone( true );
				expect( eventClone.id ).toEqual( entity.id );
			} );
		} );
	} );
} );
