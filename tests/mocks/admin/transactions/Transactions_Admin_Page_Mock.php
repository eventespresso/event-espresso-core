<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * Transactions_Admin_Page_Mock
 * Used for testing Transactions Admin Page.
 *
 * @package			Event Espresso
 * @subpackage		mocks
 * @author			Brent Christensen
 * @since  4.8
 *
 */
require_once EE_ADMIN . 'EE_Admin_Page.core.php';
require_once EE_ADMIN . 'EE_Admin_Page_CPT.core.php';
require_once EE_ADMIN_PAGES . 'transactions/Transactions_Admin_Page.core.php';
class Transactions_Admin_Page_Mock extends Transactions_Admin_Page {


	public function __construct( $routing = TRUE ) {
		//define any constants that might not be defined yet when using this mock.
		if ( ! defined( 'TXN_PG_SLUG' ) ) {
			define( 'TXN_PG_SLUG', 'espresso_transactions' );
			define( 'TXN_PG_NAME', ucwords( str_replace( '_', '', TXN_PG_SLUG ) ) );
			define( 'TXN_ADMIN', EE_ADMIN_PAGES . 'transactions/' );
			define( 'TXN_ADMIN_URL', admin_url( 'admin.php?page=' . TXN_PG_SLUG ) );
			define( 'TXN_ASSETS_PATH', TXN_ADMIN . 'assets/' );
			define( 'TXN_TEMPLATE_PATH', TXN_ADMIN . 'templates/' );
			define( 'TXN_ASSETS_URL', str_replace( '\\', '/', EE_PLUGIN_DIR_URL . 'admin_pages/transactions/assets/') );
			define( 'TXN_TEMPLATE_URL', str_replace( '\\', '/', EE_PLUGIN_DIR_URL . 'admin_pages/transactions/templates/') );
		}
		parent::__construct( false );
	}



	/**
	 * set_request_data
	 *
	 * @param array $request_data
	 * @return \EE_Payment
	 */
	public function set_request_data( $request_data ) {
		$this->_req_data += $request_data;
	}



	/**
	 * create_payment_from_request_data
	 *
	 * @param array $txn_admin_payment
	 * @return \EE_Payment
	 */
	public function create_payment_from_request_data( array $txn_admin_payment ) {
		return $this->_create_payment_from_request_data($txn_admin_payment);
	}



	/**
	 * _process_transaction_payments
	 *
	 * @param \EE_Transaction $transaction
	 */
	public function process_transaction_payments( EE_Transaction $transaction ) {
		$this->_process_transaction_payments( $transaction );
	}



	/**
	 * _get_REG_IDs_to_apply_payment_to
	 *
	 * returns a list of registration IDs that the payment will apply to
	 *
	 * @param \EE_Payment $payment
	 * @return array
	 */
	public function get_REG_IDs_to_apply_payment_to( EE_Payment $payment ) {
		return $this->_get_REG_IDs_to_apply_payment_to( $payment );
	}



	/**
	 * _get_existing_reg_payment_REG_IDs
	 *
	 * returns a list of registration IDs that the payment is currently related to
	 * as recorded in the database
	 *
	 * @param \EE_Payment $payment
	 * @return array
	 */
	public function get_existing_reg_payment_REG_IDs( EE_Payment $payment ) {
		return $this->_get_existing_reg_payment_REG_IDs( $payment );
	}



	/**
	 * _remove_existing_registration_payments
	 *
	 * this calculates the difference between existing relations
	 * to the supplied payment and the new list registration IDs,
	 * removes any related registrations that no longer apply,
	 * and then updates the registration paid fields
	 *
	 * @param \EE_Payment $payment
	 * @param int         $PAY_ID
	 * @return bool;
	 */
	public function remove_existing_registration_payments( EE_Payment $payment, $PAY_ID = 0 ) {
		return $this->_remove_existing_registration_payments( $payment, $PAY_ID );
	}



	/**
	 * _update_registration_payments
	 *
	 * this applies the payments to the selected registrations
	 * but only if they have not already been paid for
	 *
	 * @param  EE_Transaction $transaction
	 * @param \EE_Payment     $payment
	 * @param array           $REG_IDs
	 * @return void
	 */
	public function update_registration_payments( EE_Transaction $transaction, EE_Payment $payment, $REG_IDs = array() ) {
		$this->_update_registration_payments( $transaction, $payment, $REG_IDs );
	}



	/**
	 * _process_registration_status_change
	 *
	 * This processes requested registration status changes for all the registrations
	 * on a given transaction and (optionally) sends out notifications for the changes.
	 *
	 * @param  EE_Transaction $transaction
	 * @param array           $REG_IDs
	 * @return bool
	 */
	public function process_registration_status_change( EE_Transaction $transaction, $REG_IDs = array() ) {
		return $this->_process_registration_status_change( $transaction, $REG_IDs );
	}



	/**
	 * _build_payment_json_response
	 *
	 * @access public
	 * @param \EE_Payment $payment
	 * @param array       $REG_IDs
	 * @param bool | null $delete_txn_reg_status_change
	 * @return array
	 */
	public function build_payment_json_response( EE_Payment $payment, $REG_IDs = array(), $delete_txn_reg_status_change = null ) {
		return $this->_build_payment_json_response( $payment, $REG_IDs, $delete_txn_reg_status_change );
	}



	/**
	 * _registration_payment_data_array
	 * adds info for 'owing' and 'paid' for each registration to the json response
	 *
	 * @param array $REG_IDs
	 * @return array
	 */
	public function registration_payment_data_array( $REG_IDs ) {
		return $this->_registration_payment_data_array( $REG_IDs );
	}



} //end class Registrations_Admin_Page_Mock
