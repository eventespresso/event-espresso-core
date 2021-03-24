<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 * EE_Restriction_Generator_Base
 *
 * @package     Event Espresso
 * @subpackage  tests
 * @author      Mike Nelson
 * @group       core/db_models
 * @group       restriction-generators
 *
 */
class EE_Restriction_Generator_Base_Test extends EE_UnitTestCase{
	function test_get_cap_name(){
		$this->assertEquals( 'ee_edit_events', EE_Restriction_Generator_Base::get_cap_name(EEM_Event::instance(), 'edit' ) );
		$this->assertEquals( 'ee_read_private_venues', EE_Restriction_Generator_Base::get_cap_name( EEM_Venue::instance(), 'read_private' ) );
	}

	function test_is_cap(){
		$this->assertTrue( EE_Restriction_Generator_Base::is_cap( EEM_Event::instance(), 'edit' ) );
		$this->assertTrue( EE_Restriction_Generator_Base::is_cap( EEM_Event::instance(), 'edit_others' ) );
		$this->assertFalse( EE_Restriction_Generator_Base::is_cap( EEM_Event::instance(), 'rock' ) );
	}
}

// End of file EE_Restriction_Generator_Base.php