<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			    Event Espresso
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 */


/**
 * espresso_ticket_selector
 * @param null $event
 */
function espresso_ticket_selector( $event = NULL ) {
	if (  ! apply_filters( 'FHEE_disable_espresso_ticket_selector', FALSE ) ) {
		echo EED_Ticket_Selector::display_ticket_selector( $event );
	}
}

/**
 * espresso_view_details_btn
 * @param null $event
 */
function espresso_view_details_btn( $event = NULL ) {
	if (  ! apply_filters( 'FHEE_disable_espresso_view_details_btn', FALSE ) ) {
		echo EED_Ticket_Selector::display_ticket_selector( $event, TRUE );
	}
}







// End of file template_tags.php
// Location: /template_tags.php