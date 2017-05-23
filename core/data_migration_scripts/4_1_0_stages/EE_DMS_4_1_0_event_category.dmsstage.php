<?php

/**
 * Links up 4.1 events to categories (term/taxnomies in 4.1)
 * in 3.1 the db table is:
 * delimiter $$

CREATE TABLE `wp_events_category_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8$$


in 4.1, the model's Term_Relationship tables and fields are:
 * $this->_tables = array(
			'Term_Relationship'=> new EE_Primary_Table('term_relationships', 'ANS_ID')
		);
		$this->_fields = array(
			'Term_Relationship'=>array(
				'object_id'=> new EE_Foreign_Key_Int_Field('object_id', __('Object(Post) ID','event_espresso'), false,0,array('Event','Venue','Attendee')),
				'term_taxonomy_id'=>new EE_Foreign_Key_Int_Field('term_taxonomy_id', __('Term (in context of a taxonomy) ID','event_espresso'), false, 0, 'Term_Taxonomy'),
				'term_order'=>new EE_Integer_Field('term_order', __('Term Order','event_espresso'), false, 0)
			));


 *
 */
class EE_DMS_4_1_0_event_category extends EE_Data_Migration_Script_Stage{
	private $_old_table;
	private $_new_table;
	function _migration_step($num_items=50){
		global $wpdb;
		$start_at_record = $this->count_records_migrated();
		$rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table LIMIT %d,%d",$start_at_record,$num_items),ARRAY_A);
		$items_actually_migrated = 0;
		foreach($rows as $event_venue_rel){
			$term_relation_id = $this->_add_relation_from_event_to_term_taxonomy($event_venue_rel);
			if($term_relation_id){
				$this->get_migration_script()->set_mapping($this->_old_table, $event_venue_rel['id'], $this->_new_table, $term_relation_id);
			}
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
		$this->_old_table = $wpdb->prefix."events_category_rel";
		$this->_new_table = $wpdb->prefix."term_relationships";
		$this->_pretty_name = __("Event to Category (4.1 Term Relationships)", "event_espresso");
		parent::__construct();
	}

	/**
	 * Attempts to insert a new question group inthe new format given an old one
	 * @global type $wpdb
	 * @param array $old_event_cat_relation
	 * @return int
	 */
	private function _add_relation_from_event_to_term_taxonomy($old_event_cat_relation){
		global $wpdb;
		$new_event_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_detail", intval($old_event_cat_relation['event_id']), $wpdb->prefix."posts");
		$new_term_taxonomy_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_category_detail", intval($old_event_cat_relation['cat_id']), $wpdb->prefix."term_taxonomy");
		if( ! $new_event_id){
			$this->add_error(sprintf(__("Could not find 4.1 event id for 3.1 event #%d.", "event_espresso"),$old_event_cat_relation['event_id']));
			return 0;
		}
		if( ! $new_term_taxonomy_id){
			$this->add_error(sprintf(__("Could not find 4.1 term-taxonomy id for 3.1 category #%d.", "event_espresso"),$old_event_cat_relation['cat_id']));
			return 0;
		}
		$cols_n_values = array(
			'object_id'=>$new_event_id,
			'term_taxonomy_id'=>$new_term_taxonomy_id,
			'term_order'=>0
		);
		$datatypes = array(
			'%d',//object_id
			'%d',//term_taxonomy_id
			'%d',//term_order
		);
		$success = $wpdb->insert($this->_new_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_event_cat_relation, $this->_new_table, $cols_n_values, $datatypes));
			return 0;
		}else{
			//increment the term-taxonomie's count
			$success = $wpdb->query( $wpdb->prepare( "UPDATE {$wpdb->term_taxonomy} SET count = count +1 WHERE term_taxonomy_id=%d", $new_term_taxonomy_id ) );
			if( ! $success ){
				$this->add_error(sprintf( __( 'Could not increment term_taxonomy\'s count because %s', 'event_espresso' ),$wpdb->last_error));
			}
		}
		return $wpdb->insert_id;
	}

}
