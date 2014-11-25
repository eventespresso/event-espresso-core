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
		$old_tax_subtotal = $line_item->get_nearest_descendant_of_type( EEM_Line_Item::type_tax_sub_total );
		$this->assertInstanceOf( 'EE_Line_Item', $old_tax_subtotal );
		$this->assertEquals( EEM_Line_Item::type_tax_sub_total, $old_tax_subtotal->type() );
		$old_tax = $old_tax_subtotal->get_nearest_descendant_of_type( EEM_Line_Item::type_tax );
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
		$pretax_total = $total_line_item->recalculate_pre_tax_total( TRUE );
		//because there is only one taxable line item, the taxable total should equals its total
		$this->assertEquals( $taxable_line_item->total(), $pretax_total );
		//check we didn't assign the taxable total to be the grand total
		$this->assertNotEquals( $pretax_total, $total_line_item->total() );
		$this->assertEquals( $old_total, $total_line_item->total() );
		//find tickets subtotal and make sure it hasn't been assigned to be the taxable total either
		$this->assertNotEquals( $pretax_total, $total_line_item->get_child_line_item('tickets')->total() );
	}
}

// End of file EE_Line_Item_Test.php