<h3><?php _e('Registration Filters', 'event_espresso'); ?></h3>
<p>
<?php _e('Filters are a way to show registrations that fall into certain criteria.', 'event_espresso'); ?><br />
</p>
<p>
<ul>
<li>
<?php _e('<strong>Filter by Month / Year</strong>', 'event_espresso'); ?><br />
<?php _e('Show registrations that fall under a specific month and year.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Filter by Categories</strong>', 'event_espresso'); ?><br />
<?php _e('Show registrations that fall under a specific category.', 'event_espresso'); ?>
</li>
<li>
<?php _e('<strong>Filter by Status</strong>', 'event_espresso'); ?><br />
<?php _e('The following statuses are available: Approved, Cancelled, Declined, Not Approved, Pending Payment.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong>Approved</strong><br>
An approved registration allows payments and may have a completed or incompleted transaction status. The registration is marked as active and a space is reserved for the registrant.
</li>
<li style="list-style-type: none;">
<strong>Cancelled</strong><br>
A cancelled registration is performed by the registrant. Payments are not allowed, the registration is inactive, and no space is reserved.
</li>
<li style="list-style-type: none;">
<strong>Declined</strong><br>
A declined registration is performed by the event admin. Payments are not allowed, the registration is inactive, and not space is reserved.
</li>
<li style="list-style-type: none;">
<strong>Not Approved</strong><br>
A not approved registration is performed by the event admin. Payments are not allowed, the registration is active, and no space is reserved.
</li>
<li style="list-style-type: none;">
<strong>Pending Payment</strong><br>
A pending registration allows payments. The status will be automatically toggled to approved if the payment is made in full by registrant.
</li>
</ul>
</p>