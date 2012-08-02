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
		$this->_button_base = 'paypal.gif';
		$this->_path = str_replace( '\\', '/', __FILE__ );
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
	}

	protected function _update_settings() {
		$this->_payment_settings['paypal_id'] = $_POST['paypal_id'];
		$this->_payment_settings['image_url'] = $_POST['image_url'];
		$this->_payment_settings['currency_format'] = $_POST['currency_format'];
		$this->_payment_settings['no_shipping'] = $_POST['no_shipping'];
		$this->_payment_settings['use_sandbox'] = $_POST['use_sandbox'];
		$this->_payment_settings['button_url'] = $_POST['button_url'];
	}

	protected function _display_settings() {
		?>
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
					<?php echo apply_filters('filter_hook_espresso_help', 'currency_info'); ?>
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
			<th><label for="pp_button_url">
					<?php _e('Button Image URL', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'paypal_button_image'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="button_url" id="pp_button_url" size="34" value="<?php echo $this->_payment_settings['button_url']; ?>" /><br /><span class="description">
					<?php _e('URL to the payment button.', 'event_espresso'); ?>
				</span>
			</td>
		</tr>
		<tr>
			<th><label for="pp_image_url">
					<?php _e('Image URL', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'paypal_image_url_info'); ?>
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
					<?php echo apply_filters('filter_hook_espresso_help', 'sandbox_info'); ?>
				</label></th>
			<td><?php echo select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?></td>
		</tr>
		<tr>
			<th><label for="no_shipping">
					<?php _e('Shipping Address Options', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'no_shipping'); ?>
				</label></th>
			<td><?php
			$shipping_values = array(
					array('id' => '1', 'text' => __('Do not prompt for an address', 'event_espresso')),
					array('id' => '0', 'text' => __('Prompt for an address, but do not require one', 'event_espresso')),
					array('id' => '2', 'text' => __('Prompt for an address, and require one', 'event_espresso')));
			echo select_input('no_shipping', $shipping_values, $this->_payment_settings['no_shipping']);
					?></td>
		</tr>
		<?php
	}

	protected function _display_settings_help() {
		?>
		<p><strong style="color:#F00">
				<?php _e('PayPal Notes', 'event_espresso'); ?>
			</strong><br />
			<?php _e('For PayPal IPN to work, you need a Business or Premier account.', 'event_espresso'); ?></p>
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

		include_once ('lib/Paypal.php');
		$myPaypal = new EE_Paypal();
		$session_data = $EE_Session->get_session_data();
		$paypal_settings = $this->_payment_settings;
		$paypal_id = $paypal_settings['paypal_id'];
		$paypal_cur = $paypal_settings['currency_format'];
		$no_shipping = $paypal_settings['no_shipping'];
		$use_sandbox = $paypal_settings['use_sandbox'];
		if ($use_sandbox) {
			$myPaypal->enableTestMode();
		}

		$item_num = 1;
		$registrations = $session_data['cart']['REG']['items'];
		foreach ($registrations as $registration) {
			foreach ($registration['attendees'] as $attendee) {
				$myPaypal->addField('item_name_' . $item_num, $attendee['fname'] . ' ' . $attendee['lname'] . ' attending ' . $registration['name'] . ' on ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc']);
				$myPaypal->addField('amount_' . $item_num, $attendee['price_paid']);
				$myPaypal->addField('quantity_' . $item_num, '1');
				$item_num++;
			}
		}

		$total = $session_data['_cart_grand_total_amount'];
		if (isset($session_data['tax_totals'])) {
			foreach ($session_data['tax_totals'] as $key => $taxes) {
				$total = $total + $taxes;
				$myPaypal->addField('item_name_' . $item_num, $session_data['taxes'][$key]['name']);
				$myPaypal->addField('amount_' . $item_num, $taxes);
				$myPaypal->addField('quantity_' . $item_num, '1');
				$item_num++;
			}
		}
		$myPaypal->addField('business', $paypal_id);
		$myPaypal->addField('return', home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
		$myPaypal->addField('cancel_return', home_url() . '/?page_id=' . $org_options['cancel_return']);
		$myPaypal->addField('notify_url', home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
		$myPaypal->addField('cmd', '_cart');
		$myPaypal->addField('upload', '1');
		$myPaypal->addField('currency_code', $paypal_cur);
		$myPaypal->addField('image_url', empty($paypal_settings['image_url']) ? '' : $paypal_settings['image_url']);
		$myPaypal->addField('no_shipping ', $no_shipping);
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, serialize(get_object_vars($myPaypal)));
		$this->_EEM_Gateways->set_off_site_form($myPaypal->submitPayment());
	}

	public function espresso_process_off_site_payment() {
		global $EE_Session;
		$session_data = $EE_Session->get_session_data();
		$gateway_settings = $this->_payment_settings;
		if (empty($session_data['session_data']['txn_results']['approved'])) {
			$txn_details = array(
					'gateway' => $gateway_settings['display_name'],
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
			include_once ('lib/Paypal.php');
			$myPaypal = new EE_Paypal();
			$myPaypal->ipnLog = TRUE;
			if ($gateway_settings['use_sandbox']) {
				$myPaypal->enableTestMode();
			}
			if ($myPaypal->validateIpn()) {
				$txn_details['raw_response'] = serialize($myPaypal->ipnData);
				$txn_details['transaction_id'] = $myPaypal->ipnData['txn_id'];
				if ($myPaypal->ipnData['payment_status'] == 'Completed' || $myPaypal->ipnData['payment_status'] == 'Pending') {
					$txn_details['approved'] = TRUE;
					$txn_details['amount'] = floatval($_REQUEST['mc_gross']);
					$txn_details['response_msg'] = __('You\'re registration has been completed successfully.', 'event_espresso');
					$txn_details['status'] = 'Approved';
				}
			}
			$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');

			if ($txn_details['approved'] == TRUE && $gateway_settings['use_sandbox']) {
				do_action('action_hook_espresso_mail_successful_transaction_debugging_output');
			} else {
				do_action('action_hook_espresso_mail_failed_transaction_debugging_output');
			}
		}
	}

	public function espresso_display_payment_gateways() {
		echo $this->_generate_payment_gateway_selection_button();
		?>
		

		<div id="reg-page-billing-info-<?php echo $this->_gateway; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the PayPal.com website where your payment will be securely processed.', 'event_espresso'); ?>
		</div>

		<?php
	}

}

//end class