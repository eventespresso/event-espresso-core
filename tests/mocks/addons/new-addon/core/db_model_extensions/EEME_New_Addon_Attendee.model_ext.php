<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EEME_Mock_Attendee extends EEM_Attendee and adds a function named 'new_func' onto it
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEME_New_Addon_Attendee extends EEME_Base{
	function __construct() {
		$this->_model_name_extended = 'Attendee';
		$this->_extra_fields = array('Attendee_Meta'=>array('ATT_foobar'=>new EE_Foreign_Key_Int_Field('ATT_foobar', __("Foobar", 'event_espresso'), true,0,'New_Addon_Thing')));
		$this->_extra_relations = array('New_Addon_Thing'=>new EE_Belongs_To_Relation());
		parent::__construct();
	}
	function ext_get_all_new_things( $arg1 = FALSE ){
		return $this->_->get_all(array(array('New_Addon_Thing.NEW_ID'=>$arg1)));
	}
}

// End of file EEME_Mock_Attendee.model_ext.php