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
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
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
 * ------------------------------------------------------------------------
 */
class EE_Data_Migration_Manager_Test extends EE_UnitTestCase{
	/**
	 * @group data_migration_scripts
	 */
	function test_migrations_exist(){
		$migrations_available = EE_Data_Migration_Manager::instance()->get_all_data_migration_scripts_available();
		foreach($migrations_available as $classname => $filepath){
			$this->assertFileExists($filepath);
			//also verify the class was autoloaded properly
			new $classname;
		}
		
	}
}

// End of file EE_Data_Migration_Manager_Test.php