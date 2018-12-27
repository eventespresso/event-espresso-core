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
		order: {
			type: 'string',
			default: 'ASC',
		},
		orderBy: {
			type: 'string',
			default: 'lastThenFirstName',
		},
		showGravatar: {
			type: 'boolean',
			default: false,
		},
		avatarClass: {
			type: 'string',
			default: 'contact',
		},
		avatarSize: {
			type: 'number',
			default: 24,
		},
		displayOnArchives: {
			type: 'boolean',
			default: false,
		},
	},

	edit: EventAttendeesEditor,

	save() {
		return null;
	},
};

registerBlockType( name, settings );
