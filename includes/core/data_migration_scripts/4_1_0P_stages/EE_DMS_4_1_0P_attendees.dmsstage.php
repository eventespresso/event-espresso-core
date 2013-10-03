<?php 
/**
 * migrates 3.1 attendee rows into 4.1 registrations, attendees, transactions, and payments
 */
class EE_DMS_4_1_0P_attendees extends EE_Data_Migration_Script_Stage{
	function __construct() {
		$this->_pretty_name = __("Attendees", "event_espresso");
		parent::__construct();
	}
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
}