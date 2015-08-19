<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class Transactions_Admin_Page_Test
 *
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.8
 *
 */
class Transactions_Admin_Page_Test extends EE_UnitTestCase {


	/**
	 * @var Transactions_Admin_Page_Mock $_admin_page
	 */
	protected $_admin_page;


	/**
	 * @var EE_Transaction $_transaction
	 */
	protected $_transaction;


	/**
	 * @var EE_Payment $_payment
	 */
	protected $_payment;



	public function setUp() {
		parent::setUp();
		$this->delayedAdminPageMocks( 'transactions' );
		$this->_admin_page = new Transactions_Admin_Page_Mock();
	}



	/**
	 * _generate_transaction_and_registrations
	 *
	 * @since 4.8
	 * @param float $txn_total
	 * @param int   $reg_count
	 * @return \EE_Transaction
	 */
	protected function _generate_transaction_and_registrations( $txn_total = 10.00, $reg_count = 0 ) {
		/** @type EE_Transaction $transaction */
		$transaction = $this->new_model_obj_with_dependencies(
			'Transaction',
			array(
				'STS_ID' 		=> EEM_Transaction::incomplete_status_code,
				'TXN_total' 	=> $txn_total
			)
		);
		if ( $reg_count ) {
			$registrations = $this->factory->registration->create_many(
				$reg_count,
				array(
					'STS_ID'          => EEM_Registration::status_id_pending_payment,
					'REG_final_price' => $txn_total / $reg_count
				)
			);
			foreach ( $registrations as $registration ) {
				if ( $registration instanceof EE_Registration ) {
					$transaction->_add_relation_to( $registration, 'Registration' );
					$registration->save();
				}
			}
		}
		$transaction->save();
		return $transaction;
	}



	/**
	 * _get_registrations_from_transaction
	 *
	 * @since 4.8
	 * @param \EE_Transaction $transaction
	 * @param int             $reg_count
	 * @return \EE_Registration[]
	 */
	protected function _get_x_number_of_registrations_from_transaction( EE_Transaction $transaction, $reg_count = 0 ) {
		$registrations = $transaction->registrations();
		return array_slice( $registrations, 0, $reg_count, true );
	}



	/**
	 * _get_payment_method
	 *
	 * @since 4.8
	 * @return EE_Payment_Method
	 */
	protected function _get_payment_method() {
		switch( rand( 1, 3 ) ) {
			case 1 :
				$type = 'Mock_Onsite';
				break;
			case 2 :
				$type = 'Mock_Offsite';
				break;
			case 3 :
			default :
				$type = 'Mock_Offline';
				break;
		}
		return $this->new_model_obj_with_dependencies(
			'Payment_Method',
			array(
				'PMD_type' => $type
			)
		);

	}



	/**
	 * _generate_payment_details_array
	 *
	 * @since 4.8
	 * @param EE_Transaction $transaction
	 * @param float          $amount
	 * @param int            $PAY_ID
	 * @param bool           $refund
	 * @return array
	 */
	protected function _generate_details_array_for_payment_or_refund( EE_Transaction $transaction, $amount = 10.00, $PAY_ID = null, $refund = false ) {
		return array(
			'type' 			=> $refund !== false ? 1 : -1,
			'PAY_ID' 		=> $PAY_ID,
			'TXN_ID'      => $transaction->ID(),
			'PMD_ID'     => $this->_get_payment_method()->ID(),
			'STS_ID' 		=> EEM_Payment::status_id_approved,
			'PAY_source' 		=> EEM_Payment_Method::scope_admin,
			'PAY_details' 		=> array(),
			'PAY_amount' 	=> $amount,
			'PAY_timestamp' 		=> time() - 86400,
			'PAY_po_number' 		=> rand( 100, 1000 ),
			'PAY_extra_accntng' 			=>rand( 100, 1000 ),
			'PAY_txn_id_chq_nmbr' 		=> rand( 100, 1000 ),
			'PAY_gateway_response' 	=> 'You are a true champion!',
		);
	}



	/**
	 * test_create_new_payment_or_refund_from_request_data
	 * used for tests that just need an EE_Payment object
	 *
	 * @since 4.8
	 * @param array $payment_details
	 * @return EE_Payment
	 */
	protected function _generate_payment( $payment_details ) {
		// make sure refunds have a negative amount
		$payment_details['PAY_amount'] = $payment_details[ 'type' ] < 0 ? $payment_details[ 'PAY_amount' ] * -1 : $payment_details[ 'PAY_amount' ];
		// then remove 'type' from the payment details since it's not an EEM_Payment field
		unset( $payment_details[ 'type' ] );
		return EE_Payment::new_instance( $payment_details, '', array( 'Y-m-d', 'H:i a' ) );
	}



	/**
	 * test_create_new_payment_or_refund_from_request_data
	 * used for tests that need payment details passed via $_REQUEST data
	 *
	 * @since 4.8
	 * @param EE_Transaction $transaction
	 * @return array
	 */
	protected function _generate_request_data_for_new_payment_or_refund( EE_Transaction $transaction ) {
		$payment_details = $this->_generate_details_array_for_payment_or_refund( $transaction );
		$request_data[ 'txn_admin_payment' ] = array(
			'type'            => $payment_details[ 'type' ],
			'TXN_ID'          => $payment_details[ 'TXN_ID' ],
			'PAY_ID'          => $payment_details[ 'PAY_ID' ],
			'PMD_ID'          => $payment_details[ 'PMD_ID' ],
			'status'          => $payment_details[ 'STS_ID' ],
			'date'            => $payment_details[ 'PAY_timestamp' ],
			'amount'          => $payment_details[ 'PAY_amount' ],
			'po_number'       => $payment_details[ 'PAY_po_number' ],
			'accounting'      => $payment_details[ 'PAY_extra_accntng' ],
			'txn_id_chq_nmbr' => $payment_details[ 'PAY_txn_id_chq_nmbr' ],
		);
		$this->_admin_page->set_request_data( $request_data );
		return $request_data;
	}



	/**
	 * _setup_standard_transaction_and_payment
	 * uses the above methods to create a transaction with related registrations, and a payment
	 * @since 4.8
	 * @param float $txn_total
	 * @param int   $reg_count
	 */
	protected function _setup_standard_transaction_and_payment( $txn_total = 10.00, $reg_count = 0 ) {
		$this->_transaction = $this->_generate_transaction_and_registrations( $txn_total, $reg_count );
		$this->_payment = $this->_generate_payment(
			$this->_generate_details_array_for_payment_or_refund( $this->_transaction )
		);
	}



	/**
	 * _setup_standard_transaction_and_payment
	 * @since 4.8
	 * @param \EE_Registration[] $registrations
	 */
	protected function _apply_payment_to_registrations( $registrations ) {
		//echo "\n\n " . __METHOD__ . "() \n";
		// reset reg_payment_REG_IDs
		$this->_admin_page->set_existing_reg_payment_REG_IDs();
		foreach ( $registrations as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				$registration->set_paid( $this->_payment->amount() );
				$registration->_add_relation_to( $this->_payment, 'Payment', array( 'RPY_amount' => $this->_payment->amount() ) );
				$registration->save();
			}
		}
		/** @type EE_Payment $payment */
		$payment = EEM_Payment::instance()->get_one_by_ID( $this->_payment->ID() );
		$registration_payments = $payment->registration_payments();
		$this->assertNotEmpty( $registration_payments );
	}



	//public function test_apply_payments_or_refunds() {}


	/**
	 * test_create_new_payment_or_refund_from_request_data
	 * @since 	4.8
	 * @group 	8620
	 */
	public function test_create_new_payment_or_refund_from_request_data() {
		//echo "\n\n " . __METHOD__ . "() \n";
		$transaction = $this->_generate_transaction_and_registrations();
		$request_data = $this->_generate_request_data_for_new_payment_or_refund( $transaction );
		$payment = $this->_admin_page->create_payment_from_request_data( $request_data[ 'txn_admin_payment' ][ 'PAY_ID' ] );
		$this->assertInstanceOf( 'EE_Payment', $payment );
	}



	/**
	 * test_get_REG_IDs_to_apply_payment_to_for_specific_registrations_and_new_payment
	 * @since    4.8
	 * @group    8620
	 */
	public function test_get_REG_IDs_to_apply_payment_to_for_specific_registrations_and_new_payment() {
		//echo "\n\n " . __METHOD__ . "() \n";
		$this->_setup_standard_transaction_and_payment( 40.00, 4 );
		// get 2 out of the four registrations
		$registrations = $this->_get_x_number_of_registrations_from_transaction( $this->_transaction, 2 );
		// pass those REG IDs via the $_REQUEST data
		$this->_admin_page->set_request_data(
			array(
				'txn_admin_payment' => array(
					'registrations' => array_keys( $registrations ),
				)
			)
		);
		$REG_IDs = $this->_admin_page->get_REG_IDs_to_apply_payment_to( $this->_payment );
		foreach ( $registrations as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				$this->assertContains( $registration->ID(), $REG_IDs );
			}
		}
	}



	/**
	 * test_get_REG_IDs_to_apply_payment_to_for_all_registrations_and_new_payment
	 * @since    4.8
	 * @group    8620
	 */
	public function test_get_REG_IDs_to_apply_payment_to_for_all_registrations_and_new_payment() {
		//echo "\n\n " . __METHOD__ . "() \n";
		$this->_setup_standard_transaction_and_payment( 40.00, 4 );
		$REG_IDs = $this->_admin_page->get_REG_IDs_to_apply_payment_to( $this->_payment );
		foreach ( $this->_transaction->registrations() as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				$this->assertContains( $registration->ID(), $REG_IDs );
			}
		}
	}



	/**
	 * test_get_existing_reg_payment_REG_IDs
	 * @since    4.8
	 * @group    8620
	 */
	public function test_get_existing_reg_payment_REG_IDs() {
		//echo "\n\n " . __METHOD__ . "() \n";
		$this->_setup_standard_transaction_and_payment( 40.00, 4 );
		// get 2 out of the four registrations
		$registrations = $this->_get_x_number_of_registrations_from_transaction( $this->_transaction, 2 );
		$this->_apply_payment_to_registrations( $registrations );
		$REG_IDs = $this->_admin_page->get_existing_reg_payment_REG_IDs( $this->_payment );
		foreach ( $registrations as $registration ) {
			if ( $registration instanceof EE_Registration ) {
				$this->assertContains( $registration->ID(), $REG_IDs );
			}
		}
	}



	/**
	 * test_remove_existing_registration_payments
	 * @since    4.8
	 * @group    8620
	 */
	public function test_remove_existing_registration_payments() {
		//echo "\n\n " . __METHOD__ . "() \n";
		$this->_setup_standard_transaction_and_payment( 40.00, 4 );
		$registrations = $this->_get_x_number_of_registrations_from_transaction( $this->_transaction, 2 );
		$this->_apply_payment_to_registrations( $registrations );
		$removed = $this->_admin_page->remove_existing_registration_payments( $this->_payment, $this->_payment->ID() );
		$this->assertTrue( $removed );
		// update payment from db
		/** @type EE_Payment $payment */
		$payment = EEM_Payment::instance()->get_one_by_ID( $this->_payment->ID() );
		$registration_payments = $payment->registration_payments();
		$this->assertNotEmpty( $registration_payments );

	}



}
// End of file Transactions_Admin_Page_Test.php
// Location: /tests/testcases/admin_pages/transactions/Transactions_Admin_Page_Test.php