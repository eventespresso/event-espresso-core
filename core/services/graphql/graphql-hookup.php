<?php

add_action( 'graphql_register_types', 'add_fields_to_event' );
/**
 * Adds EE Model fields to Event object in GraphQL.
 *
 * @return void
 */
function add_fields_to_event()
{
	$fields = [
		'name'  => [
			'type'        => 'String',
			'description' => __('Event Name', 'event_espresso'),
		],
		'desc'  => [
			'type'        => 'String',
			'description' => __('Event Description', 'event_espresso'),
		],
		'shortDesc'  => [
			'type'        => 'String',
			'description' => __('Event Short Description', 'event_espresso'),
		],
		'created'  => [
			'type'        => 'String',
			'description' => __('Date/Time Event Created', 'event_espresso'),
		],
		// Already registered by WP GraphQL
		/* 'modified'  => [
			'type'        => 'String',
			'description' => __('Date/Time Event Modified', 'event_espresso'),
		], */
		'wpUser'  => [
			'type'        => 'User',
			'description' => __('Event Creator', 'event_espresso'),
		],
		'order'  => [
			'type'        => 'Int',
			'description' => __('Event Menu Order', 'event_espresso'),
		],
		// Already registered by WP GraphQL
		/* 'parent'  => [
			'type'        => 'Venue',
			'description' => __('Venue Parent ID', 'event_espresso'),
		], */
		'displayDesc'  => [
			'type'        => 'Boolean',
			'description' => __('Display Description Flag', 'event_espresso'),
		],
		'displayTicketSelector'  => [
			'type'        => 'Boolean',
			'description' => __('Display Ticket Selector Flag', 'event_espresso'),
		],
		'visibleOn'  => [
			'type'        => 'String',
			'description' => __('Event Visible Date', 'event_espresso'),
		],
		'additionalLimit'  => [
			'type'        => 'String',
			'description' => __('Limit of Additional Registrations on Same Transaction', 'event_espresso'),
		],
		'phone'  => [
			'type'        => 'String',
			'description' => __('Event Phone Number', 'event_espresso'),
		],
		'memberOnly'  => [
			'type'        => 'Boolean',
			'description' => __('Member-Only Event Flag', 'event_espresso'),
		],
		'allowOverflow'  => [
			'type'        => 'Boolean',
			'description' => __('Allow Overflow on Event', 'event_espresso'),
		],
		'timezoneString'  => [
			'type'        => 'String',
			'description' => __('Timezone (name) for Event times', 'event_espresso'),
		],
		'externalUrl'  => [
			'type'        => 'String',
			'description' => __('URL of Event Page if hosted elsewhere', 'event_espresso'),
		],
		'donations'  => [
			'type'        => 'Boolean',
			'description' => __('Accept Donations?', 'event_espresso'),
		],
		'isSoldOut'  => [
			'type'        => 'Boolean',
			'description' => __('Flag indicating whether the tickets sold for the event, met or exceed the registration limit', 'event_espresso'),
		],
		'isPostponed'  => [
			'type'        => 'Boolean',
			'description' => __('Flag indicating whether the event is marked as postponed', 'event_espresso'),
		],
		'isCancelled'  => [
			'type'        => 'Boolean',
			'description' => __('Flag indicating whether the event is marked as cancelled', 'event_espresso'),
		],
		'isUpcoming'  => [
			'type'        => 'Boolean',
			'description' => __('Whether the event is upcoming', 'event_espresso'),
		],
		'isActive'  => [
			'type'        => 'Boolean',
			'description' => __('Flag indicating event is active', 'event_espresso'),
		],
		'isInactive'  => [
			'type'        => 'Boolean',
			'description' => __('Flag indicating event is inactive', 'event_espresso'),
		],
		'isExpired'  => [
			'type'        => 'Boolean',
			'description' => __('Flag indicating event is expired or not', 'event_espresso'),
		],
	];

	foreach ( $fields as $field => $args ) {
		/**
		 * Resolves each registered custom field.
		 *
		 * @param \WPGraphQL\Model\Post $post
		 */
		$args['resolve'] = function($post) use ($field) {
			$event_id = $post->ID;
			$event = EEM_Event::instance()->get_one_by_ID($event_id);
			return resolve_event_field( $event, $field );
		};

		// Register the field to "Event" type
		register_graphql_field( 'Event', $field, $args );
	}
}

/**
 * Resolves the custom fields for Event.
 *
 * @param \EEM_Event $event The event model instance.
 * @param string     $field The field name to get the value for.
 * @return void
 */
function resolve_event_field( $event, $field )
{
	// Create a GraphQL to model system mapping.
	// key represents the GQL field key
	// value represents the name of the model method to call.
	$gql_map = [
		'name'                  => 'name',
		'desc'                  => 'description',
		'shortDesc'             => 'short_description',
		'created'               => 'created',
		// 'wpUser'                => 'wp_user',
		'order'                 => 'order',
		'displayDesc'           => 'display_description',
		'displayTicketSelector' => 'display_ticket_selector',
		'visibleOn'             => 'visible_on',
		'additionalLimit'       => 'additional_limit',
		'phone'                 => 'phone',
		'memberOnly'            => 'member_only',
		'allowOverflow'         => 'allow_overflow',
		'timezoneString'        => 'timezone_string',
		'externalUrl'           => 'external_url',
		'donations'             => 'donations',
		'isSoldOut'             => 'is_sold_out',
		'isPostponed'           => 'is_postponed',
		'isCancelled'           => 'is_cancelled',
		'isUpcoming'            => 'is_upcoming',
		'isActive'              => 'is_active',
		'isInactive'            => 'is_inactive',
		'isExpired'             => 'is_expired',
	];

	if (isset($gql_map[$field])) {
		$value = call_user_func([$event, $gql_map[$field]]);
		return $value;
	}

	switch ($field) {
		case 'parent':
			return EEM_Event::instance()->get_one_by_ID($event->parent());
		default:
			return null;
	}
};

add_action( 'graphql_register_types', 'add_fields_to_venue' );
/**
 * Adds EE Model fields to Venue object in GraphQL.
 *
 * @return void
 */
function add_fields_to_venue()
{
	$fields = [
		'name'  => [
			'type'        => 'String',
			'description' => __('Venue Name', 'event_espresso'),
		],
		'desc'  => [
			'type'        => 'String',
			'description' => __('Venue Description', 'event_espresso'),
		],
		'shortDesc'  => [
			'type'        => 'String',
			'description' => __('Short Description of Venue', 'event_espresso'),
		],
		'identifier'  => [
			'type'        => 'String',
			'description' => __('Venue Identifier', 'event_espresso'),
		],
		'created'  => [
			'type'        => 'String',
			'description' => __('Date Venue Created', 'event_espresso'),
		],
		// Already registered
		/* 'modified'  => [
			'type'        => 'String',
			'description' => __('Venue Modified Date', 'event_espresso'),
		], */
		'order'  => [
			'type'        => 'Int',
			'description' => __('Venue order', 'event_espresso'),
		],
		'wpUser'  => [
			'type'        => 'User',
			'description' => __('Venue Creator', 'event_espresso'),
		],
		// Already registered
		/* 'parent'  => [
			'type'        => 'Venue',
			'description' => __('Venue Parent ID', 'event_espresso'),
		], */
		'address'  => [
			'type'        => 'String',
			'description' => __('Venue Address line 1', 'event_espresso'),
		],
		'address2'  => [
			'type'        => 'String',
			'description' => __('Venue Address line 2', 'event_espresso'),
		],
		'city'  => [
			'type'        => 'String',
			'description' => __('Venue City', 'event_espresso'),
		],
		/* 'state'  => [
			'type'        => 'State',
			'description' => __('Venue state', 'event_espresso'),
		],
		'country'  => [
			'type'        => 'Country',
			'description' => __('Venue country', 'event_espresso'),
		], */
		'zip'  => [
			'type'        => 'String',
			'description' => __('Venue Zip/Postal Code', 'event_espresso'),
		],
		'capacity'  => [
			'type'        => 'Int',
			'description' => __('Venue Capacity', 'event_espresso'),
		],
		'phone'  => [
			'type'        => 'String',
			'description' => __('Venue Phone', 'event_espresso'),
		],
		'virtualPhone'  => [
			'type'        => 'String',
			'description' => __('Call in Number', 'event_espresso'),
		],
		'url'  => [
			'type'        => 'String',
			'description' => __('Venue Website', 'event_espresso'),
		],
		'virtualUrl'  => [
			'type'        => 'String',
			'description' => __('Virtual URL', 'event_espresso'),
		],
		'googleMapLink'  => [
			'type'        => 'String',
			'description' => __('Google Map Link', 'event_espresso'),
		],
		'enableForGmap'  => [
			'type'        => 'String',
			'description' => __('Show Google Map?', 'event_espresso'),
		],
	];

	foreach ( $fields as $field => $args ) {
		$args['resolve'] = function($source) use ($field) {
			$ID = isset($source->ID) ? $source->ID : $source->ID();
			$venue = EEM_Venue::instance()->get_one_by_ID($ID);
			return resolve_venue_field( $venue, $field );
		};

		register_graphql_field( 'Venue', $field, $args );
	}
}


/**
 * Resolves the custom fields for Venue.
 *
 * @param \EEM_Venue $venue The venue model instance.
 * @param string     $field The field name to get the value for.
 * @return void
 */
function resolve_venue_field( $venue, $field )
{
	// Create a GraphQL to model system mapping.
	// key represents the GQL field key
	// value represents the name of the model method to call.
	$gql_map = [
		'name'          => 'name',
		'desc'          => 'description',
		'shortDesc'     => 'excerpt',
		'identifier'    => 'identifier',
		'created'       => 'created',
		'order'         => 'order',
		# wpUser
		'address'       => 'address',
		'address2'      => 'address2',
		'city'          => 'city',
		# state
		# country
		'zip'           => 'zip',
		'phone'         => 'phone',
		'virtualPhone'  => 'virtual_phone',
		'url'           => 'venue_url',
		'virtualUrl'    => 'virtual_url',
		'googleMapLink' => 'google_map_link',
		'enableForGmap' => 'enable_for_gmap',
	];

	if (isset($gql_map[$field])) {
		$value = call_user_func([$venue, $gql_map[$field]]);
		// Make sure the to return -1 for infinity.
		if ($value === EE_INF || is_infinite($value)) {
			return -1;
		}
		return $value;
	}

	switch ($field) {
		case 'parent': // Parent is a non-scalar type
			return EEM_Venue::instance()->get_one_by_ID($venue->parent());
		case 'capacity': // capacity needs the numeric value.
			$value = $venue->get('VNU_capacity');
			return $value === EE_INF ? -1 : (int) $value;
		default:
			return null;
	}
};

add_action( 'graphql_register_types', 'register_datetime_type' );
/**
 * Registers the "Datetime" type for GraphQL
 *
 * @return void
 */
function register_datetime_type() {
	register_graphql_object_type(
		'Datetime',
		[
			'description' => __( 'The event datetime', 'event_espresso' ),
			'fields'      => [
				'id' => [
					'type'        => [
						'non_null' => 'Int',
					],
					'description' => __( 'The datetime ID.', 'event_espresso' ),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'id' );
					},
				],
				'name'  => [
					'type'        => 'String',
					'description' => __('Datetime Name', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'name' );
					},
				],
				'description'  => [
					'type'        => 'String',
					'description' => __('Description for Datetime', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'description' );
					},
				],
				'start'  => [
					'type'        => 'String',
					'description' => __('Start timestamp of Event', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'start' );
					},
				],
				'startDate'  => [
					'type'        => 'String',
					'description' => __('Start time/date of Event', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'startDate' );
					},
				],
				'end'  => [
					'type'        => 'String',
					'description' => __('End timestamp of Event', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'end' );
					},
				],
				'endDate'  => [
					'type'        => 'String',
					'description' => __('End time/date of Event', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'endDate' );
					},
				],
				'startTime'  => [
					'type'        => 'String',
					'description' => __('Start time of Event', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'startTime' );
					},
				],
				'endTime'  => [
					'type'        => 'String',
					'description' => __('End time of Event', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'endTime' );
					},
				],
				'regLimit'  => [
					'type'        => 'Int',
					'description' => __('Registration Limit for this time', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'regLimit' );
					},
				],
				'sold'  => [
					'type'        => 'Int',
					'description' => __('How many sales for this Datetime that have occurred', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'sold' );
					},
				],
				'reserved'  => [
					'type'        => 'Int',
					'description' => __('Quantity of tickets reserved, but not yet fully purchased', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'reserved' );
					},
				],
				'order'  => [
					'type'        => 'Int',
					'description' => __('The order in which the Datetime is displayed', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'order' );
					},
				],
				'length'  => [
					'type'        => 'Int',
					'description' => __('The length of the event (start to end time) in seconds', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'length' );
					},
				],
				'parent'  => [
					'type'        => 'Datetime',
					'description' => __('The parent datetime of the current datetime', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'parent' );
					},
				],
				'isPrimary'  => [
					'type'        => 'Boolean',
					'description' => __('Flag indicating datetime is primary one for event', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'isPrimary' );
					},
				],
				'isSoldOut'  => [
					'type'        => 'Boolean',
					'description' => __('Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'isSoldOut' );
					},
				],
				'isUpcoming'  => [
					'type'        => 'Boolean',
					'description' => __('Whether the date is upcoming', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'isUpcoming' );
					},
				],
				'isActive'  => [
					'type'        => 'Boolean',
					'description' => __('Flag indicating datetime is active', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'isActive' );
					},
				],
				'isExpired'  => [
					'type'        => 'Boolean',
					'description' => __('Flag indicating datetime is expired or not', 'event_espresso'),
					'resolve'     => function ($datetime) {
						return resolve_datetime_field( $datetime, 'isExpired' );
					},
				],
				'event' => [
					'type'        => 'Event',
					'description' => __( 'Event of the datetime.', 'event_espresso' ),
					'resolve'     => function ($datetime, $args, $context) {
						$event_id = $datetime->event()->ID();

						if ($event_id) {
							return \WPGraphQL\Data\DataSource::resolve_post_object( $event_id, $context );
						}
						return null;
					},
				],
			],
		]
	);
}


/**
 * Resolves the custom fields for Datetime.
 *
 * @param \EEM_Datetime $datetime The datetime model instance.
 * @param string        $field    The field name to get the value for.
 * @return void
 */
function resolve_datetime_field( $datetime, $field )
{
	$gql_map = [
		'id'          => 'ID',
		'name'        => 'name',
		'description' => 'description',
		'sold'        => 'sold',
		'reserved'    => 'reserved',
		'order'       => 'order',
		'start'       => 'start',
		'end'         => 'end',
		'length'      => 'length',
		'startDate'   => 'start_date',
		'endDate'     => 'end_date',
		'startTime'   => 'start_time',
		'endTime'     => 'end_time',
		'regLimit'    => 'reg_limit',
		'isPrimary'   => 'is_primary',
		'isSoldOut'   => 'sold_out',
		'isUpcoming'  => 'is_upcoming',
		'isActive'    => 'is_active',
		'isExpired'   => 'is_expired',
	];

	if (isset($gql_map[$field])) {
		return call_user_func([$datetime, $gql_map[$field]]);
	} elseif ($field === 'parent') {
		return EEM_Datetime::instance()->get_one_by_ID($datetime->parent());
	}
	return null;
};

add_action( 'graphql_register_types', 'register_ticket_type' );
/**
 * Registers the "Ticket" type for GraphQL
 *
 * @return void
 */
function register_ticket_type() {
	register_graphql_object_type(
		'Ticket',
		[
			'description' => __( 'The datetime ticket', 'event_espresso' ),
			'fields'      => [
				'id' => [
					'type'        => [
						'non_null' => 'Int',
					],
					'description' => __( 'Ticket ID', 'event_espresso' ),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'id' );
					},
				],
				'name'  => [
					'type'        => 'String',
					'description' => __('Ticket Name', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'name' );
					},
				],
				'description'  => [
					'type'        => 'String',
					'description' => __('Description of Ticket', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'description' );
					},
				],
				'startDate'  => [
					'type'        => 'String',
					'description' => __('Start time/date of Ticket', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'startDate' );
					},
				],
				'endDate'  => [
					'type'        => 'String',
					'description' => __('End time/date of Ticket', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'endDate' );
					},
				],
				'min'  => [
					'type'        => 'Int',
					'description' => __('Minimum quantity of this ticket that must be purchased', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'min' );
					},
				],
				'max'  => [
					'type'        => 'Int',
					'description' => __('Maximum quantity of this ticket that can be purchased in one transaction', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'max' );
					},
				],
				'price'  => [
					'type'        => 'Float',
					'description' => __('Final calculated price for ticket', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'price' );
					},
				],
				'sold'  => [
					'type'        => 'Int',
					'description' => __('Number of this ticket sold', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'sold' );
					},
				],
				'quantity'  => [
					'type'        => 'Int',
					'description' => __('Quantity of this ticket that is available', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'quantity' );
					},
				],
				'reserved'  => [
					'type'        => 'Int',
					'description' => __('Quantity of this ticket that is reserved, but not yet fully purchased', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'reserved' );
					},
				],
				'uses'  => [
					'type'        => 'Int',
					'description' => __('Number of datetimes this ticket can be used at', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'uses' );
					},
				],
				'isRequired'  => [
					'type'        => 'Boolean',
					'description' => __('Flag indicating whether this ticket must be purchased with a transaction', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'isRequired' );
					},
				],
				'isTaxable'  => [
					'type'        => 'Boolean',
					'description' => __('Flag indicating whether there is tax applied on this ticket', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'isTaxable' );
					},
				],
				'isDefault'  => [
					'type'        => 'Boolean',
					'description' => __('Flag indicating that this ticket is a default ticket', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'isDefault' );
					},
				],
				'order'  => [
					'type'        => 'Int',
					'description' => __('The order in which the Datetime is displayed', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'order' );
					},
				],
				'row'  => [
					'type'        => 'Int',
					'description' => __('How tickets are displayed in the ui', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'row' );
					},
				],
				'wpUser'  => [
					'type'        => 'User',
					'description' => __('Ticket Creator ID', 'event_espresso'),
					'resolve'     => function ($ticket, $args, $context) {
						$user_id = $ticket->wp_user()->ID();

						if ($user_id) {
							return \WPGraphQL\Data\DataSource::resolve_user_object( $user_id, $context );
						}
						return null;
					},
				],
				'parent'  => [
					'type'        => 'Ticket',
					'description' => __('The parent ticket of the current ticket', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'parent' );
					},
				],
				'reverseCalculate'  => [
					'type'        => 'Boolean',
					'description' => __('Flag indicating whether ticket calculations should run in reverse and calculate the base ticket price from the provided ticket total.', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'reverseCalculate' );
					},
				],
				'isFree'  => [
					'type'        => 'Boolean',
					'description' => __('Flag indicating whether the ticket is free.', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'isFree' );
					},
				],
				'datetimes' => [
					'type'        => ['list_of' => 'Datetime'],
					'description' => __( 'The ticket datetime.', 'event_espresso' ),
					'resolve'     => function ($ticket, $args, $context) {
						return $ticket->get_many_related('Datetime');
					},
				],
			],
		]
	);
}


/**
 * Resolves the custom fields for Ticket.
 *
 * @param \EEM_Ticket $ticket The ticket model instance.
 * @param string      $field  The field name to get the value for.
 * @return void
 */
function resolve_ticket_field( $ticket, $field )
{
	$gql_map = [
		'id'                => 'ID',
		'name'              => 'name',
		'description'       => 'description',
		'sold'              => 'sold',
		'order'             => 'order',
		'row'               => 'row',
		'max'               => 'max',
		'min'               => 'min',
		'price'             => 'price',
		'quantity'          => 'qty',
		'reserved'          => 'reserved',
		'uses'              => 'uses',
		'startDate'         => 'start_date',
		'endDate'           => 'end_date',
		'isFree'            => 'is_free',
		'isRequired'        => 'required',
		'isTaxable'         => 'taxable',
		'isDefault'         => 'is_default',
		'reverseCalculate'  => 'reverse_calculate',
	];

	if (isset($gql_map[$field])) {
		$value = call_user_func([$ticket, $gql_map[$field]]);
		// Make sure the to return -1 for infinity.
		if (is_infinite($value)) {
			return -1;
		}
		return $value;
	} elseif ($field === 'parent') {
		return EEM_Ticket::instance()->get_one_by_ID($ticket->parent());
	}
	return null;
};


add_action( 'graphql_register_types', 'register_country_type' );
/**
 * Registers the "Country" type for GraphQL
 *
 * @return void
 */
function register_country_type() {
	register_graphql_object_type(
		'Country',
		[
			'description' => __( 'A Country', 'event_espresso' ),
			'fields'      => [
				'isActive'  => [
					'type'        => 'Boolean',
					'description' => __('A flag indicating whether the country is enabled for venues.', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'isActive' );
					},
				],
				'ISO' => [
					'type'        => 'String',
					'description' => __( 'Country ISO Code', 'event_espresso' ),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'ISO' );
					},
				],
				'ISO3' => [
					'type'        => 'String',
					'description' => __( 'Country ISO3 Code', 'event_espresso' ),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'ISO3' );
					},
				],
				'name'  => [
					'type'        => 'String',
					'description' => __('Country Name', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'name' );
					},
				],
				'currencyCode'  => [
					'type'        => 'String',
					'description' => __('Country Currency Code', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'currencyCode' );
					},
				],
				'currencySingular'  => [
					'type'        => 'String',
					'description' => __('Currency Name Singular', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'currencySingular' );
					},
				],
				'currencyPlural'  => [
					'type'        => 'String',
					'description' => __('Currency Name Plural', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'currencyPlural' );
					},
				],
				'currencySign'  => [
					'type'        => 'String',
					'description' => __('Currency Sign', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'currencySign' );
					},
				],
				'currencySignBeforeNumber'  => [
					'type'        => 'String',
					'description' => __('Currency Sign Before Number', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'currencySignBeforeNumber' );
					},
				],
				'currencyDecimalPlaces'  => [
					'type'        => 'String',
					'description' => __('Currency Decimal Places', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'currencyDecimalPlaces' );
					},
				],
				'currencyDecimalMark'  => [
					'type'        => 'String',
					'description' => __('Currency Decimal Mark', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'currencyDecimalMark' );
					},
				],
				'currencyThousandsSeparator'  => [
					'type'        => 'String',
					'description' => __('Currency Thousands Separator', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'currencyThousandsSeparator' );
					},
				],
				'telephoneCode'  => [
					'type'        => 'String',
					'description' => __('Country Telephone Code', 'event_espresso'),
					'resolve'     => function ($country) {
						return resolve_country_field( $country, 'telephoneCode' );
					},
				],
				'isEU'  => [
					'type'        => 'Boolean',
					'description' => __('Country is Member of EU', 'event_espresso'),
					'resolve'     => function ($ticket) {
						return resolve_ticket_field( $ticket, 'isEU' );
					},
				],
			],
		]
	);
}


add_action( 'graphql_register_types', 'register_state_type' );
/**
 * Registers the "State" type for GraphQL
 *
 * @return void
 */
function register_state_type() {
	register_graphql_object_type(
		'State',
		[
			'description' => __( 'A state', 'event_espresso' ),
			'fields'      => [
				'id' => [
					'type'        => [
						'non_null' => 'Int',
					],
					'description' => __( 'State ID', 'event_espresso' ),
					'resolve'     => function ($state) {
						return resolve_state_field( $state, 'id' );
					},
				],
				'abbreviation' => [
					'type'        => 'String',
					'description' => __( 'State Abbreviation', 'event_espresso' ),
					'resolve'     => function ($state) {
						return resolve_state_field( $state, 'abbreviation' );
					},
				],
				'name'  => [
					'type'        => 'String',
					'description' => __('State Name', 'event_espresso'),
					'resolve'     => function ($state) {
						return resolve_state_field( $state, 'name' );
					},
				],
				'isActive'  => [
					'type'        => 'Boolean',
					'description' => __('State Active Flag', 'event_espresso'),
					'resolve'     => function ($state) {
						return resolve_state_field( $state, 'isActive' );
					},
				],
			],
		]
	);
}

/**
 * Register connections between object types.
 * Lower priority is needed to make sure the types
 * being connected are registered beforehand.
 */
add_action( 'graphql_register_types', 'register_event_datetimes_connections', 99 );
/**
 * Registers the connection between Event and Datetime types.
 *
 * @return void
 */
function register_event_datetimes_connections() {
	require_once __DIR__ . '/DatetimeConnectionResolver.php';
	$config = [
		'fromType'           => 'Event',
		'toType'             => 'Datetime',
		'fromFieldName'      => 'datetimes',
		'connectionTypeName' => 'EventDatetimesConnection',
		'resolve'            => function( $event, $args, $context, $info ) {
			$resolver   = new DatetimeConnectionResolver( $event, $args, $context, $info );
			$connection = $resolver->get_connection();

			return $connection;
		},
		'resolveNode'        => function( $id, $args, $context, $info ) {
			return EEM_Datetime::instance()->get_one_by_ID($id);
		}
	];
	register_graphql_connection( $config );
};

add_action( 'graphql_register_types', 'register_event_venues_connections', 99 );
/**
 * Registers the connection between Event and Venue types.
 *
 * @return void
 */
function register_event_venues_connections() {
	require_once __DIR__ . '/VenueConnectionResolver.php';
	$config = [
		'fromType'           => 'Event',
		'toType'             => 'Venue',
		'fromFieldName'      => 'venues',
		'connectionTypeName' => 'EventVenuesConnection',
		'resolve'            => function( $event, $args, $context, $info ) {
			$resolver   = new VenueConnectionResolver( $event, $args, $context, $info );
			$connection = $resolver->get_connection();

			return $connection;
		},
		'resolveNode'        => function( $id, $args, $context, $info ) {
			return EEM_Venue::instance()->get_one_by_ID($id);
		}
	];
	register_graphql_connection( $config );
};

add_action( 'graphql_register_types', 'register_datetime_tickets_connections', 99 );
/**
 * Registers the connection between Datetime and Ticket types.
 *
 * @return void
 */
function register_datetime_tickets_connections() {
	require_once __DIR__ . '/TicketConnectionResolver.php';
	$config = [
		'fromType'           => 'Datetime',
		'toType'             => 'Ticket',
		'fromFieldName'      => 'tickets',
		'connectionTypeName' => 'DatetimeTicketsConnection',
		'resolve'            => function( $datetime, $args, $context, $info ) {
			$resolver   = new TicketConnectionResolver( $datetime, $args, $context, $info );
			$connection = $resolver->get_connection();

			return $connection;
		},
		'resolveNode'        => function( $id, $args, $context, $info ) {
			return EEM_Ticket::instance()->get_one_by_ID($id);
		}
	];
	register_graphql_connection( $config );
};