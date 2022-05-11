<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Non_Zero_Line_Item_Filter_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group                Line_Item_Filter
 */
class EE_Non_Zero_Line_Item_Filter_Test extends EE_UnitTestCase{
	function set_up(){
		parent::set_up();
		EEH_Autoloader::register_line_item_filter_autoloaders();
	}

	function test_filter__remove_zeroed_out_ticket_children() {
		//create a line item
		$subtotal = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'subtotal',
					'LIN_code' => 'subtotal',
					'LIN_type' => EEM_Line_Item::type_sub_total,
				));
		//and four children:
		//a ticket with a quantity of 1
		$tktli1 = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'tktli1',
					'LIN_code' => 'tktli1',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_unit_price' => 10,
					'LIN_quantity' => 1,
					'OBJ_type' => 'Ticket'
				));
		$subtotal->add_child_line_item( $tktli1 );
		//a ticket with a quantity of 0
		$tktli2 = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'tktli2',
					'LIN_code' => 'tktli2',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_unit_price' => 10,
					'LIN_quantity' => 0,
					'OBJ_type' => 'Ticket'
				));
		$subtotal->add_child_line_item( $tktli2 );
		//a non-ticket with a quantity of 1
		$non_tkt_li = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'non_tkt',
					'LIN_code' => 'non_tkt',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_unit_price' => 10,
					'LIN_quantity' => 1,
					'OBJ_type' => null
				));
		$subtotal->add_child_line_item( $non_tkt_li );
		//and a discount which erroneously has a quantity of 0
		$discount = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'discount',
					'LIN_code' => 'discount',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_unit_price' => 0,
					'LIN_percent' => 25,
					'LIN_quantity' => 0,
					'OBJ_type' => null
				));
		$subtotal->add_child_line_item( $discount );
		//when filtered, only the ticket with a quantity of 1 should be removed
		$filter = new EE_Non_Zero_Line_Item_Filter();
		$filter->process( $subtotal );
		$filtered_children = $subtotal->children();
		$this->assertContains( $tktli1, $filtered_children );
		$this->assertNotContains( $tktli2, $filtered_children );
		$this->assertContains( $non_tkt_li, $filtered_children );
		$this->assertContains( $discount, $filtered_children );
	}
	/**
	 */
	function test_filter__removed_subtotals_with_no_ticket_children() {
		//verify that normal subtotals stay, but subtotals with no ticket children get removed
		//so create a total
		$total = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'total',
					'LIN_code' => 'total',
					'LIN_type' => EEM_Line_Item::type_total
				));
		//and a subttoal WITH a ticket (but the subtotal itself was erroneously labelled as quantity 0)
		$subtotal_with_tkt = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'subtotal-with-tkt',
					'LIN_code' => 'subttoal-with-tkt',
					'LIN_type' => EEM_Line_Item::type_sub_total,
					'LIN_quantity' => 0, //we should be setting it to 1 from now on, but earlier code set it to 0
				));
		$total->add_child_line_item( $subtotal_with_tkt );
		$tkt1 = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'tkt1',
					'LIN_code' => 'tkt1',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'OBJ_type' => 'Ticket',
					'LIN_quantity' => 1
				));
		$subtotal_with_tkt->add_child_line_item( $tkt1 );

		//and another subtotal with a ticket but quantity 0, and another non-ticket line item with quantity 1
		$subtotal_without_tkt = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'subtotal-without-tkt',
					'LIN_code' => 'subttoal-without-tkt',
					'LIN_type' => EEM_Line_Item::type_sub_total,
					'LIN_quantity' => 0, //we should be setting it to 1 from now on, but earlier code set it to 0
				));
		$total->add_child_line_item( $subtotal_without_tkt );
		$tkt2 = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'tkt2',
					'LIN_code' => 'tkt2',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'OBJ_type' => 'Ticket',
					'LIN_quantity' => 0,//IMPORTANT!
				));
		$subtotal_without_tkt->add_child_line_item( $tkt2 );
		$non_tkt_li = EE_Line_Item::new_instance(
				array(
					'LIN_name' => 'non_tkt_li',
					'LIN_code' => 'non_tkt_li',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'OBJ_type' => null,
					'LIN_quantity' => 1,
				));
		$subtotal_without_tkt->add_child_line_item( $non_tkt_li );

		//only the subtotal without a ticket should get filtered out
		$filter = new EE_Non_Zero_Line_Item_Filter();
		$filter->process( $total );
		$totals_children = $total->children();
		$this->assertContains( $subtotal_with_tkt, $totals_children );
		$this->assertNotContains( $subtotal_without_tkt, $totals_children );
	}
}

// End of file EE_Non_Zero_Line_Item_Filter_Test.php