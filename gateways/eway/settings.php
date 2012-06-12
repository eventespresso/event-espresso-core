<?php

function event_espresso_eway_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user, $active_gateways;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);

	if (isset($_POST['update_eway'])
					&& check_admin_referer('espresso_form_check', 'add_eway_settings')) {
		$payment_settings['eway']['eway_id'] = $_POST['eway_id'];
		$payment_settings['eway']['eway_username'] = $_POST['eway_username'];
		$payment_settings['eway']['image_url'] = $_POST['image_url'];
		$payment_settings['eway']['currency_format'] = $_POST['currency_format'];
		$payment_settings['eway']['use_sandbox'] = empty($_POST['use_sandbox']) ? '' : $_POST['use_sandbox'];
		$payment_settings['eway']['button_url'] = $_POST['button_url'];
		$payment_settings['eway']['region'] = $_POST['region'];
		if (update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings)) {
			$notices['updates'][] = __('Eway Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Eway Settings were not saved! ', 'event_espresso');
		}
	}
	if (empty($payment_settings['eway'])) {
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/eway/lib/eway_logo.png")) {
			$button_url = EVENT_ESPRESSO_GATEWAY_URL . "/eway/lib/eway_logo.png";
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/eway/lib/eway_logo.png";
		}
		$payment_settings['eway']['eway_id'] = '';
		$payment_settings['eway']['eway_username'] = '';
		$payment_settings['eway']['image_url'] = '';
		$payment_settings['eway']['currency_format'] = 'GBP';
		$payment_settings['eway']['use_sandbox'] = '';
		$payment_settings['eway']['button_url'] = $button_url;
		$payment_settings['eway']['region'] = 'UK';
		$payment_settings['eway']['type'] = 'off-site';
		$payment_settings['eway']['display_name'] = "Eway";
		update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings);
	}
	//Open or close the postbox div
	if (empty($_REQUEST['deactivate_eway'])
					&& (!empty($_REQUEST['activate_eway'])
					|| array_key_exists('eway', $active_gateways))) {
		$postbox_style = '';
	} else {
		$postbox_style = 'closed';
	}
	?>

	<a name="eway" id="eway"></a>
	<div class="padding">
		<?php
		if (!empty($_REQUEST['activate_eway'])) {
			$active_gateways['eway'] = str_replace('\\', '/', dirname(__FILE__));
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
				$notices['updates'][] = __('Eway Activated', 'event_espresso');
			} else {
				$notices['errors'][] = __('Unable to Activate Eway', 'event_espresso');
			}
		}

		if (!empty($_REQUEST['deactivate_eway'])) {
			unset($active_gateways['eway']);
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
				$notices['updates'][] = __('Eway Payments De-activated', 'event_espresso');
			} else {
				$notices['errors'][] = __('Unable to De-activate Eway', 'event_espresso');
			}
		}

		echo '<ul>';
		if (!array_key_exists('eway', $active_gateways)) {
			echo '<li id="activate_eway" style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_eway=true#eway\';" class="green_alert pointer"><strong>' . __('Activate eway IPN?', 'event_espresso') . '</strong></li>';
		} else {
			echo '<li id="deactivate_eway" style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_eway=true\';" class="red_alert pointer"><strong>' . __('Deactivate eway IPN?', 'event_espresso') . '</strong></li>';
			event_espresso_display_eway_settings($payment_settings);
		}
		echo '</ul>';
		?>
	</div>
	<?php
}

//eway Settings Form
function event_espresso_display_eway_settings($payment_settings) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')),
	);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_eway=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#eway">
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="eway_id">
							<?php _e('eway ID', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="eway_id" size="35" value="<?php echo $payment_settings['eway']['eway_id']; ?>">
						<br />
						<?php _e('(Typically 87654321)', 'event_espresso'); ?></td>
				</tr>
				<tr>
					<th><label for="eway_username">
							<?php _e('eway username', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="eway_username" size="35" value="<?php echo $payment_settings['eway']['eway_username']; ?>">
						<br />
						<?php _e('(Typically TestAccount)', 'event_espresso'); ?></td>
				</tr>
				<tr>
					<th><label for="button_url">
							<?php _e('Button Image URL: ', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'eway_button_image'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="button_url" size="34" value="<?php echo $payment_settings['eway']['button_url']; ?>" />
						<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a></td>
				</tr>
				<tr>
					<th><label for="image_url">
							<?php _e('Image URL (logo for payment page):', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'eway_image_url_info'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="image_url" size="35" value="<?php echo $payment_settings['eway']['image_url']; ?>" />
						<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=image_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <br />
						<?php
						_e('(used for your business/personal logo on the eway page)', 'event_espresso');
						if ($payment_settings['eway']['image_url'] != '')
							echo '<br /><img src="' . $payment_settings['eway']['image_url'] . '" />';
						?>
					</td>
				</tr>
				<tr>
					<th><label for="currency_format">
							<?php _e('Select the currency for your country: ', 'event_espresso'); ?> <?php echo apply_filters('filter_hook_espresso_help', 'eway_currency_info') ?>
						</label></th>
					<td><select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
							<option value="<?php echo $payment_settings['eway']['currency_format']; ?>"><?php echo $payment_settings['eway']['currency_format']; ?>
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
						</select></td>
				</tr>
				<tr>
					<th><label for="region">
							<?php _e('Select the region where you want to use eWay:', 'event_espresso'); ?>
						</label></th>
					<td><select name="region" class="chzn-select" data-placeholder="Choose a region..." style="width:200px">
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
						</select></td>
				</tr>
				<tr>
					<th><label for="use_sandbox">
							<?php _e('Use the Debugging Feature and the eway Sandbox?', 'event_espresso'); ?></a> <?php echo apply_filters('filter_hook_espresso_help', 'eway_sandbox_info'); ?>
						</label></th>
					<td><?php
						echo select_input('use_sandbox', $values, $payment_settings['eway']['use_sandbox']);
							?></td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Current Button Image', 'event_espresso'); ?></label>
						<?php echo '<img src="' . $payment_settings['eway']['button_url'] . '" />'; ?>
					</td>
				</tr>
			</tbody>
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

add_meta_box('espresso_eway_gateway_settings', __('Eway Settings', 'event_espresso'), 'event_espresso_eway_payment_settings', 'event-espresso_page_payment_gateways');