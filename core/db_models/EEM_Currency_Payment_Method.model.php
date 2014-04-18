<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EEM_Currency_Payment_Method
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEM_Currency_Payment_Method extends EEM_Base{
	// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Currency_Payment_Method
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
		$this->singular_item = __('Currency Usable by Payment Method','event_espresso');
		$this->plural_item = __('Currencies Usable by Payment Methods','event_espresso');
		$this->_tables = array(
			'Currency_Payment_Method'=>new EE_Primary_Table('esp_currency_payment_method','CPM_ID')
		);
		$this->_fields = array(
			'Currency_Payment_Method'=>array(
				'CPM_ID'=>new EE_Primary_Key_Int_Field('CPM_ID', __('Currency to Payment Method LInk ID','event_espresso')),
				'CUR_code'=>new EE_Foreign_Key_String_Field('CUR_code', __('Currency Code','event_espresso'), false, 0, 'Currency'),
				'PMD_ID'=>new EE_Foreign_Key_Int_Field('PMD_ID', __('Paymetn Method ID','event_espresso'), false, 0, 'Payment_Method')
			)
		);
		$this->_model_relations = array(
			'Currency'=>new EE_Belongs_To_Relation(),
			'Payment_Method'=>new EE_Belongs_To_Relation()
		);
		parent::__construct();
	}
}

// End of file EE_Currency_Payment_Method.model.php