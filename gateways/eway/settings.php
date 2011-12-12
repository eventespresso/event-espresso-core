<?php

function event_espresso_eway_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	if (isset($_POST['update_eway'])
					&& check_admin_referer('espresso_form_check', 'add_eway_settings')) {
		$payment_settings['eway']['eway_id'] = $_POST['eway_id'];
		$payment_settings['eway']['eway_username'] = $_POST['eway_username'];
		$payment_settings['eway']['image_url'] = $_POST['image_url'];
		$payment_settings['eway']['currency_format'] = $_POST['currency_format'];
		$payment_settings['eway']['use_sandbox'] = empty($_POST['use_sandbox']) ? '' : $_POST['use_sandbox'];
		$payment_settings['eway']['bypass_payment_page'] = $_POST['bypass_payment_page'];
		$payment_settings['eway']['button_url'] = $_POST['button_url'];
		$payment_settings['eway']['region'] = $_POST['region'];
		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('Eway Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Eway Settings were not saved! ', 'event_espresso');
		}
	}
	if (empty($payment_settings['eway'])) {
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/eway/eway_logo.png")) {
			$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/eway/eway_logo.png";
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/eway/eway_logo.png";
		}
		$payment_settings['eway']['active'] = false;
		$payment_settings['eway']['eway_id'] = '';
		$payment_settings['eway']['eway_username'] = '';
		$payment_settings['eway']['image_url'] = '';
		$payment_settings['eway']['currency_format'] = 'GBP';
		$payment_settings['eway']['use_sandbox'] = '';
		$payment_settings['eway']['bypass_payment_page'] = 'N';
		$payment_settings['eway']['button_url'] = $button_url;
		$payment_settings['eway']['region'] = 'UK';
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}
	//Open or close the postbox div
	if ($payment_settings['eway']['active'] == false
					|| (isset($_REQUEST['deactivate_eway']) && $_REQUEST['deactivate_eway'] == 'true')) {
		$postbox_style = 'closed';
	}
	if (isset($_REQUEST['activate_eway']) && $_REQUEST['activate_eway'] == 'true') {
		$postbox_style = '';
	}
	?>

	<a name="eway" id="eway"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('Eway Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_eway'])) {
						$payment_settings['eway']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Eway Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate Eway', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_eway'])) {
						$payment_settings['eway']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('Eway Payments De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate Eway', 'event_espresso');
						}
					}

					echo '<ul>';
					switch ($payment_settings['eway']['active']) {
						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_eway=true#eway\';" class="green_alert pointer"><strong>' . __('Activate eway IPN?', 'event_espresso') . '</strong></li>';
							break;
						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_eway=true\';" class="red_alert pointer"><strong>' . __('Deactivate eway IPN?', 'event_espresso') . '</strong></li>';
							event_espresso_display_eway_settings();
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

//eway Settings Form
function event_espresso_display_eway_settings() {
	global $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_eway=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#eway">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top"><ul>
						<li>
							<label for="eway_id">
								<?php _e('eway I.D.', 'event_espresso'); ?>
							</label>
							<input class="regular-text" type="text" name="eway_id" size="35" value="<?php echo $payment_settings['eway']['eway_id']; ?>">
							<br />
							<?php _e('(Typically 87654321)', 'event_espresso'); ?>
						</li>
						<li>
							<label for="eway_username">
								<?php _e('eway username', 'event_espresso'); ?>
							</label>
							<input class="regular-text" type="text" name="eway_username" size="35" value="<?php echo $payment_settings['eway']['eway_username']; ?>">
							<br />
							<?php _e('(Typically TestAccount)', 'event_espresso'); ?>
						</li>

						<li>
							<label for="button_url">
								<?php _e('Button Image URL: ', 'event_espresso'); ?> <?php apply_filters('espresso_help', 'eway_button_image'); ?>
							</label>
							<input class="regular-text" type="text" name="button_url" size="34" value="<?php echo $payment_settings['eway']['button_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <br />
							<?php echo '<img src="' . $payment_settings['eway']['button_url'] . '" />'; ?></li>
						<li>
							<label for="image_url">
								<?php _e('Image URL (logo for payment page):', 'event_espresso'); ?> <?php apply_filters('espresso_help', 'eway_image_url_info'); ?>
							</label>
							<input class="regular-text" type="text" name="image_url" size="35" value="<?php echo $payment_settings['eway']['image_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=image_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <br />
							<?php
							_e('(used for your business/personal logo on the eway page)', 'event_espresso');
							if ($payment_settings['eway']['image_url'] != '')
								echo '<br /><img src="' . $payment_settings['eway']['image_url'] . '" />';
							?>
						</li>
					</ul></td>
				<td valign="top"><ul>
						<li>
							<label for="currency_format">
								<?php _e('Select the currency for your country: ', 'event_espresso'); ?> <?php echo apply_filters('espresso_help', 'eway_currency_info') ?>
							</label>
							<select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
								<option value="<?php echo $payment_settings['eway']['currency_format']; ?>"><?php echo $payment_settings['eway']['currency_format']; ?></option>
								</option>
								<option value="AUD">
									<?php _e('Australian Dollars (A $)', 'event_espresso'); ?>
								</option>
								<option value="GBP">
									<?php _e('Pounds Sterling (&pound;)', 'event_espresso'); ?>
								</option>
								<option value="NZD">
									<?php _e('New Zealand Dollar ($)', 'event_espresso'); ?>
								</option>
							</select>
						</li>
						<li>
							<label for="bypass_payment_page">
								<?php _e('By-pass the payment confirmation page?', 'event_espresso'); ?> <?php apply_filters('espresso_help', 'eway_bypass_confirmation'); ?>
							</label>
							<?php
							$values = array(
									array('id' => 'N', 'text' => __('No', 'event_espresso')),
									array('id' => 'Y', 'text' => __('Yes', 'event_espresso')));
							echo select_input('bypass_payment_page', $values, $payment_settings['eway']['bypass_payment_page']);
							?></li>
						<li>
							<label for="region">
								<?php _e('Select the region where you want to use eWay:', 'event_espresso'); ?>
							</label>
							<select name="region" class="chzn-select" data-placeholder="Choose a region..." style="width:200px">
								<option value="<?php echo $payment_settings['eway']['region']; ?>"><?php echo $payment_settings['eway']['region']; ?></option>
								<option value="UK">
									<?php _e('United Kingdom', 'event_espresso'); ?>
								</option>
								<option value="AU">
									<?php _e('Australia', 'event_espresso'); ?>
								</option>
								<option value="NZ">
									<?php _e('New Zealand', 'event_espresso'); ?>
								</option>
							</select>
						</li>
						<li>
							<label for="use_sandbox">
								<?php _e('Use the debugging feature and the eway Sandbox?', 'event_espresso'); ?></a> <?php apply_filters('espresso_help', 'eway_sandbox_info'); ?>
							</label>
							<input name="use_sandbox" type="checkbox" value="1" <?php echo $payment_settings['eway']['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />

						</li>
					</ul></td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_eway" value="update_eway">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update eway Settings', 'event_espresso') ?>" id="save_eway_settings" />
			<?php wp_nonce_field('espresso_form_check', 'add_eway_settings'); ?>
		</p>
	</form>
	<div id="eway_sandbox_info" style="display:none">
		<h2><?php _e('eway Sandbox', 'event_espresso'); ?></h2>
		<p><?php _e('In addition to using the eway Sandbox fetaure. The debugging feature will also output the form varibales to the payment page, send an email to the admin that contains the all eway variables.', 'event_espresso'); ?></p>
		<hr />
		<p><?php _e('The eway Sandbox is a testing environment that is a duplicate of the live eway site, except that no real money changes hands. The Sandbox allows you to test your entire integration before submitting transactions to the live eway environment. Create and manage test accounts, and view emails and API credentials for those test accounts.', 'event_espresso'); ?></p>
	</div>
	<div id="eway_image_url_info" style="display:none">
		<h2>
			<?php _e('eway Image URL (logo for payment page)', 'event_espresso'); ?>
		</h2>
		<p>
			<?php _e('The URL of the 150x50-pixel image displayed as your logo in the upper left corner of the eway checkout pages.', 'event_espresso'); ?>
		</p>
		<p>
			<?php _e('Default - Your business name, if you have a Business account, or your email address, if you have Premier or Personal account.', 'event_espresso'); ?>
		</p>
	</div>
	<div id="eway_currency_info" style="display:none">
		<h2><?php _e('eway Currency', 'event_espresso'); ?></h2>
		<p><?php _e('eway uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is British Pounds (GBP). If you want to require or accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that eway (currently) supports.', 'event_espresso'); ?> </p>
	</div>
	<?php
}

