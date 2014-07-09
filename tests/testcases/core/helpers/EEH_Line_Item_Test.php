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
	public function test_get_items_subtotal(){
		$transaction = $this->new_typical_transaction();
		$items_subtotal = EEM_Line_Item::instance()->get_all_of_type_for_transaction( EEM_Line_Item::type_sub_total, $transaction );
		$eeh_found_items_subtotal = EEH_Line_Item::get_items_subtotal( $transaction->total_line_item() );
		$this->assertEquals( $items_subtotal, $eeh_found_items_subtotal );
	}
}

// End of file EEH_Line_Item_Test.php