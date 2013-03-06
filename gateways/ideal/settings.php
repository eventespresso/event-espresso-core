<?php

function event_espresso_ideal_payment_settings() {
	global $caffeinated, $notices, $espresso_wp_user;
	if ($caffeinated != true)
		return;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	if (isset($_POST['update_ideal']) && check_admin_referer('espresso_form_check', 'add_mollie_settings')) {
		$payment_settings['ideal']['ideal_mollie_partner_id'] = $_POST['ideal_mollie_partner_id'];
		$payment_settings['ideal']['ideal_mollie_use_sandbox'] = empty($_POST['ideal_mollie_use_sandbox']) ? '' : $_POST['ideal_mollie_use_sandbox'];

		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('Ideal Mollie Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Ideal Mollie Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['ideal'])) {
		$payment_settings['ideal']['active'] = false;
		$payment_settings['ideal']['ideal_mollie_partner_id'] = '';
		$payment_settings['ideal']['ideal_mollie_use_sandbox'] = '';
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}
	//Open or close the postbox div
	if (empty($payment_settings['ideal']['active'])
					|| !empty($_REQUEST['deactivate_ideal'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_ideal'])) {
		$postbox_style = '';
	}
	?>
	<a name="ideal" id="ideal"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('iDEAL (Mollie) Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_ideal'])) {
						$payment_settings['ideal']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Ideal Mollie Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate Ideal Mollie', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_ideal'])) {
						$payment_settings['ideal']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Ideal Mollie Payments De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate Ideal Mollie', 'event_espresso');
						}
					}
					echo '<ul>';
					switch ($payment_settings['ideal']['active']) {
						case false:
							echo '<li style="width:30%;" onclick="location.href=' . EE_PAYMENTS_ADMIN . '&activate_ideal=true#ideal\';" class="green_alert pointer"><strong>' . __('Activate iDEAL (Mollie)?', 'event_espresso') . '</strong></li>';
							break;
						case true:
							echo '<li style="width:30%;" onclick="location.href=' . EE_PAYMENTS_ADMIN . '&deactivate_ideal=true\';" class="red_alert pointer"><strong>' . __('Deactivate iDEAL (Mollie)?', 'event_espresso') . '</strong></li>';
							event_espresso_display_ideal_settings();
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

//PayPal Settings Form
function event_espresso_display_ideal_settings() {
	global $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_ideal=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#ideal">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top"><ul>
						<li>
							<label>
								<?php _e('iDEAL (Mollie) partner id', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="ideal_mollie_partner_id" size="35" value="<?php echo $payment_settings['ideal']['ideal_mollie_partner_id']; ?>">
							<br />
						</li>
						<li>
							<label for="ideal_mollie_use_sandbox">
								<?php _e('Use Mollie in test mode', 'event_espresso'); ?>?
							</label>
							<input name="ideal_mollie_use_sandbox" type="checkbox" value="1" <?php echo $payment_settings['ideal']['ideal_mollie_use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
							<br />
							<?php _e('(Make sure you enable test mode in your Mollie account).', 'event_espresso'); ?>
						</li>

					</ul></td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_ideal" value="update_ideal">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Settings', 'event_espresso') ?>" id="save_ideal_settings" />
		</p>
		<?php wp_nonce_field('espresso_form_check', 'add_mollie_settings'); ?>
	</form>

	<?php
}
