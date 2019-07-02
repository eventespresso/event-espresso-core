/**
 * Fixture for venue schema
 *
 * This is the v4.8.36 EE Rest API schema for the venues endpoint.
 *
 * @type {Object}
 */
export const VenueSchema = {
	schema: {
		additionalProperties: false,
		properties: {
			_calculated_fields: {
				_protected: {
					items: {
						type: 'string',
						readonly: true,
						description: 'Each name corresponds to a property that is protected by password for this entity and has its default value returned in the response.',
					},
					description: 'Array of property names whose values were replaced with their default (because they are related to a password-protected entity.)',
					type: 'array',
					readonly: true,
				},
				properties: [],
				readonly: true,
				description: 'Available calculated fields for this model.  Fields are only present in the response if explicitly requested',
				type: 'object',
				additionalProperties: false,
			},
			VNU_virtual_phone: {
				'default': '',
				readonly: false,
				description: 'Call in Number',
				type: [
					'string',
					'null',
				],
			},
			VNU_short_desc: {
				'default': '',
				readonly: false,
				description: 'Short Description of Venue',
				type: [
					'string',
					'null',
				],
			},
			change_logs: {
				relation_model: 'Change_Log',
				relation_type: 'EE_Has_Many_Any_Relation',
				readonly: true,
				description: 'The related Change_Log entities to the Venue.',
				type: 'array',
				relation: true,
				items: {
					type: 'object',
				},
			},
			VNU_zip: {
				'default': '',
				readonly: false,
				description: 'Venue Zip\/Postal Code',
				type: [
					'string',
					'null',
				],
			},
			VNU_address2: {
				'default': '',
				readonly: false,
				description: 'Venue Address line 2',
				type: [
					'string',
					'null',
				],
			},
			VNU_modified: {
				'default': '2019-07-02T17:45:48',
				readonly: false,
				description: 'Venue Modified Date - the value for this field is in the timezone of the site.',
				type: 'string',
				format: 'date-time',
			},
			VNU_capacity: {
				'default': - 1,
				readonly: false,
				description: 'Venue Capacity',
				type: [
					'integer',
					'null',
				],
			},
			state: {
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				description: 'The related State entity to the Venue.',
				type: 'object',
				relation_model: 'State',
			},
			parent: {
				'default': 0,
				readonly: false,
				description: 'Venue Parent ID',
				type: 'integer',
			},
			country: {
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				description: 'The related Country entity to the Venue.',
				type: 'object',
				relation_model: 'Country',
			},
			event_venues: {
				relation_model: 'Event_Venue',
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				description: 'The related Event_Venue entities to the Venue.',
				type: 'array',
				relation: true,
				items: {
					type: 'object',
				},
			},
			extra_metas: {
				relation_model: 'Extra_Meta',
				relation_type: 'EE_Has_Many_Any_Relation',
				readonly: true,
				description: 'The related Extra_Meta entities to the Venue.',
				type: 'array',
				relation: true,
				items: {
					type: 'object',
				},
			},
			VNU_city: {
				'default': '',
				readonly: false,
				description: 'Venue City',
				type: [
					'string',
					'null',
				],
			},
			VNU_google_map_link: {
				'default': '',
				readonly: false,
				description: 'Google Map Link',
				type: [
					'string',
					'null',
				],
			},
			comment_status: {
				'default': 'open',
				readonly: false,
				description: 'Comment Status',
				type: 'string',
			},
			VNU_desc: {
				properties: {
					raw: {
						type: 'string',
						description: 'Venue Description - the content as it exists in the database.',
					},
					rendered: {
						type: 'string',
						description: 'Venue Description - the content rendered for display.',
					},
				},
				'default': {
					raw: '',
					rendered: '',
				},
				readonly: false,
				description: 'Venue Description',
				type: 'object',
			},
			VNU_created_gmt: {
				'default': '2019-07-02 17:45:48',
				readonly: false,
				description: 'Date Venue Created - the value for this field is in GMT.',
				type: 'string',
				format: 'date-time',
			},
			wp_user: {
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				description: 'The related WP_User entity to the Venue.',
				type: 'object',
				relation_model: 'WP_User',
			},
			_links: {
				properties: {
					'https:\/\/api.eventespresso.com\/event': {
						readonly: true,
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Event relation to this entity',
								},
								href: {
									type: 'string',
									description: 'The link to the resource for the Event relation(s) to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/event_venue': {
						readonly: true,
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Event_Venue relation to this entity',
								},
								href: {
									type: 'string',
									description: 'The link to the resource for the Event_Venue relation(s) to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/term_taxonomy': {
						readonly: true,
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Term_Taxonomy relation to this entity',
								},
								href: {
									type: 'string',
									description: 'The link to the resource for the Term_Taxonomy relation(s) to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/post_meta': {
						readonly: true,
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Post_Meta relation to this entity',
								},
								href: {
									type: 'string',
									description: 'The link to the resource for the Post_Meta relation(s) to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/term_relationship': {
						readonly: true,
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Term_Relationship relation to this entity',
								},
								href: {
									type: 'string',
									description: 'The link to the resource for the Term_Relationship relation(s) to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/change_log': {
						readonly: true,
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Change_Log relation to this entity',
								},
								href: {
									type: 'string',
									description: 'The link to the resource for the Change_Log relation(s) to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/wp_user': {
						readonly: true,
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single WP_User relation to this entity',
								},
								href: {
									type: 'string',
									description: 'The link to the resource for the WP_User relation(s) to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					self: {
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
								},
							},
							additionalProperties: false,
						},
						description: 'Link to this entities resource.',
						type: 'array',
						readonly: true,
					},
					'https:\/\/api.eventespresso.com\/country': {
						readonly: true,
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Country relation to this entity',
								},
								href: {
									type: 'string',
									description: 'The link to the resource for the Country relation(s) to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/state': {
						readonly: true,
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single State relation to this entity',
								},
								href: {
									type: 'string',
									description: 'The link to the resource for the State relation(s) to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/extra_meta': {
						readonly: true,
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Extra_Meta relation to this entity',
								},
								href: {
									type: 'string',
									description: 'The link to the resource for the Extra_Meta relation(s) to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					collection: {
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
								},
							},
							additionalProperties: false,
						},
						description: 'Link to this entities collection resource.',
						type: 'array',
						readonly: true,
					},
				},
				readonly: true,
				description: 'Various links for resources related to the entity.',
				type: 'object',
				additionalProperties: false,
			},
			ping_status: {
				'default': 'open',
				readonly: false,
				description: 'Ping Status',
				type: 'string',
			},
			VNU_wp_user: {
				'default': 1,
				readonly: false,
				description: 'Venue Creator ID',
				type: 'integer',
				foreign_key: {
					type: 'array',
					'enum': [
						'EE_WP_User',
					],
					description: 'This is a foreign key the points to the given models.',
				},
			},
			link: {
				type: 'string',
				readonly: true,
				description: 'Link to event on WordPress site hosting events.',
			},
			CNT_ISO: {
				'default': '',
				readonly: false,
				description: 'Country Code',
				type: [
					'string',
					'null',
				],
				foreign_key: {
					type: 'array',
					'enum': [
						'EE_Country',
					],
					description: 'This is a foreign key the points to the given models.',
				},
			},
			VNU_identifier: {
				'default': '',
				readonly: false,
				description: 'Venue Identifier',
				type: 'string',
			},
			VNU_created: {
				'default': '2019-07-02T17:45:48',
				readonly: false,
				description: 'Date Venue Created - the value for this field is in the timezone of the site.',
				type: 'string',
				format: 'date-time',
			},
			status: {
				properties: {
					raw: {
						type: 'string',
						'enum': [
							'publish',
							'future',
							'draft',
							'pending',
							'private',
							'trash',
							'auto-draft',
							'inherit',
							'request-pending',
							'request-confirmed',
							'request-failed',
							'request-completed',
							'acf-disabled',
							'cancelled',
							'postponed',
							'sold_out',
						],
						description: 'Event Status - the value in the database.',
					},
					pretty: {
						'enum': [
							'Published',
							'Scheduled',
							'Draft',
							'Pending',
							'Private',
							'Trash',
							'auto-draft',
							'inherit',
							'Pending',
							'Confirmed',
							'Failed',
							'Completed',
							'Inactive',
							'Cancelled',
							'Postponed',
							'Sold Out',
						],
						read_only: true,
						description: 'Event Status - the value for display.',
						type: 'string',
					},
				},
				'default': {
					raw: 'draft',
					pretty: 'Draft',
				},
				readonly: false,
				description: 'Event Status',
				type: 'object',
			},
			VNU_enable_for_gmap: {
				'default': false,
				readonly: false,
				description: 'Show Google Map?',
				type: 'boolean',
			},
			VNU_modified_gmt: {
				'default': '2019-07-02 17:45:48',
				readonly: false,
				description: 'Venue Modified Date - the value for this field is in GMT.',
				type: 'string',
				format: 'date-time',
			},
			events: {
				items: {
					type: 'object',
				},
				relation_model: 'Event',
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				description: 'The related Event entities to the Venue.',
				type: 'array',
				relation: true,
				joining_model_name: 'Event_Venue',
			},
			VNU_address: {
				'default': '',
				readonly: false,
				description: 'Venue Address line 1',
				type: [
					'string',
					'null',
				],
			},
			term_relationships: {
				relation_model: 'Term_Relationship',
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				description: 'The related Term_Relationship entities to the Venue.',
				type: 'array',
				relation: true,
				items: {
					type: 'object',
				},
			},
			VNU_url: {
				'default': '',
				readonly: false,
				description: 'Venue Website',
				type: [
					'string',
					'null',
				],
			},
			_protected: {
				items: {
					type: 'string',
					readonly: true,
					description: 'Each name corresponds to a property that is protected by password for this entity and has its default value returned in the response.',
				},
				description: 'Array of property names whose values were replaced with their default (because they are related to a password-protected entity.)',
				type: 'array',
				readonly: true,
			},
			VNU_name: {
				'default': '',
				readonly: false,
				description: 'Venue Name',
				type: 'string',
			},
			STA_ID: {
				'default': 0,
				readonly: false,
				description: 'State ID',
				type: [
					'integer',
					'null',
				],
				foreign_key: {
					type: 'array',
					'enum': [
						'EE_State',
					],
					description: 'This is a foreign key the points to the given models.',
				},
			},
			VNU_phone: {
				'default': '',
				readonly: false,
				description: 'Venue Phone',
				type: [
					'string',
					'null',
				],
			},
			VNU_virtual_url: {
				'default': '',
				readonly: false,
				description: 'Virtual URL',
				type: [
					'string',
					'null',
				],
			},
			VNU_ID: {
				primary_key: true,
				'default': 0,
				readonly: true,
				description: 'Venue ID',
				type: 'integer',
			},
			password: {
				'default': '',
				readonly: false,
				description: 'Password',
				type: 'string',
			},
			VNU_order: {
				'default': 1,
				readonly: false,
				description: 'Venue order',
				type: 'integer',
			},
			term_taxonomies: {
				items: {
					type: 'object',
				},
				relation_model: 'Term_Taxonomy',
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				description: 'The related Term_Taxonomy entities to the Venue.',
				type: 'array',
				relation: true,
				joining_model_name: 'Term_Relationship',
			},
			post_metas: {
				relation_model: 'Post_Meta',
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				description: 'The related Post_Meta entities to the Venue.',
				type: 'array',
				relation: true,
				items: {
					type: 'object',
				},
			},
		},
		title: 'Venue',
		type: 'object',
		$schema: 'http:\/\/json-schema.org\/draft-04\/schema#',
	},
};

/**
 * Exports the properties property from the Venues schema.
 *
 * @type {Object}
 */
export const VenueSchemaProperties = VenueSchema.schema.properties;
