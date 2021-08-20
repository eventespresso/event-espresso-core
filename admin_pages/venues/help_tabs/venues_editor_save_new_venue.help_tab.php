<p>
    <strong><?php esc_html_e('Save New Venue', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e(
        'Quickly publish your venue to allow linking to an event or multiple events.',
        'event_espresso'
    ); ?>
    <br />
</p>
<ul>
    <li>
        <strong><?php esc_html_e('Status', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'The following statuses are available: Published, Pending Review, and Draft. A status of published means that a venue is live and can be associated with one or more events. Pending review will set a venue to draft until an event administrator has approved the venue. A status of draft will save a venue but it will be unpublished.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Visibility', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'The following visibility options are available: public, password protected, and private. An venue that is set to public will be accessible by anyone. An venue that is set to password protected will only be available to event administrators and individuals who know the password to access the event registration. A venue that is set to private will completely be hidden from public view.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Publish', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'An event can be published immediately or you can schedule it to be published at a later date in the future.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Capacity', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'Enter the maximum number of registrants that are supported by this venue.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Venue Website', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'Enter the URL (website address) for this venue. This field is optional.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Venue Phone #', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('Enter the phone number for this venue. This field is optional.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Move to Trash', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e('Click the Move to Trash link to move a venue to the trash.', 'event_espresso'); ?>
    </li>
</ul>