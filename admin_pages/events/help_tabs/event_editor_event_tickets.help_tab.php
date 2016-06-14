<p><strong><?php _e('Available Tickets', 'event_espresso'); ?></strong></p>
<p>
<?php _e('Available tickets shows all combinations of tickets that are available. Note that each ticket has a name, date that the ticket becomes available for purchase, date that ticket sales close on, price for each ticket, quantity available, number sold, and number of registrations.', 'event_espresso'); ?>
</p>
<p>
<?php _e('HTML tags cannot be used on the ticket title (name) but they can be used in the ticket description. The quantity in the "Sold" column for Available Tickets shows how many of this type of ticket has been sold. The quantity in the "Regs" column for Available Tickets shows the amount of registrations that have occurred from these tickets.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Event Datetimes Limit Field', 'event_espresso'); ?></strong><br />
<?php _e('The event datetimes limit field allows you to set a maximum number of tickets that you want to make available for an event datetime. For example, lets say that we had 70 free tickets available and 30 premium tickets available. If we set a limit of 50 using the event datetimes limit field, then the ticket sales will close once any combination of 50 tickets are sold.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Advanced Settings', 'event_espresso'); ?></strong><br />
<?php _e('The Advanced Settings icon<span class="gear-icon dashicons dashicons-admin-generic"></span> allows more customization to your tickets. You can add a description, set a number for datetimes, set a minimum quantity required to purchase, and set a maximum quantity. Price modifiers allow you to setup discounts or surcharges for your tickets. Additionally, you can mark a ticket as taxable by placing a checkmark in the taxable checkbox.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Datetimes', 'event_espresso'); ?></strong><br />
<?php _e('The datetimes field allows you to specify the number of datetimes that a ticket has access too. For example, an event may take place across 5 sessions but a ticket which has a datetimes limit of 3 will only allow a registrant to attend only 3 out of the 5 sessions.', 'event_espresso'); ?>
</p>
<p>
<?php _e('You can create a new ticket by clicking on the Create Ticket button. Then you will need to set a description, complete the ticket details, and adjust the price modifiers.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Ticket Status Labels', 'event_espresso'); ?></strong><br />
<?php _e('The following statuses are available for tickets: Archived, Expired, Sold Out, Upcoming, and On Sale.', 'event_espresso'); ?>
</p>
<ul>
<li style="list-style-type: none;">
<strong><?php _e('Archived', 'event_espresso'); ?></strong><br />
<?php _e('A status of archived occurs when the first ticket is sold. After the first ticket sale, Event Espresso archives the existing ticket to prevent changes which could affect existing registrants. A new ticket is automatically created for new registrants so that an event admin can change pricing (if needed).', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Expired', 'event_espresso'); ?></strong><br />
<?php _e('A status of expired occurs once an event has already taken place.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Sold Out', 'event_espresso'); ?></strong><br />
<?php _e('A status of sold out occurs when the maximum quantity of a certain ticket is purchased. For example, if 50 Premium tickets were available and 50 Premium tickets were immediately purchased, then this ticket would have a status of sold out since no more tickets would be available for purchase.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('Upcoming', 'event_espresso'); ?></strong><br />
<?php _e('A status of upcoming occurs when a ticket is scheduled to go on sale in the future.', 'event_espresso'); ?>
</li>
<li style="list-style-type: none;">
<strong><?php _e('On Sale', 'event_espresso'); ?></strong><br />
<?php _e('A status of on sale means that a ticket is currently available for purchase.', 'event_espresso'); ?>
</li>
</ul>