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

class EEM_Term_Taxonomy extends EEM_Base {

  	// private instance of the Attendee object
	protected static $_instance = NULL;


	protected function __construct( $timezone = NULL ) {
		$this->singular_item = __('Term Taxonomy','event_espresso');
		$this->plural_item = __('Term Taxonomy','event_espresso');
		$this->_tables = array(
			'Term_Taxonomy'=> new EE_Primary_Table('term_taxonomy', 'term_taxonomy_id')
		);
		$this->_fields = array(
			'Term_Taxonomy'=>array(
				'term_taxonomy_id'=> new EE_Primary_Key_Int_Field('term_taxonomy_id', __('Term-Taxonomy ID','event_espresso')),
				'term_id'=>new EE_Foreign_Key_Int_Field('term_id',  __("Term Id", "event_espresso"), false, 0, 'Term'), //EE_Foreign_Key_Int_Field('term_taxonomy_id', __('Term (in context of a taxonomy) ID','event_espresso'), false, 0, 'Term_Taxonomy'),
				'taxonomy'=>new EE_Plain_Text_Field('taxonomy', __('Taxonomy Name','event_espresso'), false, 'category'),
				'description'=>new EE_Post_Content_Field('description', __("Description of Term", "event_espresso"), false,''),
				'parent'=>new EE_Integer_Field('parent', __("Parent Term ID", "event_espresso"), false,0),
				'term_count'=> new EE_Integer_Field('count', __("Count of Objects attached", 'event_espresso'), false, 0)
			));
		$this->_model_relations = array(
			'Term_Relationship'=>new EE_Has_Many_Relation(),
			'Term'=>new EE_Belongs_To_Relation(),
			'Event'=>new EE_HABTM_Relation('Term_Relationship'),
			'Venue'=>new EE_HABTM_Relation('Term_Relationship'),
			'Attendee'=>new EE_HABTM_Relation('Term_Relationship')
		);
		$this->_indexes = array(
			'term_id_taxonomy'=>new EE_Unique_Index(array('term_id','taxonomy'))
		);
		$path_to_tax_model = '';
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
		$this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Taxonomy_Protected( $path_to_tax_model );
		$this->_cap_restriction_generators[ EEM_Base::caps_edit ] = false;
		$this->_cap_restriction_generators[ EEM_Base::caps_delete ] = false;

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

}
// End of file EEM_Term_Taxonomy.model.php
// Location: /includes/models/EEM_Term_Taxonomy.model.php