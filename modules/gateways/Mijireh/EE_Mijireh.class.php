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
		if (self::$_instance === NULL or !is_object(self::$_instance) or ! ( self::$_instance instanceof  EE_Mijireh )) {
			self::$_instance = new self($model);
			//echo '<h3>'. __CLASS__ .'->'.__FUNCTION__.'  ( line no: ' . __LINE__ . ' )</h3>';
		}
		return self::$_instance;
	}

	protected function __construct(EEM_Gateways &$model) {
		$this->_gateway_name = 'Mijireh';
		$this->_button_base = 'mijireh-checkout-logo.png';
		$this->_path = str_replace('\\', '/', __FILE__);
		parent::__construct($model);
		$this->_gatewayUrl = '';//this needs to be dynamically calculated anyways
	}

	protected function _default_settings() {
		$this->_payment_settings['access_key'] = '';
		$this->_payment_settings['type'] = 'off-site';
		$this->_payment_settings['display_name'] = __('Mijireh','event_espresso');
		$this->_payment_settings['current_path'] = '';
		$this->_payment_settings['button_url'] = $this->_btn_img;
	}

	protected function _update_settings() {
		$this->_payment_settings['access_key'] = $_POST['access_key'];
		$this->_payment_settings['display_name'] = $_POST['display_name'];
		$this->_payment_settings['button_url'] = isset( $_POST['button_url'] ) ? esc_url_raw( $_POST['button_url'] ) : '';		
	}


	
	

	protected function _display_settings() {
		?>
		<tr>
			<th><label for="access_key">
					<?php _e('Mijireh Access Key', 'event_espresso'); ?><?php echo EEH_Template::get_help_tab_link( 'ee_Mijireh_help' ); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="access_key" size="35" id="access_key" value="<?php echo $this->_payment_settings['access_key']; ?>">
				<br />
				<span class="description">
					<?php _e('eg. 234twat4e3rwegr4w', 'event_espresso'); ?>
				</span></td>
		</tr>
		<tr>
			<th><label for="display_name">
					<?php _e('Display Name', 'event_espresso'); ?>
				</label></th>
			<td><input class="regular-text" type="text" name="display_name" size="35" id="display_name" value="<?php echo $this->_payment_settings['display_name']; ?>">
				<br />
				<span class="description">
					<?php _e('The name of this payment choice you want to display to registrants', 'event_espresso'); ?>
				</span></td>
		</tr>
		<?php
		do_action('AHEE__EE_Mijireh__settings_end');
	}

	protected function _display_settings_help() {
		//does nothign because this has been deprecated
	}
	protected function _format_float($float){
		return number_format($float, 2);
	}
	/**
	 * Sends a direct request to mijireh, informing them of the order, and they return the URL to send teh user to.
	 * Also, in order to later be able to find the status of the gateway's transaction, we immediately create an ee payment
	 * on this function and give it the mijireh's transaction ID.
	 * @param EE_Line_Item $total_line_item
	 * @param string $transaction
	 * @throws EE_Error
	 */
	public function process_payment_start(EE_Line_Item $total_line_item, $transaction = null, $total_to_charge = null) {
		$mijireh_settings = $this->_payment_settings;
		$access_key = $mijireh_settings['access_key'];
				
		/* @var $transaction EE_Transaction */
		if( ! $transaction){
			$transaction = $total_line_item->transaction();
		}
		//get any of the current registrations, 
		$primary_registrant = $transaction->primary_registration();
		$primary_attendee = $primary_registrant->attendee();
		$items = array();
		//if we're are charging for the full amount, show the normal line items
		if( $total_to_charge === NULL && ! $transaction->paid()){//client code specified an amount
			$total_to_charge = $transaction->total();
			$tax_total = $total_line_item->get_total_tax();
			foreach($total_line_item->get_items() as $line_item){
				$items[] = array(
					'name'=>$line_item->name(),
					'price'=>$this->_format_float($line_item->total()),
					'sku'=>$line_item->code(),
					'quantity'=>$line_item->quantity()
				);
			}
		}else{//its a partial payment
			if( ! $total_to_charge){//they didn't set teh total to charge, so it must have a balance
				$total_to_charge = $transaction->remaining();
			}
			$tax_total = 0;
			//partial payment, so just add 1 item
			$items[] = array(
				'name'=>  sprintf(__("Partial payment for registration %s", 'event_espresso'),$primary_registrant->reg_code()),
				'price'=> $this->_format_float($total_to_charge),
				'sku'=>$primary_registrant->reg_code(),
				'quantity'=>1
			);
		}
		$order = array(
			'total'=>$this->_format_float($total_to_charge),
			'return_url'=>$this->_get_return_url($primary_registrant),
			'items'=>$items,
			'email'=>$primary_attendee->email(),
			'first_name'=>$primary_attendee->fname(),
			'last_name'=>$primary_attendee->lname(),
			'tax'=>$this->_format_float($tax_total)),
			'partner_id'=>'ee');
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
			//chek if we already have an identical payment
			$duplicate_properties = array(
				'TXN_ID' => $transaction->ID(), 
				'STS_ID' => EEM_Payment::status_id_failed, 
				'PAY_method' => 'CART', 
				'PAY_amount' => $total_to_charge, 
				'PAY_gateway' => $this->_gateway_name, 
				'PAY_gateway_response' => null, 
				'PAY_po_number' => NULL, 
				'PAY_extra_accntng'=>$primary_registrant->reg_code(),
				'PAY_via_admin' => false, 
			);
			$unique_properties = array(
				'PAY_txn_id_chq_nmbr' => $response_body->order_number, 
				'PAY_timestamp' => $transaction->datetime(), 				
				'PAY_details' => (array)$response_body
			);
			$properties = array_merge($unique_properties,$duplicate_properties);
			$duplicate_payment = EEM_Payment::instance()->get_one(array($duplicate_properties));
			if($duplicate_payment){
				$payment = $duplicate_payment; 
			}else{
				$payment = EE_Payment::new_instance();
			}
			$payment->save($properties);
		}else{
			throw new EE_Error(__("No response from Mijireh Gateway", 'event_espresso'));
		}
		$this->redirect_after_reg_step_3();
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
	 * mijireh actually doesnt do IPNs. Instead, when we load the thank you page we just retrieve the payment's status in mijireh and updated our payment and transaction etc
	 * @param EE_Transaction or ID $transaction
	 * @return boolean
	 */
	public function handle_ipn_for_transaction(EE_Transaction $transaction){
		//mijireh actually doesnt do IPNs. Instead, when we load the thank you page we just retrieve the payment's status in mijireh and updated our payment and transaction etc
		return true;
	}
	
	
	

	public function espresso_display_payment_gateways( $selected_gateway = '' ) {
		$this->_css_class = $selected_gateway == $this->_gateway_name ? '' : ' hidden';
		echo $this->_generate_payment_gateway_selection_button();
		$display_name = $this->_payment_settings['display_name'];
		?>


		<div id="reg-page-billing-info-<?php echo $this->_gateway_name; ?>-dv" class="reg-page-billing-info-dv <?php echo $this->_css_class; ?>">
			<h3><?php printf(__('You have selected %s as your method of payment', 'event_espresso'),$display_name); ?></h3>
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
	