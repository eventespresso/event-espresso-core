<?php

function event_espresso_authnet_payment_settings() {
	global $org_options, $espresso_premium, $notices, $espresso_wp_user;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	if (isset($_POST['update_authnet']) && check_admin_referer('espresso_form_check', 'add_authnetsim_settings')) {
		$payment_settings['authnet_sim']['authnet_login_id'] = $_POST['authnet_login_id'];
		$payment_settings['authnet_sim']['authnet_transaction_key'] = $_POST['authnet_transaction_key'];
		$payment_settings['authnet_sim']['image_url'] = $_POST['image_url'];
		$payment_settings['authnet_sim']['use_sandbox'] = $_POST['use_sandbox'];
		$payment_settings['authnet_sim']['test_transactions'] = $_POST['test_transactions'];
		$payment_settings['authnet_sim']['bypass_payment_page'] = $_POST['bypass_payment_page'];
		$payment_settings['authnet_sim']['button_url'] = $_POST['button_url'];

		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('Authorize.net SIM Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Authorize.net SIM Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['authnet_sim'])) {
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/btn_cc_vmad.gif")) {
			$button_url = EVENT_ESPRESSO_GATEWAY_URL . "/authnet/btn_cc_vmad.gif";
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/authnet/btn_cc_vmad.gif";
		}
		$payment_settings['authnet_sim']['active'] = false;
		$payment_settings['authnet_sim']['authnet_login_id'] = '';
		$payment_settings['authnet_sim']['authnet_transaction_key'] = '';
		$payment_settings['authnet_sim']['image_url'] = '';
		$payment_settings['authnet_sim']['use_sandbox'] = false;
		$payment_settings['authnet_sim']['test_transactions'] = false;
		$payment_settings['authnet_sim']['bypass_payment_page'] = '';
		$payment_settings['authnet_sim']['button_url'] = $button_url;
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}

	//Open or close the postbox div
	if (empty($payment_settings['authnet_sim']['active'])
					|| !empty($_REQUEST['deactivate_authnet_sim'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_authnet_sim'])) {
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
					if (!empty($_REQUEST['activate_authnet_sim'])) {
						$payment_settings['authnet_sim']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Authorize.net SIM Gateway Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate Authorize.net SIM Gateway', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_authnet_sim'])) {
						$payment_settings['authnet_sim']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Authorize.net SIM Gateway Payments De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate Authorize.net SIM Gateway', 'event_espresso');
						}
					}

					echo '<ul>';
					switch ($payment_settings['authnet_sim']['active']) {

						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_authnet_sim=true#authnet_sim\';" class="green_alert pointer"><strong>' . __('Activate Authorize.net SIM Gateway?', 'event_espresso') . '</strong></li>';
							break;

						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_authnet_sim=true\';" class="red_alert pointer"><strong>' . __('Deactivate Authorize.net SIM Gateway?', 'event_espresso') . '</strong></li>';
							event_espresso_display_authnet_settings();
							break;
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
	global $espresso_wp_user, $org_options;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')),
	);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_authnet_sim=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#authnet_sim">
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
							<?php echo apply_filters('filter_hook_espresso_help', 'transaction_key_info') ?>
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
							<?php echo apply_filters('filter_hook_espresso_help', 'authnet_button_url_info') ?>
						</label></th>
					<td><input class="regular-text" type="text" name="button_url" id="sim_button_url" value="<?php echo $payment_settings['authnet_sim']['button_url']; ?>" />
						<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <br />
						<?php echo '<img src="' . $payment_settings['authnet_sim']['button_url'] . '" />'; ?>
						<span class="description">
							<?php _e('URL to the payment button.', 'event_espresso'); ?>
						</span></td>
				</tr>
				<tr>
					<th><label for="sim_image_url">
							<?php _e('Image URL: ', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'authnet_image_url_info') ?>
						</label></th>
					<td><input class="regular-text" type="text" name="image_url" id="sim_image_url" value="<?php echo $payment_settings['authnet_sim']['image_url']; ?>" />
						<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=image_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a><br />
						<span class="description">
							<?php
							_e('Used for your business/personal logo on the Authorize.net SIM payment page.', 'event_espresso');
							if ($payment_settings['eway']['image_url'] != '')
								echo '<br /><img src="' . $payment_settings['eway']['image_url'] . '" />';
							?>
						</span></td>
				</tr>
				<tr>
					<th><label>
							<?php _e('Relay Response URL: ', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'relay_response') ?>
						</label></th>
					<td><span class="display-path" style="background-color: rgb(255, 251, 204); border:#999 solid 1px; padding:2px;"><?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?></span><br />
						<span class="description">
							<?php _e('URL to the transaction page.', 'event_espresso'); ?>
						</span></td>
				</tr>
				<tr>
					<th><label for="use_sandbox">
							<?php _e('Is this an account on the Authorize.net development server? ', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'authnet_sandbox'); ?>
						</label></th>
					<td><?php echo select_input('use_sandbox', $values, $payment_settings['authnet_sim']['use_sandbox']); ?></td>
				</tr>
				<tr>
					<th><label for="test_transactions">
							<?php _e('Do you want to submit a test transaction? ', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'authnet_test_transactions') ?>
						</label></th>
					<td><?php echo select_input('test_transactions', $values, $payment_settings['authnet_sim']['test_transactions']); ?></td>
				</tr>
				<tr>
					<th><label for="bypass_payment_page">
							<?php _e('By-pass the payment confirmation page? ', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'bypass_confirmation') ?>
						</label></th>
					<td><?php echo select_input('bypass_payment_page', $values, $payment_settings['authnet_sim']['bypass_payment_page']); ?></td>
				</tr>
			</tbody>
		</table>
		<?php /* ?><!-- TABLE TEMPLATE -->
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
		  </table><?php */ ?>
		<p>
			<input type="hidden" name="update_authnet" value="update_authnet">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Authorize.net SIM Settings', 'event_espresso') ?>" id="save_authnet_settings" />
		</p>
		<?php wp_nonce_field('espresso_form_check', 'add_authnetsim_settings'); ?>
	</form>
	<?php
	include_once('authnet_help.php');
}

