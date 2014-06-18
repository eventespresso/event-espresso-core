<?php

/**
 * Links up 4.1 events to question groups. In 3.1, this join didn't occur on a table, but instead
 * on a column in the events_detail table (question_groups), and inside a serialized array on a column on the same table (event_meta's index add_attendee_question_groups)

	The 4.1 model tables and fields are
 * $this->_tables = array(
			'Event_Question_Group'=>new EE_Primary_Table('esp_event_question_group','EQG_ID')
		);
	$this->_fields = array(
		'Event_Question_Group'=>array(
			'EQG_ID'=>new EE_Primary_Key_Int_Field('EQG_ID', __('Event to Question Group Link ID','event_espresso')),
			'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', __('Event ID','event_espresso'), false, 0, 'Event'),
			'QSG_ID'=>new EE_Foreign_Key_Int_Field('QSG_ID', __('QUestion Group Id','event_espresso'), false, 0, 'Question_Group'),
			'EQG_primary'=>new EE_Boolean_Field('EQG_primary', __('Flag indicating question is only for primary attendees','event_espresso'), false, false)
		)
	);


 *
 */
class EE_DMS_4_1_0_event_question_group extends EE_Data_Migration_Script_Stage_Table{
	private $_new_table;
	function _migrate_old_row($old_row) {
//		$txn_id = $this->get_migration_script()->get_mapping_new_pk($this->_old_table, $old_row['id'], $this->_new_transaction_table);
//			if ( ! $txn_id ){
//				$this->add_error(sprintf(__("Could not find the transaction for the 3.1 attendee %d from row %s", "event_espresso"),$old_row['id'],$this->_json_encode($old_row)));
//				return;
//			}
//			$txn = $this->_get_txn($txn_id);
//			$new_line_items = $this->_insert_new_line_items($txn,$old_row);
//			$this->get_migration_script()->set_mapping($this->_old_table,$old_row['id'],$this->_new_line_table,$new_line_items);

			$this->_insert_new_event_question_groups($old_row);
	}
//	function _migration_step($num_items=50){
//		global $wpdb;
//		$start_at_record = $this->count_records_migrated();
//		$rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table LIMIT %d,%d",$start_at_record,$num_items),ARRAY_A);
//		$items_actually_migrated = 0;
//		foreach($rows as $old_event){
//			$this->_insert_new_event_question_groups($old_event);
//			$items_actually_migrated++;
//		}
//		if($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()){
//			$this->set_completed();
//		}
//		return $items_actually_migrated;
//	}
//	function _count_records_to_migrate() {
//		global $wpdb;
//		$count = $wpdb->get_var("SELECT COUNT(id) FROM ".$this->_old_table);
//		return $count;
//	}
	function __construct() {
		global $wpdb;
		$this->_old_table = $wpdb->prefix."events_detail";
		$this->_new_table = $wpdb->prefix."esp_event_question_group";
		$this->_pretty_name = __("Question Groups in each Event", "event_espresso");
		parent::__construct();
	}

	/**
	 * Attempts to insert a new question group inthe new format given an old one
	 * @global type $wpdb
	 * @param array $old_event
	 * @return void
	 */
	private function _insert_new_event_question_groups($old_event){
		$new_event_question_group_ids = array();
		$question_groups_for_primary = maybe_unserialize($old_event['question_groups']);
		if( is_array($question_groups_for_primary ) ){
			foreach($question_groups_for_primary as $old_question_group_id){
				$new_id = $this->_insert_event_question_group($old_event,$old_question_group_id,true);
				if($new_id){
					$new_event_question_group_ids[] = $new_id;
				}
			}
		}
		$event_meta = maybe_unserialize($old_event['event_meta']);
		if(isset($event_meta['add_attendee_question_groups'])){
			if( is_array( $event_meta['add_attendee_question_groups'] )){
				foreach($event_meta['add_attendee_question_groups'] as $old_question_group_id){
					$new_id = $this->_insert_event_question_group($old_event,$old_question_group_id,false);
					if($new_id){
						$new_event_question_group_ids[] = $new_id;
					}
				}
			}
		}


		$this->get_migration_script()->set_mapping($this->_old_table, $old_event['id'], $this->_new_table, $new_event_question_group_ids);
	}

	private function _insert_event_question_group($old_event,$old_question_group_id,$primary){
		global $wpdb;
		$new_question_group_id =$this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_qst_group", intval($old_question_group_id), $wpdb->prefix."esp_question_group");

		if( ! $new_question_group_id){
			$this->add_error(sprintf(__("Could not find 4.1 question ID for 3.1 question id #%s on event $%s", "event_espresso"),$old_question_group_id,$old_event['id']));
			return 0;
		}
		$new_event_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_detail", intval($old_event['id']), $wpdb->posts);
			if( ! $new_question_group_id){
			$this->add_error(sprintf(__("Could not find 4.1 event 3.1 event id #%s", "event_espresso"),$old_event['id']));
			return 0;
		}
		$cols_n_values = array(
			'EVT_ID'=>$new_event_id,
			'QSG_ID'=>$new_question_group_id,
			'EQG_primary'=>$primary
		);
		$datatypes = array(
			'%d',//EVT_ID
			'%d',//QSG_ID
			'%d',//EQG_primary
		);
		$success = $wpdb->insert($this->_new_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_event, $this->_new_table, $cols_n_values, $datatypes));
			return 0;
		}
		return $wpdb->insert_id;
	}

}
