<?php
function event_espresso_paypal_payment_settings() {
	global $notices, $espresso_wp_user;
	
	//Debug
	//echo '<p>$espresso_wp_user = '.$espresso_wp_user.'</p>';
	
	$old_payment_settings = get_option('payment_data_'.$espresso_wp_user);
	//Debug
	//echo '<pre>'.print_r($old_payment_settings, true).'</pre>';
	
	$payment_settings = get_option('payment_data_'.$espresso_wp_user);
	//Debug
	//echo '<pre>'.print_r($payment_settings, true).'</pre>';
	
	if (isset($_POST['update_paypal'])) {
		
		//Debug
		//echo '<pre>'.print_r($_POST).'</pre>';
		
		$payment_settings['paypal']['paypal_id'] = $_POST['paypal_id'];
		$payment_settings['paypal']['image_url'] = $_POST['image_url'];
		$payment_settings['paypal']['currency_format'] = $_POST['currency_format'];
		$payment_settings['paypal']['surcharge'] = $_POST['surcharge'];
		$payment_settings['paypal']['use_sandbox'] = $_POST['use_sandbox'];
		$payment_settings['paypal']['bypass_payment_page'] = $_POST['bypass_payment_page'];
		$payment_settings['paypal']['no_shipping'] = $_POST['no_shipping'];
		$payment_settings['paypal']['button_url'] = $_POST['button_url'];
	   
	   	//Debug
		//echo '<pre>'.print_r($payment_settings, true).'</pre>';
		
		if (update_option( 'payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings ) == true){
			$notices['updates'][] = __('PayPal Payment Settings Updated!', 'event_espresso'). ' ' .$espresso_wp_user;
		}
	}
	?>
<a name="paypal" id="paypal"></a>
<div class="metabox-holder">
	<div class="postbox">
		<div title="Click to toggle" class="handlediv"><br />
		</div>
		<h3 class="hndle">
			<?php _e('PayPal Standard Settings', 'event_espresso'); ?>
		</h3>
		<div class="inside">
			<div class="padding">
				<?php
				if (isset($_REQUEST['activate_paypal'])&&$_REQUEST['activate_paypal'] == 'true') {
					$payment_settings['paypal']['active'] = true;
					if (add_option( 'payment_data_'.$espresso_wp_user, $payment_settings, '', 'no' ) == true){
						$notices['updates'][] = __('PayPal Payments Activated', 'event_espresso');
					}elseif (update_option('payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings) == true){
						$notices['updates'][] = __('PayPal Payments Activated', 'event_espresso');
					}else{
						$notices['errors'][] = __('Unable to Activate PayPal Payments', 'event_espresso');
					}
				}
				if (isset($_REQUEST['reactivate_paypal'])&&$_REQUEST['reactivate_paypal'] == 'true') {
					$payment_settings['paypal']['active'] = true;
					if (update_option('payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings) == true){
						$notices['updates'][] = __('PayPal Payments Activated', 'event_espresso');
					}else{
						$notices['errors'][] = __('Unable to Activate PayPal Payments', 'event_espresso');
					}
				}
				if (isset($_REQUEST['deactivate_paypal'])&&$_REQUEST['deactivate_paypal'] == 'true') {
					$payment_settings['paypal']['active'] = false;
					if (update_option( 'payment_data_'.$espresso_wp_user, $payment_settings, $old_payment_settings) == false){
						$notices['updates'][] = __('PayPal Payments De-activated', 'event_espresso');
					}
					else{
						$notices['errors'][] = __('Unable to De-activate PayPal Payments', 'event_espresso');
					}
				}
				echo '<ul>';
				if (!isset($payment_settings['paypal']['active'])){
					echo '<li style="width:50%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&activate_paypal=true#paypal\';" class="yellow_alert pointer"><strong>' . __('PayPal Standard Payments is installed. Would you like to activate it?','event_espresso') . '</strong></li>';
				}else{
					switch ($payment_settings['paypal']['active']) {
						
						case false:
							echo '<li>PayPal Gateway is installed.</li>';
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&reactivate_paypal=true#paypal\';" class="green_alert pointer"><strong>' . __('Activate PayPal Standard?', 'event_espresso') . '</strong></li>';
							break;
						
						case true:
							echo '<li style="width:30%;" onclick="location.href=\'' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page=payment_gateways&deactivate_paypal=true#paypal\';" class="red_alert pointer"><strong>' . __('Deactivate PayPal Standard?', 'event_espresso') . '</strong></li>';
							event_espresso_display_paypal_settings();
	
							break;
					}
				}
				echo '</ul>';
				?>
			</div>
		</div>
	</div>
</div>
<?php
	//This line keeps the notices from displaying twice
	if ( did_action( 'espresso_admin_notices' ) == false )
		do_action('espresso_admin_notices');
} 

//PayPal Settings Form
function event_espresso_display_paypal_settings() {
	global $org_options, $espresso_wp_user; 
	$payment_settings = get_option('payment_data_'.$espresso_wp_user);
	if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/btn_stdCheckout2.gif")) {
		$button_url = EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/btn_stdCheckout2.gif";
	} else {
		$button_url = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/paypal/btn_stdCheckout2.gif";
	}
	?>
<form method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>#paypal">
	<table width="99%" border="0" cellspacing="5" cellpadding="5">
		<tr>
			<td valign="top"><ul>
					<li>
						<label for="paypal_id">
							<?php _e('Paypal I.D.', 'event_espresso'); ?>
						</label>
						<input type="text" name="paypal_id" size="35" value="<?php echo $payment_settings['paypal']['paypal_id']; ?>"><br />
						<?php _e('(Typically payment@yourdomain.com)', 'event_espresso'); ?>
					</li>
					<li>
						<label for="no_shipping">
							<?php _e('Shipping address options?', 'event_espresso'); ?> <?php apply_filters( 'espresso_help', 'no_shipping'); ?>
						</label>
						<?php
							$values = array(
								array('id' => '1', 'text' => __('Do not prompt for an address', 'event_espresso')),
								array('id' => '0', 'text' => __('Prompt for an address, but do not require one', 'event_espresso')),
								array('id' => '2', 'text' => __('Prompt for an address, and require one', 'event_espresso')));
							echo select_input('no_shipping', $values, $payment_settings['paypal']['no_shipping']);
							?>
						</li>
					
					<li>
						<label for="button_url">
							<?php _e('Button Image URL: ', 'event_espresso'); ?>
						</label>

						<input type="text" name="button_url" size="34" value="<?php echo (($payment_settings['paypal']['button_url'] == '') ? $button_url : $payment_settings['paypal']['button_url'] ); ?>" />
						<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=button_image"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a> </li>
					<li>
						<label for="image_url">
							<?php _e('Image URL (logo for payment page):', 'event_espresso'); ?>
						</label>

						<input type="text" name="image_url" size="35" value="<?php echo $payment_settings['paypal']['image_url']; ?>" />
						<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=image_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=image_url_info"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a><br />
						<?php _e('(used for your business/personal logo on the PayPal page)', 'event_espresso'); ?>
					</li>
				</ul></td>
			<td valign="top"><ul>
			<li>
						<label for="currency_format">
							<?php _e('Select the currency for your country:', 'event_espresso'); ?> <?php apply_filters( 'espresso_help', 'currency_info'); ?>
						</label>
						
						<select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
							<option value="<?php echo $payment_settings['paypal']['currency_format']; ?>"><?php echo $payment_settings['paypal']['currency_format']; ?></option>
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
							<option value="CHF">
							<?php _e('Swiss Franc', 'event_espresso'); ?>
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
					<li><label for="bypass_payment_page">
						<?php _e('By-pass the payment confirmation page?', 'event_espresso'); ?> <?php apply_filters( 'espresso_help', 'bypass_confirmation'); ?>
					</label>
					<?php
						$values = array(
							array('id' => 'N', 'text' => __('No', 'event_espresso')),
							array('id' => 'Y', 'text' => __('Yes', 'event_espresso')));
						echo select_input('bypass_payment_page', $values, $payment_settings['paypal']['bypass_payment_page']);
						?>
				
					</li>
					
					<li>
						<label for="use_sandbox">
							<?php _e('Use the debugging feature and the', 'event_espresso'); ?>
							<a href="https://developer.paypal.com/devscr?cmd=_home||https://cms.paypal.com/us/cgi-bin/?&amp;cmd=_render-content&amp;content_ID=developer/howto_testing_sandbox||https://cms.paypal.com/us/cgi-bin/?&amp;cmd=_render-content&amp;content_ID=developer/howto_testing_sandbox_get_started" title="PayPal Sandbox Login||Sandbox Tutorial||Getting Started with PayPal Sandbox" target="_blank">
							<?php _e('PayPal Sandbox', 'event_espresso'); ?>
							</a> <?php apply_filters( 'espresso_help', 'sandbox_info'); ?></label>
						<input name="use_sandbox" type="checkbox" value="1" <?php echo $payment_settings['paypal']['use_sandbox'] == "1" ? 'checked="checked"' : '' ?> />
						
					</li>
					<li>
						<?php _e('Current Button Image:', 'event_espresso'); ?>
						<br />
						<?php echo (($payment_settings['paypal']['button_url'] == '') ? '<img src="' . $button_url . '" />' : '<img src="' . $payment_settings['paypal']['button_url'] . '" />'); ?></li>
					<li><strong>
						<?php _e('Paypal Notes:', 'event_espresso'); ?>
						</strong><br />
						<?php _e('For Paypal IPN to work, you need a Business or Premier account.', 'event_espresso'); ?>
					</li>
				</ul></td>
		</tr>
	</table>
	<p>
		<input type="hidden" name="update_paypal" value="update_paypal">
		<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update PayPal Settings', 'event_espresso') ?>" id="save_paypal_settings" />
	</p>
</form>
<div id="sandbox_info" style="display:none">
	<h2>
		<?php _e('PayPal Sandbox', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('In addition to using the PayPal Sandbox fetaure. The debugging feature will also output the form varibales to the payment page, send an email to the admin that contains the all PayPal variables.', 'event_espresso'); ?>
	</p>
	<hr />
	<p>
		<?php _e('The PayPal Sandbox is a testing environment that is a duplicate of the live PayPal site, except that no real money changes hands. The Sandbox allows you to test your entire integration before submitting transactions to the live PayPal environment. Create and manage test accounts, and view emails and API credentials for those test accounts.', 'event_espresso'); ?>
	</p>
</div>
<div id="image_url_info" style="display:none">
	<h2>
		<?php _e('PayPal Image URL (logo for payment page)', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('The URL of the 150x50-pixel image displayed as your logo in the upper left corner of the PayPal checkout pages.', 'event_espresso'); ?>
	</p>
	<p>
		<?php _e('Default - Your business name, if you have a Business account, or your email address, if you have Premier or Personal account.', 'event_espresso'); ?>
	</p>
</div>
<div id="currency_info" style="display:none">
	<h2>
		<?php _e('PayPal Currency', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('PayPal uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is US Dollars (USD). If you want to require or accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that PayPal (currently) supports.', 'event_espresso'); ?>
	</p>
</div>
<div id="surcharge" style="display:none">
	<h2>
		<?php _e('Payment Surcharge', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('Please enter a decimal number indicating a percent surcharge. For example, if you enter 3.00, 3% will be added to the final price of the event during the checkout. If the event price is initially $100, the price with the surcharge will be $103.<br /> This surcharge will apply to all new events.  However, you will have the ability to change this value during the event creation.', 'event_espresso'); ?>
	</p>
</div>
<div id="no_shipping" style="display:none">
	<h2>
		<?php _e('Shipping Address', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('By default, PayPal will display shipping address information on the PayPal payment screen. If you plan on shipping items to a registrant (shirts, invoices, etc) then use this option. Otherwise it should not be used, as it will require a shipping address when someone registers for an event.', 'event_espresso'); ?>
	</p>
</div>
<?php
}

