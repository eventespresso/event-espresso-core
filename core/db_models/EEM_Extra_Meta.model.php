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
 * Extra Meta Model
 * 
 * This is meta info which can be potentially attached to any model with a integer primary key. 
 * (If they have a string primary key, some further development will be needed in the code).
 * Querying on this meta data is cumbersome and difficult, but this can be used
 * to attach any arbitrary information onto any model desired. 
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Extra_Meta extends EEM_Base {

  	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This function is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Extra_Meta instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	protected function __construct(){
		$this->singular_item = __('Extra Meta','event_espresso');
		$this->plural_item = __('Extra Metas','event_espresso');
		$this->_tables = array(
			'Extra_Meta'=> new EE_Primary_Table('esp_extra_meta', 'EXM_ID')
		);
		$models_this_can_attach_to = array_keys(EE_Registry::instance()->non_abstract_db_models);
		$this->_fields = array(
			'Extra_Meta'=>array(
				'EXM_ID'=>new EE_Primary_Key_Int_Field('EXM_ID', __("Extra Meta ID", "event_espresso")),
				'OBJ_ID'=>new EE_Foreign_Key_Int_Field('OBJ_ID', __("Primary Key of Attached Thing", "event_espresso"), false, 0, $models_this_can_attach_to),
				'EXM_type'=>new EE_Any_Foreign_Model_Name_Field('EXM_type', __("Model of Attached Thing", "event_espresso"), false, 'Transaction', $models_this_can_attach_to),
				'EXM_key'=>new EE_Plain_Text_Field('EXM_key', __("Meta Key", "event_espresso"), false, ''),
				'EXM_value'=>new EE_Full_HTML_Field('EXM_value', __("Meta Value", "event_espresso"), true)
				
			));
		$this->_model_relations = array();
		foreach($models_this_can_attach_to as $model){
			$this->_model_relations[$model] = new EE_Belongs_To_Any_Relation();
		}
		
		parent::__construct();
	}


}
// End of file EEM_Extra_Meta.model.php
// Location: /includes/models/EEM_Extra_Meta.model.php