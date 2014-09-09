<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Attendee Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Term_Relationship extends EEM_Base {

  	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This function is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Attendee instance
	 */
	public static function instance(){

		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model
			self::$_instance = new self();
		}
		// EEM_Attendee object
		return self::$_instance;
	}

	protected function __construct(){
		$this->singular_item = __('Term Relationship','event_espresso');
		$this->plural_item = __('Term Relationships','event_espresso');
		$this->_tables = array(
			'Term_Relationship'=> new EE_Primary_Table('term_relationships')
		);
		$this->_fields = array(
			'Term_Relationship'=>array(
				'object_id'=> new EE_Foreign_Key_Int_Field('object_id', __('Object(Post) ID','event_espresso'), false,0,array('Event','Venue','Attendee')),
				'term_taxonomy_id'=>new EE_Foreign_Key_Int_Field('term_taxonomy_id', __('Term (in context of a taxonomy) ID','event_espresso'), false, 0, 'Term_Taxonomy'),
				'term_order'=>new EE_Integer_Field('term_order', __('Term Order','event_espresso'), false, 0)
			));
		$this->_model_relations = array(
			'Event'=>new EE_Belongs_To_Relation(),
			'Venue'=>new EE_Belongs_To_Relation(),
			'Attendee'=>new EE_Belongs_To_Relation(),
			'Term_Taxonomy'=>new EE_Belongs_To_Relation()
		);
		$this->_indexes = array(
			'PRIMARY'=>new EE_Primary_Key_Index(array('object_id','term_taxonomy_id'))
		);

		parent::__construct();
	}

	/**
	 * Makes sur eall term-taxonomy counts are correct
	 * @param int $term_taxonomy_id the id of the term taxonomy to updte. If NULL, updates ALL
	 * @global type $wpdb
	 * @return int the number of rows affected
	 */
	public function update_term_taxonomy_counts($term_taxonomy_id = NULL){
		//because this uses a subquery and sometimes assigning to column to be another column's
		//value, we just write the SQL directly.
		global $wpdb;
		if( $term_taxonomy_id ){
			$second_operand = $wpdb->prepare('%d',$term_taxonomy_id);
		}else{
			$second_operand = 'tr.term_taxonomy_id';
		}
		$rows_affected = $wpdb->query("UPDATE {$wpdb->term_taxonomy} AS tt SET count = (select count(*) as proper_count
from {$wpdb->term_relationships} AS tr WHERE tt.term_taxonomy_id = $second_operand)");
		return $rows_affected;
	}

	/**
	 * Overrides the parent to also make sure term-taxonomy counts are up-to-date after
	 * inserting
	 * @param array $field_n_values @see EEM_Base::insert
	 * @return boolean
	 */
	public function insert($field_n_values) {
		$return = parent::insert($field_n_values);
		if( isset( $field_n_values[ 'term_taxonomy_id' ] ) ) {
			$this->update_term_taxonomy_counts($field_n_values[ 'term_taxonomy_id' ] );
		}
		return $return;
	}
	/**
	 * Overrides parent so that after an update, we also check the term_taxonomy_counts are
	 * all ok
	 * @param array $fields_n_values see EEM_Base::update
	 * @param array $query_params @see EEM_Base::get_all
	 * @param boolean $keep_model_objs_in_sync if TRUE, makes sure we ALSO update model objects
	 * in this model's entity map according to $fields_n_values that match $query_params. This
	 * obviously has some overhead, so you can disable it by setting this to FALSE, but
	 * be aware that model objects being used could get out-of-sync with the database
	 * @return int
	 */
	public function update($fields_n_values, $query_params, $keep_model_objs_in_sync = TRUE) {
		$count = parent::update($fields_n_values, $query_params, $keep_model_objs_in_sync );
		if( $count ){
			$this->update_term_taxonomy_counts();
		}
		return $count;
	}
	/**
	 * Overrides parent so that after running this, we also double-check
	 * the term taxonomy counts are up-to-date
	 * @param array $query_params @see EEM_Base::get_all
	 * @param boolean $allow_blocking
	 * @return int @see EEM_Base::delete
	 */
	public function delete($query_params, $allow_blocking = true) {
		$count = parent::delete($query_params, $allow_blocking);
		if( $count ){
			$this->update_term_taxonomy_counts();
		}
		return $count;
	}


}
// End of file EEM_Term_Relationship.model.php
// Location: /includes/models/EEM_Term_Relationship.model.php