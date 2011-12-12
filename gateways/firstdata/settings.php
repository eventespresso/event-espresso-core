<?php

function event_espresso_firstdata_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_option('payment_data_' . $espresso_wp_user);

	if (isset($_POST['update_firstdata'])
					&& check_admin_referer('espresso_form_check', 'add_firstdata_settings')) {
		$payment_settings['firstdata']['firstdata_store_id'] = $_POST['firstdata_store_id'];
		$payment_settings['firstdata']['use_sandbox'] = empty($_POST['use_sandbox']) ? '' : $_POST['use_sandbox'];
		$payment_settings['firstdata']['firstdata_credit_cards'] = empty($_POST['firstdata_credit_cards']) ? '' : implode(",", $_POST['firstdata_credit_cards']);
		if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
			$notices['updates'][] = __('Firstdata Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Firstdata Settings were not saved! ', 'event_espresso');
		}
	}
	if (empty($payment_settings['firstdata'])) {
		$payment_settings['firstdata']['active'] = false;
		$payment_settings['firstdata']['firstdata_store_id'] = '';
		$payment_settings['firstdata']['use_sandbox'] = '';
		$payment_settings['firstdata']['firstdata_credit_cards'] = '';
		$payment_settings['firstdata']['payment_address'] = '';
		if (add_option('payment_data_' . $espresso_wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $espresso_wp_user, $payment_settings);
		}
	}
	//Open or close the postbox div
	if (empty($payment_settings['firstdata']['active'])
					|| !empty($_REQUEST['deactivate_firstdata'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_firstdata'])) {
		$postbox_style = '';
	}
	?>
	<a name="firstdata" id="firstdata"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('First Data Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_firstdata'])) {
						$payment_settings['firstdata']['active'] = true;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('First Data Activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to Activate First Data', 'event_espresso');
						}
					}

					if (!empty($_REQUEST['deactivate_firstdata'])) {
						$payment_settings['firstdata']['active'] = false;
						if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
							$notices['updates'][] = __('First Data De-activated', 'event_espresso');
						} else {
							$notices['errors'][] = __('Unable to De-activate First Data', 'event_espresso');
						}
					}
					echo '<ul>';
					switch ($payment_settings['firstdata']['active']) {
						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_firstdata=true#firstdata\';" class="green_alert pointer"><strong>' . __('Activate First Data?', 'event_espresso') . '</strong></li>';
							break;
						case 'true':
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_firstdata=true\';" class="red_alert pointer"><strong>' . __('Deactivate First Data?', 'event_espresso') . '</strong></li>';
							event_espresso_display_firstdata_settings();

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
function event_espresso_display_firstdata_settings() {
	global $espresso_wp_user;
	$payment_settings = get_option('payment_data_' . $espresso_wp_user);
	$file_location = EVENT_ESPRESSO_GATEWAY_DIR . "firstdata";
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri",0,strpos($uri,'&activate_firstdata=true'));
	?>
	<form method="post" action="<?php echo $uri ?>#firstdata">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top"><ul>
						<li>
							<label>
	<?php _e('First Data Store Number', 'event_espresso'); ?>
							</label>

							<input class="regular-text" type="text" name="firstdata_store_id" size="35" value="<?php echo $payment_settings['firstdata']['firstdata_store_id']; ?>" />
							<br />
						</li>
						<li>
							<label>
	<?php _e('Accepted Credit Cards', 'event_espresso'); ?>
							</label>

							<?php
							$checked = 'checked="checked"';
							$firstdata_credit_cards = explode(",", $payment_settings['firstdata']['firstdata_credit_cards']);
							?>
							<input type="checkbox" name="firstdata_credit_cards[]" size="35" value="Visa" <?php echo in_array("Visa", $firstdata_credit_cards) ? $checked : ''; ?> /> Visa
							<input type="checkbox" name="firstdata_credit_cards[]" size="35" value="MasterCard" <?php echo in_array("MasterCard", $firstdata_credit_cards) ? $checked : ''; ?> /> Master Card
							<input type="checkbox" name="firstdata_credit_cards[]" size="35" value="Amex" <?php echo in_array("Amex", $firstdata_credit_cards) ? $checked : ''; ?> /> Amex
							<input type="checkbox" name="firstdata_credit_cards[]" size="35" value="Discover" <?php echo in_array("Discover", $firstdata_credit_cards) ? $checked : ''; ?> /> Discover

							<br />

						</li>
						<li>
							<label for="use_sandbox">
	<?php _e('Use the debugging feature and the FirstData Sandbox? ', 'event_espresso'); ?> <?php echo apply_filters('espresso_help', 'sandbox_info_firstdata') ?>
							</label>
							<input name="use_sandbox" type="checkbox" value="1" <?php echo $payment_settings['firstdata']['use_sandbox'] == "1" ? $checked : '' ?> />

						</li>


					</ul></td>
				<td  valign="top">
					<span style="color:red"><?php echo __("Place the .pem file in the following folder.  Make sure the .pem file has the same name as your store number.", 'event_espresso') . ":<br /> $file_location"; ?></span><br /><br />

				</td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_firstdata" value="update_firstdata" />
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update First Data Settings', 'event_espresso') ?>" id="save_paypal_settings" />
		</p>
	<?php wp_nonce_field('espresso_form_check', 'add_firstdata_settings'); ?>
	</form>
	<div id="sandbox_info_firstdata" style="display:none">
		<h2><?php _e('First Data Sandbox', 'event_espresso'); ?></h2>
		<p><?php _e('In addition to using the First Data Sandbox fetaure. The debugging feature will also output the form varibales to the payment page, send an email to the admin that contains the all First Data variables.', 'event_espresso'); ?></p>
		<hr />
		<p><?php _e('The First Data Sandbox is a testing environment that is a duplicate of the live First Data site, except that no real money changes hands. The Sandbox allows you to test your entire integration before submitting transactions to the live environment. Create and manage test accounts, and view emails and API credentials for those test accounts.', 'event_espresso'); ?></p>
	</div>
	<?php
}
