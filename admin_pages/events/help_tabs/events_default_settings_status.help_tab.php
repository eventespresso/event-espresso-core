<h3><?php _e('Default Registration Status', 'event_espresso'); ?></h3>
<p>
<strong><?php _e('Approved', 'event_espresso'); ?></strong><br />
<?php _e('A status of approved means that an attendee\'s registration has been accepted as complete. Their registration will count towards the registration limit, remaining tickets, and calculations for available seats. /*This default status can be overridden for a specific event.*/', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Pending', 'event_espresso'); ?></strong><br />
<?php _e('A status of pending means that an attendee has not paid but they do have a space reserved for them for an event. If a user downloads an invoice, then their payment status will change from incomplete to pending, thereby reserving a space for them but not indicating that they have paid (since a payment would need to be recorded manually).', 'event_espresso'); ?>
</p>
<h3><?php _e('Pending Registrations Count Towards Registration Limits and Ticket Sales', 'event_espresso'); ?></h3>
<p>
<?php _e('When this option is set to yes, then the attendee\'s registration status will be set to pending. This means that their registration will count towards an event registration limit and therefore affect number of spaces remaining, ticket sale calculations, and seating options (if applicable).', 'event_espresso'); ?><br />
</p>
<h3><?php _e('Enable Attendee Pre-approval', 'event_espresso'); ?></h3>
<p>
<?php _e('When enabled, an event administrator must manually approve the registration. This is not linked to the transaction status.', 'event_espresso'); ?>
</p>