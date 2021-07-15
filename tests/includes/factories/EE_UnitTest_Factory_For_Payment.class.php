<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }



/**
 * EE Factory Class for EE_Payment
 *
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
 *
 */
class EE_UnitTest_Factory_For_Payment extends WP_UnitTest_Factory_For_Thing {

	public function __construct( $factory = null ) {
		parent::__construct( $factory );
		//default args for creating payments.
		$this->default_generation_definitions = array();
	}



	/**
	 * used by factory to create payment object
	 *
	 * @since 4.3.0
	 *
	 * @param array $args Incoming field values to set on the new object
	 *
	 * @return EE_Payment|false
	 */
	public function create_object( $args ) {
		//timezone?
		if ( isset( $args[ 'timezone' ] ) ) {
			$timezone = $args[ 'timezone' ];
			unset( $args[ 'timezone' ] );
		} else {
			$timezone = '';
		}
		//date_formats?
		if ( isset( $args[ 'formats' ] ) && is_array( $args[ 'formats' ] ) ) {
			$formats = $args[ 'formats' ];
			unset( $args[ 'formats' ] );
		} else {
			$formats = array();
		}
		$payment = EE_Payment::new_instance( $args, $timezone, $formats );
		$paymentID = $payment->save();
		return $paymentID ? $payment : false;
	}



	/**
	 * Update payment object for given payment
	 *
	 * @since 4.3.0
	 *
	 * @param int $PMT_ID Payment ID for the payment to update
	 * @param array $cols_n_data columns and values to change/update
	 *
	 * @return EE_Payment|false
	 */
	public function update_object( $PMT_ID, $cols_n_data ) {
		//all the stuff for updating an payment.
		$payment = EEM_Payment::instance()->get_one_by_ID( $PMT_ID );
		if ( ! $payment instanceof EE_Payment ) {
			return null;
		}
		foreach ( $cols_n_data as $key => $val ) {
			$payment->set( $key, $val );
		}
		$success = $payment->save();
		return $success ? $payment : false;
	}



	/**
	 * return the payment object for a given payment ID
	 *
	 * @since 4.3.0
	 *
	 * @param int $PMT_ID the payment id for the payment to attempt to retrieve
	 *
	 * @return mixed null|EE_Payment
	 */
	public function get_object_by_id( $PMT_ID ) {
		return EEM_Payment::instance()->get_one_by_ID( $PMT_ID );
	}



}
// End of file EE_UnitTest_Factory_For_Payment.class.php
// Location: /EE_UnitTest_Factory_For_Payment.class.php