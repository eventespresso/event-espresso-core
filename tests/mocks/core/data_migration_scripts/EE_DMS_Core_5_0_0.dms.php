<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_DMS_Core_5_0_0
 *
 * Mock DMS we can use to trigger maintenance mode more
 * legitimately (applies whenever Core is between 4.0.0-5.0.0)
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_DMS_Core_5_0_0 extends EE_Data_Migration_Script_Base{
	public function can_migrate_from_version($version_array) {
		$version_string = $version_array['Core'];
		if($version_string < '5.0.0' && $version_string > '4.0.0' ){
//			echo "$version_string can be migrated fro";
			return true;
		}elseif( ! $version_string ){
//			echo "no version string provided: $version_string";
			//no version string provided... this must be pre 4.1
			//because since 4.1 we're
			return false;//changed mind. dont want people thinking they should migrate yet because they cant
		}else{
//			echo "$version_string doesnt apply";
			return false;
		}
	}

	public function schema_changes_after_migration() {

	}

	public function schema_changes_before_migration() {

	}
}

// End of file EE_4_1_0_Mock.dms.php