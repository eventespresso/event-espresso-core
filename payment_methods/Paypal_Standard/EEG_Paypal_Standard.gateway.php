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
 * EEG_Paypal_Standard
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEG_Paypal_Standard extends EE_Offsite_Gateway {
	protected $_paypal_id = NULL;
	protected $_no_shipping = NULL;
	protected $_image_url = NULL;
	protected $_shipping_details = NULL;
	/**
	 * @var $_debug_model boolean
	 */
	protected $_debug_mode = NULL;
	protected $_name = NULL;
	protected $_admin_name = NULL;
	
	/**
	 * @param EE_Payment $payment to process
	 * @param array $billing_info but should be empty for this gateway
	 * @param string $return_url URL to send the user to after payment on the payment provider's website
	 * @param string $notify_url URL to send the instant payment notification
	 * @param string $cancel_url URL to send the user to after a cancelled payment attempt on teh payment provider's website
	 * @param boolean $send_full_itemized_list whether or not to try itemizing all the items purchased when
	 * informing the payment provider of the purchase or not. If charging for the entire transaction, this is usually
	 * set to TRUE; however if we are just charing for a part, it's harder to nail down exactly what the payment is for, 
	 * so its usually set to FALSE in that case
	 * @return EE_Payment
	 */
	public function set_redirection_info($payment,$billing_info = array(),$return_url = NULL, $notify_url = NULL, $cancel_url = NULL){
		$redirect_args = array();
		$transaction = $payment->transaction();
		$primary_registrant = $transaction->primary_registration();
		$item_num = 1;
		if($payment->amount() == $transaction->total()){
			$total_line_item = $transaction->total_line_item();
			//this payment is for the entire transaction,
			//so let's show all the line items
			foreach($total_line_item->get_items() as $line_item){
				$redirect_args['item_name_' . $item_num] = substr($line_item->name(),0,127);
				$redirect_args['amount_' . $item_num] = $line_item->unit_price();
				$redirect_args['quantity_' . $item_num] = $line_item->quantity();
				$item_num++;
			}
			//and show all the taxes
			foreach($total_line_item->tax_descendants() as $tax_line_item){
				$redirect_args['item_name_' . $item_num] = substr($tax_line_item->name(),0,127);
				$redirect_args['amount_' . $item_num] = $tax_line_item->total();
				$redirect_args['quantity_' . $item_num] = '1';
				$item_num++;
			}
		}else{
			//this is a partial payment, so we can't really show all the line items
			$redirect_args['item_name_' . $item_num] = substr(sprintf(__("Amoutn owing for registration %s", "event_espresso"),$primary_registrant->reg_code()));
			$redirect_args['amount_' . $item_num] = $payment->amount();
			$item_num++;
			
		}
		if($this->_debug_mode){
			$redirect_args['item_name_' . $item_num] = 'DEBUG INFO (this item only added in sandbox mode';
			$redirect_args['amount_' . $item_num] = 0;
			$redirect_args['on0_'.$item_num] = 'NOTIFY URL';
			$redirect_args['os0_' . $item_num] = $notify_url;
		}
		$redirect_args['business'] = $this->_paypal_id;
		$redirect_args['return'] = $return_url;
		$redirect_args['cancel_return'] = $cancel_url;
		$redirect_args['notify_url'] = $notify_url;
		$redirect_args['cmd'] = '_cart';
		$redirect_args['upload'] = 1;
		$redirect_args['currency_code'] = 'USD';//@todo: this should be whatever the type of the payment is
		if($this->_image_url){
			$redirect_args['image_url'] = $this->_image_url;
		}
		$redirect_args['no_shipping'] = $this->_no_shipping;
		
		if($this->_debug_mode){
			$payment->set_redirect_url('https://www.sandbox.paypal.com/cgi-bin/webscr');
		}else{
			$payment->set_redirect_url('https://www.paypal.com/cgi-bin/webscr');
		}
		$payment->set_redirect_args($redirect_args);
		return $payment;
	}
	/**
	 * Often used for IPNs. But applies the info in $update_info to the payment.
	 * What is $update_info? Often the contents of $_REQUEST, but not necessarily. Whatever
	 * the payment method passes in.
	 * @param array $update_info of whatever
	 * @param EE_Payment $payment
	 * @return EE_Payment updated
	 */
	public function handle_payment_update($update_info, $payment){
		$payment->set_status(EEM_Payment::status_id_approved);
		$payment->set_gateway_response('IPN received a-ok');
		return $payment;
	}
}

// End of file EEG_Paypal_Standard.gateway.php