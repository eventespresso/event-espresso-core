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
 * STatus Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Status extends EEM_Base {

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
		$this->singlular_item = __('Status','event_espresso');
		$this->plural_item = __('Stati','event_espresso');
		$this->_tables = array(
			'Status'=> new EE_Primary_Table('esp_status', 'STS_ID')
		);
		$this->_fields = array(
			'Status'=>array(
				'STS_ID'=> new EE_Primary_Key_String_Field('STS_ID', __('Status ID','event_espresso')),
				'STS_code'=>new EE_Plain_Text_Field('STS_code',__('Status Code','event_espresso'),false, ''),
				'STS_type'=>new EE_Enum_Text_Field('STS_type', __("Type", "event_espresso"), false, 'event', 
						array(
							'event'=> __("Event", "event_espresso"),//deprecated
							'registration'=>  __("Registration", "event_espresso"),
							'transaction'=>  __("Transaction", "event_espresso"),
							'payment'=>  __("Payment", "event_espresso"),
							'email'=>  __("Email", "event_espresso")
						)),
				'STS_can_edit'=>new EE_Boolean_Field('STS_can_edit', __('Editable?','event_espresso'), false),
				'STS_desc'=>new EE_Simple_HTML_Field('STS_desc', __("Description", "event_espresso"), false, ''),
				'STS_open'=>new EE_Boolean_Field('STS_open', __("Open?", "event_espresso"), false,false)
			));
		$this->_model_relations = array(
			'Registration'=>new EE_Has_Many_Relation(),
			'Transaction'=>new EE_Has_Many_Relation(),
			'Payment'=>new EE_Has_Many_Relation()
		);
		
		parent::__construct();
	}



	public static function localized_status(  $status_id, $plural = FALSE ) {
		//just showing a couple status for example purposes.
		$translation_array = array(
	     	EEM_Registration::status_id_pending_payment => array(
				__('Pending Payment', 'event_espresso'), //singular
				__('Pending Payments', 'event_espresso') //plural
				),
	  		EEM_Registration::status_id_approved => array(
	  			__('Approved', 'event_espresso'), //singular
	  			__('Approved', 'event_espresso') //plural
	  			),
	  		EEM_Registration::status_id_not_approved => array(
	  			__('Not Approved', 'event_espresso'),
	  			__('Not Approved', 'event_espresso')
	  			),
	  		EEM_Registration::status_id_cancelled => array(
	  			__('Cancelled', 'event_espresso'),
	  			__('Cancelled', 'event_espresso')
	  			),
	  		EEM_Registration::status_id_declined => array(
	  			__('Declined', 'event_espresso'),
	  			__('Declined', 'event_espresso')
	  			),
	  		EEM_Transaction::complete_status_code => array(
	  			__('Complete', 'event_espresso'),
	  			__('Complete', 'event_espresso')
	  			),
	  		EEM_Transaction::incomplete_status_code => array(
	  			__('Incomplete', 'event_espresso'),
	  			__('Incomplete', 'event_espresso')
	  			),
	  		EEM_Transaction::open_status_code => array(
	  			__('Open', 'event_espresso'),
	  			__('Open', 'event_espresso')
	  			),
	  		EEM_Transaction::overpaid_status_code => array(
	  			__('Overpaid', 'event_espresso'),
	  			__('Overpaid', 'event_espresso')
	  			),
	  		EEM_Payment::status_id_approved => array(
	  			__('Approved', 'event_espresso'),
	  			__('Approved', 'event_espresso')
	  			),
	  		EEM_Payment::status_id_pending => array(
	  			__('Pending', 'event_espresso'),
	  			__('Pending', 'event_espresso')
	  			),
	  		EEM_Payment::status_id_cancelled => array(
	  			__('Cancelled', 'event_espresso'),
	  			__('Cancelled', 'event_espresso')
	  			),
	  		EEM_Payment::status_id_declined => array(
	  			__('Declined', 'event_espresso'),
	  			__('Declined', 'event_espresso')
	  			),
	  		EEM_Payment::status_id_failed => array(
	  			__('Failed', 'event_espresso'),
	  			__('Failed', 'event_espresso')
	  			)
	    );

	    $status_id = (array) $status_id;

	    $translation = array();

	    foreach ( $status_id as $id ) {
	    	$translation[$id] = $plural ? $translation_array[$id][1] : $translation_array[$id][0];
	    }

	    return $translation;
	}


}
// End of file EEM_Status.model.php
// Location: /includes/models/EEM_Status.model.php