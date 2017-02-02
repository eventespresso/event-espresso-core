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
	public function status();
	/**
	 * @return float returns the amount the payment is for (whether or not its approved)
	 */
	public function amount();
	/**
	 * @return string of the currency for this payment
	 */
	public function currency_code();

	/**
	 * The gateway transaction's ID, usually assigned by the
	 * payment provider
	 * @return string
	 */
	public function txn_id_chq_nmbr();

	/**
	 *
	 * @param string $status
	 */
	public function set_status($status);

	/**
	 * Sets the response from the gateway, which is displayable to the user.
	 * Eg, 'payment was approved', 'payment failed because invalid date', etc.
	 * @param string $response
	 */
	public function set_gateway_response($response);

	/**
	 * Sets the response details, usually the entire contents of an IPN request,
	 * or data about the direct payment data sent
	 * @param mixed $response_details
	 */
	public function set_details($response_details);

	/**
	 * Returns whatever the details were set to be, which could be an array, object, string, integer, whatever.
	 * @return mixed
	 */
	public function details();

	/**
	 * Sets the URl to redirect to, to process payment
	 * @param string $url
	 */
	public function set_redirect_url($url);

	/**
	 * Sets the argument which should be passed to the redirect url (ie, usually POST variables)
	 * @param array $args
	 */
	public function set_redirect_args($args);

	/**
	 * Gets redirect_args
	 * @return array
	 */
	public function redirect_args();

	/**
	 *
	 * @return EEI_Transaction
	 */
	public function transaction();

	/**
	 * Sets the amount for this payment
	 * @param float $amount
	 */
	public function set_amount($amount);

	/**
	 * Sets the ID of the gateway transaction
	 * @param string $txn_id
	 */
	public function set_txn_id_chq_nmbr($txn_id);

	/**
	 * Sets a string for some extra accounting info
	 * @param string $extra_accounting_info
	 */
	public function set_extra_accntng($extra_accounting_info);

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
	public function approved_status();
	/**
	 * returns a string for the pending status
	 */
	public function pending_status();
	/**
	 * returns a string for the cancelled status
	 */
	public function cancelled_status();
	/**
	 * returns a string for the failed status
	 */
	public function failed_status();
	/**
	 * returns a string for the declined status
	 */
	public function declined_status();


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
	public function get_payment_by_txn_id_chq_nmbr($txn_id);
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
	public function gateway_log($message,$id,$model_name);
}


/**
 * Interface for an event being registered for
 */
interface EEI_Event {
	public function name();
}


// End of file EEI_Payment_Method_Interfaces.php
// Location: /EEI_Payment_Method_Interfaces.php