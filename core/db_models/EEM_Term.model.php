<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
require_once ( EE_MODELS . 'EEM_Base.model.php' );

/**
 *
 * class EEM_Term
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEM_Term extends EEM_Base {

  	// private instance of the Attendee object
	protected static $_instance = NULL;


	/**
	 *__construct
	 */
	protected function __construct( $timezone = NULL ) {
		$this->singular_item = __('Term','event_espresso');
		$this->plural_item = __('Terms','event_espresso');
		$this->_tables = array(
			'Term'=> new EE_Primary_Table('terms', 'term_id')
		);
		$this->_fields = array(
			'Term'=>array(
				'term_id'=> new EE_Primary_Key_Int_Field('term_id', __('Term ID','event_espresso')),
				'name'=>new EE_Plain_Text_Field('name',__('Term Name','event_espresso'),false, ''),
				'slug'=>new EE_Slug_Field('slug', __('Term Slug','event_espresso'), false),
				'term_group'=>new EE_Integer_Field('term_group', __("Term Group", "event_espresso"), false, 0)
			));
		$this->_model_relations = array(
			'Term_Taxonomy'=>new EE_Has_Many_Relation(),
		);
		$path_to_tax_model = 'Term_Taxonomy';
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
		$this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Taxonomy_Protected( $path_to_tax_model );
		$this->_cap_restriction_generators[ EEM_Base::caps_edit ] = false;
		$this->_cap_restriction_generators[ EEM_Base::caps_delete ] = false;

		$path_to_tax_model = $path_to_tax_model . '.';
		//add cap restrictions for editing relating to the "ee_edit_*"
		$this->_cap_restrictions[ EEM_Base::caps_edit ]['ee_edit_event_category'] = new EE_Default_Where_Conditions(
				array(
					$path_to_tax_model . 'taxonomy*ee_edit_event_category' => array( '!=', 'espresso_event_categories' )
				));
		$this->_cap_restrictions[ EEM_Base::caps_edit ]['ee_edit_venue_category'] = new EE_Default_Where_Conditions(
				array(
					$path_to_tax_model . 'taxonomy*ee_edit_venue_category' => array( '!=', 'espresso_venue_categories' )
				));
		$this->_cap_restrictions[ EEM_Base::caps_edit ]['ee_edit_event_type'] = new EE_Default_Where_Conditions(
				array(
					$path_to_tax_model . 'taxonomy*ee_edit_event_type' => array( '!=', 'espresso_event_type' )
				));

		//add cap restrictions for deleting relating to the "ee_deleting_*"
		$this->_cap_restrictions[ EEM_Base::caps_delete ]['ee_delete_event_category'] = new EE_Default_Where_Conditions(
				array(
					$path_to_tax_model . 'taxonomy*ee_delete_event_category' => array( '!=', 'espresso_event_categories' )
				));
		$this->_cap_restrictions[ EEM_Base::caps_delete ]['ee_delete_venue_category'] = new EE_Default_Where_Conditions(
				array(
					$path_to_tax_model . 'taxonomy*ee_delete_venue_category' => array( '!=', 'espresso_venue_categories' )
				));
		$this->_cap_restrictions[ EEM_Base::caps_delete ]['ee_delete_event_type'] = new EE_Default_Where_Conditions(
				array(
					$path_to_tax_model . 'taxonomy*ee_delete_event_type' => array( '!=', 'espresso_event_type' )
				));

		parent::__construct( $timezone );
	}




	/**
	 * retrieves a list of all EE event categories
	 *
	 * @access public
	 */
	public function get_all_ee_categories( $show_uncategorized = FALSE ) {

		$where_params = array(
			'Term_Taxonomy.taxonomy' => 'espresso_event_categories',
			'NOT' => array( 'name' => __( 'Uncategorized', 'event_espresso' ))
		);

		if ( $show_uncategorized ) {
			unset( $where_params['NOT'] );
		}

	 	return EEM_Term::instance()->get_all( array(
			$where_params,
			'order_by' => array( 'name' => 'ASC' )
		));
	}



	/**
	 * retrieves a list of all post_tags associated with an EE CPT
	 *
	 * @access public
	 * @param string $post_type
	 * @return array
	 */
	public function get_all_CPT_post_tags( $post_type = '' ) {
		switch( $post_type ) {
			case 'espresso_events' :
				return $this->get_all_event_post_tags();
				break;
			case 'espresso_venues' :
				return $this->get_all_venue_post_tags();
				break;
			default :
				$event_tags = $this->get_all_event_post_tags();
				$venue_tags = $this->get_all_venue_post_tags();
				return array_merge( $event_tags, $venue_tags );
		}
		return array();
	}



	/**
	 * get_all_event_post_tags
	 *
	 * @return EE_Soft_Delete_Base_Class[]
	 */
	public function get_all_event_post_tags() {
	 	$post_tags = EEM_Term::instance()->get_all( array(
			array(
				'Term_Taxonomy.taxonomy' => 'post_tag',
				'Term_Taxonomy.Event.post_type' => 'espresso_events',
			),
			'order_by' => array( 'name' => 'ASC' ),
			'force_join' => array( 'Term_Taxonomy.Event' )
		));
		foreach ( $post_tags as $key => $post_tag ) {
			if ( ! isset( $post_tags[ $key ]->post_type )) {
				$post_tags[ $key ]->post_type = array();
			}
			$post_tags[ $key ]->post_type[] = 'espresso_events';
		}
		return $post_tags;
//		return array( 'espresso_events' => $post_tags );
	}



	/**
	 * get_all_venue_post_tags
	 *
	 * @return EE_Soft_Delete_Base_Class[]
	 */
	public function get_all_venue_post_tags() {
		$post_tags = EEM_Term::instance()->get_all( array(
			array(
				'Term_Taxonomy.taxonomy' => 'post_tag',
				'Term_Taxonomy.Venue.post_type' => 'espresso_venues',
			),
			'order_by' => array( 'name' => 'ASC' ),
			'force_join' => array( 'Term_Taxonomy' )
		));
		foreach ( $post_tags as $key => $post_tag ) {
			if ( ! isset( $post_tags[ $key ]->post_type )) {
				$post_tags[ $key ]->post_type = array();
			}
			$post_tags[ $key ]->post_type[] = 'espresso_venues';
		}
		return $post_tags;
//		return array( 'espresso_venues' => $post_tags );
	}




}
// End of file EEM_Term.model.php
// Location: /includes/models/EEM_Term.model.php