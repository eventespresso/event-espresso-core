/**
 * Internal dependencies
 */
import '../exit-modal-survey';
import './style.css';

/**
 * External dependencies
 */
import $ from 'jquery';

if ( $( 'tr.ee-upsell-plugin-list-table' ).length > 0 ) {
	$( 'tr[data-slug="event-espresso"],tr[data-slug="event-espresso-decaf"]' )
		.addClass( 'update' );
}
