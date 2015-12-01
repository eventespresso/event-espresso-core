<?php

/**
 *
 * Class EEM_Extra_Join
 *
 * Description here
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
		foreach($models_this_can_join as $model){
			$this->_model_relations[$model] = new EE_Belongs_To_Any_Relation();
		}
		parent::__construct($timezone);
	}
}
