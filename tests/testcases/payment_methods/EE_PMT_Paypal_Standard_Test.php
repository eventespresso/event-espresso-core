<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_PMT_Paypal_Standard_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group payment_methods
 */
class EE_PMT_Paypal_Standard_Test extends EE_UnitTestCase{
	private $_test_settings = array();
	/**
	 * The normal 'good' paypal ID to use
	 * @type string
	 */
	private $_paypal_id;
	const paypal_url = 'https://www.paypal.com/cgi-bin/webscr';
	const paypal_sandbox_url = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
	const return_url = 'http://mysite.com/return';
	const notify_url = 'http://mysite.com/notify';
	const cancel_url = 'http://mysite.com/cancel';
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		parent::__construct($name, $data, $dataName);
		$this->_paypal_id = 'sell_1359059457_biz@eventespresso.com';
		$this->_test_settings = array(
			'paypal_id' => $this->_paypal_id,
			'shipping_details' => 1,//none
			'paypal_shipping'=> FALSE,
			'paypal_taxes'=> FALSE,
		);
	}
	public function test_set_redirection_info__success(){
		//make sure paypal gateway is included
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction( array( 'ticket_types' => 2) );
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertEmpty( $p->redirect_url() );


		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );
		$this->assertNotEmpty( $p->redirect_url() );
		$this->assertEquals( self::paypal_url, $p->redirect_url() );
		$this->assertNotEmpty( $p->redirect_args() );
		$rargs = $p->redirect_args();
		$registrations = $t->registrations();
		$first_reg = array_shift( $registrations );
		$second_reg = array_shift( $registrations );
		$this->assertEquals( $first_reg->ticket()->name(), $rargs[ 'item_name_1' ] );
		$this->assertEquals( $first_reg->ticket()->price(), $rargs[ 'amount_1' ] );
		$this->assertEquals( $second_reg->ticket()->name(), $rargs[ 'item_name_2' ] );
		$this->assertEquals( $second_reg->ticket()->price(), $rargs[ 'amount_2' ] );
		$this->assertEquals( 1, $rargs[ 'quantity_1' ] );
		$this->assertEquals( $t->tax_total(), $rargs[ 'tax' ] );
		$this->assertEquals( $this->_paypal_id, $rargs[ 'business' ] );
		$this->assertEquals( self::return_url, $rargs[ 'return' ] );
		$this->assertEquals( self::cancel_url, $rargs[ 'cancel_return' ] );
		$this->assertEquals( self::notify_url, $rargs[ 'notify_url' ] );
		$this->assertEquals( '_cart', $rargs[ 'cmd' ] );
		$this->assertEquals( 1, $rargs[ 'upload' ] );
		$this->assertEquals( 'USD', $rargs[ 'currency_code' ] );
		$this->assertEquals( 2, $rargs[ 'rm' ] );//makes the user return with method=POST
		$this->assertEquals( 1, $rargs[ 'no_shipping'] );
	}
	//@todo test partial payments
	//@todo test using paypal taxes
	//@todo test multiple registrants
	//@todo test receive ipn
	//@todo test ipn with different tax and shipping

	public function test_set_redirect_info__partial_payment(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$paid_so_far = 1.00;
		$t = $this->new_typical_transaction( array( 'ticket_types' => 2));
		$t->set_paid( $paid_so_far );
		$previous_payment = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $paid_so_far  ) );
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() - $paid_so_far ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$rargs = $p->redirect_args();
		//also check we didn't try to enumerat ethe line items
		$this->assertTrue( isset( $rargs[ 'item_name_1' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_1' ] ) );
		$this->assertFalse( isset( $rargs[ 'item_name_2' ] ) );
		$this->assertFalse( isset( $rargs[ 'amount_2' ] ) );
		$this->assertFalse( isset( $rargs[ 'quantity_2' ] ) );
	}
	/**
	 * tests that even if the line items are too complicated for the gateway to handle,
	 * it can at least send the total payable
	 */
	public function test_do_direct_payment__total_mismatch(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction();
		$t->set_total( $t->total() / 2 );
		$t->total_line_item()->set_total ( $t->total() );
		$t->save();
		$t->total_line_item()->save();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total()  ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$rargs = $p->redirect_args();
		//also check we didn't try to enumerat ethe line items
		$this->assertTrue( isset( $rargs[ 'item_name_1' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_1' ] ) );
		$this->assertFalse( isset( $rargs[ 'item_name_2' ] ) );
		$this->assertFalse( isset( $rargs[ 'amount_2' ] ) );
		$this->assertFalse( isset( $rargs[ 'quantity_2' ] ) );
	}
}

// End of file EE_PMT_Paypal_Standard_Test.php