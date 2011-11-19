<?php

function event_espresso_aim_payment_settings() {
	global $espresso_premium, $notices, $espresso_wp_user; if ($espresso_premium != true) return;
	
	$old_payment_settings = get_option('payment_data_'.$espresso_wp_user);
	
	$payment_settings = get_option('payment_data_'.$espresso_wp_user);
	
	//Update settings
	if (isset($_POST['update_authnet_aim'])) {
		$payment_settings['authnet_aim']['authnet_aim_login_id'] = $_POST['authnet_aim_login_id'];
		$payment_settings['authnet_aim']['authnet_aim_transaction_key'] = $_POST['authnet_aim_transaction_key'];
		$payment_settings['authnet_aim']['use_sandbox'] = $_POST['use_sandbox'];
		
		if (update_option( 'payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings ) == true){
			$notices['updates'][] = __('Authorize.net AIM Payment Settings Updated!', 'event_espresso');
		}
	}
	?>

<a name="authnet_aim" id="authnet_aim"></a>
<div class="metabox-holder">
	<div class="postbox">
		<div title="Click to toggle" class="handlediv"><br />
		</div>
		<h3 class="hndle">
			<?php _e('Authorize.net AIM Settings', 'event_espresso'); ?>
		</h3>
		<div class="inside">
			<div class="padding"> 
				<!--New -->
				<?php
				if (isset($_REQUEST['activate_authnet_aim']) && $_REQUEST['activate_authnet_aim'] == 'true'){
					$payment_settings['authnet_aim']['active'] = true;
					//echo 'active = '.$payment_settings['authnet_aim']['active'];
					if (add_option( 'payment_data_'.$espresso_wp_user, $payment_settings, '', 'no' ) == true){
						$notices['updates'][] = __('Authorize.net AIM Gateway Activated', 'event_espresso');
					}elseif (update_option('payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings) == true){
						$notices['updates'][] = __('Authorize.net AIM Gateway Activated', 'event_espresso');
					}else{
						$notices['errors'][] = __('Unable to Activate Authorize.net AIM Gateway', 'event_espresso');
					}
				}
				
				if (isset($_REQUEST['reactivate_authnet_aim']) && $_REQUEST['reactivate_authnet_aim'] == 'true'){
					$payment_settings['authnet_aim']['active'] = true;
					//echo 'active = '.$payment_settings['authnet_aim']['active'];
					if (update_option('payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings) == true){
						$notices['updates'][] = __('Authorize.net AIM Gateway Payments Activated', 'event_espresso');
					}else{
						$notices['errors'][] = __('Unable to Activate Authorize.net AIM Gateway', 'event_espresso');
					}
				}
				
				if (isset($_REQUEST['deactivate_authnet_aim']) && $_REQUEST['deactivate_authnet_aim'] == 'true'){
					$payment_settings['authnet_aim']['active'] = false;
					if (update_option( 'payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings) == true){
						$notices['updates'][] = __('Authorize.net AIM Gateway Payments De-activated', 'event_espresso');
					}else{
						$notices['errors'][] = __('Unable to De-activate Authorize.net AIM Gateway', 'event_espresso');
					}
				}
								
				//echo '<pre>'.print_r($payment_settings, true).'</pre>';
				
				echo '<ul>';
				if (!isset($payment_settings['authnet_aim']['active'])){
					echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_authnet_aim=true#authnet_aim\';" class="yellow_alert pointer"><strong>' . __('The Authorize.net AIM Gateway is installed. Would you like to activate it?','event_espresso') . '</strong></li>';
				}else{
					switch ($payment_settings['authnet_aim']['active']){
						
						case false:
							echo '<li>Authorize.net AIM Gateway is installed.</li>';
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_authnet_aim=true#authnet_aim\';" class="green_alert pointer"><strong>' . __('Activate Authorize.net AIM Gateway?','event_espresso') . '</strong></li>';
						break;
						
						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_authnet_aim=true#authnet_aim\';" class="red_alert pointer"><strong>' . __('Deactivate Authorize.net AIM Gateway?','event_espresso') . '</strong></li>';
							event_espresso_display_authnet_aim_settings();
						break;
					}
				}
				echo '</ul>';
?>
				<!--New --> 
				
			</div>
		</div>
	</div>
</div>
<?php
}

//Authorize.net Settings Form
function event_espresso_display_authnet_aim_settings() {
	global $espresso_premium, $org_options, $espresso_wp_user; if ($espresso_premium != true) return;
	
	$payment_settings = get_option('payment_data_'.$espresso_wp_user);

	//Get the current button URL
	if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/aim/btn_cc_vmad.gif")) {
		$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/aim/btn_cc_vmad.gif";
	} else {
		$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/aim/btn_cc_vmad.gif";
	}
	?>
<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>#authnet_aim">
	<table width="99%" border="0">
		<tr>
			<td valign="top"><ul>
					<li style="width:50%">
						<p><strong style="color:#F00">
							<?php _e('WARNING!', 'event_espresso'); ?>
							</strong>
							<?php _e('You are responsible for your own security and PCI compliance.', 'event_espresso'); ?>
						</p>
					</li>
					<li>
						<label for="authnet_aim_login_id">
							<?php _e('Authorize.net AIM Login I.D.', 'event_espresso'); ?>
						</label>
						
						<input type="text" name="authnet_aim_login_id" size="35" value="<?php echo $payment_settings['authnet_aim']['authnet_aim_login_id']; ?>">
					</li>
					<li>
						<label for="authnet_aim_transaction_key">
							<?php _e('Authorize.net AIM Transaction Key', 'event_espresso'); ?>
						</label>
						
						<input type="text" name="authnet_aim_transaction_key" size="35" value="<?php echo $payment_settings['authnet_aim']['authnet_aim_transaction_key']; ?>">
					</li>
				</ul>
			</td>
			<td valign="top"><ul>
					<li>
						<label for="use_sandbox">
							<?php _e('Use the test mode feature for Autorize.net AIM? ', 'event_espresso'); ?><?php apply_filters( 'espresso_help', 'authnet_aim_sandbox'); ?>
						</label>
						<input name="use_sandbox" type="checkbox" value="1" <?php echo $payment_settings['authnet_aim']['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
						
					</li>
				</ul></td>
		</tr>
	</table>
	<p>
		<input type="hidden" name="update_authnet_aim" value="update_authnet_aim">
		<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Authorize.net AIM Settings', 'event_espresso') ?>" id="save_authnet_aim_settings" />
	</p>
</form>
<div id="authnet_aim_sandbox" style="display:none">
	<h2>
		<?php _e('Authorize.net AIM Test Mode', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('Test Mode allows you to submit test transactions to the payment gateway. Transactions that are submitted while Test Mode is ON are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?>
	</p>
	<p>370000000000002 (
		<?php _e('American Express', 'event_espresso'); ?>
		)<br />
		6011000000000012 (
		<?php _e('Discover', 'event_espresso'); ?>
		)<br />
		5424000000000015 (
		<?php _e('Master Card', 'event_espresso'); ?>
		)<br />
		4007000000027 (
		<?php _e('Visa', 'event_espresso'); ?>
		)</p>
</div>
<?php
}

