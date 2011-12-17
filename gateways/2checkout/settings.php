<?php

function event_espresso_2checkout_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user;
	if ($espresso_premium != true) {
		return;
	}

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	//Update settings
	if (isset($_POST['update_2checkout'])
					&& check_admin_referer('espresso_form_check', 'add_2checkout_settings')) {
		$payment_settings['2checkout']['2checkout_id'] = $_POST['2checkout_id'];
		$payment_settings['2checkout']['2checkout_username'] = $_POST['2checkout_username'];
		$payment_settings['2checkout']['currency_format'] = $_POST['currency_format'];
		$payment_settings['2checkout']['use_sandbox'] = $_POST['use_sandbox'];
		$payment_settings['2checkout']['bypass_payment_page'] = $_POST['bypass_payment_page'];
		$payment_settings['2checkout']['button_url'] = $_POST['button_url'];

		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('2checkout Payment Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('2checkout Payment Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['2checkout'])) {
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/2checkout/logo.png")) {
			$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/2checkout/logo.png";
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/2checkout/logo.png";
		}
		$payment_settings['2checkout']['active'] = false;
		$payment_settings['2checkout']['2checkout_id'] = '';
		$payment_settings['2checkout']['2checkout_username'] = '';
		$payment_settings['2checkout']['currency_format'] = 'USD';
		$payment_settings['2checkout']['use_sandbox'] = 'N';
		$payment_settings['2checkout']['bypass_payment_page'] = 'N';
		$payment_settings['2checkout']['button_url'] = $button_url;
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}

	//Open or close the postbox div
	if (empty($payment_settings['2checkout']['active'])
					|| !empty($_REQUEST['deactivate_2checkout'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_2checkout'])) {
		$postbox_style = '';
	}
	?>

	<a name="2checkout" id="2checkout"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br />
			</div>
			<h3 class="hndle">
				<?php _e('2checkout Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_2checkout'])) {
						$payment_settings['2checkout']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('2checkout Payments Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate 2checkout Payments', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_2checkout'])) {
						$payment_settings['2checkout']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('2checkout Payments De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate 2checkout Payments', 'event_espresso');
						}
					}

					echo '<ul>';
					switch ($payment_settings['2checkout']['active']) {

						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_2checkout=true#2checkout\';" class="green_alert pointer"><strong>' . __('Activate 2checkout Payments?', 'event_espresso') . '</strong></li>';
							break;

						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_2checkout=true\';" class="red_alert pointer"><strong>' . __('Deactivate 2checkout Payments?', 'event_espresso') . '</strong></li>';
							event_espresso_display_2checkout_settings();
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

//2checkout Settings Form
function event_espresso_display_2checkout_settings() {
	global $org_options, $espresso_wp_user;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	$values = array(
			array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
			array('id' => 'N', 'text' => __('No', 'event_espresso')),
	);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_2checkout=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#2checkout">
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="2checkout_id">
							<?php _e('2checkout I.D.', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="2checkout_id" id="2checkout_id" size="35" value="<?php echo $payment_settings['2checkout']['2checkout_id']; ?>">
						<br />
						<span class="description">
							<?php _e('(Typically 87654321)', 'event_espresso'); ?>
						</span></td>
				</tr>
				<tr>
					<th><label for="2checkout_username">
							<?php _e('2checkout Username', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="2checkout_username" id="2checkout_username" size="35" value="<?php echo $payment_settings['2checkout']['2checkout_username']; ?>">
						<br />
						<span class="description">
							<?php _e('(Typically TestAccount)', 'event_espresso'); ?>
						</span></td>
				</tr>
				<tr>
					<th><label for="2co_button_url">
							<?php _e('Button Image URL', 'event_espresso'); ?>
							<?php apply_filters('espresso_help', '2co_button_image'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="button_url" id="2co_button_url" size="34" value="<?php echo $payment_settings['2checkout']['button_url']; ?>" /></td>
				</tr>
				<tr>
					<th><label for="currency_format">
							<?php _e('Country Currency', 'event_espresso'); ?>
							<?php apply_filters('espresso_help', '2co_currency_info'); ?>
						</label></th>
					<td><select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
							<option value="<?php echo $payment_settings['2checkout']['currency_format']; ?>"><?php echo $payment_settings['2checkout']['currency_format']; ?></option>
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
							<option value="INR">
								<?php _e('Indian Rupee (Rs.)', 'event_espresso'); ?>
							</option>
						</select></td>
				</tr>
				<tr>
					<th><label for="bypass_payment_page">
							<?php _e('By-pass the payment confirmation page?', 'event_espresso'); ?>
							<?php apply_filters('espresso_help', 'bypass_confirmation'); ?>
						</label></th>
					<td><?php echo select_input('bypass_payment_page', $values, $payment_settings['2checkout']['bypass_payment_page']); ?></td>
				</tr>
				<tr>
					<th><label for="2co_use_sandbox">
							<?php _e('Use the debugging feature and the 2checkout Sandbox', 'event_espresso'); ?>
							<?php apply_filters('espresso_help', '2co_sandbox_info'); ?>
						</label></th>
					<td><?php echo select_input('use_sandbox', $values, $payment_settings['2checkout']['use_sandbox']); ?></td>
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
			<input type="hidden" name="update_2checkout" value="update_2checkout">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update 2checkout Settings', 'event_espresso') ?>" id="save_2checkout_settings" />
		</p>
		<?php wp_nonce_field('espresso_form_check', 'add_2checkout_settings'); ?>
	</form>
	<div id="2co_button_image" style="display:none">
		<h2>
			<?php _e('Button Image URL', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso'); ?>
		</p>
		<p>
			<?php _e('Current Button Image:', 'event_espresso'); ?>
		</p>
		<p><?php echo '<img src="' . $payment_settings['2checkout']['button_url'] . '" />'; ?></p>
	</div>
	<div id="2co_sandbox_info" style="display:none">
		<h2>
			<?php _e('2checkout Sandbox', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('In addition to using the 2checkout Sandbox fetaure. The debugging feature will also output the form varibales to the payment page, send an email to the admin that contains the all 2checkout variables.', 'event_espresso'); ?>
		</p>
		<hr />
		<p>
			<?php _e('The 2checkout Sandbox is a testing environment that is a duplicate of the live 2checkout site, except that no real money changes hands. The Sandbox allows you to test your entire integration before submitting transactions to the live 2checkout environment. Create and manage test accounts, and view emails and API credentials for those test accounts.', 'event_espresso'); ?>
		</p>
	</div>
	<div id="2co_currency_info" style="display:none">
		<h2>
			<?php _e('2checkout Currency', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('2checkout uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is US Dollars (USD). If you want to require or accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that 2checkout (currently) supports.', 'event_espresso'); ?>
		</p>
	</div>
	<?php
}
