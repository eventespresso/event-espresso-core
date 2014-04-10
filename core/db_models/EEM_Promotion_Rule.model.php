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
 * Promotion-Rule join Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Promotion_Rule extends EEM_Base {

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
		$this->singular_item = __('Promotion-Rule-Relation','event_espresso');
		$this->plural_item = __('Promotion-Rule-Relation','event_espresso');
		$this->_tables = array(
			'Promotion_Rule'=> new EE_Primary_Table('esp_promotion_rule', 'PRR_ID')
		);
		$this->_fields = array(
			'Status'=>array(
				'PRR_ID'=>new EE_Primary_Key_Int_Field('PRR_ID', __("Relation ID between Promotion and Rule", "event_espresso")),
				'PRO_ID'=>new EE_Foreign_Key_Int_Field('PRO_ID', __("Promotion ID", "event_espresso"), true, null, 'Promotion'),
				'RUL_ID'=>new EE_Foreign_Key_Int_Field('RUL_ID', __("Rule ID", "event_espresso"), true, null, 'Rule'),
				'PRR_order'=>new EE_Integer_Field('PRR_order', __("Order of this Rule in applying to the Promotion", "event_espresso"), false,0),
				'PRR_add_rule_comparison'=>new EE_Enum_Text_Field('PRR_add_rule_comparison', __("Comparision Operator", "event_espresso"), false, 'AND', 
						array('AND'=>  __("And", "event_espresso"),'OR'=>  __("Or", "event_espresso")))
			));
		$this->_model_relations = array(
			'Promotion'=>new EE_Belongs_To_Relation(),
			'Rule'=>new EE_Belongs_To_Relation()
		);
		
		parent::__construct();
	}


}
// End of file EEM_Promotion_Rule.model.php
// Location: /includes/models/EEM_Promotion_Rule.model.php