/**
 * Fixture for event schema.
 *
 * This is the v4.8.36 EE Rest API schema for the event endpoint.
 */
export const EventSchema = {
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		title: 'Event',
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
					'https://api.eventespresso.com/registration': {
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
					'https://api.eventespresso.com/datetime': {
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
					'https://api.eventespresso.com/question_group': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Question_Group relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Question_Group relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/venue': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Venue relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Venue relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/term_relationship': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Term_Relationship relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Term_Relationship relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/term_taxonomy': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Term_Taxonomy relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Term_Taxonomy relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/message_template_group': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Message_Template_Group relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Message_Template_Group relation to this entity',
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
					'https://api.eventespresso.com/wp_user': {
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
					'https://api.eventespresso.com/post_meta': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Post_Meta relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Post_Meta relation to this entity',
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
					'https://api.eventespresso.com/person': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Person relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Person relation to this entity',
								},
							},
							additionalProperties: false,
						},
					},
					'https://api.eventespresso.com/person_post': {
						description: 'Array of objects describing the link(s) for this relation resource.',
						type: 'array',
						readonly: true,
						items: {
							type: 'object',
							properties: {
								href: {
									type: 'string',
									description: 'The link to the resource for the Person_Post relation(s) to this entity',
								},
								single: {
									type: 'boolean',
									description: 'Whether or not there is only a single Person_Post relation to this entity',
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
					optimum_sales_at_start: {
						description: 'The total spaces on the event (not subtracting sales, but taking sales into account; so this is the optimum sales that CAN still be achieved.',
						type: 'number',
					},
					optimum_sales_now: {
						description: 'The total spaces on the event (ignoring all sales; so this is the optimum sales that could have been achieved.',
						type: 'number',
					},
					spaces_remaining: {
						description: 'The optimum_sales_number result, minus total sales so far.',
						type: 'number',
					},
					spots_taken: {
						description: 'The number of approved registrations for this event (regardless of how many datetimes each registration&#039;s ticket purchase is for)',
						type: 'number',
					},
					spots_taken_pending_payment: {
						description: 'The number of pending-payment registrations for this event (regardless of how many datetimes each registration&#039;s ticket purchase is for)',
						type: 'number',
					},
					registrations_checked_in_count: {
						description: 'The count of all the registrations who have checked into one of this event&#039;s datetimes.',
						type: 'number',
					},
					registrations_checked_out_count: {
						description: 'The count of all registrations who have checked out of one of this event&#039;s datetimes.',
						type: 'number',
					},
					image_thumbnail: {
						description: 'The thumbnail image data.',
						type: 'object',
						properties: {
							url: {
								type: 'string',
							},
							width: {
								type: 'number',
							},
							height: {
								type: 'number',
							},
							generated: {
								type: 'boolean',
							},
						},
						additionalProperties: false,
					},
					image_medium: {
						description: 'The medium image data.',
						type: 'object',
						properties: {
							url: {
								type: 'string',
							},
							width: {
								type: 'number',
							},
							height: {
								type: 'number',
							},
							generated: {
								type: 'boolean',
							},
						},
						additionalProperties: false,
					},
					image_medium_large: {
						description: 'The medium-large image data.',
						type: 'object',
						properties: {
							url: {
								type: 'string',
							},
							width: {
								type: 'number',
							},
							height: {
								type: 'number',
							},
							generated: {
								type: 'boolean',
							},
						},
						additionalProperties: false,
					},
					image_large: {
						description: 'The large image data.',
						type: 'object',
						properties: {
							url: {
								type: 'string',
							},
							width: {
								type: 'number',
							},
							height: {
								type: 'number',
							},
							generated: {
								type: 'boolean',
							},
						},
						additionalProperties: false,
					},
					image_post_thumbnail: {
						description: 'The post-thumbnail image data.',
						type: 'object',
						properties: {
							url: {
								type: 'string',
							},
							width: {
								type: 'number',
							},
							height: {
								type: 'number',
							},
							generated: {
								type: 'boolean',
							},
						},
						additionalProperties: false,
					},
					image_full: {
						description: 'The full size image data',
						type: 'object',
						properties: {
							url: {
								type: 'string',
							},
							width: {
								type: 'number',
							},
							height: {
								type: 'number',
							},
							generated: {
								type: 'boolean',
							},
						},
						additionalProperties: false,
					},
				},
				additionalProperties: false,
				readonly: true,
			},
			EVT_ID: {
				description: 'Post ID for Event',
				type: 'integer',
				readonly: true,
				default: 0,
				primary_key: true,
			},
			EVT_name: {
				description: 'Event Name',
				type: 'string',
				readonly: false,
				default: '',
			},
			EVT_desc: {
				description: 'Event Description',
				type: 'object',
				readonly: false,
				default: {
					raw: '',
					rendered: '',
				},
				properties: {
					raw: {
						description: 'Event Description - the content as it exists in the database.',
						type: 'string',
					},
					rendered: {
						description: 'Event Description - the content rendered for display.',
						type: 'string',
					},
				},
			},
			EVT_slug: {
				description: 'Event Slug',
				type: 'string',
				readonly: false,
				default: '',
			},
			EVT_created: {
				description: 'Date/Time Event Created - the value for this field is in the timezone of the site.',
				type: 'string',
				readonly: false,
				default: '2018-09-17T14:36:59',
				format: 'date-time',
			},
			EVT_short_desc: {
				description: 'Event Short Description',
				type: 'string',
				readonly: false,
				default: '',
			},
			EVT_modified: {
				description: 'Date/Time Event Modified - the value for this field is in the timezone of the site.',
				type: 'string',
				readonly: false,
				default: '2018-09-17T14:36:59',
				format: 'date-time',
			},
			EVT_wp_user: {
				description: 'Event Creator ID',
				type: 'integer',
				readonly: false,
				default: 1,
				foreign_key: {
					description: 'This is a foreign key the points to the given models.',
					type: 'array',
					enum: [
						'EE_WP_User',
					],
				},
			},
			parent: {
				description: 'Event Parent ID',
				type: 'integer',
				readonly: false,
				default: 0,
			},
			EVT_order: {
				description: 'Event Menu Order',
				type: 'integer',
				readonly: false,
				default: 1,
			},
			status: {
				description: 'Event Status',
				type: 'object',
				readonly: false,
				default: {
					raw: 'draft',
					pretty: 'Draft',
				},
				properties: {
					raw: {
						description: 'Event Status - the value in the database.',
						type: 'string',
						enum: [
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
							'cancelled',
							'postponed',
							'sold_out',
						],
					},
					pretty: {
						description: 'Event Status - the value for display.',
						type: 'string',
						enum: [
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
							'Cancelled',
							'Postponed',
							'Sold Out',
						],
						read_only: true,
					},
				},
			},
			comment_status: {
				description: 'Comment Status',
				type: 'string',
				readonly: false,
				default: 'open',
			},
			ping_status: {
				description: 'Ping Status',
				type: 'string',
				readonly: false,
				default: 'open',
			},
			EVT_display_desc: {
				description: 'Display Description Flag',
				type: 'boolean',
				readonly: false,
				default: true,
			},
			EVT_display_ticket_selector: {
				description: 'Display Ticket Selector Flag',
				type: 'boolean',
				readonly: false,
				default: true,
			},
			EVT_visible_on: {
				description: 'Event Visible Date - the value for this field is in the timezone of the site.',
				type: [
					'string',
					'null',
				],
				readonly: false,
				default: '2018-09-17T14:36:59',
				format: 'date-time',
			},
			EVT_additional_limit: {
				description: 'Limit of Additional Registrations on Same Transaction',
				type: [
					'integer',
					'null',
				],
				readonly: false,
				default: 5,
			},
			EVT_default_registration_status: {
				description: 'Default Registration Status on this Event',
				type: 'object',
				readonly: false,
				default: {
					raw: 'RPP',
					pretty: 'PENDING_PAYMENT',
				},
				properties: {
					raw: {
						description: 'Default Registration Status on this Event - the value in the database.',
						type: 'string',
						enum: [
							'RAP',
							'RCN',
							'RDC',
							'RIC',
							'RNA',
							'RPP',
							'RWL',
						],
					},
					pretty: {
						description: 'Default Registration Status on this Event - the value for display.',
						type: 'string',
						enum: [
							'APPROVED',
							'CANCELLED',
							'DECLINED',
							'INCOMPLETE',
							'NOT_APPROVED',
							'PENDING_PAYMENT',
							'WAIT_LIST',
						],
						read_only: true,
					},
				},
			},
			EVT_member_only: {
				description: 'Member-Only Event Flag',
				type: 'boolean',
				readonly: false,
				default: false,
			},
			EVT_phone: {
				description: 'Event Phone Number',
				type: 'string',
				readonly: false,
				default: '',
			},
			EVT_allow_overflow: {
				description: 'Allow Overflow on Event',
				type: 'boolean',
				readonly: false,
				default: false,
			},
			EVT_timezone_string: {
				description: 'Timezone (name) for Event times',
				type: 'string',
				readonly: false,
				default: '',
			},
			EVT_external_URL: {
				description: 'URL of Event Page if hosted elsewhere',
				type: [
					'string',
					'null',
				],
				readonly: false,
				default: '',
			},
			EVT_donations: {
				description: 'Accept Donations?',
				type: 'boolean',
				readonly: false,
				default: false,
			},
			EVT_created_gmt: {
				description: 'Date/Time Event Created - the value for this field is in GMT.',
				type: 'string',
				readonly: false,
				default: '2018-09-17 14:36:59',
				format: 'date-time',
			},
			EVT_modified_gmt: {
				description: 'Date/Time Event Modified - the value for this field is in GMT.',
				type: 'string',
				readonly: false,
				default: '2018-09-17 14:36:59',
				format: 'date-time',
			},
			EVT_visible_on_gmt: {
				description: 'Event Visible Date - the value for this field is in GMT.',
				type: [
					'string',
					'null',
				],
				readonly: false,
				default: '2018-09-17 14:36:59',
				format: 'date-time',
			},
			registrations: {
				description: 'The related Registration entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Registration',
			},
			datetimes: {
				description: 'The related Datetime entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Datetime',
			},
			question_groups: {
				description: 'The related Question_Group entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				joining_model_name: 'Event_Question_Group',
				items: {
					type: 'object',
				},
				relation_model: 'Question_Group',
			},
			venues: {
				description: 'The related Venue entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				joining_model_name: 'Event_Venue',
				items: {
					type: 'object',
				},
				relation_model: 'Venue',
			},
			term_relationships: {
				description: 'The related Term_Relationship entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Term_Relationship',
			},
			term_taxonomies: {
				description: 'The related Term_Taxonomy entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				joining_model_name: 'Term_Relationship',
				items: {
					type: 'object',
				},
				relation_model: 'Term_Taxonomy',
			},
			message_template_groups: {
				description: 'The related Message_Template_Group entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				joining_model_name: 'Event_Message_Template',
				items: {
					type: 'object',
				},
				relation_model: 'Message_Template_Group',
			},
			attendees: {
				description: 'The related Attendee entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				joining_model_name: 'Registration',
				items: {
					type: 'object',
				},
				relation_model: 'Attendee',
			},
			wp_user: {
				description: 'The related WP_User entity to the Event.',
				type: 'object',
				relation: true,
				relation_type: 'EE_Belongs_To_Relation',
				readonly: true,
				relation_model: 'WP_User',
			},
			post_metas: {
				description: 'The related Post_Meta entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Post_Meta',
			},
			extra_metas: {
				description: 'The related Extra_Meta entities to the Event.',
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
				description: 'The related Change_Log entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Any_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Change_Log',
			},
			people: {
				description: 'The related Person entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_HABTM_Relation',
				readonly: true,
				joining_model_name: 'Person_Post',
				items: {
					type: 'object',
				},
				relation_model: 'Person',
			},
			person_posts: {
				description: 'The related Person_Post entities to the Event.',
				type: 'array',
				relation: true,
				relation_type: 'EE_Has_Many_Relation',
				readonly: true,
				items: {
					type: 'object',
				},
				relation_model: 'Person_Post',
			},
		},
		additionalProperties: false,
	},
};

/**
 * Exports the properties property from the Event Schema
 *
 * @type {Object}
 */
export const EventSchemaProperties = EventSchema.schema.properties;
