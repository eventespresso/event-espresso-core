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
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.1.P.7
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
Class EE_Paypal_Pro extends EE_Gateway {

	private static $_instance = NULL;



	/**
	 * 		@singleton method used to instantiate class object
	 * 		@access public
	 * 		@return class instance
	 */
	public static function instance( EEM_Gateways &$model) {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self($model);
		}
		return self::$_instance;
	}



	/**
	 * 		constructor
	 * 		@access protected
	 * 		@return void
	 */
	protected function __construct( EEM_Gateways &$model) {
		$this->_gateway = 'Paypal_Pro';
		$this->_button_base = 'logo-paypal_pro.png';
		$this->_path = str_replace( '\\', '/', __FILE__ );
		parent::__construct($model);
	}




	/**
	 * 		sets some defaults
	 * 		@access protected
	 * 		@return void
	 */
	protected function _default_settings() {
		$this->_payment_settings['active'] = false;
		$this->_payment_settings['email'] = '';
		$this->_payment_settings['username'] = false;
		$this->_payment_settings['password'] = false;
		$this->_payment_settings['currency_format'] = false;
		$this->_payment_settings['currencsignaturey_format'] = false;
		$this->_payment_settings['credit_cards'] = false;		
		$this->_payment_settings['type'] = 'on-site';
		$this->_payment_settings['display_name'] = 'PayPal Pro';
		$this->_payment_settings['current_path'] = '';
	}



	/**
	 * 		update settings
	 * 		@access protected
	 * 		@return void
	 */
	protected function _update_settings() {

		if ( isset( $_POST['update_paypal_pro'] ) & check_admin_referer( 'espresso_form_check', 'add_paypal_pro_settings' )) {
		
			$this->_payment_settings['email'] = $_POST['email'];
			$this->_payment_settings['username'] = $_POST['username'];
			$this->_payment_settings['password'] = $_POST['password'];
			$this->_payment_settings['currency_format'] = $_POST['currency_format'];
			$this->_payment_settings['signature'] = $_POST['signature'];
			$this->_payment_settings['credit_cards'] = implode(",", empty($_POST['credit_cards']) ? array() : $_POST['credit_cards']);
			$this->_payment_settings['use_sandbox'] = empty($_POST['use_sandbox']) ? '' : $_POST['use_sandbox'];
	
			global $espresso_notices;
			if (update_option('payment_data_' . $espresso_wp_user, $payment_settings) == true) {
				$espresso_notices['updates'][] = __('PayPal Pro Payment Settings Updated!', 'event_espresso');
			} else {
				$espresso_notices['errors'][] = __('PayPal Pro Payment Settings were not saved! ', 'event_espresso');
			}

		}
	}



	/**
	 * 		display settings in the admin
	 * 		@access protected
	 * 		@return void
	 */
	protected function _display_settings() {

	?>
				<tr>
					<th><label for="paypal_pro_email">
							<?php _e('PayPal PRO Email', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="email" id="paypal_pro_email" size="35" value="<?php echo $this->_payment_settings['email']; ?>"></td>
				</tr>
				<tr>
					<th><label for="paypal_pro_username">
							<?php _e('PayPal API Username', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="username" id="paypal_pro_username" size="35" value="<?php echo $this->_payment_settings['username']; ?>"></td>
				</tr>
				<tr>
					<th><label for="paypal_pro_password">
							<?php _e('PayPal API Password', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="password" id="paypal_pro_password" size="35" value="<?php echo $this->_payment_settings['password']; ?>"></td>
				</tr>
				<tr>
					<th><label for="paypal_pro_signature">
							<?php _e('PayPal API Signature', 'event_espresso'); ?>
						</label></th>
					<td><input class="regular-text" type="text" name="signature" id="paypal_pro_signature" size="35" value="<?php echo $this->_payment_settings['signature']; ?>"></td>
				</tr>
				<tr>
					<th><label for="paypal_pro_currency_format">
							<?php _e('Country Currency', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'paypal_pro_currency_info') ?>
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
					<th><label>
							<?php _e('Accepted Credit Cards', 'event_espresso'); ?>
						</label>
					</th>
					<td><?php
						$checked = 'checked="checked"';
						$credit_cards = explode(",", $this->_payment_settings['credit_cards']);
							?>
						<input type="checkbox" name="credit_cards[]" size="35" value="Visa" <?php echo in_array("Visa", $credit_cards) ? $checked : ''; ?> />
						<?php _e('Visa', 'event_espresso'); ?>
						<input type="checkbox" name="credit_cards[]" size="35" value="MasterCard" <?php echo in_array("MasterCard", $credit_cards) ? $checked : ''; ?> />
						<?php _e('Master Card', 'event_espresso'); ?>
						<input type="checkbox" name="credit_cards[]" size="35" value="Amex" <?php echo in_array("Amex", $credit_cards) ? $checked : ''; ?> />
						<?php _e('Amex', 'event_espresso'); ?>
						<input type="checkbox" name="credit_cards[]" size="35" value="Discover" <?php echo in_array("Discover", $credit_cards) ? $checked : ''; ?> />
						<?php _e('Discover', 'event_espresso'); ?>
					</td>
				</tr>
				<tr>
					<th><label for="paypal_pro_use_sandbox">
							<?php _e('Use the Debugging Feature and the PayPal Sandbox', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'paypal_pro_sandbox_info'); ?>
						</label></th>
					<td><?php echo select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?>
						<br />
						<span class="description">
							<?php _e('Make sure you enter the sandbox credentials above.', 'event_espresso'); ?>
						</span></td>
				</tr>


<!--		<p>
			<input type="hidden" name="update_<?php echo $this->_gateway; ?>" value="update_<?php echo $this->_gateway; ?>">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update PayPal PRO Settings', 'event_espresso') ?>" id="save_paypal_settings" />
		</p>-->

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
	public function espresso_gateway_process_step_3() {
	
		global $EE_Session;
		$session_data = $EE_Session->get_session_data();
		$billing_info = $session_data['billing_info'];

		if ($billing_info != 'no payment required') {

			$reg_info = $session_data['cart']['REG'];
			$primary_attendee = $session_data['primary_attendee'];
			$grand_total = $session_data['_cart_grand_total_amount'];

			$taxes = $session_data['tax_totals'];
			$total_taxes = 0;
			foreach ($taxes as $tax) {
				$grand_total += $tax;
				$total_taxes += $tax;
			}
			
			// Include required files.
			require_once('includes/paypal.nvp.class.php');
			
			// Setup PayPal object
			$PayPalConfig = array(
							'Sandbox' => $this->_payment_settings['use_sandbox'] ? TRUE : FALSE, 
							'APIUsername' => $this->_payment_settings['username'], 
							'APIPassword' => $this->_payment_settings['password'], 
							'APISignature' => $this->_payment_settings['signature']
					);
			$PayPal = new PayPal($PayPalConfig);
			
			
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
				'creditcardtype' => $billing_info['reg-page-billing-card-type']['value'], 
				// Required.  Credit card number.  No spaces or punctuation.
				'acct' => $billing_info['reg-page-billing-card-nmbr']['value'], 
				// Required.  Credit card expiration date.  Format is MMYYYY
				'expdate' => $billing_info['reg-page-billing-card-exp-date-mnth']['value'] . '20' . $billing_info['reg-page-billing-card-exp-date-year']['value'],
				// Requirements determined by your PayPal account settings.  Security digits for credit card.
				'cvv2' => $billing_info['reg-page-billing-card-ccv-code']['value'], 
				// Month and year that Maestro or Solo card was issued.  MMYYYY
				'startdate' => '', 
				// Issue number of Maestro or Solo card.  Two numeric digits max.
				'issuenumber' => ''	   
			);
			
			$PayerInfo = array(
				// Email address of payer.
				'email' => $billing_info['reg-page-billing-email']['value'], 
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
				'firstname' => $billing_info['reg-page-billing-fname']['value'], 
				// Payer's middle name.  25 char max.
				'middlename' => '', 
				// Payer's last name.  25 char max.
				'lastname' => $billing_info['reg-page-billing-lname']['value'], 
				// Payer's suffix.  12 char max.
				'suffix' => ''	   
			);
			
			$BillingAddress = array(
				// Required.  First street address.
				'street' => $billing_info['reg-page-billing-address']['value'], 
				// Second street address.
				'street2' => '', 
				// Required.  Name of City.
				'city' => $billing_info['reg-page-billing-city']['value'], 
				// Required. Name of State or Province.
				'state' => $billing_info['reg-page-billing-state']['value'], 
				// Required.  Country code.
				'countrycode' => $billing_info['reg-page-billing-country']['value'], 
				// Required.  Postal code of payer.
				'zip' => $billing_info['reg-page-billing-zip']['value'], 
				// Phone Number of payer.  20 char max.
				'phonenum' => empty( $billing_info['reg-page-billing-phone']['value'] ) ? '' : $billing_info['reg-page-billing-phone']['value']	   
			);
			
			$ShippingAddress = array(
				// Required if shipping is included.  Person's name associated with this address.  32 char max.
				'shiptoname' => '', 
				// Required if shipping is included.  First street address.  100 char max.
				'shiptostreet' => '', 
				// Second street address.  100 char max.
				'shiptostreet2' => '', 
				// Required if shipping is included.  Name of city.  40 char max.
				'shiptocity' => '', 
				// Required if shipping is included.  Name of state or province.  40 char max.
				'shiptostate' => '', 
				// Required if shipping is included.  Postal code of shipping address.  20 char max.
				'shiptozip' => '', 
				// Required if shipping is included.  Country code of shipping address.  2 char max.
				'shiptocountrycode' => '', 
				// Phone number for shipping address.  20 char max.
				'shiptophonenum' => ''	 
			);
			
			$PaymentDetails = array(
				// Required.  Total amount of order, including shipping, handling, and tax.
				'amt' => $grand_total, 
				// Required.  Three-letter currency code.  Default is USD.
				'currencycode' => $this->_payment_settings['currency_format'], 
				// Required if you include itemized cart details. (L_AMTn, etc.)  Subtotal of items not including S&H, or tax.
				'itemamt' => $reg_info['sub_total'], 
				// Total shipping costs for the order.  If you specify shippingamt, you must also specify itemamt.
				'shippingamt' => '', 
				// Total handling costs for the order.  If you specify handlingamt, you must also specify itemamt.
				'handlingamt' => '', 
				// Required if you specify itemized cart tax details. Sum of tax for all items on the order.  Total sales tax.
				'taxamt' => $total_taxes, 
				// Description of the order the customer is purchasing.  127 char max.
				'desc' => $list_of_events, 
				// Free-form field for your own use.  256 char max.
				'custom' => '', 
				// Your own invoice or tracking number
				'invnum' => $session_data['transaction']->ID(), 
				// URL for receiving Instant Payment Notifications.  This overrides what your profile is set to use.
				'notifyurl' => ''	  
			);


						
			$OrderItems = array();
			
			foreach ( $reg_info['items'] as $item ) {
				$Item = array(
					// Item Name.  127 char max.
					'l_name' => stripslashes($item['name']), 
					// Item description.  127 char max.
					'l_desc' => $item['options']['price_desc'], 
					// Cost of individual item.
					'l_amt' => $item['price'], 
					// Item Number.  127 char max.
					'l_number' => $item['line_item'], 
					// Item quantity.  Must be any positive integer.
					'l_qty' => $item['qty'], 
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
			
			
			// Wrap all data arrays into a single, "master" array which will be passed into the class function.
			$PayPalRequestData = array(
				'DPFields' => $DPFields,
				'CCDetails' => $CCDetails,
				'PayerName' => $PayerName,
				'BillingAddress' => $BillingAddress,
				'PaymentDetails' => $PaymentDetails,
				'OrderItems' => $OrderItems
			);
			// printr( $PayPalRequestData, '$PayPalRequestData' );
			
			// Pass the master array into the PayPal class function
			$PayPalResult = $PayPal->DoDirectPayment($PayPalRequestData);
			printr( $PayPalResult, '$PayPalResult' );

			if ( APICallSuccessful( $PayPalResult['ACK'] )) {		
	
				if ($this->_payment_settings['use_sandbox']) {
					$payment_data->txn_id = $response->invoice_number;
				} else {
					$payment_data->txn_id = $response->transaction_id;
				}

				$payment_data->payment_status = $response->approved ? 'Approved' : 'Declined';

				do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $payment_data->payment_status);
	
				$txn_results = array(
						'gateway' => $this->_payment_settings['display_name'],
						'approved' => $response->approved ? $response->approved : 0,
						'status' => $payment_data->payment_status,
						'response_msg' => $response->response_reason_text,
						'amount' => $response->amount,
						'method' => $response->method,
						'card_type' => $response->card_type,
						'auth_code' => $response->authorization_code,
						'md5_hash' => $response->md5_hash,
						'transaction_id' => $response->transaction_id,
						'invoice_number' => $response->invoice_number,
						'raw_response' => $response
				);
	
				$EE_Session->set_session_data(array('txn_results' => $txn_results), $section = 'session_data');
	
				add_action('action_hook_espresso_email_after_payment', 'espresso_email_after_payment');	//<-- Should this be here ? or in the successful txn bit above ( after line 80 ? ) or does this send failed txn info as well /
				// return $payment_data;  <<<<-------  do we need to return success or FALSE or anything ?	
				
			} else {
				$Errors = GetErrors($PayPalResult);
				//printr( $Errors, '$Errors' );		
				DisplayErrors( $Errors );
			} 
		
		// return ? or redirect ?
		// we need to update the registration and transaction tables
		
		}  // end if ($billing_info != 'no payment required')
		
	}



	/**
	 * 		nothing to see here...  move along....
	 * 		@access protected
	 * 		@return void
	 */
	public function espresso_process_off_site_payment() {
		
	}



	/**
	 * 		display this payment option on the frontedn of the site
	 * 		@access public
	 * 		@return void
	 */
	public function espresso_display_payment_gateways() {

		global $css_class;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		// this filter allows whatever function is processing the registration page to know what inputs to expect
		add_filter('filter_hook_espresso_reg_page_billing_inputs', array(&$this, 'espresso_reg_page_billing_inputs_aim'));
		$use_sandbox = $this->_payment_settings['use_sandbox'] || $this->_payment_settings['test_transactions'];
		if ($use_sandbox) {
			$test_creds = '
		<h4 style="color:#ff0000;" title="Payments will not be processed">' . __('Debug Mode Is Turned On', 'event_espresso') . '</h4>
		<p style="color:#ff0000;">Test credit card # 4007000000027</p><br/>
		';
		} else {
			$test_creds = '';
		}
		?>

		<a id="payment-gateway-button-<?php echo $this->_gateway; ?>" class="reg-page-payment-option-lnk<?php echo $this->_css_link_class; ?>" rel="<?php echo $this->_gateway; ?>" href="<?php echo $this->_form_url; ?>" >
			<img src="<?php echo $this->_payment_settings['button_url']; ?>" alt="Pay using PayPal Pro" />
		</a>

		<div id="reg-page-billing-info-<?php echo $this->_gateway; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">

		<?php echo $test_creds; ?>

			<h5><strong><?php _e('Billing Address', 'event_espresso'); ?></strong></h5>
			
			<?php $billing_inputs = $this->espresso_reg_page_billing_inputs_paypal_pro(); ?>
			<?php $this->_generate_billing_info_form_fields( $billing_inputs, 'address' ); ?>

			<h5><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></h5>

			<?php $this->_generate_billing_info_form_fields( $billing_inputs, 'credit_card' ); ?>


		</div>

		<?php
	}



	/**
	 * 		billing inputs
	 * 		@access public
	 * 		@return array
	 */
	public function espresso_reg_page_billing_inputs_paypal_pro() {

		$reg_page_billing_inputs = array(
		
				'type' => 'onsite',
				
				'gateway' => 'PayPal_Pro',
				
				'reg-page-billing-fname' => array(
						'db-col' => 'fname',
						'label' => __('First Name', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-lname' => array(
						'db-col' => 'lname',
						'label' => __('Last Name', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-email' => array(
						'db-col' => 'email',
						'label' => __('Email Address', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'email',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-phone' => array(
						'db-col' => 'phone',
						'label' => __('Phone Number', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => FALSE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-address' => array(
						'db-col' => 'address',
						'label' => __('Address', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-city' => array(
						'db-col' => 'city',
						'label' => __('City', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-state' => array(
						'db-col' => 'state',
						'label' => __('State', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-zip' => array(
						'db-col' => 'zip',
						'label' => __('Zip Code', 'event_espresso'),
						'input' => 'text',
						'type' => 'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-card-nmbr' => array(
						'db-col' => 'card-nmbr',
						'label' => __('Credit Card Number', 'event_espresso'),
						'input' => 'text',
						'type' => 'int',
						'sanitize' => 'ccard',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%d'
				),
				
				'reg-page-billing-card-type' => array(
						'db-col' =>'card-type',
						'label' => __( 'Type of credit card', 'event_espresso' ),
						'input' =>'text',
						'type' =>'string',
						'sanitize' => 'no_html',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				), 

				'reg-page-billing-card-exp-date-mnth' => array(
						'db-col' => 'exp-date-mnth',
						'label' => __('Expiry Date Month', 'event_espresso'),
						'input' => 'select',
						'type' => 'int',
						'sanitize' => 'ccmm',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-card-exp-date-year' => array(
						'db-col' => 'exp-date-year',
						'label' => __('Expiry Date Year', 'event_espresso'),
						'input' => 'select',
						'type' => 'int',
						'sanitize' => 'ccyy',
						'required' => TRUE,
						'validation' => TRUE,
						'value' => NULL,
						'format' => '%s'
				),
				'reg-page-billing-card-ccv-code' => array(
						'db-col' => 'ccv-code',
						'label' => __('CCV Code', 'event_espresso'),
						'input' => 'text',
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