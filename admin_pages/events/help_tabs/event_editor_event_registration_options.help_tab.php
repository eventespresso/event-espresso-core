<p><strong><?php esc_html_e('Event Registration Options', 'event_espresso'); ?></strong></p>
<p>
<?php esc_html_e('Customize the registration for your event.', 'event_espresso'); ?>
</p>
<p>
<ul>
<li>
<strong><?php esc_html_e('Active Status', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Shows the current status for an event. A status will appear as Active, Upcoming, Postponed, Inactive, Sold Out, Expired, or Cancelled.', 'event_espresso'); ?>
<ul>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Active', 'event_espresso'); ?></strong><br>
<?php esc_html_e('A status of active means that an event has started and is currently taking place.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Upcoming', 'event_espresso'); ?></strong><br>
<?php esc_html_e('A status of upcoming means that an event is scheduled to take place in the future.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Postponed', 'event_espresso'); ?></strong><br>
<?php esc_html_e('A status of postponed means that an event is not currently scheduled but may be in the future.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Inactive', 'event_espresso'); ?></strong><br>
<?php esc_html_e('A status of inactive occurs when an event is set to draft.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Sold Out', 'event_espresso'); ?></strong><br>
<?php esc_html_e('A status of sold out means that tickets are no longer available for an event.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Expired', 'event_espresso'); ?></strong><br>
<?php esc_html_e('A status of expired means that the event has already taken place.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php esc_html_e('Cancelled', 'event_espresso'); ?></strong><br>
<?php esc_html_e('A status of cancelled means that the event will no longer take place.', 'event_espresso'); ?>
</li>
</ul>
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
<?php esc_html_e('Select the default registration status for this event. The options are Approved, Not Approved, and Pending Payment.', 'event_espresso'); ?>
</li>
</ul>
</p>