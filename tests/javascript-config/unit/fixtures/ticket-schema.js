/**
 * Fixture for ticket schema.
 *
 * This is the v4.8.36 EE Rest API schema for the tickets endpoint
 *
 * @type {Object}
 */
export const TicketSchema = {
	schema: {
		$schema: 'http:\/\/json-schema.org\/draft-04\/schema#',
		title: 'Ticket',
		type: 'object',
		properties: {
			link: {
				description: 'Link to event on WordPress site hosting events.',
				type: 'string',
				readonly: true,
			},
			_links: {
				description: 'Various links for resources related to the entity.',
				type: 'object',
				readonly: true,
				properties: {
					self: {
						description: 'Link to this entities resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
								},
							},
							additionalProperties: false,
						},
						readonly: true,
					},
					collection: {
						description: 'Link to this entities collection resource.',
						type: 'array',
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
								},
							},
							additionalProperties: false,
						},
						readonly: true,
					},
					'https:\/\/api.eventespresso.com\/datetime': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Datetime relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Datetime relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/datetime_ticket': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Datetime_Ticket relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Datetime_Ticket relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/price': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Price relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Price relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/ticket_template': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Ticket_Template relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Ticket_Template relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/registration': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Registration relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Registration relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/wp_user': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the WP_User relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single WP_User relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/extra_meta': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Extra_Meta relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Extra_Meta relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/change_log': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Change_Log relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Change_Log relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
				},
				additionalProperties: false,
			},
			_calculated_fields: {
				description: 'Available calculated fields for this model.  Fields are only present in the response if explicitly requested',
				type: 'object',
				properties: [],
				additionalProperties: false,
				readonly: true,
				_protected: {
					description: 'Array of property names whose values were replaced with their default (because they are related to a password-protected entity.)',
					type: 'array',
					items: {
						description: 'Each name corresponds to a property that is protected by password for this entity and has its default value returned in the response.',
						type: 'string',
						readonly: true,
					},
					readonly: true,
				},
			},
			_protected: {
				description: 'Array of property names whose values were replaced with their default (because they are related to a password-protected entity.)',
				type: 'array',
				items: {
					description: 'Each name corresponds to a property that is protected by password for this entity and has its default value returned in the response.',
					type: 'string',
					readonly: true,
				},
				readonly: true,
			},
			TKT_ID: {
				description: 'Ticket ID',
				type: 'integer',
				readonly: true,
				'default': 0,
				primary_key: true,
			},
			TTM_ID: {
				description: 'Ticket Template ID',
				type: 'integer',
				readonly: false,
				'default': 0,
				foreign_key: {
					description: 'This is a foreign key the points to the given models.',
					type: 'array',
					'enum': [
						'EE_Ticket_Template',
					],
				},
			},
			TKT_name: {
				description: 'Ticket Name',
				type: 'string',
				readonly: false,
				'default': '',
			},
			TKT_description: {
				description: 'Description of Ticket',
				type: 'object',
				readonly: false,
				'default': {
					raw: '',
					rendered: '',
				},
				properties: {
					raw: {
						description: 'Description of Ticket - the content as it exists in the database.',
						type: 'string',
					},
					rendered: {
						description: 'Description of Ticket - the content rendered for display.',
						type: 'string',
					},
				},
			},
			TKT_start_date: {
				description: 'Start time\/date of Ticket - the value for this field is in the timezone of the site.',
				type: 'string',
				readonly: false,
				'default': '2019-06-19T18:49:00',
				format: 'date-time',
			},
			TKT_end_date: {
				description: 'End time\/date of Ticket - the value for this field is in the timezone of the site.',
				type: 'string',
				readonly: false,
				'default': '2019-06-19T18:49:00',
				format: 'date-time',
			},
			TKT_min: {
				description: 'Minimum quantity of this ticket that must be purchased',
				type: 'integer',
				readonly: false,
				'default': 0,
			},
			TKT_max: {
				description: 'Maximum quantity of this ticket that can be purchased in one transaction',
				type: [
					'integer',
					'null',
				],
				readonly: false,
				'default': - 1,
			},
			TKT_price: {
				description: 'Final calculated price for ticket',
				type: 'object',
				readonly: false,
				'default': {
					raw: 0,
					pretty: '$0.00 <span class="currency-code">(USD)<\/span>',
				},
				properties: {
					raw: {
						description: 'Final calculated price for ticket - the raw value as it exists in the database as a simple float.',
						type: 'number',
					},
					pretty: {
						description: 'Final calculated price for ticket - formatted for display in the set currency and decimal places.',
						type: 'string',
						format: 'money',
					},
				},
			},
			TKT_sold: {
				description: 'Number of this ticket sold',
				type: 'integer',
				readonly: false,
				'default': 0,
			},
			TKT_qty: {
				description: 'Quantity of this ticket that is available',
				type: [
					'integer',
					'null',
				],
				readonly: false,
				'default': - 1,
			},
			TKT_reserved: {
				description: 'Quantity of this ticket that is reserved, but not yet fully purchased',
				type: 'integer',
				readonly: false,
				'default': 0,
			},
			TKT_uses: {
				description: 'Number of datetimes this ticket can be used at',
				type: [
					'integer',
					'null',
				],
				readonly: false,
				'default': - 1,
			},
			TKT_required: {
				description: 'Flag indicating whether this ticket must be purchased with a transaction',
				type: 'boolean',
				readonly: false,
				'default': false,
			},
			TKT_taxable: {
				description: 'Flag indicating whether there is tax applied on this ticket',
				type: 'boolean',
				readonly: false,
				'default': false,
			},
			TKT_is_default: {
				description: 'Flag indicating that this ticket is a default ticket',
				type: 'boolean',
				readonly: false,
				'default': false,
			},
			TKT_order: {
				description: 'The order in which the Ticket is displayed in the editor (used for autosaves when the form doesn&#039;t have the ticket ID yet)',
				type: 'integer',
				readonly: false,
				'default': 0,
			},
			TKT_row: {
				description: 'How tickets are displayed in the ui',
				type: 'integer',
				readonly: false,
				'default': 0,
			},
			TKT_deleted: {
				description: 'Flag indicating if this has been archived or not',
				type: 'boolean',
				readonly: false,
				'default': false,
			},
			TKT_wp_user: {
				description: 'Ticket Creator ID',
				type: 'integer',
				readonly: false,
				'default': 1,
				foreign_key: {
					description: 'This is a foreign key the points to the given models.',
					type: 'array',
					'enum': [
						'EE_WP_User',
					],
				},
			},
			TKT_parent: {
				description: 'Indicates what TKT_ID is the parent of this TKT_ID (used in autosaves\/revisions)',
				type: [
					'integer',
					'null',
				],
				readonly: false,
				'default': 0,
			},
			TKT_start_date_gmt: {
				description: 'Start time\/date of Ticket - the value for this field is in GMT.',
				type: 'string',
				readonly: false,
				'default': '2019-06-19 18:49:00',
				format: 'date-time',
			},
			TKT_end_date_gmt: {
				description: 'End time\/date of Ticket - the value for this field is in GMT.',
				type: 'string',
				readonly: false,
				'default': '2019-06-19 18:49:00',
				format: 'date-time',
			},
			datetimes: {
				description: 'The related Datetime entities to the Ticket.',
				type: 'array',
				relation: true,
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				joining_model_name: 'Datetime_Ticket',
				items: {
					type: 'object',
				},
				relation_model: 'Datetime',
			},
			datetime_tickets: {
				description: 'The related Datetime_Ticket entities to the Ticket.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Datetime_Ticket',
			},
			prices: {
				description: 'The related Price entities to the Ticket.',
				type: 'array',
				relation: true,
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				joining_model_name: 'Ticket_Price',
				items: {
					type: 'object',
				},
				relation_model: 'Price',
			},
			ticket_template: {
				description: 'The related Ticket_Template entity to the Ticket.',
				type: 'object',
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				relation_model: 'Ticket_Template',
			},
			registrations: {
				description: 'The related Registration entities to the Ticket.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Registration',
			},
			wp_user: {
				description: 'The related WP_User entity to the Ticket.',
				type: 'object',
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				relation_model: 'WP_User',
			},
			extra_metas: {
				description: 'The related Extra_Meta entities to the Ticket.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Any_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Extra_Meta',
			},
			change_logs: {
				description: 'The related Change_Log entities to the Ticket.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Any_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Change_Log',
			},
		},
		additionalProperties: false,
	},
};

/**
 * Exports the properties propty from the Ticket Schema
 *
 * @type {Object}
 */
export const TicketSchemaProperties = TicketSchema.schema.properties;