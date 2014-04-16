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
 * Rule Model (which applies to the usage of promotions)
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Rule extends EEM_Soft_Delete_Base {

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
		$this->singular_item = __('Rule','event_espresso');
		$this->plural_item = __('Rules','event_espresso');
		$this->_tables = array(
			'Rule'=> new EE_Primary_Table('esp_rule', 'PRR_ID')
		);
		$this->_fields = array(
			'Rule'=>array(
				'RUL_ID'=>new EE_Primary_Key_Int_Field('RUL_ID', __("ID", "event_espresso")),
				'RUL_name'=>new EE_Plain_Text_Field('RUL_name', __("Name", "event_espresso"), false, ''),
				'RUL_desc'=>new EE_Simple_HTML_Field('RUL_desc', __("Description", "event_espresso"), false,''),
				'RUL_trigger'=>new EE_Plain_Text_Field('RUL_trigger', __("Trigger", "event_espresso"), false,''),
				'RUL_trigger_type'=>new EE_Plain_Text_Field('RUL_trigger_type', __("Trigger Type", "event_espresso"), false,''),
				'RUL_comparison'=>new EE_Enum_Text_Field('RUL_comparison', __("Comparison", "event_espresso"), false, '=', 
						array(
							'='=>  __("=", "event_espresso"),
							'!='=>  __("!=", "event_espresso"),
							'<'=>  __("<", "event_espresso"),
							'>'=>  __(">", "event_espresso"))),
				'RUL_value'=>new EE_Plain_Text_Field('RUL_value', __("Value", "event_espresso"), true),
				'RUL_value_type'=>new EE_Plain_Text_Field('RUL_value_type', __("Value Type", "event_espresso"), true),
				'RUL_is_active'=>new EE_Boolean_Field('RUL_is_active', __("Is Active?", "event_espresso"), false,true),
				'RUL_archived'=>new EE_Trashed_Flag_Field('RUL_archived', __("Archived?", "event_espresso"), false, false)
				
				));
		$this->_model_relations = array(
			'Promotion'=>new EE_HABTM_Relation('Promotion_Rule'),
			'Promotion_Rule'=>new EE_Has_Many_Relation(),
		);
		
		parent::__construct();
	}


}
// End of file EEM_Rule.model.php
// Location: /includes/models/EEM_Rule.model.php