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

    /**
     * @var EEM_Mock
     */
    protected static $_instance;

    /**
     * EEM_Mock constructor.
     *
     * @param null $timezone
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public function __construct($timezone = null)
    {
        $this->_tables = array(
            'Mock' => new EE_Primary_Table('esp_mock', 'MCK_ID'),
        );
        $this->_fields = array(
            'Mock' => array(
                'MCK_ID'    => new EE_Primary_Key_Int_Field('MCK_ID', "Mock Object ID"),
                'MCK_value' => new EE_Plain_Text_Field('MCK_value', 'Mock Object Value', true),
                'MCK_datetime' => new EE_DateTime_Field('MCK_datetime', 'Mock Datetime', false, EE_Datetime_Field::now)
            ),
        );
        parent::__construct($timezone);
    }
}