<?php

/**
 * Check In Model
 *
 * This links Registrations with datetimes for recording Check-in's and checkouts (and attendance)
 *
 * @package         Event Espresso
 * @subpackage      includes/models/EEM_Checkin.model.php
 * @author          Darren Ethier
 */
class EEM_Checkin extends EEM_Base
{
    // private instance of the EEM_Checkin object
    protected static $_instance;


    /**
     * private constructor to prevent direct creation
     *
     * @param string $timezone string representing the timezone we want to set for returned Date Time Strings
     *                         (and any incoming timezone data that gets saved).
     *                         Note this just sends the timezone info to the date time model field objects.
     *                         Default is NULL
     *                         (and will be assumed using the set timezone in the 'timezone_string' wp option)
     * @throws EE_Error
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Check-In', 'event_espresso');
        $this->plural_item = esc_html__('Check-Ins', 'event_espresso');

        $this->_tables = array(
            'Checkin' => new EE_Primary_Table('esp_checkin', 'CHK_ID')
        );
        $this->_fields = array(
            'Checkin' => array(
                'CHK_ID' => new EE_Primary_Key_Int_Field(
                    'CHK_ID',
                    esc_html__('Check-in ID', 'event_espresso')
                ),
                'REG_ID' => new EE_Foreign_Key_Int_Field(
                    'REG_ID',
                    esc_html__('Registration Id', 'event_espresso'),
                    false,
                    0,
                    'Registration'
                ),
                'DTT_ID' => new EE_Foreign_Key_Int_Field(
                    'DTT_ID',
                    esc_html__('Datetime Id', 'event_espresso'),
                    false,
                    0,
                    'Datetime'
                ),
                'CHK_in' => new EE_Boolean_Field(
                    'CHK_in',
                    esc_html__('Whether a person has checked in or checked out', 'event_espresso'),
                    false,
                    true
                ),
                'CHK_timestamp' => new EE_Datetime_Field(
                    'CHK_timestamp',
                    esc_html__('When the row was modified', 'event_espresso'),
                    false,
                    EE_Datetime_Field::now,
                    $timezone
                )
            )
        );
        $this->_model_relations = array(
            'Registration' => new EE_Belongs_To_Relation(),
            'Datetime' => new EE_Belongs_To_Relation()
        );
        $this->_model_chain_to_wp_user = 'Registration.Event';
        parent::__construct($timezone);
    }
}
