<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EEE_Mock_Attendee extends EE_Attendee
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEE_New_Addon_Attendee extends EEE_Base_Class{

	public function __construct(){
		$this->_model_name_extended = 'Attendee';
		parent::__construct();
	}

	/**
	 * Samples function that can be called on any EE_Attendee when this class extension
	 * is registered
	 * @param type $txn_id
	 * @return boolean
	 */
	function ext_foobar( $txn_id = FALSE ){
		return TRUE;
	}
}

// End of file EEE_Mock_Attendee.php