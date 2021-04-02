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
	protected static $_instance = null;

	protected function __construct($timezone = '') {
		$this->_tables = array(
			'New_Addon_Thing'=>new EE_Primary_Table('esp_new_addon_thing', 'NEW_ID')
		);
		$this->_fields = array(
			'New_Addon_Thing'=>array(
				'NEW_ID'=>new EE_Primary_Key_Int_Field('NEW_ID', __("New Addon Thing ID", 'event_espresso')),
				'NEW_name' => new EE_Plain_Text_Field('NEW_name', __('Name', 'event_espresso'), false),
				'NEW_wp_user' => new EE_WP_User_Field( 'NEW_wp_user', __( 'Things Creator', 'event_espresso' ), false )
			)
		);
		$this->_model_relations = array(
			'Attendee' => new EE_Has_Many_Relation(),
			'WP_User' => new EE_Belongs_To_Relation()
		);
		parent::__construct($timezone);
	}
}

// End of file EEM_New_Addon_Thing.model.php
