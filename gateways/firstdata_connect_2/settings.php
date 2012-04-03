<?php

function event_espresso_firstdata_connect_2_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	if (isset($_POST['update_firstdata_connect_2'])
					&& check_admin_referer('espresso_form_check', 'add_firstdata2_settings')) {
		$payment_settings['firstdata_connect_2']['storename'] = $_POST['storename'];
		$payment_settings['firstdata_connect_2']['sharedSecret'] = $_POST['sharedSecret'];
		$payment_settings['firstdata_connect_2']['timezone'] = $_POST['timezone'];
		$payment_settings['firstdata_connect_2']['sandbox'] = empty($_POST['sandbox']) ? '' : $_POST['sandbox'];
		$payment_settings['firstdata_connect_2']['button_url'] = $_POST['button_url'];
		$payment_settings['firstdata_connect_2']['bypass_payment_page'] = $_POST['bypass_payment_page'];

		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('Firstdata Connect 2.0 Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Firstdata Connect 2.0 Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['firstdata_connect_2'])) {
		$payment_settings['firstdata_connect_2']['active'] = false;
		$payment_settings['firstdata_connect_2']['storename'] = '';
		$payment_settings['firstdata_connect_2']['sharedSecret'] = '';
		$payment_settings['firstdata_connect_2']['timezone'] = '';
		$payment_settings['firstdata_connect_2']['sandbox'] = '';
		$payment_settings['firstdata_connect_2']['button_url'] = '';
		$payment_settings['firstdata_connect_2']['bypass_payment_page'] = '';
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}
	//Open or close the postbox div
	if (empty($payment_settings['firstdata_connect_2']['active'])
					|| !empty($_REQUEST['deactivate_firstdata_connect_2'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_firstdata_connect_2'])) {
		$postbox_style = '';
	}
	?>
<a name="firstdata_connect_2" id="firstdata_connect_2"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('First Data Connect 2 Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_firstdata_connect_2'])) {
						$payment_settings['firstdata_connect_2']['active'] = true;
						if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata_connect_2/standard_button.gif")) {
							$payment_settings['firstdata_connect_2']['button_url'] = EVENT_ESPRESSO_GATEWAY_DIR
											. "/firstdata_connect_2/standard_button.gif";
						} else {
							$payment_settings['firstdata_connect_2']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL
											. "gateways/firstdata_connect_2/standard_button.gif";
						}
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('First Data Connect 2 Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate First Data Connect 2', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_firstdata_connect_2'])) {
						$payment_settings['firstdata_connect_2']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('First Data Connect 2 De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate First Data Connect 2', 'event_espresso');
						}
					}
					echo '<ul>';
					switch ($payment_settings['firstdata_connect_2']['active']) {
						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_firstdata_connect_2=true#firstdata_connect_2\';" class="green_alert pointer"><strong>' . __('Activate First Data Connect 2?', 'event_espresso') . '</strong></li>';
							break;
						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_firstdata_connect_2=true\';" class="red_alert pointer"><strong>' . __('Deactivate First Data Connect 2?', 'event_espresso') . '</strong></li>';
							event_espresso_display_firstdata_connect_2_settings();
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
function event_espresso_display_firstdata_connect_2_settings() {
	global $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	$file_location = EVENT_ESPRESSO_GATEWAY_DIR . "firstdata_connect_2";
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri",0,strpos($uri,'&activate_firstdata_connect_2=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#firstdata_connect_2">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top">
					<ul>
						<li>
							<label>
								<?php _e('First Data Storename', 'event_espresso'); ?>
							</label>
							<input class="regular-text" type="text" name="storename" size="35" value="<?php echo $payment_settings['firstdata_connect_2']['storename']; ?>">
						</li>

						<li>
							<label>
								<?php _e('First Data Shared Secret', 'event_espresso'); ?>
							</label>
							<input class="regular-text" type="text" name="sharedSecret" size="35" value="<?php echo $payment_settings['firstdata_connect_2']['sharedSecret']; ?>">
						</li>

						<li>
							<label for="use_sandbox">
								<?php _e('Use the debugging feature and the', 'event_espresso'); ?> <?php _e('FirstData Connect 2 Sandbox? ', 'event_espresso'); ?><?php echo apply_filters('espresso_help', 'sandbox_info_firstdata_connect_2') ?>
							</label>
							<input name="sandbox" type="checkbox" value="1" <?php echo $payment_settings['firstdata_connect_2']['sandbox'] == "1" ? 'checked="checked"' : '' ?> />
						</li>
					</ul>
				</td>
				<td valign="top">
					<ul>
						<li>
							<label for="bypass_payment_page">
								<?php _e('By-pass the payment confirmation page? ', 'event_espresso'); ?> <?php echo apply_filters('espresso_help', 'bypass_confirmation') ?>
							</label>
							<?php
							$values = array(
									array('id' => false, 'text' => __('No', 'event_espresso')),
									array('id' => true, 'text' => __('Yes', 'event_espresso')));
							echo select_input('bypass_payment_page', $values, $payment_settings['firstdata_connect_2']['bypass_payment_page']);
							?>
						</li>

						<li>
							<label for="button_url">
								<?php _e('Button Image URL: ', 'event_espresso'); ?> <?php echo apply_filters('espresso_help', 'button_image') ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="button_url" size="34" value="<?php echo $payment_settings['firstdata_connect_2']['button_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a>
						</li>

						<li>
							<label for="timezone">
								<?php _e('Choose a timezone for the transaction? ', 'event_espresso'); ?><?php // apply_filters('espresso_help', 'timezone') // removed: no relevent help available, is it required? self explanatory?  ?>
							</label>
							<?php
							$values = array(
									array('id' => 'GMT', 'text' => __('GMT', 'event_espresso')),
									array('id' => 'EST', 'text' => __('EST', 'event_espresso')),
									array('id' => 'CST', 'text' => __('CST', 'event_espresso')),
									array('id' => 'MST', 'text' => __('MST', 'event_espresso')),
									array('id' => 'PST', 'text' => __('PST', 'event_espresso')));
							echo select_input('timezone', $values, $payment_settings['firstdata_connect_2']['timezone']);
							?>
						</li>
					</ul>
				</td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_firstdata_connect_2" value="update_firstdata_connect_2">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update First Data Connect 2 Settings', 'event_espresso') ?>" id="save_first_data_connect_2_settings" />
		</p>
		<?php wp_nonce_field('espresso_form_check', 'add_firstdata2_settings'); ?>
	</form>
	<div id="sandbox_info_firstdata_connect_2"  class="pop-help" style="display:none">
		<div class="TB-ee-frame">
			<h2><?php _e('First Data Sandbox', 'event_espresso'); ?></h2>
			<p><?php _e('In addition to using the First Data Sandbox fetaure. The debugging feature will also output the form varibales to the payment page, send an email to the admin that contains the all First Data variables.', 'event_espresso'); ?></p>
			<hr />
			<p><?php _e('The First Data Sandbox is a testing environment that is a duplicate of the live First Data site, except that no real money changes hands. The Sandbox allows you to test your entire integration before submitting transactions to the live environment. Create and manage test accounts, and view emails and API credentials for those test accounts.', 'event_espresso'); ?></p>
		</div>
	</div>
	<?php
}
