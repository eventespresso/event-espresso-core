<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EEG_Mijireh
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEG_Mijireh extends EE_Offsite_Gateway{
	protected $_access_key;

	protected $_currencies_supported = EE_Gateway::all_currencies_supported;
	/**
	 * @param EE_Payment $payment to process
	 * @param string $return_url URL to send the user to after a successful payment on the payment provider's website
	 * @param string $fail_url URL to send the user to after a failed payment attempt on teh payment provider's website
	 * @param string $cancel_url URL to send the user to after a cancelled payment attempt on teh payment provider's website
	 * @param boolean $send_full_itemized_list whether or not to try itemizing all the items purchased when
	 * informing the payment provider of the purchase or not. If charging for the entire transaction, this is usually
	 * set to TRUE; however if we are just charing for a part, it's harder to nail down exactly what the payment is for,
	 * so its usually set to FALSE in that case
	 * @return EE_Payment
	 */
	public function set_redirection_info($payment, $billing_info = array(), $return_url = NULL, $cancel_url = NULL) {
		/* @var $transaction EE_Transaction */
		$transaction = $payment->transaction();

		//get any of the current registrations,
		$primary_registrant = $transaction->primary_registration();

		$primary_attendee = $primary_registrant->attendee();
		$items = array();
		//if we're are charging for the full amount, show the normal line items
		if( $this->_can_easily_itemize_transaction_for( $payment )){
			$total_line_item = $transaction->total_line_item();
			$tax_total = $total_line_item->get_total_tax();
			foreach($total_line_item->get_items() as $line_item){
				$items[] = array(
					'name'=>$line_item->name(),
					'price'=>$this->format_currency($line_item->unit_price()),
					'sku'=>$line_item->code(),
					'quantity'=>$line_item->quantity()
				);
			}
		}else{//its a partial payment
			$tax_total = 0;
			//partial payment, so just add 1 item
			$items[] = array(
				'name'=>  sprintf(__("Partial payment for registration %s", 'event_espresso'),$primary_registrant->reg_code()),
				'price'=> $this->format_currency($payment->amount()),
				'sku'=>$primary_registrant->reg_code(),
				'quantity'=>1
			);
		}
		$order = array(
			'total'=>$this->format_currency($payment->amount()),
			'return_url'=>$return_url,
			'items'=>$this->_prepare_for_mijireh( $items ),
			'email'=>$primary_attendee->email(),
			'first_name'=>$primary_attendee->fname(),
			'last_name'=>$primary_attendee->lname(),
			'tax'=>$this->format_currency($tax_total),
			'partner_id'=>'ee');
		//setup address?
		if(		$primary_attendee->address()  &&
				$primary_attendee->city()  &&
				$primary_attendee->state_name()  &&
				$primary_attendee->country_name()  &&
				$primary_attendee->zip()  ){
			$shipping_address = array(
				'first_name'=>$primary_attendee->fname(),
				'last_name'=>$primary_attendee->lname(),
				'street' => $primary_attendee->address(),
				'city' => $primary_attendee->city(),
				'state_province' => $primary_attendee->state_name(),
				'zip_code' => $primary_attendee->zip(),
				'country' => $primary_attendee->country_name()
			);
			if( $primary_attendee->address2() ){
				$shipping_address[ 'apt_suite' ] = $primary_attendee->address2();
			}
			if( $primary_attendee->phone() ){
				$shipping_address[ 'phone' ] = $primary_attendee->phone();
			}
			$order[ 'billing_address' ] = $shipping_address;
			$order[ 'shipping_address' ] = $shipping_address;
		}
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, serialize(get_object_vars($this)) );
				$args = array(
		'headers' => array(
			'Authorization' => 'Basic ' . base64_encode( $this->_access_key . ':' ),
			'Accept'=>'application/json'
			),
		'body'=>  json_encode($order)
		);
		$response = wp_remote_post( 'https://secure.mijireh.com/api/1/orders', $args );
		$this->log(array('get checkout url request_args' => $args, 'response' => $response ), $payment);
		if( ! $response instanceof WP_Error ){
			$response_body = json_decode($response['body']);
			if($response_body == NULL || ! isset($response_body->checkout_url)){
				if( is_array( $response_body ) || is_object( $response_body)){
					$response_body_as_array = (array)$response_body;
					$problems_string = '';
					foreach($response_body_as_array as $problem_parameter => $problems){
						$problems_string.= sprintf(__('\nProblems with %s: %s','event_espresso'),$problem_parameter,implode(", ",$problems));
					}
				}else{
					$problems_string = $response['body'];
				}
				if( $problems_string == ''){
					//no message to show? wack
					if( isset( $response[ 'headers' ][ 'status' ] ) ){
						$problems_string = $response[ 'headers' ][ 'status' ];
					}else{
						$problems_string = __( 'No response from Mijireh', 'event_espresso' );
					}
				}

				throw new EE_Error(sprintf(__('Errors occurred communicating with Mijireh: %s.','event_espresso'),$problems_string));
			}
			$payment->set_redirect_url($response_body->checkout_url);
			$payment->set_txn_id_chq_nmbr($response_body->order_number);
			$payment->set_details($response['body']);
		}else{
			$error_message = sprintf(__("Errors communicating with Mijireh: %s", 'event_espresso'),implode(",",$response->get_error_messages()));
			EE_Error::add_error($error_message, __FILE__, __FUNCTION__, __LINE__ );
			throw new EE_Error($error_message);

		}
		return $payment;
	}

	/**
	 * goes through $data and ensures there are no percent signs in it
	 * (which, strangely, kill mijireh)
	 * @param mixed $data
	 * @return mixed same type as $data
	 */
	private function _prepare_for_mijireh( $data ){
		if( is_array( $data ) ){
			$prepared_data = array();
			foreach($data as $key => $datum ){
				$prepared_data[ $key ] = $this->_prepare_for_mijireh( $datum );
			}
			return $prepared_data;
		}elseif(is_string( $data ) ){
			return str_replace( '%', 'percent', $data );
		}else{
			return $data;
		}
	}
/**
 * Handles the payment update (note: mijireh doesn't send an IPN in the usual sense,
 * instead they just redirect the user back to our website and then we need to query them
 * for the payment's status). Also note that the $update_info should be an array with the key
 * 'payment' containing the EEI_Payment to update
 * @param array $update_info unused. We just use the $transaction
 * @param EEI_Transaction $transaction
 * @throws EE_Error
 */
	public function handle_payment_update($update_info, $transaction) {
		$payment = $transaction->last_payment();
		if($payment && $payment instanceof EEI_Payment){
			$url = 'https://secure.mijireh.com/api/1/orders/'.$payment->txn_id_chq_nmbr();
			$request_args = array('headers' => array(
			'Authorization' => 'Basic ' . base64_encode( $this->_access_key . ':' ),
			'Accept'=>'application/json'
			));
			$response = wp_remote_get($url, $request_args );
			$this->log( array( ' get paymetn status request_args' => $request_args, 'response' => $response ), $payment );
			if($response && isset($response['body']) && $response_body = json_decode($response['body'])){
				switch($response_body->status){
					case 'paid':
						$payment->set_status($this->_pay_model->approved_status());
						break;
					case 'pending':
						$payment->set_status($this->_pay_model->pending_status());
						break;
					default:
						$payment->set_status($this->_pay_model->declined_status());
				}
				return $payment;
			}else{
				throw new EE_Error(sprintf(__("Response from Mijireh could not be understood", "event_espresso")));
			}
		}else{
			throw new EE_Error(sprintf(__("Could not find Mijireh payment for transaction %s",'event_espresso'),$transaction->ID()));
		}
	}

}

// End of file EEG_Mijireh.gateway.php