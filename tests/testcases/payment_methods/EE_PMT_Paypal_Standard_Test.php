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

	public function setUp(){
		EEM_Payment::reset();
		EEM_Transaction::reset();
//		EEM_Payment_Method::reset();
		parent::setUp();
	}
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		parent::__construct($name, $data, $dataName);
		$this->_paypal_id = 'sell_1359059457_biz@eventespresso.com';
	}
	public function test_set_redirection_info__success(){
		//make sure paypal gateway is included
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings(array(
			'paypal_id' => $this->_paypal_id,
			'shipping_details' => 1,//none
			'paypal_shipping'=> FALSE,
			'paypal_taxes'=> FALSE,
		));
		$t = $this->new_typical_transaction();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertEmpty( $p->redirect_url() );


		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );
		$this->assertNotEmpty( $p->redirect_url() );
		$this->assertEquals( self::paypal_url, $p->redirect_url() );
		$this->assertNotEmpty( $p->redirect_args() );
		$rargs = $p->redirect_args();
		$this->assertEquals( $t->primary_registration()->ticket()->name(), $rargs[ 'item_name_1' ] );
		$this->assertEquals( $t->primary_registration()->ticket()->price(), $rargs[ 'amount_1' ] );
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
	public function test_handle_payment_update(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings(array(
			'paypal_id' => $this->_paypal_id
		));
		$t = $this->new_typical_transaction();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$p_in_map = EE_Registry::instance()->load_model('Payment')->get_from_entity_map( $p->ID() );
		$this->assertInstanceOf( 'EE_Payment', $p_in_map );
		//skip IPN validation with paypal
		add_filter( 'FHEE__EEG_Paypal_Standard__validate_ipn__skip', '__return_true' );

		$ppg->handle_payment_update( array (
  'e_reg_url_link' => '1-bfcffeb307c5f5e275643de154fe7192',
  'mc_gross' => $t->total(),
  'protection_eligibility' => 'Eligible',
  'address_status' => 'confirmed',
  'item_number1' => '',
  'item_number2' => '',
  'payer_id' => 'XN873NKAXAAE2',
  'tax' => '0.00',
  'address_street' => '1 Main St',
  'payment_date' => '10:55:09 Jul 03, 2014 PDT',
  'payment_status' => 'Completed',
  'option_selection1_2' => 'http://localhost/wp-develop/src/transactions/?e_reg_url_link=1-bfcffeb307c5f5e275643de154fe7192&ee_payment_method=paypal_standard',
  'charset' => 'windows-1252',
  'address_zip' => '95131',
  'mc_shipping' => '0.00',
  'mc_handling' => '0.00',
  'first_name' => 'Event',
  'mc_fee' => '2.04',
  'address_country_code' => 'US',
  'address_name' => 'Event Espresso',
  'notify_version' => '3.8',
  'custom' => '',
  'payer_status' => 'verified',
  'business' => 'sell_1359059457_biz@eventespresso.com',
  'address_country' => 'United States',
  'num_cart_items' => '2',
  'mc_handling1' => '0.00',
  'mc_handling2' => '0.00',
  'address_city' => 'San Jose',
  'payer_email' => 'buyer_1359059233_per@eventespresso.com',
  'verify_sign' => 'An5ns1Kso7MWUdW4ErQKJJJ4qi4-A7ueXcNiuE.6nTwMSoqIZ1cXOQTF',
  'mc_shipping1' => '0.00',
  'mc_shipping2' => '0.00',
  'tax1' => '0.00',
  'tax2' => '0.00',
  'option_name1_2' => 'NOTIFY URL',
  'txn_id' => '2UT88371J0075792R',
  'payment_type' => 'instant',
  'last_name' => 'Espresso',
  'item_name1' => 'Free Ticket',
  'address_state' => 'CA',
  'receiver_email' => 'sell_1359059457_biz@eventespresso.com',
  'item_name2' => 'DEBUG INFO (this item only added in sandbox mode',
  'payment_fee' => '2.04',
  'quantity1' => '1',
  'quantity2' => '1',
  'receiver_id' => 'M33RRGRH82CUN',
  'txn_type' => 'cart',
  'mc_gross_1' => $t->primary_registration()->ticket()->price(),
  'mc_currency' => 'USD',
  'mc_gross_2' => '0.00',
  'residence_country' => 'US',
  'test_ipn' => '1',
  'transaction_subject' => '',
  'payment_gross' => '60.00',
  'auth' => 'Abp7Rv87UBZqp18HlystBhVYkr5U-wOEufLDnbUuLIli4sta-Jr-4G1kw4uwGLNlopOjLer38dL3Zp-rBnaT3wg',
), $t );
		$this->assertEquals( EEM_Payment::status_id_approved, $p->status() );
		$this->assertEquals( $t->total(), $p->amount() );
	}

	public function test_handle_payment_update__paypal_adds_taxes_and_shipping(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings(array(
			'paypal_id' => $this->_paypal_id,
			'paypal_taxes' => TRUE,
			'paypal_shipping' => TRUE
		));
		$t = $this->new_typical_transaction( array('TKT_price'=>20.00));
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$total_line_item = $t->total_line_item();
		$old_tax_total = $t->tax_total();
		$this->assertNotEmpty( $old_tax_total );
		//skip IPN validation with paypal
		add_filter( 'FHEE__EEG_Paypal_Standard__validate_ipn__skip', '__return_true' );
		$ipn_args = array (
			'e_reg_url_link' => '1-203446311152995f326e9ca81b64c95b',
			'mc_gross' => '30.80',
			'protection_eligibility' => 'Eligible',
			'address_status' => 'confirmed',
			'item_number1' => '',
			'item_number2' => '',
			'payer_id' => 'DQUX5EF8CFFQ2',
			'tax' => '2.80',//IMPORTANT
			'address_street' => '1 Maire-Victorin',
			'payment_date' => '15:21:18 Jul 04, 2014 PDT',
			'payment_status' => 'Completed',
			'option_selection1_2' => 'http://localhost/wp-develop/src/transactions/?e_reg_url_link=1-203446311152995f326e9ca81b64c95b&ee_payment_method=paypal_standard',
			'charset' => 'windows-1252',
			'address_zip' => 'M5A 1E1',
			'mc_shipping' => '8.00',//IMPORTANT
			'mc_handling' => '0.00',//MAYBE IMPORTANT
			'first_name' => 'canadaman',
			'mc_fee' => '1.50',
			'address_country_code' => 'CA',
			'address_name' => 'canadaman eh',
			'notify_version' => '3.8',
			'custom' => '',
			'payer_status' => 'verified',
			'business' => 'sell_tax_and_ship@eventespresso.com',
			'address_country' => 'Canada',
			'num_cart_items' => '2',
			'mc_handling1' => '0.00',
			'mc_handling2' => '0.00',
			'address_city' => 'Toronto',
			'payer_email' => 'canada_buy_eh@eventespresso.com',
			'verify_sign' => 'Asuc-38eoonqdqSbDHczw6533JekAJTc2w.QEYe.bLdd3C9Sk1FmgQur',
			'mc_shipping1' => '0.00',
			'mc_shipping2' => '0.00',
			'tax1' => '0.00',
			'tax2' => '0.00',
			'option_name1_2' => 'NOTIFY URL',
			'txn_id' => '4W884024TK795542J',
			'payment_type' => 'instant',
			'last_name' => 'eh',
			'item_name1' => 'Free Ticket',
			'address_state' => 'Ontario',
			'receiver_email' => 'sell_tax_and_ship@eventespresso.com',
			'item_name2' => 'DEBUG INFO (this item only added in sandbox mode',
			'payment_fee' => '1.50',
			'shipping_discount' => '0.00',
			'quantity1' => '1',
			'insurance_amount' => '0.00',
			'quantity2' => '1',
			'receiver_id' => '8STUBD4V9ZUUN',
			'txn_type' => 'cart',
			'discount' => '0.00',
			'mc_gross_1' => '20.00',
			'mc_currency' => 'USD',
			'mc_gross_2' => '0.00',
			'residence_country' => 'CA',
			'test_ipn' => '1',
			'shipping_method' => 'International Economy',//IMPORTANT
			'transaction_subject' => '',
			'payment_gross' => '30.80',//IMPORTANT
			'auth' => 'A7v0XCv0MTRMLTC3ib4B4zYtTI7Wt-pU5StpnoQBIGsiMj5pXBoOr8z8kiKzYdNkeTmwiWW3xlus4rZhBUOqj6g',
		  );
		$ppg->handle_payment_update( $ipn_args, $t );
		$this->assertNotEquals( $old_tax_total, $t->tax_total(), 'Its not necessarily wrong for the old tax to match the new tax; but if they match we can\'t be very sure the tax total was updated' );
		$this->assertEquals( floatval( $ipn_args[ 'tax' ] ), $t->tax_total() );
		$this->assertEquals( EEM_Payment::status_id_approved, $p->status() );
		$this->assertEquals( $t->total(), $p->amount() );
	}


}

// End of file EE_PMT_Paypal_Standard_Test.php