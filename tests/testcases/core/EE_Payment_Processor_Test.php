<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * EE_Payment_Processor_Test
 *
 * @package     Event Espresso
 * @subpackage  tests
 * @group       payment_methods
 * @author      Mike Nelson
 */
class EE_Payment_Processor_Test extends EE_UnitTestCase {

	public function setUp() {
		parent::setUp();
		$this->_pretend_addon_hook_time();
		EE_Register_Payment_Method::register(
			'onsite',
			array(
				'payment_method_paths' => array(
					EE_TESTS_DIR . 'mocks/payment_methods/Mock_Onsite',
				),
			)
		);
		EE_Register_Payment_Method::register(
			'offsite',
			array(
				'payment_method_paths' => array(
					EE_TESTS_DIR . 'mocks/payment_methods/Mock_Offsite',
				),
			)
		);
		EE_Payment_Method_Manager::instance()->reset();
		//remove all actions that have been added by messages because we aren't testing them here.
		remove_all_actions( 'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful' );
		remove_all_actions( 'AHEE__EE_Payment_Processor__update_txn_based_on_payment__no_payment_made' );
		remove_all_actions( 'AHEE__EE_Payment_Processor__update_txn_based_on_payment__not_successful' );
		remove_all_actions( 'AHEE__EE_Payment_Processor__update_txn_based_on_payment' );
	}



	public function tearDown() {
		EE_Register_Payment_Method::deregister( 'onsite' );
		EE_Register_Payment_Method::deregister( 'offsite' );
		parent::tearDown();
	}



	/**
	 * Creates a transaction with all valid data (ie, it's for an event that has
	 * datetimes and tickets etc)
	 *
	 * @return EE_Transaction
	 * @throws \EE_Error
	 */
	protected function _new_typical_transaction() {
		/** @type EE_Transaction $transaction */
		$transaction = $this->new_model_obj_with_dependencies( 'Transaction', array( 'TXN_total' => 10.00 ) );
		$ticket = $this->get_ticket_mock();
		$user = $this->get_wp_user_mock( 'administrator' );
		$event = $this->get_event_mock( $user );
		$registration = $this->get_registration_mock( $transaction, $ticket, $event, 10.00 );
		$transaction->_add_relation_to( $registration, 'Registration' );
		/** @type EE_Datetime $dtt */
		$dtt = $this->new_model_obj_with_dependencies(
			'Datetime',
			array(
				'EVT_ID'        => $event->ID(),
				'DTT_EVT_start' => current_time( 'timestamp' ) + 60 * 60,
				'DTT_EVT_end'   => current_time( 'timestamp' ) + 5 * 60 * 60,
			)
		);
		$dtt->_add_relation_to( $ticket, 'Ticket' );
		$transaction->set_reg_steps(
			array(
				'attendee_information'  => true,
				'payment_options'       => true,
				'finalize_registration' => current_time( 'timestamp' ),
			)
		);
		return $transaction;
	}



	/**
	 * @param string $role
	 * @return \WP_User
	 */
	public function get_wp_user_mock( $role = 'administrator' ) {
		/** @type WP_User $user */
		$user = $this->factory->user->create_and_get();
		$user->add_role( $role );
		return $user;
	}



	/**
	 * @param float $TKT_price
	 * @return \EE_Ticket
	 * @throws \EE_Error
	 */
	public function get_ticket_mock( $TKT_price = 10.00 ) {
		return $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => $TKT_price ) );
	}



	/**
	 * @param \WP_User $EVT_wp_user
	 * @return \EE_Event
	 * @throws \EE_Error
	 */
	public function get_event_mock( WP_User $EVT_wp_user = null ) {
		return $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_wp_user' => $EVT_wp_user->ID ) );
	}



	/**
	 * @param \EE_Transaction $transaction
	 * @param \EE_Ticket      $ticket
	 * @param \EE_Event       $event
	 * @param float           $REG_final_price
	 * @return \EE_Registration
	 * @throws \EE_Error
	 */
	public function get_registration_mock(
		EE_Transaction $transaction,
		EE_Ticket $ticket,
		EE_Event $event,
		$REG_final_price = 10.00
	) {
		return $this->new_model_obj_with_dependencies(
			'Registration',
			array(
				'TXN_ID'          => $transaction->ID(),
				'TKT_ID'          => $ticket->ID(),
				'EVT_ID'          => $event->ID(),
				'REG_final_price' => $REG_final_price,
				'REG_count'       => EEM_Registration::PRIMARY_REGISTRANT_COUNT,
			)
		);
	}



	/**
	 * Gets the actual payment status in the database (useful for verifying a payment has actually been updated)
	 *
	 * @global WPDB      $wpdb
	 * @param EE_Payment $payment
	 * @return string
	 * @throws \EE_Error
	 */
	protected function _get_payment_status_in_db( EE_Payment $payment ) {
		global $wpdb;
		$esp_payment = $payment->get_model()->table();
		return $wpdb->get_var( $wpdb->prepare( "SELECT STS_ID FROM $esp_payment WHERE PAY_ID = %d", $payment->ID() ) );
	}



	/**
	 * @group 7753
	 * @throws \EE_Error
	 */
	public function test_process_payment__onsite__success() {
		//setup all the $_REQUEST globals etc because messages require them
		$this->go_to( 'http://localhost/' );
		/** @type EE_Payment_Method $pm */
		$pm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mock_Onsite' ) );
		$transaction = $this->_new_typical_transaction();
		$billing_form = $pm->type_obj()->billing_form( $transaction );
		$billing_form->receive_form_submission(
			array(
				'status'      => EEM_Payment::status_id_approved,
				'credit_card' => '4111 1111 1111 1111',
				'exp_month'   => '12',
				'exp_year'    => '2032',
				'cvv'         => '123',
			)
		);
		global $wp_actions;
		$successful_payment_actions = EEH_Array::is_set(
			$wp_actions,
			'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful',
			0
		);
		$payment_actions = EEH_Array::is_set(
			$wp_actions,
			'AHEE__EE_Payment_Processor__update_txn_based_on_payment',
			0
		);
		add_action(
			'AHEE__EE_Payment_Processor__update_txn_based_on_payment',
			array( $this, 'assert_payment_message_trigger_for_success' ),
			10,
			2
		);
		/** @type EE_Payment_Processor $payment_processor */
		$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
		$payment = $payment_processor->process_payment(
			$pm,
			$transaction,
			null,
			$billing_form,
			'success',
			'CART',
			true,
			true
		);
		$this->assertInstanceOf( 'EE_Payment', $payment );
		//verify it's already been saved
		$this->assertNotEquals( 0, $payment->ID() );
		$this->assertEquals( EEM_Payment::status_id_approved, $payment->status() );
		$this->assertEquals( EEM_Payment::status_id_approved, $this->_get_payment_status_in_db( $payment ) );
		$this->assertEquals(
			$successful_payment_actions + 1,
			$wp_actions['AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful']
		);
		$this->assertEquals(
			$payment_actions + 1,
			$wp_actions['AHEE__EE_Payment_Processor__update_txn_based_on_payment']
		);
	}



	/**
	 * Asserts that the payment's status is approved when the hook is called
	 *
	 * @param EE_Payment $transaction
	 * @param EE_Payment $payment
	 */
	public function assert_payment_message_trigger_for_success( $transaction, $payment ) {
		$this->assertEquals( EEM_Payment::status_id_approved, $payment->get( 'STS_ID' ) );
	}



	public function test_update_txn_based_on_payment() {
		//create a txn, and an UNSAVED payment. then call this.
		/** @type EE_Transaction $txn */
		$txn = $this->new_model_obj_with_dependencies(
			'Transaction',
			array(
				'STS_ID'    => EEM_Transaction::incomplete_status_code,
				'TXN_total' => 10.00,
			)
		);
		$ticket = $this->get_ticket_mock();
		$user = $this->get_wp_user_mock( 'administrator' );
		$event = $this->get_event_mock( $user );
		$registration = $this->get_registration_mock( $txn, $ticket, $event, 10.00 );
		$txn->_add_relation_to( $registration, 'Registration' );
		/** @type EE_Payment $payment */
		$payment = $this->new_model_obj_with_dependencies(
			'Payment',
			array(
				'TXN_ID'     => $txn->ID(),
				'STS_ID'     => EEM_Payment::status_id_approved,
				'PAY_amount' => 10.00,
			),
			false
		);
		// simulate payment save performed in EE_PMT_Base::process_payment()
		$payment->save();
		//$this->new_model_obj_with_dependencies( 'Registration', array( 'TXN_ID' => $txn->ID(), 'REG_count' => 1 ) );
		$this->assertEquals( EEM_Payment::status_id_approved, $payment->status() );
		/** @type EE_Payment_Processor $payment_processor */
		$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
		$payment_processor->update_txn_based_on_payment( $txn, $payment );
		//the payment should have been saved, and the txn appropriately updated
		$this->assertEquals( EEM_Payment::status_id_approved, $payment->status() );
		$this->assertEquals( $payment, $txn->last_payment() );
		$this->assertEquals( 10.00, $payment->amount() );
		$this->assertEquals( $txn->ID(), $payment->get( 'TXN_ID' ) );
		/** @type EE_Transaction_Payments $transaction_payments */
		$transaction_payments = EE_Registry::instance()->load_class( 'Transaction_Payments' );
		$this->assertEquals(
			10.00,
			$transaction_payments->recalculate_total_payments_for_transaction(
				$txn,
				EEM_Payment::status_id_approved
			)
		);
		$this->assertEquals( 10.00, $txn->paid() );
		$this->assertEquals( EEM_Transaction::complete_status_code, $txn->status_ID() );
	}



	public function test_update_txn_based_on_payment__offline() {
		//create a txn, and an UNSAVED payment. then call this.
		/** @type EE_Transaction $txn */
		$txn = $this->new_model_obj_with_dependencies(
			'Transaction',
			array(
				'STS_ID'    => EEM_Transaction::incomplete_status_code,
				'TXN_total' => 10,
			)
		);
		/** @type EE_Payment $payment */
		$payment = $this->new_model_obj_with_dependencies(
			'Payment',
			array(
				'TXN_ID'     => $txn->ID(),
				'STS_ID'     => EEM_Payment::status_id_pending,
				'PAY_amount' => 0,
			),
			false
		);
		//because this is from an OFFLINE gateway, the payment shouldn't be saved
		$this->assertEquals( EEM_Payment::status_id_pending, $payment->status() );
		/** @type EE_Payment_Processor $payment_processor */
		$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
		$payment_processor->update_txn_based_on_payment( $txn, $payment );
		//the payment should have NOT been saved, and the txn appropriately updated
		$this->assertEquals( EEM_Payment::status_id_pending, $payment->status() );
		$this->assertEquals( 0, $payment->ID() );
		$this->assertEquals( null, $txn->last_payment() );
		$this->assertEquals( 0, $payment->amount() );
		$this->assertEquals( $txn->ID(), $payment->get( 'TXN_ID' ) );
		/** @type EE_Transaction_Payments $transaction_payments */
		$transaction_payments = EE_Registry::instance()->load_class( 'Transaction_Payments' );
		$this->assertEquals(
			0,
			$transaction_payments->recalculate_total_payments_for_transaction(
				$txn,
				EEM_Payment::status_id_approved
			)
		);
		$this->assertEquals( 0, $txn->paid() );
		$this->assertEquals( EEM_Transaction::incomplete_status_code, $txn->status_ID() );
	}



	public function test_process_payment__onsite__declined() {
		/** @type EE_Payment_Method $pm */
		$pm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mock_Onsite' ) );
		$transaction = $this->_new_typical_transaction();
		$billing_form = $pm->type_obj()->billing_form( $transaction );
		$billing_form->receive_form_submission(
			array(
				'status'      => EEM_Payment::status_id_declined,
				'credit_card' => '4111 1111 1111 1111',
				'exp_month'   => '12',
				'exp_year'    => '2032',
				'cvv'         => '123',
			)
		);
		global $wp_actions;
		$successful_payment_actions = EEH_Array::is_set(
			$wp_actions,
			'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful',
			0
		);
		/** @type EE_Payment_Processor $payment_processor */
		$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
		$payment = $payment_processor->process_payment(
			$pm,
			$transaction,
			null,
			$billing_form,
			'success',
			'CART',
			true,
			true
		);
		$this->assertInstanceOf( 'EE_Payment', $payment );
		//verify it's already been saved
		$this->assertNotEquals( 0, $payment->ID() );
		$this->assertEquals( EEM_Payment::status_id_declined, $payment->status() );
		$this->assertEquals( EEM_Payment::status_id_declined, $this->_get_payment_status_in_db( $payment ) );
		$this->assertEquals(
			$successful_payment_actions,
			EEH_Array::is_set(
				$wp_actions,
				'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful',
				0
			)
		);
	}



	/**
	 * @throws \EE_Error
	 * @throws \Exception
	 */
	public function test_process_payment__offsite__declined_then_approved() {
		global $wp_actions;
		/** @type EE_Payment_Processor $payment_processor */
		$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
		/** @type EE_Payment_Method $pm */
		$pm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mock_Offsite' ) );
		$transaction = $this->_new_typical_transaction();
		$successful_payment_actions = EEH_Array::is_set(
			$wp_actions,
			'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful',
			0
		);
		$payment = $payment_processor->process_payment( $pm, $transaction, null, null, 'success', 'CART', true, true );
		$this->assertInstanceOf( 'EE_Payment', $payment );
		//verify it's already been saved
		$this->assertNotEquals( 0, $payment->ID() );
		//assert that the payment still has its default status
		$this->assertEquals(
			EEM_Payment::instance()->field_settings_for( 'STS_ID' )->get_default_value(),
			$payment->status()
		);
		$this->assertEquals(
			EEM_Payment::instance()->field_settings_for( 'STS_ID' )->get_default_value(),
			$this->_get_payment_status_in_db( $payment )
		);
		//assert that the we haven't notified of successful payment JUST yet...
		$this->assertEquals(
			$successful_payment_actions,
			EEH_Array::is_set(
				$wp_actions,
				'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful',
				0
			)
		);
		//PENDING IPN
		$payment = $payment_processor->process_ipn(
			array( 'status' => EEM_Payment::status_id_pending, 'gateway_txn_id' => $payment->txn_id_chq_nmbr() ),
			$transaction,
			$pm
		);
		$this->assertEquals( EEM_Payment::status_id_pending, $payment->status() );
		$this->assertEquals( EEM_Payment::status_id_pending, $this->_get_payment_status_in_db( $payment ) );
		//and the payment-approved action should have NOT been triggered
		$this->assertEquals(
			$successful_payment_actions,
			EEH_Array::is_set(
				$wp_actions,
				'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful',
				0
			)
		);
		//APPROVED IPN
		$payment = $payment_processor->process_ipn(
			array( 'status' => EEM_Payment::status_id_approved, 'gateway_txn_id' => $payment->txn_id_chq_nmbr() ),
			$transaction,
			$pm
		);
		//payment should be what the gateway set it to be, which was approved
		$this->assertEquals( EEM_Payment::status_id_approved, $payment->status() );
		$this->assertEquals( EEM_Payment::status_id_approved, $this->_get_payment_status_in_db( $payment ) );
		//and the payment-approved action should have been triggered
		$this->assertEquals(
			$successful_payment_actions + 1,
			EEH_Array::is_set(
				$wp_actions,
				'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful',
				0
			)
		);
		//DUPLICATE SUCCESS IPN
		//for this, we need to reset payment model so we fetch a NEW payment object, instead of reusing the old
		//and because the payment method caches a payment method type which caches a gateway which caches the payment model,
		//we also need to reset the payment method
		EEM_Payment::reset();
		$pm = EEM_Payment_Method::reset()->get_one_by_ID( $pm->ID() );
		$payment = $payment_processor->process_ipn(
			array( 'status' => EEM_Payment::status_id_approved, 'gateway_txn_id' => $payment->txn_id_chq_nmbr() ),
			$transaction,
			$pm
		);
		//payment should be what the gateway set it to be, which was failed
		$this->assertEquals( EEM_Payment::status_id_approved, $payment->status() );
		//and the payment-approved action should have NOT been triggered this time because it's a duplicate
		$this->assertEquals(
			$successful_payment_actions + 1,
			EEH_Array::is_set(
				$wp_actions,
				'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful',
				0
			)
		);
	}



	public function test_process_payment__offline() {
		/** @type EE_Payment_Method $pm */
		$pm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Admin_Only' ) );
		$transaction = $this->_new_typical_transaction();
		global $wp_actions;
		$successful_payment_actions = EEH_Array::is_set(
			$wp_actions,
			'AHEE__EE_Payment_Processor__update_txn_based_on_payment__no_payment_made',
			0
		);
		/** @type EE_Payment_Processor $payment_processor */
		$payment_processor = EE_Registry::instance()->load_core( 'Payment_Processor' );
		$payment = $payment_processor->process_payment( $pm, $transaction, null, null, 'success', 'CART', true, true );
		// offline payments are not saved... because no payment ever actually happened
		$this->assertEquals( 0, $payment->ID() );
		$this->assertEquals( EEM_Transaction::incomplete_status_code, $transaction->status_ID() );
		$this->assertEquals(
			$successful_payment_actions + 1,
			$wp_actions['AHEE__EE_Payment_Processor__update_txn_based_on_payment__no_payment_made']
		);
	}



	/**
	 * @group 7201
	 * @throws \EE_Error
	 * @throws \Exception
	 */
	public function test_process_ipn() {
		/** @type EE_Payment_Method $pm */
		$pm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mock_Offsite' ) );
		$this->assertInstanceOf( 'EE_PMT_Mock_Offsite', $pm->type_obj() );
		$this->assertInstanceOf( 'EEG_Mock_Offsite', $pm->type_obj()->get_gateway() );
		$txn = $this->new_typical_transaction();
		//we don't want to bother sending messages. We're not wanting ot test that right now
		remove_all_filters( 'AHEE__EE_Payment_Processor__update_txn_based_on_payment__successful' );
		$payment = EE_Payment_Processor::instance()->process_payment( $pm, $txn );
		$fake_req_data = array(
			'gateway_txn_id' => $payment->txn_id_chq_nmbr(),
			'status'         => EEM_Payment::status_id_approved,
		);
		$this->assertNotEmpty( $payment->ID() );
		$payment = EE_Payment_Processor::instance()->process_ipn( $fake_req_data, $txn, $pm->slug() );
		$this->assertInstanceOf( 'EE_Payment', $payment );
		$this->assertEquals( EEM_Payment::status_id_approved, $payment->STS_ID() );
		$this->assertEquals( EEM_Payment::status_id_approved, $this->_get_payment_status_in_db( $payment ) );
	}



}
// End of file EE_Payment_Processor_Test.php
// Location: tests/testcases/core/EE_Payment_Processor_Test.php
