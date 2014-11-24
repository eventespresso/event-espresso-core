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
		$txn = $this->new_typical_transaction( array( 'taxable_tickets' => 0 ) );
		$this->assertEquals( 0, $txn->tax_total() );
		$total_line_item = $txn->total_line_item();
		//when we calculate the pre-tax, including only taxable items (ie, we're wanting
		//to know how much to apply taxes to) we don't change the grand or ticket totals
		$total_line_item->recalculate_pre_tax_total( TRUE );
		$this->assertNotEquals( 0, $total_line_item->total() );
		//find tickets subtotla
		$this->assertNotEquals( 0, $total_line_item->get_child_line_item('tickets')->total() );
	}
}

// End of file EE_Line_Item_Test.php