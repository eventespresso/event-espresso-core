<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_DMS_New_Addon_0_0_1
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
class EE_DMS_New_Addon_0_0_2 extends EE_Data_Migration_Script_Base{
	/**
	 * only run when New Addon is at exactly version 0.0.1 
	 * @param type $version_string
	 * @return boolean
	 */
	public function can_migrate_from_version($version_string) {
		if(isset($version_string['New_Addon'])){
		if(version_compare($version_string['New_Addon'],'0.0.2')){
			//db state is at 0.0.2 or higher. this doesnt apply
			return false;
		}else{
			//db state is old. this applies
			return true;
		}
		}else{
			//apparently this addon was never installed prevously
			//so we don't want ot migrate (we'll probably just add the tables
			//upon activation of the addon, instead of putting the site in maintenance
			//mode and running migrations
			return false;
		}
	}

	public function schema_changes_after_migration() {
		
	}

	public function schema_changes_before_migration() {
		$this->_table_is_new_in_this_version('new_addon', '
			NEW_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
			NEW_name  VARCHAR(10) NOT NULL,
			EVT_ID int(10) unsigned NOT NULL,
			PRIMARY KEY  (NEW_ID)');
	}
}

// End of file EE_DMS_New_Addon_0_0_1.dms.php