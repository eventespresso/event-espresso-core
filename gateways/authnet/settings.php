<?php

function event_espresso_authnet_sim_payment_settings() {
	global $active_gateways, $espresso_premium, $notices, $espresso_wp_user;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);

	if (isset($_POST['update_authnet']) && check_admin_referer('espresso_form_check', 'add_authnetsim_settings')) {
		$payment_settings['authnet_sim']['authnet_login_id'] = $_POST['authnet_login_id'];
		$payment_settings['authnet_sim']['authnet_transaction_key'] = $_POST['authnet_transaction_key'];
		$payment_settings['authnet_sim']['image_url'] = $_POST['image_url'];
		$payment_settings['authnet_sim']['use_sandbox'] = $_POST['use_sandbox'];
		$payment_settings['authnet_sim']['test_transactions'] = $_POST['test_transactions'];
		$payment_settings['authnet_sim']['button_url'] = $_POST['button_url'];

		if (update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings)) {
			$notices['updates'][] = __('Authorize.net SIM Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Authorize.net SIM Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['authnet_sim'])) {
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/lib/btn_cc_vmad.gif")) {
			$button_url = EVENT_ESPRESSO_GATEWAY_URL . "/authnet/lib/btn_cc_vmad.gif";
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/authnet/lib/btn_cc_vmad.gif";
		}
		$payment_settings['authnet_sim']['authnet_login_id'] = '';
		$payment_settings['authnet_sim']['authnet_transaction_key'] = '';
		$payment_settings['authnet_sim']['image_url'] = '';
		$payment_settings['authnet_sim']['use_sandbox'] = false;
		$payment_settings['authnet_sim']['test_transactions'] = false;
		$payment_settings['authnet_sim']['button_url'] = $button_url;
		$payment_settings['authnet_sim']['type'] = 'off-site';
		$payment_settings['authnet_sim']['display_name'] = 'Authorize.net SIM';
		update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings);
	}

	//Open or close the postbox div
	if (empty($_REQUEST['deactivate_authnet_sim'])
					&& (!empty($_REQUEST['activate_authnet_sim'])
					|| array_key_exists('authnet_sim', $active_gateways))) {
		$postbox_style = '';
	} else {
		$postbox_style = 'closed';
	}
	?>

	<a name="authnet_sim" id="authnet_sim"></a>
	<div class="padding">
		<?php
		if (!empty($_REQUEST['activate_authnet_sim'])) {
			$active_gateways['authnet_sim'] = str_replace('\\', '/', dirname(__FILE__));
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
				$notices['updates'][] = __('Authorize.net SIM Gateway Activated', 'event_espresso');
			} else {
				$notices['errors'][] = __('Unable to Activate Authorize.net SIM Gateway', 'event_espresso');
			}
		}

		if (!empty($_REQUEST['deactivate_authnet_sim'])) {
			unset($active_gateways['authnet_sim']);
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {

				$notices['updates'][] = __('Authorize.net SIM Gateway Payments De-activated', 'event_espresso');
			} else {
				$notices['errors'][] = __('Unable to De-activate Authorize.net SIM Gateway', 'event_espresso');
			}
		}

		echo '<ul>';
		if (!array_key_exists('authnet_sim', $active_gateways)) {
			echo '<li id="activate_sim" style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_authnet_sim=true#authnet_sim\';" class="green_alert pointer"><strong>' . __('Activate Authorize.net SIM Gateway?', 'event_espresso') . '</strong></li>';
		} else {
			echo '<li id="deactivate_aim" style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_authnet_sim=true\';" class="red_alert pointer"><strong>' . __('Deactivate Authorize.net SIM Gateway?', 'event_espresso') . '</strong></li>';
			event_espresso_display_authnet_settings($payment_settings);
		}

		echo '</ul>';
		?>
	</div>
	<?php
}

//Authorize.net SIM Settings Form
function event_espresso_display_authnet_settings($payment_settings) {
	global $org_options;
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
							<?php _e('Authorize.net Login ID', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="authnet_login_id" id="authnet_login_id" size="35" value="<?php echo $payment_settings['authnet_sim']['authnet_login_id']; ?>">
						<br />
						<span class="description">
							<?php _e('Please enter your Authorize.net Login ID', 'event_espresso'); ?>
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
							if ($payment_settings['authnet_sim']['image_url'] != '')
								echo '<br /><img src="' . $payment_settings['authnet_sim']['image_url'] . '" />';
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
					<td>
						<label><?php _e('Current Button Image', 'event_espresso'); ?></label>
						<?php echo '<img src="' . $payment_settings['authnet_sim']['button_url'] . '" />'; ?>
					</td>
				</tr>
			</tbody>
		</table>
		<p>
			<input type="hidden" name="update_authnet" value="update_authnet">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Authorize.net SIM Settings', 'event_espresso') ?>" id="save_authnet_settings" />
		</p>
		<?php wp_nonce_field('espresso_form_check', 'add_authnetsim_settings'); ?>
	</form>
	<?php
	include_once('lib/authnet_help.php');
}

add_meta_box('espresso_sim_gateway_settings', __('Authorize.net SIM Settings', 'event_espresso'), 'event_espresso_authnet_sim_payment_settings', 'event-espresso_page_payment_gateways');
