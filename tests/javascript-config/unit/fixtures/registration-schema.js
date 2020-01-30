/**
 * Fixture for registration schema.
 *
 * This is the v4.8.36 EE Rest API schema for the registration endpoint.
 * @type {Object}
 */
export const RegistrationSchema = {
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		title: 'Registration',
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
					'https://api.eventespresso.com/event': {
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
					'https://api.eventespresso.com/attendee': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Attendee relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Attendee relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/transaction': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Transaction relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Transaction relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/ticket': {
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
					'https://api.eventespresso.com/status': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Status relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Status relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/answer': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Answer relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Answer relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/checkin': {
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
					'https://api.eventespresso.com/registration_payment': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Registration_Payment relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Registration_Payment relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/payment': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Payment relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Payment relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/message': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Message relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Message relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/extra_meta': {
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
					'https://api.eventespresso.com/change_log': {
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
					datetime_checkin_stati: {
						description: 'Returns the checkin status for each datetime this registration has access to.',
						type: 'object',
						properties: [],
						additionalProperties: {
							description: 'Keys are date-time ids and values are the check-in status',
							type: 'string',
						},
					},
				},
				additionalProperties: false,
				readonly: true,
			},
			REG_ID: {
				description: 'Registration ID',
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
			ATT_ID: {
				description: 'Attendee ID',
				type: 'integer',
				readonly: false,
				default: 0,
				foreign_key: {
					description: 'This is a foreign key the points to the given models.',
					type: 'array',
					enum: [
						'EE_Attendee',
					],
				},
			},
			TXN_ID: {
				description: 'Transaction ID',
				type: 'integer',
				readonly: false,
				default: 0,
				foreign_key: {
					description: 'This is a foreign key the points to the given models.',
					type: 'array',
					enum: [
						'EE_Transaction',
					],
				},
			},
			TKT_ID: {
				description: 'Ticket ID',
				type: 'integer',
				readonly: false,
				default: 0,
				foreign_key: {
					description: 'This is a foreign key the points to the given models.',
					type: 'array',
					enum: [
						'EE_Ticket',
					],
				},
			},
			STS_ID: {
				description: 'Status ID',
				type: 'string',
				readonly: false,
				default: 'RIC',
				foreign_key: {
					description: 'This is a foreign key the points to the given models.',
					type: 'array',
					enum: [
						'EE_Status',
					],
				},
			},
			REG_date: {
				description: 'Time registration occurred - the value for this field is in the timezone of the site.',
				type: 'string',
				readonly: false,
				default: '2018-09-18T17:29:49',
				format: 'date-time',
			},
			REG_final_price: {
				description: 'Registration&#039;s share of the transaction total',
				type: 'object',
				readonly: false,
				default: {
					raw: 0,
					pretty: '$0.00 <span class="currency-code">(USD)</span>',
				},
				properties: {
					raw: {
						description: 'Registration&#039;s share of the transaction total - the raw value as it exists in the database as a simple float.',
						type: 'number',
					},
					pretty: {
						description: 'Registration&#039;s share of the transaction total - formatted for display in the set currency and decimal places.',
						type: 'string',
						format: 'money',
					},
				},
			},
			REG_paid: {
				description: 'Amount paid to date towards registration',
				type: 'object',
				readonly: false,
				default: {
					raw: 0,
					pretty: '$0.00 <span class="currency-code">(USD)</span>',
				},
				properties: {
					raw: {
						description: 'Amount paid to date towards registration - the raw value as it exists in the database as a simple float.',
						type: 'number',
					},
					pretty: {
						description: 'Amount paid to date towards registration - formatted for display in the set currency and decimal places.',
						type: 'string',
						format: 'money',
					},
				},
			},
			REG_session: {
				description: 'Session ID of registration',
				type: 'string',
				readonly: false,
				default: '',
			},
			REG_code: {
				description: 'Unique Code for this registration',
				type: 'string',
				readonly: false,
				default: '',
			},
			REG_url_link: {
				description: 'String to be used in URL for identifying registration',
				type: 'string',
				readonly: false,
				default: '',
			},
			REG_count: {
				description: 'Count of this registration in the group registration ',
				type: [
					'integer',
					'null',
				],
				readonly: false,
				default: 1,
			},
			REG_group_size: {
				description: 'Number of registrations on this group',
				type: 'integer',
				readonly: false,
				default: 1,
			},
			REG_att_is_going: {
				description: 'Flag indicating the registrant plans on attending',
				type: 'boolean',
				readonly: false,
				default: false,
			},
			REG_deleted: {
				description: 'Flag indicating if registration has been archived or not.',
				type: 'boolean',
				readonly: false,
				default: false,
			},
			REG_date_gmt: {
				description: 'Time registration occurred - the value for this field is in GMT.',
				type: 'string',
				readonly: false,
				default: '2018-09-18 17:29:49',
				format: 'date-time',
			},
			event: {
				description: 'The related Event entity to the Registration.',
				type: 'object',
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				relation_model: 'Event',
			},
			attendee: {
				description: 'The related Attendee entity to the Registration.',
				type: 'object',
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				relation_model: 'Attendee',
			},
			transaction: {
				description: 'The related Transaction entity to the Registration.',
				type: 'object',
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				relation_model: 'Transaction',
			},
			ticket: {
				description: 'The related Ticket entity to the Registration.',
				type: 'object',
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				relation_model: 'Ticket',
			},
			status: {
				description: 'The related Status entity to the Registration.',
				type: 'object',
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				relation_model: 'Status',
			},
			answers: {
				description: 'The related Answer entities to the Registration.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Answer',
			},
			checkins: {
				description: 'The related Checkin entities to the Registration.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Checkin',
			},
			registration_payments: {
				description: 'The related Registration_Payment entities to the Registration.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Registration_Payment',
			},
			payments: {
				description: 'The related Payment entities to the Registration.',
				type: 'array',
				relation: true,
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				joining_model_name: 'Registration_Payment',
				items: {
					type: 'object',
				},
				relation_model: 'Payment',
			},
			messages: {
				description: 'The related Message entities to the Registration.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Any_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Message',
			},
			extra_metas: {
				description: 'The related Extra_Meta entities to the Registration.',
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
				description: 'The related Change_Log entities to the Registration.',
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
 * Exports the properties property from the Registration Schema
 *
 * @type {Object}
 */
export const RegistrationSchemaProperties =
	RegistrationSchema.schema.properties;
