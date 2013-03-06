<?php

function event_espresso_nab_settings() {

	global $espresso_premium, $notices, $espresso_wp_user, $org_options;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	if (isset($_POST['update_nab'])) {
		$payment_settings['nab']['nab_merchant_id'] = $_POST['nab_merchant_id'];
		$payment_settings['nab']['nab_merchant_password'] = $_POST['nab_merchant_password'];
		$payment_settings['nab']['nab_use_sandbox'] = isset($_POST['nab_use_sandbox']) ? 1 : 0;
		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('NAB Transact Direct Post Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('NAB Transact Direct Post Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['nab'])) {
		$payment_settings['nab']['active'] = false;
		$payment_settings['nab']['nab_merchant_id'] = '';
		$payment_settings['nab']['nab_merchant_password'] = '';
		$payment_settings['nab']['nab_use_sandbox'] = 0;
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}
	//Open or close the postbox div
	if (empty($payment_settings['nab']['active'])
					|| !empty($_REQUEST['deactivate_nab'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_nab'])) {
		$postbox_style = '';
	}
	?>
	<a name="nab" id="nab"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br /></div>
			<h3>
				<?php _e('NAB Transact Direct Post Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_nab'])) {
						$payment_settings['nab']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('NAB Transact Direct Post Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate NAB Transact Direct Post', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_nab'])) {
						$payment_settings['nab']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('NAB Transact Direct Post De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate NAB Transact Direct Post', 'event_espresso');
						}
					}
					echo '<ul>';
					switch ($payment_settings['nab']['active']) {
						case false:
							echo '<li style="width:30%;" onclick="location.href=' . EE_PAYMENTS_ADMIN . '&activate_nab=true#nab\';" class="green_alert pointer"><strong>' . __('Activate NAB Transact Direct Post?', 'event_espresso') . '</strong></li>';
							break;
						case true:
							echo '<li style="width:30%;" onclick="location.href=' . EE_PAYMENTS_ADMIN . '&deactivate_nab=true\';" class="red_alert pointer"><strong>' . __('Deactivate NAB Transact Direct Post?', 'event_espresso') . '</strong></li>';
							event_espresso_display_nab_settings();
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

//nab Settings Form
function event_espresso_display_nab_settings() {
	global $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_nab=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#nab">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top"><ul>
						<li>
							<label for="nab_id">
								<?php _e('NAB Merchant ID', 'event_espresso'); ?>
							</label>
							<br />
							<input type="text" name="nab_merchant_id" size="35" value="<?php echo $payment_settings['nab']['nab_merchant_id']; ?>">
							<br />
						</li>
						<li>
							<label for="nab_id">
								<?php _e('NAB Merchant Password', 'event_espresso'); ?>
							</label>
							<br />
							<input type="text" name="nab_merchant_password" size="35" value="<?php echo $payment_settings['nab']['nab_merchant_password']; ?>">
							<br />
						</li>
						<li>
							<label for="nab_use_sandbox">
								<?php _e('Use NAB Transact Direct Post in test mode', 'event_espresso'); ?>?
							</label>
							<input name="nab_use_sandbox" type="checkbox" value="Test Reference" <?php echo $payment_settings['nab']['nab_use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
							<br />
							<?php _e('(Make sure you enter the test credentials above.)', 'event_espresso'); ?>
						</li>

					</ul></td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_nab" value="update_nab">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update NAB Settings', 'event_espresso') ?>" id="save_nab_settings" />
		</p>
	</form>
	<?php
}