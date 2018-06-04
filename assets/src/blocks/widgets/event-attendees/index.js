/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * External dependencies
 */
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import EventAttendees from './edit';
import './style.css';

registerBlockType(
	'eventespresso/widgets-event-attendees',
	{
		title: __( 'Event Attendees', 'event_espresso' ),

		description: __(
			'Displays a list of people that have registered for the specified event',
			'event_espresso',
		),

		icon: 'groups',

		category: 'widgets',

		keywords: [
			__( 'event', 'event_espresso' ),
			__( 'attendees', 'event_espresso' ),
			__( 'list', 'event_espresso' ),
		],

		attributes: {
			// eventId, datetimeId, ticketId, status, showGravatar, displayOnArchives
			eventId: {
				type: 'number',
				'default': 0,
			},
			datetimeId: {
				type: 'number',
				'default': 0,
			},
			ticketId: {
				type: 'number',
				'default': 0,
			},
			status: {
				type: 'string',
				'default': 'RAP',
			},
			showGravatar: {
				type: 'boolean',
				'default': false,
			},
			displayOnArchives: {
				type: 'boolean',
				'default': false,
			},
		},

		edit: EventAttendees,

		save() {
			return null;
		},
	},
);