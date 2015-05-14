<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_DMS_Core_4_7_0_Tests
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group data_migration_scripts
 * @group core/data_migration_scripts
 * @group EE_DMS_Core_4_7_0_Tests
 *
 */
class EE_DMS_Core_4_7_0_Tests extends EE_UnitTestCase{
	function test_migrate_pretax_total(){
		$script = EE_Registry::instance()->load_dms( 'EE_DMS_Core_4_7_0' );
		$stage = new EE_DMS_4_7_0_pretax_totals();

		//ok let's create a line item to with the LIN_code='tickets'
		$tickets_subtottal = $this->new_model_obj_with_dependencies( 'Line_Item', array( 'LIN_code' => 'tickets' ) );
//and anotehr that DOESN"T match it
		$other_line_item = $this->new_model_obj_with_dependencies( 'Line_Item', array( 'LIN_code' => 'not-tickets' ) );
		$stage->migration_step();
		$new_tickets_subtotal = EEM_Line_Item::instance()->refresh_entity_map_from_db( $tickets_subtottal->ID() );
		$this->assertEquals( 'pre-tax-total', $new_tickets_subtotal->get( 'LIN_code' ) );

		$new_other_line_item = EEM_Line_Item::instance()->refresh_entity_map_from_db( $other_line_item->ID() );
		$this->assertEquals( 'not-tickets', $new_other_line_item->get( 'LIN_code' ) );
	}
}

// End of file EE_DMS_Core_4_7_0_Tests.php