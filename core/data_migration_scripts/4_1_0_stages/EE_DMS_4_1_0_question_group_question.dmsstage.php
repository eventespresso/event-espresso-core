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
				'QGQ_ID'=>new EE_Primary_Key_Int_Field('QGQ_ID', __('Question Group to Question Link ID','event_espresso')),
				'QSG_ID'=>new EE_Foreign_Key_Int_Field('QSG_ID', __('Question Group ID','event_espresso'), false, 0, 'Question_Group'),
				'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', __('Question Id','event_espresso'), false, 0, 'Question')
			)
		);
 * 
 */
class EE_DMS_4_1_0_question_group_question extends EE_Data_Migration_Script_Stage{
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
	 * @param array $old_question_group_question
	 * @return int
	 */
	private function _insert_new_question_group_question($old_question_group_question){
		global $wpdb;
		$new_question_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_question", $old_question_group_question['question_id'], $wpdb->prefix."esp_question");
		$new_question_group_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_qst_group", $old_question_group_question['group_id'], $wpdb->prefix."esp_question_group");
		if( ! $new_question_id){
			$this->add_error(sprintf(__("Could not find 4.1 question id for 3.1 question #%d.", "event_espresso"),$old_question_group_question['question_id']));
			return 0;
		}
		if( ! $new_question_group_id){
			$this->add_error(sprintf(__("Could not find 4.1 question group id for 3.1 question group #%d.", "event_espresso"),$old_question_group_question['group_id']));
			return 0;
		}
		//if it's a system question, it needs to be in the right system group. otherwise no dice!
		if(
				($this->_is_system_question_group($new_question_group_id) == $this->_is_system_question_for_question_group($new_question_id) )
				||
				! $this->_is_system_question_for_question_group($new_question_id)
			){
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
				$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_question_group_question, $this->_new_table, $cols_n_values, $datatypes));
				return 0;
			}
			return $wpdb->insert_id;
		}else{
			return false;
		}
		
	}
	
	/**
	 * If this question is a system question, returns the QSG_system number that 
	 * indicates the question group its permitted in.
	 * @global type $wpdb
	 * @param type $new_question_id
	 * @return int
	 */
	private function _is_system_question_for_question_group($new_question_id){
		global $wpdb;
		$system_id = $wpdb->get_var($wpdb->prepare("SELECT QST_system FROM ".$wpdb->prefix."esp_question WHERE QST_ID=%d",$new_question_id));
		if(in_array($system_id, array('fname','lname','email'))){
			return 1;
		}elseif($system_id!='' && $system_id){
			return 2;
		}else{
			return 0;
		}
	}
	
	/**
	 * Returns the questino group's QSG_system value (1 meaning personal info, 2
	 * being address info, and 0 being neither)
	 * @global type $wpdb
	 * @param type $new_question_group_id
	 * @return boolean
	 */
	private function _is_system_question_group($new_question_group_id){
		global $wpdb;
		$system_id = $wpdb->get_var($wpdb->prepare("SELECT QSG_system FROM ".$wpdb->prefix."esp_question_group WHERE QSG_ID=%d",$new_question_group_id));
		return intval($system_id);
	}

}
