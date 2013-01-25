<?php

function event_espresso_realauth_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user;
	if ($espresso_premium != true) {
		return;
	}

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	//Update settings
	if (isset($_POST['update_realauth'])
					&& check_admin_referer('espresso_form_check', 'add_realauth_settings')) {
		$payment_settings['realauth']['merchant_id'] = $_POST['merchant_id'];
		$payment_settings['realauth']['shared_secret'] = $_POST['shared_secret'];
		$payment_settings['realauth']['currency_format'] = $_POST['currency_format'];
		$payment_settings['realauth']['auto_settle'] = $_POST['auto_settle'];
		$payment_settings['realauth']['bypass_payment_page'] = $_POST['bypass_payment_page'];

		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('realauth Payment Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('realauth Payment Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['realauth'])) {
		$payment_settings['realauth']['active'] = false;
		$payment_settings['realauth']['merchant_id'] = '';
		$payment_settings['realauth']['shared_secret'] = '';
		$payment_settings['realauth']['currency_format'] = 'USD';
		$payment_settings['realauth']['auto_settle'] = true;
		$payment_settings['realauth']['bypass_payment_page'] = false;
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}

	//Open or close the postbox div
	if (empty($payment_settings['realauth']['active'])
					|| !empty($_REQUEST['deactivate_realauth'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_realauth'])) {
		$postbox_style = '';
	}
	?>

	<a name="realauth" id="realauth"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br />
			</div>
			<h3 class="hndle">
				<?php _e('realauth Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_realauth'])) {
						$payment_settings['realauth']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Realauth Payments Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate Realauth Payments', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_realauth'])) {
						$payment_settings['realauth']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Realauth Payments De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate Realauth Payments', 'event_espresso');
						}
					}

					echo '<ul>';
					switch ($payment_settings['realauth']['active']) {

						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_realauth=true#realauth\';" class="green_alert pointer"><strong>' . __('Activate realauth Payments?', 'event_espresso') . '</strong></li>';
							break;

						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_realauth=true\';" class="red_alert pointer"><strong>' . __('Deactivate realauth Payments?', 'event_espresso') . '</strong></li>';
							event_espresso_display_realauth_settings();
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

//realauth Settings Form
function event_espresso_display_realauth_settings() {
	global $org_options, $espresso_wp_user;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')),
	);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_realauth=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#realauth">
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="merchant_id">
							<?php _e('Merchant ID', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="merchant_id" id="merchant_id" size="35" value="<?php echo $payment_settings['realauth']['merchant_id']; ?>"></td>
				</tr>
				<tr>
					<th><label for="shared_secret">
							<?php _e('Shared Secret', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="shared_secret" id="shared_secret" size="35" value="<?php echo $payment_settings['realauth']['shared_secret']; ?>"></td>
				</tr>
				<tr>
					<th><label for="currency_format">
							<?php _e('Country Currency', 'event_espresso');
							do_action('action_hook_espresso_help', 'realauth_currency_info'); ?>
						</label></th>
					<td><select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
							<option value="<?php echo $payment_settings['realauth']['currency_format']; ?>"><?php echo $payment_settings['realauth']['currency_format']; ?></option>
							<option value="USD">
								<?php _e('U.S. Dollars ($)', 'event_espresso'); ?>
							</option>
							<option value="AUD">
								<?php _e('Australian Dollars (A $)', 'event_espresso'); ?>
							</option>
							<option value="GBP">
								<?php _e('Pounds Sterling (&pound;)', 'event_espresso'); ?>
							</option>
							<option value="CAD">
								<?php _e('Canadian Dollars (C $)', 'event_espresso'); ?>
							</option>
							<option value="CZK">
								<?php _e('Czech Koruna', 'event_espresso'); ?>
							</option>
							<option value="DKK">
								<?php _e('Danish Krone', 'event_espresso'); ?>
							</option>
							<option value="EUR">
								<?php _e('Euros (&#8364;)', 'event_espresso'); ?>
							</option>
							<option value="HKD">
								<?php _e('Hong Kong Dollar ($)', 'event_espresso'); ?>
							</option>
							<option value="HUF">
								<?php _e('Hungarian Forint', 'event_espresso'); ?>
							</option>
							<option value="ILS">
								<?php _e('Israeli Shekel', 'event_espresso'); ?>
							</option>
							<option value="JPY">
								<?php _e('Yen (&yen;)', 'event_espresso'); ?>
							</option>
							<option value="MXN">
								<?php _e('Mexican Peso', 'event_espresso'); ?>
							</option>
							<option value="NZD">
								<?php _e('New Zealand Dollar ($)', 'event_espresso'); ?>
							</option>
							<option value="NOK">
								<?php _e('Norwegian Krone', 'event_espresso'); ?>
							</option>
							<option value="PLN">
								<?php _e('Polish Zloty', 'event_espresso'); ?>
							</option>
							<option value="SGD">
								<?php _e('Singapore Dollar ($)', 'event_espresso'); ?>
							</option>
							<option value="SEK">
								<?php _e('Swedish Krona', 'event_espresso'); ?>
							</option>
							<option value="BRL">
								<?php _e('Brazilian Real (only for Brazilian users)', 'event_espresso'); ?>
							</option>
							<option value="MYR">
								<?php _e('Malaysian Ringgits (only for Malaysian users)', 'event_espresso'); ?>
							</option>
							<option value="PHP">
								<?php _e('Philippine Pesos', 'event_espresso'); ?>
							</option>
							<option value="TWD">
								<?php _e('Taiwan New Dollars', 'event_espresso'); ?>
							</option>
							<option value="THB">
								<?php _e('Thai Baht', 'event_espresso'); ?>
							</option>
						</select></td>
				</tr>
				<tr>
					<th><label for="bypass_payment_page">
							<?php _e('Bypass Payment Overview Page?', 'event_espresso'); ?>
							<?php do_action('action_hook_espresso_help', 'bypass_confirmation'); ?>
						</label></th>
					<td><?php echo EE_Form_Fields::select_input('bypass_payment_page', $values, $payment_settings['realauth']['bypass_payment_page']); ?></td>
				</tr>
				<tr>
					<th><label for="auto_settle">
							<?php _e('Auto settle transactions', 'event_espresso'); ?>
							<?php do_action('action_hook_espresso_help', 'auto_settle_info'); ?>
						</label></th>
					<td><?php echo EE_Form_Fields::select_input('auto_settle', $values, $payment_settings['realauth']['auto_settle']); ?></td>
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
			<input type="hidden" name="update_realauth" value="update_realauth">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update realauth Settings', 'event_espresso') ?>" id="save_realauth_settings" />
		</p>
		<?php wp_nonce_field('espresso_form_check', 'add_realauth_settings'); ?>
	</form>
	<div id="auto_settle_info" style="display:none">
		<h2>
			<?php _e('Realauth auto settle', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('Used to signify whether or not you wish the transaction to be captured in the next batch or not. If set to “Y” and assuming the transaction is authorised then it will automatically be settled in the next batch. If set to “N” then the merchant must use the realcontrol application to manually settle the transaction. This option can be used if a merchant wishes to delay the payment until after the goods have been shipped. Transactions can be settled for up to 115% of the original amount.', 'event_espresso'); ?>
		</p>
	</div>
	<div id="realauth_currency_info" style="display:none">
		<h2>
			<?php _e('Realauth Currency', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('Realauth uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is US Dollars (USD). If you want to require or accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that Realauth (currently) supports.', 'event_espresso'); ?>
		</p>
	</div>
	<?php
}
