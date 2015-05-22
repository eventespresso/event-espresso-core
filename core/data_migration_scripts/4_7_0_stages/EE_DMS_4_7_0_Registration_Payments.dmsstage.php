<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_DMS_4_7_0_Registration_Payments
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Brent Christensen
 *
 */
class EE_DMS_4_7_0_Registration_Payments extends EE_Data_Migration_Script_Stage_Table{

	protected $_payment_table;

	protected $_registration_table;

	protected $_registration_payment_table;

	function __construct(){
		/** @type WPDB $wpdb */
		global $wpdb;
		$this->_pretty_name = __( 'Transaction Payment Method Relations', 'event_espresso' );
		// define tables
		$this->_old_table 									= $wpdb->prefix . 'esp_transaction';
		$this->_payment_table 						= $wpdb->prefix . 'esp_payment';
		$this->_registration_table 					= $wpdb->prefix . 'esp_registration';
		$this->_registration_payment_table 	= $wpdb->prefix . 'esp_registration_payment';
		// build SQL JOIN and WHERE clauses
		$this->_extra_where_sql = "WHERE STS_ID = 'TIN' ";
		$this->_extra_where_sql .= "AND TXN_Total != '0.000'";
		parent::__construct();
	}



	/**
	 * @param array $transaction
	 * @return boolean
	 */
	protected function _migrate_old_row( $transaction ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		$TXN_ID = absint( $transaction[ 'TXN_ID' ] );
		if ( ! $TXN_ID ) {
			$this->add_error(
				sprintf(
					__( 'Invalid transaction with ID=%1$d. Error: "%2$s"', 'event_espresso' ),
					$TXN_ID,
					$wpdb->last_error
				)
			);
			return false;
		}
		// get all payments for the TXN
		$payments = $this->_get_payments( $TXN_ID );
		if ( empty( $payments ) ) {
			return true;
		}
		// then the registrants
		$registrations = $this->_get_registrations( $TXN_ID );
		if ( empty( $registrations ) ) {
			return true;
		}
		$success = true;
		// now loop thru each payment and apply it to each of the registrations
		foreach ( $payments as $PAY_ID => $payment ) {
			if ( $payment->STS_ID === 'PAP' && $payment->PAY_amount > 0 ) {
				if ( ! $this->_process_registration_payments( $payment, $registrations )) {
					$success = false;
				}
			}
		}
		return $success;
	}



	/**
	 * _get_registrations
	 *
	 * @param int $TXN_ID
	 * @return array
	 */
	protected function _get_registrations( $TXN_ID ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		$SQL = "SELECT * FROM $this->_registration_table WHERE TXN_ID = %d AND STS_ID IN ( 'RPP', 'RAP' )";
		return $wpdb->get_results( $wpdb->prepare( $SQL, $TXN_ID ), OBJECT_K );
	}



	/**
	 * _get_payments
	 *
	 * @param int $TXN_ID
	 * @return array
	 */
	protected function _get_payments( $TXN_ID ) {
		/** @type WPDB $wpdb */
		global $wpdb;
		return $wpdb->get_results( $wpdb->prepare( "SELECT * FROM $this->_payment_table WHERE TXN_ID = %d", $TXN_ID ), OBJECT_K );
	}



	/**
	 * _process_registration_payments
	 *
	 * @param stdClass $payment
	 * @param array $registrations
	 * @return bool
	 */
	protected function _process_registration_payments( $payment, $registrations = array() ){
		$success = true;
		// how much is available to apply to registrations?
		$available_payment_amount = $payment->PAY_amount;
		foreach ( $registrations as $REG_ID => $registration ) {
			// nothing left?
			if ( $available_payment_amount <= 0 ) {
				break;
			}
			// don't allow payment amount to exceed the available payment amount
			$payment_amount = $available_payment_amount < $registration->REG_final_price ? $available_payment_amount : $registration->REG_final_price;
			// update $available_payment_amount
			$available_payment_amount = $available_payment_amount - $payment_amount;
			// add relation between registration and payment and set amount
			if ( $this->_insert_registration_payment( $registration->REG_ID, $payment->PAY_ID, $payment->PAY_amount )) {
				//calculate and set new REG_paid
				if ( ! $this->_update_registration_paid( $registration->REG_ID, $payment->PAY_amount )) {
					$success = false;
				}
			}
		}
		return $success;
	}



	/**
	 * _update_registration_paid
	 *
	 * @param int $REG_ID
	 * @param float $REG_paid
	 * @return bool
	 */
	protected function _update_registration_paid( $REG_ID = 0, $REG_paid = 0.00 ){
		/** @type WPDB $wpdb */
		global $wpdb;
		$success = $wpdb->update(
			$this->_registration_table,
			array( 'REG_paid' => $REG_paid ),  // data
			array( 'REG_ID' => $REG_ID ),  // where
			array( '%f' ),   // data format
			array( '%d' )  // where format
		);
		if ( ! $success ) {
			$this->add_error(
				sprintf(
					__( 'Could not update registration paid value for registration ID=%1$d because "%2$s"', 'event_espresso' ),
					$REG_ID,
					$wpdb->last_error
				)
			);
			return false;
		}
		return true;
	}



	/**
	 * _insert_registration_payment
	 *
	 * @param int $REG_ID
	 * @param int $PAY_ID
	 * @param float $PAY_amount
	 * @return bool
	 */
	protected function _insert_registration_payment( $REG_ID = 0, $PAY_ID = 0, $PAY_amount = 0.00 ){
		/** @type WPDB $wpdb */
		global $wpdb;
		$success = $wpdb->insert(
			$this->_registration_payment_table,
			array( 'REG_ID' => $REG_ID, 'PAY_ID' => $PAY_ID, 'RPY_amount' => $PAY_amount, ),  // data
			array( '%f' )   // data format
		);
		if ( ! $success ) {
			$this->add_error(
				sprintf(
					__( 'Could not update registration paid value for registration ID=%1$d because "%2$s"', 'event_espresso' ),
					$REG_ID,
					$wpdb->last_error
				)
			);
			return false;
		}
		return true;
	}


}

// End of file EE_DMS_4_7_0_Registration_Payments.dmsstage.php