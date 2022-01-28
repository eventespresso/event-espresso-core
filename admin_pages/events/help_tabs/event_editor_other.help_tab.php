<p>
    <strong>
        <?php esc_html_e(
            'Certain options below such as the event featured image and event excerpt will only be displayed if supported by your WordPress theme.',
            'event_espresso'
        ); ?>
    </strong>
</p>
<p><strong><?php esc_html_e('Event Featured Image', 'event_espresso'); ?></strong></p>
<p>
    <?php esc_html_e('Set a featured image for your event.', 'event_espresso'); ?>
</p>
<p><strong><?php esc_html_e('Event Excerpt', 'event_espresso'); ?></strong></p>
<p>
    <?php esc_html_e(
        'An excerpt can be thought of as a short description for your event. HTML tags are supported here.',
        'event_espresso'
    ); ?>
</p>
<p><strong><?php esc_html_e('Event Custom Fields', 'event_espresso'); ?></strong></p>
<p>
    <?php esc_html_e('Setup custom fields for your events.', 'event_espresso'); ?>
</p>
<p><strong><?php esc_html_e('Event Discussion', 'event_espresso'); ?></strong></p>
<p>
    <?php esc_html_e(
        'Specify if comments, trackbacks, and pingbacks should be allowed for your event. These appear directly after the event description on the event page.',
        'event_espresso'
    ); ?>
</p>
<p><strong><?php esc_html_e('Event Slug', 'event_espresso'); ?></strong></p>
<p>
    <?php esc_html_e(
        'The slug is the customizable portion of the URL for your event. For example, if my event was called "Holiday Celebrations," then the URL could appear as such: http://example.com/events/holiday-celebrations -- the slug would be then be holiday-celebrations.',
        'event_espresso'
    ); ?>
</p>
<p><strong><?php esc_html_e('Event Author', 'event_espresso'); ?></strong></p>
<p>
    <?php esc_html_e(
        'This is the site member that will be credited for creating this event. The event author will receive notifications such as event confirmations. Ensure that the event author has a first name and last name filled out in their user profile. This option can be found in Users --> Your Profile.',
        'event_espresso'
    ); ?>
</p>
<p><strong><?php esc_html_e('Event Notifications', 'event_espresso'); ?></strong></p>
<p>
    <?php esc_html_e(
        'Appears when you are editing an existing event. You can select global templates or switch to custom templates. Global templates are templates that are used site wide. Custom templates are templates that have been customized.',
        'event_espresso'
    ); ?>
</p>
<p><strong><?php esc_html_e('Espresso Ticket Selector', 'event_espresso'); ?></strong></p>
<p>
    <?php
    printf(
        esc_html__(
            'This shortcode allows you to display the ticket selector for a specific event: %1$s',
            'event_espresso'
        ),
        '<br />[ESPRESSO_TICKET_SELECTOR event_id=###]<br />'
    );
    esc_html_e(
        'This shortcode can be used on any event page, WordPress page, or WordPress post. To use it, copy and paste the shortcode above and change "###" to the actual post ID (numeric value) for your event. For example, if your event had an ID of 123, then the update shortcode would be [ESPRESSO_TICKET_SELECTOR event_id=123].',
        'event_espresso'
    );
    ?>
</p>