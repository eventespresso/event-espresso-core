export const DateTimeSchema = {
	schema: {
		$schema: 'http:\/\/json-schema.org\/draft-04\/schema#',
		title: 'Datetime',
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
					'https:\/\/api.eventespresso.com\/ticket': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Ticket relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Ticket relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/event': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Event relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Event relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https:\/\/api.eventespresso.com\/checkin': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Checkin relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Checkin relation to this entity',
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
				properties: {
					spaces_remaining_considering_tickets: {
						description: 'Calculates the total spaces available on the datetime, taking into account ticket limits too.',
						type: 'number',
					},
					registrations_checked_in_count: {
						description: 'Counts registrations who have checked into this datetime.',
						type: 'number',
					},
					registrations_checked_out_count: {
						description: 'Counts registrations who have checked out of this datetime.',
						type: 'number',
					},
					spots_taken_pending_payment: {
						description: 'The count of pending-payment registrations for this event (regardless of how many datetimes each registration&#039;s ticket purchase is for',
						type: 'number',
					},
				},
				additionalProperties: false,
				readonly: true,
			},
			DTT_ID: {
				description: 'Datetime ID',
				type: 'integer',
				readonly: true,
				default: 0,
				primary_key: true,
			},
			EVT_ID: {
				description: 'Event ID',
				type: 'integer',
				readonly: false,
				default: 0,
				foreign_key: {
					description: 'This is a foreign key the points to the given models.',
					type: 'array',
					enum: [
						'EE_Event',
					],
				},
			},
			DTT_name: {
				description: 'Datetime Name',
				type: 'string',
				readonly: false,
				default: '',
			},
			DTT_description: {
				description: 'Description for Datetime',
				type: 'object',
				readonly: false,
				default: {
					raw: '',
					rendered: '',
				},
				properties: {
					raw: {
						description: 'Description for Datetime - the content as it exists in the database.',
						type: 'string',
					},
					rendered: {
						description: 'Description for Datetime - the content rendered for display.',
						type: 'string',
					},
				},
			},
			DTT_EVT_start: {
				description: 'Start time\/date of Event - the value for this field is in the timezone of the site.',
				type: 'string',
				readonly: false,
				default: '2018-10-03T15:16:52',
				format: 'date-time',
			},
			DTT_EVT_end: {
				description: 'End time\/date of Event - the value for this field is in the timezone of the site.',
				type: 'string',
				readonly: false,
				default: '2018-10-03T15:16:52',
				format: 'date-time',
			},
			DTT_reg_limit: {
				description: 'Registration Limit for this time',
				type: [
					'integer',
					'null',
				],
				readonly: false,
				default: -1,
			},
			DTT_sold: {
				description: 'How many sales for this Datetime that have occurred',
				type: [
					'integer',
					'null',
				],
				readonly: false,
				default: 0,
			},
			DTT_reserved: {
				description: 'Quantity of tickets reserved, but not yet fully purchased',
				type: 'integer',
				readonly: false,
				default: 0,
			},
			DTT_is_primary: {
				description: 'Flag indicating datetime is primary one for event',
				type: 'boolean',
				readonly: false,
				default: false,
			},
			DTT_order: {
				description: 'The order in which the Datetime is displayed',
				type: 'integer',
				readonly: false,
				default: 0,
			},
			DTT_parent: {
				description: 'Indicates what DTT_ID is the parent of this DTT_ID',
				type: [
					'integer',
					'null',
				],
				readonly: false,
				default: 0,
			},
			DTT_deleted: {
				description: 'Flag indicating datetime is archived',
				type: 'boolean',
				readonly: false,
				default: false,
			},
			DTT_EVT_start_gmt: {
				description: 'Start time\/date of Event - the value for this field is in GMT.',
				type: 'string',
				readonly: false,
				default: '2018-10-03 15:16:52',
				format: 'date-time',
			},
			DTT_EVT_end_gmt: {
				description: 'End time\/date of Event - the value for this field is in GMT.',
				type: 'string',
				readonly: false,
				default: '2018-10-03 15:16:52',
				format: 'date-time',
			},
			tickets: {
				description: 'The related Ticket entities to the Datetime.',
				type: 'array',
				relation: true,
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				joining_model_name: 'Datetime_Ticket',
				items: {
					type: 'object',
				},
				relation_model: 'Ticket',
			},
			event: {
				description: 'The related Event entity to the Datetime.',
				type: 'object',
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				relation_model: 'Event',
			},
			checkins: {
				description: 'The related Checkin entities to the Datetime.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Checkin',
			},
			extra_metas: {
				description: 'The related Extra_Meta entities to the Datetime.',
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
				description: 'The related Change_Log entities to the Datetime.',
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

export const DateTimeSchemaProperties = DateTimeSchema.schema.properties;
