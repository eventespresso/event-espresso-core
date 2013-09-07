<?php
/**
 * meant to convert DBs between 3.1.26 and 4.0.0 to 4.1.0
 */
class EE_DMS_4_1_0P extends EE_Data_Migration_Script_Base{
	public function can_migrate_from_version($version_string) {
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
	
	
	
	
	public function __construct() {
		$this->_migration_stages = array(
			10=>new EE_DMS_4_1_0P_attendees(),
			20=>new EE_DMS_4_1_0P_events(),
		);
		parent::__construct();
	}
}

class EE_DMS_4_1_0P_attendees extends EE_Data_Migration_Script_Stage{
	function _count_records_to_migrate() {
		global $wpdb;
		$count = $wpdb->get_var("SELECT COUNT(*) FROM ".$wpdb->prefix."events_attendee");
		return intval($count);
	}
	protected function _migration_step($num_items_to_migrate = 50) {
		global $wpdb;
		$attendees = $wpdb->get_results($wpdb->prepare("SELECT * FROM ".$wpdb->prefix."events_attendee LIMIT %d,%d",$this->count_records_migrated(),$num_items_to_migrate));
		if($attendees){
			foreach($attendees as $attendee_row){
				//insert new 4.1 Attendee object using $wpdb
				
			}
			$this->set_status(EE_Data_Migration_Manager::status_continue);
		}else{
			$this->set_status(EE_Data_Migration_Manager::status_completed);
		}
		return count($attendees);
		
	}
	function pretty_name(){
		return "Attendee Stage";
	}
}

class EE_DMS_4_1_0P_events extends EE_Data_Migration_Script_Stage{
	function _count_records_to_migrate() {
		global $wpdb;
		$count = $wpdb->get_var("SELECT COUNT(*) FROM ".$wpdb->prefix."events_detail");
		return intval($count);
	}
	protected function _migration_step($num_items_to_migrate = 50) {
		global $wpdb;
		$events = $wpdb->get_results($wpdb->prepare("SELECT * FROM ".$wpdb->prefix."events_detail LIMIT %d,%d",$this->count_records_migrated(),$num_items_to_migrate));
		if($events){
			foreach($events as $event_row){
				//insert new 4.1 Attendee object using $wpdb
			}
			$this->set_status(EE_Data_Migration_Manager::status_continue);
		}else{
			$this->set_status(EE_Data_Migration_Manager::status_completed);
		}
		return count($events);
	}
	function pretty_name() {
		return "events stage";
	}
}

