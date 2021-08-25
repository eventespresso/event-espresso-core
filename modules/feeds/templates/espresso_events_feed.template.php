<?php

/**
 * This template will display event details for your RSS feed
 *
 * @ package        Event Espresso
 * @ author        Seth Shoultes
 * @ copyright    (c) 2008-2013 Event Espresso  All Rights Reserved.
 * @ license        https://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link            http://www.eventespresso.com
 * @ version        4+
 *
 * @var int $EVT_ID
 * @var string $event_description
 */

?>
<p>
    <?php esc_html_e('Event Organizer: ', 'event_espresso') . espresso_organization_name($EVT_ID); ?>
    <br/>
    <?php esc_html_e('Organizer Email: ', 'event_espresso') . espresso_organization_email($EVT_ID); ?>
    <br/>
    <?php esc_html_e('Event Phone: ', 'event_espresso') . espresso_event_phone($EVT_ID); ?>
</p>
<p><?php esc_html_e('Event Status: ', 'event_espresso') . espresso_event_status($EVT_ID); ?></p>
<p><?php esc_html_e('Categories: ', 'event_espresso') . espresso_event_categories($EVT_ID); ?></p>
<?php esc_html_e('Dates and Times: ', 'event_espresso') . espresso_list_of_event_dates($EVT_ID); ?>
<?php esc_html_e('Available Tickets: ', 'event_espresso') . espresso_event_tickets_available($EVT_ID); ?>
<p><?php esc_html_e('Event Venue: ', 'event_espresso') . espresso_venue_name(null, false); ?></p>
<p><?php esc_html_e('Description: ', 'event_espresso') . $event_description; ?></p>
<br/>
 