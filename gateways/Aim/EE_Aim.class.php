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
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self($model);
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway = 'Aim';
		$this->_button_base = 'aim-logo.png';
		$this->_path = str_replace('\\', '/', __FILE__);
		$this->_btn_img = is_readable( dirname( $this->_path ) . '/lib/' . $this->_button_base ) ? EVENT_ESPRESSO_PLUGINFULLURL . 'gateways/' . $this->_gateway . '/lib/' . $this->_button_base : '';
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
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';	}

	protected function _display_settings() {
		?>
		<tr>
			<th><label for="authnet_aim_login_id">
					<?php _e('Authorize.net AIM Login ID', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="authnet_aim_login_id" id="authnet_aim_login_id" size="35" value="<?php echo $this->_payment_settings['authnet_aim_login_id']; ?>">
				<br />
				<span class="description">
					<?php _e('Please enter your Authorize.net Login ID', 'event_espresso'); ?>
				</span></td>
		</tr>
		<tr>
			<th><label for="authnet_aim_transaction_key">
					<?php _e('Authorize.net AIM Transaction Key', 'event_espresso'); ?>
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
					<?php do_action('action_hook_espresso_help', 'authnet_aim_sandbox'); ?>
				</label></th>
			<td><?php echo EE_Form_Fields::select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?></td>
		</tr>
		<tr>
			<th><label for="test_transactions">
					<?php _e('Do you want to submit a test transaction? ', 'event_espresso'); ?>
					<?php do_action('action_hook_espresso_help', 'authnet_test_transactions') ?>
				</label></th>
			<td><?php echo EE_Form_Fields::select_input('test_transactions', $this->_yes_no_options, $this->_payment_settings['test_transactions']); ?></td>
		</tr>
		<tr>
			<th><label for="aim_button_url">
					<?php _e('Button Image URL', 'event_espresso'); ?>
					<?php do_action('action_hook_espresso_help', 'aim_button_image'); ?>
				</label></th>
			<td>
				<?php $this->_payment_settings['button_url'] = empty( $this->_payment_settings['button_url'] ) ? $this->_btn_img : $this->_payment_settings['button_url']; ?>
				<input class="regular-text" type="text" name="button_url" id="aim_button_url" size="34" value="<?php echo $this->_payment_settings['button_url']; ?>" />
				<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a>
			</td>
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
				<?php _e('Master Card', 'event_espresso'); ?>
				)<br />
				4007000000027 (
				<?php _e('Visa', 'event_espresso'); ?>
				)</p>
		</div>
		<?php
	}

	public function process_reg_step_3() {
		global $EE_Session;
		$session_data = $EE_Session->get_session_data();
		$billing_info = $session_data['billing_info'];

		if ($billing_info != 'no payment required') {

			$authnet_aim_login_id = $this->_payment_settings['authnet_aim_login_id'];
			$authnet_aim_transaction_key = $this->_payment_settings['authnet_aim_transaction_key'];

			// Enable test mode if needed
			//4007000000027  <-- test successful visa
			//4222222222222  <-- test failure card number
			if ($this->_payment_settings['use_sandbox']) {
				define("AUTHORIZENET_SANDBOX", true);
				define("AUTHORIZENET_LOG_FILE", true);
			} else {
				define("AUTHORIZENET_SANDBOX", false);
			}

			$reg_info = $session_data['cart']['REG'];
			$primary_attendee = $session_data['primary_attendee'];
			
			$registrations = $session_data['cart']['REG']['items'];

			$item_num = 1;
			foreach ($registrations as $registration) {
				foreach ($registration['attendees'] as $attendee) {			
					$item_name = substr( $registration['name'], 0, 31 );
					$item_desc = substr( $attendee['fname'] . ' ' . $attendee['lname'] . ' - ' . $registration['name'] . ' - ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc'], 0, 255 );
					$this->addLineItem( $item_num, $item_name, $item_desc, 1, $attendee['price_paid'], 'N');
					$item_num++;				
				}
			}

			$grand_total = $session_data['_cart_grand_total_amount'];

			if (isset($session_data['tax_totals'])) {
				foreach ($session_data['tax_totals'] as $key => $tax) {
					$grand_total += $tax;
					$this->addLineItem( $item_num, $session_data['taxes'][$key]['name'], '', 1, $tax, 'N');
					$item_num++;
				}
			}

			//start transaction
			$this->setField('amount', $grand_total);
			$this->setField('card_num', $billing_info[ 'reg-page-billing-card-nmbr-' . $this->_gateway ]['value']);
			$this->setField('exp_date', $billing_info[ 'reg-page-billing-card-exp-date-mnth-' . $this->_gateway ]['value'] . $billing_info['reg-page-billing-card-exp-date-year-' . $this->_gateway ]['value']);
			$this->setField('card_code', $billing_info[ 'reg-page-billing-card-ccv-code-' . $this->_gateway ]['value']);
			$this->setField('first_name', $billing_info[ 'reg-page-billing-fname-' . $this->_gateway ]['value']);
			$this->setField('last_name', $billing_info[ 'reg-page-billing-lname-' . $this->_gateway ]['value']);
			$this->setField('email', $billing_info[ 'reg-page-billing-email-' . $this->_gateway ]['value']);
			$this->setField('address', $billing_info[ 'reg-page-billing-address-' . $this->_gateway ]['value']);
			$this->setField('city', $billing_info[ 'reg-page-billing-city-' . $this->_gateway ]['value']);
			$this->setField('state', $billing_info[ 'reg-page-billing-state-' . $this->_gateway ]['value']);
			$this->setField('zip', $billing_info[ 'reg-page-billing-zip-' . $this->_gateway ]['value']);
			$this->setField('cust_id', $primary_attendee['registration_id']['value']);
			$this->setField('invoice_num',$EE_Session->id()); 

	
			if ($this->_payment_settings['test_transactions']) {
				$this->test_request = "true";
			}

			//Capture response
			$response = $this->authorizeAndCapture();

			if (!empty($response)) {

				if ($this->_payment_settings['use_sandbox']) {
					$txn_id = $response->invoice_number;
				} else {
					$txn_id = $response->transaction_id;
				}

				$payment_status = $response->approved ? 'Approved' : 'Declined';
			}

			$txn_results = array(
					'gateway' => $this->_payment_settings['display_name'],
					'approved' => $response->approved ? $response->approved : 0,
					'status' => $payment_status,
					'response_msg' => $response->response_reason_text,
					'amount' => $response->amount,
					'method' => $response->method,
					'card_type' => $response->card_type,
					'auth_code' => $response->authorization_code,
					'md5_hash' => $response->md5_hash,
					'transaction_id' => $txn_id,
					'invoice_number' => $response->invoice_number,
					'raw_response' => $response
			);

			$EE_Session->set_session_data(array('txn_results' => $txn_results), $section = 'session_data');

			$success = $payment_status == 'Approved' ? TRUE : FALSE;

			do_action( 'action_hook_espresso_after_payment', $EE_Session, $success );

		} else {
			// no payment required
		}

		return array('success' => TRUE);
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
		$args = func_get_args();
		$this->_additional_line_items[] = implode( '<|>', $args );
    }




	public function espresso_display_payment_gateways() {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		global $css_class;


		echo $this->_generate_payment_gateway_selection_button();
		
		$gw = $this->_gateway;
		?>


		<div id="reg-page-billing-info-<?php echo $gw;?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">

		<?php if ( $this->_payment_settings['use_sandbox'] || $this->_payment_settings['test_transactions'] ) : ?>
		<h4 style="color:#ff0000;" title="Payments will not be processed"><?php _e('Debug Mode Is Turned On', 'event_espresso');?></h4>
		<p style="color:#ff0000;">Test credit card # 4007000000027</p><br/>
		<?php endif; ?>

			<h5><strong><?php _e('Billing Address', 'event_espresso'); ?></strong></h5>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-fname-<?php echo $gw;?>"><?php _e('First Name', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-fname-<?php echo $gw;?>" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-fname-<?php echo $gw;?>" title="">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-lname-<?php echo $gw;?>"><?php _e('Last Name', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-lname-<?php echo $gw;?>" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-lname-<?php echo $gw;?>" title="">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-email-<?php echo $gw;?>"><?php _e('Email', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-email-<?php echo $gw;?>" class="required email <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-email-<?php echo $gw;?>" title="">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-address-<?php echo $gw;?>"><?php _e('Address', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-address-<?php echo $gw;?>" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-address-<?php echo $gw;?>">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-city-<?php echo $gw;?>"><?php _e('City', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-city-<?php echo $gw;?>" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-city-<?php echo $gw;?>">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-state-<?php echo $gw;?>"><?php _e('State', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-state-<?php echo $gw;?>" class="required medium-txt <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-state-<?php echo $gw;?>">
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-zip-<?php echo $gw;?>"><?php _e('Zip', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-zip-<?php echo $gw;?>" class="required small-txt <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-zip-<?php echo $gw;?>">
			</p>

			<h5><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></h5>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-card-nmbr-<?php echo $gw;?>"><?php _e('Card Number', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-card-nmbr-<?php echo $gw;?>" class="required <?php echo $css_class; ?>" type="text" name="reg-page-billing-card-nmbr-<?php echo $gw;?>"/>
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label><?php _e('Expiry Date', 'event_espresso'); ?> <em>*</em></label>
				<select id="reg-page-billing-card-exp-date-mnth-<?php echo $gw;?>" class="required small-txt <?php echo $css_class; ?>" name="reg-page-billing-card-exp-date-mnth-<?php echo $gw;?>">
					<?php
					for ($x = 1; $x <= 12; $x++) {
						$value = $x < 10 ? '0' . $x : $x;
						echo '
						<option value="' . $value . '">' . $value . '</option>';
					}
					?>
				</select>
				&nbsp;/&nbsp;
				<select id="reg-page-billing-card-exp-date-year-<?php echo $gw;?>" class="required small-txt <?php echo $css_class; ?>" name="reg-page-billing-card-exp-date-year-<?php echo $gw;?>">
					<?php
					$current_year = date('y');
					$next_decade = $current_year + 10;
					for ($x = $current_year; $x <= $next_decade; $x++) {
						$value = $x < 10 ? '0' . $x : $x;
						echo '
						<option value="' . $value . '">' . $value . '</option>';
					}
					?>
				</select>
				<span class="small-text lt-grey-text"><?php _e('(mm/yy)', 'event_espresso'); ?></span>
			</p>

			<p class="reg-page-form-field-wrap-pg">
				<label for="reg-page-billing-card-ccv-code-<?php echo $gw;?>"><?php _e('CCV Code', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-card-ccv-code-<?php echo $gw;?>"  class="required small-txt <?php echo $css_class; ?>" type="text" name="reg-page-billing-card-ccv-code-<?php echo $gw;?>"/>
			</p>

		</div>

		<?php
	}

	public function espresso_reg_page_billing_inputs() {

		$reg_page_billing_inputs = array(
		
				'reg-page-billing-fname-' . $this->_gateway => array(
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
				
				'reg-page-billing-lname-' . $this->_gateway => array(
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
				
				'reg-page-billing-email-' . $this->_gateway => array(
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
				
				'reg-page-billing-address-' . $this->_gateway => array(
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
				
				'reg-page-billing-city-' . $this->_gateway => array(
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
				
				'reg-page-billing-state-' . $this->_gateway => array(
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
				
				'reg-page-billing-zip-' . $this->_gateway => array(
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
				
				'reg-page-billing-card-nmbr-' . $this->_gateway => array(
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

				'reg-page-billing-card-exp-date-mnth-' . $this->_gateway => array(
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
				
				'reg-page-billing-card-exp-date-year-' . $this->_gateway => array(
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
				
				'reg-page-billing-card-ccv-code-' . $this->_gateway => array(
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

	/**
	 * Do an AUTH_CAPTURE transaction.
	 *
	 * Required "x_" fields: card_num, exp_date, amount
	 *
	 * @param string $amount   The dollar amount to charge
	 * @param string $card_num The credit card number
	 * @param string $exp_date CC expiration date
	 *
	 * @return AuthorizeNetAIM_Response
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

		return new AuthorizeNetAIM_Response($response);
	}

}

/**
 * Parses an AuthorizeNet AIM Response.
 *
 * @package	AuthorizeNet
 * @subpackage AuthorizeNetAIM
 */
class AuthorizeNetAIM_Response {
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
