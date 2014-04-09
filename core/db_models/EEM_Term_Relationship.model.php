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
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
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



}
// End of file EEM_Term_Relationship.model.php
// Location: /includes/models/EEM_Term_Relationship.model.php