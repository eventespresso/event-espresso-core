<?php
/**
 * Template for the [ESPRESSO_EVENT_ATTENDEES] shortcode
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
	<?php if ( $contacts ) : ?>
		<ul class="event-attendees-list">
			<?php foreach( $contacts as $contact ) :
				if ( $show_gravatar ) {
					$gravatar = get_avatar( $contact->email(),
						(int) apply_filters( 'FHEE__loop-espresso_attendees-shortcode__template__avatar_size', 32 )
						);
				} else {
					$gravatar = '';
				}
				?>
			<li><?php echo $gravatar . '&nbsp;' .  $contact->full_name(); ?></li>
			<?php endforeach; ?>
		</ul>
	<?php else : ?>
		<p><?php echo $no_attendees_message; ?></p>
	<?php endif; ?>
</div>