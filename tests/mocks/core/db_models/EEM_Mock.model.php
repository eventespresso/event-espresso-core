<?php

/**
 * EEM_Mock
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EEM_Mock extends EEM_Base
{

    public function __construct($timezone = null)
    {
        $this->_tables = array(
            'Mock' => new EE_Primary_Table('esp_mock', 'MCK_ID'),
        );
        $this->_fields = array(
            'Mock' => array(
                'MCK_ID'    => new EE_Primary_Key_Int_Field('MCK_ID', "Mock Object ID"),
                'MCK_value' => new EE_Plain_Text_Field('MCK_value', 'Mock Object Value', true),
            ),
        );
        parent::__construct($timezone);
    }
}