<?php 

function default_registration_status_help_tab_html() { ?>

	<h3><?php _e('Default Registration Status Options', 'event_espresso'); ?></h3>

	<p>
		<strong><?php _e('Approved', 'event_espresso'); ?></strong><br />
		<?php _e('This means the attendee\'s registration has been accepted as complete and will be count towards the registration limit, tickets left, and availalbe seats calculations. This default status can be overridden by the individual event\'s ', 'event_espresso'); ?>
	</p>

	<p>
		<strong><?php _e('Pending', 'event_espresso'); ?></strong><br />
		<?php _e('This means the attendee has not paid, but they do have a space reserved for them in the event.  When a user downloads an invoice, their payment status changes from Incomplete to Pending, reserving a space for them but not indicating that they have paid (since that would need to be recorded manually).', 'event_espresso'); ?>
	</p>
	
<?php } 



	
	
	