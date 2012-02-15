<?php

function espresso_display_nab($payor_data, $event_cost, $attendee_id, $event_id) {
	include_once ('Nab.php');
	echo '<!-- Event Espresso nab Gateway Version ' . $nab_gateway_version . '-->';
	$mynab = new nab(); // initiate an instance of the class
	global $org_options, $wpdb, $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
		espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
	}
	$nab_result_url = home_url() . '/?page_id=' . $org_options['notify_url'] . '&id=' . $attendee_id . '&event_id=' . $event_id . '&attendee_action=post_payment&form_action=payment&nab=true';
	$nab_settings = $payment_settings['nab'];
	$nab_id = $nab_settings['nab_merchant_id'];
	$nab_pass = $nab_settings['nab_merchant_password'];
	$use_sandbox = $nab_settings['nab_use_sandbox'];
	$registration_id = $wpdb->get_var("select registration_id from " . EVENTS_ATTENDEE_TABLE . " where id = $attendee_id");
	$temp_timezone_holder = date_default_timezone_get();
	date_default_timezone_set('UTC');
	$timestamp = date('YmdHis');
	date_default_timezone_set($temp_timezone_holder);
	if ($use_sandbox == 1) {
		$nab_post_url = "https://transact.nab.com.au/test/directpost/authorise";
	} else {
		$nab_post_url = "https://transact.nab.com.au/live/directpost/authorise";
	}
	$quantity = isset($quantity) && $quantity > 0 ? $quantity : espresso_count_attendees_for_registration($attendee_id);
	$mynab->addField('EPS_MERCHANT', $nab_id);
	$mynab->addField('EPS_PASSWORD', $nab_pass);
	$mynab->addField('EPS_REFERENCEID', $registration_id);
	$mynab->addField('EPS_AMOUNT', number_format($event_cost, 2, '.', ''));
	$mynab->addField('EPS_TIMESTAMP', $timestamp);

	if (empty($nab_settings['button_url'])) {
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "nab/nab_logo.png")) {
			$button_url = EVENT_ESPRESSO_GATEWAY_URL . "nab/nab_logo.png";
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/nab/nab_logo.png";
		}
	} else {
		$button_url = $nab_settings['button_url'];
	}
	?>
	<form method="post" action="<?php echo $nab_post_url; ?>">
		<input type="hidden" name="EPS_MERCHANT" value="<?php echo $nab_id; ?>">
		<input type="hidden" name="EPS_PASSWORD" value="<?php echo $nab_pass; ?>">
		<input type="hidden" name="EPS_REFERENCEID" value="<?php echo $registration_id; ?>">
		<input type="hidden" name="EPS_AMOUNT" value="<?php echo number_format($event_cost, 2, '.', ''); ?>">
		<input type="hidden" name="EPS_TIMESTAMP" value="<?php echo $timestamp; ?>">
		<input type="hidden" name="EPS_FINGERPRINT" value="<?php echo $mynab->prepareSubmit(); ?>">
		<input type="hidden" name="EPS_RESULTURL" value="<?php echo $nab_result_url; ?>">
		<input type="hidden" name="EPS_FIRSTNAME" value="<?php echo $payor_data['fname']; ?>">
		<input type="hidden" name="EPS_LASTNAME" value="<?php echo $payor_data['lname']; ?>">
		<input type="hidden" name="EPS_ZIPCODE" value="<?php echo $payor_data['zip']; ?>">
		<input type="hidden" name="EPS_TOWN" value="<?php echo $payor_data['city']; ?>">
		<input type="hidden" name="EPS_EMAILADDRESS" value="<?php echo $payor_data['attendee_email']; ?>">
		<table>
			<tbody>
				<tr>
					<td colspan="2"><b>Enter Account Details</b></td>
				</tr>
				<tr>
					<td>Card Type :</td>
					<td><select name="EPS_CARDTYPE" class="inputbox" style="width:167px">
							<option value="visa">Visa</option>
							<option value="mastercard">MasterCard</option>
							<option value="amex">Amex</option>
						</select></td>
				</tr>
				<tr>
					<td>Card Number :</td>
					<td><input type="text" class="inputbox" name="EPS_CARDNUMBER" value="4444333322221111" size="27"/></td>
				</tr>
				<tr>
					<td> Card CCV :</td>
					<td><input type="text"   class="inputbox" name="EPS_CCV" value="234" size="27" /></td>
				</tr>
				<tr>
					<td>Card Expires :</td>
					<td><select name="EPS_EXPIRYMONTH" class="inputbox">
							<option value="">- Month -</option>
							<option value="1">01</option>
							<option value="2">02</option>
							<option value="3">03</option>
							<option value="4" selected>04</option>
							<option value="5">05</option>
							<option value="6">06</option>
							<option value="7">07</option>
							<option value="8">08</option>
							<option value="9">09</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</select>
						&nbsp;
						<select name="EPS_EXPIRYYEAR" class="inputbox">
							<option value="">- Year -</option>
							<option value="2009">2009</option>
							<option value="2010">2010</option>
							<option value="2011">2011</option>
							<option value="2012" selected>2012</option>
							<option value="2013">2013</option>
							<option value="2014">2014</option>
							<option value="2015">2015</option>
							<option value="2016">2016</option>
							<option value="2017">2017</option>
							<option value="2018">2018</option>
							<option value="2019">2019</option>
							<option value="2020">2020</option>
							<option value="2021">2021</option>
							<option value="2022">2022</option>
							<option value="2023">2023</option>
							<option value="2024">2024</option>
							<option value="2025">2025</option>
						</select></td>
				</tr>
				<tr height=''50px''>
						<td align="left" colspan="2"><input type="submit" value="Post Payment" class="submit_button"/></td>
				</tr>
			</tbody>
		</table>
	</form>
	<?php
	wp_deregister_script('jquery.validate.pack');


	if ($use_sandbox == true) {
		echo '<h3 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h3>';
		$mynab->dump_fields();
	}
}