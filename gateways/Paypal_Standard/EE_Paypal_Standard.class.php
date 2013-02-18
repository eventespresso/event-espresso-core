<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.1.P.7
 *
 * ------------------------------------------------------------------------
 *
 * Payment Gateway - paypal
 *
 * @package			Event Espresso
 * @subpackage		gateways/
 * @author				Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
Class EE_Paypal_Standard extends EE_Offsite_Gateway {

	private static $_instance = NULL;

	public static function instance(EEM_Gateways &$model) {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self($model);
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway = 'Paypal_Standard';
		$this->_button_base = 'paypal-logo.png';
		$this->_path = str_replace('\\', '/', __FILE__);
		$this->gatewayUrl = 'https://www.paypal.com/cgi-bin/webscr';
		$this->addField('rm', '2');		 // Return method = POST
		$this->addField('cmd', '_xclick');
		$this->_btn_img = file_exists( dirname( $this->_path ) . '/lib/' . $this->_button_base ) ? EVENT_ESPRESSO_PLUGINFULLURL . 'gateways/' . $this->_gateway . '/lib/' . $this->_button_base : '';
		parent::__construct($model);
	}

	protected function _default_settings() {
		$this->_payment_settings['paypal_id'] = '';
		$this->_payment_settings['image_url'] = '';
		$this->_payment_settings['currency_format'] = 'USD';
		$this->_payment_settings['use_sandbox'] = false;
		$this->_payment_settings['no_shipping'] = '0';
		$this->_payment_settings['type'] = 'off-site';
		$this->_payment_settings['display_name'] = 'Paypal';
		$this->_payment_settings['current_path'] = '';
		$this->_payment_settings['button_url'] = $this->_btn_img;
	}

	protected function _update_settings() {
		$this->_payment_settings['paypal_id'] = $_POST['paypal_id'];
		$this->_payment_settings['image_url'] = $_POST['image_url'];
		$this->_payment_settings['currency_format'] = $_POST['currency_format'];
		$this->_payment_settings['no_shipping'] = $_POST['no_shipping'];
		$this->_payment_settings['use_sandbox'] = $_POST['use_sandbox'];
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';	
	}

	protected function _display_settings() {
		?>
		<tr>
			<th>
				<label><strong style="color:#F00"><?php _e('Please Note', 'event_espresso'); ?></strong></label>
			</th>
			<td>				
				<?php _e('For PayPal IPN to work, you need a Business or Premier account.', 'event_espresso'); ?>
			</td>
		</tr>

		<tr>
			<th><label for="paypal_id">
					<?php _e('PayPal ID', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="paypal_id" size="35" id="paypal_id" value="<?php echo $this->_payment_settings['paypal_id']; ?>">
				<br />
				<span class="description">
					<?php _e('Typically payment@yourdomain.com', 'event_espresso'); ?>
				</span></td>
		</tr>
		
		<tr>
			<th><label for="currency_format">
					<?php _e('Country Currency', 'event_espresso'); ?>
					<?php do_action('action_hook_espresso_help', 'currency_info'); ?>
				</label></th>
			<td><select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
					<option value="<?php echo $this->_payment_settings['currency_format']; ?>"><?php echo $this->_payment_settings['currency_format']; ?></option>
					<option value="USD">
						<?php _e('U.S. Dollars ($)', 'event_espresso'); ?>
					</option>
					<option value="GBP">
						<?php _e('Pounds Sterling (&pound;)', 'event_espresso'); ?>
					</option>
					<option value="CAD">
						<?php _e('Canadian Dollars (C $)', 'event_espresso'); ?>
					</option>
					<option value="AUD">
						<?php _e('Australian Dollars (A $)', 'event_espresso'); ?>
					</option>
					<option value="BRL">
						<?php _e('Brazilian Real (only for Brazilian users)', 'event_espresso'); ?>
					</option>
					<option value="CHF">
						<?php _e('Swiss Franc', 'event_espresso'); ?>
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
					<option value="MYR">
						<?php _e('Malaysian Ringgits (only for Malaysian users)', 'event_espresso'); ?>
					</option>
					<option value="NOK">
						<?php _e('Norwegian Krone', 'event_espresso'); ?>
					</option>
					<option value="NZD">
						<?php _e('New Zealand Dollar ($)', 'event_espresso'); ?>
					</option>
					<option value="PHP">
						<?php _e('Philippine Pesos', 'event_espresso'); ?>
					</option>
					<option value="PLN">
						<?php _e('Polish Zloty', 'event_espresso'); ?>
					</option>
					<option value="SEK">
						<?php _e('Swedish Krona', 'event_espresso'); ?>
					</option>
					<option value="SGD">
						<?php _e('Singapore Dollar ($)', 'event_espresso'); ?>
					</option>
					<option value="THB">
						<?php _e('Thai Baht', 'event_espresso'); ?>
					</option>
					<option value="TRY">
						<?php _e('Turkish Lira (only for Turkish users)', 'event_espresso'); ?>
					</option>
					<option value="TWD">
						<?php _e('Taiwan New Dollars', 'event_espresso'); ?>
					</option>
				</select></td>
		</tr>

		<tr>
			<th><label for="pp_image_url">
					<?php _e('Image URL', 'event_espresso'); ?>
					<?php do_action('action_hook_espresso_help', 'paypal_image_url_info'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="image_url" id="pp_image_url" size="35" value="<?php echo $this->_payment_settings['image_url']; ?>" />
				<br />
				<span class="description">
					<?php _e('Used for your business/personal logo on the PayPal page', 'event_espresso'); ?>
				</span></td>
		</tr>
		
		<tr>
			<th><label for="use_sandbox">
					<?php _e('Use the Debugging Feature and the PayPal Sandbox', 'event_espresso'); ?>
					<?php do_action('action_hook_espresso_help', 'sandbox_info'); ?>
				</label></th>
			<td><?php echo EE_Form_Fields::select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?></td>
		</tr>
		
		<tr>
			<th>
				<label for="no_shipping">
					<?php _e('Shipping Address Options', 'event_espresso'); ?>
					<?php do_action('action_hook_espresso_help', 'no_shipping'); ?>
				</label>
			</th>
			<td>
			<?php
				$shipping_values = array(
						array('id' => '1', 'text' => __('Do not prompt for an address', 'event_espresso')),
						array('id' => '0', 'text' => __('Prompt for an address, but do not require one', 'event_espresso')),
						array('id' => '2', 'text' => __('Prompt for an address, and require one', 'event_espresso'))
					);
				echo EE_Form_Fields::select_input('no_shipping', $shipping_values, $this->_payment_settings['no_shipping']);
			?>
			</td>
		</tr>

		<tr>
			<th>
				<label for="<?php echo $this->_gateway; ?>_button_url">
					<?php _e('Button Image URL', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<?php $this->_payment_settings['button_url'] = empty( $this->_payment_settings['button_url'] ) ? $this->_btn_img : $this->_payment_settings['button_url']; ?>
				<input class="regular-text" type="text" name="button_url" id="<?php echo $this->_gateway; ?>_button_url" size="34" value="<?php echo $this->_payment_settings['button_url']; ?>" />
				<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a>
			</td>
		</tr>
		<?php
	}

	protected function _display_settings_help() {
		?>
			
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
			<hr />
			<p><strong><?php _e('Helpful Links', 'event_espresso'); ?></strong></p>
			<ul>
				<li><a href="https://developer.paypal.com/devscr?cmd=_home" target="_blank"><?php _e('PayPal Sandbox Login', 'event_espresso'); ?></a></li>
				<li><a href="https://cms.paypal.com/us/cgi-bin/?&amp;cmd=_render-content&amp;content_ID=developer/howto_testing_sandbox" target="_blank"><?php _e('Sandbox Tutorial', 'event_espresso'); ?></a></li>
				<li><a href="https://cms.paypal.com/us/cgi-bin/?&amp;cmd=_render-content&amp;content_ID=developer/howto_testing_sandbox_get_started" target="_blank"><?php _e('Getting Started with PayPal Sandbox', 'event_espresso'); ?></a></li>
			</ul>
		</div>
		<div id="paypal_button_image" style="display:none">
			<h2>
				<?php _e('Button Image URL', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso'); ?>
			</p>
			<p><?php _e('Current Button Image', 'event_espresso'); ?></p>
			<p><?php echo '<img src="' . $this->_payment_settings['button_url'] . '" />'; ?></p>
		</div>
		<div id="paypal_image_url_info" style="display:none">
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

	public function process_reg_step_3() {
		global $org_options, $EE_Session;

		$session_data = $EE_Session->get_session_data();
		$paypal_settings = $this->_payment_settings;
		$paypal_id = $paypal_settings['paypal_id'];
		$paypal_cur = $paypal_settings['currency_format'];
		$no_shipping = $paypal_settings['no_shipping'];
		if ($paypal_settings['use_sandbox']) {
			$this->_gatewayUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
		}

		$item_num = 1;
		$registrations = $session_data['cart']['REG']['items'];
		require_once('EEM_Attendee.model.php');
		foreach ($registrations as $registration) {
			foreach ($registration['attendees'] as $attendee) {
				//echo "paypal standard, attendee<br>\r\n";
				//var_dump($attendee);
				$this->addField('item_name_' . $item_num, $attendee[EEM_Attendee::fname_question_id] . ' ' 
						. $attendee[EEM_Attendee::lname_question_id] . ' attending ' . $registration['name'] . ' on ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc']);
				$this->addField('amount_' . $item_num, $attendee['price_paid']);
				$this->addField('quantity_' . $item_num, '1');
				$item_num++;
			}
		}

		$total = $session_data['_cart_grand_total_amount'];
		if (isset($session_data['tax_totals'])) {
			foreach ($session_data['tax_totals'] as $key => $taxes) {
				$total = $total + $taxes;
				$this->addField('item_name_' . $item_num, $session_data['taxes'][$key]['name']);
				$this->addField('amount_' . $item_num, $taxes);
				$this->addField('quantity_' . $item_num, '1');
				$item_num++;
			}
		}
		$this->addField('business', $paypal_id);
		$this->addField('return', home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
		$this->addField('cancel_return', home_url() . '/?page_id=' . $org_options['cancel_return']);
		$this->addField('notify_url', home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
		$this->addField('cmd', '_cart');
		$this->addField('upload', '1');
		$this->addField('currency_code', $paypal_cur);
		$this->addField('image_url', empty($paypal_settings['image_url']) ? '' : $paypal_settings['image_url']);
		$this->addField('no_shipping ', $no_shipping);
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, serialize(get_object_vars($this)));
		$this->_EEM_Gateways->set_off_site_form($this->submitPayment());
		$this->redirect_after_reg_step_3();
	}

	public function thank_you_page() {
		global $EE_Session;
		printr( $_POST, '$_POST  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$txn_details = array(
				'gateway' => $this->_payment_settings['display_name'],
				'approved' => FALSE,
				'response_msg' => __('You\'re registration has not been completed successfully.', 'event_espresso'),
				'status' => 'Incomplete',
				'raw_response' => serialize($_POST),
				'amount' => 0.00,
				'method' => sanitize_text_field($_POST['txn_type']),
				'auth_code' => sanitize_text_field($_POST['payer_id']),
				'md5_hash' => sanitize_text_field($_POST['verify_sign']),
				'invoice_number' => sanitize_text_field($_POST['invoice_id']),
				'transaction_id' => sanitize_text_field($_POST['ipn_track_id'])
		);
		$this->ipnLog = TRUE;
		if ($this->_payment_settings['use_sandbox']) {
			$this->_gatewayUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
		}
		if ($this->validateIpn()) {
			$txn_details['raw_response'] = serialize($this->ipnData);
			$txn_details['transaction_id'] = $this->ipnData['txn_id'];
			if ($this->ipnData['payment_status'] == 'Completed' || $this->ipnData['payment_status'] == 'Pending') {
				$txn_details['approved'] = TRUE;
				$txn_details['amount'] = floatval($_REQUEST['mc_gross']);
				$txn_details['response_msg'] = __('You\'re registration has been completed successfully.', 'event_espresso');
				$txn_details['status'] = 'Approved';
			}
		}
		$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');

		$success = $txn_details['approved'];

		do_action( 'action_hook_espresso_after_payment', $EE_Session, $success );

		if ($txn_details['approved'] == TRUE && $this->_payment_settings['use_sandbox']) {
			do_action('action_hook_espresso_mail_successful_transaction_debugging_output');
		} else {
			do_action('action_hook_espresso_mail_failed_transaction_debugging_output');
		}
		parent::thank_you_page();
	}

	public function espresso_display_payment_gateways() {
		echo $this->_generate_payment_gateway_selection_button();
		?>


		<div id="reg-page-billing-info-<?php echo $this->_gateway; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the PayPal.com website where your payment will be securely processed.', 'event_espresso'); ?>
		</div>

		<?php
	}

	/**
	 * Validate the IPN notification
	 *
	 * @param none
	 * @return boolean
	 */
	public function validateIpn() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		if (function_exists('curl_init')) {
			//new paypal code//
			// parse the paypal URL
			$urlParsed = parse_url($this->_gatewayUrl);

			// generate the post string from the _POST vars
			$req = '';

			$errors = "\nUsing BUILT-IN PHP curl methods\n";
			// Run through the posted array
			foreach ($_POST as $key => $value) {
				$this->ipnData["$key"] = $value;
				$errors .= "key = " . $key . "\nvalue = " . $value . "\n";
				$value = urlencode(stripslashes($value));
				$value = preg_replace('/(.*[^%^0^D])(%0A)(.*)/i', '${1}%0D%0A${3}', $value); // IPN fix
				$req .= $key . '=' . $value . '&';
			}
			$req .= 'cmd=_notify-validate';
			$url = $this->_gatewayUrl;
			$ch = curl_init(); // Starts the curl handler
			$error = array();
			$error["set_host"] = curl_setopt($ch, CURLOPT_URL, $url); // Sets the paypal address for curl
			$error["set_fail_on_error"] = curl_setopt($ch, CURLOPT_FAILONERROR, 1);
			$error["set_return_transfer"] = curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Returns result to a variable instead of echoing
			$error["set_timeout"] = curl_setopt($ch, CURLOPT_TIMEOUT, 45); // Sets a time limit for curl in seconds (do not set too low)
			$error["set_post"] = curl_setopt($ch, CURLOPT_POST, 1); // Set curl to send data using post
			$error["set_post_fields"] = curl_setopt($ch, CURLOPT_POSTFIELDS, $req); // Add the request parameters to the post
			$errors .= $error["set_host"] ? "Success" : "Failure";
			$errors .= " Setting host: " . $url . "\n";
			$errors .= $error["set_post"] ? "Success" : "Failure";
			$errors .= " Setting request type to post\n";
			$errors .= $error["set_post_fields"] ? "Success" : "Failure";
			$errors .= " Setting post fields: " . htmlspecialchars($req) . "\n";
			$errors .= $error["set_fail_on_error"] ? "Success" : "Failure";
			$errors .= " Setting Fain On Error\n";
			$errors .= $error["set_return_transfer"] ? "Success" : "Failure";
			$errors .= " Setting return transfer\n";
			$errors .= $error["set_timeout"] ? "Success" : "Failure";
			$errors .= " Setting Timeout\n";
			$error["set_verbose"] = curl_setopt($ch, CURLOPT_VERBOSE, 1);
			$errors .= $error["set_verbose"] ? "Success" : "Failure";
			$errors .= " Setting verbose mode\n";
			$result = curl_exec($ch); // run the curl process (and return the result to $result
			$this->ipnResponse = $result;
			$error["result"] = curl_error($ch);
			curl_close($ch);
			$errors .= "Errors resulting from the execution of curl transfer: " . $error["result"];

			if (strcmp($result, "VERIFIED") == 0) { // It may seem strange but this function returns 0 if the result matches the string So you MUST check it is 0 and not just do strcmp ($result, "VERIFIED") (the if will fail as it will equate the result as false)
				// Do some checks to ensure that the payment has been sent to the correct person
				// Check and ensure currency and amount are correct
				// Check that the transaction has not been processed before
				// Ensure the payment is complete
				// Valid IPN transaction.
				return true;
			} else {
				// Log an invalid request to look into
				// Invalid IPN transaction.  Check the log for details.
				$this->lastError = "IPN Validation Failed . $urlParsed[path] : $urlParsed[host]";
				return false;
			}
		} else {

			//Old paypal code
			// parse the paypal URL
			$urlParsed = parse_url($this->_gatewayUrl);
			// generate the post string from the _POST vars
			$postString = '';
			foreach ($_POST as $key => $value) {
				$this->ipnData["$key"] = $value;
				$value = urlencode(stripslashes($value));
				$value = preg_replace('/(.*[^%^0^D])(%0A)(.*)/i', '${1}%0D%0A${3}', $value); // IPN fix
				$postString .= $key . '=' . $value . '&';
			}
			$postString .="cmd=_notify-validate"; // append ipn command
			// open the connection to paypal
			$fp = fsockopen($urlParsed[host], "80", $errNum, $errStr, 30);
			if (!$fp) {
				// Could not open the connection, log error if enabled
				$this->lastError = "fsockopen error no. $errNum: $errStr";
				return false;
			} else {
				// Post the data back to paypal
				fputs($fp, "POST $urlParsed[path] HTTP/1.1\r\n");
				fputs($fp, "Host: $urlParsed[host]\r\n");
				fputs($fp, "Content-type: application/x-www-form-urlencoded\r\n");
				fputs($fp, "Content-length: " . strlen($postString) . "\r\n");
				fputs($fp, "Connection: close\r\n\r\n");
				fputs($fp, $postString . "\r\n\r\n");
				// loop through the response from the server and append to variable
				while (!feof($fp)) {
					$this->ipnResponse .= fgets($fp, 1024);
				}
				fclose($fp); // close connection
			}
			if (eregi("VERIFIED", $this->ipnResponse)) {
				// Valid IPN transaction.
				return true;
			} else {
				// Invalid IPN transaction.  Check the log for details.
				$this->lastError = "IPN Validation Failed . $urlParsed[path] : $urlParsed[host]";
				return false;
			}
		}
	}

}

//end class
