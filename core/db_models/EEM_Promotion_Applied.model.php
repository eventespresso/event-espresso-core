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
 * Tracks how promotions have been used. Specifically which registrations and/or transactions.
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Promotion_Applied extends EEM_Base {

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
		$this->singular_item = __('Status','event_espresso');
		$this->plural_item = __('Stati','event_espresso');
		$this->_tables = array(
			'Promotion_Applied'=> new EE_Primary_Table('esp_promotion_applied', 'POB_ID')
		);
		$relations = array('Registration','Transaction');
		$this->_fields = array(
			'Promotion_Applied'=>array(
				'PRA_ID'=>new EE_Primary_Key_Int_Field('PRA_ID', __("Promotion-to-Item Aplied to ID", "event_espresso")),
				'PRO_ID'=>new EE_Foreign_Key_Int_Field('PRO_ID', __("Promotion Object", "event_espresso"), false, 0, 'Promotion'),
				'OBJ_ID'=>new EE_Foreign_Key_Int_Field('OBJ_ID', __("ID of the Related Object", "event_espresso"), false, 0, $relations),
				'POB_type'=>new EE_Any_Foreign_Model_Name_Field('POB_type', __("Model of Related Object", "event_espresso"),false, 'Event',$relations)				
			));
		$this->_model_relations = array(
			'Registration'=>new EE_Belongs_To_Any_Relation(),
			'Transaction'=>new EE_Belongs_To_Any_Relation(),
			'Promotion'=>new EE_Belongs_To_Relation(),
		);
		
		parent::__construct();
	}


}
// 
// End of file EEM_Promotion_Object.model.php
// Location: /includes/models/EEM_Promotion_Object.model.php