<?php

/**
 *
 * Class EEM_Extra_Join
 *
 * Special model that can be used as a join model between any two models. This
 * helps prevent the addition of further tables.
 * This model has two foreign keys EXJ_first_model_ID and EXJ_second_model_ID.
 * The first always points to the model which is ALPHABETICALLY LOWER than the other 
 * (ie comes earlier in the alphabet). Eg if an entry in this model's table
 * joins an event to a venue, the event id will be in EXJ_first_model_ID, and the
 * venue's id will be in EXJ_seonc_model_ID.
 * However, if the entry in this model's table joins event to attendee,
 * the attendee id will be in EXJ_first_model_ID, and the event id will be in
 * EXJ_second_model_ID. 
 *
 * @package         Event Espresso
 * @subpackage    
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

class EEM_Extra_Join extends EEM_Base{
	// private instance of the Extra Join object
	protected static $_instance = NULL;
	
	public function __construct($timezone = NULL) {
		$models_this_can_join = array_keys( EE_Registry::instance()->non_abstract_db_models );
		$this->_tables = array(
			'Extra_Join' => new EE_Primary_Table( 'esp_extra_join', 'EXJ_ID' ),
		);
		$this->_fields = array(
			'Extra_Join' => array(
				'EXJ_ID' => new EE_Primary_Key_Int_Field( 'EXJ_ID', __( 'Extra Join ID', 'event_espresso' ) ),
				'EXJ_first_model_ID' => new EE_Foreign_Key_String_Field( 'EXJ_first_model_ID', __( 'First Model ID', 'event_espresso' ), true, 0, $models_this_can_join ),
				'EXJ_first_model_name' => new EE_Any_Foreign_Model_Name_Field( 'EXJ_first_model_name', __( 'First Model Name', 'event_espresso'), true, '', $models_this_can_join ),
				'EXJ_second_model_ID' => new EE_Foreign_Key_String_Field( 'EXJ_second_model_ID', __( 'Second Model ID', 'event_espresso' ), true, 0, $models_this_can_join ),
				'EXJ_second_model_name' => new EE_Any_Foreign_Model_Name_Field( 'EXJ_second_model_name', __( 'Second Model Name', 'event_espresso'), true, '', $models_this_can_join ),
				
			)
		);
		//this model is weird in that it has two foreign key columns which can point to any model/table.
		//eg a foreign key to event will be in "EXJ_first_model_ID", provided the other
		//model linked to is alphabetically greater than event (eg venue).
		//but if the model linked to is alphabetically lower (eg attendee), 
		//the foreign key to the event will be in "EXJ_second_model_ID"
		//so normal usage of foreign keys is weird. So don't define any
		//relations to other models because they won't work properly with this model
		parent::__construct($timezone);
	}
}
