<?php

function event_espresso_eway_payment_settings() {
	if (isset($_POST['update_eway']) && check_admin_referer('espresso_form_check', 'add_eway_settings')) {
		//$eway_settings = get_option('event_espresso_eway_settings');
		$eway_settings['eway_id'] = $_POST['eway_id'];
		$eway_settings['eway_username'] = $_POST['eway_username'];
		$eway_settings['image_url'] = $_POST['image_url'];
		$eway_settings['currency_format'] = $_POST['currency_format'];
		$eway_settings['surcharge'] = empty($_POST['surcharge']) ? '' : $_POST['surcharge'];
		$eway_settings['use_sandbox'] = empty($_POST['use_sandbox']) ? '' : $_POST['use_sandbox'];
		$eway_settings['bypass_payment_page'] = $_POST['bypass_payment_page'];
		$eway_settings['no_shipping'] = $_POST['no_shipping'];
		$eway_settings['button_url'] = $_POST['button_url'];
		$eway_settings['region'] = $_POST['region'];
		update_option('event_espresso_eway_settings', $eway_settings);
		echo '<div id="message" class="updated fade"><p><strong>' . __('eway settings saved.', 'event_espresso') . '</strong></p></div>';
	}
	?>

	<div class="metabox-holder">
		<div class="postbox">
		<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle">
				<?php _e('eway Settings', 'event_espresso'); ?>
			</h3>
							<div class="inside">
			<div class="padding">
				<?php
				if (isset($_REQUEST['activate_eway']) && $_REQUEST['activate_eway'] == 'true') {
					add_option("events_eway_active", 'true', '', 'yes');
					add_option("event_espresso_eway_settings", '', '', 'yes');
					//update_option( 'event_espresso_payment_gateway', 'eway');
				}
				if (isset($_REQUEST['reactivate_eway']) && $_REQUEST['reactivate_eway'] == 'true') {
					update_option('events_eway_active', 'true');
					//update_option( 'event_espresso_payment_gateway', 'eway');
				}
				if (isset($_REQUEST['deactivate_eway']) && $_REQUEST['deactivate_eway'] == 'true') {
					update_option('events_eway_active', 'false');
					//update_option( 'event_espresso_payment_gateway', '');
				}
				echo '<ul>';
				switch (get_option('events_eway_active')) {
					case 'false':
						echo '<li>eway Gateway is installed.</li>';
						echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_eway=true\';" class="green_alert pointer"><strong>' . __('Activate eway IPN?', 'event_espresso') . '</strong></li>';
						break;
					case 'true':
						echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_eway=true\';" class="red_alert pointer"><strong>' . __('Deactivate eway IPN?', 'event_espresso') . '</strong></li>';
						event_espresso_display_eway_settings();

						break;
					default:
						echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_eway=true\';" class="yellow_alert pointer"><strong>' . __('The eway IPN addon is installed. Would you like to activate it?', 'event_espresso') . '</strong></li>';
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

//eway Settings Form
function event_espresso_display_eway_settings() {
	$eway_settings = get_option('event_espresso_eway_settings');
	if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/eway/eway_logo.png")) {
		$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/eway/eway_logo.png";
	} else {
		$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/eway/eway_logo.png";
	}
	?>
	<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
		<table width="99%" border="0" cellspacing="5" cellpadding="5">
			<tr>
				<td valign="top"><ul>
						<li>
							<label for="eway_id">
								<?php _e('eway I.D.', 'event_espresso'); ?>
							</label>
							<input class="regular-text" type="text" name="eway_id" size="35" value="<?php echo $eway_settings['eway_id']; ?>">
							<br />
							<?php _e('(Typically 87654321)', 'event_espresso'); ?>
						</li>
						<li>
							<label for="eway_username">
								<?php _e('eway username', 'event_espresso'); ?>
							</label>
							<input class="regular-text" type="text" name="eway_username" size="35" value="<?php echo $eway_settings['eway_username']; ?>">
							<br />
							<?php _e('(Typically TestAccount)', 'event_espresso'); ?>
						</li>
						
						<li>
							<label for="button_url">
								<?php _e('Button Image URL: ', 'event_espresso'); ?> <?php apply_filters( 'espresso_help', 'eway_button_image'); ?>
							</label>
							<input class="regular-text" type="text" name="button_url" size="34" value="<?php echo (($eway_settings['button_url'] == '') ? '' : $eway_settings['button_url'] ); ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <br />
<?php echo (($eway_settings['button_url'] == '') ? '<img src="' . $button_url . '" />' : '<img src="' . $eway_settings['button_url'] . '" />'); ?></li>
						<li>
							<label for="image_url">
								<?php _e('Image URL (logo for payment page):', 'event_espresso'); ?> <?php apply_filters( 'espresso_help', 'eway_image_url_info'); ?>
							</label>
							<input class="regular-text" type="text" name="image_url" size="35" value="<?php echo $eway_settings['image_url']; ?>" />
							<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=image_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <br />
							<?php _e('(used for your business/personal logo on the eway page)', 'event_espresso'); ?>
						</li>
					</ul></td>
				<td valign="top"><ul>
				<li>
							<label for="currency_format">
								<?php _e('Select the currency for your country: ', 'event_espresso'); ?> <?php echo apply_filters('espresso_help', 'eway_currency_info') ?>
							</label>
							<select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
								<option value="<?php echo $eway_settings['currency_format']; ?>"><?php echo $eway_settings['currency_format']; ?></option>
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
				</li>
				<li>
						<label for="bypass_payment_page">
							<?php _e('By-pass the payment confirmation page?', 'event_espresso'); ?> <?php apply_filters( 'espresso_help', 'eway_bypass_confirmation'); ?>
						</label>
						<?php
						$values = array(
							array('id' => 'N', 'text' => __('No', 'event_espresso')),
							array('id' => 'Y', 'text' => __('Yes', 'event_espresso')));
						echo select_input('bypass_payment_page', $values, $eway_settings['bypass_payment_page']);
						?></li>
						<li>
							<label for="no_shipping">
								<?php _e('Shipping address options?', 'event_espresso'); ?> <?php apply_filters( 'espresso_help', 'eway_no_shipping'); ?>
							</label>
							<?php
							$values = array(
								array('id' => '1', 'text' => __('Do not prompt for an address', 'event_espresso')),
								array('id' => '0', 'text' => __('Prompt for an address, but do not require one', 'event_espresso')),
								array('id' => '2', 'text' => __('Prompt for an address, and require one', 'event_espresso')));
							echo select_input('no_shipping', $values, $eway_settings['no_shipping']);
							?>
						   </li>
						<li>
							<label for="region">
								<?php _e('Select the region where you want to use eWay:', 'event_espresso'); ?>
							</label>
							<select name="region" class="chzn-select" data-placeholder="Choose a region..." style="width:200px">
								<option value="<?php echo $eway_settings['region']; ?>"><?php echo $eway_settings['region']; ?></option>
								<option value="UK">
									<?php _e('United Kingdom', 'event_espresso'); ?>
								</option>
								<option value="AU">
									<?php _e('Australia', 'event_espresso'); ?>
								</option>
								<option value="NZ">
									<?php _e('New Zealand', 'event_espresso'); ?>
								</option>
							</select>
						</li>
						<li>
							<label for="use_sandbox">
								<?php _e('Use the debugging feature and the eway Sandbox?', 'event_espresso'); ?></a> <?php apply_filters( 'espresso_help', 'eway_sandbox_info'); ?>
							</label>
							<input name="use_sandbox" type="checkbox" value="1" <?php echo $eway_settings['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
						   
						</li>
					   
						<li><strong><?php _e('eway Notes:', 'event_espresso'); ?></strong><br /><?php _e('For eway IPN to work, you need a Business or Premier account.', 'event_espresso'); ?></li>
					</ul></td>
			</tr>
		</table>
		<p>
			<input type="hidden" name="update_eway" value="update_eway">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update eway Settings', 'event_espresso') ?>" id="save_eway_settings" />
			<?php wp_nonce_field( 'espresso_form_check', 'add_eway_settings' ); ?>
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
		<p><?php _e('eway uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is US Dollars (USD). If you want to require or accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that eway (currently) supports.', 'event_espresso'); ?> </p>
	</div>
	<div id="eway_surcharge" style="display:none">
		<h2><?php _e('Payment Surcharge', 'event_espresso'); ?></h2>
		<p><?php _e('Please enter a decimal number indicating a percent surcharge. For example, if you enter 3.00, 3% will be added to the final price of the event during the checkout. If the event price is initially $100, the price with the surcharge will be $103.<br /> This surcharge will apply to all new events.  However, you will have the ability to change this value during the event creation.', 'event_espresso'); ?></p></div>
	<div id="eway_no_shipping" style="display:none">
		<h2><?php _e('Shipping Address', 'event_espresso'); ?></h2>
		<p><?php _e('By default, eway will display shipping address information on the eway payment screen. If you plan on shipping items to a registrant (shirts, invoices, etc) then use this option. Otherwise it should not be used, as it will require a shipping address when someone registers for an event.', 'event_espresso'); ?></p>
	</div>
	<?php
}
