<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * Interface EEI_Payment
 *
 * allows gateways to be used by different systems other than Event Espresso
 */
interface EEI_Payment extends EEI_Base{

	/**
	 * @return string indicating which the payment is approved, pending, cancelled or failed
	 */
	function status();
	/**
	 * @return float returns the amount the payment is for (whether or not its approved)
	 */
	function amount();
	/**
	 * @return string of the currency for this payment
	 */
	function currency_code();

	/**
	 * The gateway transaction's ID, usually assigned by the
	 * payment provider
	 * @return string
	 */
	function txn_id_chq_nmbr();

	/**
	 *
	 * @param string $status
	 */
	function set_status($status);

	/**
	 * Sets the response from the gateway, which is displayable to the user.
	 * Eg, 'payment was approved', 'payment failed because invalid date', etc.
	 * @param string $response
	 */
	function set_gateway_response($response);

	/**
	 * Sets the response details, usually the entire contents of an IPN request,
	 * or data about the direct payment data sent
	 * @param mixed $response_details
	 */
	function set_details($response_details);

	/**
	 * Returns whatever the details were set to be, which could be an array, object, string, integer, whatever.
	 * @return mixed
	 */
	function details();

	/**
	 * Sets the URl to redirect to, to process payment
	 * @param string $url
	 */
	function set_redirect_url($url);

	/**
	 * Sets the argument which should be passed to the redirect url (ie, usually POST variables)
	 * @param array $args
	 */
	function set_redirect_args($args);

	/**
	 * Gets redirect_args
	 * @return array
	 */
	function redirect_args();

	/**
	 *
	 * @return EEI_Transaction
	 */
	function transaction();
	/**
	 * Sets the amount for this payment
	 * @param float $amount
	 */
	function set_amount($amount);

	/**
	 * Sets the ID of the gateway transaction
	 * @param string $txn_id
	 */
	function set_txn_id_chq_nmbr($txn_id);

	/**
	 * Sets a string for some extra accounting info
	 * @param string $extra_accounting_info
	 */
	function set_extra_accntng($extra_accounting_info);

}





/**
 * Interface EEMI_Payment
 *
 * interface representing a model (for querying to get EEI_Payment objects).
 * It's probably best if its a singleton to save on resources but still allow it
 * to have some state
 */
interface EEMI_Payment {
	/**
	 * returns a string for the approved status
	 */
	function approved_status();
	/**
	 * returns a string for the pending status
	 */
	function pending_status();
	/**
	 * returns a string for the cancelled status
	 */
	function cancelled_status();
	/**
	 * returns a string for the failed status
	 */
	function failed_status();
	/**
	 * returns a string for the declined status
	 */
	function declined_status();


	/**
	 * Function that returns an instance of this class.
	 * @return EEMI_Payment
	 */
	public static function instance();

	/**
	 * Gets a payment by the transaction ID or cheque number
	 * @param int $txn_id
	 * @return EEI_Payment
	 */
	function get_payment_by_txn_id_chq_nmbr($txn_id);
}






/**
 * Interface EEI_Payment_Method
 */
interface EEI_Payment_Method{

}





/**
 * Interface EEMI_Payment_Log
 */
interface EEMI_Payment_Log {
	/**
	 * Logs a message
	 * @param string $message
	 * @param int|string $id
	 * @param string $model_name
	 * @return EE_Log
	 */
	function gateway_log($message,$id,$model_name);
}



// End of file EEI_Payment_Method_Interfaces.php
// Location: /EEI_Payment_Method_Interfaces.php