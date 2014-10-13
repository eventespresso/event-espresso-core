<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EEG_New_Payment_Method_Onsite
 *
 * Just approves payments where billing_info[ 'credit_card' ] == 1.
 * If $billing_info[ 'credit_card' ] == '2' then its pending.
 * All others get refused
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEG_New_Payment_Method_Onsite extends EE_Onsite_Gateway{

	/**
	 * All the currencies supported by this gateway. Add any others you like,
	 * as contained in the esp_currency table
	 * @var array
	 */
	protected $_currencies_supported = array(
					'USD',
					'GBP',
					'CAD',
					'AUD');
	/**
	 *
	 * @param EEI_Payment $payment
	 * @param array $billing_info
	 */
	public function do_direct_payment($payment, $billing_info = null) {
		$this->log( $billing_info, $payment );
		$payment->set_status( $this->_pay_model->approved_status() );
		return $payment;
	}
}

// End of file EEG_New_Payment_Method_Onsite.php