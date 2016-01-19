<p><strong><?php _e('Event Datetimes', 'event_espresso'); ?></strong></p>
<p>
<?php _e('This is the event datetimes of the event. All events require a start and an end date in order to display properly on your pages. You can also view sold tickets, quickly create a new tickets, and duplicate an event datetime. Event Datetimes can also have a title or name associated with them.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Event Datetimes Limit Field', 'event_espresso'); ?></strong><br />
<?php _e('The event datetimes limit field allows you to set a maximum number of tickets that you want to make available for an event datetime. For example, lets say that we had 70 free tickets available and 30 premium tickets available. If we set a limit of 50 using the event datetimes limit field, then the ticket sales will close once any combination of 50 tickets are sold.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Event Datetimes Sold', 'event_espresso'); ?></strong><br />
<?php _e('The quantity in the Event Datetimes "Sold" column will keep track of how many tickets have been sold that have access to this datetime. This means that the total number "Sold" for each datetime may be greater than the number of individual tickets "Sold" because each ticket may have access to multiple datetimes.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Create a New Event Datetime', 'event_espresso'); ?></strong><br />
<?php _e('You can create a new event datetime by clicking on the add datetime button. Then set a start date for your event, an end date for your event, and a event datetimes limit (optional). You can also save time by clicking on the Duplicate this item icon<span class="clone-icon ee-icon ee-icon-clone"></span> to create a copy of an existing datetime.', 'event_espresso'); ?>
</p>
<p>
<?php _e('You can view and create Assigned Tickets by clicking on the Assign Ticket icon<span class="ticket-icon ee-icon ee-icon-tickets"></span>. This will open a panel that shows existing tickets that have been assigned. New tickets can also be added from this panel.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Using Datetimes Limit Field & Ticket Quantities', 'event_espresso'); ?></strong><br />
<?php _e('You can gain a finer control over ticketing for your events by using the datetimes limit field and ticket quantities together. Lets take a look at an example to understand this powerful feature.', 'event_espresso'); ?>
</p>
<p>
<?php _e('Here is some information that we\'ll use for our example. Lets say that Datetime A has a limit set to 75 and Datetime B has no set limit which means unlimited. Next, our Free Ticket has a quantity set to 50 and our Premium Ticket also has a quantity set to 50. Free Ticket is linked to Datetime A. Premium Ticket is linked to Datetime A and Datetime B.', 'event_espresso'); ?><br />
<?php _e('Now lets create our scenario and say that both tickets go on sale at the same time and Free Ticket sells out immediately and no Premium Tickets have been sold. This will leave a balance of 25 tickets for Datetime A because we started with a limit (maximum) of 75 tickets and then sold 50 Free Tickets. Any remaining tickets would then be spread between Datetime A (up to 25) or Datetime B (no limit).', 'event_espresso'); ?></p>
<p>
<?php _e('The Event Datetimes Limit Field always takes priority over the quantity of tickets available. If you want to only use the ticket quantity then be sure to not put a limit on any datetimes.', 'event_espresso'); ?>
</p>