<?php

/**
 * Converts gateway settings from 3.1 format to 4.1, and sets active gateways.
 * At the time of writing this, however, the only gateways created for 4.1 were
 * Authorize.net AIM, Bank, Check, Invoice, Paypal Pro and Paypal Standard.
 * 3.1 table:
CREATE TABLE `wp_events_question` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sequence` int(11) NOT NULL DEFAULT '0',
  `question_type` enum('TEXT','TEXTAREA','MULTIPLE','SINGLE','DROPDOWN') NOT NULL DEFAULT 'TEXT',
  `question` text NOT NULL,
  `system_name` varchar(15) DEFAULT NULL,
  `response` text,
  `required` enum('Y','N') NOT NULL DEFAULT 'N',
  `price_mod` enum('Y','N') NOT NULL DEFAULT 'N',
  `required_text` text,
  `admin_only` enum('Y','N') NOT NULL DEFAULT 'N',
  `wp_user` int(22) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `wp_user` (`wp_user`),
  KEY `system_name` (`system_name`),
  KEY `admin_only` (`admin_only`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8$$
 * 4.1 model tables and fields is:
 * $this->_tables = array(
			'Question'=>new EE_Primary_Table('esp_question','QST_ID')
		);
		$this->_fields = array(
			'Question'=>array(
				'QST_ID'=>new EE_Primary_Key_Int_Field('QST_ID', __('Question ID','event_espresso')),
				'QST_display_text'=>new EE_Full_HTML_Field('QST_display_text', __('Question Text','event_espresso'), true, ''),
				'QST_admin_label'=>new EE_Simple_HTML_Field('QST_admin_label', __('Question Label (admin-only)','event_espresso'), true, ''),
				'QST_system'=>new EE_Plain_Text_Field('QST_system', __('Internal string ID for question','event_espresso'), TRUE, NULL ),
				'QST_type'=>new EE_Enum_Text_Field('QST_type', __('Question Type','event_espresso'),false, 'TEXT',$this->_allowed_question_types),
				'QST_required'=>new EE_Boolean_Field('QST_required', __('Required Question?','event_espresso'), false, false),
				'QST_required_text'=>new EE_Simple_HTML_Field('QST_required_text', __('Text to Display if Not Provided','event_espresso'), true, ''),
				'QST_order'=>new EE_Integer_Field('QST_order', __('Question Order','event_espresso'), false, 0),
				'QST_admin_only'=>new EE_Boolean_Field('QST_admin_only', __('Admin-Only Question?','event_espresso'), false, false),
				'QST_wp_user'=>new EE_Integer_Field('QST_wp_user', __('Wp User ID who created question','event_espresso'), false, 1),
				'QST_deleted'=>new EE_Trashed_Flag_Field('QST_deleted', __('Flag Indicating question was deleted','event_espresso'), false, false)
			)
		);
 *
 * AND Question Option model was just a CSV'd list on questions in 3.1, but in 4.1 looks like this:
 * $this->_tables = array(
			'Question_Option'=>new EE_Primary_Table('esp_question_option','QSG_ID')
		);
		$this->_fields = array(
			'Question_Option'=>array(
					'QSO_ID'=>new EE_Primary_Key_Int_Field('QSO_ID', __('Question Option ID','event_espresso')),
					'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', __('Question ID','event_espresso'), false, 0, 'Question'),
					'QSO_value'=>new EE_Simple_HTML_Field('QSO_value', __('Question Option Name','event_espresso'), false, ''),
					'QSO_desc'=>new EE_Simple_HTML_Field('QSO_desc','Question Option Value',false,''),
					'QSO_deleted'=>new EE_Trashed_Flag_Field('QSO_deleted', __('Flag indicating Option was trashed','event_espresso'), false, false)
				)
 */
class EE_DMS_4_1_0_questions extends EE_Data_Migration_Script_Stage{
	private $_old_table;
	private $_new_table;
	private $_option_table;
	function _migration_step($num_items=50){
		global $wpdb;
		$start_at_record = $this->count_records_migrated();
		$rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table LIMIT %d,%d",$start_at_record,$num_items),ARRAY_A);
		$items_actually_migrated = 0;
		foreach($rows as $question_row){
			$new_id = $this->_insert_new_question($question_row);
			$this->get_migration_script()->set_mapping($this->_old_table, $question_row['id'], $this->_new_table, $new_id);
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
		$this->_pretty_name = __("Questions", "event_espresso");
		$this->_old_table = $wpdb->prefix."events_question";
		$this->_new_table = $wpdb->prefix."esp_question";
		$this->_option_table = $wpdb->prefix."esp_question_option";
		parent::__construct();
	}
	private function _insert_new_question($old_question){
		global $wpdb;
		//if this pretends to be a 'system' question, check if we already have a
		//system question for that string. If so, pretend THAT new question
		//is what we just isnerted
		if($old_question['system_name']){
			$id_of_new_system_question = intval($wpdb->get_var($wpdb->prepare("SELECT QST_ID FROM {$this->_new_table} WHERE QST_system = %s",$old_question['system_name'])));
			if($id_of_new_system_question){
				return $id_of_new_system_question;
			}
			//ok so this must be the first one. Carry on.
		}

		$cols_n_values = array(
			'QST_display_text'=>stripslashes($old_question['question']),
			'QST_admin_label'=> $old_question['system_name'] ? $old_question['system_name'] : sanitize_title($old_question['question']),
			'QST_system'=>$old_question['system_name'],
			'QST_type'=>$old_question['question_type'],
			'QST_required'=> 'Y' == $old_question['required'],
			'QST_required_text'=>stripslashes($old_question['required_text']),
			'QST_order'=>$old_question['sequence'],
			'QST_admin_only'=> 'Y' == $old_question['admin_only'],
			'QST_wp_user'=>$old_question['wp_user'],
			'QST_deleted'=>false
		);
		$datatypes = array(
			'%s',//QST_display_text
			'%s',//QST-admin_label
			'%s',//QST_system
			'%s',//QST_type
			'%d',//QST_required
			'%s',//QST_required_text
			'%d',//QST_order
			'%d',//QST_admin_only
			'%d',//QST_wp_user
			'%d',//QST_deleted
		);
		$success = $wpdb->insert($this->_new_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_question, $this->_new_table, $cols_n_values, $datatypes));
			return 0;
		}
		$new_id = $wpdb->insert_id;
		//now take care of posisbly adding question options
		if(in_array($old_question['question_type'],array('DROPDOWN','SINGLE','MULTIPLE'))){
			$options = explode(",",$old_question['response']);
			foreach($options as $option){
				$this->_insert_question_option($option, $new_id);
			}
		}
		return $new_id;
	}
	/**
	 * Adds a question option to the db
	 * @global type $wpdb
	 * @param string $option
	 * @param int $question_id
	 * @return int
	 */
	private function _insert_question_option($option,$question_id){
		$option = trim($option);
		global $wpdb;
		$cols_n_values = array(
			'QST_ID'=>$question_id,
			'QSO_value'=>$option,
			'QSO_deleted'=>false
		);
		$datatypes= array(
			'%d',//QST_ID
			'%s',//QSO_value
			'%d',//QSO_deleted
		);
		$success = $wpdb->insert($this->_option_table,$cols_n_values,$datatypes);
		if ( ! $success ){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, array('option'=>$option,'new_question_id'=>$question_id), $this->_option_table, $cols_n_values, $datatypes));
			return 0;
		}
		return $wpdb->insert_id;
	}
}
