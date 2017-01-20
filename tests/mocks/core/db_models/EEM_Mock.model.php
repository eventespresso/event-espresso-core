<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EEM_Mock
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
class EEM_Mock extends EEM_Base{
    protected static $_instance = NULL;

	public function __construct($timezone = NULL) {
		$this->_tables = array(
			'Mock'=>new EE_Primary_Table('esp_mock', 'MCK_ID')
		);
		$this->_fields = array(
			'Mock'=>array(
				'MCK_ID'=>new EE_Primary_Key_Int_Field('MCK_ID', "Mock Object ID"),
                'MCK_value' => new EE_Plain_Text_Field('MCK_value','Mock Object Value',true),
			)
		);
		parent::__construct($timezone);
	}
}

// End of file EEM_Base_Mock.model.php