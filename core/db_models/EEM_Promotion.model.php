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
 * Promotion Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Promotion extends EEM_Base {

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
		$this->singular_item = __('Promotion','event_espresso');
		$this->plural_item = __('Promotions','event_espresso');
		$this->_tables = array(
			'Promotion'=> new EE_Primary_Table('esp_promotion', 'PRO_ID')
		);
		$this->_fields = array(
			'Promotion'=>array(
				'PRO_ID'=>new EE_Primary_Key_Int_Field('PRO_ID', __("ID", "event_espresso")),
				'PRC_ID'=>new EE_Foreign_Key_Int_Field('PRC_ID', __("Price ID", "event_espresso"), false, 0, 'Price'),
				'PRO_scope'=>new EE_Plain_Text_Field('PRO_scope', __("Scope", "event_espresso"), false, ''),
				'PRO_start'=>new EE_Datetime_Field('PRO_start', __("Start Date/Time", "event_espresso"), true, null),
				'PRO_end'=>new EE_Datetime_Field('PRO_end', __("End Date/Time", "event_espresso"), true, null),
				'PRO_code'=>new EE_Plain_Text_Field('PRO_code', __("Code", "event_espresso"), true, ''),
				'PRO_uses'=>new EE_Integer_Field('PRO_uses', __("Times this can be used in a given scope", "event_espresso"), false,1),
				'PRO_global'=>new EE_Boolean_Field('PRO_global', __("Usable Globally?", "event_espresso"), false,false),
				'PRO_global_uses'=>new EE_Integer_Field('PRO_global_uses', __("Times it can be used in all scopes", "event_espresso"), false,0),
				'PRO_exclusive'=>new EE_Boolean_Field('PRO_exclusive', __("Exlusive? (ie, can't be used with other promotions)", "event_espresso"), false,false),
				'PRO_accept_msg'=>new EE_Simple_HTML_Field('PRO_accept_msg', __("Acceptance Message", "event_espresso"), false, __("Accepted", "event_espresso")),
				'PRO_decline_msg'=>new EE_Simple_HTML_Field('PRO_decline_msg', __("Declined Message", "event_espresso"), false,  __("Declined", "event_espresso")),
				'PRO_default'=>new EE_Boolean_Field('PRO_default', __("Usable by default on all new items within promotion's scope", "event_espresso"), false, false),
				'PRO_order'=>new EE_Integer_Field('PRO_order', __("Order", "event_espresso"), false,0),
			));
		$this->_model_relations = array(
			'Price'=>new EE_Belongs_To_Relation(),
			'Promotion_Rule'=>new EE_Has_Many_Relation(),
			'Rule'=>new EE_HABTM_Relation('Promotion_Rule'),
			'Promotion_Object'=>new EE_Has_Many_Relation()
		);
		
		parent::__construct();
	}
}
// End of file EEM_Promotion.model.php
// Location: /includes/models/EEM_Promotion.model.php