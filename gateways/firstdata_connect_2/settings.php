<?php

function event_espresso_firstdata_connect_2_payment_settings() {
	if (isset($_POST['update_firstdata_connect_2'])) {
		$firstdata_connect_2_settings['storename'] = $_POST['storename'];
		$firstdata_connect_2_settings['sharedSecret'] = $_POST['sharedSecret'];
		$firstdata_connect_2_settings['timezone'] = $_POST['timezone'];
		$firstdata_connect_2_settings['sandbox'] = $_POST['sandbox'];
		$firstdata_connect_2_settings['button_url'] = $_POST['button_url'];
		$firstdata_connect_2_settings['bypass_payment_page'] = $_POST['bypass_payment_page'];

		update_option('event_espresso_firstdata_connect_2_settings', $firstdata_connect_2_settings);
		echo '<div id="message" class="updated fade"><p><strong>' . __('First Data connect 2 settings saved.', 'event_espresso') . '</strong></p></div>';
	}
	?>

	<div class="metabox-holder">
		<div class="postbox">
			<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('First Data Connect 2 Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (isset($_REQUEST['activate_firstdata_connect_2']) && $_REQUEST['activate_firstdata_connect_2'] == 'true') {
						add_option("events_firstdata_connect_2_active", 'true', '', 'yes');
						$firstdata_connect_2_settings['storename'] = '';
						$firstdata_connect_2_settings['sharedSecret'] = '';
						$firstdata_connect_2_settings['timezone'] = '';
						$firstdata_connect_2_settings['sandbox'] = '';
						if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata_connect_2/standard_button.gif")) {
							$firstdata_connect_2_settings['button_url'] = EVENT_ESPRESSO_GATEWAY_DIR
											. "/firstdata_connect_2/standard_button.gif";
						} else {
							$firstdata_connect_2_settings['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL
											. "gateways/firstdata_connect_2/standard_button.gif";
						}
						$firstdata_connect_2_settings['bypass_payment_page'] = '';
						add_option("event_espresso_firstdata_connect_2_settings", $firstdata_connect_2_settings, '', 'yes');
					}
					if (isset($_REQUEST['reactivate_firstdata_connect_2']) && $_REQUEST['reactivate_firstdata_connect_2'] == 'true') {
						update_option('events_firstdata_connect_2_active', 'true');
					}
					if (isset($_REQUEST['deactivate_firstdata_connect_2']) && $_REQUEST['deactivate_firstdata_connect_2'] == 'true') {
						update_option('events_firstdata_connect_2_active', 'false');
					}
					echo '<ul>';
					switch (get_option('events_firstdata_connect_2_active')) {
						case 'false':
							echo '<li>First Data Connect 2 is installed.</li>';
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_firstdata_connect_2=true\';" class="green_alert pointer"><strong>' . __('Activate First Data Connect 2?', 'event_espresso') . '</strong></li>';
							break;
						case 'true':
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_firstdata_connect_2=true\';" class="red_alert pointer"><strong>' . __('Deactivate First Data Connect 2?', 'event_espresso') . '</strong></li>';
							event_espresso_display_firstdata_connect_2_settings();
							break;
						default:
							echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_firstdata_connect_2=true\';" class="yellow_alert pointer"><strong>' . __('The First Data Connect 2 support is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
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

//PayPal Settings Form
function event_espresso_display_firstdata_connect_2_settings() {
	$firstdata_connect_2_settings = get_option('event_espresso_firstdata_connect_2_settings');
	$file_location = EVENT_ESPRESSO_GATEWAY_DIR . "firstdata_connect_2";
	?>
	<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top">
					<ul>
						<li>
							<label>
								<?php _e('First Data Storename', 'event_espresso'); ?>
							</label>
							<input class="regular-text" type="text" name="storename" size="35" value="<?php echo $firstdata_connect_2_settings['storename']; ?>">
						</li>
						
						<li>
							<label>
								<?php _e('First Data Shared Secret', 'event_espresso'); ?>
							</label>							
							<input class="regular-text" type="text" name="sharedSecret" size="35" value="<?php echo $firstdata_connect_2_settings['sharedSecret']; ?>">
						</li>
						
						<li>
							<label for="use_sandbox">
								<?php _e('Use the debugging feature and the', 'event_espresso'); ?><?php _e('FirstData Connect 2 Sandbox? ', 'event_espresso'); ?><?php apply_filters('espresso_help', 'sandbox_info_firstdata_connect_2') ?>
							</label>
							<input name="sandbox" type="checkbox" value="1" <?php echo $firstdata_connect_2_settings['sandbox'] == "1" ? 'checked="checked"' : '' ?> />							
						</li>
					</ul>
				</td>
				<td valign="top">
					<ul>
						<li>
							<label for="bypass_payment_page">
								<?php _e('By-pass the payment confirmation page? ', 'event_espresso'); ?><?php apply_filters('espresso_help', 'bypass_confirmation') ?>
							</label>
							<?php
							$values = array(
									array('id' => 'N', 'text' => __('No', 'event_espresso')),
									array('id' => 'Y', 'text' => __('Yes', 'event_espresso')));
							echo select_input('bypass_payment_page', $values, $firstdata_connect_2_settings['bypass_payment_page']);
							?>
						</li>
						
						<li>
							<label for="button_url">
								<?php _e('Button Image URL: ', 'event_espresso'); ?>
							</label>
							<br />
							<input class="regular-text" type="text" name="button_url" size="34" value="<?php echo $firstdata_connect_2_settings['button_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=button_image"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a>
						</li>
						
						<li>
							<label for="timezone">
								<?php _e('Choose a timezone for the transaction? ', 'event_espresso'); ?><?php apply_filters('espresso_help', 'timezone') ?>
							</label>
							<?php
							$values = array(
									array('id' => 'GMT', 'text' => __('GMT', 'event_espresso')),
									array('id' => 'EST', 'text' => __('EST', 'event_espresso')),
									array('id' => 'CST', 'text' => __('CST', 'event_espresso')),
									array('id' => 'MST', 'text' => __('MST', 'event_espresso')),
									array('id' => 'PST', 'text' => __('PST', 'event_espresso')));
							echo select_input('timezone', $values, $firstdata_connect_2_settings['timezone']);
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
	</form>
	<div id="sandbox_info_firstdata_connect_2" style="display:none">
		<h2><?php _e('First Data Sandbox', 'event_espresso'); ?></h2>
		<p><?php _e('In addition to using the First Data Sandbox fetaure. The debugging feature will also output the form varibales to the payment page, send an email to the admin that contains the all First Data variables.', 'event_espresso'); ?></p>
		<hr />
		<p><?php _e('The First Data Sandbox is a testing environment that is a duplicate of the live First Data site, except that no real money changes hands. The Sandbox allows you to test your entire integration before submitting transactions to the live environment. Create and manage test accounts, and view emails and API credentials for those test accounts.', 'event_espresso'); ?></p>
	</div>
	<?php
}
