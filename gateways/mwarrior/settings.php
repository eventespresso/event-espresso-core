<?php

function event_espresso_mwarrior_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user;
	if ($espresso_premium != true)
		return;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	if (isset($_POST['update_mwarrior'])
					&& check_admin_referer('espresso_form_check', 'add_mwarrior_settings')) {
		$payment_settings['mwarrior']['mwarrior_id'] = $_POST['mwarrior_id'];
		$payment_settings['mwarrior']['mwarrior_apikey'] = $_POST['mwarrior_apikey'];
		$payment_settings['mwarrior']['mwarrior_passphrase'] = $_POST['mwarrior_passphrase'];
		$payment_settings['mwarrior']['image_url'] = $_POST['image_url'];
		$payment_settings['mwarrior']['currency_format'] = $_POST['currency_format'];
		$payment_settings['mwarrior']['use_sandbox'] = empty($_POST['use_sandbox']) ? '' : $_POST['use_sandbox'];
		$payment_settings['mwarrior']['bypass_payment_page'] = $_POST['bypass_payment_page'];
		$payment_settings['mwarrior']['button_url'] = $_POST['button_url'];
		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('Merchant Warrior Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Merchant Warrior Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['mwarrior'])) {
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/mwarrior/btn_checkout.png")) {
			$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/mwarrior/btn_checkout.png";
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/mwarrior/btn_checkout.png";
		}
		$payment_settings['mwarrior']['active'] = false;
		$payment_settings['mwarrior']['mwarrior_id'] = '';
		$payment_settings['mwarrior']['mwarrior_apikey'] = '';
		$payment_settings['mwarrior']['mwarrior_passphrase'] = '';
		$payment_settings['mwarrior']['image_url'] = '';
		$payment_settings['mwarrior']['currency_format'] = 'USD';
		$payment_settings['mwarrior']['use_sandbox'] = '';
		$payment_settings['mwarrior']['bypass_payment_page'] = false;
		$payment_settings['mwarrior']['button_url'] = $button_url;
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
		// insert a new field
		global $wpdb;
		$result = $wpdb->get_results( "SHOW columns FROM " . EVENTS_ATTENDEE_TABLE . " LIKE 'hashSalt'" );
		if (empty($result)) {
			$result = $wpdb->query("ALTER TABLE " . EVENTS_ATTENDEE_TABLE . " ADD hashSalt varchar(20) NOT NULL AFTER checked_in_quantity");
		}
	}
	////Open or close the postbox div
	if (empty($payment_settings['mwarrior']['active'])
					|| !empty($_REQUEST['deactivate_mwarrior'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_mwarrior'])) {
		$postbox_style = '';
	}
	?>

	<a name="mwarrior" id="mwarrior"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('Merchant Warrior Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_mwarrior'])) {
						$payment_settings['mwarrior']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Merchant Warrior Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate Merchant Warrior', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_mwarrior'])) {
						$payment_settings['mwarrior']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Merchant Warrior Payments De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate Merchant Warrior', 'event_espresso');
						}
					}
					echo '<ul>';
					switch ($payment_settings['mwarrior']['active']) {
						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_mwarrior=true#mwarrior\';" class="green_alert pointer"><strong>' . __('Activate Merchant Warrior IPN?', 'event_espresso') . '</strong></li>';
							break;
						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_mwarrior=true\';" class="red_alert pointer"><strong>' . __('Deactivate Merchant Warrior IPN?', 'event_espresso') . '</strong></li>';
							event_espresso_display_mwarrior_settings();
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

//Mwarrior Settings Form
function event_espresso_display_mwarrior_settings() {
	global $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_mwarrior=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#mwarrior">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top"><ul>
						<li>
							<label for="mwarrior_id">
								<?php _e('MW Merchant UUID', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="mwarrior_id" size="35" value="<?php echo $payment_settings['mwarrior']['mwarrior_id']; ?>">
						</li>
						<li>
							<label for="mwarrior_apikey">
								<?php _e('MW API Key', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="mwarrior_apikey" size="35" value="<?php echo $payment_settings['mwarrior']['mwarrior_apikey']; ?>">
						</li>
						<li>
							<label for="mwarrior_passphrase">
								<?php _e('MW API Passphrase', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="mwarrior_passphrase" size="35" value="<?php echo $payment_settings['mwarrior']['mwarrior_passphrase']; ?>">
						</li>
						<li>
							<label for="currency_format">
								<?php _e('Select the currency for your country: ', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'currency_info') ?>
							</label>
							<br />
							<select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
								<option value="AUD" <?php echo ($payment_settings['mwarrior']['currency_format'] == "AUD") ? "selected" : ""; ?>>
									<?php _e('Australian Dollars (A $)', 'event_espresso'); ?>
								</option>
								<option value="USD" <?php echo ($payment_settings['mwarrior']['currency_format'] == "USD") ? "selected" : ""; ?>>
									<?php _e('U.S. Dollars ($)', 'event_espresso'); ?>
								</option>
								<option value="GBP" <?php echo ($payment_settings['mwarrior']['currency_format'] == "GBP") ? "selected" : ""; ?>>
									<?php _e('Pounds Sterling (&pound;)', 'event_espresso'); ?>
								</option>
								<option value="CAD" <?php echo ($payment_settings['mwarrior']['currency_format'] == "CAD") ? "selected" : ""; ?>>
									<?php _e('Canadian Dollars (C $)', 'event_espresso'); ?>
								</option>
								<option value="EUR" <?php echo ($payment_settings['mwarrior']['currency_format'] == "EUR") ? "selected" : ""; ?>>
									<?php _e('Euros (&#8364;)', 'event_espresso'); ?>
								</option>
								<option value="JPY" <?php echo ($payment_settings['mwarrior']['currency_format'] == "JPY") ? "selected" : ""; ?>>
									<?php _e('Yen (&yen;)', 'event_espresso'); ?>
								</option>
								<option value="NZD" <?php echo ($payment_settings['mwarrior']['currency_format'] == "NZD") ? "selected" : ""; ?>>
									<?php _e('New Zealand Dollar ($)', 'event_espresso'); ?>
								</option>
								<option value="SGD" <?php echo ($payment_settings['mwarrior']['currency_format'] == "SGD") ? "selected" : ""; ?>>
									<?php _e('Singapore Dollar ($)', 'event_espresso'); ?>
								</option>
							</select>
						</li>
						<li>
							<label for="button_url">
								<?php _e('Button Image URL: ', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'button_image') ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="button_url" size="34" value="<?php echo $payment_settings['mwarrior']['button_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> </li>
						<li>
							<label for="image_url">
								<?php _e('Image URL (logo for payment page): ', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'image_url_info') ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="image_url" size="35" value="<?php echo $payment_settings['mwarrior']['image_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=image_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a><br />
							<?php _e('(used for your business/personal logo on the Merchant Warrior page)', 'event_espresso'); ?>
						</li>
					</ul></td>
				<td valign="top"><ul>
						<li>
							<label for="bypass_payment_page">
								<?php _e('Bypass the payment confirmation page? ', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'bypass_confirmation') ?>
							</label>
							<?php
							$values = array(
									array('id' => false, 'text' => __('No', 'event_espresso')),
									array('id' => true, 'text' => __('Yes', 'event_espresso')));
							echo select_input('bypass_payment_page', $values, $payment_settings['mwarrior']['bypass_payment_page']);
							?>
						</li>
						<li>
							<label for="use_sandbox">
								<?php _e('Use the Test Mode for Merchant Warrior? ', 'event_espresso');
								echo apply_filters('filter_hook_espresso_help', 'sandbox_info') ?>
							</label>
							<input name="use_sandbox" type="checkbox" value="1" <?php echo $payment_settings['mwarrior']['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />

						</li>
						<li>
							<?php _e('Current Button Image:', 'event_espresso'); ?>
							<br />
							<?php echo '<img src="' . $payment_settings['mwarrior']['button_url'] . '" />'; ?></li>
					</ul></td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_mwarrior" value="update_mwarrior">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Merchant Warrior Settings', 'event_espresso') ?>" id="save_mwarrior_settings" />
		</p>
		<?php wp_nonce_field('espresso_form_check', 'add_mwarrior_settings'); ?>
	</form>
	<div id="sandbox_info" style="display:none">
		<h2><?php _e('Merchant Warrior Test Mode', 'event_espresso'); ?></h2>
		<p><?php _e('Test Mode allows you to submit test transactions to the payment gateway. This allows you to test your entire integration before submitting transactions to the live Merchant Warrior environment. ', 'event_espresso'); ?></p>
	</div>
	<div id="image_url_info" style="display:none">
		<h2>
			<?php _e('Merchant Warrior Image URL (logo for payment page)', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('The URL of the image displayed as your logo in the header of the Merchant Warrior checkout pages.', 'event_espresso'); ?>
		</p>
	</div>
	<div id="currency_info" style="display:none">
		<h2><?php _e('Merchant Warrior Currency', 'event_espresso'); ?></h2>
		<p><?php _e('Merchant Warrior uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is Australian Dollars (AUD). If you want to accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that Merchant Warrior (currently) supports.', 'event_espresso'); ?> </p>
	</div>
	<?php
}
