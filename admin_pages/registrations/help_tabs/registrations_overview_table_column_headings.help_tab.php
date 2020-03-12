<?php
use EventEspresso\core\domain\Domain;
?>
<p><strong><?php esc_html_e('Registrations Table Column Headings', 'event_espresso'); ?></strong></p>
<ul>
<li>
<strong><?php esc_html_e('ID', 'event_espresso'); ?></strong><br />
<?php printf(
    esc_html__(
        'The is the numerical ID of an registration. This value is used internally for %s.',
        'event_espresso'
    ),
    Domain::brandName()
); ?>
</li>
<li>
<strong><?php esc_html_e('Name', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the name of a registrant. The primary registrant will have a star to the right of their name.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('TXN Date', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the date that the registration occurred on.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Event', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the event that a registration is linked to.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Event Date', 'event_espresso'); ?></strong><br />
<?php esc_html_e('The date that the event begins.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Reg Code', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is a unique registration code for a registrant.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Price', 'event_espresso'); ?></strong><br />
<?php esc_html_e('This is the amount that the registrant paid for their ticket.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Actions', 'event_espresso'); ?></strong><br />
<?php printf(
    esc_html__(
        'Using the action buttons you can View Registration Details %1$s, Edit Contact Details %2$s, Resend Registration Details %3$s, and View Transaction Details %4$s.',
        'event_espresso'
    ),
    '<span class="dashicons dashicons-search"></span>',
    '<span class="dashicons dashicons-businessman"></span>',
    '<span class="ee-icon ee-icon-email-send"></span>',
    '<span class="ee-icon ee-icon-cash"></span>'
); ?>
</li>
</ul>