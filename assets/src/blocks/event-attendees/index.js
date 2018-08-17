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

export const name = 'eventespresso/event-attendees';

export const settings = {

	title: __( 'Event Attendees', 'event_espresso' ),

	description: __(
		'Displays a list of people that have registered for the specified event',
		'event_espresso',
	),

	icon: 'groups',

	category: 'event-espresso',

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
			default: 10,
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
						},
					},
					datetimeId: {
						type: 'number',
						shortcode: ( { named: { datetime_id } } ) => {
							if ( ! datetime_id ) {
								return;
							}
							return datetime_id;
						},
					},
					ticketId: {
						type: 'number',
						shortcode: ( { named: { ticket_id } } ) => {
							if ( ! ticket_id ) {
								return;
							}
							return ticket_id;
						},
					},
					status: {
						type: 'string',
						shortcode: ( { named: { status } } ) => {
							if ( ! status ) {
								return;
							}
							return status;
						},
					},
					showGravatar: {
						type: 'boolean',
						shortcode: ( { named: { show_gravatar } } ) => {
							return show_gravatar === 'true' || show_gravatar ===
								'1';
						},
					},
					displayOnArchives: {
						type: 'boolean',
						shortcode: ( { named: { display_on_archives } } ) => {
							return display_on_archives === 'true' ||
								display_on_archives === '1';
						},
					},
				},
			},
		],
	},

	edit: EventAttendeesEditor,

	save() {
		return null;
	},
};

registerBlockType( name, settings );
