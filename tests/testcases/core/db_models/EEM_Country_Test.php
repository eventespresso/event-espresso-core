<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_Country_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEM_Country_Test extends EE_UnitTestCase {
	public function test_get_country_name_by_ISO(){
		$this->assertFalse( EEM_Country::instance()->exists_by_ID( 'ZZZ' ) );
		$c = $this->new_model_obj_with_dependencies( 'Country' );
		$this->assertEquals( '', EEM_Country::instance()->get_country_name_by_ISO( 'ZZZ' ) );
		$this->assertEquals( $c->name(), EEM_Country::instance()->get_country_name_by_ISO( $c->ID() ) );
	}
}

// End of file EEM_Country_Test.php