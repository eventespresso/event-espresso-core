<?php

function event_espresso_paypal_payment_settings() {
	global $notices, $espresso_wp_user, $active_gateways;

	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);

	if (isset($_POST['update_paypal'])
					&& check_admin_referer('espresso_form_check', 'add_paypal_settings')) {

		$payment_settings['paypal']['paypal_id'] = $_POST['paypal_id'];
		$payment_settings['paypal']['image_url'] = $_POST['image_url'];
		$payment_settings['paypal']['currency_format'] = $_POST['currency_format'];
		$payment_settings['paypal']['surcharge'] = $_POST['surcharge'];
		$payment_settings['paypal']['use_sandbox'] = $_POST['use_sandbox'];
		$payment_settings['paypal']['bypass_payment_page'] = $_POST['bypass_payment_page'];
		$payment_settings['paypal']['no_shipping'] = $_POST['no_shipping'];
		$payment_settings['paypal']['button_url'] = $_POST['button_url'];

		if (update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings)) {
			$notices['updates'][] = __('PayPal Payment Settings Updated!', 'event_espresso') . ' ' . $espresso_wp_user;
		} else {
			$notices['errors'][] = __('PayPal Payment Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['paypal'])) {
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/lib/btn_stdCheckout2.gif")) {
			$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/lib/btn_stdCheckout2.gif";
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/paypal/lib/btn_stdCheckout2.gif";
		}
		$payment_settings['paypal']['paypal_id'] = '';
		$payment_settings['paypal']['image_url'] = '';
		$payment_settings['paypal']['currency_format'] = 'USD';
		$payment_settings['paypal']['use_sandbox'] = false;
		$payment_settings['paypal']['bypass_payment_page'] = false;
		$payment_settings['paypal']['no_shipping'] = '0';
		$payment_settings['paypal']['button_url'] = $button_url;
		update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings);
	}

	//Open or close the postbox div
	if (empty($_REQUEST['deactivate_paypal'])
					&& (!empty($_REQUEST['activate_paypal'])
					|| array_key_exists('paypal', $active_gateways))) {
		$postbox_style = '';
	} else {
		$postbox_style = 'closed';
	}
	?>

	<a name="paypal" id="paypal"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br />
			</div>
			<h3 class="hndle">
				<?php _e('PayPal Standard Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_paypal'])) {
						$active_gateways['aim'] = dirname(__FILE__);
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
							$notices['updates'][] = __('PayPal Payments Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate PayPal Payments', 'event_espresso');
						}
					}
					if (!empty($_REQUEST['deactivate_paypal'])) {
						unset($active_gateways['aim']);
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
							$notices['updates'][] = __('PayPal Payments De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate PayPal Payments', 'event_espresso');
						}
					}
					echo '<ul>';

					if (!array_key_exists('paypal', $active_gateways)) {
							echo '<li id="activate_paypal" style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_paypal=true#paypal\';" class="green_alert pointer"><strong>' . __('Activate PayPal Standard?', 'event_espresso') . '</strong></li>';
					} else {
						echo '<li id="deactivate_paypal" style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_paypal=true\';" class="red_alert pointer"><strong>' . __('Deactivate PayPal Standard?', 'event_espresso') . '</strong></li>';
							event_espresso_display_paypal_settings($payment_settings);
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
function event_espresso_display_paypal_settings($payment_settings) {
	global $org_options, $espresso_wp_user;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')),
	);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_paypal=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#paypal">
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="paypal_id">
							<?php _e('Paypal I.D.', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="paypal_id" size="35" id="paypal_id" value="<?php echo $payment_settings['paypal']['paypal_id']; ?>">
						<br />
						<span class="description">
							<?php _e('Typically payment@yourdomain.com', 'event_espresso'); ?>
						</span></td>
				</tr>
				<tr>
					<th><label for="currency_format">
							<?php _e('Country Currency', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'currency_info'); ?>
						</label></th>
					<td><select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
							<option value="<?php echo $payment_settings['paypal']['currency_format']; ?>"><?php echo $payment_settings['paypal']['currency_format']; ?></option>
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
					<th><label for="pp_button_url">
							<?php _e('Button Image URL', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'paypal_button_image'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="button_url" id="pp_button_url" size="34" value="<?php echo $payment_settings['paypal']['button_url']; ?>" /><br /><span class="description">
							<?php _e('URL to the payment button.', 'event_espresso'); ?>
						</span>
					</td>
				</tr>
				<tr>
					<th><label for="pp_image_url">
							<?php _e('Image URL', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'paypal_image_url_info'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="image_url" id="pp_image_url" size="35" value="<?php echo $payment_settings['paypal']['image_url']; ?>" />
						<br />
						<span class="description">
							<?php _e('Used for your business/personal logo on the PayPal page', 'event_espresso'); ?>
						</span></td>
				</tr>
				<tr>
					<th><label for="bypass_payment_page">
							<?php _e('By-pass the payment confirmation page', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'bypass_confirmation'); ?>
						</label></th>
					<td><?php echo select_input('bypass_payment_page', $values, $payment_settings['paypal']['bypass_payment_page']); ?></td>
				</tr>
				<tr>
					<th><label for="use_sandbox">
							<?php _e('Use the debugging feature and the PayPal Sandbox', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'sandbox_info'); ?>
						</label></th>
					<td><?php echo select_input('use_sandbox', $values, $payment_settings['paypal']['use_sandbox']); ?></td>
				</tr>
				<tr>
					<th><label for="no_shipping">
							<?php _e('Shipping address options?', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'no_shipping'); ?>
						</label></th>
					<td><?php
						$shipping_values = array(
								array('id' => '1', 'text' => __('Do not prompt for an address', 'event_espresso')),
								array('id' => '0', 'text' => __('Prompt for an address, but do not require one', 'event_espresso')),
								array('id' => '2', 'text' => __('Prompt for an address, and require one', 'event_espresso')));
						echo select_input('no_shipping', $shipping_values, $payment_settings['paypal']['no_shipping']);
							?></td>
				</tr>
			</tbody>
		</table>
		<p>
			<input type="hidden" name="update_paypal" value="update_paypal">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update PayPal Settings', 'event_espresso') ?>" id="save_paypal_settings" />
		</p>
		<p><strong style="color:#F00">
				<?php _e('Paypal Notes:', 'event_espresso'); ?>
			</strong><br />
			<?php _e('For Paypal IPN to work, you need a Business or Premier account.', 'event_espresso'); ?></p>
		<?php wp_nonce_field('espresso_form_check', 'add_paypal_settings'); ?>
	</form>
	<div id="sandbox_info" style="display:none">
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
		<hr />
		<p><strong><?php _e('Helpful Links:', 'event_espresso'); ?></strong></p>
		<ul>
			<li><a href="https://developer.paypal.com/devscr?cmd=_home" target="_blank">PayPal Sandbox Login</a></li>
			<li><a href="https://cms.paypal.com/us/cgi-bin/?&amp;cmd=_render-content&amp;content_ID=developer/howto_testing_sandbox" target="_blank">Sandbox Tutorial</a></li>
			<li><a href="https://cms.paypal.com/us/cgi-bin/?&amp;cmd=_render-content&amp;content_ID=developer/howto_testing_sandbox_get_started" target="_blank">Getting Started with PayPal Sandbox</a></li>
		</ul>
	</div>
	<div id="paypal_button_image" style="display:none">
		<h2>
			<?php _e('Button Image URL', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso'); ?>
		</p>
		<p><?php _e('Current Button Image:', 'event_espresso'); ?></p>
		<p><?php echo '<img src="' . $payment_settings['paypal']['button_url'] . '" />'; ?></p>
	</div>
	<div id="paypal_image_url_info" style="display:none">
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
	<div id="currency_info" style="display:none">
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
