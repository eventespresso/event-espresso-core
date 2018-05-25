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
import EventAttendees from './block';
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
			selectedEventId: {
				type: 'number'
			}
		},

		edit: EventAttendees,

		save() {
			return null;
		},
	},
);