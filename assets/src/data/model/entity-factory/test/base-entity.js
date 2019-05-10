/**
 * External imports
 */
import { DateTime } from '@eventespresso/value-objects';
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
		'evtId',
		'name',
		'evtName',
		'setEVT_name',
		'nameRendered',
		'desc',
		'evtDesc',
		'setEVT_desc',
		'descRendered',
		'slug',
		'evtSlug',
		'setEVT_slug',
		'slugRendered',
		'created',
		'evtCreated',
		'setEVT_created',
		'createdRendered',
		'shortDesc',
		'evtShortDesc',
		'setEVT_short_desc',
		'shortDescRendered',
		'modified',
		'evtModified',
		'setEVT_modified',
		'modifiedRendered',
		'wpUser',
		'evtWpUser',
		'setEVT_wp_user',
		'wpUserRendered',
		'setParent',
		'parentRendered',
		'order',
		'evtOrder',
		'setEVT_order',
		'orderRendered',
		'setStatus',
		'statusRendered',
		'commentStatus',
		'setComment_status',
		'commentStatusRendered',
		'pingStatus',
		'setPing_status',
		'pingStatusRendered',
		'displayDesc',
		'evtDisplayDesc',
		'setEVT_display_desc',
		'displayDescRendered',
		'displayTicketSelector',
		'evtDisplayTicketSelector',
		'setEVT_display_ticket_selector',
		'displayTicketSelectorRendered',
		'visibleOn',
		'evtVisibleOn',
		'setEVT_visible_on',
		'visibleOnRendered',
		'additionalLimit',
		'evtAdditionalLimit',
		'setEVT_additional_limit',
		'additionalLimitRendered',
		'defaultRegistrationStatus',
		'evtDefaultRegistrationStatus',
		'defaultRegistrationStatusRendered',
		'setEVT_default_registration_status',
		'memberOnly',
		'evtMemberOnly',
		'setEVT_member_only',
		'memberOnlyRendered',
		'phone',
		'evtPhone',
		'setEVT_phone',
		'phoneRendered',
		'allowOverflow',
		'evtAllowOverflow',
		'setEVT_allow_overflow',
		'allowOverflowRendered',
		'timezoneString',
		'evtTimezoneString',
		'setEVT_timezone_string',
		'timezoneStringRendered',
		'externalUrl',
		'evtExternalUrl',
		'setEVT_external_URL',
		'externalUrlRendered',
		'donations',
		'evtDonations',
		'setEVT_donations',
		'donationsRendered',
		'forClone',
		'forUpdate',
		'forInsert',
		'forPersist',
		'getRendered',
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
					[ 'EVT_name', 'evtName', 'name', 'nameRendered' ],
					'Some Event',
				],
				[
					[ 'EVT_desc', 'desc', 'evtDesc', 'descRendered' ],
					'Some description',
				],
				[
					[ 'EVT_slug', 'evtSlug', 'slug', 'slugRendered' ],
					'',
				],
				[
					[ 'EVT_wp_user', 'wpUser', 'evtWpUser', 'wpUserRendered' ],
					1,
				],
				[
					[ 'parent', 'parentRendered' ],
					0,
				],
				[
					[ 'status' ],
					'draft',
				],
				[
					[ 'statusRendered' ],
					'Draft',
				],
				[
					[
						'EVT_display_ticket_selector',
						'evtDisplayTicketSelector',
						'displayTicketSelector',
						'displayTicketSelectorRendered',
					],
					true,
				],
				[
					[
						'EVT_default_registration_status',
						'evtDefaultRegistrationStatus',
						'defaultRegistrationStatus',
					],
					'RPP',
				],
				[
					[ 'defaultRegistrationStatusRendered' ],
					'PENDING_PAYMENT',
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
						'evtVisibleOn',
						'visibleOn',
					];
					testProperties.forEach( ( testProperty ) => {
						it( 'event.' + testProperty + ' is instance of ' +
							'DateTime', () => {
							expect( event[ testProperty ] )
								.toBeInstanceOf( DateTime );
						} );
					} );
					it( 'event.visibleOnRendered is a string and has ' +
						'expected value', () => {
						expect( event.visibleOnRendered )
							.toBe( '2018-09-17T14:36:59' );
					} );
				} );
			describe( 'primary key property values are a cuid (and the same ' +
				'cuid)', () => {
				const idProps = [ 'EVT_ID', 'id', 'evtId' ];
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
					expectedValue = DateTime.fromISO(
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
							[ 'EVT_name', 'evtName', 'name', 'nameRendered' ],
						],
						[
							[ 'EVT_desc', 'rendered' ],
							[ 'EVT_desc', 'desc', 'evtDesc', 'descRendered' ],
						],
						[
							'EVT_slug',
							[ 'EVT_slug', 'evtSlug', 'slug', 'slugRendered' ],
						],
						[
							[ 'EVT_created', 'date' ],
							[
								'EVT_created',
								'evtCreated',
								'created',
							],
						],
						[
							'EVT_created',
							[ 'createdRendered' ],
						],
						[
							'EVT_wp_user',
							[
								'EVT_wp_user',
								'wpUser',
								'evtWpUser',
								'wpUserRendered',
							],
						],
						[
							[ 'status', 'raw' ],
							[ 'status' ],
						],
						[
							[ 'status', 'pretty' ],
							[ 'statusRendered' ],
						],
						[
							'parent',
							[ 'parent', 'parentRendered' ],
						],
						[
							'EVT_display_ticket_selector',
							[
								'EVT_display_ticket_selector',
								'evtDisplayTicketSelector',
								'displayTicketSelector',
								'displayTicketSelectorRendered',
							],
						],
						[
							[ 'EVT_default_registration_status', 'raw' ],
							[
								'EVT_default_registration_status',
								'evtDefaultRegistrationStatus',
								'defaultRegistrationStatus',
							],
						],
						[
							[ 'EVT_default_registration_status', 'pretty' ],
							[ 'defaultRegistrationStatusRendered' ],
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
								[ 'EVT_name', 'evtName', 'name', 'nameRendered' ],
							],
							[
								[ 'EVT_desc', 'raw' ],
								[ 'EVT_desc', 'desc', 'evtDesc' ],
							],
							[
								[ 'EVT_desc', 'rendered' ],
								[ 'descRendered' ],
							],
							[
								'EVT_slug',
								[ 'EVT_slug', 'evtSlug', 'slug', 'slugRendered' ],
							],
							[
								[ 'EVT_created', 'date' ],
								[
									'EVT_created',
									'evtCreated',
									'created',
								],
							],
							[
								'EVT_created',
								[ 'createdRendered' ],
							],
							[
								'EVT_wp_user',
								[
									'EVT_wp_user',
									'wpUser',
									'evtWpUser',
									'wpUserRendered',
								],
							],
							[
								[ 'status', 'raw' ],
								[ 'status' ],
							],
							[
								[ 'status', 'pretty' ],
								[ 'statusRendered' ],
							],
							[
								'parent',
								[ 'parent', 'parentRendered' ],
							],
							[
								'EVT_display_ticket_selector',
								[
									'EVT_display_ticket_selector',
									'evtDisplayTicketSelector',
									'displayTicketSelector',
									'displayTicketSelectorRendered',
								],
							],
							[
								[ 'EVT_default_registration_status', 'raw' ],
								[
									'EVT_default_registration_status',
									'evtDefaultRegistrationStatus',
									'defaultRegistrationStatus',
								],
							],
							[
								[ 'EVT_default_registration_status', 'pretty' ],
								[ 'defaultRegistrationStatusRendered' ],
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
			'dttId',
			'id',
			'EVT_ID',
			'evtId',
			'DTT_EVT_start',
			'dttEvtStart',
			'evtStart',
			'start',
			'startRendered',
			'soldRendered',
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
	} );
} );
