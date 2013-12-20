<?php 
function event_date_info_help_tab_html() {
	?>
	<p>
		<?php _e('This is the date of the event. All events require a start and end date in order to display properly on your pages.', 'event_espresso'); ?>
	</p>
	<p>
		<?php _e('The limit field allows you to set a maximum number of tickets that you want to make available for an event. For example, lets say that we had 70 free tickets available and 30 premium tickets available. If we set a limit of 50 using the limit field, then the ticket sales will close once any combination of 50 tickets are sold.', 'event_espresso'); ?>
	</p>
	<?php
}
function ticket_options_info_help_tab_html() {
	?>
	<p>
		TODO: The text for this needs to be done.  See includes/core/admin/events/templates/event_edit_help_tab.template.php
	</p>
	<?php
}