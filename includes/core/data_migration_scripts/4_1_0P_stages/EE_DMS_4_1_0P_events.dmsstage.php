<?php 
/**
 * migrates old 3.1 events, and start_end entries to 4.1 event CPTs, tickets (although doesn't assign them any prices, only datetimes; also
 * this is run BEFORE migrating prices), and datetimes.
 */
class EE_DMS_4_1_0P_events extends EE_Data_Migration_Script_Stage{
	function __construct() {
		$this->_pretty_name = __("Events", "event_espresso");
		parent::__construct();
	}
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
}