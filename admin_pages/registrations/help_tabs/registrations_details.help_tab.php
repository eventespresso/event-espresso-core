<h2><?php _e('Registration Details', 'event_espresso'); ?></h2>
<p>
<?php _e('This page shows information for a specific registration.', 'event_espresso'); ?>
</p>
<p>
<?php _e('The number for the registration is shown along with the date of the registration. Next the status of the registration is shown. A registration may have one of the following statuses: Approved, Pending Payment, Not Approved, Declined, or Cancelled.', 'event_espresso'); ?>
<ul>
<li style="list-style-type: none;">
<strong>Approved</strong><br>
An approved registration allows payments and may have a transaction status of incomplete or complete. The registration is marked as active and a space is reserved for the registrant.
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
<p>
<?php _e('<strong>Recommendations</strong><br /> Want to see a tour of this screen? Click on the Registration Details Tour button which appears on the right side of the page. <br />To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<?php _e('<strong>Screen Options</strong><br /> You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>