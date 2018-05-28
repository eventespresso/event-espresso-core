/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * External dependencies
 */
import { __ } from '@eventespresso/i18n';
// import { TestComponent } from '@eventespresso/components';

/**
 * Internal dependencies
 */
// import './style.css';
// import { default as SomeFunction } from './some-file';

registerBlockType(
	'eventespresso/test-block',
	{
		title: __( 'Event Espresso Test Block', 'event_espresso' ),

		description: __( 'Just a Block for testing out new components', 'event_espresso' ),

		icon: 'smiley',

		category: 'common',

		attributes: {},

		// edit: SomeFunction,

		edit() {
			return __( 'NO EDIT FOR YOU!!!', 'event_espresso' )
		},

		save() {
			return null;
		},
	},
);