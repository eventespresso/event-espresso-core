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


	/**
	 * This method provides the localized singular or plural string for a given status id
	 * @param  array   $statuses  This should be an array of statuses in the format array( $status_id, $status_code ).  That way if there isn't a translation in the index we'll return the default code.
	 * @param  boolean $plural    Whether to return plural string or not. Note, nearly all of the plural strings are the same as the singular (in English), however, this may NOT be the case with other languages
	 * @return array             an array of translated strings for the incoming status id.
	 */
	public static function localized_status(  $statuses, $plural = FALSE ) {
		$translation_array = array(
	     	EEM_Registration::status_id_pending_payment => array(
				__('PENDING PAYMENT', 'event_espresso'), //singular
				__('PENDING PAYMENTS', 'event_espresso') //plural
				),
	  		EEM_Registration::status_id_approved => array(
	  			__('APPROVED', 'event_espresso'), //singular
	  			__('APPROVED', 'event_espresso') //plural
	  			),
	  		EEM_Registration::status_id_not_approved => array(
	  			__('NOT APPROVED', 'event_espresso'),
	  			__('NOT APPROVED', 'event_espresso')
	  			),
	  		EEM_Registration::status_id_cancelled => array(
	  			__('CANCELLED', 'event_espresso'),
	  			__('CANCELLED', 'event_espresso')
	  			),
	  		EEM_Registration::status_id_declined => array(
	  			__('DECLINED', 'event_espresso'),
	  			__('DECLINED', 'event_espresso')
	  			),
	  		EEM_Transaction::complete_status_code => array(
	  			__('COMPLETE', 'event_espresso'),
	  			__('COMPLETE', 'event_espresso')
	  			),
	  		EEM_Transaction::incomplete_status_code => array(
	  			__('INCOMPLETE', 'event_espresso'),
	  			__('INCOMPLETE', 'event_espresso')
	  			),
	  		EEM_Transaction::open_status_code => array(
	  			__('OPEN', 'event_espresso'),
	  			__('OPEN', 'event_espresso')
	  			),
	  		EEM_Transaction::overpaid_status_code => array(
	  			__('OVERPAID', 'event_espresso'),
	  			__('OVERPAID', 'event_espresso')
	  			),
	  		EEM_Payment::status_id_approved => array(
	  			__('APPROVED', 'event_espresso'),
	  			__('APPROVED', 'event_espresso')
	  			),
	  		EEM_Payment::status_id_pending => array(
	  			__('PENDING', 'event_espresso'),
	  			__('PENDING', 'event_espresso')
	  			),
	  		EEM_Payment::status_id_cancelled => array(
	  			__('CANCELLED', 'event_espresso'),
	  			__('CANCELLED', 'event_espresso')
	  			),
	  		EEM_Payment::status_id_declined => array(
	  			__('DECLINED', 'event_espresso'),
	  			__('DECLINED', 'event_espresso')
	  			),
	  		EEM_Payment::status_id_failed => array(
	  			__('FAILED', 'event_espresso'),
	  			__('FAILED', 'event_espresso')
	  			)
	    );

		$translation_array = apply_filters( 'FHEE__EEM_Status__localized_status__translation_array', $translation_array );

		if ( !is_array($statuses) )
			throw new EE_Error( __('The incoming statuses argument must be an array with keys as the $status_id and values as the $status_code', 'event_espresso') );

	    $translation = array();

	    foreach ( $statuses as $id => $code ) {
	    	if ( isset( $translation_array[$id] ) ) {
	    		$translation[$id] = $plural ? $translation_array[$id][1] : $translation_array[$id][0];
	    	} else {
	    		$translation[$id] = $code;
	    	}
	    }

	    return $translation;
	}


}
// End of file EEM_Status.model.php
// Location: /includes/models/EEM_Status.model.php