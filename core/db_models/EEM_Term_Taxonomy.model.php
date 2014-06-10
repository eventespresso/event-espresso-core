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

	/**
	 * Resets the model and returns it
	 * @return EEM_Term_Taxonomy
	 */
	public static function reset(){
		self::$_instance = NULL;
		return self::instance();
	}

	protected function __construct(){
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
				'description'=>new EE_Simple_HTML_Field('description', __("Description of Term", "event_espresso"), false,''),
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

		parent::__construct();
	}




}
// End of file EEM_Term_Taxonomy.model.php
// Location: /includes/models/EEM_Term_Taxonomy.model.php