<?php

/**
 * Converts gateway settings from 3.1 format to 4.1, and sets active gateways.
 * At the time of writing this, however, the only gateways created for 4.1 were
 * Authorize.net AIM, Bank, Check, Invoice, Paypal Pro and Paypal Standard.
 * 
 */
class EE_DMS_4_1_0_category_details extends EE_Data_Migration_Script_Stage{
private $_old_table;
private $_new_table;
private $_new_term_table;
function _migration_step($num_items=50){
	global $wpdb;
	$start_at_record = $this->count_records_migrated();
	$rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table LIMIT %d,%d",$start_at_record,$num_items),ARRAY_A);
	$items_actually_migrated = 0;
	foreach($rows as $category_detail_row){
		$term_and_taxonomy_ids = wp_insert_term(
				stripslashes($category_detail_row['category_name']),
				'espresso_event_categories',
				array(
					'description'=>  stripslashes($category_detail_row['category_desc']),
					'slug'=>$category_detail_row['category_identifier']
				));
		if($term_and_taxonomy_ids instanceof WP_Error){
			$this->add_error(sprintf(__("Could not create WP Term_Taxonomy from old category: %s. The Error was: %s", "event_espresso"),  $this->_json_encode($category_detail_row),$term_and_taxonomy_ids->get_error_message()));
			$items_actually_migrated++;
			continue;
		}
		$term_id = $term_and_taxonomy_ids['term_id'];
		$term_taxonomy_id = $term_and_taxonomy_ids['term_taxonomy_id'];
		$this->get_migration_script()->set_mapping($this->_old_table, $category_detail_row['id'], $this->_new_term_table, $term_id);
		$this->get_migration_script()->set_mapping($this->_old_table, $category_detail_row['id'], $this->_new_table, $term_taxonomy_id);
		$items_actually_migrated++;
	}
	if($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()){
		$this->set_completed();
	}
	return $items_actually_migrated;
}
function _count_records_to_migrate() {
	global $wpdb;
	$count = $wpdb->get_var("SELECT COUNT(id) FROM $this->_old_table");
	return $count;
}
function __construct() {
	$this->_pretty_name = __("Category Details", "event_espresso");
	global $wpdb;
	$this->_old_table = $wpdb->prefix."events_category_detail";
	$this->_new_table = $wpdb->prefix."term_taxonomy";
	$this->_new_term_table = $wpdb->prefix."terms";
	parent::__construct();
}

}
