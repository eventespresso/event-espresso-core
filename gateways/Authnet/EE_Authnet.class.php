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
 * Authnet Class
 *
 * @package			Event Espresso
 * @subpackage		gateways/
 * @author				Sidney Harrell
 *
 * ------------------------------------------------------------------------
 */
Class EE_Authnet extends EE_Offsite_Gateway {

	private static $_instance = NULL;

	private $_x_post_fields = array(
			"x_Version" => "3.0",
			"x_Show_Form" => "PAYMENT_FORM",
			"x_Relay_Response" => "TRUE"
	);
	private $_x_line_items = array();

	/**
	 * IPN post values as array
	 *
	 * @var array
	 */
	private $ipnData = array();

	public static function instance(EEM_Gateways &$model) {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or !is_a(self::$_instance, __CLASS__)) {
			self::$_instance = new self($model);
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway = 'Authnet';
		$this->_button_base = 'authnet-logo.png';
		$this->_path = str_replace('\\', '/', __FILE__);
		$this->_gatewayUrl = 'https://secure.authorize.net/gateway/transact.dll';
		$this->_btn_img = is_readable( dirname( $this->_path ) . '/lib/' . $this->_button_base ) ? EVENT_ESPRESSO_PLUGINFULLURL . 'gateways/' . $this->_gateway . '/lib/' . $this->_button_base : '';
		parent::__construct($model);
	}

	protected function _default_settings() {
		$this->_payment_settings['authnet_login_id'] = '';
		$this->_payment_settings['authnet_transaction_key'] = '';
		$this->_payment_settings['image_url'] = '';
		$this->_payment_settings['use_sandbox'] = false;
		$this->_payment_settings['test_transactions'] = false;
		$this->_payment_settings['use_md5'] = false;
		$this->_payment_settings['authnet_md5_value'] = '';
		$this->_payment_settings['type'] = 'off-site';
		$this->_payment_settings['display_name'] = 'Authorize.net SIM';
		$this->_payment_settings['current_path'] = '';
		$this->_payment_settings['button_url'] = $this->_btn_img;
	}

	protected function _update_settings() {
		$this->_payment_settings['authnet_login_id'] = sanitize_text_field($_POST['authnet_login_id']);
		$this->_payment_settings['authnet_transaction_key'] = sanitize_text_field($_POST['authnet_transaction_key']);
		$this->_payment_settings['test_transactions'] = empty($_POST['test_transactions']) ? FALSE : TRUE;
		$this->_payment_settings['use_sandbox'] = empty($_POST['use_sandbox']) ? FALSE : TRUE;
		$this->_payment_settings['use_md5'] = empty($_POST['use_md5']) ? false : true;
		$this->_payment_settings['authnet_md5_value'] = $_POST['authnet_md5_value'];
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';
		$this->_payment_settings['image_url'] = isset( $_POST['image_url'] ) ? esc_url_raw( $_POST['image_url'] ) : '';
	}

	protected function _display_settings() {

		global $org_options;
		?>
		<tr>
			<th><label for="authnet_login_id">
					<?php _e('Authorize.net Login ID', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="authnet_login_id" id="authnet_login_id" size="35" value="<?php echo $this->_payment_settings['authnet_login_id']; ?>">
				<br />
				<span class="description">
					<?php _e('Please enter your Authorize.net Login ID', 'event_espresso'); ?>
				</span></td>
		</tr>
		
		<tr>
			<th><label for="authnet_transaction_key">
					<?php _e('Authorize.net Transaction Key', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'transaction_key_info') ?>
				</label></th>
			<td><input class="regular-text" type="text" name="authnet_transaction_key" id="authnet_transaction_key" size="35" value="<?php echo $this->_payment_settings['authnet_transaction_key']; ?>">
				<br />
				<span class="description">
					<?php _e('Please enter your Authorize.net Transaction Key.', 'event_espresso'); ?>
				</span></td>
		</tr>
		
		<tr>
			<th><label for="sim_image_url">
					<?php _e('Your Logo Image URL: ', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'authnet_image_url_info') ?>
				</label></th>
			<td><input class="regular-text" type="text" name="image_url" id="sim_image_url" value="<?php echo $this->_payment_settings['image_url']; ?>" />
				<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=image_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a><br />
				<span class="description">
					<?php
					_e('Used for your business/personal logo on the Authorize.net SIM payment page.', 'event_espresso');
					if ($this->_payment_settings['image_url'] != '')
						echo '<br /><img src="' . $this->_payment_settings['image_url'] . '" />';
					?>
				</span></td>
		</tr>
		
		<tr>
			<th><label>
					<?php _e('Relay Response URL: ', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'relay_response') ?>
				</label></th>
			<td><span class="display-path" style="background-color: rgb(255, 251, 204); border:#999 solid 1px; padding:2px;"><?php echo home_url() . '/?page_id=' . $org_options['notify_url']; ?></span><br />
				<span class="description">
					<?php _e('URL to the transaction page.', 'event_espresso'); ?>
				</span></td>
		</tr>
		
		<tr>
			<th><label for="use_sandbox">
					<?php _e('Is this an account on the Authorize.net development server? ', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'authnet_sandbox'); ?>
				</label></th>
			<td><?php echo EE_Form_Fields::select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?></td>
		</tr>
		
		<tr>
			<th><label for="test_transactions">
					<?php _e('Do you want to submit a test transaction? ', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'authnet_test_transactions') ?>
				</label></th>
			<td><?php echo EE_Form_Fields::select_input('test_transactions', $this->_yes_no_options, $this->_payment_settings['test_transactions']); ?></td>
		</tr>
		
		<tr>
			<th><label for="use_md5">
					<?php _e('Use md5 check to secure payment response', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'authnet_use_md5'); ?>
				</label></th>
			<td><?php echo EE_Form_Fields::select_input('use_md5', $this->_yes_no_options, $this->_payment_settings['use_md5']); ?></td>
		</tr>
		
		<tr>
			<th><label for="authnet_md5_value">
					<?php _e('Authorize.net MD5 Hash value', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'authnet_md5_value') ?>
				</label></th>
			<td><input class="regular-text" type="text" name="authnet_md5_value" id="authnet_md5_value" size="35" value="<?php echo $this->_payment_settings['authnet_md5_value']; ?>"></td>
		</tr>

		<tr>
			<th><label for="sim_button_url">
					<?php _e('Button Image URL: ', 'event_espresso'); ?>
					<?php echo apply_filters('filter_hook_espresso_help', 'authnet_button_url_info') ?>
				</label></th>
				<?php $this->_payment_settings['button_url'] = empty( $this->_payment_settings['button_url'] ) ? $this->_btn_img : $this->_payment_settings['button_url']; ?>
			<td><input class="regular-text" type="text" name="button_url" id="sim_button_url" value="<?php echo $this->_payment_settings['button_url']; ?>" />
				<a href="media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true&amp;width=640&amp;height=580&amp;rel=button_url" id="add_image" class="thickbox" title="Add an Image"><img src="images/media-button-image.gif" alt="Add an Image"></a> <br />
				<span class="description">
					<?php _e('URL to the payment button.', 'event_espresso'); ?>
				</span></td>
		</tr>
		
		<?php
	}

	protected function _display_settings_help() {
		?>
		<div style="display: none;">
			<?php
			/**
			 * Relay Response
			 */
			?>
			<div id="transaction_key_info" class="pop-help" >
				<div class="TB-ee-frame">
					<h2>
						<?php _e('Authorize.net Transaction Key', 'event_espresso'); ?>
					</h2>
					<p><?php _e('The Transaction Key is  a 16-character alphanumeric value that is randomly generated in the  Merchant Interface and is used for authentication when submitting  transaction requests from your Web site.', 'event_espresso'); ?></p>
					<p><?php _e('To generate a Transaction Key for your account:', 'event_espresso'); ?></p>
					<ol>
						<li><?php _e('Log into the Merchant Interface at', 'event_espresso'); ?> <a href="https://account.authorize.net/" target="_blank">https://account.authorize.net/</a>.</li>
						<li><?php _e('Click Account from the main toolbar.', 'event_espresso'); ?></li>
						<li><?php _e('Click Settings in the main menu on the left.', 'event_espresso'); ?></li>
						<li><?php _e('Click API Login ID and Transaction Key in the Security Settings section.', 'event_espresso'); ?></li>
						<li><?php _e('If an API login ID has already been generated, it is visible on this  page. If an API Login ID needs to be generated, you can enter the answer  to your Secret Question in order to generate an API Login ID and  Transaction Key.', 'event_espresso'); ?></li>
					</ol>
					<p><?php _e('IMPORTANT: The Transaction Key will not be visible at any other time in  the Merchant Interface. You must record it temporarily or copy and paste  it to a secure file location immediately. Like the API Login ID, the  Transaction Key is sensitive account information and should only be  shared on a need-to-know basis, for example with your Web developer for  the purposes of integration with the payment gateway. Upon activating a new Transaction Key, all other keys will be disabled after 24 hours.', 'event_espresso'); ?></p>
				</div>
			</div>

			<?php
			/**
			 * Relay Response
			 */
			?>
			<div id="relay_response" class="pop-help" >
				<div class="TB-ee-frame">
					<h2>
						<?php _e('Relay Response', 'event_espresso'); ?>
					</h2>
					<p>
						<?php _e('This shows the specific the URL to which the gateway should return the relay response for a transaction. This the page should be set in your Authorize.net account. Login to Authorize.net, goto Account > Response/Receipt URLs > Add URL and enter the following URL.', 'event_espresso'); ?>
					</p>
					<p><strong>
							<?php _e('Relay Response URL:', 'event_espresso'); ?>
						</strong> <?php echo home_url() . '/?page_id=' . $org_options['notify_url'] ?><br />
						<span style="color:red;">
							<?php _e('Note:', 'event_espresso'); ?>
						</span>
						<?php _e('This URL can be changed in the "Organization Settings" page.', 'event_espresso'); ?>
					</p>
					<p>
						<?php _e('For complete information on configuring relay response, please refer to', 'event_espresso'); ?>
						<a href="https://account.authorize.net/help/Merchant_Interface_RoboHelp_Project.htm#Miscellaneous/Reference.htm%3E%3Epan=2">
							<?php _e('Reference &amp; User Guides', 'event_espresso'); ?>
						</a>.</p>
				</div>
			</div>
			<?php
			/**
			 * Button Image URL
			 */
			?>
			<div id="authnet_button_url_info" class="pop-help" >
				<div class="TB-ee-frame">
					<h2>
						<?php _e('Button Image URL', 'event_espresso'); ?>
					</h2>
					<p>
						<?php _e('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso'); ?>
					</p>
					<p><strong>
							<?php _e('Current button image:', 'event_espresso'); ?>
						</strong></p>
					<p><?php echo '<img src="' . $payment_settings['authnet_sim']['button_url'] . '" />'; ?></p>
				</div>
			</div>
			<?php
			/**
			 * Authorize.net SIM Image URL
			 */
			?>
			<div id="authnet_image_url_info" class="pop-help" >
				<div class="TB-ee-frame">
					<h2>
						<?php _e('Authorize.net SIM Image URL (logo for payment page)', 'event_espresso'); ?>
					</h2>
					<p>
						<?php _e('The URL of the image displayed as your logo in the header of the Authorize.net checkout pages.', 'event_espresso'); ?>
					</p>
					<p><strong>
							<?php _e('Current logo image:', 'event_espresso'); ?>
						</strong></p>
					<p><?php echo '<img src="' . $payment_settings['authnet_sim']['image_url'] . '" />'; ?></p>

				</div>
			</div>
			<?php
			/**
			 * Authorize.net Development Server
			 */
			?>
			<div id="authnet_sandbox" class="pop-help" >
				<div class="TB-ee-frame">
					<h2>
						<?php _e('Authorize.net Development Server', 'event_espresso'); ?>
					</h2>
					<p>
						<?php _e('Authorize.net maintains a development environment for testing your gateway. You may use this to test your setup without having a live account. You will need to sign up for a free account on the development server here: '); ?>
						<a href="https://developer.authorize.net/testaccount/">https://developer.authorize.net/testaccount/</a>
						<?php _e('Transactions that are submitted to the development server are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?>
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
			</div>

			<?php
			/**
			 * Authorize.net SIM Image URL
			 */
			?>
			<div id="authnet_test_transactions" class="pop-help" >
				<div class="TB-ee-frame">
					<h2>
						<?php _e('Authorize.net Test Transactions', 'event_espresso'); ?>
					</h2>
					<p>
						<?php _e('Transactions that are submitted as test transactions are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso'); ?>
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
			</div>

		</div>

		<?php
	}

	public function process_reg_step_3() {

		global $org_options, $EE_Session;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');


		// Enable test mode if needed
		if ($this->_payment_settings['test_transactions']) {
			$this->addField('x_Test_Request', 'TRUE');
		}
		// Enable test mode if needed
		if ($this->_payment_settings['use_sandbox']) {
			$this->_gatewayUrl = 'https://test.authorize.net/gateway/transact.dll';
		}

		$session_data = $EE_Session->get_session_data();
		$registrations = $session_data['cart']['REG']['items'];

		$item_num = 1;
		foreach ($registrations as $registration) {
			foreach ($registration['attendees'] as $attendee) {			
				$item_name = substr( $registration['name'], 0, 31 );
				$item_desc = substr( $attendee['fname'] . ' ' . $attendee['lname'] . ' - ' . $registration['name'] . ' - ' . $registration['options']['date'] . ' ' . $registration['options']['time'] . ', ' . $registration['options']['price_desc'], 0, 255 );
				$this->_x_line_items[] = $item_num . '<|>' . $item_name . '<|>' . $item_desc . '<|>1<|>' . $attendee['price_paid'] . '<|>N&';
				$item_num++;				
			}
		}

		if (isset($session_data['tax_totals'])) {
			foreach ($session_data['tax_totals'] as $key => $taxes) {
				$total = $total + $taxes;
				$this->_x_line_items[] = $item_num . '<|>' . $session_data['taxes'][$key]['name'] . '<|> <|>1<|>' . $taxes . '<|>N&';
				$item_num++;
			}
		}

		$total = $session_data['_cart_grand_total_amount'];
		
		$this->_x_post_fields['x_Relay_URL'] = home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment';
		$this->_x_post_fields['x_Amount'] = number_format($total, 2);
		$this->_x_post_fields['x_Logo_URL'] = $this->_payment_settings['image_url'];
		$this->_x_post_fields['x_Invoice_num'] = 'au-' . $session_data['id'];
		$this->_x_post_fields['x_fp_timestamp'] = time();
		$this->_x_post_fields['x_Login'] = $this->_payment_settings['authnet_login_id'];
		$this->_x_post_fields['x_fp_sequence'] = 'au-' . $session_data['id'];
		$ip_address = explode( ':', $session_data['ip_address'] );
		$this->_x_post_fields['ip_address'] = substr( $ip_address[0], 0, 15 );
		$data = $this->_payment_settings['authnet_login_id'] . '^' . $this->_x_post_fields['x_Invoice_num'] . '^' . $this->_x_post_fields['x_fp_timestamp'] . '^' . $this->_x_post_fields['x_Amount'] . '^';
		if (phpversion() >= '5.1.2') {
			$this->_x_post_fields['x_fp_hash'] = hash_hmac("md5", $data, $this->_payment_settings['authnet_transaction_key']);
		} else {
			$this->_x_post_fields['x_fp_hash'] = bin2hex(mhash(MHASH_MD5, $data, $this->_payment_settings['authnet_transaction_key']));
		}
		$this->_EEM_Gateways->set_off_site_form($this->submitPayment());
		$this->redirect_after_reg_step_3();
	}

	protected function _output_inputs() {
		$output = '';
		foreach ($this->_x_line_items as $x_line_item) {
			$output .= "<input type=\"hidden\" name=\"x_line_item\" value=\"$x_line_item\"/>\n";
		}
		foreach ($this->_x_post_fields as $name => $value) {
			$output .= "<input type=\"hidden\" name=\"$name\" value=\"$value\"/>\n";
		}
		return $output;
	}

	public function thank_you_page() {
		global $EE_Session;

		$expected_fields = array(
				'x_method',
				'x_auth_code',
				'x_MD5_Hash',
				'x_invoice_num',
				'x_trans_id',
				'x_amount',
				'x_response_code'
		);

		foreach ($expected_fields as $field) {
			$this->ipnData["$field"] = empty($_POST[$field]) ? '' : $_POST[$field];
		}

		$txn_details = array(
				'gateway' => $this->_payment_settings['display_name'],
				'approved' => FALSE,
				'response_msg' => __('You\'re registration has not been completed successfully.', 'event_espresso'),
				'status' => 'Incomplete',
				'raw_response' => serialize($_POST),
				'amount' => 0.00,
				'method' => sanitize_text_field($this->ipnData['x_method']),
				'auth_code' => sanitize_text_field($this->ipnData['x_auth_code']),
				'md5_hash' => sanitize_text_field($this->ipnData['x_MD5_Hash']),
				'invoice_number' => sanitize_text_field($this->ipnData['x_invoice_num']),
				'transaction_id' => sanitize_text_field($this->ipnData['x_invoice_num'])
		);

		$md5source = $this->_payment_settings['authnet_md5_value'] . $this->_payment_settings['authnet_login_id'] . $this->ipnData['x_trans_id'] . $this->ipnData['x_amount'];
		$md5 = md5($md5source);

		if ($this->_payment_settings['use_md5'] && strtoupper($md5) != $this->ipnData['x_MD5_Hash']) {
			$txn_details['response_msg'] = __('There was an MD5 mismatch. Contact the website administrator.', 'event_espresso');
			$txn_details['status'] = 'Declined';
		} elseif ($this->ipnData['x_response_code'] == 1) {
			$txn_details['approved'] = TRUE;
			$txn_details['amount'] = floatval($_REQUEST['x_amount']);
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
		<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the Authorize.net website where your payment will be securely processed.', 'event_espresso'); ?>
		</div>

		<?php
	}

}
