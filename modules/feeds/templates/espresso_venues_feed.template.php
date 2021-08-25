<?php

/**
 * This template will display venue details for your RSS feed
 *
 * @ package        Event Espresso
 * @ author        Seth Shoultes
 * @ copyright    (c) 2008-2013 Event Espresso  All Rights Reserved.
 * @ license        https://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link            http://www.eventespresso.com
 * @ version        4+
 *
 * @var int    $VNU_ID
 * @var string $venue_description
 */

?>
<p>
    <?php esc_html_e('Organizer Name: ', 'event_espresso') . espresso_organization_name($VNU_ID); ?>
    <br/>
    <?php esc_html_e('Organizer Email: ', 'event_espresso') . espresso_organization_email($VNU_ID); ?>
    <br/>
    <?php esc_html_e('Venue Phone: ', 'event_espresso') . espresso_venue_phone($VNU_ID); ?>
</p>
<p><?php esc_html_e('Categories: ', 'event_espresso') . espresso_venue_categories($VNU_ID); ?></p>
<p><?php esc_html_e('Address: ', 'event_espresso') . espresso_venue_address($VNU_ID); ?></p>
<p><?php esc_html_e('Website: ', 'event_espresso') . espresso_venue_website($VNU_ID); ?></p>
<p><?php esc_html_e('Description: ', 'event_espresso') . $venue_description; ?></p>
<br/>
 