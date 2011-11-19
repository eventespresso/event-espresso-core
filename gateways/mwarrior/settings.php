<?php

function event_espresso_mwarrior_payment_settings() {
	if (isset($_POST['update_mwarrior'])) {
		//$mwarrior_settings = get_option('event_espresso_mwarrior_settings');
		$mwarrior_settings['mwarrior_id'] = $_POST['mwarrior_id'];
		$mwarrior_settings['mwarrior_apikey'] = $_POST['mwarrior_apikey'];
		$mwarrior_settings['mwarrior_passphrase'] = $_POST['mwarrior_passphrase'];
		$mwarrior_settings['image_url'] = $_POST['image_url'];
		$mwarrior_settings['currency_format'] = $_POST['currency_format'];
		$mwarrior_settings['use_sandbox'] = $_POST['use_sandbox'];
		$mwarrior_settings['bypass_payment_page'] = $_POST['bypass_payment_page'];
		$mwarrior_settings['button_url'] = $_POST['button_url'];
		update_option('event_espresso_mwarrior_settings', $mwarrior_settings);
		echo '<div id="message" class="updated fade"><p><strong>' . __('Mwarrior settings saved.', 'event_espresso') . '</strong></p></div>';
	}
	?>

	<div class="metabox-holder">
		<div class="postbox">
		<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('Merchant Warrior Settings', 'event_espresso'); ?>
			</h3>
							<div class="inside">
			<div class="padding">
				<?php
				if (isset($_REQUEST['activate_mwarrior']) && $_REQUEST['activate_mwarrior'] == 'true') {
					add_option("events_mwarrior_active", 'true', '', 'yes');
					add_option("event_espresso_mwarrior_settings", '', '', 'yes');
				}
				if (isset($_REQUEST['reactivate_mwarrior']) && $_REQUEST['reactivate_mwarrior'] == 'true') {
					update_option('events_mwarrior_active', 'true');
				}
				if (isset($_REQUEST['deactivate_mwarrior']) && $_REQUEST['deactivate_mwarrior'] == 'true') {
					update_option('events_mwarrior_active', 'false');
				}
				echo '<ul>';
				switch (get_option('events_mwarrior_active')) {
					case 'false':
						echo '<li>Merchant Warrior Gateway is installed.</li>';
						echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_mwarrior=true\';" class="green_alert pointer"><strong>' . __('Activate Merchant Warrior IPN?', 'event_espresso') . '</strong></li>';
						break;
					case 'true':
						echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_mwarrior=true\';" class="red_alert pointer"><strong>' . __('Deactivate Merchant Warrior IPN?', 'event_espresso') . '</strong></li>';
						event_espresso_display_mwarrior_settings();
						// insert a new field
						global $wpdb;
						$result = $wpdb->query("ALTER TABLE " . EVENTS_ATTENDEE_TABLE . " ADD hashSalt varchar(20) NOT NULL AFTER checked_in_quantity");
						break;
					default:
						echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_mwarrior=true\';" class="yellow_alert pointer"><strong>' . __('The Merchant Warrior IPN addon is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
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

//Mwarrior Settings Form
function event_espresso_display_mwarrior_settings() {
	$mwarrior_settings = get_option('event_espresso_mwarrior_settings');
	if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/mwarrior/btn_checkout.png")) {
		$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/mwarrior/btn_checkout.png";
	} else {
		$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/mwarrior/btn_checkout.png";
	}
	?>
	<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top"><ul>
						<li>
							<label for="mwarrior_id">
								<?php _e('MW Merchant UUID', 'event_espresso'); ?>
							</label>
							<br />
							<input type="text" name="mwarrior_id" size="35" value="<?php echo $mwarrior_settings['mwarrior_id']; ?>">
						</li>
						<li>
							<label for="mwarrior_apikey">
								<?php _e('MW API Key', 'event_espresso'); ?>
							</label>
							<br />
							<input type="text" name="mwarrior_apikey" size="35" value="<?php echo $mwarrior_settings['mwarrior_apikey']; ?>">
						</li>
						<li>
							<label for="mwarrior_passphrase">
								<?php _e('MW API Passphrase', 'event_espresso'); ?>
							</label>
							<br />
							<input type="text" name="mwarrior_passphrase" size="35" value="<?php echo $mwarrior_settings['mwarrior_passphrase']; ?>">
						</li>
						<li>
							<label for="currency_format">
								<?php _e('Select the currency for your country:', 'event_espresso'); ?>
							</label>
							<br />
							<select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
								<option value="AUD" <?php echo ($mwarrior_settings['currency_format'] == "AUD") ? "selected" : ""; ?>>
									<?php _e('Australian Dollars (A $)', 'event_espresso'); ?>
								</option>
								<option value="USD" <?php echo ($mwarrior_settings['currency_format'] == "USD") ? "selected" : ""; ?>>
									<?php _e('U.S. Dollars ($)', 'event_espresso'); ?>
								</option>
								<option value="GBP" <?php echo ($mwarrior_settings['currency_format'] == "GBP") ? "selected" : ""; ?>>
									<?php _e('Pounds Sterling (&pound;)', 'event_espresso'); ?>
								</option>
								<option value="CAD" <?php echo ($mwarrior_settings['currency_format'] == "CAD") ? "selected" : ""; ?>>
									<?php _e('Canadian Dollars (C $)', 'event_espresso'); ?>
								</option>
								<option value="EUR" <?php echo ($mwarrior_settings['currency_format'] == "EUR") ? "selected" : ""; ?>>
									<?php _e('Euros (&#8364;)', 'event_espresso'); ?>
								</option>
								<option value="JPY" <?php echo ($mwarrior_settings['currency_format'] == "JPY") ? "selected" : ""; ?>>
									<?php _e('Yen (&yen;)', 'event_espresso'); ?>
								</option>
								<option value="NZD" <?php echo ($mwarrior_settings['currency_format'] == "NZD") ? "selected" : ""; ?>>
									<?php _e('New Zealand Dollar ($)', 'event_espresso'); ?>
								</option>
								<option value="SGD" <?php echo ($mwarrior_settings['currency_format'] == "SGD") ? "selected" : ""; ?>>
									<?php _e('Singapore Dollar ($)', 'event_espresso'); ?>
								</option>
							</select>
							<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=currency_info"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a> </li>
						<li>
							<label for="button_url">
								<?php _e('Button Image URL: ', 'event_espresso'); ?>
							</label>
							<br />
							<input type="text" name="button_url" size="34" value="<?php echo (($mwarrior_settings['button_url'] == '') ? $button_url : $mwarrior_settings['button_url'] ); ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=button_image"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a> </li>
						<li>
							<label for="image_url">
								<?php _e('Image URL (logo for payment page):', 'event_espresso'); ?>
							</label>
							<br />
							<input type="text" name="image_url" size="35" value="<?php echo $mwarrior_settings['image_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=image_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=image_url_info"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a><br />
							<?php _e('(used for your business/personal logo on the Merchant Warrior page)', 'event_espresso'); ?>
						</li>
					</ul></td>
				<td valign="top"><ul>
						<li>
							<label for="bypass_payment_page">
								<?php _e('By-pass the payment confirmation page?', 'event_espresso'); ?>
							</label>
							<?php
							$values = array(
								array('id' => 'N', 'text' => __('No', 'event_espresso')),
								array('id' => 'Y', 'text' => __('Yes', 'event_espresso')));
							echo select_input('bypass_payment_page', $values, $mwarrior_settings['bypass_payment_page']);
							?>
							&nbsp;<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=bypass_confirmation"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a></li>
						<li>
							<label for="use_sandbox">
								<?php _e('Use the Test Mode for Merchant Warrior', 'event_espresso'); ?>
							</label>
							<input name="use_sandbox" type="checkbox" value="1" <?php echo $mwarrior_settings['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
							&nbsp;<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=sandbox_info"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a><br />
						</li>
						<li>
							<?php _e('Current Button Image:', 'event_espresso'); ?>
							<br />
							<?php echo (($mwarrior_settings['button_url'] == '') ? '<img src="' . $button_url . '" />' : '<img src="' . $mwarrior_settings['button_url'] . '" />'); ?></li>
					</ul></td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_mwarrior" value="update_mwarrior">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Merchant Warrior Settings', 'event_espresso') ?>" id="save_mwarrior_settings" />
		</p>
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
