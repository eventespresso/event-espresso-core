<?php 


function event_date_info_help_tab_html() {
	?>
	<p>
		<?php _e('This is the date of the event.', 'event_espresso'); ?>
	</p>
	<p>
		<?php _e('All events require a start and end date in order to display properly on your pages.', 'event_espresso'); ?>
	</p>
	<?php
}





function reg_date_info_help_tab_html() {
	?>
	<p>
		<?php _e('The event will automatically turn the registration form on and off between these dates and times.', 'event_espresso'); ?>
	</p>
	<p><strong>
			<?php _e('Note:', 'event_espresso'); ?>
		</strong>
		<?php _e('If the date of your event occurs before the regisration end date. Then the registation form will be displayed and also accept registrations.', 'event_espresso'); ?>
	</p>
	<p>
		<?php _e('All events require registration start/end dates and start/end times in order to display properly on your pages.', 'event_espresso'); ?>
	</p>
	<?php
}