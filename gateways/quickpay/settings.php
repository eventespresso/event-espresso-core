<?php
function event_espresso_quickpay_payment_settings() {
	if (isset($_POST['update_quickpay'])&& check_admin_referer('espresso_form_check', 'add_quickpay_settings')) {
		$quickpay_settings['quickpay_merchantid'] = $_POST['quickpay_merchantid'];
		$quickpay_settings['quickpay_md5secret'] = $_POST['quickpay_md5secret'];
		$quickpay_settings['quickpay_language'] = $_POST['quickpay_language'];
		$quickpay_settings['quickpay_autocapture'] = $_POST['quickpay_autocapture'];
		$quickpay_settings['quickpay_currency'] = $_POST['quickpay_currency'];
				$quickpay_settings['use_sandbox'] = (empty($_POST['use_sandbox'])) ? '0' : $_POST['use_sandbox'];
		update_option('event_espresso_quickpay_settings', $quickpay_settings);
		echo '<div id="message" class="updated fade"><p><strong>' . __('quickpay settings saved.', 'event_espresso') . '</strong></p></div>';
	}
	?>

	<div class="metabox-holder">
		<div class="postbox">
	   <div title="Click to toggle" class="handlediv"><br /></div>
		 <h3 class="hndle">
		  <?php _e('quickpay Settings', 'event_espresso'); ?>
		 </h3>
					 <div class="inside">
			<div class="padding">
				<?php
				if (isset($_REQUEST['activate_quickpay'])&&$_REQUEST['activate_quickpay'] == 'true') {
					add_option("events_quickpay_active", 'true', '', 'yes');
					add_option("event_espresso_quickpay_settings", '', '', 'yes');
					//update_option( 'event_espresso_payment_gateway', 'quickpay');
				}
				if (isset($_REQUEST['reactivate_quickpay'])&&$_REQUEST['reactivate_quickpay'] == 'true') {
					update_option('events_quickpay_active', 'true');
					//update_option( 'event_espresso_payment_gateway', 'quickpay');
				}
				if (isset($_REQUEST['deactivate_quickpay'])&&$_REQUEST['deactivate_quickpay'] == 'true') {
					update_option('events_quickpay_active', 'false');
					//update_option( 'event_espresso_payment_gateway', '');
				}
				echo '<ul>';
				switch (get_option('events_quickpay_active')) {
					case 'false':
						echo '<li>quickpay Gateway is installed.</li>';
						echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_quickpay=true\';" class="green_alert pointer"><strong>' . __('Activate quickpay IPN?', 'event_espresso') . '</strong></li>';
						break;
					case 'true':
						echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_quickpay=true\';" class="red_alert pointer"><strong>' . __('Deactivate quickpay IPN?', 'event_espresso') . '</strong></li>';
						event_espresso_display_quickpay_settings();

						break;
					default:
						echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_quickpay=true\';" class="yellow_alert pointer"><strong>' . __('The quickpay IPN addon is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
						break;
				}
				echo '</ul>';
				?>
			</div>
						</div>
		</div>
	</div>
	<?php } ?>
<?php

//quickpay Settings Form
function event_espresso_display_quickpay_settings() {
	$quickpay_settings = get_option('event_espresso_quickpay_settings');
		if(empty($quickpay_settings['quickpay_merchantid'])) $quickpay_settings['quickpay_merchantid'] = '';
		if(empty($quickpay_settings['quickpay_md5secret'])) $quickpay_settings['quickpay_md5secret'] = '';
		if(empty($quickpay_settings['quickpay_language'])) $quickpay_settings['quickpay_language'] = 'en';
		if(empty($quickpay_settings['quickpay_autocapture'])) $quickpay_settings['quickpay_autocapture'] = '1';
		if(empty($quickpay_settings['quickpay_currency'])) $quickpay_settings['quickpay_currency'] = 'USD';
		if(empty($quickpay_settings['use_sandbox'])) $quickpay_settings['use_sandbox'] = '0';
	?>
	<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top"><ul>
						<li>
							<label for="quickpay_merchantid">
	<?php _e('quickpay I.D.', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="quickpay_merchantid" size="35" value="<?php echo $quickpay_settings['quickpay_merchantid']; ?>">
						</li>
						<li>
							<label for="quickpay_md5secret">
	<?php _e('quickpay md5 secret:', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="quickpay_md5secret" size="35" value="<?php echo $quickpay_settings['quickpay_md5secret']; ?>">
						</li>
												<li>
													<label for="quickpay_language">Payment Window Language</label>
													<select name='quickpay_language'>
														<option value="<?php echo $quickpay_settings['quickpay_language'];?>" selected='selected'" ><?php echo $quickpay_settings['quickpay_language'];?>
														<option value='da'>da - Danish</option>
														<option value='de'>de - German</option>
														<option value='en'>en - English</option>
														<option value='fr'>fr - French</option>
														<option value='it'>it - Italian</option>
														<option value='no'>no - Norwegian</option>
														<option value='nl'>nl - Dutch</option>
														<option value='pl'>pl - Polish</option>
														<option value='se'>se - Swedish</option>
													</select>
													<p><small>Choose which language the transaction window will use.</small></p>
												</li>
												<li>
													<label for="quickpay_autocapture">Automatic capture</label>
													<?php
													if ($quickpay_settings['quickpay_autocapture']=='0') { ?>
														<input name="quickpay_autocapture" value="0" checked="checked" type="RADIO">Off<br>
													<?php }
													else { ?>
														<input name="quickpay_autocapture" value="0" type="RADIO">Off<br>
													<?php }
													if ($quickpay_settings['quickpay_autocapture']=='1') { ?>
														<input name="quickpay_autocapture" value="1" checked="checked" type="RADIO">On<br>
													<?php }
													else { ?>
														<input name="quickpay_autocapture" value="1" type="RADIO">On<br>
													<?php } ?>
													<p><small>Automatic Capture means you will automatically deduct the amount from the customer.</small></p>
												</li>
												<li>
													<label for="quickpay_currency">Currency</label>
													<input name="quickpay_currency" value="EUR" <?php if ($quickpay_settings['quickpay_currency']=='EUR') { ?>checked="checked"<?php } ?> type="RADIO">EUR<br>
													<input name="quickpay_currency" value="DKK" <?php if ($quickpay_settings['quickpay_currency']=='DKK') { ?>checked="checked"<?php } ?> type="RADIO">DKK<br>
													<input name="quickpay_currency" value="USD" <?php if ($quickpay_settings['quickpay_currency']=='USD') { ?>checked="checked"<?php } ?> type="RADIO">USD<br>
												</li>
					</ul></td>
										<td>
											<li>
							<label for="use_sandbox">
															<?php _e('Use the debugging feature and the sandbox', 'event_espresso'); ?>
							</label>
							<input name="use_sandbox" type="checkbox" value="1" <?php echo $quickpay_settings['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
						</li>
										</td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_quickpay" value="update_quickpay">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update quickpay Settings', 'event_espresso') ?>" id="save_quickpay_settings" />
		</p>
		<?php wp_nonce_field( 'espresso_form_check', 'add_quickpay_settings' ); ?>
	</form>
	<?php
}
