<?php

function event_espresso_firstdata_connect_2_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user, $active_gateways;
	if ($espresso_premium != true)
		return;

	$payment_settings = get_user_meta($espresso_wp_user, 'payment_settings', true);
	
	if (isset($_POST['update_firstdata_connect_2'])
					&& check_admin_referer('espresso_form_check', 'add_firstdata2_settings')) {
		$payment_settings['firstdata_connect_2']['storename']    = $_POST['storename'];
		$payment_settings['firstdata_connect_2']['sharedSecret'] = $_POST['sharedSecret'];
		$payment_settings['firstdata_connect_2']['timezone']     = $_POST['timezone'];
		$payment_settings['firstdata_connect_2']['sandbox']      = empty($_POST['sandbox']) ? '' : $_POST['sandbox'];
		$payment_settings['firstdata_connect_2']['button_url']   = $_POST['button_url'];
		if (update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings)) {
			$notices['updates'][] = __('Firstdata Connect 2.0 Settings Updated!', 'event_espresso');
		} else {
			$notices['errors'][] = __('Firstdata Connect 2.0 Settings were not saved! ', 'event_espresso');
		}
	}

	if (empty($payment_settings['firstdata_connect_2'])) {
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata_connect_2/lib/standard_button.gif")) {
			$button_url = EVENT_ESPRESSO_GATEWAY_URL . "/firstdata_connect_2/lib/standard_button.gif";
		} else {
			$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/firstdata_connect_2/lib/standard_button.gif";
		}
		$payment_settings['firstdata_connect_2']['storename'] = '';
		$payment_settings['firstdata_connect_2']['sharedSecret'] = '';
		$payment_settings['firstdata_connect_2']['timezone'] = '';
		$payment_settings['firstdata_connect_2']['sandbox'] = '';
		$payment_settings['firstdata_connect_2']['button_url'] = $button_url;
		$payment_settings['firstdata_connect_2']['type'] = 'off-site';
		$payment_settings['firstdata_connect_2']['display_name'] = "FirstData Connect 2.0";
		update_user_meta($espresso_wp_user, 'payment_settings', $payment_settings);
	}
	//Open or close the postbox div
	if (empty($_REQUEST['deactivate_firstdata_connect_2'])
					&& (!empty($_REQUEST['activate_firstdata_connect_2'])
									|| array_key_exists('firstdata_connect_2', $active_gateways))) {
		$postbox_style = '';
	} else {
		$postbox_style = 'closed';
	}
	?>
	<a name="firstdata_connect_2" id="firstdata_connect_2"></a>
	<div class="padding">
		<?php
		if (!empty($_REQUEST['activate_firstdata_connect_2'])) {
			$active_gateways['firstdata_connect_2'] = str_replace('\\', '/', dirname(__FILE__));
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
				$notices['updates'][] = __('First Data Connect 2 Activated', 'event_espresso');
			} else {
				$notices['errors'][] = __('Unable to Activate First Data Connect 2', 'event_espresso');
			}
		}
	
		if (!empty($_REQUEST['deactivate_firstdata_connect_2'])) {
			unset($active_gateways['firstdata_connect_2']);
			if (update_user_meta($espresso_wp_user, 'active_gateways', $active_gateways)) {
				$notices['updates'][] = __('First Data Connect 2 De-activated', 'event_espresso');
			} else {
				$notices['errors'][] = __('Unable to De-activate First Data Connect 2', 'event_espresso');
			}
		}
			
		echo '<ul>';
		if (!array_key_exists('firstdata_connect_2', $active_gateways)) {
			echo '<li id="activate_firstdata_connect_2" style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_firstdata_connect_2=true#firstdata_connect_2\';" class="green_alert pointer"><strong>' . __('Activate First Data Connect 2?', 'event_espresso') . '</strong></li>';
		} else {
			echo '<li id="deactivate_firstdata_connect_2" style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_firstdata_connect_2=true\';" class="red_alert pointer"><strong>' . __('Deactivate First Data Connect 2?', 'event_espresso') . '</strong></li>';
			event_espresso_display_firstdata_connect_2_settings($payment_settings);
		}
		echo '</ul>';
		?>
	</div>
	<?php
}

//PayPal Settings Form
function event_espresso_display_firstdata_connect_2_settings($payment_settings) {
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')),
	);
	$uri = $_SERVER['REQUEST_URI'];
	$uri = substr("$uri",0,strpos($uri,'&activate_firstdata_connect_2=true'));
	?>
	<form method="post" action="<?php echo $uri; ?>#firstdata_connect_2">
		<table class="form-table">
			<tbody>
				<tr>
					<th><label for="storename">
						<?php _e('First Data Storename', 'event_espresso'); ?>
					</label></th>
					<td><input class="regular-text" type="text" name="storename" size="35" value="<?php echo $payment_settings['firstdata_connect_2']['storename']; ?>">
					</td>
				</tr>
				<tr>
					<th><label for="sharedSecret">
						<?php _e('First Data Shared Secret', 'event_espresso'); ?>
					</label></th>
					<td><input class="regular-text" type="text" name="sharedSecret" size="35" value="<?php echo $payment_settings['firstdata_connect_2']['sharedSecret']; ?>">
					</td>
				</tr>
				<tr>
					<th><label for="use_sandbox">
						<?php _e('Use the Debugging Feature and the', 'event_espresso'); ?> <?php _e('FirstData Connect 2 Sandbox? ', 'event_espresso'); ?><?php do_action('action_hook_espresso_help', 'sandbox_info_firstdata_connect_2') ?>
					</label></th>
					<td><?php
						echo EE_Form_Fields::select_input('sandbox', $values, $payment_settings['firstdata_connect_2']['sandbox']);
					?>
					</td>
				</tr>
				<tr>
					<th><label for="button_url">
						<?php _e('Button Image URL: ', 'event_espresso'); ?> <?php do_action('action_hook_espresso_help', 'button_image') ?>
					</label></th>
					<td><input class="regular-text" type="text" name="button_url" size="34" value="<?php echo $payment_settings['firstdata_connect_2']['button_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a></td>
				</tr>
				<tr>
					<th><label for="timezone">
						<?php _e('Choose a timezone for the transaction? ', 'event_espresso'); ?><?php // do_action('action_hook_espresso_help', 'timezone') // removed: no relevent help available, is it required? self explanatory?  ?>
					</label></th>
					<td><?php
						$values = array(
							array('id' => 'GMT', 'text' => __('GMT', 'event_espresso')),
							array('id' => 'EST', 'text' => __('EST', 'event_espresso')),
							array('id' => 'CST', 'text' => __('CST', 'event_espresso')),
							array('id' => 'MST', 'text' => __('MST', 'event_espresso')),
							array('id' => 'PST', 'text' => __('PST', 'event_espresso')));
						echo EE_Form_Fields::select_input('timezone', $values, $payment_settings['firstdata_connect_2']['timezone']);
					?></td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Current Button Image', 'event_espresso'); ?></label>
						<?php echo '<img src="' . $payment_settings['firstdata_connect_2']['button_url'] . '" />'; ?>
					</td>
				</tr>
			</tbody>
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
		<div id="timezone" style="display:none">
			<h2><?php _e('Time Zone'); ?></h2>
			<p><?php _e('Time zone of the transaction. Valid values are: GMT, EST, CST, MST, PST'); ?></p>
		</div>
	<?php
}

add_meta_box('espresso_firstdata_connect_2_gateway_settings', __('First Data Connect 2 Settings', 'event_espresso'), 'event_espresso_firstdata_connect_2_payment_settings', 'event-espresso_page_payment_gateways');