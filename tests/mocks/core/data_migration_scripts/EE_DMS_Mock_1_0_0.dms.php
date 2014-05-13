<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_4_1_0_Mock
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
class EE_DMS_Mock_1_0_0 extends EE_Data_Migration_Script_Base{
	public function can_migrate_from_version($version_array) {
		$version_string = $version_array['Core'];
		if($version_string < '4.0.0' && $version_string > '3.1.26' ){
//			echo "$version_string can be mgirated fro";
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