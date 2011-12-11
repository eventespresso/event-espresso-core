<?php
function event_espresso_authnet_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user; if ($espresso_premium != true) return;

	$old_payment_settings = get_option('payment_data_'.$espresso_wp_user);
	$payment_settings = get_option('payment_data_'.$espresso_wp_user);

	if (isset($_POST['update_authnet']) && check_admin_referer('espresso_form_check', 'add_authnetsim_settings')) {
		//$payment_settings = get_option('payment_data_'.$espresso_wp_user);
		$payment_settings['authnet_sim']['authnet_login_id'] = $_POST['authnet_login_id'];
		$payment_settings['authnet_sim']['authnet_transaction_key'] = $_POST['authnet_transaction_key'];
		$payment_settings['authnet_sim']['image_url'] = $_POST['image_url'];
		$payment_settings['authnet_sim']['use_sandbox'] = $_POST['use_sandbox'];
		$payment_settings['authnet_sim']['test_transactions'] = $_POST['test_transactions'];
		$payment_settings['authnet_sim']['surcharge'] = $_POST['surcharge'];
		$payment_settings['authnet_sim']['bypass_payment_page'] = $_POST['bypass_payment_page'];
		$payment_settings['authnet_sim']['button_url'] = $_POST['button_url'];

		//if (update_option( 'payment_data_'.$espresso_wp_user, $payment_settings ) == true){
			$notices['updates'][] = __('Authorize.net SIM Payment Settings Updated!', 'event_espresso');
		//}
	}

	//Open or close the postbox div
	if ($payment_settings['authnet_sim']['active'] == false || isset($_REQUEST['deactivate_authnet_sim']) && $_REQUEST['deactivate_authnet_sim'] == 'true' ){
		$postbox_style = 'closed';
	}
	if (isset($_REQUEST['reactivate_authnet_sim']) && $_REQUEST['reactivate_authnet_sim'] == 'true'){
		$postbox_style = '';
	}
	if (isset($_REQUEST['activate_authnet_sim']) && $_REQUEST['activate_authnet_sim'] == 'true'){
		$postbox_style = '';
	}

?>

<a name="authnet_aim" id="authnet_sim"></a>
<div class="metabox-holder">
	<div class="postbox <?php echo $postbox_style; ?>">
		<div title="Click to toggle" class="handlediv"><br />
		</div>
		<h3 class="hndle">
			<?php _e('Authorize.net SIM Settings', 'event_espresso'); ?>
		</h3>
		<div class="inside">
			<div class="padding">
				<?php
					//This line keeps the notices from displaying twice
					//if ( did_action( 'espresso_admin_notices' ) == false )
						do_action('espresso_admin_notices');
					if (isset($_REQUEST['activate_authnet_sim']) && $_REQUEST['activate_authnet_sim'] == 'true') {
						$payment_settings['authnet_sim']['active'] = true;
						if (add_option( 'payment_data_'.$espresso_wp_user, $payment_settings, '', 'no' ) == true){
							$notices['updates'][] = __('Authorize.net SIM Gateway Activated', 'event_espresso');
						}elseif (update_option('payment_data_'.$espresso_wp_user, $payment_settings) == true){
							$notices['updates'][] = __('Authorize.net SIM Gateway Activated', 'event_espresso');
						}else{
							$notices['errors'][] = __('Unable to Activate Authorize.net SIM Gateway', 'event_espresso');
						}
					}

					if (isset($_REQUEST['reactivate_authnet_sim']) && $_REQUEST['reactivate_authnet_sim'] == 'true') {
						$payment_settings['authnet_sim']['active'] = true;
						if (update_option('payment_data_'.$espresso_wp_user, $payment_settings) == true){
							$notices['updates'][] = __('Authorize.net SIM Gateway Payments Activated', 'event_espresso');
						}else{
							$notices['errors'][] = __('Unable to Activate Authorize.net SIM Gateway', 'event_espresso');
						}
					}

					if (isset($_REQUEST['deactivate_authnet_sim']) && $_REQUEST['deactivate_authnet_sim'] == 'true') {
						$payment_settings['authnet_sim']['active'] = false;
						if (update_option( 'payment_data_'.$espresso_wp_user, $payment_settings) == true){
							$notices['updates'][] = __('Authorize.net SIM Gateway Payments De-activated', 'event_espresso');
						}else{
							$notices['errors'][] = __('Unable to De-activate Authorize.net SIM Gateway', 'event_espresso');
						}
					}

					echo '<ul>';
					if (!isset($payment_settings['authnet_sim']['active'])){
						echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_authnet_sim=true#authnet_sim\';" class="yellow_alert pointer"><strong>' . __('The Authorize.net SIM Gateway is installed. Would you like to activate it?','event_espresso') . '</strong></li>';
					}else{
						switch ($payment_settings['authnet_sim']['active']){

							case false:
								echo '<li>Authorize.net SIM Gateway is Installed.</li>';
								echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_authnet_sim=true#authnet_sim\';" class="green_alert pointer"><strong>' . __('Activate Authorize.net SIM Gateway?', 'event_espresso') . '</strong></li>';
								break;

							case true:
								echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_authnet_sim=true\';" class="red_alert pointer"><strong>' . __('Deactivate Authorize.net SIM Gateway?', 'event_espresso') . '</strong></li>';
								event_espresso_display_authnet_settings();
								break;
						}
					}
					echo '</ul>';
					?>
			</div>
		</div>
	</div>
</div>
<?php

}

//Authorize.net SIM Settings Form
function event_espresso_display_authnet_settings() {
	global $espresso_premium, $org_options, $espresso_wp_user; if ($espresso_premium != true) return;

	$payment_settings = get_option('payment_data_'.$espresso_wp_user);

	$values = array(
		array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
		array('id' => 'N', 'text' => __('No', 'event_espresso')),
	);

	//Get the current button URL
	if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/btn_cc_vmad.gif")) {
		$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/btn_cc_vmad.gif";
	} else {
		$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/authnet/btn_cc_vmad.gif";
	}
	?>
<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>#authnet_sim">
	<table class="form-table">
		<tbody>
			<tr>
				<th><label for="authnet_login_id">
						<?php _e('Authorize.net Login I.D.', 'event_espresso'); ?>
					</label></th>
				<td><input class="regular-text" type="text" name="authnet_login_id" id="authnet_login_id" size="35" value="<?php echo $payment_settings['authnet_sim']['authnet_login_id']; ?>">
					<br />
					<span class="description">
					<?php _e('Please enter your Authorize.net Login I.D.', 'event_espresso'); ?>
					</span></td>
			</tr>
			<tr>
				<th><label for="authnet_transaction_key">
						<?php _e('Authorize.net Transaction Key', 'event_espresso'); ?>
					</label></th>
				<td><input class="regular-text" type="text" name="authnet_transaction_key" id="authnet_transaction_key" size="35" value="<?php echo $payment_settings['authnet_sim']['authnet_transaction_key']; ?>">
					<br />
					<span class="description">
					<?php _e('Please enter your Authorize.net Transaction Key.', 'event_espresso'); ?>
					</span></td>
			</tr>
			<tr>
				<th><label for="sim_button_url">
						<?php _e('Button Image URL: ', 'event_espresso'); ?>
						<?php echo apply_filters('espresso_help', 'authnet_button_url_info') ?>
					</label></th>
				<td><input class="regular-text" type="text" name="button_url" id="sim_button_url" value="<?php echo $payment_settings['authnet_sim']['button_url'] == '' ? $button_url : $payment_settings['authnet_sim']['button_url']; ?>" />
				<br />
				<span class="description">
					<?php _e('URL to the payment button.', 'event_espresso'); ?>
					</span></td>
			</tr>
			<tr>
				<th><label for="sim_image_url">
						<?php _e('Image URL: ', 'event_espresso'); ?>
						<?php echo apply_filters('espresso_help', 'authnet_image_url_info') ?>
					</label></th>
				<td><input class="regular-text" type="text" name="image_url" id="sim_image_url" value="<?php echo $payment_settings['authnet_sim']['image_url']; ?>" />
					<br />
					<span class="description">
					<?php _e('Used for your business/personal logo on the Authorize.net SIM payment page.', 'event_espresso'); ?>
					</span></td>
			</tr>
			<tr>
				<th><label>
						<?php _e('Relay Response URL: ', 'event_espresso'); ?>
						<?php echo apply_filters('espresso_help', 'relay_response') ?>
					</label></th>
				<td><span class="display-path" style="background-color: rgb(255, 251, 204); border:#999 solid 1px; padding:2px;"><?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?></span><br />
			<span class="description">
					<?php _e('URL to the transaction page.', 'event_espresso'); ?>
					</span></td>
			</tr>
			<tr>
				<th><label for="use_sandbox">
						<?php _e('Is this an account on the Authorize.net development server? ', 'event_espresso'); ?>
						<?php echo apply_filters('espresso_help', 'authnet_sandbox'); ?>
					</label></th>
				<td><?php echo select_input('use_sandbox', $values, empty($payment_settings['authnet_sim']['use_sandbox']) ? 'N' : $payment_settings['authnet_sim']['use_sandbox']);?></td>
			</tr>
			<tr>
				<th><label for="test_transactions">
						<?php _e('Do you want to submit a test transaction? ', 'event_espresso'); ?>
						<?php echo apply_filters('espresso_help', 'authnet_test_transactions') ?>
					</label></th>
				<td><?php echo select_input('test_transactions', $values, empty($payment_settings['authnet_sim']['test_transactions']) ? 'N' : $payment_settings['authnet_sim']['test_transactions']);?></td>
			</tr>
			<tr>
				<th><label for="bypass_payment_page">
						<?php _e('By-pass the payment confirmation page? ', 'event_espresso'); ?>
						<?php echo apply_filters('espresso_help', 'bypass_confirmation') ?>
					</label></th>
				<td><?php echo select_input('bypass_payment_page', $values, $payment_settings['authnet_sim']['bypass_payment_page']); ?></td>
			</tr>
		</tbody>
	</table>
	<?php /*?><!-- TABLE TEMPLATE -->
	<table class="form-table">
		<tbody>
			<tr>
				<th> </th>
				<td></td>
			</tr>
			<tr>
				<th> </th>
				<td></td>
			</tr>
			<tr>
				<th> </th>
				<td></td>
			</tr>
		</tbody>
	</table><?php */?>
	<p>
		<input type="hidden" name="update_authnet" value="update_authnet">
		<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Authorize.net SIM Settings', 'event_espresso') ?>" id="save_authnet_settings" />
	</p>
	<?php wp_nonce_field( 'espresso_form_check', 'add_authnetsim_settings' ); ?>
</form>
<div id="relay_response" style="display:none">
	<h2>
		<?php _e('Relay Response', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('This shows the specific the URL to which the gateway should return the relay response for a transaction. This the page should be set in your Authorize.net account. Login to Authorize.net, goto Account > Response/Receipt URLs > Add URL and enter the following URL.', 'event_espresso'); ?>
	</p>
	<p><strong>
		<?php _e('Relay Response URL:', 'event_espresso'); ?>
		</strong> <?php echo home_url() . '/?page_id=' . $org_options['notify_url'] ?><br />
		<span style="color:red;">
		<?php _e('Note:', 'event_espresso'); ?>
		</span>
		<?php _e('This URL can be changed in the "Organization Settings" page.', 'event_espresso'); ?>
	</p>
	<p>
		<?php _e('For complete information on configuring relay response, please refer to', 'event_espresso'); ?>
		<a href="https://account.authorize.net/help/Merchant_Interface_RoboHelp_Project.htm#Miscellaneous/Reference.htm%3E%3Epan=2">
		<?php _e('Reference &amp; User Guides', 'event_espresso'); ?>
		</a>.</p>
</div>
<div id="authnet_button_url_info" style="display:none">
	<h2>
		<?php _e('Button Image URL', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso'); ?>
	</p>
	<p><strong>
		<?php _e('Current button image:', 'event_espresso'); ?>
		</strong></p>
	<p><?php echo $payment_settings['authnet_sim']['button_url'] == '' ? '<img src="' . $button_url . '" />' : '<img src="' . $payment_settings['authnet_sim']['button_url'] . '" />'; ?></p>
</div>
<div id="authnet_image_url_info" style="display:none">
	<h2>
		<?php _e('Authorize.net SIM Image URL (logo for payment page)', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('The URL of the image displayed as your logo in the header of the Authorize.net checkout pages.', 'event_espresso'); ?>
	</p>
	<p><strong>
		<?php _e('Current logo image:', 'event_espresso'); ?>
		</strong></p>
	<p><?php echo $payment_settings['authnet_sim']['image_url'] == '' ? '<img src="' . $button_url . '" />' : '<img src="' . $payment_settings['authnet_sim']['image_url'] . '" />'; ?></p>
</div>
<div id="authnet_sandbox" style="display:none">
	<h2>
		<?php _e('Authorize.net Development Server', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('Authorize.net maintains a development environment for testing your gateway. You may use this to test your setup without having a live account. You will need to sign up for a free account on the development server here: '); ?>
		<a href="https://developer.authorize.net/testaccount/">https://developer.authorize.net/testaccount/</a>
		<?php _e('Transactions that are submitted to the development server are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?>
	</p>
	<p><strong>
		<?php _e('Example Card Numbers:', 'event_espresso'); ?>
		</strong></p>
	<p>370000000000002 (
		<?php _e('American Express', 'event_espresso'); ?>
		)<br />
		6011000000000012 (
		<?php _e('Discover', 'event_espresso'); ?>
		)<br />
		5424000000000015 (
		<?php _e('Master Card', 'event_espresso'); ?>
		)<br />
		4007000000027 (
		<?php _e('Visa', 'event_espresso'); ?>
		)</p>
</div>
<div id="authnet_test_transactions" style="display:none">
	<h2>
		<?php _e('Authorize.net Test Transactions', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('Transactions that are submitted as test transactions are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?>
	</p>
	<p><strong>
		<?php _e('Example Card Numbers:', 'event_espresso'); ?>
		</strong></p>
	<p>370000000000002 (
		<?php _e('American Express', 'event_espresso'); ?>
		)<br />
		6011000000000012 (
		<?php _e('Discover', 'event_espresso'); ?>
		)<br />
		5424000000000015 (
		<?php _e('Master Card', 'event_espresso'); ?>
		)<br />
		4007000000027 (
		<?php _e('Visa', 'event_espresso'); ?>
		)</p>
</div>
<?php
}




