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
 * Payment Gateway - mijireh
 *
 * @package			Event Espresso
 * @subpackage		gateways/
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
Class EE_Mijireh extends EE_Offsite_Gateway {

	private static $_instance = NULL;

	public static function instance(EEM_Gateways &$model) {
		// check if class object is instantiated
		if (self::$_instance === NULL or !is_object(self::$_instance) or ! ( self::$_instance instanceof  EE_Paypal_Standard )) {
			self::$_instance = new self($model);
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway_name = 'Mijireh';
		$this->_button_base = 'paypal-logo.png';
		$this->_path = str_replace('\\', '/', __FILE__);
		parent::__construct($model);
//		if(!$this->_payment_settings['use_sandbox']){
		$this->_gatewayUrl = 'https://secure.mijireh.com/api/1/orders';
//		}else{
//			$this->_gatewayUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
//		}
	}

	protected function _default_settings() {
		$this->_payment_settings['access_key'] = '';
		$this->_payment_settings['image_url'] = '';
		$this->_payment_settings['currency_format'] = 'USD';
		$this->_payment_settings['use_sandbox'] = false;
		$this->_payment_settings['no_shipping'] = '0';
		$this->_payment_settings['type'] = 'off-site';
		$this->_payment_settings['display_name'] = __('Mijireh','event_espresso');
		$this->_payment_settings['current_path'] = '';
		$this->_payment_settings['button_url'] = $this->_btn_img;
	}

	protected function _update_settings() {
		$this->_payment_settings['access_key'] = $_POST['access_key'];
		$this->_payment_settings['image_url'] = $_POST['image_url'];
		$this->_payment_settings['currency_format'] = $_POST['currency_format'];
		$this->_payment_settings['no_shipping'] = $_POST['no_shipping'];
		$this->_payment_settings['use_sandbox'] = $_POST['use_sandbox'];
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';		
	}


	protected function _help_content() {
		ob_start();
		?>
		<div id="currency_info">
			<h2>
				<?php _e('PayPal Currency', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('PayPal uses 3-character ISO-4217 codes for specifying currencies in fields and variables. </p><p>The default currency code is US Dollars (USD). If you want to require or accept payments in other currencies, select the currency you wish to use. The dropdown lists all currencies that PayPal (currently) supports.', 'event_espresso'); ?>
			</p>
		</div>
		<div id="surcharge">
			<h2>
				<?php _e('Payment Surcharge', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('Please enter a decimal number indicating a percent surcharge. For example, if you enter 3.00, 3% will be added to the final price of the event during the checkout. If the event price is initially $100, the price with the surcharge will be $103.<br /> This surcharge will apply to all new events.  However, you will have the ability to change this value during the event creation.', 'event_espresso'); ?>
			</p>
		</div>
		<div id="no_shipping">
			<h2>
				<?php _e('Shipping Address', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('By default, PayPal will display shipping address information on the PayPal payment screen. If you plan on shipping items to a registrant (shirts, invoices, etc) then use this option. Otherwise it should not be used, as it will require a shipping address when someone registers for an event.', 'event_espresso'); ?>
			</p>
		</div>
		<div id="sandbox_info">
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
				<li><a href="https://developer.paypal.com/" target="_blank"><?php _e('PayPal Sandbox Login', 'event_espresso'); ?></a></li>
				<li><a href="https://cms.paypal.com/us/cgi-bin/?&amp;cmd=_render-content&amp;content_ID=developer/howto_testing_sandbox" target="_blank"><?php _e('Sandbox Tutorial', 'event_espresso'); ?></a></li>
				<li><a href="https://cms.paypal.com/us/cgi-bin/?&amp;cmd=_render-content&amp;content_ID=developer/howto_testing_sandbox_get_started" target="_blank"><?php _e('Getting Started with PayPal Sandbox', 'event_espresso'); ?></a></li>
			</ul>
		</div>
		<div id="paypal_button_image">
			<h2>
				<?php _e('Button Image URL', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso'); ?>
			</p>
			<p><?php _e('Current Button Image', 'event_espresso'); ?></p>
			<p><?php echo '<img src="' . $this->_payment_settings['button_url'] . '" />'; ?></p>
		</div>
		<div id="paypal_image_url_info">
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
		<?php
		$content = ob_get_contents();
		ob_end_clean();
		return $content;
	}

	protected function _display_settings() {
		?>
		<tr>
			<th><label for="access_key">
					<?php _e('Access Key', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="access_key" size="35" id="access_key" value="<?php echo $this->_payment_settings['access_key']; ?>">
				<br />
				<span class="description">
					<?php _e('eg. 234twat4e3rwegr4w', 'event_espresso'); ?>
				</span></td>
		</tr>
		
		<tr>
			<th><label for="currency_format">
					<?php _e('Country Currency', 'event_espresso'); ?>
					<?php echo EEH_Template::get_help_tab_link( 'ee_' . $this->_gateway_name . '_help' ); ?>
				</label></th>
			<td><select name="currency_format" data-placeholder="Choose a currency...">
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
				</select></td>
		</tr>

		<tr>
			<th>
				<label for="pp_image_url">
					<?php _e('Image URL', 'event_espresso'); ?>
					<?php echo EEH_Template::get_help_tab_link( 'ee_' . $this->_gateway_name . '_help' ); ?>
				</label>
			</th>
			<td>
				<span class='ee_media_uploader_area'>
					<img class="ee_media_image" src="<?php echo $this->_payment_settings['image_url']; ?>" />
					<input class="ee_media_url" type="text" name="image_url" size='34' value="<?php echo $this->_payment_settings['image_url']; ?>">
					<a href="#" class="ee_media_upload"><img src="images/media-button-image.gif" alt="Add an Image"></a>
				</span><br/>
				<span class="description">
					<?php _e('Used for your business/personal logo on the PayPal page', 'event_espresso'); ?>
				</span>
			</td>
		</tr>
		
		<tr>
			<th><label for="use_sandbox">
					<?php _e('Use the Debugging Feature and the PayPal Sandbox', 'event_espresso'); ?>
					<?php echo EEH_Template::get_help_tab_link( 'ee_' . $this->_gateway_name . '_help' ); ?>
				</label></th>
			<td><?php echo EEH_Form_Fields::select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?></td>
		</tr>
		
		<tr>
			<th>
				<label for="no_shipping">
					<?php _e('Shipping Address Options', 'event_espresso'); ?>
					<?php echo EEH_Template::get_help_tab_link( 'ee_' . $this->_gateway_name . '_help' ); ?>
				</label>
			</th>
			<td>
			<?php
				$shipping_values = array(
						array('id' => '1', 'text' => __('Do not prompt for an address', 'event_espresso')),
						array('id' => '0', 'text' => __('Prompt for an address, but do not require one', 'event_espresso')),
						array('id' => '2', 'text' => __('Prompt for an address, and require one', 'event_espresso'))
					);
				echo EEH_Form_Fields::select_input('no_shipping', $shipping_values, $this->_payment_settings['no_shipping']);
			?>
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
				<li><a href="https://developer.paypal.com/" target="_blank"><?php _e('PayPal Sandbox Login', 'event_espresso'); ?></a></li>
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
		<?php
	}
	protected function _format_float($float){
		return number_format($float, 2);
	}

	public function process_payment_start(EE_Line_Item $total_line_item, $transaction = null) {
		$mijireh_settings = $this->_payment_settings;
		$access_key = $mijireh_settings['access_key'];
//		$paypal_cur = $mijireh_settings['currency_format'];
//		$no_shipping = $mijireh_settings['no_shipping'];
				
		/* @var $transaction EE_Transaction */
		if( ! $transaction){
			$transaction = $total_line_item->transaction();
		}
		//get any of the current registrations, 
		$primary_registrant = $transaction->primary_registration();
		$primary_attendee = $primary_registrant->attendee();
		$order = array(
			'total'=>$this->_format_float($transaction->total()),
			'return_url'=>$this->_get_return_url($primary_registrant),
			'items'=>array(),
			'email'=>$primary_attendee->email(),
			'first_name'=>$primary_attendee->fname(),
			'last_name'=>$primary_attendee->lname(),
			'tax'=>$this->_format_float($total_line_item->get_total_tax()));
		foreach($total_line_item->get_items() as $line_item){
			$order['items'][] = array(
				'name'=>$line_item->name(),
				'price'=>$this->_format_float($line_item->total()),
				'sku'=>$line_item->code(),
				'quantity'=>$line_item->quantity()
			);
		}
		
	
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, serialize(get_object_vars($this)) );
				$args = array(
		'headers' => array(
			'Authorization' => 'Basic ' . base64_encode( $access_key . ':' ),
			'Accept'=>'application/json'
			),
		'body'=>  json_encode($order)
		);
		$response = wp_remote_post( 'https://secure.mijireh.com/api/1/orders', $args );
		if(! empty($response['body'])){
			$response_body = json_decode($response['body']);
			$this->_gatewayUrl = $response_body->checkout_url;
			$this->_EEM_Gateways->set_off_site_form($this->submitPayment());
			$payment = EE_Payment::new_instance(array(
				'TXN_ID' => $transaction->ID(), 
				'STS_ID' => EEM_Payment::status_id_failed, 
				'PAY_timestamp' => $transaction->datetime(), 
				'PAY_method' => 'CART', 
				'PAY_amount' => $transaction->total(), 
				'PAY_gateway' => $this->_gateway_name, 
				'PAY_gateway_response' => null, 
				'PAY_txn_id_chq_nmbr' => $response_body->order_number, 
				'PAY_po_number' => NULL, 
				'PAY_extra_accntng'=>$primary_registrant->reg_code(),
				'PAY_via_admin' => false, 
				'PAY_details' => $response_body
			));
			$payment->save();
		}else{
			throw new EE_Error(__("No response from Mijireh Gateway", 'event_espresso'));
		}
		$this->redirect_after_reg_step_3($transaction,$mijireh_settings['use_sandbox']);
	}
	
	/**
	 * 
	 * Override's parent to only change the FORM's method to a GET instead of a POST
	 * @return array
	 */
	public function submitPayment() {
		$parents_result = parent::submitPayment();
		$parents_result['form'] = str_replace("<form method=\"POST\"", "<form method=\"GET\"", $parents_result['form']);
		return $parents_result;
	}




	/**
	 * Handles a paypal IPN, verifies we haven't already processed this IPN, creates a payment (regardless of success or not)
	 * and updates the provided transaction, and saves to DB
	 * @param EE_Transaction or ID $transaction
	 * @return boolean
	 */
	public function handle_ipn_for_transaction(EE_Transaction $transaction){
		//mijireh actually doesnt handle IPNs. Instead, when we load the thank you page we just retrieve the payment's status in mijireh and updated our payment and transaction etc
		return true;
	}
	
	
	

	public function espresso_display_payment_gateways( $selected_gateway = '' ) {
		$this->_css_class = $selected_gateway == $this->_gateway_name ? '' : ' hidden';
		echo $this->_generate_payment_gateway_selection_button();
		?>


		<div id="reg-page-billing-info-<?php echo $this->_gateway_name; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<h3><?php _e('You have selected "PayPal" as your method of payment', 'event_espresso'); ?></h3>
			<p><?php _e('After finalizing your registration, you will be transferred to the PayPal.com website where your payment will be securely processed.', 'event_espresso'); ?></p>
		</div>

		<?php
	}
	/**
	 * For mijireh, the thank you page is actually where we updated our payment and transaction. This is because mijireh does not send an IPN, even though its an offsite gateway.
	 * @param EE_Transaction $transaction
	 * @throws EE_Error
	 */
	public function thank_you_page_logic(EE_Transaction $transaction) {
		$payment = EEM_Payment::instance()->get_one(array(array('TXN_ID'=>$transaction,'PAY_gateway'=>$this->_gateway_name),'order_by'=>array('PAY_ID'=>'DESC')));
		if($payment && $payment instanceof EE_Payment){
			$mijireh_settings = $this->_payment_settings;
			$access_key = $mijireh_settings['access_key'];
			$url = 'https://secure.mijireh.com/api/1/orders/'.$payment->txn_id_chq_nmbr();
			$response = wp_remote_get($url,
					array('headers' => array(
			'Authorization' => 'Basic ' . base64_encode( $access_key . ':' ),
			'Accept'=>'application/json'
			)));
			if($response && isset($response['body']) && $response_body = json_decode($response['body'])){
				switch($response_body->status){
					case 'paid':
						$payment->set_status(EEM_Payment::status_id_approved);
						break;
					case 'pending':
						$payment->set_status(EEM_Payment::status_id_pending);
						break;
					default:
						$payment->set_status(EEM_Payment::status_id_declined);
				}
				
				$payment->save();
				$this->update_transaction_with_payment($transaction, $payment);
			}
		}else{
			throw new EE_Error(sprintf(__("Could not find Mijireh payment for transaction %s",'event_espresso'),$transaction->ID()));
		}
		
		parent::thank_you_page_logic($transaction);
	}
	
	/**
	 * Gets the array of settings for this gateway
	 * @return array
	 */
	public function settings(){
		return $this->_payment_settings;
	}
}
	