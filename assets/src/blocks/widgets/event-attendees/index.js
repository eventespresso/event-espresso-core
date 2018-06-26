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
import EventAttendeesEditor from './edit';
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
				default: 0,
			},
			datetimeId: {
				type: 'number',
				default: 0,
			},
			ticketId: {
				type: 'number',
				default: 0,
			},
			status: {
				type: 'string',
				default: 'RAP',
			},
			limit: {
				type: 'number',
				default: -1,
			},
			showGravatar: {
				type: 'boolean',
				default: false,
			},
			displayOnArchives: {
				type: 'boolean',
				default: false,
			},
		},

		transforms: {
			from: [
				{
					type: 'shortcode',
					tag: 'ESPRESSO_EVENT_ATTENDEES',
					attributes: {
						eventId: {
							type: 'number',
							shortcode: ( { named: { event_id } } ) => {
								if ( ! event_id ) {
									return;
								}
								return event_id;
							}
						},
						datetimeId: {
							type: 'number',
							shortcode: ( { named: { datetime_id } } ) => {
								if ( ! datetime_id ) {
									return;
								}
								return datetime_id;
							}
						},
						ticketId: {
							type: 'number',
							shortcode: ( { named: { ticket_id } } ) => {
								if ( ! ticket_id ) {
									return;
								}
								return ticket_id;
							}
						},
						status: {
							type: 'string',
							shortcode: ( { named: { status } } ) => {
								if ( ! status ) {
									return;
								}
								return status;
							}
						},
						showGravatar: {
							type: 'boolean',
							shortcode: ( { named: { show_gravatar } } ) => {
								switch ( show_gravatar ) {
									case 'true':
									case '1':
										return true;
									default:
										return false;
								}
							}
						},
						displayOnArchives: {
							type: 'boolean',
							shortcode: ( { named: { display_on_archives } } ) => {
								switch ( display_on_archives ) {
									case 'true':
									case '1':
										return true;
									default:
										return false;
								}
							}
						},
					}
				}
			]
		},

		edit: EventAttendeesEditor,

		save() {
			return null;
		},
	},
);