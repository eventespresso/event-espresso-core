<?php

function event_espresso_quickpay_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user, $org_options;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	if (isset($_POST['update_quickpay']) && check_admin_referer('espresso_form_check', 'add_quickpay_settings')) {
		$payment_settings['quickpay']['quickpay_merchantid'] = $_POST['quickpay_merchantid'];
		$payment_settings['quickpay']['quickpay_md5secret'] = $_POST['quickpay_md5secret'];
		$payment_settings['quickpay']['quickpay_language'] = $_POST['quickpay_language'];
		$payment_settings['quickpay']['quickpay_autocapture'] = $_POST['quickpay_autocapture'];
		$payment_settings['quickpay']['quickpay_currency'] = $_POST['quickpay_currency'];
		$payment_settings['quickpay']['use_sandbox'] = (empty($_POST['use_sandbox'])) ? '0' : $_POST['use_sandbox'];
		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('Quickpay Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Quickpay Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['quickpay'])) {
		$payment_settings['quickpay']['active'] = false;
		$payment_settings['quickpay']['quickpay_merchantid'] = '';
		$payment_settings['quickpay']['quickpay_md5secret'] = '';
		$payment_settings['quickpay']['quickpay_language'] = 'en';
		$payment_settings['quickpay']['quickpay_autocapture'] = '1';
		$payment_settings['quickpay']['quickpay_currency'] = 'USD';
		$payment_settings['quickpay']['use_sandbox'] = '0';
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}
	//Open or close the postbox div
	if (empty($payment_settings['quickpay']['active'])
					|| !empty($_REQUEST['deactivate_quickpay'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_quickpay'])) {
		$postbox_style = '';
	}
	?>
	<a name="quickpay" id="quickpay"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('Quickpay Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_quickpay'])) {
						$payment_settings['quickpay']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Quickpay Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate Quickpay', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_quickpay'])) {
						$payment_settings['quickpay']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Quickpay De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate Quickpay', 'event_espresso');
						}
					}
					echo '<ul>';
					switch ($payment_settings['quickpay']['active']) {
						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_quickpay=true#quickpay\';" class="green_alert pointer"><strong>' . __('Activate quickpay IPN?', 'event_espresso') . '</strong></li>';
							break;
						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_quickpay=true\';" class="red_alert pointer"><strong>' . __('Deactivate quickpay IPN?', 'event_espresso') . '</strong></li>';
							event_espresso_display_quickpay_settings();
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

//quickpay Settings Form
function event_espresso_display_quickpay_settings() {
	global $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_quickpay=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#quickpay">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top"><ul>
						<li>
							<label for="quickpay_merchantid">
								<?php _e('quickpay I.D.', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="quickpay_merchantid" size="35" value="<?php echo $payment_settings['quickpay']['quickpay_merchantid']; ?>">
						</li>
						<li>
							<label for="quickpay_md5secret">
								<?php _e('quickpay md5 secret:', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="quickpay_md5secret" size="35" value="<?php echo $payment_settings['quickpay']['quickpay_md5secret']; ?>">
						</li>
						<li>
							<label for="quickpay_language">Payment Window Language</label>
							<select name='quickpay_language'>
								<option value="<?php echo $payment_settings['quickpay']['quickpay_language']; ?>" selected='selected'" ><?php echo $payment_settings['quickpay']['quickpay_language']; ?>
							<option value='da'>da - Danish</option>
							<option value='de'>de - German</option>
							<option value='en'>en - English</option>
							<option value='fr'>fr - French</option>
							<option value='it'>it - Italian</option>
							<option value='no'>no - Norwegian</option>
							<option value='nl'>nl - Dutch</option>
							<option value='pl'>pl - Polish</option>
							<option value='se'>se - Swedish</option>
						</select>
						<p><small>Choose which language the transaction window will use.</small></p>
					</li>
					<li>
						<label for="quickpay_autocapture">Automatic capture</label>
						<?php if ($payment_settings['quickpay']['quickpay_autocapture'] == '0') { ?>
							<input name="quickpay_autocapture" value="0" checked="checked" type="RADIO">Off<br>
						<?php } else { ?>
							<input name="quickpay_autocapture" value="0" type="RADIO">Off<br>
						<?php }
						if ($payment_settings['quickpay']['quickpay_autocapture'] == '1') { ?>
							<input name="quickpay_autocapture" value="1" checked="checked" type="RADIO">On<br>
						<?php } else { ?>
							<input name="quickpay_autocapture" value="1" type="RADIO">On<br>
						<?php } ?>
						<p><small>Automatic Capture means you will automatically deduct the amount from the customer.</small></p>
					</li>
					<li>
						<label for="quickpay_currency">Currency</label>
						<input name="quickpay_currency" value="EUR" <?php if ($payment_settings['quickpay']['quickpay_currency'] == 'EUR') { ?>checked="checked"<?php } ?> type="RADIO">EUR<br>
						<input name="quickpay_currency" value="DKK" <?php if ($payment_settings['quickpay']['quickpay_currency'] == 'DKK') { ?>checked="checked"<?php } ?> type="RADIO">DKK<br>
						<input name="quickpay_currency" value="USD" <?php if ($payment_settings['quickpay']['quickpay_currency'] == 'USD') { ?>checked="checked"<?php } ?> type="RADIO">USD<br>
					</li>
				</ul></td>
			<td>
		<li>
			<label for="use_sandbox">
				<?php _e('Use the debugging feature and the sandbox', 'event_espresso'); ?>
			</label>
			<input name="use_sandbox" type="checkbox" value="1" <?php echo $payment_settings['quickpay']['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
		</li>
		</td>
		</tr>
	</table>
	<p>
		<input type="hidden" name="update_quickpay" value="update_quickpay">
		<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update quickpay Settings', 'event_espresso') ?>" id="save_quickpay_settings" />
	</p>
	<?php wp_nonce_field('espresso_form_check', 'add_quickpay_settings'); ?>
	</form>
	<?php
}
