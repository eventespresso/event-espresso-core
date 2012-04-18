<?php

function event_espresso_aim_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user, $active_gateways;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);
	
	//Update settings
	if (isset($_POST['update_authnet_aim']) && check_admin_referer('espresso_form_check', 'add_authnet_aim_settings')) {
		$payment_settings['aim']['authnet_aim_login_id'] = $_POST['authnet_aim_login_id'];
		$payment_settings['aim']['authnet_aim_transaction_key'] = $_POST['authnet_aim_transaction_key'];
		$payment_settings['aim']['use_sandbox'] = $_POST['use_sandbox'];
		$payment_settings['aim']['test_transactions'] = $_POST['test_transactions'];

		if (update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings)) {
			$notices['updates'][] = __('Authorize.net AIM Payment Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Authorize.net AIM Payment Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['aim'])) {
		$payment_settings['aim']['authnet_aim_login_id'] = '';
		$payment_settings['aim']['authnet_aim_transaction_key'] = '';
		$payment_settings['aim']['use_sandbox'] = false;
		$payment_settings['aim']['test_transactions'] = false;
		update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings);
	}

	//Open or close the postbox div
	if (empty($_REQUEST['deactivate_authnet_aim'])
					&& (!empty($_REQUEST['activate_authnet_aim'])
					|| array_key_exists('aim', $active_gateways))) {
		$postbox_style = '';
	} else {
		$postbox_style = 'closed';
	}
	?>

	<a name="authnet_aim" id="authnet_aim"></a>
	<div class="padding">
		<!--New -->
		<?php
		if (!empty($_REQUEST['activate_authnet_aim'])) {
			$active_gateways['aim'] = dirname(__FILE__);
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
				$notices['updates'][] = __('Authorize.net AIM Gateway Activated', 'event_espresso');
			} else {
				$notices['errors'][] = __('Unable to Activate Authorize.net AIM Gateway', 'event_espresso');
			}
		}

		if (!empty($_REQUEST['deactivate_authnet_aim'])) {
			unset($active_gateways['aim']);
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
				$notices['updates'][] = __('Authorize.net AIM Gateway Payments De-activated', 'event_espresso');
			} else {
				$notices['errors'][] = __('Unable to De-activate Authorize.net AIM Gateway', 'event_espresso');
			}
		}

		echo '<ul>';

		if (!array_key_exists('aim', $active_gateways)) {
			echo '<li id="activate_aim" style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_authnet_aim=true#authnet_aim\';" class="green_alert pointer"><strong>' . __('Activate Authorize.net AIM Gateway?', 'event_espresso') . '</strong></li>';
		} else {
			echo '<li id="deactivate_aim" style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_authnet_aim=true\';" class="red_alert pointer"><strong>' . __('Deactivate Authorize.net AIM Gateway?', 'event_espresso') . '</strong></li>';
			event_espresso_display_authnet_aim_settings($payment_settings);
		}

		echo '</ul>';
		?>
	</div> <!-- Class=padding -->
	<?php
}

//Authorize.net Settings Form
function event_espresso_display_authnet_aim_settings($payment_settings) {
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')),
	);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_authnet_aim=true'));
	?>
	<form method="post" action="<?php echo $uri ?>#authnet_aim">
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="authnet_aim_login_id">
							<?php _e('Authorize.net AIM Login ID', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="authnet_aim_login_id" id="authnet_aim_login_id" size="35" value="<?php echo $payment_settings['aim']['authnet_aim_login_id']; ?>">
						<br />
						<span class="description">
							<?php _e('Please enter your Authorize.net Login ID', 'event_espresso'); ?>
						</span></td>
				</tr>
				<tr>
					<th><label for="authnet_aim_transaction_key">
							<?php _e('Authorize.net AIM Transaction Key', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="authnet_aim_transaction_key" id="authnet_aim_transaction_key" size="35" value="<?php echo $payment_settings['aim']['authnet_aim_transaction_key']; ?>">
						<br />
						<span class="description">
							<?php _e('Please enter your Authorize.net Transaction Key.', 'event_espresso'); ?>
						</span></td>
				</tr>
				<tr>
					<th><label for="use_sandbox">
							<?php _e('Is this an account on the Authorize.net development server? ', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'authnet_aim_sandbox'); ?>
						</label></th>
					<td><?php echo select_input('use_sandbox', $values, $payment_settings['aim']['use_sandbox']); ?></td>
				</tr>
				<tr>
					<th><label for="test_transactions">
							<?php _e('Do you want to submit a test transaction? ', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'authnet_test_transactions') ?>
						</label></th>
					<td><?php echo select_input('test_transactions', $values, $payment_settings['aim']['test_transactions']); ?></td>
				</tr>
			</tbody>
		</table>
		<p>
			<input type="hidden" name="update_authnet_aim" value="update_authnet_aim">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Authorize.net AIM Settings', 'event_espresso') ?>" id="save_authnet_aim_settings" />
		</p>
		<p><strong style="color:#F00">
				<?php _e('WARNING!', 'event_espresso'); ?>
			</strong><?php _e('You are responsible for your own security and PCI compliance.', 'event_espresso'); ?></p>
		<?php wp_nonce_field('espresso_form_check', 'add_authnet_aim_settings'); ?>
	</form>
	<div id="authnet_aim_sandbox" style="display:none">
		<h2>
			<?php _e('Authorize.net AIM Test Mode', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('Test Mode allows you to submit test transactions to the payment gateway. Transactions that are submitted while Test Mode is ON are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?>
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

add_meta_box('espresso_aim_gateway_settings', __('Authorize.net AIM Settings', 'event_espresso'), 'event_espresso_aim_payment_settings', 'event-espresso_page_payment_gateways');