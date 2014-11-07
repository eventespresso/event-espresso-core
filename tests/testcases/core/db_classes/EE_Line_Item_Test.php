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
}

// End of file EE_Line_Item_Test.php