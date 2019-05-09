<p><strong><?php esc_html_e('Event Check-In Table Column Headings', 'event_espresso'); ?></strong></p>
<ul>
<li>
<strong><?php esc_html_e('Check-In', 'event_espresso'); ?></strong><br />
<?php printf(
    esc_html__(
        'Shows the Check-In status for an registrant. Available statuses are checked in %1$s, checked out %2$s, or no check-in record is available %3$s.',
        'event_espresso'
    ),
    '<span class="ee-icon ee-icon-check-in"></span>',
    '<span class="ee-icon ee-icon-check-out"></span>',
    '<span class="dashicons dashicons-no"></span>'
); ?>
</li>
<li>
<strong>#</strong><br />
<?php esc_html_e('This is the registrant number in the group. For example, 1 of 1 means that there was a single registrant. 1 of 2 means that this registrant is the first to register of the the two registrants in the group.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Registrations', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the name of the registrant.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Email Address', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the email address for the registrant.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('TXN Date', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the date that the registration occurred on.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Reg Code', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is a unique registration code for an registrant.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Reg Status', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the current status for a registration.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('TKT Price', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is original price for a registrant\'s ticket.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Paid', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the amount that a registrant paid for their ticket.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Total', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the current status for a registration.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('TKT Option', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the name of the ticket that was selected by the registrant.', 'event_espresso'); ?>
</li>
</ul>