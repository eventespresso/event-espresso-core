<?php

function espresso_display_return_payment_template($data) {
	global $org_options;
	if ($data->payment_status == "Pending") {
		if ($org_options['show_pending_payment_options'] == 'Y') {
			echo '<div class="event_espresso_attention"><strong class="payment_details payment_pending">' . __('Pending Payment', 'event_espresso') . "</strong><br />Would you like to choose a different payment option?</div>";
			do_action('action_hook_espresso_display_payment_gateways');
		}
	}

	if ($data->payment_status == "Incomplete" || $data->payment_status == "Payment Declined" || $data->payment_status == "") {
		//Check the number of available sapce against this registration
		if (get_number_of_attendees_reg_limit($data->event_id, 'number_available_spaces') < $data->quantity) {
			?>
			<p class="espesso_event_full"> <?php _e('Sorry, there are not enough spaces available to complete your registration.', 'event_espresso'); ?></p>
			<p class="espesso_event_full"> <?php _e('Quantity in your Party:', 'event_espresso'); ?> <?php echo $data->quantity ?></p>
			<p class="espesso_event_full"><?php _e('Spaces Available:', 'event_espresso'); ?> <?php echo get_number_of_attendees_reg_limit($data->event_id, 'avail_spaces_slash_reg_limit') ?></p>
			<?php
			return;
		}
		//Uncomment to check the number of available spaces
		//echo get_number_of_attendees_reg_limit($data->event_id, 'number_available_spaces');
		if ($data->total_cost != '0.00') {
			do_action('action_hook_espresso_display_payment_gateways');
		}
	}//End if ($data->payment_status == ("Incomplete") )
}

add_action('action_hook_espresso_display_return_payment_template', 'espresso_display_return_payment_template');