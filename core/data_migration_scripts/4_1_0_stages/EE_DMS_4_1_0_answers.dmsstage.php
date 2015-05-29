<?php

/**
 * Converts 3.1 prices to 4.1 tickets, prices, and associates those tickets to prices,
 * to events, and to datetimes.
 * For reference,3.1 price's table:

CREATE TABLE `wp_events_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `registration_id` varchar(23) NOT NULL,
  `attendee_id` int(11) NOT NULL DEFAULT '0',
  `question_id` int(11) NOT NULL DEFAULT '0',
  `answer` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `registration_id` (`registration_id`),
  KEY `attendee_id` (`attendee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8$$


	4.1 model's tables and fields:
 * $this->_tables = array(
			'Answer'=> new EE_Primary_Table('esp_answer', 'ANS_ID')
		);
		$this->_fields = array(
			'Answer'=>array(
				'ANS_ID'=> new EE_Primary_Key_Int_Field('ANS_ID', __('Answer ID','event_espresso')),
				'REG_ID'=>new EE_Foreign_Key_Int_Field('REG_ID', __('Registration ID','event_espresso'), false, 0, 'Registration'),
				'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', __('Quesetion ID','event_espresso'), false, 0, 'Question'),
				'ANS_value'=>new EE_Simple_HTML_Field('ANS_value', __('Answer Value','event_espresso'), false, '')
			));
*/

class EE_DMS_4_1_0_answers extends EE_Data_Migration_Script_Stage_Table{
	private $_new_answer_table;
	private $_new_question_table;
	function __construct() {
		global $wpdb;
		$this->_pretty_name = __("Answers", "event_espresso");
		$this->_old_table = $wpdb->prefix."events_answer";
		$this->_new_answer_table = $wpdb->prefix."esp_answer";
		$this->_new_question_table = $wpdb->prefix."esp_question";
		parent::__construct();
	}
	protected function _migrate_old_row($old_row) {
		//get the new REGs for the old answer
		global $wpdb;
		$old_attendee_table = $wpdb->prefix."events_attendee";
		$new_reg_table = $wpdb->prefix."esp_registration";
		$regs = $this->get_migration_script()->get_mapping_new_pk($old_attendee_table, $old_row['attendee_id'], $new_reg_table);
		if( ! $regs){
			$this->add_error(sprintf(__("Could not find new registrations for old attendee %d when creating answer %s", "event_espresso"),$old_row['attendee_id'],  $this->_json_encode($old_row)));
			return false;
		}
		//as inefficient as this sounds, we create an answer per REGISTRATION, (even if the registrations use the same attendee)
		foreach($regs as $new_reg_id){
			$new_answer_id = $this->_insert_new_answer($old_row,$new_reg_id);
		}
	}
	/**
	 * Creates a 4.1 price base type
	 * @global type $wpdb
	 * @param array $old_price
	 * @param int $new_reg_id
	 * @return int
	 */
	private function _insert_new_answer($old_answer,$new_reg_id){
		global $wpdb;
		$old_question_table = $wpdb->prefix."events_question";
		$new_question_id = $this->get_migration_script()->get_mapping_new_pk($old_question_table, $old_answer['question_id'], $this->_new_question_table);

		$question_type = $this->_get_question_type($new_question_id);
		if(in_array($question_type,array('MULTIPLE'))){
			$ans_value = serialize(explode(",",stripslashes($old_answer['answer'])));
		}else{
			$ans_value = stripslashes($old_answer['answer']);
		}
		$cols_n_values = array(
			'REG_ID'=>$new_reg_id,
			'QST_ID'=>$new_question_id,
			'ANS_value'=>$ans_value
		);
		$datatypes = array(
			'%d',//REG_ID
			'%d',//QST_ID
			'%s',//ANS_value
		);
		$success = $wpdb->insert($this->_new_answer_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_answer, $this->_new_answer_table, $cols_n_values, $datatypes));
			return 0;
		}
		$new_id = $wpdb->insert_id;
		return $new_id;
	}

	/**
	 * Gets the question's type
	 * @global type $wpdb
	 * @param type $question_id
	 * @return string
	 */
	private function _get_question_type($question_id){
		global $wpdb;
		$type = $wpdb->get_var($wpdb->prepare("SELECT QST_type FROM ".$this->_new_question_table." WHERE QST_ID=%d LIMIT 1",$question_id));
		return $type;
	}

}