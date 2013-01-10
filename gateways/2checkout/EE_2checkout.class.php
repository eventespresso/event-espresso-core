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
 * Payment Model
 *
 * @package			Event Espresso
 * @subpackage		gateways/
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
Class EE_2checkout extends EE_Offsite_Gateway {

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
		$this->_gateway = '2Checkout';
		$this->_button_base = '2checkout-logo.png';
		$this->_path =  str_replace( '\\', '/', __FILE__ );
		$this->_btn_img = is_readable( dirname( $this->_path ) . '/lib/' . $this->_button_base ) ? EVENT_ESPRESSO_PLUGINFULLURL . 'gateways/' . $this->_gateway . '/lib/' . $this->_button_base : '';
		parent::__construct($model);
	}

	protected function _default_settings() {
		$this->_payment_settings['2checkout_id'] = '';
		$this->_payment_settings['2checkout_username'] = '';
		$this->_payment_settings['currency_format'] = 'USD';
		$this->_payment_settings['use_sandbox'] = false;
		$this->_payment_settings['type'] = 'off-site';
		$this->_payment_settings['display_name'] = '2CheckOut';
		$this->_payment_settings['current_path'] = '';
		$this->_payment_settings['button_url'] = $this->_btn_img;
	}

	protected function _update_settings() {
		$this->_payment_settings['2checkout_id'] = $_POST['2checkout_id'];
		$this->_payment_settings['2checkout_username'] = $_POST['2checkout_username'];
		$this->_payment_settings['currency_format'] = $_POST['currency_format'];
		$this->_payment_settings['use_sandbox'] = $_POST['use_sandbox'];
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';	}

	protected function _display_settings() {
		?>
		<tr>
			<th><label for="2checkout_id">
					<?php _e('2checkout ID', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="2checkout_id" id="2checkout_id" size="35" value="<?php echo $this->_payment_settings['2checkout_id']; ?>">
				<br />
				<span class="description">
					<?php _e('(Typically 87654321)', 'event_espresso'); ?>
				</span></td>
		</tr>
		
		<tr>
			<th><label for="2checkout_username">
					<?php _e('2checkout Username', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="2checkout_username" id="2checkout_username" size="35" value="<?php echo $this->_payment_settings['2checkout_username']; ?>">
				<br />
				<span class="description">
					<?php _e('(Typically TestAccount)', 'event_espresso'); ?>
				</span></td>
		</tr>
		
		<tr>
			<th><label for="currency_format">
					<?php _e('Country Currency', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', '2co_currency_info'); ?>
				</label></th>
			<td><select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
					<option value="<?php echo $this->_payment_settings['currency_format']; ?>"><?php echo $this->_payment_settings['currency_format']; ?></option>
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
					<option value="INR">
						<?php _e('Indian Rupee (Rs.)', 'event_espresso'); ?>
					</option>
				</select></td>
		</tr>
		
		<tr>
			<th><label for="2co_use_sandbox">
					<?php _e('Turn on Debugging Using the 2checkout Sandbox', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', '2co_sandbox_info'); ?>
				</label></th>
			<td><?php echo select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?></td>
		</tr>
		
		<tr>
			<th>
				<label for="2co_button_url">
					<?php _e('Button Image URL', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', '2co_button_image'); ?>
				</label>
			</th>
			<td>
				<?php $this->_payment_settings['button_url'] = empty( $this->_payment_settings['button_url'] ) ? $this->_btn_img : $this->_payment_settings['button_url']; ?>
				<input class="regular-text" type="text" name="button_url" id="2co_button_url" size="34" value="<?php echo $this->_payment_settings['button_url']; ?>" />
				<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image">
					<img src="images/media-button-image.gif" alt="Add an Image">
				</a>
			</td>
		</tr>
		<?php
	}

	protected function _display_settings_help() {
		?>
		<div id="2co_button_image" style="display:none">
			<h2>
				<?php _e('Button Image URL', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('Current Button Image:', 'event_espresso'); ?>
			</p>
			<p><?php echo '<img src="' . $this->_payment_settings['button_url'] . '" />'; ?></p>
		</div>
		<div id="2co_sandbox_info" style="display:none">
			<h2>
				<?php _e('2checkout Sandbox', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('In addition to using the 2checkout Sandbox fetaure. The debugging feature will also output the form varibales to the payment page, send an email to the admin that contains the all 2checkout variables.', 'event_espresso'); ?>
			</p>
			<hr />
			<p>
				<?php _e('The 2checkout Sandbox is a testing environment that is a duplicate of the live 2checkout site, except that no real money changes hands. The Sandbox allows you to test your entire integration before submitting transactions to the live 2checkout environment. Create and manage test accounts, and view emails and API credentials for those test accounts.', 'event_espresso'); ?>
			</p>
		</div>
		<div id="2co_currency_info" style="display:none">
			<h2>
				<?php _e('2checkout Currency', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('2checkout uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is US Dollars (USD). If you want to require or accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that 2checkout (currently) supports.', 'event_espresso'); ?>
			</p>
		</div>
		<?php
	}

	public function process_reg_step_3() {

		global $org_options, $EE_Session;

		$this->_gatewayUrl = 'https://www.2checkout.com/checkout/purchase';
		$session_data = $EE_Session->get_session_data();

		// Enable test mode if needed
		if ($this->_payment_settings['use_sandbox']) {
			$this->addField('demo', 'Y');
		}

		$item_num = 1;
		$registrations = $session_data['cart']['REG']['items'];
		$this->addField('id_type', 1);
		foreach ($registrations as $registration) {
			foreach ($registration['attendees'] as $attendee) {
				$this->addField('c_prod_' . $item_num, rand(1, 100));
				$this->addField('c_name_' . $item_num, $registration['name']);
				$this->addField('c_description_' . $item_num, $attendee['fname'] . ' ' . $attendee['lname'] . ' attending ' . $registration['name'] . ' on ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc']);
				$this->addField('c_price_' . $item_num, $attendee['price_paid']);
				$item_num++;
			}
		}

		$total = $session_data['_cart_grand_total_amount'];
		if (isset($session_data['tax_totals'])) {
			foreach ($session_data['tax_totals'] as $key => $taxes) {
				$total = $total + $taxes;
				$this->addField('c_prod_' . $item_num, rand(1, 100));
				$this->addField('c_name_' . $item_num, $session_data['taxes'][$key]['name']);
				$this->addField('c_description_' . $item_num, 'Tax');
				$this->addField('c_price_' . $item_num, $taxes);
				$item_num++;
			}
		}
		$this->addField('sid', $this->_payment_settings['2checkout_id']);
		$this->addField('cart_order_id', $session_data['transaction']->ID());
		$this->addField('x_Receipt_Link_URL', home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment');
		$this->addField('total', number_format($total, 2, '.', ''));
		$this->addField('tco_currency', $this->_payment_settings['currency_format']);
		$this->_EEM_Gateways->set_off_site_form($this->submitPayment());
		$this->redirect_after_reg_step_3();
	}

	public function thank_you_page() {

		global $EE_Session;
		$txn_details = array(
				'gateway' => $this->_payment_settings['display_name'],
				'approved' => FALSE,
				'response_msg' => __('You\'re registration has not been completed successfully.', 'event_espresso'),
				'status' => 'Incomplete',
				'raw_response' => serialize($_POST),
				'amount' => 0.00,
				'method' => sanitize_text_field($_POST['pay_method']),
				'auth_code' => sanitize_text_field($_POST['order_number']),
				'md5_hash' => sanitize_text_field($_POST['key']),
				'invoice_number' => sanitize_text_field($_POST['invoice_id']),
				'transaction_id' => sanitize_text_field($_POST['invoice_id'])
		);
		if ($_REQUEST['credit_card_processed'] == 'Y') {
			$txn_details['approved'] = TRUE;
			$txn_details['amount'] = floatval($_REQUEST['total']);
			$txn_details['response_msg'] = __('You\'re registration has been completed successfully.', 'event_espresso');
			$txn_details['status'] = 'Approved';
		}
		$EE_Session->set_session_data(array('txn_results' => $txn_details), 'session_data');

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
			<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the 2CheckOut.com website where your payment will be securely processed.', 'event_espresso'); ?>
		</div>

		<?php
	}

		/**
	 * Enables the test mode
	 *
	 * @param none
	 * @return none
	 */
	public function enableTestMode() {
		$this->addField('demo', 'Y');
	}


}