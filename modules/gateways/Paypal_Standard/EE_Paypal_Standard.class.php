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
		if (self::$_instance === NULL or !is_object(self::$_instance) or ! ( self::$_instance instanceof  EE_Paypal_Standard )) {
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
		$this->_payment_settings['display_name'] = __('PayPal Standard','event_espresso');
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
			<th>
				<label><strong style="color:#F00"><?php _e('Please Note', 'event_espresso'); ?></strong></label>
			</th>
			<td>
				<?php _e('You will need a PayPal Premier or Business account for the PayPal IPN to work correctly.', 'event_espresso'); ?>
			</td>
		</tr>

		<tr>
			<th><label for="paypal_id">
					<?php _e('PayPal Email', 'event_espresso'); ?>
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
					<?php echo EEH_Template::get_help_tab_link( 'payment_methods_overview_paypalstandard_help_tab' ); ?>
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
					<?php echo EEH_Template::get_help_tab_link( 'payment_methods_overview_paypalstandard_help_tab' ); ?>
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
					<?php echo EEH_Template::get_help_tab_link( 'payment_methods_overview_paypalstandard_help_tab' ); ?>
				</label></th>
			<td><?php echo EEH_Form_Fields::select_input('use_sandbox', $this->_yes_no_options, $this->_payment_settings['use_sandbox']); ?></td>
		</tr>

		<tr>
			<th>
				<label for="no_shipping">
					<?php _e('Shipping Address Options', 'event_espresso'); ?>
					<?php echo EEH_Template::get_help_tab_link( 'payment_methods_overview_paypalstandard_help_tab' ); ?>
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

	public function process_payment_start(EE_Line_Item $total_line_item, $transaction = null,$total_to_pay = NULL) {

		$paypal_settings = $this->_payment_settings;
		$paypal_id = $paypal_settings['paypal_id'];
		$paypal_cur = $paypal_settings['currency_format'];
		$no_shipping = $paypal_settings['no_shipping'];

		$item_num = 1;

		/* @var $transaction EE_Transaction */
		if( ! $transaction){
			$transaction = $total_line_item->transaction();
		}
		$primary_registrant = $transaction->primary_registration();
		if( $total_to_pay === NULL && //they didn't specify an amount to charge
			$total_to_pay != $transaction->total() && //and even if they did, it wasn't for the entire transaction
			! $transaction->paid()){//and there have been no payments on the transaction yet anyways
			//so let's create a nice looking invoice including everything
			foreach($total_line_item->get_items() as $line_item){
				$this->addField('item_name_' . $item_num,
						substr(
								sprintf(
										__( '%s for %s', 'event_espresso' ),
										$line_item->name() ,
										$line_item->ticket_event_name() ),
								0,
								127 ) );
				$this->addField('amount_' . $item_num, $line_item->unit_price());
				$this->addField('quantity_' . $item_num, $line_item->quantity());
				$item_num++;
			}

			foreach ($total_line_item->tax_descendants() as  $tax_line_item) {
				$this->addField('item_name_' . $item_num, substr($tax_line_item->name(),0,127));
				$this->addField('amount_' . $item_num, $tax_line_item->total());
				$this->addField('quantity_' . $item_num, '1');
				$item_num++;
			}
		}else{//we're only charging for part of the transaction's total
			if( $total_to_pay){
				//client code specified how much to charge
				$description = sprintf(__("Partial payment of %s", "event_espresso"),$total_to_pay);
			}elseif($transaction->paid()){
				//they didn't specify how much, but there has already been a payment, so let's just charge on what's left
				$total_to_pay = $transaction->remaining();
				$description = sprintf(__("Total paid to date: %s, and this charge is for the balance.", "event_espresso"),$transaction->get_pretty('TXN_paid'));
			}else{
				throw new EE_Error(sprintf(__("Thats impossible!!", "event_espresso")));
			}
			$this->addField('item_name_'.$item_num,  sprintf(__("Amount owing for registration %s", 'event_espresso'),$primary_registrant->reg_code()));
			$this->addField('amount_'.$item_num,$total_to_pay);
			$this->addField('on0_'.$item_num,  __("Amount Owing:", 'event_espresso'));
			$this->addField('os0_'.$item_num,  $description);
			$item_num++;
		}

		if($paypal_settings['use_sandbox']){
			$this->addField('item_name_'.$item_num,'DEBUG INFO (this item only added in sandbox mode)');
			$this->addField('amount_'.$item_num,0);
			$this->addField('on0_'.$item_num,'NOTIFY URL');
			$this->addField('os0_'.$item_num,$this->_get_notify_url($primary_registrant));
		}
		$this->addField('business', $paypal_id);
		$this->addField('return',  $this->_get_return_url($primary_registrant));
		$this->addField('cancel_return', $this->_get_cancel_url());
		$this->addField('notify_url', $this->_get_notify_url($primary_registrant));
		$this->addField('cmd', '_cart');
		$this->addField('upload', '1');
		$this->addField('currency_code', $paypal_cur);
		$this->addField('image_url', empty($paypal_settings['image_url']) ? '' : $paypal_settings['image_url']);
		$this->addField('no_shipping ', $no_shipping);
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, serialize(get_object_vars($this)) );
		$this->_EEM_Gateways->set_off_site_form($this->submitPayment());

		$this->redirect_after_reg_step_3($transaction,$paypal_settings['use_sandbox']);
	}




	/**
	 * Handles a paypal IPN, verifies we haven't already processed this IPN, creates a payment (regardless of success or not)
	 * and updates the provided transaction, and saves to DB
	 * @param EE_Transaction or ID $transaction
	 * @return boolean
	 */
	public function handle_ipn_for_transaction(EE_Transaction $transaction){
		$this->_debug_log("<hr><br>".get_class($this).":start handle_ipn_for_transaction on transaction:".($transaction instanceof EE_Transaction)?$transaction->ID():'unknown');


		//verify there's payment data that's been sent
		if(empty($_POST['payment_status']) || empty($_POST['txn_id'])){
			return false;
		}
		$this->_debug_log( "<hr><br>".get_class($this).": payment_status and txn_id sent properly. payment_status:".$_POST['payment_status'].", txn_id:".$_POST['txn_id']);
		//ok, then validate the IPN. Even if we've already processed this payment, let paypal know we don't want to hear from them anymore!
		if(!$this->validateIpn()){
			//huh, something's wack... the IPN didn't validate. We must have replied to the IPN incorrectly,
			//or their API must ahve changed: http://www.paypalobjects.com/en_US/ebook/PP_OrderManagement_IntegrationGuide/ipn.html
			EE_Error::add_error(__("PayPal IPN Validation failed!", "event_espresso"), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		//if the transaction's just an ID, swap it for a real EE_Transaction
		$transaction = $this->_TXN->ensure_is_obj($transaction);
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
			$gateway_response = __('Your payment is in progress. Another message will be sent when payment is approved.', 'event_espresso');
		}else{
			$status = EEM_Payment::status_id_declined;//declined
			$gateway_response = __('Your payment has been declined.', 'event_espresso');
		}
		$this->_debug_log( "<hr>Payment is interpreted as $status, and the gateway's response set to '$gateway_response'");
		//check if we've already processed this payment

		$payment = $this->_PAY->get_payment_by_txn_id_chq_nmbr($_POST['txn_id']);
		if(!empty($payment)){
			//payment exists. if this has the exact same status and amount, don't bother updating. just return
			if($payment->STS_ID() == $status && $payment->amount() == $_POST['mc_gross']){
				//echo "duplicated ipn! dont bother updating transaction foo!";
				$this->_debug_log( "<hr>Duplicated IPN! ignore it...");
				return false;
			}else{
				$this->_debug_log( "<hr>Existing IPN for this paypal transaction, but it\'s got some new info. Old status:".$payment->STS_ID().", old amount:".$payment->amount());
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

			$payment = EE_Payment::new_instance(array(
				'TXN_ID' => $transaction->ID(),
				'STS_ID' => $status,
				'PAY_timestamp' => current_time( 'mysql', FALSE ),
				'PAY_method' => sanitize_text_field($_POST['txn_type']),
				'PAY_amount' => floatval($_REQUEST['mc_gross']),
				'PAY_gateway' => $this->_gateway_name,
				'PAY_gateway_response' => $gateway_response,
				'PAY_txn_id_chq_nmbr' => $_POST['txn_id'],
				'PAY_po_number' => NULL,
				'PAY_extra_accntng'=>$primary_registration_code,
				'PAY_via_admin' => false,
				'PAY_details' => $_POST
			));

		}
		$payment->save();
		return $this->update_transaction_with_payment($transaction,$payment);
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
	 * Validate the IPN notification
	 *
	 * @param none
	 * @return boolean
	 */
	public function validateIpn() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );


		// Reading POSTed data directly from $_POST causes serialization issues with array data in the POST.
		// Instead, read raw POST data from the input stream.
		// @see https://gist.github.com/xcommerce-gists/3440401
		$raw_post_data = file_get_contents('php://input');
		$raw_post_array = explode('&', $raw_post_data);
		$myPost = array();
		foreach ($raw_post_array as $keyval) {
		  $keyval = explode ('=', $keyval);
		  if (count($keyval) == 2)
			 $myPost[$keyval[0]] = urldecode($keyval[1]);
		}
		// read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
		$req = 'cmd=_notify-validate';
		if(function_exists('get_magic_quotes_gpc')) {
		   $get_magic_quotes_exists = true;
		}
		foreach ($myPost as $key => $value) {
		   if($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) {
				$value = urlencode(stripslashes($value));
		   } else {
				$value = urlencode($value);
		   }
		   $req .= "&$key=$value";
		}

		$result= wp_remote_post($this->_gatewayUrl, array('body' => $req, 'sslverify' => false, 'timeout' => 60));
		if (!is_wp_error($result) && array_key_exists('body',$result) && strcmp($result['body'], "VERIFIED") == 0) {
//			echo "eepaypalstandard success!";
			$this->ipnResponse = $result['body'];
			return true;
		}else{
			$this->lastError = "IPN Validation Failed . $this->_gatewayUrl with response:".print_r($result['body'],true);
//			echo "eepaypalstandard error:".is_wp_error($result).", body equals VERIFIED:".(strcmp($result['body'], "VERIFIED") == 0);
			$this->ipnResponse=$result['body'];
			if($this->_debug_mode){
				echo "error!".print_r($this->lastError,true);
			}
			return false;
		}
	}



}

//end class
