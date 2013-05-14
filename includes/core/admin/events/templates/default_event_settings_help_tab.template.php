<?php 


function events_expire_on_reg_end_date_help_tab_html() { ?>

	<h2><?php _e('Default Event Settings', 'event_espresso'); ?></h2>
	<h3><?php _e('Events Expire on Registration End Date', 'event_espresso'); ?></h3>

	<p>
		<?php _e('This determines when events become inactive and no longer displayed in your event listings.', 'event_espresso'); ?>
	</p>
	<p>
		<strong><?php _e('Yes', 'event_espresso'); ?></strong><br />
		<?php _e('If set to Yes, then only events that can still be registered for will appear in your event listings.', 'event_espresso'); ?>
	</p>
	<p>
		<strong><?php _e('No', 'event_espresso'); ?></strong><br />
		<?php _e('If set to No, then events will remain visible in your event listings, even though people can no longer register for them.', 'event_espresso'); ?>
	</p>
	
<?php } 


function default_payment_status_help_tab_html() { ?>

	<h2><?php _e('Default Event Settings', 'event_espresso'); ?></h2>
	<h3><?php _e('Default Payment Status Options', 'event_espresso'); ?></h3>

	<p>
		<strong><?php _e('Approved', 'event_espresso'); ?></strong><br />
		<?php _e('This means the attendee\'s registration has been accepted as complete and will be count towards the registration limit, tickets left, and availalbe seats calculations. This default status can be overridden by the individual event\'s ', 'event_espresso'); ?>
	</p>

	<p>
		<strong><?php _e('Pending', 'event_espresso'); ?></strong><br />
		<?php _e('This means the attendee has not paid, but they do have a space reserved for them in the event.  When a user downloads an invoice, their payment status changes from Incomplete to Pending, reserving a space for them but not indicating that they have paid (since that would need to be recorded manually).', 'event_espresso'); ?>
	</p>
	
<?php } 



	
	
	