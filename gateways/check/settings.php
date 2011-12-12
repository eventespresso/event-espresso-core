<?php

function event_espresso_check_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user, $org_options;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	if (isset($_POST['update_check_payment_settings'])
					&& check_admin_referer('espresso_form_check', 'add_money_check_settings')) {
		$allowable_tags = '<br /><br><a>';
		$payment_settings['check_payment']['check_title'] = strip_tags($_POST['check_title'], $allowable_tags);
		$payment_settings['check_payment']['check_instructions'] = strip_tags($_POST['check_instructions'], $allowable_tags);
		$payment_settings['check_payment']['payable_to'] = strip_tags($_POST['payable_to'], $allowable_tags);
		$payment_settings['check_payment']['payment_address'] = strip_tags($_POST['payment_address'], $allowable_tags);
		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('Check Payment Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Check Payment Settings were not saved! ', 'event_espresso');
		}
	}

	//default values
	if (empty($payment_settings['check_payment'])) {
		$default_address = $org_options['organization_street1'] != '' ? $org_options['organization_street1'] . '<br />' : '';
		$default_address .= $org_options['organization_street2'] != '' ? $org_options['organization_street2'] . '<br />' : '';
		$default_address .= $org_options['organization_city'] != '' ? $org_options['organization_city'] : '';
		$default_address .= ($org_options['organization_city'] != '' && $org_options['organization_state'] != '') ? ', ' : '<br />';
		$default_address .= $org_options['organization_state'] != '' ? $org_options['organization_state'] . '<br />' : '';
		$default_address .= $org_options['organization_country'] != '' ? getCountryName($org_options['organization_country']) . '<br />' : '';
		$default_address .= $org_options['organization_zip'] != '' ? $org_options['organization_zip'] : '';
		$payment_settings['check_payment']['active'] = false;
		$payment_settings['check_payment']['check_title'] = __('Check/Money Order Payments', 'event_espresso');
		$payment_settings['check_payment']['check_instructions'] = __('Please send Check/Money Order to the address below. Payment must be received within 48 hours of event date.', 'event_espresso');
		$payment_settings['check_payment']['payable_to'] = $org_options['organization'];
		$payment_settings['check_payment']['payment_address'] = $default_address;
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}
	//Open or close the postbox div
	if (empty($payment_settings['check_payment']['active'])
					|| !empty($_REQUEST['deactivate_check_payment'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_check_payment'])) {
		$postbox_style = '';
	}
	?>
	<a name="check" id="check"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('Check/Money Order Payment Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_check_payment'])) {
						$payment_settings['check_payment']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Check Payments Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate Check Payments', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_check_payment'])) {
						$payment_settings['check_payment']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Check Payments De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate Check Payments', 'event_espresso');
						}
					}
					echo '<ul>';
					switch ($payment_settings['check_payment']['active']) {
						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_check_payment=true#check\';" class="green_alert pointer"><strong>' . __('Activate Check/Money Order Payments?', 'event_espresso') . '</strong></li>';
							break;
						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_check_payment=true\';" class="red_alert pointer"><strong>' . __('Deactivate Check/Money Order Payments?', 'event_espresso') . '</strong></li>';
							event_espresso_display_check_payment_settings();
							break;
					}
					echo '</ul>';
					?>
				</div>
			</div>
		</div>
	</div>
<?php } ?>
<?php

//Check/Money Order Payments Settings Form
function event_espresso_display_check_payment_settings() {
	global $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_check_payment=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#check">
		<table width="90%" border="0">
			<tr>
				<td valign="top"><ul><li><label for="check_title"><?php _e('Title:', 'event_espresso'); ?></label><br />
							<input class="regular-text" type="text" name="check_title" size="30" value="<?php echo stripslashes_deep($payment_settings['check_payment']['check_title']); ?>" />
						</li>
						<li><label for="check_instructions"><?php _e('Payment Instructions:', 'event_espresso'); ?></label><br />
							<textarea name="check_instructions" cols="30" rows="5"><?php echo stripslashes_deep($payment_settings['check_payment']['check_instructions']); ?></textarea>
						</li></ul></td>
				<td valign="top"><ul><li><label for="payable_to"><?php _e('Payable To:', 'event_espresso'); ?></label><br />
							<input class="regular-text" type="text" name="payable_to" size="30" value="<?php echo stripslashes_deep($payment_settings['check_payment']['payable_to']); ?>" />
						</li>
						<li><label for="payment_address"><?php _e('Address to Send Payment:', 'event_espresso'); ?></label><br />
							<textarea name="payment_address" cols="30" rows="5"><?php echo $payment_settings['check_payment']['payment_address']; ?></textarea>
						</li></ul></td>
			</tr>
		</table>
		<input type="hidden" name="update_check_payment_settings" value="update_check_payment_settings">
		<p><input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Check/Money Order Payment Settings', 'event_espresso') ?>" id="save_check_payment_settings" />
			<?php wp_nonce_field('espresso_form_check', 'add_money_check_settings'); ?>
		</p>
	</form>
	<?php
}