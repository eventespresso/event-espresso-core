<?php

function espresso_display_aim($payment_data) {
	global $org_options, $payment_settings;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	?>
	<div class="event-display-boxes">
		<?php
		$authnet_aim_settings = $payment_settings['aim'];
		$use_sandbox = $authnet_aim_settings['use_sandbox'] || $authnet_aim_settings['test_transactions'];
		if ($use_sandbox) {
			echo '<p>Test credit card # 4007000000027</p>';
			echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h3>';
		}
		?>

		<p class="section-title"><?php _e('Billing Information', 'event_espresso') ?></p>
		<form id="aim_payment_form" name="aim_payment_form" method="post" action="<?php echo home_url() . '/?page_id=' . $org_options['return_url'] . '&registration_id=' . $payment_data->attendees[0]->registration_id; ?>">
			<div class = "event_espresso_form_wrapper">
				<p>
	        <label for="first_name"><?php _e('First Name', 'event_espresso'); ?></label>
	        <input name="first_name" type="text" id="first_name" value="<?php echo $payment_data->attendees[0]->fname ?>" />
				</p>
				<p>
	        <label for="last_name"><?php _e('Last Name', 'event_espresso'); ?></label>
	        <input name="last_name" type="text" id="last_name" value="<?php echo $payment_data->attendees[0]->lname ?>" />
				</p>
				<p>
	        <label for="email"><?php _e('Email Address', 'event_espresso'); ?></label>
	        <input name="email" type="text" id="email" value="<?php echo $payment_data->attendees[0]->email ?>" />
				</p>
				<p>
	        <label for="address"><?php _e('Address', 'event_espresso'); ?></label>
	        <input name="address" type="text" id="address" value="<?php echo $payment_data->attendees[0]->address ?>" />
				</p>
				<p>
	        <label for="city"><?php _e('City', 'event_espresso'); ?></label>
	        <input name="city" type="text" id="city" value="<?php echo $payment_data->attendees[0]->city ?>" />
				</p>
				<p>
	        <label for="state"><?php _e('State', 'event_espresso'); ?></label>
	        <input name="state" type="text" id="state" value="<?php echo $payment_data->attendees[0]->state ?>" />
				</p>
				<p>
	        <label for="zip"><?php _e('Zip', 'event_espresso'); ?></label>
	        <input name="zip" type="text" id="zip" value="<?php echo $payment_data->attendees[0]->zip ?>" />
				</p>
				<p><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></p>
				<p>
	        <label for="card_num"><?php _e('Card Number', 'event_espresso'); ?></label>
	        <input type="text" name="card_num" id="card_num" />
				</p>
				<p>
	        <label for="exp_date"><?php _e('Exp. Date', 'event_espresso'); ?></label>
	        <input type="text" name="exp_date" id="exp_date" />
				</p>
				<p>
	        <label for="ccv_code"><?php _e('CCV Code', 'event_espresso'); ?></label>
	        <input type="text" name="ccv_code" id="ccv_code" />
				</p>
				<input name="amount" type="hidden" value="<?php echo number_format($payment_data->total_cost, 2) ?>" />
				<input name="invoice_num" type="hidden" value="<?php echo 'au-' . event_espresso_session_id() ?>" />
				<input name="authnet_aim" type="hidden" value="true" />
				<input name="x_cust_id" type="hidden" value="<?php echo $payment_data->attendee_id ?>" />

				<input name="aim_submit" type="submit" value="<?php _e('Complete Purchase', 'event_espresso'); ?>" />
			</div>
		</form>

	</div>
	<!-- / .event_espresso_form_wrapper -->
	<script type="text/javascript">

		jQuery(function(){

			jQuery('#aim_payment_form').validate();

			jQuery('#aim_payment_form').submit(function(){

				if (jQuery('#aim_payment_form').valid()){
					jQuery('#processing').html('<img src="' + EEGlobals.plugin_url + 'images/ajax-loader.gif">');
				}
			})
		});

	</script>
	<?php
}

add_action('action_hook_espresso_display_onsite_payment_gateway', 'espresso_display_aim');