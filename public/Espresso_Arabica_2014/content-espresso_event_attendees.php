<?php
/**
 * Content Template for the [ESPRESSO_EVENT_ATTENDEES] shortcode
 *
 * @package Event Espresso
 * @subpackage templates
 * @since 4.6.29
 * @author Darren Ethier
 *
 * Template Args that are available in this template
 * @type EE_Attendee $contact
 * @type bool       $show_gravatar  whether to show gravatar or not.
 */

$gravatar = $show_gravatar
    ? get_avatar(
        $contact->email(),
        (int) apply_filters('FHEE__loop-espresso_attendees-shortcode__template__avatar_size', 32)
    )
    : '';
?>
<?php do_action( 'AHEE__content-espresso_event_attendees__before', $contact, $show_gravatar ); ?>
<li><?php echo $gravatar . '&nbsp;' .  $contact->full_name(true); ?></li>
<?php do_action( 'AHEE__content-espresso_event_attendees__after', $contact, $show_gravatar ); ?>

<!--<br >-->
