<?php

function event_espresso_2checkout_payment_settings() {
	if (isset($_POST['update_2checkout'])) {
		//$2checkout_settings = get_option('event_espresso_2checkout_settings');
		$twocheckout_settings['2checkout_id'] = $_POST['2checkout_id'];
		$twocheckout_settings['2checkout_username'] = $_POST['2checkout_username'];
		$twocheckout_settings['currency_format'] = $_POST['currency_format'];
		$twocheckout_settings['use_sandbox'] = $_POST['use_sandbox'];
		$twocheckout_settings['bypass_payment_page'] = $_POST['bypass_payment_page'];
		$twocheckout_settings['button_url'] = $_POST['button_url'];
		update_option('event_espresso_2checkout_settings', $twocheckout_settings);
		echo '<div id="message" class="updated fade"><p><strong>' . __('2checkout settings saved.', 'event_espresso') . '</strong></p></div>';
	}
	?>

	<div class="metabox-holder">
		<div class="postbox">
			<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('2checkout Settings', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<div class="padding">
					<?php
					if (isset($_REQUEST['activate_2checkout']) && $_REQUEST['activate_2checkout'] == 'true') {
						add_option("events_2checkout_active", 'true', '', 'yes');
						$twocheckout_settings['2checkout_id'] = '';
						$twocheckout_settings['2checkout_username'] = '';
						$twocheckout_settings['currency_format'] = 'USD';
						$twocheckout_settings['use_sandbox'] = NULL;
						$twocheckout_settings['bypass_payment_page'] = 'N';
						$twocheckout_settings['button_url'] = '';
						add_option("event_espresso_2checkout_settings", $twocheckout_settings, '', 'yes');
					}
					if (isset($_REQUEST['reactivate_2checkout']) && $_REQUEST['reactivate_2checkout'] == 'true') {
						update_option('events_2checkout_active', 'true');
					}
					if (isset($_REQUEST['deactivate_2checkout']) && $_REQUEST['deactivate_2checkout'] == 'true') {
						update_option('events_2checkout_active', 'false');
					}
					echo '<ul>';
					switch (get_option('events_2checkout_active')) {
						case 'false':
							echo '<li>2checkout Gateway is installed.</li>';
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_2checkout=true\';" class="green_alert pointer"><strong>' . __('Activate 2checkout IPN?', 'event_espresso') . '</strong></li>';
							break;
						case 'true':
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_2checkout=true\';" class="red_alert pointer"><strong>' . __('Deactivate 2checkout IPN?', 'event_espresso') . '</strong></li>';
							event_espresso_display_2checkout_settings();

							break;
						default:
							echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_2checkout=true\';" class="yellow_alert pointer"><strong>' . __('The 2checkout IPN addon is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
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

//2checkout Settings Form
function event_espresso_display_2checkout_settings() {
	$twocheckout_settings = get_option('event_espresso_2checkout_settings');
	if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/2checkout/logo.png")) {
		$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/2checkout/logo.png";
	} else {
		$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/2checkout/logo.png";
	}
	?>
	<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top"><ul>
						<li>
							<label for="2checkout_id">
								<?php _e('2checkout I.D.', 'event_espresso'); ?>
							</label>
							<br />
							<input type="text" name="2checkout_id" size="35" value="<?php echo empty($twocheckout_settings['2checkout_id']) ? '' : $twocheckout_settings['2checkout_id']; ?>">
							<br />
							<?php _e('(Typically 87654321)', 'event_espresso'); ?>
						</li>
						<li>
							<label for="2checkout_username">
								<?php _e('2checkout username', 'event_espresso'); ?>
							</label>
							<br />
							<input type="text" name="2checkout_username" size="35" value="<?php echo empty($twocheckout_settings['2checkout_username']) ? '' : $twocheckout_settings['2checkout_username']; ?>">
							<br />
							<?php _e('(Typically TestAccount)', 'event_espresso'); ?>
						</li>
						<li>
							<label for="currency_format">
								<?php _e('Select the currency for your country:', 'event_espresso'); ?>
							</label>
							<br />
							<select name="currency_format">
								<?php if (!empty($twocheckout_settings['currency_format'])) { ?>
									<option value="<?php echo $twocheckout_settings['currency_format']; ?>"><?php echo $twocheckout_settings['currency_format']; ?></option><?php } ?>
								<option value="USD">
									<?php _e('U.S. Dollars ($)', 'event_espresso'); ?>
								</option>
								<option value="AUD">
									<?php _e('Australian Dollars (A $)', 'event_espresso'); ?>
								</option>
								<option value="GBP">
									<?php _e('Pounds Sterling (&pound;)', 'event_espresso'); ?>
								</option>
								<option value="CAD">
									<?php _e('Canadian Dollars (C $)', 'event_espresso'); ?>
								</option>
								<option value="CZK">
									<?php _e('Czech Koruna', 'event_espresso'); ?>
								</option>
								<option value="DKK">
									<?php _e('Danish Krone', 'event_espresso'); ?>
								</option>
								<option value="EUR">
									<?php _e('Euros (&#8364;)', 'event_espresso'); ?>
								</option>
								<option value="HKD">
									<?php _e('Hong Kong Dollar ($)', 'event_espresso'); ?>
								</option>
								<option value="HUF">
									<?php _e('Hungarian Forint', 'event_espresso'); ?>
								</option>
								<option value="ILS">
									<?php _e('Israeli Shekel', 'event_espresso'); ?>
								</option>
								<option value="JPY">
									<?php _e('Yen (&yen;)', 'event_espresso'); ?>
								</option>
								<option value="MXN">
									<?php _e('Mexican Peso', 'event_espresso'); ?>
								</option>
								<option value="NZD">
									<?php _e('New Zealand Dollar ($)', 'event_espresso'); ?>
								</option>
								<option value="NOK">
									<?php _e('Norwegian Krone', 'event_espresso'); ?>
								</option>
								<option value="PLN">
									<?php _e('Polish Zloty', 'event_espresso'); ?>
								</option>
								<option value="SGD">
									<?php _e('Singapore Dollar ($)', 'event_espresso'); ?>
								</option>
								<option value="SEK">
									<?php _e('Swedish Krona', 'event_espresso'); ?>
								</option>
								<option value="BRL">
									<?php _e('Brazilian Real (only for Brazilian users)', 'event_espresso'); ?>
								</option>
								<option value="MYR">
									<?php _e('Malaysian Ringgits (only for Malaysian users)', 'event_espresso'); ?>
								</option>
								<option value="PHP">
									<?php _e('Philippine Pesos', 'event_espresso'); ?>
								</option>
								<option value="TWD">
									<?php _e('Taiwan New Dollars', 'event_espresso'); ?>
								</option>
								<option value="THB">
									<?php _e('Thai Baht', 'event_espresso'); ?>
								</option>
							</select>
							<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=currency_info"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a> </li>
						<li>
							<label for="button_url">
								<?php _e('Button Image URL: ', 'event_espresso'); ?>
							</label>
							<br />
							<input type="text" name="button_url" size="34" value="<?php echo (empty($twocheckout_settings['button_url']) ? '' : $twocheckout_settings['button_url'] ); ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=button_image"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a> </li>
					</ul></td>
				<td valign="top"><ul>
						<label for="bypass_payment_page">
							<?php _e('By-pass the payment confirmation page?', 'event_espresso'); ?>
						</label>
						<?php
						$values = array(
								array('id' => 'N', 'text' => __('No', 'event_espresso')),
								array('id' => 'Y', 'text' => __('Yes', 'event_espresso')));
						echo select_input('bypass_payment_page', $values, empty($twocheckout_settings['bypass_payment_page']) ? '' : $twocheckout_settings['bypass_payment_page']);
						?>
						&nbsp;<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=bypass_confirmation"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a></li>
						<li>
							<label for="use_sandbox">
								<?php _e('Use the debugging feature and the', 'event_espresso'); ?> <a href="https://developer.2checkout.com/devscr?cmd=_home||https://cms.2checkout.com/us/cgi-bin/?&amp;cmd=_render-content&amp;content_ID=developer/howto_testing_sandbox||https://cms.2checkout.com/us/cgi-bin/?&amp;cmd=_render-content&amp;content_ID=developer/howto_testing_sandbox_get_started" title="2checkout Sandbox Login||Sandbox Tutorial||Getting Started with 2checkout Sandbox" target="_blank"><?php _e('2checkout Sandbox', 'event_espresso'); ?></a>?
							</label>
							<input name="use_sandbox" type="checkbox" value="1" <?php echo $twocheckout_settings['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
							&nbsp;<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=sandbox_info"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a><br />
						</li>
						<li>
							<?php _e('Current Button Image:', 'event_espresso'); ?>
							<br />
							<?php echo (empty($twocheckout_settings['button_url']) ? '<img src="' . $button_url . '" />' : '<img src="' . $twocheckout_settings['button_url'] . '" />'); ?></li>
						<li><strong><?php _e('2checkout Notes:', 'event_espresso'); ?></strong><br /><?php _e('For 2checkout IPN to work, you need a Business or Premier account.', 'event_espresso'); ?></li>
					</ul></td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_2checkout" value="update_2checkout">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update 2checkout Settings', 'event_espresso') ?>" id="save_2checkout_settings" />
		</p>
	</form>
	<div id="sandbox_info" style="display:none">
		<h2><?php _e('2checkout Sandbox', 'event_espresso'); ?></h2>
		<p><?php _e('In addition to using the 2checkout Sandbox fetaure. The debugging feature will also output the form varibales to the payment page, send an email to the admin that contains the all 2checkout variables.', 'event_espresso'); ?></p>
		<hr />
		<p><?php _e('The 2checkout Sandbox is a testing environment that is a duplicate of the live 2checkout site, except that no real money changes hands. The Sandbox allows you to test your entire integration before submitting transactions to the live 2checkout environment. Create and manage test accounts, and view emails and API credentials for those test accounts.', 'event_espresso'); ?></p>
	</div>
	<div id="currency_info" style="display:none">
		<h2><?php _e('2checkout Currency', 'event_espresso'); ?></h2>
		<p><?php _e('2checkout uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is US Dollars (USD). If you want to require or accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that 2checkout (currently) supports.', 'event_espresso'); ?> </p>
	</div>
	<?php
}
