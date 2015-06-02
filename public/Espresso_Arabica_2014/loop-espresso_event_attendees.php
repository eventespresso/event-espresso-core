<?php
/**
 * Loop Template for the [ESPRESSO_EVENT_ATTENDEES] shortcode
 *
 * @package Event Espresso
 * @subpackage templates
 * @since 4.6.29
 * @author Darren Ethier
 *
 * Template Args that are available in this template
 * @type EE_Attendee[] $contacts
 * @type EE_Event   $event
 * @type EE_Datetime    $datetime
 * @type EE_Ticket  $ticket
 * @type bool       $show_gravatar  whether to show gravatar or not.
 */

$no_attendees_message =  apply_filters( 'FHEE__loop-espresso_attendees-shortcode__template__no_attendees_message', __('No Attendees Yet', 'event_espresso' ) );
//setup title
if ( $datetime instanceof EE_Datetime && $event instanceof EE_Event ) {
	$title = sprintf( __( 'Attendees for %s and %s', 'event_espresso' ), $event->name(), $datetime->get_dtt_display_name( true ) );
} elseif ( $ticket instanceof EE_Ticket && $event instanceof EE_Event ) {
	$title = sprintf( __( 'Attendees for %s and the ticket %s', 'event_espresso' ), $event->name(), $ticket->name() );
} elseif ( $event instanceof EE_Event ) {
	$title = sprintf( __( 'Attendees for %s', 'event_espresso' ), $event->name() );
} else {
	$title = __( 'Attendees:' );
}

//filter the title
$title = apply_filters( 'FHEE__loop-espresso_attendees-shortcode__template__title', $title, $event, $datetime, $ticket, $contacts );

?>

<div class="event-attendees">
	<h2 id="event-attendees-details-h2" class="entry-title"><?php echo $title; ?></h2>
	<?php do_action( 'AHEE__loop-espresso_event_attendees__before', $contacts, $event, $datetime, $ticket, $show_gravatar ); ?>
	<?php if ( $contacts ) : ?>
		<ul class="event-attendees-list">
			<?php foreach( $contacts as $contact ) :
				EEH_Template::get_template_part( 'content', 'espresso_event_attendees', array( 'contact' => $contact, 'show_gravatar' => $show_gravatar ) );
				endforeach; ?>
		</ul>
	<?php else : ?>
		<p><?php echo $no_attendees_message; ?></p>
	<?php endif; ?>
	<?php do_action( 'AHEE__loop-espresso_event_attendees__after', $contacts, $event, $datetime, $ticket, $show_gravatar ); ?>
</div>