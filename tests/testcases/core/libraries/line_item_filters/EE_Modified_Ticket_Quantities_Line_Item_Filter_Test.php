<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Modified_Ticket_Quantities_Line_Item_Filter_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Modified_Ticket_Quantities_Line_Item_Filter_Test extends EE_UnitTestCase{
	function setUp(){
		parent::setUp();
		EEH_Autoloader::register_line_item_filter_autoloaders();
	}
	function test_process__1_taxless_ticket() {
		$grand_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_total,
			'LIN_name' => 'Total',
		));
		$pretax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'pretax',
			'LIN_name' => 'pretax',
			'LIN_order' => 1,
		));
		$grand_total->add_child_line_item( $pretax_total );

		$tax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_tax_sub_total,
			'LIN_code' => 'tax-total',
			'LIN_name' => 'tax-total',
			'LIN_order' => 1000
		));
		$grand_total->add_child_line_item( $tax_total );
		$event_subtotal =  EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'event1',
			'LIN_name' => 'event1',
		) );
		$pretax_total->add_child_line_item( $event_subtotal );

		$ticket_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'ticket1',
			'LIN_name' => 'ticket1',
			'OBJ_ID' => 1,
			'OBJ_type' => 'Ticket',
			'LIN_unit_price' => 10,
			'LIN_quantity' => 5
		));
		$event_subtotal->add_child_line_item( $ticket_li );

		//ok now let's use the filter
		$filter = new EE_Modified_Ticket_Quantities_Line_Item_Filter( array( 1 => 2 ) );
		$filtered_total = $filter->process( $grand_total );
		//the filter doesn't recalculate totals, and it edits the inputted tree;
		//hat's ok, the processor does both of those. But we need to manually do it here
		$this->assertEquals( $grand_total, $filtered_total );
		$grand_total->recalculate_total_including_taxes();
		$this->assertEquals( 2, $ticket_li->quantity() );
		$this->assertEquals( 10, $ticket_li->unit_price() );
		$this->assertEquals( 20, $ticket_li->total() );
	}

	function test_process__1_taxless_ticket_and_percent_discount() {
		$grand_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_total,
			'LIN_name' => 'Total',
		));
		$pretax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'pretax',
			'LIN_name' => 'pretax',
			'LIN_order' => 1,
		));
		$grand_total->add_child_line_item( $pretax_total );

		$tax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_tax_sub_total,
			'LIN_code' => 'tax-total',
			'LIN_name' => 'tax-total',
			'LIN_order' => 1000
		));
		$grand_total->add_child_line_item( $tax_total );
		$event_subtotal =  EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'event1',
			'LIN_name' => 'event1',
		) );
		$pretax_total->add_child_line_item( $event_subtotal );

		$ticket_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'ticket1',
			'LIN_name' => 'ticket1',
			'OBJ_ID' => 1,
			'OBJ_type' => 'Ticket',
			'LIN_unit_price' => 10,
			'LIN_quantity' => 10,
			'LIN_total' => 100,
		));
		$event_subtotal->add_child_line_item( $ticket_li );

		$percent_discount_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'discount1',
			'LIN_name' => 'discount1',
			'LIN_unit_price' => 0,
			'LIN_percent' => -25,
			'LIN_total' => -25,
			'LIN_quantity' => 1
		));
		$event_subtotal->add_child_line_item( $percent_discount_li );
		//ok now let's use the filter
		$filter = new EE_Modified_Ticket_Quantities_Line_Item_Filter( array( 1 => 4 ) );
		$filtered_total = $filter->process( $grand_total );
		//the filter doesn't recalculate totals, and it edits the inputted tree;
		//hat's ok, the processor does both of those. But we need to manually do it here
		$this->assertEquals( $grand_total, $filtered_total );
		$grand_total->recalculate_total_including_taxes();
		$this->assertEquals( 4, $ticket_li->quantity() );
		$this->assertEquals( 10, $ticket_li->unit_price() );
		$this->assertEquals( 40, $ticket_li->total() );
		//and verify the percent line item's total has changed, but not its percent
		$this->assertEquals( -25, $percent_discount_li->percent() );
		$this->assertEquals( -10, $percent_discount_li->total() );
	}



}

// End of file EE_Modified_Ticket_Quantities_Line_Item_Filter_Test.php