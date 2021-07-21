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
class EEME_Mock_Attendee extends EEME_Base{
	function __construct() {
		$this->_model_name_extended = 'Attendee';
		$this->_extra_tables = array(
			'Mock_Attendee_Meta' => new EE_Secondary_Table('esp_mock_attendee_meta', 'MATTM_ID', 'ATT_ID' )
		);
		$this->_extra_fields = array('Mock_Attendee_Meta'=>array(
			'MATTM_ID'=> new EE_DB_Only_Int_Field('MATTM_ID', esc_html__('Mock Attendee Meta Row ID','event_espresso'), false),
			'MATT_ID_fk'=>new EE_DB_Only_Int_Field('ATT_ID', esc_html__("Foreign Key to Attendee in Post Table", "event_espresso"), false),
			'ATT_foobar'=>new EE_Foreign_Key_Int_Field('ATT_foobar', esc_html__("Foobar", 'event_espresso'), true,0,'Transaction')));
		$this->_extra_relations = array('Transaction'=>new EE_Belongs_To_Relation());
		parent::__construct();
	}
	function ext_foobar( $arg1 = FALSE ){
		return $this->_->get_all(array(array('Transaction.TXN_ID'=>$arg1)));
	}
}

// End of file EEME_Mock_Attendee.model_ext.php