<?php

function espresso_display_aim($payor_data, $event_cost, $attendee_id) {
	global $org_options, $payment_settings;
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
	if ($payment_settings['authnet_aim']['use_sandbox'] == 'Y') {
		echo '<p>Test credit card # 4007000000027</p>';
		echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h3>';
	}
	?>

<p><strong>
	<?php _e('Billing Information', 'event_espresso') ?>
	</strong></p>
<div class="event_espresso_form_wrapper">
	<form id="aim_payment_form" name="aim_payment_form" method="post" action="<?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?>">
		<p>
			<label for="first_name">
				<?php _e('First Name', 'event_espresso'); ?>
			</label>
			<input class="required" name="first_name" type="text" id="first_name" value="<?php echo $payor_data['fname'] ?>" />
		</p>
		<p>
			<label for="last_name">
				<?php _e('Last Name', 'event_espresso'); ?>
			</label>
			<input class="required" name="last_name" type="text" id="last_name" value="<?php echo $payor_data['lname'] ?>" />
		</p>
		<p>
			<label for="email">
				<?php _e('Email Address', 'event_espresso'); ?>
			</label>
			<input class="required" name="email" type="text" id="email" value="<?php echo $payor_data['attendee_email'] ?>" />
		</p>
		<p>
			<label for="address">
				<?php _e('Address', 'event_espresso'); ?>
			</label>
			<input class="required" name="address" type="text" id="address" value="<?php echo $payor_data['address'] ?>" />
		</p>
		<p>
			<label for="city">
				<?php _e('City', 'event_espresso'); ?>
			</label>
			<input class="required" name="city" type="text" id="city" value="<?php echo $payor_data['city'] ?>" />
		</p>
		<p>
			<label for="state">
				<?php _e('State', 'event_espresso'); ?>
			</label>
			<input class="required" name="state" type="text" id="state" value="<?php echo $payor_data['state'] ?>" />
		</p>
		<p>
			<label for="zip">
				<?php _e('Zip', 'event_espresso'); ?>
			</label>
			<input class="required" name="zip" type="text" id="zip" value="<?php echo $payor_data['zip'] ?>" />
		</p>
		<p><strong>
			<?php _e('Credit Card Information', 'event_espresso'); ?>
			</strong></p>
		<p>
			<label for="card_num">
				<?php _e('Card Number', 'event_espresso'); ?>
			</label>
			<input class="required" type="text" name="card_num" id="card_num" />
		</p>
		<p>
			<label for="exp_date">
				<?php _e('Exp. Date', 'event_espresso'); ?>
			</label>
			<input class="required" type="text" name="exp_date" id="exp_date" />
		</p>
		<p>
        <label for="ccv_code"><?php _e('CCV Code', 'event_espresso'); ?></label>
        <input type="text" name="ccv_code" id="ccv_code" />
    </p>
		<input name="amount" type="hidden" value="<?php echo number_format($event_cost, 2) ?>" />
		<input name="invoice_num" type="hidden" value="<?php echo 'au-' . event_espresso_session_id() ?>" />
		<input name="authnet_aim" type="hidden" value="true" />
		<input name="x_cust_id" type="hidden" value="<?php echo $attendee_id ?>" />
		<input class="btn_event_form_submit ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all" name="aim_submit" type="submit" value="<?php _e('Complete Purchase', 'event_espresso'); ?>" />
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
