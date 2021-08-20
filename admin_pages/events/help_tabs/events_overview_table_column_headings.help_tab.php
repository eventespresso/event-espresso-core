<p><strong><?php esc_html_e('Events Overview Table Column Headings', 'event_espresso'); ?></strong></p>
<ul>
    <li>
        <strong><?php esc_html_e('ID', 'event_espresso'); ?></strong><br />
        <?php esc_html_e(
            'The is the numerical ID of an event. This value is used internally for Event Espresso and is used to populate certain shortcodes.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Name', 'event_espresso'); ?></strong><br />
        <?php esc_html_e('This is the name of an event. ', 'event_espresso'); ?>
        <?php esc_html_e(
            'Hovering over the name of the event will provide you will several options: View, Edit, Registrations, Export, and Trash. Clicking on View will take you to the event on the front-end of your site. Clicking on Edit will open the event for editing in the Event Editor. Clicking on Registrations will take you to a page that shows a list of attendees for that event. Clicking on Export will download a CSV for that event. Clicking on Trash will move that event to the trash.',
            'event_espresso'
        ); ?>
        <br>
        <strong>
            <?php esc_html_e(
                'Note: An event can only be deleted after associated payments have been removed and registrations have been removed.',
                'event_espresso'
            ); ?>
        </strong>
    </li>
    <li>
        <strong><?php esc_html_e('Venue', 'event_espresso'); ?></strong><br />
        <?php esc_html_e(
            'The location or place that is hosting the event. Note: An event is not required to have a venue associated with it.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Event Start', 'event_espresso'); ?></strong><br />
        <?php esc_html_e('The date that the event begins.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('On Sale', 'event_espresso'); ?></strong><br />
        <?php esc_html_e('The date that the first ticket is available for registration.', 'event_espresso'); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Registrations', 'event_espresso'); ?></strong><br />
        <?php esc_html_e(
            'This is the number of registrations that have been approved. Clicking on this number will take you to a page that shows you a list of registrants for that event.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Actions', 'event_espresso'); ?></strong><br />
        <?php esc_html_e(
            'The following actions are available for the action buttons: View event, Edit Event Details, View Registrations for Event, View Event Reports.',
            'event_espresso'
        ); ?>
    </li>
</ul>
<p>
    <strong><?php esc_html_e('Event Name (Status)', 'event_espresso'); ?></strong><br />
    <?php esc_html_e(
        'The name of an event may also have a status that appears directly to the left of the name. Some examples may be "event name (draft)" or "event name (sold_out). This status next to the event name is shown when the post status for an event is set to something different than published. This status is different than the status that is shown in the status column. When tickets for an event are sold out, the post status will automatically change to sold out. However, it\'s still possible for an event admin to manually change this status from sold out back to published.',
        'event_espresso'
    ); ?>
</p>