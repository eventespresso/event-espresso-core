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

	public function setUp(){
        parent::setUp();
		EEM_Payment::reset();
		EEM_Transaction::reset();
//		EEM_Payment_Method::reset();
	}
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
		$items_purchased = $t->items_purchased();
		$first_item = array_shift( $items_purchased );
		$second_item = array_shift( $items_purchased );
		$this->assertEquals( sprintf( '%s for %s', $first_item->ticket()->name(), $first_item->ticket_event_name() ), $rargs[ 'item_name_1' ] );
		$this->assertEquals( $first_item->ticket()->price(), $rargs[ 'amount_1' ] );
		$this->assertEquals( sprintf( '%s for %s', $second_item->ticket()->name(), $second_item->ticket_event_name() ), $rargs[ 'item_name_2' ] );
		$this->assertEquals( $second_item->ticket()->price(), $rargs[ 'amount_2' ] );
		$this->assertEquals( 1, $rargs[ 'quantity_1' ] );
		$this->assertEquals( $t->tax_total(), $rargs[ 'tax_cart' ] );
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

	/**
	 */
	public function test_set_redirection_info__with_paypal_taxes_and_shipping(){
		//make sure paypal gateway is included
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings(array(
			'paypal_id' => $this->_paypal_id,
			'paypal_taxes' => TRUE,
			'paypal_shipping' => TRUE
		));
		$t = $this->new_typical_transaction(
				array(
					'ticket_types' => 2,
					'taxable_tickets' => 1) );
		$original_txn_total = $t->total();
		//pretend we previous used paypal to make a payment.
		EEH_Line_Item::add_unrelated_item(
				$t->total_line_item(),
				'Shipping',
				8,
				'some shipping',
				1,
				false,
				'paypal_shipping_' . $t->ID() );
		EEH_Line_Item::set_total_tax_to( $t->total_line_item(), 4, 'paypal taxes', 'paypal did thi', 'paypal_tax', false );
		$t->total_line_item()->save_this_and_descendants_to_txn( $t->ID() );
		$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		$registration_processor->update_registration_final_prices( $t );

		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertEmpty( $p->redirect_url() );
		//set redirection info; we should ignore previously-added paypal tax and shipping
		//(so paypal can add calculate them again when we send them)
		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );
		$this->assertNotEmpty( $p->redirect_url() );
		$this->assertEquals( self::paypal_url, $p->redirect_url() );
		$this->assertNotEmpty( $p->redirect_args() );
		$rargs = $p->redirect_args();
		$items_purchased = $t->items_purchased();
		$first_item = array_shift( $items_purchased );
		$second_item = array_shift( $items_purchased );
		$this->assertEquals( sprintf( '%s for %s', $first_item->ticket()->name(), $first_item->ticket_event_name() ), $rargs[ 'item_name_1' ] );
		$this->assertEquals( $first_item->ticket()->price(), $rargs[ 'amount_1' ] );
		$this->assertEquals( sprintf( '%s for %s', $second_item->ticket()->name(), $second_item->ticket_event_name() ), $rargs[ 'item_name_2' ] );
		$this->assertEquals( $second_item->ticket()->price(), $rargs[ 'amount_2' ] );
		$this->assertEquals( 1, $rargs[ 'quantity_1' ] );
		//we shouldn't have told paypal how much tax to add. Let paypal decide.
		$this->assertFalse( isset( $rargs[ 'tax_cart' ] ) );
		//there should be no 3rd item for shipping
		$this->assertFalse( isset( $rargs[ 'amount_3' ] ) );
	}
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


	public function test_handle_payment_update__refund(){
		/** @type EE_Payment_Method $ppm */
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		/** @type EEG_Paypal_Standard $ppg */
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings(array(
			'paypal_id' => $this->_paypal_id
		));
		$t = $this->new_typical_transaction();
		/** @type EE_Payment $p */
		// PLZ NOTE: refunds have a negative value for their amount
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => ( $t->total() * -1 ) ) );
		$p_in_map = EE_Registry::instance()->load_model('Payment')->get_from_entity_map( $p->ID() );
		$this->assertInstanceOf( 'EE_Payment', $p_in_map );
		//skip IPN validation with paypal
		add_filter( 'FHEE__EEG_Paypal_Standard__validate_ipn__skip', '__return_true' );
		add_filter( 'FHEE__EEG_Paypal_Standard__handle_payment_update__kill_refund_request', '__return_false' );
		$ppg->handle_payment_update(
			array (
				'e_reg_url_link' => '1-bfcffeb307c5f5e275643de154fe7192',
				'mc_gross' => ( $t->total() * -1 ),
				'protection_eligibility' => 'Eligible',
				'address_status' => 'confirmed',
				'item_number1' => '',
				'item_number2' => '',
				'payer_id' => 'XN873NKAXAAE2',
				'tax' => '0.00',
				'address_street' => '1 Main St',
				'payment_date' => '10:55:09 Jul 03, 2014 PDT',
				'payment_status' => 'Refunded',
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
				),
			$t
		);
		$this->assertEquals( EEM_Payment::status_id_approved, $p->status() );
		$this->assertEquals( ( $t->total() * -1 ), $p->amount() );
	}

	/**
	 * @group 4710
	 */
	public function test_handle_payment_update__paypal_adds_taxes_and_shipping(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings(array(
			'paypal_id' => $this->_paypal_id,
			'paypal_taxes' => TRUE,
			'paypal_shipping' => TRUE
		));
		$t = $this->new_typical_transaction();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$p->update_extra_meta( EEG_Paypal_Standard::itemized_payment_option_name, true );
		$old_pretax_total = EEH_Line_Item::get_pre_tax_subtotal( $t->total_line_item() )->total();
		$old_taxable_total = $t->total_line_item()->taxable_total();
		$this->assertNotEmpty( $old_taxable_total );
		$old_tax_total = $t->tax_total();
		$this->assertNotEmpty( $old_tax_total );
		//skip IPN validation with paypal
		add_filter( 'FHEE__EEG_Paypal_Standard__validate_ipn__skip', '__return_true' );

		//pretend we sent an itemized report to paypal, and thus told them to calculate taxes on it.
		$p->update_extra_meta( 'itemized_payment', true );
		$tax_in_ipn = 2.80;
		//if the old tax matches what's going to be in the IPN data, we can't verify the IPN data
		//updated the tax can we?
		$this->assertNotEquals( $tax_in_ipn, $old_tax_total );
		$ipn_args = array (
			'e_reg_url_link' => '1-203446311152995f326e9ca81b64c95b',
			'mc_gross' => $old_pretax_total + 8 + 2.8,//pretax total plus shipping and tax
			'protection_eligibility' => 'Eligible',
			'address_status' => 'confirmed',
			'item_number1' => '',
			'item_number2' => '',
			'payer_id' => 'DQUX5EF8CFFQ2',
			'tax' => "$tax_in_ipn",//IMPORTANT
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
		$ppg->update_txn_based_on_payment( $p );
		//check the new tax is correct
		$this->assertNotEquals( $old_tax_total, $t->tax_total(), 'Its not necessarily wrong for the old tax to match the new tax; but if they match we can\'t be very sure the tax total was updated' );
		$this->assertEquals( floatval( $ipn_args[ 'tax' ] ), $t->tax_total() );
		$tax_line_items = EEH_Line_Item::get_taxes_subtotal( $t->total_line_item() )->children();
		$this->assertEquals( 1, count( $tax_line_items ) );
		$only_tax = array_shift( $tax_line_items );
		$this->assertEquals( __( 'Taxes', 'event_espresso' ), $only_tax->name() );
		$this->assertEquals( EEM_Payment::status_id_approved, $p->status() );
		$this->assertEquals( $t->total(), $p->amount() );
		//check that the shipping surcharge is correct
		$items_subtotal = EEH_Line_Item::get_pre_tax_subtotal( $t->total_line_item() );
		$items = $items_subtotal->children();
		$first_item = array_shift( $items );
		$this->assertEquals( 10, $first_item->total() );
		$second_item = array_shift( $items);
		$this->assertEquals( 8, $second_item->total() );
		//EEH_Line_Item::visualize($t->total_line_item());
		$this->assertEquals( $old_pretax_total + 8, $items_subtotal->total() );
		//check that the transaction's total got updated to match the total line item's
		$this->assertEquals( $t->total_line_item()->total(), $t->total() );
		//check that if we re-calculate all the prices everything is still the same
		$updated_line_item_total = $t->total_line_item()->total();
		$t->total_line_item()->recalculate_total_including_taxes();
		$this->assertEquals( $updated_line_item_total, $t->total_line_item()->total() );
	}

	/**
	 * @group 4710
	 */
	public function test_update_txn_based_on_payment__paypal_adds_taxes_and_shipping__twice(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings(array(
			'paypal_id' => $this->_paypal_id,
			'paypal_taxes' => TRUE,
			'paypal_shipping' => TRUE
		));
		$t = $this->new_typical_transaction();
                $old_taxable_total = $t->total_line_item()->taxable_total();
		$this->assertNotEmpty( $old_taxable_total );
		$old_tax_total = $t->tax_total();
		$this->assertNotEmpty( $old_tax_total );

                $tax_in_1st_ipn = 1.80;
                $ship_in_1st_ipn = 3.00;
		$p = $this->new_model_obj_with_dependencies( 'Payment',
                        array(
                            'TXN_ID'=>$t->ID(),
                            'STS_ID' => EEM_Payment::status_id_approved,
                            'PMD_ID' => $ppm->ID(),
                            'PAY_amount' => $t->total() / 2,
                            'PAY_details' => array (
                                'tax' => "$tax_in_1st_ipn",//IMPORTANT
                                'mc_shipping' => "$ship_in_1st_ipn",//IMPORTANT
                            ),
                        ) );
		$p->update_extra_meta( EEG_Paypal_Standard::itemized_payment_option_name, false );
		//taxes shouldn't have been changed, despite whatever paypal says, because
		//we didnt send them an itemized total so they cant have calculated taxes right anyways
		$this->assertNotEquals( $tax_in_1st_ipn, $old_tax_total, 'Its not necessarily wrong for the old tax to match the new tax; but if they match we can\'t be very sure the tax total wasnt updated' );


		$ppg->update_txn_based_on_payment( $p );
		//check the new tax wasnt changed
		$this->assertEquals( $old_tax_total, $t->tax_total() );
		$this->assertNotEquals( $tax_in_1st_ipn, $t->tax_total() );//taxes shouldnt have changed
		$pre_tax_total = EEH_Line_Item::get_pre_tax_subtotal( $t->total_line_item() );
		$shipping1_line_item = $pre_tax_total->get_child_line_item( 'paypal_shipping_' . $t->ID() );
		$this->assertNull( $shipping1_line_item );

		//ok now let's pretend they made another payment via paypal and added more onto the taxes.
		//but we only update taxes when paypal received an itemized payment from us, which it didn't
		$tax_in_2nd_ipn = 1.5;
		$ship_in_2nd_ipn = 8.00;
		$p2 = $this->new_model_obj_with_dependencies( 'Payment',
				array(
					'TXN_ID'=>$t->ID(),
					'STS_ID' => EEM_Payment::status_id_approved,
					'PMD_ID' => $ppm->ID(),
					'PAY_amount' => $t->remaining(),
					'PAY_details' => array(
						'tax' => "$tax_in_2nd_ipn",
						'mc_shipping' => "$ship_in_2nd_ipn")) );
		$p2->update_extra_meta( EEG_Paypal_Standard::itemized_payment_option_name, false );
		$ppg->update_txn_based_on_payment( $p2 );
		//assert that the total tax is now the SUM of both IPN's tax amounts
		$this->assertEquals( $tax_in_2nd_ipn, $t->tax_total() );
		//verify the old shipping is still there
		$shipping1_line_item = $pre_tax_total->get_child_line_item( 'paypal_shipping_' . $t->ID() );
		$this->assertNull( $shipping1_line_item );
	}


	/**
	 * verifies that previous payments get added onto the discount
	 * @group 4710
	 */
	public function test_set_redirect_info__partial_payment_for_remainder(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$paid_so_far = 1.00;
		$t = $this->new_typical_transaction( array( 'ticket_types' => 2));
		$t->set_paid( $paid_so_far );
		$previous_payment = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $paid_so_far, 'STS_ID' => EEM_Payment::status_id_approved  ) );
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() - $paid_so_far ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$rargs = $p->redirect_args();
		//also check we DID try to enumerat ethe line items
		$this->assertFalse(  isset( $rargs[ 'discount_amount_cart' ] ) );
		$this->assertTrue( isset( $rargs[ 'item_name_1' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_1' ] ) );
		$this->assertFalse( isset( $rargs[ 'item_name_2' ] ) );
		$this->assertFalse( isset( $rargs[ 'amount_2' ] ) );
		$this->assertFalse( isset( $rargs[ 'quantity_2' ] ) );
	}

	/**
	 * This is a legitimate partial payment (different from a total mismatch in that the itemized total
	 * equals the transaction total as expected, but the payment is for less than the transaction
	 * and there are no previous payments
	 * @group 4710
	 */
	public function test_set_redirect_info__partial_payment_initial(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction( array( 'ticket_types' => 2));
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => 10 ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$rargs = $p->redirect_args();
		//also check we DID NOT try to enumerat ethe line items
		$this->assertTrue( isset( $rargs[ 'item_name_1' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_1' ] ) );
		$this->assertFalse( isset( $rargs[ 'item_name_2' ] ) );
		$this->assertFalse( isset( $rargs[ 'amount_2' ] ) );
		$this->assertFalse( isset( $rargs[ 'quantity_2' ] ) );
	}
	/**
	 * Verifies that we don't re-add shipping if it's already been added
	 * @group 4710
	 */
	public function test_set_redirect_info__with_promotion() {
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction( array( 'ticket_types' => 2));
		$event = EEM_Event::instance()->get_one( array( array( 'Registration.TXN_ID' => $t->ID() ) ) );
		$event_li = EEH_Line_Item::get_event_line_item( $t->total_line_item(), $event );
		$discount_li = $this->new_model_obj_with_dependencies(
				'Line_Item',
				array(
					'LIN_parent' => $event_li->ID(),
					'LIN_name' => 'discount',
					'LIN_code' => 'discount',
					'LIN_unit_price' => -10,
					'LIN_quantity' => 1,
					'LIN_percent' => 0,
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_is_taxable' => false,
					'TXN_ID' => $t->ID()
				));
		$t->total_line_item()->recalculate_total_including_taxes();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$rargs = $p->redirect_args();
		//also check we DID enumerat ethe line items
		$this->assertEquals( (float) 10, (float) $rargs[ 'discount_amount_cart' ] );
		$this->assertTrue( isset( $rargs[ 'item_name_1' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_1' ] ) );
                //although we shouldn't be mentioning how much taxes are per item. leave that to paypal
                $this->assertFalse( isset( $rargs[ 'tax_1' ] ) );
		$this->assertTrue( isset( $rargs[ 'item_name_2' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_2' ] ) );
		$this->assertTrue( isset( $rargs[ 'quantity_2' ] ) );
                $this->assertFalse( isset( $rargs[ 'tax_2' ] ) );
	}

	/**
	 * tests that even if the line items are too complicated for the gateway to handle,
	 * it can at least send the total payable
	 * @group 4710
	 */
	public function test_set_redirect_info__total_mismatch__itemized_higher(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction( array( 'ticket_types' => 2) );
		$t->set_total( $t->total() - 10 );
		$t->total_line_item()->set_total ( $t->total() );
		$t->save();
		$t->total_line_item()->save();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total()  ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$rargs = $p->redirect_args();
		//also check we DID manage to enumerat ethe line items, just with a discount
		//the amount missing is equal to
		$this->assertEquals( 10, intval( $rargs[ 'discount_amount_cart' ] ) );
		$this->assertTrue( isset( $rargs[ 'item_name_1' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_1' ] ) );
		$this->assertTrue( isset( $rargs[ 'item_name_2' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_2' ] ) );
		$this->assertTrue( isset( $rargs[ 'quantity_2' ] ) );
	}

	/**
	 * tests that even if the line items are too complicated for the gateway to handle,
	 * it can at least send the total payable
	 * @group 4710
	 */
	public function test_set_redirect_info__total_mismatch__itemized_lower(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Paypal_Standard' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction( array( 'ticket_types' => 2) );
		$t->set_total( $t->total() + 5 );
		$t->total_line_item()->set_total ( $t->total() );
		$t->save();
		$t->total_line_item()->save();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total()  ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$rargs = $p->redirect_args();
		//also check we DID manage to enumerat ethe line items, just with an extra item for the surplus
		$this->assertTrue( isset( $rargs[ 'item_name_1' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_1' ] ) );
		$this->assertTrue( isset( $rargs[ 'item_name_2' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_2' ] ) );
		$this->assertTrue( isset( $rargs[ 'quantity_2' ] ) );
		//check that we've also added another item to make up for the difference
		$this->assertTrue( isset( $rargs[ 'item_name_3' ] ) );
		$this->assertTrue( isset( $rargs[ 'amount_3' ] ) );
		$this->assertTrue( isset( $rargs[ 'quantity_3' ] ) );
		$this->assertEquals( 5, $rargs[ 'amount_3' ] );
	}
}

// End of file EE_PMT_Paypal_Standard_Test.php
// Location: /tests/testcases/payment_methods/EE_PMT_Paypal_Standard_Test.php
