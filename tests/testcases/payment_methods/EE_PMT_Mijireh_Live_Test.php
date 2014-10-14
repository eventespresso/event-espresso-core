<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_PMT_Mijireh_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group live
 *
 */
class EE_PMT_Mijireh_Live_Test extends EE_UnitTestCase{
/**
	 * default settings for AIM for testing
	 * @var array
	 */
	private $_test_settings = array();
	const mijireh_url = 'https://secure.mijireh.com/api/1/orders';
	const return_url = 'http://mysite.com/return';
	const notify_url = 'http://mysite.com/notify';
	const cancel_url = 'http://mysite.com/cancel';
	const mijireh_checkout_url_start = 'https://secure.mijireh.com/checkout/';
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		parent::__construct($name, $data, $dataName);
		$this->_test_settings = array(
			'access_key' => '789a0b32d3d20d20514791a4',
		);
	}
	public function test_set_redirect_info__success(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mijireh' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertEmpty( $p->redirect_url() );


		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$this->assertEquals( 0, strpos( $p->redirect_url(),self::mijireh_checkout_url_start) );
		$rargs =  json_decode( $p->details() );
		$mijireh_items = $rargs->items;
		$first_mijireh_item = array_shift( $mijireh_items );
		$this->assertEquals( $t->primary_registration()->ticket()->name(), $first_mijireh_item->name );
		$this->assertEquals( $t->primary_registration()->ticket()->price(), $first_mijireh_item->price );
		$this->assertEquals( 1, $first_mijireh_item->quantity );
		$this->assertEquals( $t->tax_total(), $rargs->tax );
		$this->assertEquals( self::return_url, $rargs->return_url );

	}
	public function test_set_redirect_info__fail(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mijireh' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( array( 'access_key' => 'bogus_one') );
		$t = $this->new_typical_transaction();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertEmpty( $p->redirect_url() );

		try{
			$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );
			//that should have thrown an error because the access key is bogus
			$this->assertTrue( FALSE );
		}catch( EE_Error $e ){
			$this->assertTrue( TRUE );
			$this->assertEmpty( $p->redirect_url() );
		}
	}
	public function test_set_redirect_info__partial_payment(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mijireh' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$paid_so_far = 1.00;
		$t = $this->new_typical_transaction();
		$t->set_paid( $paid_so_far );
		$previous_payment = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $paid_so_far  ) );
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() - $paid_so_far ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$this->assertEquals( 0, strpos( $p->redirect_url(),self::mijireh_checkout_url_start) );
	}
//	/**
//	 * tests that even if the line items are too complicated for the gateway to handle,
//	 * it can at least send the total payable
//	 */
	public function test_do_direct_payment__total_mismatch(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mijireh' ) );
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
		$this->assertEquals( 0, strpos( $p->redirect_url(),self::mijireh_checkout_url_start) );
	}
}

// End of file EE_PMT_Mijireh_Test.php