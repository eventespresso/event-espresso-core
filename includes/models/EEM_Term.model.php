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

class EEM_Term extends EEM_Base {

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
		$this->singlular_item = __('Term','event_espresso');
		$this->plural_item = __('Terms','event_espresso');
		$this->_tables = array(
			'Term'=> new EE_Primary_Table('terms', 'term_id')
		);
		$this->_fields = array(
			'Term'=>array(
				'term_id'=> new EE_Primary_Key_Int_Field('term_id', __('Term ID','event_espresso'), false),
				'name'=>new EE_Plain_Text_Field('name',__('Term Name','event_espresso'),false, ''),
				'slug'=>new EE_Slug_Field('slug', __('Term Slug','event_espresso'), false),
				'term_group'=>new EE_Integer_Field('term_group', __("Term Group", "event_espresso"), false, 0)
			));
		$this->_model_relations = array(
			'Term_Taxonomy'=>new EE_Has_Many_Relation(),
		);
		
		parent::__construct();
	}



	/**
	 * defines  table name as a constant
	 * @access public
	 */
	public function define_table_name() { }


}
// End of file EEM_Answer.model.php
// Location: /includes/models/EEM_Answer.model.php
