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
		if( $payment->amount() != $transaction->total()){//client code specified an amount
			$total_line_item = $transaction->total_line_item();
			$tax_total = $total_line_item->get_total_tax();
			foreach($total_line_item->get_items() as $line_item){
				$items[] = array(
					'name'=>$line_item->name(),
					'price'=>$this->format_currency($line_item->total()),
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
			'items'=>$items,
			'email'=>$primary_attendee->email(),
			'first_name'=>$primary_attendee->fname(),
			'last_name'=>$primary_attendee->lname(),
			'tax'=>$this->format_currency($tax_total),
			'partner_id'=>'ee');
		
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, serialize(get_object_vars($this)) );
				$args = array(
		'headers' => array(
			'Authorization' => 'Basic ' . base64_encode( $this->_access_key . ':' ),
			'Accept'=>'application/json'
			),
		'body'=>  json_encode($order)
		);
		$response = wp_remote_post( 'https://secure.mijireh.com/api/1/orders', $args );
		if(! empty($response['body'])){
			$response_body = json_decode($response['body']);
			$payment->set_redirect_url($response_body->checkout_url);
			$payment->set_txn_id_chq_nmbr($response_body->order_number);
			$payment->set_details((array)$response_body);
		}else{
			throw new EE_Error(__("No response from Mijireh Gateway", 'event_espresso'));
		}
		return $payment;
	}
/**
 * Handles the payment update (note: mijireh doesn't send an IPN in the usual sense,
 * instead they just redirect the user back to our website and then we need to query them
 * for the payment's status). Also note that the $update_info should be an array with the key
 * 'payment' containing the EEI_Payment to update
 * @param array $update_info{
 *	@type $payment EEI_Payment
 * }
 * @param type $transaction
 * @throws EE_Error
 */
	public function handle_payment_update($update_info, $transaction) {
		$payment = isset($update_info['payment']) ? $update_info['payment'] : NULL;
		if($payment && $payment instanceof EEI_Payment){
			$url = 'https://secure.mijireh.com/api/1/orders/'.$payment->txn_id_chq_nmbr();
			$response = wp_remote_get($url,
					array('headers' => array(
			'Authorization' => 'Basic ' . base64_encode( $this->_access_key . ':' ),
			'Accept'=>'application/json'
			)));
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