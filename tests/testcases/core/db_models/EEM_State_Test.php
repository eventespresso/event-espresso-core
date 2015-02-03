<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_State_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEM_State_Test extends EE_UnitTestCase {

	public function test_get_state_name_by_ID(){
		$this->assertFalse( EEM_State::instance()->exists_by_ID( 99999 ) );
		$s = $this->new_model_obj_with_dependencies( 'State' );
		$this->assertEquals( '', EEM_State::instance()->get_state_name_by_ID( 99999 ) );
		$this->assertEquals( $s->name(), EEM_State::instance()->get_state_name_by_ID( $s->ID() ) );
	}
}

// End of file EEM_State_Test.php