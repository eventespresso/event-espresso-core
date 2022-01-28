<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			https://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EE_Data_Migration_Manager_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/data_migration_scripts
 * @group core
 * @group activation
 */
class EE_Data_Migration_Script_Base_Test extends EE_UnitTestCase{
	/**
	 * @group 7120
	 */
	public function test_add_error(){
		$dms = EE_Registry::instance()->load_dms( 'EE_DMS_Core_4_1_0' );
		for( $i = 0; $i < 60; $i++ ){
			$dms->add_error( 'error ' . $i );
		}
		//count should be 51 because once we get to 50, it should stop adding them
		$this->assertEquals( 51, count( $dms->get_errors() ) );
		$dms->add_error( 'force', TRUE );
		//count should be (50 / 2) + 2 (because we should have wiped the first half, then added two
		$this->assertEquals( 27, count( $dms->get_errors() ) );
		//and check that the first one should be... error 25 because
		$errors = $dms->get_errors();
		$first_error = array_shift( $errors );
		$this->assertEquals( 'error 25', $first_error );
	}
}

// End of file EE_Data_Migration_Script_Base.php
