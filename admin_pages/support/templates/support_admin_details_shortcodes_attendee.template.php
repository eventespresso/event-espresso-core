<?php $reg_status_array = EEM_Registration::reg_status_array([], true); ?>

<div class="padding">
    <p>
        <?php printf(
            esc_html__(
                '%1$sNote:%2$s The %3$s[ESPRESSO_EVENT_ATTENDEES]%4$s shortcode is not used to represent the attendees post type directly, but is instead used to represent the intersection of attendees with events. So it\'s always returning a list of attendees %5$sin relation to%6$s an event.',
                'event_espresso'
            ),
            '<strong>',
            '</strong>',
            '<code>',
            '</code>',
            '<em>',
            '</em>'
        ); ?>
    </p>

    <ul>
        <li>
            <strong>[ESPRESSO_EVENT_ATTENDEES]</strong><br>
            <p class="description">
                <?php esc_html_e(
                    'With no parameters, this shows the attendees for the earliest active event, or if no active event, the earliest upcoming event.  If it is used in Event Description, then it will show the attendees for that event.',
                    'event_espresso'
                ); ?>
            </p>
            <br>
        </li>
        <li>
            <strong>[ESPRESSO_EVENT_ATTENDEES event_id=30]</strong><br>
            <p class="description">
                <?php esc_html_e('Will list the attendees for a specific event.', 'event_espresso'); ?>
            </p>
            <br>
        </li>
        <li>
            <strong>[ESPRESSO_EVENT_ATTENDEES datetime_id=245]</strong><br>
            <p class="description">
                <?php esc_html_e('Will list the attendees for a specific datetime.', 'event_espresso'); ?>
            </p>
            <br>
        </li>
        <li>
            <strong>[ESPRESSO_EVENT_ATTENDEES ticket_id=34]</strong><br>
            <p class="description">
                <?php esc_html_e('Will list the attendees for a specific ticket.', 'event_espresso'); ?>
            </p>
            <br>
        </li>
        <li>
            <strong>[ESPRESSO_EVENT_ATTENDEES status=RAP]</strong><br>
            <p class="description">
                <?php esc_html_e(
                    'You can list attendees that have a specific registration status (use status code) or use "all" to return all attendees regardless of status.  Default when you don\'t have this parameter set is to only return attendees attached to approved contacts.',
                    'event_espresso'
                ); ?>
            </p>
            <p>
                <?php esc_html_e('The statuses you can use are:', 'event_espresso'); ?>
                <br>
                <?php
                foreach ($reg_status_array as $status_code => $status_label) {
                    echo esc_html("<strong>$status_code</strong>:&nbsp;$status_label<br>");
                }
                ?>

            </p>
            <br>
        </li>
        <li>
            <strong>[ESPRESSO_EVENT_ATTENDEES display_on_archives=true]</strong><br>
            <p class="description">
                <?php esc_html_e(
                    'Will display the attendees list when events are viewed on archive pages.',
                    'event_espresso'
                ); ?>
            </p>
            <br>
        </li>

    </ul>
</div>
