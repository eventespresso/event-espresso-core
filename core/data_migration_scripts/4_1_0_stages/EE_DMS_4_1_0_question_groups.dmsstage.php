<?php

/**
 * Converts question groups from 3.1.x to 4.1.
 * For references,
 * old question group table:
CREATE TABLE `wp_events_qst_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL DEFAULT 'NULL',
  `group_identifier` varchar(45) NOT NULL DEFAULT 'NULL',
  `group_description` text,
  `group_order` int(11) DEFAULT '0',
  `show_group_name` tinyint(1) NOT NULL DEFAULT '1',
  `show_group_description` tinyint(1) NOT NULL DEFAULT '1',
  `system_group` tinyint(1) NOT NULL DEFAULT '0',
  `wp_user` int(22) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `system_group` (`system_group`),
  KEY `wp_user` (`wp_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8$$
 * 
 * 4.1 question model's tables and fields:
 * $this->_tables = array(
			'Question_Group'=>new EE_Primary_Table('esp_question_group','QSG_ID')
		);
		$this->_fields = array(
			'Question_Group'=>array(
				'QSG_ID'=>new EE_Primary_Key_Int_Field('QSG_ID', __('Question Group ID','event_espresso')),
				'QSG_name'=>new EE_Plain_Text_Field('QSG_name', __('Question Group Name','event_espresso'), false, ''),
				'QSG_identifier'=>new EE_Plain_Text_Field('QSG_identifier', __('Text ID for question Group','event_espresso'), false, ''),
				'QSG_desc'=>new EE_Full_HTML_Field('QSG_desc', __('Description of Question Group','event_espresso'), true, ''),
				'QSG_order'=>new EE_Integer_Field('QSG_order', __('Order in which to show the question group','event_espresso'), true, 0),
				'QSG_show_group_name'=>new EE_Boolean_Field('QSG_show_group_name', __('Flag indicating whether to show the group\'s name on the registration page','event_espresso'), false, false),
				'QSG_show_group_desc'=>new EE_Boolean_Field('QSG_show_group_desc', __('Flag indicating whether to show the group\s description on the registration apge','event_espresso'), false, false),
				'QSG_system'=>new EE_Integer_Field('QSG_system', __('Indicate IF this is a system group and if it is what system group it corresponds to.','event_espresso'), false, 0),
				'QSG_deleted'=>new EE_Trashed_Flag_Field('QSG_deleted', __('Flag indicating this question group was deleted','event_espresso'), false, false)
			)
		);
 * 
 */
class EE_DMS_4_1_0_question_groups extends EE_Data_Migration_Script_Stage{
	private $_old_table;
	private $_new_table;
	/**
	 * Keeps track of whether or not we've already added a system question group,
	 * in order to avoid adding more than 1 (basically, in 3.1 this would happen
	 * with the Roles & Permissions addon, because each user had their own set of
	 * question groups and questions),
	 * @var boolean
	 */
	private $_already_got_system_question_group_1 = false;
	function _migration_step($num_items=50){
		
		global $wpdb;
		$start_at_record = $this->count_records_migrated();
		$rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table LIMIT %d,%d",$start_at_record,$num_items),ARRAY_A);
		$items_actually_migrated = 0;
		foreach($rows as $question_group){
			$new_id = $this->_insert_new_question_group($question_group);

			$this->get_migration_script()->set_mapping($this->_old_table, $question_group['id'], $this->_new_table, $new_id);
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
		$this->_old_table = $wpdb->prefix."events_qst_group";
		$this->_new_table = $wpdb->prefix."esp_question_group";
		$this->_pretty_name = __("Question Groups", "event_espresso");
		parent::__construct();
	}
	
	/**
	 * Attempts to insert a new question group inthe new format given an old one
	 * @global type $wpdb
	 * @param array $old_question_group
	 * @return int
	 */
	private function _insert_new_question_group($old_question_group){
		global $wpdb;
		//try to guess what the QST_system int should be... finding the Personal info system
		//question group is quite easy. But in 3.1 address info WASN'T a system group, it just exitsed by default but
		//could be easily removed.
		if($old_question_group['system_group'] && ! $this->_already_got_system_question_group_1()){
			$guess_at_system_number = 1;
		}elseif($old_question_group['id'] == '2' && strpos($old_question_group['group_name'],'Address')!==FALSE){
			$guess_at_system_number = 2;
		}else{
			$guess_at_system_number = 0;
		}
		//if the question group wasn't made by the normal admin, 
		//we'd like to keep track of who made it
		if(intval($old_question_group['wp_user'])!=1){
			$username = $wpdb->get_var($wpdb->prepare("SELECT user_nicename FROM ".$wpdb->users." WHERE ID = %d",$old_question_group['wp_user']));
			$identifier = $old_question_group['group_identifier']."-by-".$username;
		}else{
			$identifier = $old_question_group['group_identifier'];
		}
		$cols_n_values = array(
			'QSG_name'=>stripslashes($old_question_group['group_name']),
			'QSG_identifier'=>$identifier,
			'QSG_desc'=>stripslashes($old_question_group['group_description']),
			'QSG_order'=>$old_question_group['group_order'],
			'QSG_show_group_name'=>$old_question_group['show_group_name'],
			'QSG_show_group_desc'=>$old_question_group['show_group_description'],
			'QSG_system'=>$guess_at_system_number,
			'QSG_deleted'=>false
		);
		$datatypes = array(
			'%s',//QSG_name
			'%s',//QSG_identifier
			'%s',//QSG_desc
			'%d',//QSG_order
			'%d',//QSG_show_group_name
			'%d',//QSG_show_group_desc
			'%d',//QSG_system
			'%d',//QSG_deleted
		);
		$success = $wpdb->insert($this->_new_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_question_group, $this->_new_table, $cols_n_values, $datatypes));
			return 0;
		}
		return $wpdb->insert_id;
	}
	
	/**
	 * Checks if we've already added a system question 1 to the new question groups table
	 * @global type $wpdb
	 * @return boolean
	 */
	private function _already_got_system_question_group_1(){
		if( ! $this->_already_got_system_question_group_1 ){
			//check the db
			global $wpdb;
			$exists = $wpdb->get_var("SELECT COUNT(*) FROM {$this->_new_table} WHERE QSG_system=1");
			if(intval($exists)>0){
				$this->_already_got_system_question_group_1 = true;
			}
		}		
		return $this->_already_got_system_question_group_1;
	}
}
