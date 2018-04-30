/**
 * Internal imports
 */
import '../exit-modal-survey';
import './style.css';

/**
 * External imports
 */
import $ from 'jquery';

if ( $( 'tr.ee-upsell-plugin-list-table' ).length > 0 ) {
	$( 'tr[data-slug="event-espresso"],tr[data-slug="event-espresso-decaf"]' )
		.addClass( 'update' );
}
