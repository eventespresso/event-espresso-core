<?php

/**
 * Links up 4.1 questions and question groups according to how they were linked in 3.1
 * For references,
 * old question group rel table looked like
CREATE TABLE `wp_events_qst_group_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `question_id` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8$$


 * 4.1 question group question model's tables and fields:
 $this->_tables = array(
			'Question_Group_Question'=>new EE_Primary_Table('esp_question_group_question','QGQ_ID')
		);
		$this->_fields = array(
			'Question_Group_Question'=>array(
				'QGQ_ID'=>new EE_Primary_Key_Int_Field('QGQ_ID', __('Question Gruop to Question Link ID','event_espresso')),
				'QSG_ID'=>new EE_Foreign_Key_Int_Field('QSG_ID', __('Question Gruop ID','event_espresso'), false, 0, 'Question_Group'),
				'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', __('Question Id','event_espresso'), false, 0, 'Question')
			)
		);
 * 
 */
class EE_DMS_4_1_0P_question_group_question extends EE_Data_Migration_Script_Stage{
	private $_old_table;
	private $_new_table;
	function _migration_step($num_items=50){
		
		global $wpdb;
		$start_at_record = $this->count_records_migrated();
		$rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table LIMIT %d,%d",$start_at_record,$num_items),ARRAY_A);
		$items_actually_migrated = 0;
		foreach($rows as $question_group_question){
			$this->_insert_new_question_group_question($question_group_question);
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
		$this->_old_table = $wpdb->prefix."events_qst_group_rel";
		$this->_new_table = $wpdb->prefix."esp_question_group_question";
		$this->_pretty_name = __("Question Group to Question Relations", "event_espresso");
		parent::__construct();
	}
	
	/**
	 * Attempts to insert a new question group inthe new format given an old one
	 * @global type $wpdb
	 * @param array $old_question_group
	 * @return int
	 */
	private function _insert_new_question_group_question($old_question_group){
		global $wpdb;
		$new_question_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_question", $old_question_group['question_id'], $wpdb->prefix."esp_question");
		$new_question_group_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_qst_group", $old_question_group['group_id'], $wpdb->prefix."esp_question_group");
		if( ! $new_question_id){
			$this->add_error(sprintf(__("Could not find 4.1 question id for 3.1 question #%d.", "event_espresso"),$old_question_group['question_id']));
			return 0;
		}
		if( ! $new_question_group_id){
			$this->add_error(sprintf(__("Could not find 4.1 question group id for 3.1 question group #%d.", "event_espresso"),$old_question_group['group_id']));
			return 0;
		}
		$cols_n_values = array(
			'QSG_ID'=>$new_question_group_id,
			'QST_ID'=>$new_question_id
		);
		$datatypes = array(
			'%d',//QSG_ID
			'%d',//QST_ID
		);
		$success = $wpdb->insert($this->_new_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_question_group, $this->_new_table, $cols_n_values, $datatypes));
			return 0;
		}
		return $wpdb->insert_id;
	}

}
