<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EEM_New_Addon_Thing
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEM_New_Addon_Thing extends EEM_Base{
	// private instance of the EEM_New_Addon_Thing object
	private static $_instance = NULL;

	public function __construct($timezone = NULL) {
		$this->_tables = array(
			'New_Addon_Thing'=>new EE_Primary_Table('esp_new_addon_thing', 'NEW_ID')
		);
		$this->_fields = array(
			'New_Addon_Thing'=>array(
				'NEW_ID'=>new EE_Primary_Key_Int_Field('NEW_ID', __("New Addon Thing ID", 'event_espresso')),
				'NEW_name' => new EE_Plain_Text_Field('NEW_name', __('Name', 'event_espresso'), FALSE)
			)
		);
		$this->_model_relations = array(
			'Attendee' => new EE_Has_Many_Relation(),
		);
		parent::__construct($timezone);
	}
	/**
	 *		This function is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_New_Addon_Thing instance
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
	 * resets the model and returns it
	 * @return EEM_New_Addon_Thing
	 */
	public static function reset(){
		self::$_instance = NULL;
		return self::instance();
	}
}

// End of file EEM_New_Addon_Thing.model.php