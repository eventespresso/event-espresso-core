<?php

/**
 * Populates the QGQ_order (introduced in this version, 4.2.0) from the QST_order
*/

class EE_DMS_4_2_0_question_group_questions extends EE_Data_Migration_Script_Stage_Table{
	private $_qgq_table;
	function __construct() {
		global $wpdb;
		$this->_pretty_name = __("Question Group Questions", "event_espresso");
		$this->_old_table = $wpdb->prefix."esp_question";
		$this->_qgq_table = $wpdb->prefix."esp_question_group_question";
		parent::__construct();
	}
	protected function _migrate_old_row($old_row) {		
		//foreach question_group_question entry with this QST_ID, we want to set its
		//QSG_order equal to this question's QST_order
		global $wpdb;
		$updated = $wpdb->update($this->_qgq_table,
				array('QGQ_order'=>$old_row['QST_order']),
				array('QST_ID'=>$old_row['QST_ID']),
				array('%d',//QGQ_order
					),
				array('%d',//QST_ID
					));
		if( FALSE === $updated ){
			$this->add_error(sprintf(__("Error in updating table {$this->_qgq_table} setting QGQ_order = %d where QST_ID = %d", 'event_espresso'),$old_row['QST_order'],$old_row['QST_ID']));
		}
		//nothing to map really
	}	
}