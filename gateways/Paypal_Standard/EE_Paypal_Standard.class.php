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
		$this->_gateway_name = 'Paypal_Standard';
		$this->_button_base = 'paypal-logo.png';
		$this->_path = str_replace('\\', '/', __FILE__);
		
		$this->addField('rm', '2');		 // Return method = POST
		$this->addField('cmd', '_xclick');
		$this->_btn_img = file_exists( dirname( $this->_path ) . '/lib/' . $this->_button_base ) ? EVENT_ESPRESSO_PLUGINFULLURL . 'gateways/' . $this->_gateway_name . '/lib/' . $this->_button_base : '';
		parent::__construct($model);
		if(!$this->_payment_settings['use_sandbox']){
			$this->_gatewayUrl = 'https://www.paypal.com/cgi-bin/webscr';
		}else{
			$this->_gatewayUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
		}
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
				<label for="<?php echo $this->_gateway_name; ?>_button_url">
					<?php _e('Button Image URL', 'event_espresso'); ?>
				</label>
			</th>
			<td>
				<?php $this->_payment_settings['button_url'] = empty( $this->_payment_settings['button_url'] ) ? $this->_btn_img : $this->_payment_settings['button_url']; ?>
				<input class="regular-text" type="text" name="button_url" id="<?php echo $this->_gateway_name; ?>_button_url" size="34" value="<?php echo $this->_payment_settings['button_url']; ?>" />
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
		//get any of the current registrations, 
		$a_current_registration = current($session_data['registration']);
		$this->addField('business', $paypal_id);
		$this->addField('return',  $this->_get_return_url($a_current_registration));
		$this->addField('cancel_return', home_url() . '/?page_id=' . $org_options['cancel_return']);
		$this->addField('notify_url', $this->_get_notify_url($a_current_registration));
		$this->addField('cmd', '_cart');
		$this->addField('upload', '1');
		$this->addField('currency_code', $paypal_cur);
		$this->addField('image_url', empty($paypal_settings['image_url']) ? '' : $paypal_settings['image_url']);
		$this->addField('no_shipping ', $no_shipping);
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, serialize(get_object_vars($this)));
		$this->_EEM_Gateways->set_off_site_form($this->submitPayment());
		$this->redirect_after_reg_step_3();
	}

	/*public function thank_you_page() {
		global $EE_Session;
		//printr( $_POST, '$_POST  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
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
				//'invoice_number' => sanitize_text_field($_POST['invoice_id']),
				//'transaction_id' => sanitize_text_field($_POST['ipn_track_id'])
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
	}*/
	
	/**
	 * Handles a paypal IPN, verifies we haven't already processed this IPN, creates a payment (regardless of success or not)
	 * and updates the provided transaction, and saves to DB
	 * @param EE_Transaction or ID $transaction
	 * @return boolean
	 */
	public function handle_ipn_for_transaction(EE_Transaction $transaction){
		$this->_debug_log("<hr><br>".get_class($this).":start handle_ipn_for_transaction on transaction:".($transaction instanceof EE_Transaction)?$transaction->ID():'unknown');
		
		//@todo just for debugging. remove in production
		if($_GET['payment_status'] && $_GET['txn_id']){
			echo "<br>NOTE! payment_staut and txn_id overridden!!!";
			$_POST['payment_status']=$_GET['payment_status'];
			$_POST['txn_id']=$_GET['txn_id'];
		}
		//verify there's payment data that's been sent
		if(empty($_POST['payment_status']) || empty($_POST['txn_id'])){
			return false;
		}
			$this->_debug_log( "<hr><br>".get_class($this).": payment_status and txn_id sent properly. payment_status:".$_POST['payment_status'].", txn_id:".$_POST['txn_id']);
		//ok, then validate the IPN. Even if we've already processed this payment, let paypal know we don't want to hear from them anymore!
		if(!$this->validateIpn()){
			//huh, something's wack... the IPN didn't validate. We must have replied to teh IPN incorrectly,
			//or their API must ahve changed: http://www.paypalobjects.com/en_US/ebook/PP_OrderManagement_IntegrationGuide/ipn.html
			return false;
		}
		//if the transaction's just an ID, swap it for a real EE_Transaction
		if( ! $transaction instanceof EE_Transaction){
			$transaction = $this->_TXN->get_transaction($transaction);
		}
		//verify the transaction exists
		if(empty($transaction)){
			return false;
		}
		
		
		//ok, well let's process this payment then!
		if($_POST['payment_status']=='Completed'){ //the old code considered 'Pending' as completed too..
			$status = EEM_Payment::status_id_approved;//approved
			$gateway_response = __('Your payment is approved.', 'event_espresso');
		}elseif($_POST['payment_status']=='Pending'){
			$status = EEM_Payment::status_id_pending;//approved
			$gateway_response = __('Your payment is in progress. Another message will be sent when paymente is approved.', 'event_espresso');
		}else{
			$status = EEM_Payment::status_id_declined;//declined
			$gateway_response = __('Your payment has been declined.', 'event_espresso');
		}
		$this->_debug_log( "<hr>Payment is interpreted as $status, and teh gateway's response set to '$gateway_response'");
		//check if we've already processed this payment
		
		$payment = $this->_PAY->get_payment_by_txn_id_chq_nmbr($_POST['txn_id']);
		
		if(!empty($payment)){
			//payment exists. if this has the exact same status and amount, don't bother updating. just return
			if($payment->STS_ID() == $status && $payment->amount() == $_POST['mc_gross']){
				//echo "duplicated ipn! dont bother updating transaction foo!";
				$this->_debug_log( "<hr>Duplicated IPN! ignore it...");
				return false;
			}else{
				$this->_debug_log( "<hr>Existing IPN for this paypal trasaction, but its got some new info. Old status:".$payment->STS_ID().", old amount:".$payment->amount());
				$payment->set_status($status);
				$payment->set_amount($_POST['mc_gross']);
				$payment->set_gateway_response($gateway_response);
				$payment->set_details($_POST);
			}
		}else{
			$this->_debug_log( "<hr>No Previous IPN payment received. Create a new one");
			//no previous payment exists, create one
			$primary_registrant = $transaction->primary_registration();
			$primary_registration_code = !empty($primary_registrant) ? $primary_registrant->reg_code() : '';
			
			$payment = new EE_Payment($transaction->ID(), 
				$status, 
				$transaction->datetime(), 
				sanitize_text_field($_POST['txn_type']), 
				floatval($_REQUEST['mc_gross']), 
				$this->_gateway_name, 
				$gateway_response, 
				$_POST['txn_id'], 
				NULL,
				$primary_registration_code, 
				false, 
				$_POST);
		
		}
		
		$payment->save();
		return parent::update_transaction_with_payment($transaction,$payment);	
	}
	
	
	

	public function espresso_display_payment_gateways() {
		echo $this->_generate_payment_gateway_selection_button();
		?>


		<div id="reg-page-billing-info-<?php echo $this->_gateway_name; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
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
		
		$this->ipnData=$_POST;
		$response_post_data=$_POST + array('cmd'=>'_notify-validate');
		$result= wp_remote_post($this->_gatewayUrl, array('body' => $response_post_data, 'sslverify' => false, 'timeout' => 60));
		//echo "eepaypstandard results:";print_r($result);
		
		if (!is_wp_error($result) && array_key_exists('body',$result) && strcmp($result['body'], "VERIFIED") == 0) { 
			//echo "eepaypalstandard success!";
			$this->ipnResponse = $result['body'];
			return true;
		}else{
			$this->lastError = "IPN Validation Failed . $this->_gatewayUrl with response:".print_r($result['body'],true);
			//echo "eepaypalstandard error:".is_wp_error($result).", body equals VERIFIED:".(strcmp($result['body'], "VERIFIED") == 0);
			$this->ipnResponse=$result['body'];
			if($this->_debug_mode){
				echo "error!".print_r($this->lastError,true);
			}
			return false;
		}
	}
	
	/**
	 * We only really want to exlain to users why they'r epayment is pending, if that's teh case.
	 * Otherwise, they probably don't want to know anything.
	 * @param EE_Transaction $transaction
	 */
	/*public function get_payment_overview_content(EE_Transaction $transaction){
			if($transaction->status_ID() == EEM_Transaction::pending_status_code){
				?>
		<h1><?php _e('Awaiting Payment Response from Paypal...','event_espresso')?></h1>
		<p><?php _e('Paypal has notified us that your payment is in progress. You will be notified when payment is accepted.')?></p>
		<?php
			}
	}*/

}

//end class
