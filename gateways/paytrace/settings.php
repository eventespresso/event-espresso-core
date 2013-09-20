<?php

function event_espresso_paytrace_payment_settings() {
	global $espresso_premium;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_option('payment_data_' . $this->EE->CFG->wp_user);

	if (isset($_POST['update_paytrace'])
					&& check_admin_referer('espresso_form_check', 'add_paytrace_settings')) {
		$payment_settings['paytrace']['paytrace_user_id'] = $_POST['paytrace_user_id'];
		$payment_settings['paytrace']['paytrace_user_pass'] = $_POST['paytrace_user_pass'];
		if (update_option('payment_data_' . $this->EE->CFG->wp_user, $payment_settings) == true) {
			EE_Error::add_success( __('Paytrace Settings Updated', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		} else {
			EE_Error::add_error( __('Paytrace Settings were not saved', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		}
	}

	if (empty($payment_settings['paytrace'])) {
		$payment_settings['paytrace']['active'] = false;
		$payment_settings['paytrace']['paytrace_user_id'] = '';
		$payment_settings['paytrace']['paytrace_user_pass'] = '';
		if (add_option('payment_data_' . $this->EE->CFG->wp_user, $payment_settings, '', 'no') == false) {
			update_option('payment_data_' . $this->EE->CFG->wp_user, $payment_settings);
		}
	}
	//Open or close the postbox div
	if (empty($payment_settings['paytrace']['active'])
					|| !empty($_REQUEST['deactivate_paytrace'])) {
		$postbox_style = 'closed';
	}
	if (!empty($_REQUEST['activate_paytrace'])) {
		$postbox_style = '';
	}
	?>
	<a name="paytrace" id="paytrace"></a>
	<div class="metabox-holder">
		<div class="postbox <?php echo $postbox_style; ?>">
			<div title="Click to toggle" class="handlediv"><br />
			</div>
			<h3 class="hndle">
				<?php _e('Paytrace Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (!empty($_REQUEST['activate_paytrace'])) {
						$payment_settings['paytrace']['active'] = true;
						if (update_option('payment_data_' . $this->EE->CFG->wp_user, $payment_settings) == true) {
							EE_Error::add_success( __('Paytrace Activated', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
						} else {
							EE_Error::add_error( __('Unable to Activate Paytrace', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
						}
					}

					if (!empty($_REQUEST['deactivate_paytrace'])) {
						$payment_settings['paytrace']['active'] = false;
						if (update_option('payment_data_' . $this->EE->CFG->wp_user, $payment_settings) == true) {
							EE_Error::add_success( __('Paytrace De-activated', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
						} else {
							EE_Error::add_error( __('Unable to De-activate Paytrace', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
						}
					}
					echo '<ul>';
					switch ($payment_settings['paytrace']['active']) {
						case false:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_paytrace=true#paytrace\';" class="green_alert pointer"><strong>' . __('Activate Paytrace?', 'event_espresso') . '</strong></li>';
							break;
						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_paytrace=true\';" class="red_alert pointer"><strong>' . __('Deactivate Paytrace?', 'event_espresso') . '</strong></li>';
							event_espresso_display_paytrace_settings();
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
function event_espresso_display_paytrace_settings() {
	
	$payment_settings = get_option('payment_data_' . $this->EE->CFG->wp_user);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri", 0, strpos($uri, '&activate_paytrace=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#paytrace">
		<table width="99%" border="0" >
			<tr>
				<td valign="top"><ul>
						<li>
							<label for="paytrace_user_id">
								<?php _e('Paytrace User ID:', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="paytrace_user_id" size="35" value="<?php echo $payment_settings['paytrace']['paytrace_user_id']; ?>">
						</li>
						<li>
							<label for="paytrace_user_pass">
								<?php _e('Paytrace User Password:', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="paytrace_user_pass" size="35" value="<?php echo $payment_settings['paytrace']['paytrace_user_pass']; ?>">
						</li>
					</ul></td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_paytrace" value="update_paytrace">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Paytrace Settings', 'event_espresso') ?>" id="save_paytrace_settings" />
		</p>
		<?php wp_nonce_field('espresso_form_check', 'add_paytrace_settings'); ?>
	</form>
	<?php
}

