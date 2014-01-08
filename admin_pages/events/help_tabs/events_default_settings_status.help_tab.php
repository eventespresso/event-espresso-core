<h3><?php _e('Default Registration Status', 'event_espresso'); ?></h3>
<p>
<strong><?php _e('Approved', 'event_espresso'); ?></strong><br />
<?php _e('A status of approved means that a registration has been accepted as complete. The registration will count towards the registration limit, remaining tickets, and calculations for available seats. Payments (if necessary) can also be made by primary registrants with this status.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Pending', 'event_espresso'); ?></strong><br />
<?php _e('A status of pending means that a registration has not paid but they ARE able to make payments (if necessary).  Pending registrations do NOT count towards registration limits, remaining tickets, and calculations for available seats.  If registration for a free event occurs, then registrations are automatically set to Approved.  For paid tickets, Pending registrations are set to Approved when full payment is recorded.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Not Approved', 'event_espresso'); ?></strong><br />
<?php _e('Not Approved, means that a registration has not paid and they cannot make payments for towards an event.  Un-approved registrations do NOT count towards registration limits, remaining tickets, and calculations for available seats.  This setting differs from the "Pending" default in that free ticket registrations, and paid in full ticket registrations do NOT automatically switch the Registration to APPROVED.  Instead, the event admin must manually set the registration to either "Pending" for registrations requiring payments, or "Approved" for free events', 'event_espresso'); ?>
</p>