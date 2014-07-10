<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Payment Model
 *
 * @package			Event Espresso
 * @subpackage	gateways/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
Class EE_Paypal_Pro extends EE_Onsite_Gateway {

	private static $_instance = NULL;

	/**
	 * 		@singleton method used to instantiate class object
	 * 		@access public
	 * 		@return class instance
	 */
	public static function instance(EEM_Gateways &$model) {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or ! ( self::$_instance instanceof  EE_Paypal_Pro )) {
			self::$_instance = new self($model);
		}
		return self::$_instance;
	}

	/**
	 * 		constructor
	 * 		@access protected
	 * 		@return void
	 */
	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway_name = 'Paypal_Pro';
		$this->_path = str_replace('\\', '/', __FILE__);
		parent::__construct($model);
	}

	/**
	 * 		sets some defaults
	 * 		@access protected
	 * 		@return void
	 */
	protected function _default_settings() {
		$this->_payment_settings = array(
				'email' => '',
				'username' => '',
				'password' => '',
				'currency_format' => 'USD',
				'signature' => '',
				'credit_cards' => array(),
				'use_sandbox' => false,
				'type' => 'on-site',
				'display_name' => 'PayPal Pro',
				'current_path' => '',
				'button_url' => $this->_btn_img
		);
	}

	/**
	 * 		update settings
	 * 		@access protected
	 * 		@return void
	 */
	protected function _update_settings() {
		$this->_payment_settings['email'] = $_POST['email'];
		$this->_payment_settings['username'] = $_POST['username'];
		$this->_payment_settings['password'] = $_POST['password'];
		$this->_payment_settings['currency_format'] = $_POST['currency_format'];
		$this->_payment_settings['signature'] = $_POST['signature'];
		//$this->_payment_settings['credit_cards'] = implode(",", empty($_POST['credit_cards']) ? array() : $_POST['credit_cards']);
		$this->_payment_settings['credit_cards'] = empty($_POST['credit_cards']) ? array() : $_POST['credit_cards'];
		$this->_payment_settings['use_sandbox'] = empty($_POST['use_sandbox']) ? '' : $_POST['use_sandbox'];
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';
	}

	/**
	 * 		display settings in the admin
	 * 		@access protected
	 * 		@return void
	 */
	protected function _display_settings() {
		?>
		<tr>
			<th>
				<label for="paypal_pro_email">
					<?php _e('PayPal Email', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<input class="regular-text" type="text" name="email" id="paypal_pro_email" size="35" value="<?php echo $this->_payment_settings['email']; ?>">
			</td>
		</tr>
		<tr>
			<th>
				<label for="paypal_pro_username">
					<?php _e('PayPal API Username', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<input class="regular-text" type="text" name="username" id="paypal_pro_username" size="35" value="<?php echo $this->_payment_settings['username']; ?>">
			</td>
		</tr>
		<tr>
			<th>
				<label for="paypal_pro_password">
					<?php _e('PayPal API Password', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<input class="regular-text" type="text" name="password" id="paypal_pro_password" size="35" value="<?php echo $this->_payment_settings['password']; ?>">
			</td>
		</tr>
		<tr>
			<th>
				<label for="paypal_pro_signature">
					<?php _e('PayPal API Signature', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<input class="regular-text" type="text" name="signature" id="paypal_pro_signature" size="35" value="<?php echo $this->_payment_settings['signature']; ?>">
			</td>
		</tr>
		<tr>
			<th>
				<label for="paypal_pro_currency_format">
					<?php _e('Country Currency', 'event_espresso'); ?>
					<?php do_action( 'AHEE_help', 'paypal_pro_currency_info' ) ?>
				</label>
			</th>
			<td>
				<select name="currency_format" data-placeholder="Choose a currency..." class="chzn-select wide">
					<?php $currency = $this->_payment_settings['currency_format'];?>
					<option value="USD" <?php echo $currency=="USD" ? 'selected="selected"' : ''?>>
						<?php _e('U.S. Dollars ($)', 'event_espresso'); ?>
					</option>
					<option value="GBP" <?php echo $currency=="GBP" ? 'selected="selected"' : ''?>>
						<?php _e('Pounds Sterling (&pound;)', 'event_espresso'); ?>
					</option>
					<option value="CAD" <?php echo $currency=="CAD" ? 'selected="selected"' : ''?>>
						<?php _e('Canadian Dollars (C $)', 'event_espresso'); ?>
					</option>
					<option value="AUD" <?php echo $currency=="AUD" ? 'selected="selected"' : ''?>>
						<?php _e('Australian Dollars (A $)', 'event_espresso'); ?>
					</option>
					<option value="BRL" <?php echo $currency=="BRL" ? 'selected="selected"' : ''?>>
						<?php _e('Brazilian Real (only for Brazilian users)', 'event_espresso'); ?>
					</option>
					<option value="CHF" <?php echo $currency=="CHF" ? 'selected="selected"' : ''?>>
						<?php _e('Swiss Franc', 'event_espresso'); ?>
					</option>
					<option value="CZK" <?php echo $currency=="CZK" ? 'selected="selected"' : ''?>>
						<?php _e('Czech Koruna', 'event_espresso'); ?>
					</option>
					<option value="DKK" <?php echo $currency=="DKK" ? 'selected="selected"' : ''?>>
						<?php _e('Danish Krone', 'event_espresso'); ?>
					</option>
					<option value="EUR" <?php echo $currency=="EUR" ? 'selected="selected"' : ''?>>
						<?php _e('Euros (&#8364;)', 'event_espresso'); ?>
					</option>
					<option value="HKD" <?php echo $currency=="HKD" ? 'selected="selected"' : ''?>>
						<?php _e('Hong Kong Dollar ($)', 'event_espresso'); ?>
					</option>
					<option value="HUF" <?php echo $currency=="HUF" ? 'selected="selected"' : ''?>>
						<?php _e('Hungarian Forint', 'event_espresso'); ?>
					</option>
					<option value="ILS" <?php echo $currency=="ILS" ? 'selected="selected"' : ''?>>
						<?php _e('Israeli Shekel', 'event_espresso'); ?>
					</option>
					<option value="JPY" <?php echo $currency=="JPY" ? 'selected="selected"' : ''?>>
						<?php _e('Yen (&yen;)', 'event_espresso'); ?>
					</option>
					<option value="MXN" <?php echo $currency=="MXN" ? 'selected="selected"' : ''?>>
						<?php _e('Mexican Peso', 'event_espresso'); ?>
					</option>
					<option value="MYR" <?php echo $currency=="MYR" ? 'selected="selected"' : ''?>>
						<?php _e('Malaysian Ringgits (only for Malaysian users)', 'event_espresso'); ?>
					</option>
					<option value="NOK" <?php echo $currency=="NOK" ? 'selected="selected"' : ''?>>
						<?php _e('Norwegian Krone', 'event_espresso'); ?>
					</option>
					<option value="NZD" <?php echo $currency=="NZD" ? 'selected="selected"' : ''?>>
						<?php _e('New Zealand Dollar ($)', 'event_espresso'); ?>
					</option>
					<option value="PHP" <?php echo $currency=="PHP" ? 'selected="selected"' : ''?>>
						<?php _e('Philippine Pesos', 'event_espresso'); ?>
					</option>
					<option value="PLN" <?php echo $currency=="PLN" ? 'selected="selected"' : ''?>>
						<?php _e('Polish Zloty', 'event_espresso'); ?>
					</option>
					<option value="SEK" <?php echo $currency=="SEK" ? 'selected="selected"' : ''?>>
						<?php _e('Swedish Krona', 'event_espresso'); ?>
					</option>
					<option value="SGD" <?php echo $currency=="SGD" ? 'selected="selected"' : ''?>>
						<?php _e('Singapore Dollar ($)', 'event_espresso'); ?>
					</option>
					<option value="THB" <?php echo $currency=="THB" ? 'selected="selected"' : ''?>>
						<?php _e('Thai Baht', 'event_espresso'); ?>
					</option>
					<option value="TRY" <?php echo $currency=="TRY" ? 'selected="selected"' : ''?>>
						<?php _e('Turkish Lira (only for Turkish users)', 'event_espresso'); ?>
					</option>
					<option value="TWD" <?php echo $currency=="TWD" ? 'selected="selected"' : ''?>>
						<?php _e('Taiwan New Dollars', 'event_espresso'); ?>
					</option>
				</select>
			</td>
		</tr>
		<tr>
			<th>
				<label>
					<?php _e('Accepted Card Types', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<?php
				$checked = 'checked="checked"';
//							$credit_cards = explode(",", $this->_payment_settings['credit_cards']);
				$credit_cards = $this->_payment_settings['credit_cards'];
				?>
				<label class="gateway-checkbox-options">
					<?php _e('Visa', 'event_espresso'); ?>
					<input type="checkbox" name="credit_cards[]" size="35" value="Visa" <?php echo in_array("Visa", $credit_cards) ? $checked : ''; ?> />
				</label>

				<label class="gateway-checkbox-options">
					<?php _e('MasterCard', 'event_espresso'); ?>
					<input type="checkbox" name="credit_cards[]" size="35" value="MasterCard" <?php echo in_array("MasterCard", $credit_cards) ? $checked : ''; ?> />
				</label>

				<label class="gateway-checkbox-options">
					<?php _e('American Express', 'event_espresso'); ?>
					<input type="checkbox" name="credit_cards[]" size="35" value="Amex" <?php echo in_array("Amex", $credit_cards) ? $checked : ''; ?> />
				</label>

				<label class="gateway-checkbox-options">
					<?php _e('Discover', 'event_espresso'); ?>
					<input type="checkbox" name="credit_cards[]" size="35" value="Discover" <?php echo in_array("Discover", $credit_cards) ? $checked : ''; ?> />
				</label>

			</td>
		</tr>
		<tr>
			<th>
				<label for="paypal_pro_use_sandbox">
					<?php _e('Use the Debugging Feature<br/>and the PayPal Sandbox', 'event_espresso'); ?>
					<?php do_action( 'AHEE_help', 'paypal_pro_sandbox_info' ); ?>
				</label>
			</th>
			<td>
				<?php echo EEH_Form_Fields::select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?>
				<span class="description">
					<?php _e('Make sure you enter the sandbox credentials above.', 'event_espresso'); ?>
				</span>
			</td>
		</tr>
		<?php
	}

	protected function _display_settings_help() {
		?>

		<div id="paypal_pro_sandbox_info" style="display:none">
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
		<div id="paypal_pro_currency_info" style="display:none">
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

	/**
	 * 		process payment
	 * 		@access public
	 * 		@return void
	 */
//	public function espresso_gateway_process_step_3() {
	public function process_payment_start(EE_Line_Item $total_line_item, $transaction = null, $total_to_charge = NULL) {

		$session_data = EE_Registry::instance()->SSN->get_session_data();

		$billing_info = $session_data['billing_info'];
		if( ! $transaction){
			$transaction = $total_line_item->transaction();
		}
		$primary_registrant = $transaction->primary_registration();
		if ($billing_info != 'no payment required') {
			$this->_save_billing_info_to_attendee($billing_info, $transaction);
			$OrderItems = array();
			if( $total_to_charge === NULL && ! $transaction->paid()){//client code specified an amount and nothing has been paid yet
				$grand_total = $total_line_item->total();
				$description = 'Event Registrations from ' . get_bloginfo('name');


				$item_num = 1;
				/* @var $transaction EE_Transaction */
				foreach ($total_line_item->get_items() as $line_item) {
					$Item = array(
							// Item Name.  127 char max.
							'l_name' => substr($line_item->name(),0,127),
							// Item description.  127 char max.
							'l_desc' => substr($line_item->desc(),0,127),
							// Cost of individual item.
							'l_amt' => $line_item->unit_price(),
							// Item Number.  127 char max.
							'l_number' => $item_num++,
							// Item quantity.  Must be any positive integer.
							'l_qty' => $line_item->quantity(),
							// Item's sales tax amount.
							'l_taxamt' => '',
							// eBay auction number of item.
							'l_ebayitemnumber' => '',
							// eBay transaction ID of purchased item.
							'l_ebayitemauctiontxnid' => '',
							// eBay order ID for the item.
							'l_ebayitemorderid' => ''
					);
						// add to array of all items
					array_push($OrderItems, $Item);
				}
				$item_amount = $total_line_item->get_items_total();
				$tax_amount = $total_line_item->get_total_tax();
			}else{
				if($total_to_charge){
					$grand_total = $total_to_charge;
					$description = sprintf(__("Partial payment of %s", "event_espresso"),$total_to_charge);
				}elseif($transaction->paid()){//transaction is partially paid
					$grand_total = $transaction->remaining();
					$description = sprintf(__("Total paid to date: %s, and this charge is for the balance.", "event_espresso"),$transaction->get_pretty('TXN_paid'));
				}else{
					throw new EE_Error(sprintf(__("An unexpected error has occurred. Amount to charge passed to PayPal was invalid'%s'", "event_espresso"),$total_line_item));
				}
				$item_amount = $grand_total;
				$tax_amount = 0;
				array_push($OrderItems,array(
					// Item Name.  127 char max.
							'l_name' => sprintf(__("Partial payment for registration: %s", 'event_espresso'),$primary_registrant->reg_code()),
							// Item description.  127 char max.
							'l_desc' => $description,
							// Cost of individual item.
							'l_amt' => $grand_total,
							// Item Number.  127 char max.
							'l_number' => 1,
							// Item quantity.  Must be any positive integer.
							'l_qty' => 1,
				));

			}

			// Populate data arrays with order data.
			$DPFields = array(
					// How you want to obtain payment ?
					// Authorization indidicates the payment is a basic auth subject to settlement with Auth & Capture.
					// Sale indicates that this is a final sale for which you are requesting payment.  Default is Sale.
					'paymentaction' => 'Sale',
					// Required.  IP address of the payer's browser.
					'ipaddress' => $_SERVER['REMOTE_ADDR'],
					// Flag to determine whether you want the results returned by FMF.  1 or 0.  Default is 0.
					'returnfmfdetails' => '1'
			);


			$CCDetails = array(
					// Required. Type of credit card.  Visa, MasterCard, Discover, Amex, Maestro, Solo.
					// If Maestro or Solo, the currency code must be GBP.  In addition, either start date or issue number must be specified.
					'creditcardtype' => $billing_info['_reg-page-billing-card-type-' . $this->_gateway_name ]['value'],
					// Required.  Credit card number.  No spaces or punctuation.
					'acct' => $billing_info['_reg-page-billing-card-nmbr-' . $this->_gateway_name ]['value'],
					// Required.  Credit card expiration date.  Format is MMYYYY
					'expdate' => $billing_info['_reg-page-billing-card-exp-date-mnth-' . $this->_gateway_name ]['value'] . '20' . $billing_info['_reg-page-billing-card-exp-date-year-' . $this->_gateway_name ]['value'],
					// Requirements determined by your PayPal account settings.  Security digits for credit card.
					'cvv2' => $billing_info['_reg-page-billing-card-ccv-code-' . $this->_gateway_name ]['value'],
					// Month and year that Maestro or Solo card was issued.  MMYYYY
					'startdate' => '',
					// Issue number of Maestro or Solo card.  Two numeric digits max.
					'issuenumber' => ''
			);

			$PayerInfo = array(
					// Email address of payer.
					'email' => $billing_info['_reg-page-billing-email-' . $this->_gateway_name ]['value'],
					// Unique PayPal customer ID for payer.
					'payerid' => '',
					// Status of payer.  Values are verified or unverified
					'payerstatus' => '',
					// Payer's business name.
					'business' => ''
			);

			$PayerName = array(
					// Payer's salutation.  20 char max.
					'salutation' => '',
					// Payer's first name.  25 char max.
					'firstname' => $billing_info['_reg-page-billing-fname-' . $this->_gateway_name ]['value'],
					// Payer's middle name.  25 char max.
					'middlename' => '',
					// Payer's last name.  25 char max.
					'lastname' => $billing_info['_reg-page-billing-lname-' . $this->_gateway_name ]['value'],
					// Payer's suffix.  12 char max.
					'suffix' => ''
			);

			$BillingAddress = array(
					// Required.  First street address.
					'street' => $billing_info['_reg-page-billing-address-' . $this->_gateway_name ]['value'],
					// Second street address.
					'street2' => '',
					// Required.  Name of City.
					'city' => $billing_info['_reg-page-billing-city-' . $this->_gateway_name ]['value'],
					// Required. Name of State or Province.
					'state' => $billing_info['_reg-page-billing-state-' . $this->_gateway_name ]['value'],
					// Required.  Country code.
					'countrycode' => 'US', //$billing_info['_reg-page-billing-country-' . $this->_gateway ]['value'],
					// Required.  Postal code of payer.
					'zip' => $billing_info['_reg-page-billing-zip-' . $this->_gateway_name ]['value'],
					// Phone Number of payer.  20 char max.
					'phonenum' => empty($billing_info['_reg-page-billing-phone-' . $this->_gateway_name ]['value']) ? '' : $billing_info['_reg-page-billing-phone-' . $this->_gateway_name ]['value']
			);
			EE_Registry::instance()->load_helper('Template');
			$PaymentDetails = array(
					// Required.  Total amount of order, including shipping, handling, and tax.
					'amt' => EEH_Template::format_currency($grand_total,true),
					// Required.  Three-letter currency code.  Default is USD.
					'currencycode' => $this->_payment_settings['currency_format'],
					// Required if you include itemized cart details. (L_AMTn, etc.)  Subtotal of items not including S&H, or tax.
					'itemamt' => EEH_Template::format_currency($item_amount,true),//
					// Total shipping costs for the order.  If you specify shippingamt, you must also specify itemamt.
					'shippingamt' => '',
					// Total handling costs for the order.  If you specify handlingamt, you must also specify itemamt.
					'handlingamt' => '',
					// Required if you specify itemized cart tax details. Sum of tax for all items on the order.  Total sales tax.
					'taxamt' => EEH_Template::format_currency($tax_amount,true),
					// Description of the order the customer is purchasing.  127 char max.
					'desc' => $description,
					// Free-form field for your own use.  256 char max.
					'custom' => $primary_registrant ? $primary_registrant->ID() : '',
					// Your own invoice or tracking number
					'invnum' => wp_generate_password(12,false),//$transaction->ID(),
					// URL for receiving Instant Payment Notifications.  This overrides what your profile is set to use.
					'notifyurl' => ''
			);



			// Wrap all data arrays into a single, "master" array which will be passed into the class function.
			$PayPalRequestData = array(
					'DPFields' => $DPFields,
					'CCDetails' => $CCDetails,
					'PayerName' => $PayerName,
					'BillingAddress' => $BillingAddress,
					'PaymentDetails' => $PaymentDetails,
					'OrderItems' => $OrderItems,
			);
//			var_dump($PayPalRequestData);die;
			// Pass the master array into the PayPal class function
			try{
				$PayPalResult = $this->DoDirectPayment($PayPalRequestData);
				//remove PCI-sensitive data so it doesn't get stored
				unset($PayPalResult['REQUESTDATA']['CREDITCARDTYPE']);
				unset($PayPalResult['REQUESTDATA']['ACCT']);
				unset($PayPalResult['REQUESTDATA']['EXPDATE']);
				unset($PayPalResult['REQUESTDATA']['CVV2']);
				unset($PayPalResult['RAWREQUEST']);
				$message = isset($PayPalResult['L_LONGMESSAGE0']) ? $PayPalResult['L_LONGMESSAGE0'] : $PayPalResult['ACK'];
				$approved = $this->_APICallSuccessful($PayPalResult);

				$primary_registration_code = $primary_registrant instanceof EE_Registration ? $primary_registrant->reg_code() : '';

				$payment = EE_Payment::new_instance(array(
								'TXN_ID' => $transaction->ID(),
								'STS_ID' => $approved ? EEM_Payment::status_id_approved : EEM_Payment::status_id_declined,
								'PAY_timestamp' => current_time( 'mysql', FALSE ),
								'PAY_method' => 'CART',
								'PAY_amount' => isset($PayPalResult['AMT']) ? $PayPalResult['AMT'] : 0,
								'PAY_gateway' => $this->_gateway_name,
								'PAY_gateway_response' => $message,
								'PAY_txn_id_chq_nmbr' => isset( $PayPalResult['TRANSACTIONID'] )? $PayPalResult['TRANSACTIONID'] : null,
								'PAY_po_number' => NULL,
								'PAY_extra_accntng' => $primary_registration_code,
								'PAY_via_admin' => false,
								'PAY_details' => (array) $PayPalResult));
				$payment->save();
				$this->update_transaction_with_payment($transaction, $payment);
				$return = array('success'=>true);
			}catch(Exception $e){
				$txn_results = array(
						'gateway' => $this->_payment_settings['display_name'],
						'approved' => FALSE,
						'status' => 'Declined',
						'response_msg' => $e->getMessage(),
						'amount' => '0.00',
						'method' => 'CC',
						'card_type' => $billing_info['_reg-page-billing-card-type-' . $this->_gateway_name ]['value'],
						'auth_code' => '',
						'md5_hash' => '',
						'transaction_id' => '',
						'invoice_number' => $primary_registrant instanceof EE_Registration ? $primary_registrant->ID() : '',
						'raw_response' => $e
				);
				$payment = EE_Payment::new_instance(array(
								'TXN_ID' => $transaction->ID(),
								'STS_ID' => EEM_Payment::status_id_failed,
								'PAY_timestamp' => current_time( 'mysql', FALSE ),
								'PAY_method' => 'CART',
								'PAY_amount' => 0,
								'PAY_gateway' => $this->_gateway_name,
								'PAY_gateway_response' => $e->getMessage(),
								'PAY_txn_id_chq_nmbr' => null,
								'PAY_po_number' => NULL,
								'PAY_extra_accntng' => null,
								'PAY_via_admin' => false,
								'PAY_details' => $e));
				$payment->save();
				$this->update_transaction_with_payment($transaction, $payment);
				EE_Registry::instance()->SSN->set_session_data( array( 'txn_results' => $txn_results ));

				$return = array('error'=>$e->getMessage());
			}
		}else{ // end if ($billing_info != 'no payment required')
			$return = array('success'=>true);
		}

		return $return;
	}

	private function DoDirectPayment($DataArray) {
		// Create empty holders for each portion of the NVP string
		$DPFieldsNVP = '&METHOD=DoDirectPayment&BUTTONSOURCE=AngellEYE_PHP_Class_DDP';
		$CCDetailsNVP = '';
		$PayerInfoNVP = '';
		$PayerNameNVP = '';
		$BillingAddressNVP = '';
		$ShippingAddressNVP = '';
		$PaymentDetailsNVP = '';
		$OrderItemsNVP = '';
		$Secure3DNVP = '';

		// DP Fields
		$DPFields = isset($DataArray['DPFields']) ? $DataArray['DPFields'] : array();
		foreach ($DPFields as $DPFieldsVar => $DPFieldsVal)
			$DPFieldsNVP .= '&' . strtoupper($DPFieldsVar) . '=' . urlencode($DPFieldsVal);

		// CC Details Fields
		$CCDetails = isset($DataArray['CCDetails']) ? $DataArray['CCDetails'] : array();
		foreach ($CCDetails as $CCDetailsVar => $CCDetailsVal)
			$CCDetailsNVP .= '&' . strtoupper($CCDetailsVar) . '=' . urlencode($CCDetailsVal);

		// PayerInfo Type Fields
		$PayerInfo = isset($DataArray['PayerInfo']) ? $DataArray['PayerInfo'] : array();
		foreach ($PayerInfo as $PayerInfoVar => $PayerInfoVal)
			$PayerInfoNVP .= '&' . strtoupper($PayerInfoVar) . '=' . urlencode($PayerInfoVal);

		// Payer Name Fields
		$PayerName = isset($DataArray['PayerName']) ? $DataArray['PayerName'] : array();
		foreach ($PayerName as $PayerNameVar => $PayerNameVal)
			$PayerNameNVP .= '&' . strtoupper($PayerNameVar) . '=' . urlencode($PayerNameVal);

		// Address Fields (Billing)
		$BillingAddress = isset($DataArray['BillingAddress']) ? $DataArray['BillingAddress'] : array();
		foreach ($BillingAddress as $BillingAddressVar => $BillingAddressVal)
			$BillingAddressNVP .= '&' . strtoupper($BillingAddressVar) . '=' . urlencode($BillingAddressVal);

		// Payment Details Type Fields
		$PaymentDetails = isset($DataArray['PaymentDetails']) ? $DataArray['PaymentDetails'] : array();
		foreach ($PaymentDetails as $PaymentDetailsVar => $PaymentDetailsVal)
			$PaymentDetailsNVP .= '&' . strtoupper($PaymentDetailsVar) . '=' . urlencode($PaymentDetailsVal);

		// Payment Details Item Type Fields
		$OrderItems = isset($DataArray['OrderItems']) ? $DataArray['OrderItems'] : array();
		$n = 0;
		foreach ($OrderItems as $OrderItemsVar => $OrderItemsVal) {
			$CurrentItem = $OrderItems[$OrderItemsVar];
			foreach ($CurrentItem as $CurrentItemVar => $CurrentItemVal)
				$OrderItemsNVP .= '&' . strtoupper($CurrentItemVar) . $n . '=' . urlencode($CurrentItemVal);
			$n++;
		}

		// Ship To Address Fields
		$ShippingAddress = isset($DataArray['ShippingAddress']) ? $DataArray['ShippingAddress'] : array();
		foreach ($ShippingAddress as $ShippingAddressVar => $ShippingAddressVal)
			$ShippingAddressNVP .= '&' . strtoupper($ShippingAddressVar) . '=' . urlencode($ShippingAddressVal);

		// 3D Secure Fields
		$Secure3D = isset($DataArray['Secure3D']) ? $DataArray['Secure3D'] : array();
		foreach ($Secure3D as $Secure3DVar => $Secure3DVal)
			$Secure3DNVP .= '&' . strtoupper($Secure3DVar) . '=' . urlencode($Secure3DVal);

		// Now that we have each chunk we need to go ahead and append them all together for our entire NVP string
		$NVPRequest = 'USER=' . $this->_payment_settings['username'] . '&PWD=' . $this->_payment_settings['password'] . '&VERSION=64.0' . '&SIGNATURE=' . $this->_payment_settings['signature'] . $DPFieldsNVP . $CCDetailsNVP . $PayerInfoNVP . $PayerNameNVP . $BillingAddressNVP . $PaymentDetailsNVP . $OrderItemsNVP . $ShippingAddressNVP . $Secure3DNVP;
		$NVPResponse = $this->_CURLRequest($NVPRequest);
		$NVPRequestArray = $this->_NVPToArray($NVPRequest);
		$NVPResponseArray = $this->_NVPToArray($NVPResponse);

		$Errors = $this->_GetErrors($NVPResponseArray);

		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;

		return $NVPResponseArray;
	}

// End function DoDirectPayment()

	private function _CURLRequest($Request) {
		$EndPointURL = $this->_payment_settings['use_sandbox'] ? 'https://api-3t.sandbox.paypal.com/nvp' : 'https://api-3t.paypal.com/nvp';
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_VERBOSE, 1);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($curl, CURLOPT_TIMEOUT, 60);
		curl_setopt($curl, CURLOPT_URL, $EndPointURL);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $Request);

		//execute the curl POST
		$Response = curl_exec($curl);

		curl_close($curl);

		return $Response;
	}

//End CURLRequest function

	private function _NVPToArray($NVPString) {

		// prepare responses into array
		$proArray = array();
		while (strlen($NVPString)) {
			// name
			$keypos = strpos($NVPString, '=');
			$keyval = substr($NVPString, 0, $keypos);
			// value
			$valuepos = strpos($NVPString, '&') ? strpos($NVPString, '&') : strlen($NVPString);
			$valval = substr($NVPString, $keypos + 1, $valuepos - $keypos - 1);
			// decoding the respose
			$proArray[$keyval] = urldecode($valval);
			$NVPString = substr($NVPString, $valuepos + 1, strlen($NVPString));
		}

		return $proArray;
	}

// End function NVPToArray()

	private function _APICallSuccessful($PayPalResult) {
		// check main response message from PayPal
		if (isset($PayPalResult['ACK']) && !empty($PayPalResult['ACK'])) {
			$ack = strtoupper($PayPalResult['ACK']);
			$approved = ( $ack == 'SUCCESS' || $ack == 'SUCCESSWITHWARNING' || $ack == 'PARTIALSUCCESS' ) ? TRUE : FALSE;
		}
		// check if CVV2 code matches
		if (isset($PayPalResult['CVV2MATCH']) && !empty($PayPalResult['CVV2MATCH'])) {
			$cvv2_matches = $PayPalResult['CVV2MATCH'] == 'M' ? TRUE : FALSE;
		}

		return $approved && $cvv2_matches ? TRUE : FALSE;
	}

	private function _GetErrors($DataArray) {

		$Errors = array();
		$n = 0;
		while (isset($DataArray['L_ERRORCODE' . $n . ''])) {
			$LErrorCode = isset($DataArray['L_ERRORCODE' . $n . '']) ? $DataArray['L_ERRORCODE' . $n . ''] : '';
			$LShortMessage = isset($DataArray['L_SHORTMESSAGE' . $n . '']) ? $DataArray['L_SHORTMESSAGE' . $n . ''] : '';
			$LLongMessage = isset($DataArray['L_LONGMESSAGE' . $n . '']) ? $DataArray['L_LONGMESSAGE' . $n . ''] : '';
			$LSeverityCode = isset($DataArray['L_SEVERITYCODE' . $n . '']) ? $DataArray['L_SEVERITYCODE' . $n . ''] : '';

			$CurrentItem = array(
					'L_ERRORCODE' => $LErrorCode,
					'L_SHORTMESSAGE' => $LShortMessage,
					'L_LONGMESSAGE' => $LLongMessage,
					'L_SEVERITYCODE' => $LSeverityCode
			);

			array_push($Errors, $CurrentItem);
			$n++;
		}

		return $Errors;
	}

	/**
	 * 		nothing to see here...  move along....
	 * 		@access protected
	 * 		@return void
	 */
	private function _DisplayErrors($Errors) {
		$error = '';
		foreach ($Errors as $ErrorVar => $ErrorVal) {
			$CurrentError = $Errors[$ErrorVar];
			foreach ($CurrentError as $CurrentErrorVar => $CurrentErrorVal) {
				if ($CurrentErrorVar == 'L_ERRORCODE')
					$CurrentVarName = 'Error Code';
				elseif ($CurrentErrorVar == 'L_SHORTMESSAGE')
					$CurrentVarName = 'Short Message';
				elseif ($CurrentErrorVar == 'L_LONGMESSAGE')
					$CurrentVarName = 'Long Message';
				elseif ($CurrentErrorVar == 'L_SEVERITYCODE')
					$CurrentVarName = 'Severity Code';

				$error .= '<br />' . $CurrentVarName . ': ' . $CurrentErrorVal;
			}
		}
		return $error;
	}

	/**
	 * 		display this payment option on the frontedn of the site
	 * 		@access public
	 * 		@return void
	 */
	public function espresso_display_payment_gateways( $selected_gateway = '' ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		$this->_css_class = $selected_gateway == $this->_gateway_name ? '' : ' hidden';
		echo $this->_generate_payment_gateway_selection_button();
		?>

		<div id="reg-page-billing-info-<?php echo $this->_gateway_name; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">

			<?php
			// check for sandbox mode
			if ($this->_payment_settings['use_sandbox'] || $this->_payment_settings['test_transactions']) :
				?>
				<div class="sandbox-panel">
					<h2 class="section-title"><?php _e('PayPal Sandbox Mode', 'event_espresso'); ?></h2>
					<h3 style="color:#ff0000;"><?php _e('Debug Mode Is Turned On. Payments will not be processed', 'event_espresso'); ?></h3>

					<p class="test-credit-cards-info-pg" style="margin-bottom:0;">
						<strong><?php _e('Testing Guidelines', 'event_espresso'); ?></strong>
					</p>
					<ul style="margin:1em 2em 1.5em; line-height:1.2em;">
						<li><?php _e('While testing, use the credit card number listed below. Other numbers will produce an error.', 'event_espresso'); ?></li>
						<li><?php _e('Expiry Date can be any valid date in the future', 'event_espresso'); ?></li>
						<li><?php printf(_e('CVV2 should be 115 (see %s paypals documentation for other special codes %s)', 'event_espresso'),'<a href="https://cms.paypal.com/ca/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_testing_SBTestErrorConditions#id108HH0RJ0TS">','</a>'); ?></li>
					</ul>

					<p class="test-credit-cards-info-pg">
						<strong><?php _e('Credit Card Numbers Used for Testing', 'event_espresso'); ?></strong><br/>
						<span class="small-text"><?php _e('Use the following credit card numbers for testing. Any other card number produces a general failure.', 'event_espresso'); ?></span>
					</p>

					<div class="tbl-wrap">
						<table id="paypal-test-credit-cards" class="test-credit-card-data-tbl">
							<thead>
								<tr>
									<td style="width:40%;"><?php _e('Test Card Type', 'event_espresso'); ?></td>
									<td><?php _e('Test Card Numbers', 'event_espresso'); ?></td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><?php _e('Master Card', 'event_espresso'); ?></td>
									<td>5424180818927383</td>
								</tr>
							</tbody>
						</table>
					</div><br/>

					<p class="test-credit-cards-info-pg">
						<strong><?php _e('Testing Result Code Responses', 'event_espresso'); ?></strong><br/>
						<span class="small-text"><?php printf(__('You can use the amount of the transaction to generate a particular result code (see %s Paypal\'s documentation%s). The table below lists the general guidelines for specifying amounts. IMPORTANT: before you attempt any of these, ensure your sandbox paypal account has %s "Negative Testing" set to on%s. Also be aware that you can generate AVS errors by using certain strings in your address field, and CVV errors using certain CVV values. See %s this paypal doc %s', 'event_espresso'),"<a href='https://developer.paypal.com/docs/classic/api/errorcodes/#id09C3GA00GR1'>","</a>", "<a href='https://docs.google.com/a/eventespresso.com/file/d/0B5P8GXTvZgfMNXNkZ2s5VUlHTUk/edit?usp=drivesdk'>","</a>","<a href='https://cms.paypal.com/ca/cgi-bin/?cmd=_render-content&content_ID=developer/e_howto_testing_SBTestErrorConditions'>","</a>"); ?></span>
					</p>

					<div class="tbl-wrap">
						<table id="paypal-test-credit-cards" class="test-credit-card-data-tbl">
							<thead>
								<tr>
									<td style="width:30%;"><?php _e('Amount', 'event_espresso'); ?></td>
									<td><?php _e('Response', 'event_espresso'); ?></td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>$0 - $103.99</td>
									<td><?php _e('Approved', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$104.00</td>
									<td><?php _e('Invalid amount', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$104.02</td>
									<td><?php _e('Invalid transaction type', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$104.05</td>
									<td><?php _e('Field format error', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$105.02</td>
									<td><?php _e('Invalid expiry date', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$105.04</td>
									<td><?php _e('CVV2 Mismatch', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$105.06</td>
									<td><?php _e('Declined', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$105.22</td>
									<td><?php _e('Invalid account number', 'event_espresso'); ?></td>
								</tr>
								<tr>
									<td>$105.36</td>
									<td><?php _e('Invalid account number', 'event_espresso'); ?></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			<?php endif; ?>

			<h5><strong><?php _e('Billing Address', 'event_espresso'); ?></strong></h5>

			<?php $billing_inputs = $this->espresso_reg_page_billing_inputs(); ?>
			<?php echo $this->_generate_billing_info_form_fields($billing_inputs, 'address'); ?>

			<h5><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></h5>

			<?php echo $this->_generate_billing_info_form_fields($billing_inputs, 'credit_card'); ?>

		</div>

		<?php
	}

	/**
	 * 		format credit card types array
	 * 		@access private
	 * 		@return array
	 */
	private function _get_formated_credit_card_types() {

		$credit_cards = array();
		if (is_array($this->_payment_settings['credit_cards'])) {
			foreach ($this->_payment_settings['credit_cards'] as $credit_card) {
				$credit_cards[strtolower(sanitize_key($credit_card))] = $credit_card;
			}
		}
		return $credit_cards;
	}

	/**
	 * 		billing inputs
	 * 		@access public
	 * 		@return array
	 */
	public function espresso_reg_page_billing_inputs() {

		$reg_page_billing_inputs = array(
				'_reg-page-billing-fname-' . $this->_gateway_name => array(
						'db-col' => 'fname',
						'label' => __('First Name', 'event_espresso'),
						'input' => EEM_Question::QST_type_text,
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'_reg-page-billing-lname-' . $this->_gateway_name => array(
						'db-col' => 'lname',
						'label' => __('Last Name', 'event_espresso'),
						'input' => EEM_Question::QST_type_text,
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'_reg-page-billing-email-' . $this->_gateway_name => array(
						'db-col' => 'email',
						'label' => __('Email Address', 'event_espresso'),
						'input' => EEM_Question::QST_type_text,
						'type' => 'string',
						'sanitize' => 'email',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'_reg-page-billing-phone-' . $this->_gateway_name => array(
						'db-col' => 'phone',
						'label' => __('Phone Number', 'event_espresso'),
						'input' => EEM_Question::QST_type_text,
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'_reg-page-billing-address-' . $this->_gateway_name => array(
						'db-col' => 'address',
						'label' => __('Address', 'event_espresso'),
						'input' => EEM_Question::QST_type_text,
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'_reg-page-billing-city-' . $this->_gateway_name => array(
						'db-col' => 'city',
						'label' => __('City', 'event_espresso'),
						'input' => EEM_Question::QST_type_text,
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'_reg-page-billing-state-' . $this->_gateway_name => array(
						'db-col' => 'state',
						'label' => __('State', 'event_espresso'),
						'input' => EEM_Question::QST_type_dropdown,
						'options' => array(),
						'type' => 'int',
						'sanitize' => 'absint',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%d'
				),
				'_reg-page-billing-country-' . $this->_gateway_name => array(
						'db-col' => 'country',
						'label' => __('Country', 'event_espresso'),
						'input' => EEM_Question::QST_type_dropdown,
						'options' => array(),
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'_reg-page-billing-zip-' . $this->_gateway_name => array(
						'db-col' => 'zip',
						'label' => __('Zip Code', 'event_espresso'),
						'input' => EEM_Question::QST_type_text,
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'_reg-page-billing-card-nmbr-' . $this->_gateway_name => array(
						'db-col' => 'card-nmbr',
						'label' => __('Credit Card #', 'event_espresso'),
						'input' => EEM_Question::QST_type_text,
						'type' => 'int',
						'sanitize' => 'ccard',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%d'
				),
				'_reg-page-billing-card-type-' . $this->_gateway_name => array(
						'db-col' => 'card-type',
						'label' => __('Credit Card Type', 'event_espresso'),
						'input' => EEM_Question::QST_type_dropdown,
						'options' => $this->_get_formated_credit_card_types(),
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => '',
						'format' => '%s'
				),
				'_reg-page-billing-card-exp-date-mnth-' . $this->_gateway_name => array(
						'db-col' => 'exp-date-mnth',
						'label' => __('Expiry Date Month', 'event_espresso'),
						'input' => EEM_Question::QST_type_dropdown,
						'type' => 'int',
						'sanitize' => 'ccmm',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'_reg-page-billing-card-exp-date-year-' . $this->_gateway_name => array(
						'db-col' => 'exp-date-year',
						'label' => __('Expiry Date Year', 'event_espresso'),
						'input' => EEM_Question::QST_type_dropdown,
						'type' => 'int',
						'sanitize' => 'ccyy',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'_reg-page-billing-card-ccv-code-' . $this->_gateway_name => array(
						'db-col' => 'ccv-code',
						'label' => __('CCV Code', 'event_espresso'),
						'input' => EEM_Question::QST_type_text,
						'type' => 'int',
						'sanitize' => 'ccv',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%d'
				)
		);

		return $reg_page_billing_inputs;
	}

}
