<p><strong><?php esc_html_e('Event Registration Options', 'event_espresso'); ?></strong></p>
<p>
<?php esc_html_e('Customize the registration for your event.', 'event_espresso'); ?>
</p>
<ul>
<li>
<strong><?php esc_html_e('Active Status', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Shows the current status for an event. The status indicator will show Expired (past), Active (present), Upcoming (future) based on the date of the event. There are also special, custom statuses that can be selected. These include Postponed, Sold Out, and Cancelled.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Maximum number of tickets allowed per order for this event', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Control how many tickets can be purchased in a single order.', 'event_espresso'); ?>
<div class="ee-attention">
<?php esc_html_e('Notice: Allowing too many registrations to be processed with a single order can cause transactions to fail. The decision of how many tickets you allow to be purchased per order should be influenced by your web hosting, how much traffic you get to your website, and the complexity of your registration forms. A more powerful web server will reduce the likelihood of transactions failing.', 'event_espresso'); ?>
</div>
</li>
<li>
<strong><?php esc_html_e('Alternative Registration Page', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Enter another registration URL (website address). This field is optional.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Event Phone Number', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Enter a phone number for this event. This field is optional.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Default Registration Status', 'event_espresso'); ?></strong><br />
<div>
<strong><?php echo EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence'); ?></strong><br />
<?php printf(
    esc_html__(
        /* translators: Approved Registration status */
        'A status of %s means that a registration has been accepted as complete. The registration will count towards the registration limit, remaining tickets, and calculations for available seats. Payments (if necessary) can also be made by primary registrants with this status.',
        'event_espresso'
    ),
    EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence')
); ?>
</div>
<div>
<strong><?php echo EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence'); ?></strong><br />
<?php printf(
    esc_html__(
        /* translators: 1: Pending Payment, 2: Pending Payment, 3: Approved */
        'A status of %1$s means that a registration has not paid but they ARE able to make payments (if necessary).  %2$s registrations do NOT count towards registration limits, remaining tickets, and calculations for available seats.  If registration for a free event occurs, then registrations are automatically set to %3$s. For paid tickets, %1$s registrations are set to %3$s when full payment is recorded.',
        'event_espresso'
    ),
    EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence'),
    EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence'),
    EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence')
); ?>
</div>
<div>
<strong><?php echo EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, false, 'sentence'); ?></strong><br />
<?php printf(
    esc_html__(
        /* translators: 1: Not Approved, 2: Pending Payment, 3: Approved */
        'A status of %1$s means that a registration has not paid and they cannot make payments for towards an event.  Un-approved registrations do NOT count towards registration limits, remaining tickets, and calculations for available seats.  This setting differs from the "%2$s" default in that free ticket registrations and paid in full ticket registrations do NOT automatically switch the Registration to %3$s.  Instead, the event admin must manually set the registration to either "%2$s" for registrations requiring payments, or "%3$s" for free events.',
        'event_espresso'
    ),
    EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, false, 'sentence'),
    EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'upper'),
    EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'upper')
); ?>
</div>
</li>
</ul>