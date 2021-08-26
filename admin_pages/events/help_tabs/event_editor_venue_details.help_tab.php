<p><strong><?php esc_html_e('Event Venue Details', 'event_espresso'); ?></strong></p>
<p>
    <?php esc_html_e(
        'A venue is the place or location that is hosting your event. This setting is optional which means that you are not required to select a venue for your event.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php printf(
        esc_html__('Venues can be managed through the %sVenues page%s.', 'event_espresso'),
        '<a href="admin.php?page=espresso_venues">',
        '</a>'
    ); ?>
</p>