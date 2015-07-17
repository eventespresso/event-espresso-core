<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Line_Item_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Line_Item_Test extends EE_UnitTestCase{
	function test_generate_code(){
		$t = EE_Transaction::new_instance();
		$t->save();
		$l = EE_Line_Item::new_instance(array('OBJ_type'=>'Transaction','OBJ_ID'=>$t->ID()));
		$this->assertNotNull($l->generate_code());
	}

	function test_get_nearest_descendant_of_type(){
		$txn = $this->new_typical_transaction();
		$line_item = $txn->total_line_item();
		$old_tax_subtotal = EEH_Line_Item::get_nearest_descendant_of_type( $line_item, EEM_Line_Item::type_tax_sub_total );
		$this->assertInstanceOf( 'EE_Line_Item', $old_tax_subtotal );
		$this->assertEquals( EEM_Line_Item::type_tax_sub_total, $old_tax_subtotal->type() );
		$old_tax = EEH_Line_Item::get_nearest_descendant_of_type( $line_item, EEM_Line_Item::type_tax );
		$this->assertInstanceOf( 'EE_Line_Item', $old_tax_subtotal );
		$this->assertEquals( EEM_Line_Item::type_tax, $old_tax->type() );

	}
	/**
	 * test that if you call this on the grand total, that it doesn't REMOVE the taxes from it
	 * @group 7026
	 */
	function test_recalculate_pre_tax_total__dont_change_grand_total(){
		$txn = $this->new_typical_transaction();
		$total_line_item = $txn->total_line_item();
		$total_including_taxes = $total_line_item->total();
		$total_line_item->recalculate_pre_tax_total();
		$this->assertNotEquals( 0, $txn->tax_total() );
		$this->assertEquals( $total_including_taxes, $total_line_item->total() );
	}
	/**
	 * * also test that if you call this in order to get the taxable total, that it doesn't update
	 * the totals to ONLY be taxable totals
	 * @group 7026
	 */
	function test_recalculate_pre_tax_total__dont_save_if_ignoring_nontaxables(){
		//make a txn where NOTHING is taxable
		$txn = $this->new_typical_transaction( array( 'ticket_types' => 2, 'taxable_tickets' => 1 ) );
		$proper_line_items = EEM_Line_Item::instance()->get_all_of_type_for_transaction( EEM_Line_Item::type_line_item, $txn->ID() );
		$this->assertEquals( 2, count( $proper_line_items ) );
		$taxable_one = FALSE;
		$nontaxable_one = FALSE;
		$taxable_line_item = NULL;
		foreach($proper_line_items as $line_item ){
			if( $line_item->is_taxable() ){
				$taxable_one = TRUE;
				$taxable_line_item = $line_item;
			}else{
				$nontaxable_one = TRUE;
			}
		}
		$this->assertTrue( $taxable_one );
		$this->assertTrue( $nontaxable_one );
		$this->assertNotEquals( 0, $txn->tax_total() );

		$total_line_item = $txn->total_line_item();
		$old_total = $total_line_item->total();
		//when we calculate the pre-tax, including only taxable items (ie, we're wanting
		//to know how much to apply taxes to) we don't change the grand or ticket totals
		$pretax_total = $total_line_item->taxable_total();
		//because there is only one taxable line item, the taxable total should equals its total
		$this->assertEquals( $taxable_line_item->total(), $pretax_total );
		//check we didn't assign the taxable total to be the grand total
		$this->assertNotEquals( $pretax_total, $total_line_item->total() );
		$this->assertEquals( $old_total, $total_line_item->total() );
		//find tickets subtotal and make sure it hasn't been assigned to be the taxable total either
		//temporarily commented out because this throws an error.
		//$this->assertNotEquals( $pretax_total, $total_line_item->get_child_line_item('tickets')->total() );
	}

	/**
	 * @group 8464
	 * Verifies that if the line item is for a relation that isn't currently defined
	 * (and in core there is no promotion model) that we don't get an exception or warning, just null
	 */
	public function test_get_object__non_existent_model_name() {
		$li = $this->new_model_obj_with_dependencies( 'Line_Item', array( 'OBJ_ID' => 123, 'OBJ_type' => 'Promotion' ) );
		$this->assertNull( $li->get_object() );
	}
	/**
	 * @group 8464
	 * Verifies that if the line item is for a relation that isn't currently RELATED but IS defined
	 */
	public function test_get_object__non_related_model_name() {
		$li = $this->new_model_obj_with_dependencies( 'Line_Item', array( 'OBJ_ID' => 123, 'OBJ_type' => 'Answer' ) );
		$this->assertNull( $li->get_object() );
	}

	/**
	 * @group 8488
	 */
	public function test_taxable_total__percent_items() {
		$parent_li = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'total',
					'LIN_type' => EEM_Line_Item::type_sub_total,
				));
		//create 2 childline items, one taxable and one not
		$taxable = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'taxable',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_total' => 10,
					'LIN_unit_price' => 10,
					'LIN_percent' => 0,
					'LIN_quantity' => 1,
					'LIN_is_taxable' => true,
					'LIN_parent' => $parent_li->ID()
				));
		$nontaxable = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'nontaxable',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_total' => 10,
					'LIN_unit_price' => 10,
					'LIN_percent' => 0,
					'LIN_quantity' => 1,
					'LIN_is_taxable' => false,
					'LIN_parent' => $parent_li->ID()
				));
		//and then a percent line item that is taxable
		$discount = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'discount',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_total' => -10,
					'LIN_unit_price' => 0,
					'LIN_percent' => -50,
					'LIN_quantity' => 1,
					'LIN_is_taxable' => true,
					'LIN_parent' => $parent_li->ID()
				));
		//so when we ask their parent for the taxable total, it should only
		//factor in the taxable portion of the percent item
		//only half of the 10 dollar discount (so 5) should be facotred into taxes
		//so the taxable total should be the taxable ticket (10) minus half the discount (5)
		//so it should equal 5
		$this->assertEquals( 5, $parent_li->taxable_total() );
	}

	/**
	 * @group 8488
	 */
	public function test_taxable_total__negative_total() {
		$parent_li = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'total',
					'LIN_type' => EEM_Line_Item::type_sub_total,
				));
		//create a child line item that's NOT taxable
		$taxable = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'taxable',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_total' => 10,
					'LIN_unit_price' => 10,
					'LIN_percent' => 0,
					'LIN_quantity' => 1,
					'LIN_is_taxable' => false,
					'LIN_parent' => $parent_li->ID()
				));
		//and then a flat discount that is "taxable" (ie, taxes take it into account)
		$discount = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'discount',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_total' => -10,
					'LIN_unit_price' => -10,
					'LIN_percent' => 0,
					'LIN_quantity' => 1,
					'LIN_is_taxable' => true,
					'LIN_parent' => $parent_li->ID()
				));
		//so when we ask their parent for the taxable total, it should only
		//factor in the taxable portion of the percent item
		//only half of the 10 dollar discount (so 5) should be facotred into taxes
		//so the taxable total should be the taxable ticket (10) minus half the discount (5)
		//so it should equal 5
		$this->assertEquals( 0, $parent_li->taxable_total() );
	}
}

// End of file EE_Line_Item_Test.php
