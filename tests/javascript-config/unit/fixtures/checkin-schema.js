/**
 * Fixture for checkin schema.
 *
 * This is the v4.8.36 EE Rest API schema for the checkin endpoint.
 */
export const CheckinSchema = {
	'schema': {
		'$schema': 'http://json-schema.org/draft-04/schema#',
		'title': 'Checkin',
		'type': 'object',
		'properties': {
			'link': {
				'description': 'Link to event on WordPress site hosting events.',
				'type': 'string',
				'readonly': true,
			},
			'_links': {
				'description': 'Various links for resources related to the entity.',
				'type': 'object',
				'readonly': true,
				'properties': {
					'self': {
						'description': 'Link to this entities resource.',
						'type': 'array',
						'items': {
							'type': 'object',
							'properties': {
								'href': {
									'type': 'string',
								},
							},
							'additionalProperties': false,
						},
						'readonly': true,
					},
					'collection': {
						'description': 'Link to this entities collection resource.',
						'type': 'array',
						'items': {
							'type': 'object',
							'properties': {
								'href': {
									'type': 'string',
								},
							},
							'additionalProperties': false,
						},
						'readonly': true,
					},
					'https://api.eventespresso.com/registration': {
						'description': 'Array of objects describing the link(s) for this relation resource.',
						'type': 'array',
						'readonly': true,
						'items': {
							'type': 'object',
							'properties': {
								'href': {
									'type': 'string',
									'description': 'The link to the resource for the Registration relation(s) to this entity',
								},
								'single': {
									'type': 'boolean',
									'description': 'Whether or not there is only a single Registration relation to this entity',
								},
							},
							'additionalProperties': false,
						},
					},
					'https://api.eventespresso.com/datetime': {
						'description': 'Array of objects describing the link(s) for this relation resource.',
						'type': 'array',
						'readonly': true,
						'items': {
							'type': 'object',
							'properties': {
								'href': {
									'type': 'string',
									'description': 'The link to the resource for the Datetime relation(s) to this entity',
								},
								'single': {
									'type': 'boolean',
									'description': 'Whether or not there is only a single Datetime relation to this entity',
								},
							},
							'additionalProperties': false,
						},
					},
					'https://api.eventespresso.com/extra_meta': {
						'description': 'Array of objects describing the link(s) for this relation resource.',
						'type': 'array',
						'readonly': true,
						'items': {
							'type': 'object',
							'properties': {
								'href': {
									'type': 'string',
									'description': 'The link to the resource for the Extra_Meta relation(s) to this entity',
								},
								'single': {
									'type': 'boolean',
									'description': 'Whether or not there is only a single Extra_Meta relation to this entity',
								},
							},
							'additionalProperties': false,
						},
					},
					'https://api.eventespresso.com/change_log': {
						'description': 'Array of objects describing the link(s) for this relation resource.',
						'type': 'array',
						'readonly': true,
						'items': {
							'type': 'object',
							'properties': {
								'href': {
									'type': 'string',
									'description': 'The link to the resource for the Change_Log relation(s) to this entity',
								},
								'single': {
									'type': 'boolean',
									'description': 'Whether or not there is only a single Change_Log relation to this entity',
								},
							},
							'additionalProperties': false,
						},
					},
				},
				'additionalProperties': false,
			},
			'_calculated_fields': {
				'description': 'Available calculated fields for this model.  Fields are only present in the response if explicitly requested',
				'type': 'object',
				'properties': [],
				'additionalProperties': false,
				'readonly': true,
				'_protected': {
					'description': 'Array of property names whose values were replaced with their default (because they are related to a password-protected entity.)',
					'type': 'array',
					'items': {
						'description': 'Each name corresponds to a property that is protected by password for this entity and has its default value returned in the response.',
						'type': 'string',
						'readonly': true,
					},
					'readonly': true,
				},
			},
			'_protected': {
				'description': 'Array of property names whose values were replaced with their default (because they are related to a password-protected entity.)',
				'type': 'array',
				'items': {
					'description': 'Each name corresponds to a property that is protected by password for this entity and has its default value returned in the response.',
					'type': 'string',
					'readonly': true,
				},
				'readonly': true,
			},
			'CHK_ID': {
				'description': 'Check-in ID',
				'type': 'integer',
				'readonly': true,
				'default': 0,
				'primary_key': true,
			},
			'REG_ID': {
				'description': 'Registration Id',
				'type': 'integer',
				'readonly': false,
				'default': 0,
				'foreign_key': {
					'description': 'This is a foreign key the points to the given models.',
					'type': 'array',
					'enum': [
						'EE_Registration',
					],
				},
			},
			'DTT_ID': {
				'description': 'Datetime Id',
				'type': 'integer',
				'readonly': false,
				'default': 0,
				'foreign_key': {
					'description': 'This is a foreign key the points to the given models.',
					'type': 'array',
					'enum': [
						'EE_Datetime',
					],
				},
			},
			'CHK_in': {
				'description': 'Whether a person has checked in or checked out',
				'type': 'boolean',
				'readonly': false,
				'default': true,
			},
			'CHK_timestamp': {
				'description': 'When the row was modified - the value for this field is in the timezone of the site.',
				'type': 'string',
				'readonly': false,
				'default': '2019-02-18T22:52:59',
				'format': 'date-time',
			},
			'CHK_timestamp_gmt': {
				'description': 'When the row was modified - the value for this field is in GMT.',
				'type': 'string',
				'readonly': false,
				'default': '2019-02-18 22:52:59',
				'format': 'date-time',
			},
			'registration': {
				'description': 'The related Registration entity to the Checkin.',
				'type': 'object',
				'relation': true,
				'relation_type': 'EE_Belongs_To_Relation',
				'readonly': true,
				'relation_model': 'Registration',
			},
			'datetime': {
				'description': 'The related Datetime entity to the Checkin.',
				'type': 'object',
				'relation': true,
				'relation_type': 'EE_Belongs_To_Relation',
				'readonly': true,
				'relation_model': 'Datetime',
			},
			'extra_metas': {
				'description': 'The related Extra_Meta entities to the Checkin.',
				'type': 'array',
				'relation': true,
				'relation_type': 'EE_Has_Many_Any_Relation',
				'readonly': true,
				'items': {
					'type': 'object',
				},
				'relation_model': 'Extra_Meta',
			},
			'change_logs': {
				'description': 'The related Change_Log entities to the Checkin.',
				'type': 'array',
				'relation': true,
				'relation_type': 'EE_Has_Many_Any_Relation',
				'readonly': true,
				'items': {
					'type': 'object',
				},
				'relation_model': 'Change_Log',
			},
		},
		'additionalProperties': false,
	},
};

/**
 * Exports the properties property from the checkin schema.
 * @type {Object}
 */
export const CheckinSchemaProperties = CheckinSchema.schema.properties;