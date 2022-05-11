<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Line_Item_Filter_Processor_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group                Line_Item_Filter
 */
class EE_Line_Item_Filter_Processor_Test extends EE_UnitTestCase{
	function set_up(){
		parent::set_up();
		EEH_Autoloader::register_line_item_filter_autoloaders();
	}
	/**
	 * Verifies that when we run the line item processor on some line items,
	 * that the related real transaction doesn't get modified at all
	 */
	function test_process__not_update_transaction() {
		$txn = $this->new_typical_transaction( array( 'ticket_types' => 2 ) );
		$original_total = $txn->total();
		//in order for us to do a good test, let's verify
		$this->assertNotEquals( 0, $original_total );
		$this->assertEquals( 2, count( $txn->registrations() ) );
		//ok now use the processor with some kind of filter
		$collection = new EE_Line_Item_Filter_Collection();
		$collection->add( new EE_Single_Registration_Line_Item_Filter( $txn->primary_registration() ) );
		$processor = new EE_Line_Item_Filter_Processor( $collection, $txn->total_line_item() );
		$filtered_line_item_tree = $processor->process();
		//doesn't matter which filter so long as it just changes the grand total line item's total is all
		$this->assertNotEquals( $txn->total_line_item()->total(), $filtered_line_item_tree->total() );
		//and now verify the transaction wasn't changed in this process
		$this->assertEquals( $original_total, $txn->total() );

	}
}

// End of file EE_Line_Item_Filter_Processor_Test.php
// Location: /tests/testcases/core/libraries/line_item_filters/EE_Line_Item_Filter_Processor_Test.php