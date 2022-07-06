<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_PMT_Aim_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * @group payment_methods
 * @group live
 *
 */
class EE_PMT_Aim_Test extends EE_UnitTestCase{
	/**
	 * default settings for AIM for testing
	 * @var array
	 */
	private $_test_settings = array();
	/**
	 *
	 * @var array $billing_info {
	 *	@type $credit_card string
	 *	@type $cvv string
	 *	@type $exp_month string
	 *	@type $exp_year string
	 *	@see parent::do_direct_payment
	 * }
	 */
	private $_test_billing_info = array();
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		parent::__construct($name, $data, $dataName);
		$this->_test_settings = array(
			'login_id' => '534NmsVS',
			'transaction_key' => '9u64QUm4VzZ9x66d',
			'test_transactions' => FALSE,
			'debug_mode' => TRUE
		);
		$this->_test_billing_info = array(
			'first_name' => 'auto',
			'last_name' => 'tester',
			'email' => 'few@ew.few',
			'address' => '2090 Nowhere Rd',
			'address2' => '',
			'city' => 'Whoville',
			'state' => 'Arkansas',
			'country' => 'US',
			'zip' => '84604',
			'credit_card' => '4007000000027',
			'cvv' => '123',
			'exp_month' => '05',
			'exp_year' => '2024',
			'company' => 'Event Espresso',
			'fax' => '1231231231',
			'phone' => '1231231231',
		);
	}
	public function set_up(){
		parent::set_up();
		EE_Payment_Method_Manager::reset();
	}
	public function test_do_direct_payment__success(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Aim' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p_processed = $ppg->do_direct_payment( $p, $this->_test_billing_info );
		$this->assertEquals( $p, $p_processed );
		$this->assertEquals( EEM_Payment::status_id_approved, $p_processed->status(), 'If this fails, verify the accounts transaction key hasntbeen updated. Here is the raw response from aim: ' . var_export( $p_processed->details(), true ) );
		$this->assertEquals( $t->total(), $p_processed->amount() );
	}
	public function test_do_direct_payment__fail(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Aim' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertNotEquals( EEM_Payment::status_id_declined, $p->status() );

		$fail_billing_info = $this->_test_billing_info;
		$fail_billing_info[ 'credit_card' ] = '4222222222222';
		$fail_billing_info[ 'zip' ] = '46282';

		$p_processed = $ppg->do_direct_payment( $p, $fail_billing_info );
		$this->assertEquals( $p, $p_processed );
		$this->assertEquals( EEM_Payment::status_id_declined, $p_processed->status() );
		$this->assertEquals( $t->total(), $p_processed->amount() );
	}
	public function test_do_direct_payment__partial_payment(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Aim' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$paid_so_far = 1.00;
		$t = $this->new_typical_transaction();
		$t->set_paid( $paid_so_far );
		$previous_payment = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $paid_so_far  ) );
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() - $paid_so_far ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p_processed = $ppg->do_direct_payment( $p, $this->_test_billing_info );
		$this->assertEquals( EEM_Payment::status_id_approved, $p_processed->status() );
		$this->assertEquals( $t->total() - $paid_so_far, $p_processed->amount() );
	}
	/**
	 * tests that even if the line items are too complicated for the gateway to handle,
	 * it can at least send the total payable
	 */
	public function test_do_direct_payment__total_mismatch(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Aim' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction();
		$t->set_total( $t->total() / 2 );
		$t->total_line_item()->set_total ( $t->total() );
		$t->save();
		$t->total_line_item()->save();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total()  ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p_processed = $ppg->do_direct_payment( $p, $this->_test_billing_info );
		$this->assertEquals( EEM_Payment::status_id_approved, $p_processed->status() );
		$this->assertEquals( $t->total(), $p_processed->amount() );
	}
}

// End of file EE_PMT_Aim_Test.php