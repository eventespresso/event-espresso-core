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
	function test_set_tax(){
		//first create a line item
		$txn = $this->new_typical_transaction();
		$line_item = $txn->total_line_item();
		$old_tax_subtotal = $line_item->get_nearest_descendant_of_type( EEM_Line_Item::type_tax_sub_total );
		$this->assertInstanceOf( 'EE_Line_Item', $old_tax_subtotal );
		$old_tax = $old_tax_subtotal->get_nearest_descendant_of_type( EEM_Line_Item::type_tax );

		$new_tax = $line_item->set_tax_to( 1.5, 'Monkey Tax', 'Only monkey must pay' );
		$this->assertEquals( 1.5, $new_tax->total());
		$this->assertEquals( $new_tax->total(), $old_tax_subtotal->total() );
		$child_of_tax_subtotal = $old_tax_subtotal->get_nearest_descendant_of_type( EEM_Line_Item::type_tax );
		$this->assertEquals( $new_tax, $child_of_tax_subtotal );

		$tax_total_before_recalculation = $old_tax_subtotal->total();
		$tax_before_recalculations = $new_tax->total();
		$line_item->recalculate_taxes_and_total();

		$this->assertEquals( $tax_before_recalculations, $new_tax->total() );
		$this->assertEquals( $tax_total_before_recalculation, $old_tax_subtotal->total() );
	}
}

// End of file EE_Line_Item_Test.php