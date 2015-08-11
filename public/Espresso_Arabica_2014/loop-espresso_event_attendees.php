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


?>

<div class="event-attendees">
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