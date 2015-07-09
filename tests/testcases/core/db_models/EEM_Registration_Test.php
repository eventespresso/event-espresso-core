<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_Registration_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEM_Registration_Test extends EE_UnitTestCase{
	/**
	 * @group 7965
	 */
	function test_delete_registrations_with_no_transaction(){
		$deletable_count = 5;
		$safe_count = 8;
		$this->factory->registration->create_many( $deletable_count, array( 'TXN_ID' =>  0 ) );
		for( $i=0;$i< $safe_count; $i++ ){
			$this->new_model_obj_with_dependencies( 'Registration' );
		}
		$deleted = EEM_Registration::instance()->delete_registrations_with_no_transaction();
		$this->assertEquals( $deletable_count, $deleted );
	}
}

// End of file EEM_Registration_Test.php