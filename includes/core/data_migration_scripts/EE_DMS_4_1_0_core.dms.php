<?php
/**
 * meant to convert DBs between 3.1.26 and 4.0.0 to 4.1.0
 */
class EE_DMS_4_1_0_core extends EE_Data_Migration_Script_Base{
	static public function can_migrate_from_version($version_string) {
		if($version_string < '4.0.0' &&$version_string > '3.1.26' ){
			return true;
		}elseif( ! $version_string ){
			//no version string provided... this must be pre 4.1
			//because since 4.1 we're 
			return false;//changed mind. dont want people thinking they should migrate yet because they cant
		}else{
			return false;
		}
	}
	public function count_records_to_migrate() {
		return 10;
	}
	public function count_records_migrated() {
		return 5;
	}
	public function pretty_name() {
		return __("Core Data Migration to version 4.1.0", "event_espresso");
	}
	public function schema_changes_before_migration() {
		//ensure our tables exist (probably using 
		return true;
	}
	public function schema_changes_after_migration() {
		return true;
	}
	
	
	public function migration_step($num_records_to_migrate = 50) {
		return array(EE_Data_Migration_Manager::status_completed,'all done 4.1.0');
	}
	
	public function __construct() {
//		$this->_migration_stages = array(
//			
//		)
	}
}


