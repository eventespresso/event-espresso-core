<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
require_once( EE_MODELS . 'EEM_Base.model.php' );



/**
 * Attendee Model
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Michael Nelson
 */
class EEM_Term_Relationship extends EEM_Base {

	// private instance of the Attendee object
	protected static $_instance = null;



	/**
	 * EEM_Term_Relationship constructor.
	 *
	 * @param string $timezone
	 */
	protected function __construct( $timezone = null ) {
		$this->singular_item = __( 'Term Relationship', 'event_espresso' );
		$this->plural_item = __( 'Term Relationships', 'event_espresso' );
		$this->_tables = array(
			'Term_Relationship' => new EE_Primary_Table( 'term_relationships' ),
		);
		$models_this_can_attach_to = array_keys( EE_Registry::instance()->cpt_models() );
		$this->_fields = array(
			'Term_Relationship' => array(
				'object_id'        => new EE_Foreign_Key_Int_Field(
					'object_id',
					__( 'Object(Post) ID', 'event_espresso' ),
					false,
					0,
					$models_this_can_attach_to
				),
				'term_taxonomy_id' => new EE_Foreign_Key_Int_Field(
					'term_taxonomy_id',
					__(
						'Term (in context of a taxonomy) ID',
						'event_espresso'
					),
					false,
					0,
					'Term_Taxonomy'
				),
				'term_order'       => new EE_Integer_Field(
					'term_order', __( 'Term Order', 'event_espresso' ), false, 0
				),
			),
		);
		$this->_model_relations = array(
			'Term_Taxonomy' => new EE_Belongs_To_Relation(),
		);
		foreach ( $models_this_can_attach_to as $model_name ) {
			$this->_model_relations[ $model_name ] = new EE_Belongs_To_Relation();
		}
		$this->_indexes = array(
			'PRIMARY' => new EE_Primary_Key_Index( array( 'object_id', 'term_taxonomy_id' ) ),
		);
		$path_to_event_model = 'Event.';
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Event_Related_Public(
			$path_to_event_model
		);
		$this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Event_Related_Protected(
			$path_to_event_model
		);
		$this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Event_Related_Protected(
			$path_to_event_model
		);
		$this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Event_Related_Protected(
			$path_to_event_model, EEM_Base::caps_edit
		);
		$path_to_tax_model = 'Term_Taxonomy.';
		//add cap restrictions for editing term relations to the "ee_assign_*"
		//and for deleting term relations too
		$cap_contexts_affected = array( EEM_Base::caps_edit, EEM_Base::caps_delete );
		foreach ( $cap_contexts_affected as $cap_context_affected ) {
			$this->_cap_restrictions[ $cap_context_affected ]['ee_assign_event_category'] = new EE_Default_Where_Conditions(
				array(
					$path_to_tax_model . 'taxonomy*ee_assign_event_category' => array(
						'!=',
						'espresso_event_categories',
					),
				)
			);
			$this->_cap_restrictions[ $cap_context_affected ]['ee_assign_venue_category'] = new EE_Default_Where_Conditions(
				array(
					$path_to_tax_model . 'taxonomy*ee_assign_venue_category' => array(
						'!=',
						'espresso_venue_categories',
					),
				)
			);
			$this->_cap_restrictions[ $cap_context_affected ]['ee_assign_event_type'] = new EE_Default_Where_Conditions(
				array(
					$path_to_tax_model . 'taxonomy*ee_assign_event_type' => array( '!=', 'espresso_event_type' ),
				)
			);
		}
		parent::__construct( $timezone );
		add_filter(
			'FHEE__Read__create_model_query_params',
			array( 'EEM_Term_Relationship', 'rest_api_query_params' ),
			10,
			3
		);
	}



	/**
	 * Makes sure all term-taxonomy counts are correct
	 *
	 * @param int   $term_taxonomy_id the id of the term taxonomy to update. If NULL, updates ALL
	 * @global wpdb $wpdb
	 * @return int the number of rows affected
	 */
	public function update_term_taxonomy_counts( $term_taxonomy_id = null ) {
		//because this uses a subquery and sometimes assigning to column to be another column's
		//value, we just write the SQL directly.
		global $wpdb;
		if ( $term_taxonomy_id ) {
			$second_operand = $wpdb->prepare( '%d', $term_taxonomy_id );
		} else {
			$second_operand = 'tr.term_taxonomy_id';
		}
		$rows_affected = $this->_do_wpdb_query(
			'query',
			array(
				"
UPDATE {$wpdb->term_taxonomy} AS tt SET count = (
	select count(*) as proper_count from {$wpdb->term_relationships} AS tr WHERE tt.term_taxonomy_id = $second_operand
)",
			)
		);
		return $rows_affected;
	}



	/**
	 * Overrides the parent to also make sure term-taxonomy counts are up-to-date after
	 * inserting
	 *
	 * @param array $field_n_values @see EEM_Base::insert
	 * @return boolean
	 */
	public function insert( $field_n_values ) {
		$return = parent::insert( $field_n_values );
		if ( isset( $field_n_values['term_taxonomy_id'] ) ) {
			$this->update_term_taxonomy_counts( $field_n_values['term_taxonomy_id'] );
		}
		return $return;
	}



	/**
	 * Overrides parent so that after an update, we also check the term_taxonomy_counts are
	 * all ok
	 *
	 * @param array   $fields_n_values         see EEM_Base::update
	 * @param array   $query_params            @see EEM_Base::get_all
	 * @param boolean $keep_model_objs_in_sync if TRUE, makes sure we ALSO update model objects
	 *                                         in this model's entity map according to $fields_n_values that match
	 *                                         $query_params. This obviously has some overhead, so you can disable it
	 *                                         by setting this to FALSE, but be aware that model objects being used
	 *                                         could get out-of-sync with the database
	 * @return int
	 */
	public function update( $fields_n_values, $query_params, $keep_model_objs_in_sync = true ) {
		$count = parent::update( $fields_n_values, $query_params, $keep_model_objs_in_sync );
		if ( $count ) {
			$this->update_term_taxonomy_counts();
		}
		return $count;
	}



	/**
	 * Overrides parent so that after running this, we also double-check
	 * the term taxonomy counts are up-to-date
	 *
	 * @param array   $query_params @see EEM_Base::get_all
	 * @param boolean $allow_blocking
	 * @return int @see EEM_Base::delete
	 */
	public function delete( $query_params, $allow_blocking = true ) {
		$count = parent::delete( $query_params, $allow_blocking );
		if ( $count ) {
			$this->update_term_taxonomy_counts();
		}
		return $count;
	}



	/**
	 * Makes sure that during REST API queries, we only return term relationships
	 * for term taxonomies which should be shown in the rest api
	 *
	 * @param array    $model_query_params
	 * @param array    $querystring_query_params
	 * @param EEM_Base $model
	 * @return array
	 */
	public static function rest_api_query_params( $model_query_params, $querystring_query_params, $model ) {
		if ( $model === EEM_Term_Relationship::instance() ) {
			$taxonomies = get_taxonomies( array( 'show_in_rest' => true ) );
			if ( ! empty( $taxonomies ) ) {
				$model_query_params[0]['Term_Taxonomy.taxonomy'] = array( 'IN', $taxonomies );
			}
		}
		return $model_query_params;
	}


}
// End of file EEM_Term_Relationship.model.php
// Location: /includes/models/EEM_Term_Relationship.model.php