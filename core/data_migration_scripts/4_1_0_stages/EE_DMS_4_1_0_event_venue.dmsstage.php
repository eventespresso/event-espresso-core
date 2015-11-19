<?php

/**
 * Links up 4.1 events to venues
 * 3.1 events_venue_rel table:

CREATE TABLE `wp_events_venue_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) DEFAULT NULL,
  `venue_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8$$
 * 
 * 4.1 EVent_VEnue model's tables and fields:
 * $this->_tables = array(
			'Event_Venue'=>new EE_Primary_Table('esp_event_venue','EVV_ID')
		);
		$this->_fields = array(
			'Event_Venue'=>array(
				'EVV_ID'=>new EE_Primary_Key_Int_Field('EVV_ID', __('Event to Venue Link ID','event_espresso')),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', __('Event ID','event_espresso'), false, 0, 'Event'),
				'VNU_ID'=>new EE_Foreign_Key_Int_Field('VNU_ID', __('Venue ID','event_espresso'), false, 0, 'Venue'),
				'EVV_primary'=>new EE_Boolean_Field('EVV_primary', __("Flag indicating venue is primary one for event", "event_espresso"), false,true)
				
			)
		);



 * 
 */
class EE_DMS_4_1_0_event_venue extends EE_Data_Migration_Script_Stage{
	private $_old_table;
	private $_new_table;
	function _migration_step($num_items=50){
		
		global $wpdb;
		$start_at_record = $this->count_records_migrated();
		$rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table LIMIT %d,%d",$start_at_record,$num_items),ARRAY_A);
		$items_actually_migrated = 0;
		foreach($rows as $event_venue_rel){
			$this->_insert_new_event_to_venue_rel($event_venue_rel);
			$items_actually_migrated++;
		}
		if($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()){
			$this->set_completed();
		}
		return $items_actually_migrated;
	}
	function _count_records_to_migrate() {
		global $wpdb;
		$count = $wpdb->get_var("SELECT COUNT(id) FROM ".$this->_old_table);
		return $count;
	}
	function __construct() {
		global $wpdb;
		$this->_old_table = $wpdb->prefix."events_venue_rel";
		$this->_new_table = $wpdb->prefix."esp_event_venue";
		$this->_pretty_name = __("Event to Venue Relations", "event_espresso");
		parent::__construct();
	}
	
	/**
	 * Attempts to insert a new question group inthe new format given an old one
	 * @global type $wpdb
	 * @param array $old_event_venue_rel
	 * @return int
	 */
	private function _insert_new_event_to_venue_rel($old_event_venue_rel){
		global $wpdb;
		$new_event_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_detail", $old_event_venue_rel['event_id'], $wpdb->prefix."posts");
		$new_venue_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_venue", $old_event_venue_rel['venue_id'], $wpdb->prefix."posts");
		if( ! $new_event_id){
			$this->add_error(sprintf(__("Could not find 4.1 event id for 3.1 event #%d.", "event_espresso"),$old_event_venue_rel['event_id']));
			return 0;
		}
		if( ! $new_venue_id){
			$this->add_error(sprintf(__("Could not find 4.1 venue id for 3.1 venue #%d.", "event_espresso"),$old_event_venue_rel['venue_id']));
			return 0;
		}
		//first ensure there are no other relation entries for this event
		//because although EE4 supports it, EE3 didn't really
		$wpdb->delete( $this->_new_table, 
				array(
					'EVT_ID' => $new_event_id,
				),
				array(
					'%d',//EVT_ID
				));
//		echo "last query". $wpdb->last_query;die;
		$cols_n_values = array(
			'EVT_ID'=>$new_event_id,
			'VNU_ID'=>$new_venue_id,
			'EVV_primary'=>true
		);
		$datatypes = array(
			'%d',//EVT_ID
			'%d',//VNU_ID
			'%d',//EVT_primary
		);
		$success = $wpdb->insert($this->_new_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_event_venue_rel, $this->_new_table, $cols_n_values, $datatypes));
			return 0;
		}
		return $wpdb->insert_id;
	}

}
