<?php
/**
 * This template will display event details for your RSS feed
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2013 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4+
 */
 ?>
<?php  _e( 'Event Organizer: ', 'event_espresso' ) . espresso_organization_name( $EVT_ID ); ?>
<br/><?php  _e( 'Organizer Email: ', 'event_espresso' ) . espresso_organization_email( $EVT_ID ); ?>
<br/><?php  _e( 'Event Phone: ', 'event_espresso' ) . espresso_event_phone( $EVT_ID ); ?>
<br/><?php  _e( 'Event Status: ', 'event_espresso' ) . espresso_event_status( $EVT_ID );?>
<br/><?php  _e( 'Categories: ', 'event_espresso' ) . espresso_event_categories( $EVT_ID );?>
<br/><?php  _e( 'Dates and Times: ', 'event_espresso' ) . espresso_list_of_event_dates( $EVT_ID );?>
<br/><?php  _e( 'Available Tickets: ', 'event_espresso' ) . espresso_event_tickets_available( $EVT_ID );?>
<br/><?php  _e( 'Event Venue: ', 'event_espresso' ) . espresso_venue_name( NULL, FALSE ); ?>
<br/><?php  _e( 'Description: ', 'event_espresso' ); ?>
<?php  echo has_excerpt( $EVT_ID ) ? $event_excerpt : $event_description; ?><br/><br/>
 