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
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
Class EE_Firstdata extends EE_Gateway {

	private static $_instance = NULL;


	public static function instance(EEM_Gateways &$model) {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self($model);
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway = 'Firstdata';
		$this->_button_base = 'logo-Firstdata.png';
		$this->_path = str_replace( '\\', '/', __FILE__ );
		parent::__construct($model);
	}

	protected function _default_settings() {
		$this->_payment_settings['authnet_aim_login_id'] = '';
		$this->_payment_settings['authnet_aim_transaction_key'] = '';
		$this->_payment_settings['use_sandbox'] = false;
		$this->_payment_settings['test_transactions'] = false;
		$this->_payment_settings['type'] = 'on-site';
		$this->_payment_settings['display_name'] = 'First Data';
		$this->_payment_settings['current_path'] = '';
	}

	protected function _update_settings() {
		if (isset($_POST['update_authnet_aim']) && check_admin_referer('espresso_form_check', 'add_authnet_aim_settings')) {
			$this->_payment_settings['authnet_aim_login_id'] = $_POST['authnet_aim_login_id'];
			$this->_payment_settings['authnet_aim_transaction_key'] = $_POST['authnet_aim_transaction_key'];
			$this->_payment_settings['test_transactions'] = $_POST['test_transactions'];
			$this->_payment_settings['use_sandbox'] = $_POST['use_sandbox'];
			$this->_payment_settings['button_url'] = $_POST['button_url'];

			if ($this->_EEM_Gateways->update_payment_settings($this->_gateway, $this->_payment_settings)) {
				$espresso_notices['success'][] = __('Authorize AIM Payment Settings Updated!', 'event_espresso');
			} else {
				$espresso_notices['errors'][] = __('Authorize AIM Payment Settings were not saved! ', 'event_espresso');
			}
		}
	}

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
					<?php echo apply_filters('filter_hook_espresso_help', 'authnet_aim_sandbox'); ?>
				</label></th>
			<td><?php echo select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?></td>
		</tr>
		<tr>
			<th><label for="test_transactions">
					<?php _e('Do you want to submit a test transaction? ', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'authnet_test_transactions') ?>
				</label></th>
			<td><?php echo select_input('test_transactions', $this->_yes_no_options, $this->_payment_settings['test_transactions']); ?></td>
		</tr>
		<tr>
			<th><label for="aim_button_url">
					<?php _e('Button Image URL', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'aim_button_image'); ?>
				</label></th>
			<td>
				<input class="regular-text" type="text" name="button_url" id="aim_button_url" size="34" value="<?php echo $this->_payment_settings['button_url']; ?>" />
				<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a>
			</td>
		</tr>
		<?php
	}

	protected function _display_settings_help() {
		?>
		<p><strong style="color:#F00">
				<?php _e('WARNING!', 'event_espresso'); ?>
			</strong><?php _e('You are responsible for your own security and PCI compliance.', 'event_espresso'); ?></p>
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

			require_once 'lib/AuthorizeNet.php';

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

			$grand_total = $session_data['_cart_grand_total_amount'];

			$taxes = $session_data['tax_totals'];
			foreach ($taxes as $tax) {
				$grand_total += $tax;
			}

			//start transaction
			$transaction = new AuthorizeNetAIM($authnet_aim_login_id, $authnet_aim_transaction_key);


			$transaction->amount = $grand_total;
			$transaction->card_num = $billing_info['reg-page-billing-card-nmbr']['value'];
			$transaction->exp_date = $billing_info['reg-page-billing-card-exp-date-mnth']['value'] . $billing_info['reg-page-billing-card-exp-date-year']['value'];
			$transaction->card_code = $billing_info['reg-page-billing-card-ccv-code']['value'];
			$transaction->first_name = $billing_info['reg-page-billing-fname']['value'];
			$transaction->last_name = $billing_info['reg-page-billing-lname']['value'];
			$transaction->email = $billing_info['reg-page-billing-email']['value'];
			$transaction->address = $billing_info['reg-page-billing-address']['value'];
			$transaction->city = $billing_info['reg-page-billing-city']['value'];
			$transaction->state = $billing_info['reg-page-billing-state']['value'];
			$transaction->zip = $billing_info['reg-page-billing-zip']['value'];
			$transaction->cust_id = $primary_attendee['registration_id']['value'];
			$transaction->invoice_num = $EE_Session->id(); // <<<<<<<<<<<<<<<<<<<<<<< This actually should NOT be generated YET !!! right?? or is it ? and if so from where ?

			if ($this->_payment_settings['test_transactions']) {
				$transaction->test_request = "true";
			}

			//Capture response
			$response = $transaction->authorizeAndCapture();

			if (!empty($response)) {

				if ($this->_payment_settings['use_sandbox']) {
					$txn_id = $response->invoice_number;
				} else {
					$txn_id = $response->transaction_id;
				}

				$payment_status = $response->approved ? 'Approved' : 'Declined';
			}
			do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $payment_data->payment_status);

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

			add_action('action_hook_espresso_email_after_payment', 'espresso_email_after_payment'); //<-- Should this be here ? or in the successful txn bit above ( after line 80 ? ) or does this send failed txn info as well /
			// return $payment_data;  <<<<-------  do we need to return success or FALSE or anything ?
		} else {
			// no payment required
		}

		// return ? or redirect ?
		// we need to update the registration and transaction tables
	}

	public function espresso_process_off_site_payment() {
		
	}

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
		echo $this->_generate_payment_gateway_selection_button();
		?>


		<div id="reg-page-billing-info-<?php echo $this->_gateway; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">


			<?php echo $test_creds; ?>

			<h5><strong><?php _e('Billing Address', 'event_espresso'); ?></strong></h5>

			<p class="event_form_field">
				<label for="reg-page-billing-fname"><?php _e('First Name', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-fname" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-fname" title="">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-lname"><?php _e('Last Name', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-lname" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-lname" title="">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-email"><?php _e('Email', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-email" class="required email <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-email" title="">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-address"><?php _e('Address', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-address" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-address">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-city"><?php _e('City', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-city" class="required <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-city">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-state"><?php _e('State', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-state" class="required medium-txt <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-state">
			</p>

			<p class="event_form_field">
				<label for="reg-page-billing-zip"><?php _e('Zip', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-zip" class="required small-txt <?php echo $css_class; ?>" type="text" value="" name="reg-page-billing-zip">
			</p>

			<h5><strong><?php _e('Credit Card Information', 'event_espresso'); ?></strong></h5>

			<p class="event_form_field">
				<label for="reg-page-billing-card-nmbr"><?php _e('Card Number', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-card-nmbr" class="required <?php echo $css_class; ?>" type="text" name="reg-page-billing-card-nmbr"/>
			</p>

			<?php /*
			  <p class="event_form_field">
			  <label for="reg-page-billing-card-exp-date"><?php _e('Expiry Date', 'event_espresso'); ?> <em>*</em></label>
			  <input id="reg-page-billing-card-exp-date" class="required medium-txt <?php echo $css_class;?>" type="text" name="reg-page-billing-card-exp-date"/>
			  </p>
			 */ ?>
			<p class="event_form_field">
				<label><?php _e('Expiry Date', 'event_espresso'); ?> <em>*</em></label>
				<select id="reg-page-billing-card-exp-date-mnth" class="required small-txt <?php echo $css_class; ?>" name="reg-page-billing-card-exp-date-mnth">
					<?php
					for ($x = 1; $x <= 12; $x++) {
						$value = $x < 10 ? '0' . $x : $x;
						echo '
						<option value="' . $value . '">' . $value . '</option>';
					}
					?>
				</select>
				&nbsp;/&nbsp;
				<select id="reg-page-billing-card-exp-date-year" class="required small-txt <?php echo $css_class; ?>" name="reg-page-billing-card-exp-date-year">
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

			<p class="event_form_field">
				<label for="reg-page-billing-card-ccv-code"><?php _e('CCV Code', 'event_espresso'); ?> <em>*</em></label>
				<input id="reg-page-billing-card-ccv-code"  class="required small-txt <?php echo $css_class; ?>" type="text" name="reg-page-billing-card-ccv-code"/>
			</p>

		</div>

		<?php
	}

	public function espresso_reg_page_billing_inputs_aim() {

		$reg_page_billing_inputs = array(
				'type' => 'onsite',
				'gateway' => 'Authorize.Net AIM',
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
				/* 						'reg-page-billing-card-exp-date' => array(
				  'db-col' =>'exp-date',
				  'label' => __( 'Expiry Date', 'event_espresso' ),
				  'input' =>'text',
				  'type' =>'string',
				  'sanitize' => 'mm/yy',
				  'required' => TRUE,
				  'validation' => TRUE,
				  'value' => NULL,
				  'format' => '%s'
				  ), */

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