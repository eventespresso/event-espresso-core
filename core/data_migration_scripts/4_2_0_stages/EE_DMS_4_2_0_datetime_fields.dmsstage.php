<?php

/**
 * Populates the DTT_name and DTT_description fields which were addedin this version.
 * The name is set to just be a string representation of the start date (in UTC time for now), and the description is just left blank
*/

class EE_DMS_4_2_0_datetime_fields extends EE_Data_Migration_Script_Stage_Table{
	function __construct() {
		global $wpdb;
		$this->_pretty_name = __("Datetime Fields", "event_espresso");
		$this->_old_table = $wpdb->prefix."esp_datetime";
		parent::__construct();
	}
	protected function _migrate_old_row($old_row) {		
		//foreach question_group_question entry with this QST_ID, we want to set its
		//QSG_order equal to this question's QST_order
		global $wpdb;
		
		$updated = $wpdb->update($this->_old_table,
				array(
					'DTT_name'=>'',
					'DTT_description'=>'',
					),
				array(
					'DTT_ID'=>$old_row['DTT_ID']),
				array(
					'%s',//DTT_name,
					'%s',//DTT_description
					),
				array(
					'%d',//DTT_ID
					));
		if( FALSE === $updated ){
			$this->add_error(sprintf(__("Error in updating table {$this->_old_table} setting DTT_name = '' and DTT_description = '' where DTT_ID = %d", 'event_espresso'),$old_row['QST_ID']));
		}
		//nothing to map really
	}	
}