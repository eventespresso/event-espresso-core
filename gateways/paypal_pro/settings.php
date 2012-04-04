<?php

function event_espresso_paypal_pro_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	if (isset($_POST['update_paypal_pro'])
					&& check_admin_referer('espresso_form_check', 'add_paypalPro_settings')) {
		$payment_settings['paypal_pro']['email'] = $_POST['email'];
		$payment_settings['paypal_pro']['username'] = $_POST['username'];
		$payment_settings['paypal_pro']['password'] = $_POST['password'];
		$payment_settings['paypal_pro']['currency_format'] = $_POST['currency_format'];
		$payment_settings['paypal_pro']['signature'] = $_POST['signature'];
		$payment_settings['paypal_pro']['credit_cards'] = implode(",", empty($_POST['credit_cards']) ? array() : $_POST['credit_cards']);
		$payment_settings['paypal_pro']['use_sandbox'] = empty($_POST['use_sandbox']) ? '' : $_POST['use_sandbox'];

		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('PayPal Pro Payment Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('PayPal Pro Payment Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['paypal_pro'])) {
		$payment_settings['paypal_pro']['active'] = false;
		$payment_settings['paypal_pro']['email'] = '';
		$payment_settings['paypal_pro']['username'] = '';
		$payment_settings['paypal_pro']['password'] = '';
		$payment_settings['paypal_pro']['currency_format'] = 'USD';
		$payment_settings['paypal_pro']['signature'] = '';
		$payment_settings['paypal_pro']['credit_cards'] = '';
		$payment_settings['paypal_pro']['use_sandbox'] = false;
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}

	//Open or close the postbox div
	if (empty($payment_settings['paypal_pro']['active'])
					|| !empty($_REQUEST['deactivate_paypal_pro'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_paypal_pro'])) {
		$postbox_style = '';
	}
	?>

	<a name="paypal_pro" id="paypal_pro"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br />
			</div>
			<h3 class="hndle">
				<?php _e('PayPal Pro Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<!--New -->
					<?php
					if (!empty($_REQUEST['activate_paypal_pro'])) {
						$payment_settings['paypal_pro']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('PayPal Pro Gateway Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate PayPal Pro Gateway', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_paypal_pro'])) {
						$payment_settings['paypal_pro']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('PayPal Pro Gateway Payments De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate PayPal Pro Gateway', 'event_espresso');
						}
					}

					echo '<ul>';

					switch ($payment_settings['paypal_pro']['active']) {

						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_paypal_pro=true#paypal_pro\';" class="green_alert pointer"><strong>' . __('Activate PayPal Pro Gateway?', 'event_espresso') . '</strong></li>';
							break;

						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_paypal_pro=true\';" class="red_alert pointer"><strong>' . __('Deactivate PayPal Pro Gateway?', 'event_espresso') . '</strong></li>';
							event_espresso_display_paypal_pro_settings();
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
function event_espresso_display_paypal_pro_settings() {
	global $org_options, $espresso_wp_user;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')),
	);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_paypal_pro=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#paypal_pro">
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="paypal_pro_email">
							<?php _e('Paypal PRO Email', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="email" id="paypal_pro_email" size="35" value="<?php echo $payment_settings['paypal_pro']['email']; ?>"></td>
				</tr>
				<tr>
					<th><label for="paypal_pro_username">
							<?php _e('Paypal API Username', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="username" id="paypal_pro_username" size="35" value="<?php echo $payment_settings['paypal_pro']['username']; ?>"></td>
				</tr>
				<tr>
					<th><label for="paypal_pro_password">
							<?php _e('Paypal API Password', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="password" id="paypal_pro_password" size="35" value="<?php echo $payment_settings['paypal_pro']['password']; ?>"></td>
				</tr>
				<tr>
					<th><label for="paypal_pro_signature">
							<?php _e('Paypal API Signature', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="signature" id="paypal_pro_signature" size="35" value="<?php echo $payment_settings['paypal_pro']['signature']; ?>"></td>
				</tr>
				<tr>
					<th><label for="paypal_pro_currency_format">
							<?php _e('Country Currency', 'event_espresso'); ?>
							<?php echo apply_filters('espresso_help', 'paypal_pro_currency_info') ?>
						</label></th>
					<td><select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
							<option value="<?php echo $payment_settings['paypal_pro']['currency_format']; ?>"><?php echo $payment_settings['paypal_pro']['currency_format']; ?></option>
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
							<option value="CHF">
								<?php _e('Swiss Franc', 'event_espresso'); ?>
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
					<th><label>
							<?php _e('Accepted Credit Cards', 'event_espresso'); ?>
						</label></th>
					<td><?php
						$checked = 'checked="checked"';
						$credit_cards = explode(",", $payment_settings['paypal_pro']['credit_cards']);
							?>
						<input type="checkbox" name="credit_cards[]" size="35" value="Visa" <?php echo in_array("Visa", $credit_cards) ? $checked : ''; ?> />
						Visa
						<input type="checkbox" name="credit_cards[]" size="35" value="MasterCard" <?php echo in_array("MasterCard", $credit_cards) ? $checked : ''; ?> />
						Master Card
						<input type="checkbox" name="credit_cards[]" size="35" value="Amex" <?php echo in_array("Amex", $credit_cards) ? $checked : ''; ?> />
						Amex
						<input type="checkbox" name="credit_cards[]" size="35" value="Discover" <?php echo in_array("Discover", $credit_cards) ? $checked : ''; ?> />
						Discover</td>
				</tr>
				<tr>
					<th><label for="paypal_pro_use_sandbox">
							<?php _e('Use the debugging feature and the PayPal Sandbox', 'event_espresso'); ?>
							<?php apply_filters('espresso_help', 'paypal_pro_sandbox_info'); ?>
						</label></th>
					<td><?php echo select_input('use_sandbox', $values, $payment_settings['paypal_pro']['use_sandbox']); ?>
						<br />
						<span class="description">
							<?php _e('Make sure you enter the sandbox credentials above.', 'event_espresso'); ?>
						</span></td>
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
			<input type="hidden" name="update_paypal_pro" value="update_paypal_pro">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update PayPal PRO Settings', 'event_espresso') ?>" id="save_paypal_settings" />
		</p>
		<?php wp_nonce_field('espresso_form_check', 'add_paypalPro_settings'); ?>
	</form>
	<div id="paypal_pro_sandbox_info" style="display:none">
		<h2>
			<?php _e('PayPal Sandbox', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('In addition to using the PayPal Sandbox fetaure. The debugging feature will also output the form varibales to the payment page, send an email to the admin that contains the all PayPal variables.', 'event_espresso'); ?>
		</p>
		<hr />
		<p>
			<?php _e('The PayPal Sandbox is a testing environment that is a duplicate of the live PayPal site, except that no real money changes hands. The Sandbox allows you to test your entire integration before submitting transactions to the live PayPal environment. Create and manage test accounts, and view emails and API credentials for those test accounts.', 'event_espresso'); ?>
		</p>
	</div>
	<div id="image_url_info" style="display:none">
		<h2>
			<?php _e('PayPal Image URL (logo for payment page)', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('The URL of the 150x50-pixel image displayed as your logo in the upper left corner of the PayPal checkout pages.', 'event_espresso'); ?>
		</p>
		<p>
			<?php _e('Default - Your business name, if you have a Business account, or your email address, if you have Premier or Personal account.', 'event_espresso'); ?>
		</p>
	</div>
	<div id="paypal_pro_currency_info" style="display:none">
		<h2>
			<?php _e('PayPal Currency', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('PayPal uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is US Dollars (USD). If you want to require or accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that PayPal (currently) supports.', 'event_espresso'); ?>
		</p>
	</div>
	<div id="surcharge" style="display:none">
		<h2>
			<?php _e('Payment Surcharge', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('Please enter a decimal number indicating a percent surcharge. For example, if you enter 3.00, 3% will be added to the final price of the event during the checkout. If the event price is initially $100, the price with the surcharge will be $103.<br /> This surcharge will apply to all new events.  However, you will have the ability to change this value during the event creation.', 'event_espresso'); ?>
		</p>
	</div>
	<div id="no_shipping" style="display:none">
		<h2>
			<?php _e('Shipping Address', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('By default, PayPal will display shipping address information on the PayPal payment screen. If you plan on shipping items to a registrant (shirts, invoices, etc) then use this option. Otherwise it should not be used, as it will require a shipping address when someone registers for an event.', 'event_espresso'); ?>
		</p>
	</div>
	<?php
}
