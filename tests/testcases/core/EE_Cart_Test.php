<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Cart_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Cart_Test extends EE_UnitTestCase{

	public function setUp(){
		parent::setUp();
		EE_Cart::reset();
	}

	public function test_get_cart_from_txn(){
		$transaction = $this->new_typical_transaction();
		$grand_total_line_item = $transaction->total_line_item();
		$cart = EE_Cart::reset();
		$this->assertNotEquals( $cart->get_grand_total()->ID(), $grand_total_line_item->ID() );
		$cart = EE_Cart::get_cart_from_txn( $transaction );
		$this->assertEquals( $cart->get_grand_total()->ID(), $grand_total_line_item->ID() );
	}

	public function test_get_tickets(){
		$transaction = $this->new_typical_transaction();
		$plain_line_items = EEM_Line_Item::instance()->get_all_of_type_for_transaction( EEM_Line_Item::type_line_item, $transaction );
		$cart = EE_Cart::get_cart_from_txn( $transaction );
		$this->assertNotEmpty( $cart->get_tickets() );
		$this->assertEquals( $plain_line_items, $cart->get_tickets() );
	}

	public function test_all_ticket_quantity_count(){
		$transaction = $this->new_typical_transaction();
		$plain_line_items = EEM_Line_Item::instance()->get_all_of_type_for_transaction( EEM_Line_Item::type_line_item, $transaction );
		$cart = EE_Cart::get_cart_from_txn( $transaction );
		$this->assertEquals( 1, $cart->all_ticket_quantity_count() );
	}
	
	public function test_get_taxes_line_item(){
		$transaction = $this->new_typical_transaction();
		$items_subtotal = EEM_Line_Item::instance()->get_all_of_type_for_transaction( EEM_Line_Item::type_tax_sub_total, $transaction );
		$cart = EE_Cart::get_cart_from_txn( $transaction );
		$this->assertEquals( array_shift( $items_subtotal ), $cart->get_taxes_line_item() );
	}
	public function test_get_grand_total(){
		$transaction = $this->new_typical_transaction();
		$cart = EE_Cart::get_cart_from_txn( $transaction );
		$this->assertEquals( $transaction->total_line_item(), $cart->get_grand_total() );
	}
	public function test_add_ticket_to_cart(){
		//let's make an interesting ticket, with multiple datetimes, multiple prices etc
		$quantity_purchased = 4;
		$ticket = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_price' => '16.5', 'TKT_taxable' => FALSE ) );
		$base_price_type = EEM_Price_Type::instance()->get_one( array( array('PRT_name' => 'Base Price' ) ) );
		$dollar_surcharge_price_type = EEM_Price_Type::instance()->get_one( array( array( 'PRT_name' => 'Dollar Surcharge' ) ) );
		$percent_surcharge_price_type = EEM_Price_Type::instance()->get_one( array( array( 'PRT_name' => 'Percent Surcharge' ) ) );
		$this->assertInstanceOf( 'EE_Price_Type', $base_price_type );
		$this->assertInstanceOf( 'EE_Price_Type', $dollar_surcharge_price_type );
		$this->assertInstanceOf( 'EE_Price_Type', $percent_surcharge_price_type );
		$base_price = $this->new_model_obj_with_dependencies( 'Price', array( 'PRC_amount' => 10, 'PRT_ID' => $base_price_type->ID() ) );
		$dollar_surcharge = $this->new_model_obj_with_dependencies( 'Price', array( 'PRC_amount' => 5, 'PRT_ID' => $dollar_surcharge_price_type->ID() ) );
		$percent_surcharge = $this->new_model_obj_with_dependencies( 'Price', array( 'PRC_amount' => 10, 'PRT_ID' => $percent_surcharge_price_type->ID() ) );
		$ticket->_add_relation_to( $base_price, 'Price' );
		$ticket->_add_relation_to( $dollar_surcharge, 'Price' );
		$ticket->_add_relation_to( $percent_surcharge, 'Price' );
		$this->assertArrayContains( $base_price, $ticket->prices() );
		$this->assertArrayContains( $dollar_surcharge, $ticket->prices() );
		$this->assertArrayContains( $percent_surcharge, $ticket->prices() );
		$event = $this->new_model_obj_with_dependencies( 'Event' );
		$ddt1 = $this->new_model_obj_with_dependencies( 'Datetime', array( 'EVT_ID'=> $event->ID() ) );
		$ddt2 = $this->new_model_obj_with_dependencies( 'Datetime', array( 'EVT_ID'=> $event->ID() ) );
		$ticket->_add_relation_to( $ddt1, 'Datetime' );
		$ticket->_add_relation_to( $ddt2, 'Datetime' );
		$this->assertArrayContains( $ddt1, $ticket->datetimes() );
		$this->assertArrayContains( $ddt2, $ticket->datetimes() );

		EE_Cart::reset()->add_ticket_to_cart( $ticket, $quantity_purchased );

		$this->assertEquals($ticket->price() * $quantity_purchased, EE_Cart::instance()->get_cart_grand_total() );
		$total_line_item = EE_Cart::instance()->get_grand_total();
		$subtotals = $total_line_item->children();
		$this->assertNotEmpty( $subtotals );
		$items_purchased = $total_line_item->get_items();
		$this->assertEquals(1, count( $items_purchased ) );
		$item_purchased = array_shift( $items_purchased );
		$this->assertEquals( $ticket->name(), $item_purchased->name() );
		$this->assertEquals( $item_purchased->total(), $total_line_item->total() );
		$sub_line_items = $item_purchased->children();
		$this->assertEquals( count( $ticket->prices() ), count( $sub_line_items ) );
		//the first one should be the base price
		$base_price_sli = array_shift( $sub_line_items );
		$this->assertEquals( $base_price->amount() * 4, $base_price_sli->total() );
		$dollar_surcharge_sli = array_shift( $sub_line_items );
		$this->assertEquals( $dollar_surcharge->amount() * 4, $dollar_surcharge_sli->total(
				) );
		$percent_surcharge_sli = array_shift( $sub_line_items );
		$this->assertEquals( $percent_surcharge->amount(), $percent_surcharge_sli->percent() );
		$this->assertEquals( ($base_price->amount()  + $dollar_surcharge->amount() )* $percent_surcharge->amount() / 100 * $quantity_purchased, $percent_surcharge_sli->total() );
	}

	public function test_get_cart_total_before_tax(){
		$transaction = $this->new_typical_transaction();
		$cart = EE_Cart::get_cart_from_txn( $transaction );
		$this->assertEquals( 10, $cart->get_cart_total_before_tax() );
	}

	public function test_get_applied_taxes(){
		$transaction = $this->new_typical_transaction();
		$cart = EE_Cart::get_cart_from_txn( $transaction );
		$this->assertEquals( 1.5, $cart->get_applied_taxes() );
	}

	public function test_get_cart_grand_total(){
		$transaction = $this->new_typical_transaction();
		$cart = EE_Cart::get_cart_from_txn( $transaction );
		$this->assertEquals( 11.5, $cart->get_cart_grand_total() );
	}

	public function test_delete_items(){
		//known to fail
		$ticket_types = 4;
		$transaction = $this->new_typical_transaction( array( 'ticket_types' => $ticket_types ) );
		$latest_line_item = EEM_Line_Item::instance()->get_one( array(
			array( 'LIN_type' => EEM_Line_Item::type_line_item ),
			'order_by' => array( 'LIN_ID'=>'DESC' ) ) );
		$cart = EE_Cart::get_cart_from_txn( $transaction );

		$removals = $cart->delete_items( array( $latest_line_item->code() ) );

		$this->assertEquals( 1, $removals );
		$this->assertEquals( $ticket_types - 1, $cart->all_ticket_quantity_count() );
		$cart_items = $cart->get_tickets();
		$this->assertArrayDoesNotContain( $latest_line_item, $cart_items );
	}

	public function test_empty_cart(){
		$transaction = $this->new_typical_transaction();
		$cart = EE_Cart::get_cart_from_txn( $transaction );
		$this->assertEquals( $transaction->total_line_item(), $cart->get_grand_total() );

		$cart->empty_cart();
		$this->assertNotEquals( $transaction->total_line_item(), $cart->get_grand_total() );
	}

	public function test_set_grand_total_line_item(){
		$t1 = $this->new_typical_transaction();
		$t1_line_item = $t1->total_line_item();
		$t2 = $this->new_typical_transaction( array( 'ticket_types' => 2) );
		$cart = EE_Cart::get_cart_from_txn( $t2 );
		$this->assertNotEquals( $t1_line_item, $cart->get_grand_total() );
		EE_Cart::instance()->set_grand_total_line_item( $t1_line_item );
		$this->assertEquals( $t1_line_item, $cart->get_grand_total() );
	}

	public function test_save_cart(){
		$t2 = $this->new_typical_transaction( array( 'ticket_types' => 2) );
		$cart = EE_Cart::get_cart_from_txn( $t2 );
		EE_Registry::instance()->SSN->reset_data( array( 'cart' ) );
		$this->assertNotEquals( EE_Registry::instance()->SSN->get_session_data( 'cart' ), $cart );

		$cart->save_cart();

		$this->assertEquals( EE_Registry::instance()->SSN->get_session_data( 'cart' ), $cart );
	}

}

// End of file EE_Cart_Test.php