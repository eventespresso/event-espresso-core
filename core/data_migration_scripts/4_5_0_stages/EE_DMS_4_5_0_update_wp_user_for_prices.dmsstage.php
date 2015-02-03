<?php

/**
 * Populates the new wp_user related fields for existing records in the db  for prices, (introduced in this version, 4.5.0).
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage migrations
*/
class EE_DMS_4_5_0_update_wp_user_for_prices extends EE_Data_Migration_Script_Stage_Table {
	function __construct() {
		global $wpdb;
		$this->_pretty_name = __("Prices", "event_espresso");
		$this->_old_table = $wpdb->prefix."esp_price";
		parent::__construct();
	}
	protected function _migrate_old_row($old_row) {
		//foreach ticket row we add the id for the current logged in user.
		global $wpdb;
		$user_id = EEH_Activation::get_default_creator_id();
		$updated = $wpdb->update($this->_old_table,
				array('PRC_wp_user'=>$user_id),
				array('PRC_ID'=>$old_row['PRC_ID']),
				array('%d',//PRC_wp_user
					),
				array('%d',//PRC_ID
					));
		if ( FALSE === $updated ) {
			$this->add_error(sprintf(__("Error in updating table {$this->_old_table} setting PRC_wp_user = %d where PRC_ID = %d", 'event_espresso'),$user_id,$old_row['PRC_ID']));
		}
	}
}
