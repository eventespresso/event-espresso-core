<p><strong><?php _e('Registration Filters', 'event_espresso'); ?></strong></p>
<p>
<?php _e('Filters are a way to show registrations that fall into certain criteria.', 'event_espresso'); ?>
</p>
<p>
<ul>
<li>
<strong><?php _e('Filter by Month / Year', 'event_espresso'); ?></strong><br />
<?php _e('Show registrations that fall under a specific month and year.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Filter by Categories', 'event_espresso'); ?></strong><br />
<?php _e('Show registrations that fall under a specific category.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Filter by Status', 'event_espresso'); ?></strong><br />
<?php _e('The following statuses are available: Approved, Cancelled, Declined, Not Approved, Pending Payment.', 'event_espresso'); ?>
<ul>
<li style="list-style-type: none;">
<strong><?php _e('Approved', 'event_espresso'); ?></strong><br />
<?php _e('An approved registration allows payments and may have a transaction status of complete or incomplete. The registration is marked as active and a space is reserved for the registrant.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Cancelled', 'event_espresso'); ?></strong><br />
<?php _e('A cancelled registration is performed by the registrant. Payments are not allowed, the registration is inactive, and no space is reserved.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Declined', 'event_espresso'); ?></strong><br />
<?php _e('A declined registration is performed by the event admin. Payments are not allowed, the registration is inactive, and not space is reserved.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Not Approved', 'event_espresso'); ?></strong><br />
<?php _e('A not approved registration is performed by the event admin. Payments are not allowed, the registration is active, and no space is reserved.', 'event_espresso'); ?></li>
<li style="list-style-type: none;">
<strong><?php _e('Pending Payment', 'event_espresso'); ?></strong><br />
<?php _e('A pending registration allows payments. The status will be automatically toggled to approved if the payment is made in full by registrant.', 'event_espresso'); ?>
</li>
</li>
</ul>
</ul>
</p>