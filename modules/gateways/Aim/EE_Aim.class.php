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
 * @ version		 	4.0
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
Class EE_Aim extends EE_Onsite_Gateway {

	const LIVE_URL = 'https://secure.authorize.net/gateway/transact.dll'; //Authnet URL
	const SANDBOX_URL = 'https://test.authorize.net/gateway/transact.dll';

	private $VERIFY_PEER = false;
	private $_x_post_fields = array(
		"version" => "3.1",
		"delim_char" => ",",
		"delim_data" => "TRUE",
		"relay_response" => "FALSE",
		"encap_char" => "|",
	);

	/**
	 * A list of all fields in the AIM API.
	 * Used to warn user if they try to set a field not offered in the API.
	 */
	private $_all_aim_fields = array("address", "allow_partial_auth", "amount",
		"auth_code", "authentication_indicator", "bank_aba_code", "bank_acct_name",
		"bank_acct_num", "bank_acct_type", "bank_check_number", "bank_name",
		"card_code", "card_num", "cardholder_authentication_value", "city", "company",
		"country", "cust_id", "customer_ip", "delim_char", "delim_data", "description",
		"duplicate_window", "duty", "echeck_type", "email", "email_customer",
		"encap_char", "exp_date", "fax", "first_name", "footer_email_receipt",
		"freight", "header_email_receipt", "invoice_num", "last_name", "line_item",
		"login", "method", "phone", "po_num", "recurring_billing", "relay_response",
		"ship_to_address", "ship_to_city", "ship_to_company", "ship_to_country",
		"ship_to_first_name", "ship_to_last_name", "ship_to_state", "ship_to_zip",
		"split_tender_id", "state", "tax", "tax_exempt", "test_request", "tran_key",
		"trans_id", "type", "version", "zip"
	);

	/**
	 * Only used if merchant wants to send multiple line items about the charge.
	 */
	private $_additional_line_items = array();
	private static $_instance = NULL;

	public static function instance(EEM_Gateways &$model) {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !( self::$_instance instanceof EE_Aim )) {
			self::$_instance = new self($model);
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway_name = 'Aim';
		$this->_path = str_replace('\\', '/', __FILE__);
		parent::__construct($model);
	}

	protected function _default_settings() {
		$this->_payment_settings['authnet_aim_login_id'] = '';
		$this->_payment_settings['authnet_aim_transaction_key'] = '';
		$this->_payment_settings['use_sandbox'] = false;
		$this->_payment_settings['test_transactions'] = false;
		$this->_payment_settings['type'] = 'on-site';
		$this->_payment_settings['display_name'] = 'Authorize.net AIM';
		$this->_payment_settings['current_path'] = '';
		$this->_payment_settings['button_url'] = $this->_btn_img;
	}

	protected function _update_settings() {
		$this->_payment_settings['authnet_aim_login_id'] = $_POST['authnet_aim_login_id'];
		$this->_payment_settings['authnet_aim_transaction_key'] = $_POST['authnet_aim_transaction_key'];
		$this->_payment_settings['test_transactions'] = $_POST['test_transactions'];
		$this->_payment_settings['use_sandbox'] = $_POST['use_sandbox'];
		$this->_payment_settings['button_url'] = isset($_POST['button_url']) ? esc_url_raw($_POST['button_url']) : '';
	}

	protected function _display_settings() {
		?>
		<tr>
			<th><label for="authnet_aim_login_id">
					<?php _e('Authorize.net API Login ID', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="authnet_aim_login_id" id="authnet_aim_login_id" size="35" value="<?php echo $this->_payment_settings['authnet_aim_login_id']; ?>">
				<br />
				<span class="description">
					<?php _e('Please enter your Authorize.net API Login ID', 'event_espresso'); ?>
				</span></td>
		</tr>
		<tr>
			<th><label for="authnet_aim_transaction_key">
					<?php _e('Authorize.net Transaction Key', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="authnet_aim_transaction_key" id="authnet_aim_transaction_key" size="35" value="<?php echo $this->_payment_settings['authnet_aim_transaction_key']; ?>">
				<br />
				<span class="description">
					<?php _e('Please enter your Authorize.net Transaction Key.', 'event_espresso'); ?>
				</span></td>
		</tr>
		<tr>
			<th><label for="use_sandbox">
					<?php _e('Is this an account on the Authorize.net development server? ', 'event_espresso'); ?>
					<?php do_action( 'AHEE_help', 'authnet_aim_sandbox' ); ?>
				</label></th>
			<td><?php echo EEH_Form_Fields::select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?></td>
		</tr>
		<tr>
			<th><label for="test_transactions">
					<?php _e('Do you want to submit a test transaction? ', 'event_espresso'); ?>
					<?php do_action( 'AHEE_help', 'authnet_test_transactions' ) ?>
				</label></th>
			<td><?php echo EEH_Form_Fields::select_input('test_transactions', $this->_yes_no_options, $this->_payment_settings['test_transactions']); ?></td>
		</tr>
		<?php
	}

	protected function _display_settings_help() {
		?>

		<div id="authnet_aim_sandbox" style="display:none">
			<h2>
				<?php _e('Authorize.net AIM Test Mode', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('Test Mode allows you to submit test transactions to the payment gateway. Transactions that are submitted while Test Mode is ON are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?>
			</p>
			<p><strong>
					<?php _e('Example Card Numbers:', 'event_espresso'); ?>
				</strong></p>
			<p>370000000000002 (
				<?php _e('American Express', 'event_espresso'); ?>
				)<br />
				6011000000000012 (
				<?php _e('Discover', 'event_espresso'); ?>
				)<br />
				5424000000000015 (
				<?php _e('MasterCard', 'event_espresso'); ?>
				)<br />
				4007000000027 (
				<?php _e('Visa', 'event_espresso'); ?>
				)</p>
		</div>
		<?php
	}

	/**
	 * @param EE_Line_Item $line_item
	 * @return boolean
	 */
	public function process_payment_start(EE_Line_Item $total_line_item, $transaction=null, $total_to_charge = null) {
		$session_data = EE_Registry::instance()->SSN->get_session_data();
		$billing_info = $session_data['billing_info'];

		if ($billing_info != 'no payment required') {
			$this->_save_billing_info_to_attendee($billing_info, $transaction);
			// Enable test mode if needed
			//4007000000027  <-- test successful visa
			//4222222222222  <-- test failure card number
			if ($this->_payment_settings['use_sandbox']) {
				define("AUTHORIZENET_SANDBOX", true);
				define("AUTHORIZENET_LOG_FILE", true);
			} else {
				define("AUTHORIZENET_SANDBOX", false);
			}

			$item_num = 1;
			if(!$transaction){
				$transaction = $total_line_item->transaction();
			}
			$order_description = '';
			$primary_registrant = $transaction->primary_registration();
			//if we're are charging for the full amount, show the normal line items
			if( $total_to_charge === NULL && ! $transaction->paid()){//client code specified an amount
				foreach ($total_line_item->get_items() as $line_item) {
					$this->addLineItem($item_num++, $line_item->name(), $line_item->desc(), $line_item->quantity(), $line_item->unit_price(), 'N');
					$order_description .= $line_item->desc().', ';
				}
				$total_to_charge = $total_line_item->total();//$session_data['_cart_grand_total_amount'];
				foreach($total_line_item->tax_descendants() as $tax_line_item){
					$this->addLineItem($item_num++, $tax_line_item->name(), $tax_line_item->desc(), 1, $tax_line_item->total(), 'N');
				}
			}else{//partial payment
				if( ! $total_to_charge){//they didn't set the total to charge, so it must have a balance
					$total_to_charge = $transaction->remaining();
				}
				$order_description = sprintf(__("Partial payment of %s for %s", "event_espresso"),$total_to_charge,$primary_registrant->reg_code());
			}

			
			

			//start transaction
			$this->setField('amount', $total_to_charge);
			$this->setField('description',substr(rtrim($order_description, ', '), 0, 255));
			$this->setField('card_num', $billing_info['_reg-page-billing-card-nmbr-' . $this->_gateway_name]['value']);
			$this->setField('exp_date', $billing_info['_reg-page-billing-card-exp-date-mnth-' . $this->_gateway_name]['value'] . $billing_info['_reg-page-billing-card-exp-date-year-' . $this->_gateway_name]['value']);
			$this->setField('card_code', $billing_info['_reg-page-billing-card-ccv-code-' . $this->_gateway_name]['value']);
			$this->setField('first_name', $billing_info['_reg-page-billing-fname-' . $this->_gateway_name]['value']);
			$this->setField('last_name', $billing_info['_reg-page-billing-lname-' . $this->_gateway_name]['value']);
			$this->setField('email', $billing_info['_reg-page-billing-email-' . $this->_gateway_name]['value']);
			$this->setField('address', $billing_info['_reg-page-billing-address-' . $this->_gateway_name]['value']);
			$this->setField('city', $billing_info['_reg-page-billing-city-' . $this->_gateway_name]['value']);
			$this->setField('state', $billing_info['_reg-page-billing-state-' . $this->_gateway_name]['value']);
			$this->setField('zip', $billing_info['_reg-page-billing-zip-' . $this->_gateway_name]['value']);
			$this->setField('cust_id', $primary_registrant->ID());
			//invoice_num would be nice to have itbe unique per SPCO page-load, that way if users
			//press back, they don't submit a duplicate. However, we may be keepin g the user on the same spco page
			//in which case, we need to generate the invoice num per request right here...
			$this->setField('invoice_num', wp_generate_password(12,false));//$billing_info['_reg-page-billing-invoice-'.$this->_gateway_name]['value']);


			if ($this->_payment_settings['test_transactions']) {
				$this->test_request = "true";
			}

			//Capture response
			$response = $this->authorizeAndCapture();
			if (!empty($response)){
				if ($this->_payment_settings['use_sandbox']) {
					$txn_id = $response->invoice_number;
				} else {
					$txn_id = $response->transaction_id;
				}
				$payment_status = $response->approved ? EEM_Payment::status_id_approved : EEM_Payment::status_id_declined;
				$this->_debug_log("<hr>No Previous IPN payment received. Create a new one");
				//no previous payment exists, create one
				$primary_registration_code = !empty($primary_registrant) ? $primary_registrant->reg_code() : '';

				$payment = EE_Payment::new_instance(array(
							'TXN_ID' => $transaction->ID(),
							'STS_ID' => $payment_status,
							'PAY_timestamp' => current_time( 'mysql', FALSE ),
							'PAY_method' => 'CART',
							'PAY_amount' => $response->amount,
							'PAY_gateway' => $this->_gateway_name,
							'PAY_gateway_response' => $response->response_reason_text,
							'PAY_txn_id_chq_nmbr' => $txn_id,
							'PAY_po_number' => NULL,
							'PAY_extra_accntng' => $primary_registration_code,
							'PAY_via_admin' => false,
							'PAY_details' => (array) $response));

				$success = $payment->save();
				$successful_update_of_transaction = $this->update_transaction_with_payment($transaction, $payment);
				//we successfully got a response from AIM. the payment might not necessarily have gone through
				//but we did our job, so return success
				$return = array('success' => true);

			} else {
				$payment = EE_Payment::new_instance(array(
								'TXN_ID' => $transaction->ID(),
								'STS_ID' => EEM_Payment::status_id_failed,
								'PAY_timestamp' => current_time( 'mysql', FALSE ),
								'PAY_method' => 'CART',
								'PAY_amount' => 0,
								'PAY_gateway' => $this->_gateway_name,
								'PAY_gateway_response' => $response->response_reason_text,
								'PAY_txn_id_chq_nmbr' => null,
								'PAY_po_number' => NULL,
								'PAY_extra_accntng' => $primary_registration_code,
								'PAY_via_admin' => false,
								'PAY_details' => (array) $response));
				$payment->save();
				$return = array('error' => __("Error communicating with Authorize.Net (AIM)", "event_espresso"));
			}
		} else {
			$return = array('success' => true);
			// no payment required
		}

		return $return;
	}

	/**
	 * Set an individual name/value pair. This will append x_ to the name
	 * before posting.
	 *
	 * @param string $name
	 * @param string $value
	 */
	private function setField($name, $value) {
		if (in_array($name, $this->_all_aim_fields)) {
			$this->_x_post_fields[$name] = $value;
		} else {
			throw new AuthorizeNetException("Error: no field $name exists in the AIM API.
			To set a custom field use setCustomField('field','value') instead.");
		}
	}

	/**
	 * Add a line item.
	 *
	 * @param string $item_id
	 * @param string $item_name
	 * @param string $item_description
	 * @param string $item_quantity
	 * @param string $item_unit_price
	 * @param string $item_taxable
	 */
	public function addLineItem($item_id, $item_name, $item_description, $item_quantity, $item_unit_price, $item_taxable) {
		$args = array(
			substr($item_id, 0, 31),
			substr($item_name, 0, 31),
			substr($item_description, 0, 255),
			number_format(abs($item_quantity), 2, '.', ''),
			number_format(abs($item_unit_price), 2, '.', ''),
			$item_taxable == 'N' ? 'N' : 'Y'
			);
		$this->_additional_line_items[] = implode('<|>', $args);
	}

	public function espresso_display_payment_gateways( $selected_gateway = '' ) {

		$this->_css_class = $selected_gateway == $this->_gateway_name ? '' : ' hidden';
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		global $css_class;


		echo $this->_generate_payment_gateway_selection_button();

		$gw = $this->_gateway_name;
		?>


		<div id="reg-page-billing-info-<?php echo $gw; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">

		<?php if ($this->_payment_settings['use_sandbox'] || $this->_payment_settings['test_transactions']) : ?>
				<h4 style="color:#ff0000;" title="Payments will not be processed"><?php _e('Authorize.net AIM Debug Mode Is Turned On', 'event_espresso'); ?></h4>
				<p style="color:#ff0000;"><?php _e('Test credit card ', 'event_espresso'); ?># 4007000000027</p><br/>
		<?php endif; ?>

			<h5><strong><?php _e('Billing Address', 'event_espresso'); ?></strong></h5>

			<?php $billing_inputs = $this->espresso_reg_page_billing_inputs(); ?>
			<?php echo $this->_generate_billing_info_form_fields($billing_inputs, 'address'); ?>

			<h5><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></h5>

			<?php echo $this->_generate_billing_info_form_fields($billing_inputs, 'credit_card'); ?>

			<input type='hidden' id='_reg-page-billing-invoice-<?php echo $gw; ?>' name='_reg-page-billing-invoice-<?php echo $gw; ?>' value='<?php echo wp_generate_password(12,false) ?>' />

		</div>

		<?php
	}

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
				'label' => __('Credit Card Number', 'event_espresso'),
				'input' => EEM_Question::QST_type_text,
				'type' => 'int',
				'sanitize' => 'ccard',
				'required' => TRUE,
				'validation' => TRUE,
				'value' => NULL,
				'format' => '%d'
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

	/**
	 * Do an AUTH_CAPTURE transaction.
	 *
	 * Required "x_" fields: card_num, exp_date, amount
	 *
	 * @param string $amount   The dollar amount to charge
	 * @param string $card_num The credit card number
	 * @param string $exp_date CC expiration date
	 *
	 * @return EE_AuthorizeNetAIM_Response
	 */
	public function authorizeAndCapture($amount = false, $card_num = false, $exp_date = false) {
		($amount ? $this->amount = $amount : null);
		($card_num ? $this->card_num = $card_num : null);
		($exp_date ? $this->exp_date = $exp_date : null);
		$this->type = "AUTH_CAPTURE";
		return $this->_sendRequest();
	}

	/**
	 * Posts the request to AuthorizeNet & returns response.
	 *
	 * @return AuthorizeNetARB_Response The response.
	 */
	private function _sendRequest() {
		$this->_x_post_fields['login'] = $this->_payment_settings['authnet_aim_login_id'];
		$this->_x_post_fields['tran_key'] = $this->_payment_settings['authnet_aim_transaction_key'];
		$this->_post_string = "";
		foreach ($this->_x_post_fields as $key => $value) {
			$this->_post_string .= "x_$key=" . urlencode($value) . "&";
		}
		// Add line items
		foreach ($this->_additional_line_items as $key => $value) {
			$this->_post_string .= "x_line_item=" . urlencode($value) . "&";
		}
		$this->_post_string = rtrim($this->_post_string, "& ");
		$post_url = ($this->_payment_settings['use_sandbox'] ? self::SANDBOX_URL : self::LIVE_URL);
		$curl_request = curl_init($post_url);
		curl_setopt($curl_request, CURLOPT_POSTFIELDS, $this->_post_string);
		curl_setopt($curl_request, CURLOPT_HEADER, 0);
		curl_setopt($curl_request, CURLOPT_TIMEOUT, 45);
		curl_setopt($curl_request, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl_request, CURLOPT_SSL_VERIFYHOST, 2);
		if ($this->VERIFY_PEER) {
			curl_setopt($curl_request, CURLOPT_CAINFO, dirname(dirname(__FILE__)) . '/ssl/cert.pem');
		} else {
			curl_setopt($curl_request, CURLOPT_SSL_VERIFYPEER, false);
		}

		if (preg_match('/xml/', $post_url)) {
			curl_setopt($curl_request, CURLOPT_HTTPHEADER, Array("Content-Type: text/xml"));
		}

		$response = curl_exec($curl_request);

		curl_close($curl_request);

		return new EE_AuthorizeNetAIM_Response($response);
	}

}

/**
 * Parses an AuthorizeNet AIM Response.
 *
 * @package	AuthorizeNet
 * @subpackage AuthorizeNetAIM
 */
class EE_AuthorizeNetAIM_Response {

	const APPROVED = 1;
	const DECLINED = 2;
	const ERROR = 3;
	const HELD = 4;

	protected $_x_post_fields = array(
		"version" => "3.1",
		"delim_char" => ",",
		"delim_data" => "TRUE",
		"relay_response" => "FALSE",
		"encap_char" => "|",
	);
	public $approved;
	public $declined;
	public $error;
	public $held;
	public $response_code;
	public $response_subcode;
	public $response_reason_code;
	public $response_reason_text;
	public $authorization_code;
	public $avs_response;
	public $transaction_id;
	public $invoice_number;
	public $description;
	public $amount;
	public $method;
	public $transaction_type;
	public $customer_id;
	public $first_name;
	public $last_name;
	public $company;
	public $address;
	public $city;
	public $state;
	public $zip_code;
	public $country;
	public $phone;
	public $fax;
	public $email_address;
	public $ship_to_first_name;
	public $ship_to_last_name;
	public $ship_to_company;
	public $ship_to_address;
	public $ship_to_city;
	public $ship_to_state;
	public $ship_to_zip_code;
	public $ship_to_country;
	public $tax;
	public $duty;
	public $freight;
	public $tax_exempt;
	public $purchase_order_number;
	public $md5_hash;
	public $card_code_response;
	public $cavv_response; // cardholder_authentication_verification_response
	public $account_number;
	public $card_type;
	public $split_tender_id;
	public $requested_amount;
	public $balance_on_card;
	public $response; // The response string from AuthorizeNet.
	private $_response_array = array(); // An array with the split response.

	/**
	 * Constructor. Parses the AuthorizeNet response string.
	 *
	 * @param string $response	  The response from the AuthNet server.
	 * @param string $delimiter	 The delimiter used (default is ",")
	 * @param string $encap_char	The encap_char used (default is "|")
	 * @param array  $custom_fields Any custom fields set in the request.
	 */

	public function __construct($response) {
		$encap_char = $this->_x_post_fields['encap_char'];
		$delimiter = $this->_x_post_fields['delim_char'];
		if ($response) {

			// Split Array
			$this->response = $response;
			if ($encap_char) {
				$this->_response_array = explode($encap_char . $delimiter . $encap_char, substr($response, 1, -1));
			} else {
				$this->_response_array = explode($delimiter, $response);
			}

			/**
			 * If AuthorizeNet doesn't return a delimited response.
			 */
			if (count($this->_response_array) < 10) {
				$this->approved = false;
				$this->error = true;
				$this->error_message = "Unrecognized response from AuthorizeNet: $response";
				return;
			}



			// Set all fields
			$this->response_code = $this->_response_array[0];
			$this->response_subcode = $this->_response_array[1];
			$this->response_reason_code = $this->_response_array[2];
			$this->response_reason_text = $this->_response_array[3];
			$this->authorization_code = $this->_response_array[4];
			$this->avs_response = $this->_response_array[5];
			$this->transaction_id = $this->_response_array[6];
			$this->invoice_number = $this->_response_array[7];
			$this->description = $this->_response_array[8];
			$this->amount = $this->_response_array[9];
			$this->method = $this->_response_array[10];
			$this->transaction_type = $this->_response_array[11];
			$this->customer_id = $this->_response_array[12];
			$this->first_name = $this->_response_array[13];
			$this->last_name = $this->_response_array[14];
			$this->company = $this->_response_array[15];
			$this->address = $this->_response_array[16];
			$this->city = $this->_response_array[17];
			$this->state = $this->_response_array[18];
			$this->zip_code = $this->_response_array[19];
			$this->country = $this->_response_array[20];
			$this->phone = $this->_response_array[21];
			$this->fax = $this->_response_array[22];
			$this->email_address = $this->_response_array[23];
			$this->ship_to_first_name = $this->_response_array[24];
			$this->ship_to_last_name = $this->_response_array[25];
			$this->ship_to_company = $this->_response_array[26];
			$this->ship_to_address = $this->_response_array[27];
			$this->ship_to_city = $this->_response_array[28];
			$this->ship_to_state = $this->_response_array[29];
			$this->ship_to_zip_code = $this->_response_array[30];
			$this->ship_to_country = $this->_response_array[31];
			$this->tax = $this->_response_array[32];
			$this->duty = $this->_response_array[33];
			$this->freight = $this->_response_array[34];
			$this->tax_exempt = $this->_response_array[35];
			$this->purchase_order_number = $this->_response_array[36];
			$this->md5_hash = $this->_response_array[37];
			$this->card_code_response = $this->_response_array[38];
			$this->cavv_response = $this->_response_array[39];
			$this->account_number = $this->_response_array[50];
			$this->card_type = $this->_response_array[51];
			$this->split_tender_id = $this->_response_array[52];
			$this->requested_amount = $this->_response_array[53];
			$this->balance_on_card = $this->_response_array[54];

			$this->approved = ($this->response_code == self::APPROVED);
			$this->declined = ($this->response_code == self::DECLINED);
			$this->error = ($this->response_code == self::ERROR);
			$this->held = ($this->response_code == self::HELD);

			if ($this->error || $this->declined || $this->held) {
				$this->error_message = '<p><strong class="credit_card_failure">Attention: your transaction was declined for the following reason(s):</strong><br />' . $this->response_reason_text . '<br /><span class="response_code">Response Code: ' . $this->response_code . '<br /></span><span class="response_subcode">Response Subcode: ' . $this->response_subcode . '</span></p><p>To try again, <a href="#payment_options">please click here</a>.</p> ';


				/* $this->error_message = "AuthorizeNet Error:
				  Response Code: ".$this->response_code."
				  Response Subcode: ".$this->response_subcode."
				  Response Reason Code: ".$this->response_reason_code."
				  Response Reason Text: ".$this->response_reason_text."
				  "; */
			}
		} else {
			$this->approved = false;
			$this->error = true;
			$this->error_message = "Error connecting to AuthorizeNet";
		}
	}

}
