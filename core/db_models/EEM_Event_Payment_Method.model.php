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
 * Event Payment Method Model
 *
 * For storing the relation between events and their applicable payment methods
 * @package			Event Espresso
 * @subpackage		includes/models/EEM_Checkin.model.php
 * @author			Mike Nelson
 *
 * ------------------------------------------------------------------------
 */

class EEM_Event_Payment_Method extends EEM_Base {

	/**
	 *
	 * @var EEM_Event_Payment_Method
	 */
	private static $_instance = NULL;



	/**
	 * 		This funtion is a singleton method used to instantiate the EEM_Event_Payment_Method object
	 *
	 * 		@access public
	 * 		@return EEM_Event_Payment_Method instance
	 */
	public static function instance( $timezone ) {

		// check if instance of EEM_Checkin already exists
		if (self::$_instance === NULL) {
			// instantiate Price_model
			self::$_instance = new self( $timezone );
		}

		//set timezone if we have in incoming string
		if ( !empty( $timezone ) )
			self::$_instance->set_timezone( $timezone );
		
		return self::$_instance;
	}



	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access protected
	 * 		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 * 		@return void
	 */
	protected function __construct() {
		$this->singlular_item = __('Payment Method for Event','event_espresso');
		$this->plural_item = __('Payment Methods for Events','event_espresso');		

		$this->_tables = array(
			'Event_Payment_Method'=>new EE_Primary_Table('esp_event_payment_method','EPM_ID')
		);
		$this->_fields = array(
			'Event_Payment_Method'=> array(
				'EPM_ID'=>new EE_Primary_Key_Int_Field('EPM_ID', __("Relation ID", 'event_espresso')),
				'PMD_ID'=>new EE_Foreign_Key_Int_Field('PMD_ID', __("Related Payment Method", 'event_espresso'), false, NULL, 'Payment_Method'),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', __("Related Event", 'event_espresso'), false, NULL, 'Event'),
				'EPM_order'=>new EE_Integer_Field('EPM_order', __("Order of Payment Method for Event", 'event_espresso'), false, 0)
			)
		);
		$this->_model_relations = array(
			'Payment_Method'=>new EE_Belongs_To_Relation(),
			'Event'=>new EE_Belongs_To_Relation(),
		);
		parent::__construct();
	}
}