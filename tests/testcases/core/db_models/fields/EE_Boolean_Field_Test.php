<?php

/**
 *
 * Class EE_Boolean_Field_Test
 *
 * Description here
 *
 * @package         Event Espresso
 * @subpackage    
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
if( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

class EE_Boolean_Field_Test extends EE_UnitTestCase{
	public function test_prepare_for_pretty_echoing() {
		$a_boolean_field = EEM_Checkin::instance()->field_settings_for( 'CHK_in' );
		$this->assertEquals( __( 'Yes', 'event_espresso' ), $a_boolean_field->prepare_for_pretty_echoing( true ) );
		$this->assertEquals( __( 'No', 'event_espresso' ), $a_boolean_field->prepare_for_pretty_echoing( false ) );
	}
}
