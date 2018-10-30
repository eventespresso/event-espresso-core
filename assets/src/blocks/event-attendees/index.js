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

/**
 * @todo Converting this block so that:
 * - it does not transform a shortcode to the block (we'll leave shortcodes as
 * their own thing)
 * - it does not use SSR for rendering the content, instead uses lazy loading
 * to load the content and its own styled content. Will also need to make sure
 * that the server rendering uses the same styles/template as the editor
 * rendering (and possible allow for toggling server side or client side
 * rendering via editor controls).
 */
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
						// eslint-disable-next-line camelcase
						shortcode: ( { named: { event_id } } ) => {
							// eslint-disable-next-line camelcase
							if ( ! event_id ) {
								return;
							}
							// eslint-disable-next-line camelcase
							return event_id;
						},
					},
					datetimeId: {
						type: 'number',
						// eslint-disable-next-line camelcase
						shortcode: ( { named: { datetime_id } } ) => {
							// eslint-disable-next-line camelcase
							if ( ! datetime_id ) {
								return;
							}
							// eslint-disable-next-line camelcase
							return datetime_id;
						},
					},
					ticketId: {
						type: 'number',
						// eslint-disable-next-line camelcase
						shortcode: ( { named: { ticket_id } } ) => {
							// eslint-disable-next-line camelcase
							if ( ! ticket_id ) {
								return;
							}
							// eslint-disable-next-line camelcase
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
						// eslint-disable-next-line camelcase
						shortcode: ( { named: { show_gravatar } } ) => {
							// eslint-disable-next-line camelcase
							return show_gravatar === 'true' || show_gravatar ===
								'1';
						},
					},
					displayOnArchives: {
						type: 'boolean',
						// eslint-disable-next-line camelcase
						shortcode: ( { named: { display_on_archives } } ) => {
							// eslint-disable-next-line camelcase
							return display_on_archives === 'true' ||
								// eslint-disable-next-line camelcase
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
