<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EEH_Line_Item_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEH_Line_Item_Test extends EE_UnitTestCase{
	static function setUpBeforeClass() {
		EE_Registry::instance()->load_helper('Line_Item');
	}
//	public function test_get_items_subtotal(){
//		$transaction = $this->new_typical_transaction();
//		$items_subtotals = EEM_Line_Item::instance()->get_all_of_type_for_transaction( EEM_Line_Item::type_sub_total, $transaction );
//		$items_subtotal = array_shift( $items_subtotals );
//		$eeh_found_items_subtotal = EEH_Line_Item::get_items_subtotal( $transaction->total_line_item() );
//		$this->assertEquals( $items_subtotal, $eeh_found_items_subtotal );
//	}
//	public function test_create_default_total_line_item(){
//		$line_item = EEH_Line_Item::create_default_total_line_item();
//		$this->assertEquals( EEM_Line_Item::type_total, $line_item->type() );
//		$items = $line_item->get_child_line_item( 'tickets' );
//		$this->assertEquals( EEM_Line_Item::type_sub_total, $items->type() );
//		$taxes_subtotal = $line_item->get_child_line_item( 'taxes' );
//		$this->assertEquals( EEM_Line_Item::type_tax_sub_total, $taxes_subtotal->type() );
//		$taxes = $taxes_subtotal->children();
//		//by default there should be 1 tax at 15%
//		$this->assertEquals( 1, count( $taxes ) );
//		$tax = array_shift( $taxes );
//		$this->assertEquals(EEM_Line_Item::type_tax, $tax->type() );
//		$this->assertEquals( 15, $tax->percent() );
//	}
	public function test_add_ticket_purchase(){
		$line_item = EEH_Line_Item::create_default_total_line_item();
		$this->assertEquals( 0, $line_item->total() );

		$ticket_line_item = EEH_Line_Item::add_ticket_purchase($line_item, $this->new_ticket( array(
			'dollar_surcharge' => 5,
			'percent_surcharge' => 10,
			'datetimes' => 2
		)), 2);

		$this->assertEquals( 33, $ticket_line_item->total() );
		$this->assertEquals( 4.95, EEH_Line_Item::get_taxes_subtotal( $line_item )->total() );
		$this->assertEquals( 33, EEH_Line_Item::get_items_subtotal( $line_item )->total() );
		$this->assertEquals( 37.95, $line_item->total());
		$this->assertNotEquals( 0, $line_item->total() );

	}
}

// End of file EEH_Line_Item_Test.php