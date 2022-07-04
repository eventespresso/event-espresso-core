<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_PMT_Paypal_Pro_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group payment_methods
 * @group live
 */
class EE_PMT_Paypal_Pro_Test extends EE_UnitTestCase{
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

	/**
	 * @param string   $name
	 * @param array  $data
	 * @param string $dataName
	 */
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		parent::__construct($name, $data, $dataName);
		$this->_test_settings = array(
			'username' => 'sell_1359059457_biz_api1.eventespresso.com',
			'password' => '1359059477',
			'signature' => 'At4QgLNCqDfsw218JPKQWyb74X3HAicxDti5ZoS2qp01O8izJtunMnkZ',
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
			'phone' => '123-123-1234',
			'credit_card_type' => 'Visa',
			'credit_card' => '4127143344648082',
			'cvv' => '115',
			'exp_month' => '01',
			'exp_year' => '2018'
		);
	}

	/**
	 * set_up
	 */
	public function set_up(){
		parent::set_up();
		//EEG_Paypal_Pro uses $_SERVER at some point, so we need to pretend this is a regular request
		$this->go_to( 'http://localhost/' );
		//just set a random address
		$_SERVER[ 'REMOTE_ADDR' ] = '192.0.0.1';
		add_filter('FHEE__EEG_Paypal_Pro__CurlRequest__CURLOPT_VERBOSE', '__return_false' );
		//make sure caf payment methods are registered
		EE_Payment_Method_Manager::reset();
	}

	/**
	 * test_do_direct_payment__success
	 */
	public function test_do_direct_payment__success(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Pro' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p_processed = $ppg->do_direct_payment( $p, $this->_test_billing_info );
		$this->assertEquals( $p, $p_processed );
		$this->assertEquals( EEM_Payment::status_id_approved, $p_processed->status(), 'If this test fails, verify the paypal sandbox account HAS ENOUGH FUNDS and that we are still using the correct test credit card. Here is the payments details: ' . var_export( $p_processed->details(), true ) );
		$this->assertEquals( $t->total(), $p_processed->amount() );
	}

	/**
	 * test_do_direct_payment__fail
	 */
	public function test_do_direct_payment__fail(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Pro' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( array(
			'username' => 'seller_with_fail_api1.eventespresso.com',
			'password' => '1405373725',
			'signature' => 'AySrU3tYAnUcGB87EC84g-FvwSiGA7pL1gPqq1ZS-ITCs1Sea8oAG2.e',
			'debug_mode' => TRUE
		) );
		$t = $this->new_typical_transaction( array('ticket_types' => 8 ) );
		///set the payment amount to a specific error code (yes it's a partial payment that will be failing). See
		//https://developer.paypal.com/docs/classic/lifecycle/sb_error-conditions/ for details
		$amount_to_pay = 107.55;
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $amount_to_pay ) );
		$this->assertNotEquals( EEM_Payment::status_id_declined, $p->status() );
		
		$billing_info = $this->_test_billing_info;
		$billing_info['credit_card'] = '6011779094237966';
		$billing_info['credit_card_type'] = 'Discover';
		$billing_info['exp_month'] = '07';
		$billing_info['exp_year'] = '2019';
		$p_processed = $ppg->do_direct_payment( $p, $billing_info );

		$this->assertEquals( $p, $p_processed );
		$this->assertEquals( EEM_Payment::status_id_declined, $p_processed->status(), 'transaction was for ' . $t->total() . ' and payment details were: ' . var_export( $p->details(), true ) );
		$this->assertEquals( $amount_to_pay, $p_processed->amount() );
	}

	/**
	 * test_do_direct_payment__partial_payment
	 */
	public function test_do_direct_payment__partial_payment(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Pro' ) );
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
	 * test_do_direct_payment__total_mismatch
	 *
	 * tests that even if the line items are too complicated for the gateway to handle,
	 * it can at least send the total payable
	 */
	public function test_do_direct_payment__total_mismatch(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Pro' ) );
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

	/**
	 * test_generate_new_billing_form
	 */
	public function test_generate_new_billing_form(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Pro', 'PMD_debug_mode' => TRUE ) );
		$t = $this->new_typical_transaction();
		$ppm->type_obj()->generate_new_billing_form( $t );
	}
}

// End of file EE_PMT_Paypal_Pro_Test.php