<?php

/**
 * Assumes we've already migrated the ee3 categories into wp terms. However, realizes
 * that core wouldn't have migrated the category_meta into the ee4's extra meta table.
 * So taht's what this does.
 */
class EE_DMS_Calendar_3_0_0_metadata extends EE_Data_Migration_Script_Stage_Table{
	protected $_old_table;
	protected $_new_table;
	protected $_new_meta_table;
function __construct() {
	$this->_pretty_name = __("Calendar Category Metadata", "event_espresso");
	global $wpdb;
	$this->_old_table = $wpdb->prefix."events_category_detail";
	$this->_new_table = $wpdb->terms;
	$this->_new_meta_table = $wpdb->prefix."esp_extra_meta";
	parent::__construct();
}

	protected function _migrate_old_row($old_row) {
		$term_id = EE_Data_Migration_Manager::instance()->get_mapping_new_pk('Core_4_1_0',$this->_old_table, $old_row['id'], $this->_new_table);
		if( ! $term_id){
			$this->add_error(sprintf(__("Could not migrate metadata for old category '%s' with id '%d' because there is no EE4 category (term) for it.", "event_espresso"),$old_row['category_name'],$old_row['id']));
			return false;
		}
		$metadata = maybe_unserialize($old_row['category_meta']);
		if( ! is_array($metadata)){
			return;
		}
		if(isset($metadata['use_pickers'])){
			$this->_add_extra_meta_to_term($term_id, 'use_color_picker', $metadata['use_pickers'] == 'Y');
		}
		if(isset($metadata['event_background'])){
			$this->_add_extra_meta_to_term($term_id, 'background_color', $metadata['event_background']);
		}
		if(isset($metadata['event_text_color'])){
			$this->_add_extra_meta_to_term($term_id, 'text_color', $metadata['event_text_color']);
		}
	}
	
	protected function _add_extra_meta_to_term($term_id,$meta_key,$meta_value){
		global $wpdb;
		
		$result = $wpdb->insert($this->_new_meta_table,
				array('OBJ_ID'=>$term_id,
					'EXM_type'=>'Term',
					'EXM_key'=>$meta_key,
					'EXM_value'=>$meta_value),
				array(
					'%d',//OBJ_ID
					'%s',//EXM_type
					'%s',//EXM_key
					'%s',//EXM_value
				));
		return $result;
	}

}
