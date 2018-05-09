<?php
/**
 * Check In Model
 *
 * This links Registrations with datetimes for recording Check-in's and checkouts (and attendance)
 *
 * @package         Event Espresso
 * @subpackage      includes/models/EEM_Checkin.model.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EEM_Checkin extends EEM_Base
{

    // private instance of the EEM_Checkin object
    protected static $_instance = null;



    /**
     *      private constructor to prevent direct creation
     *      @Constructor
     *      @access protected
     *      @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
     *      @return void
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item = __('Check-In', 'event_espresso');
        $this->plural_item = __('Check-Ins', 'event_espresso');

        $this->_tables = array(
            'Checkin'=>new EE_Primary_Table('esp_checkin', 'CHK_ID')
        );
        $this->_fields = array(
            'Checkin'=> array(
                'CHK_ID'=>new EE_Primary_Key_Int_Field('CHK_ID', 'Check-in ID'),
                'REG_ID'=>new EE_Foreign_Key_Int_Field('REG_ID', 'Registration Id', false, 0, 'Registration'),
                'DTT_ID'=>new EE_Foreign_Key_Int_Field('DTT_ID', 'Datetime Id', false, 0, 'Datetime'),
                'CHK_in'=>new EE_Boolean_Field('CHK_in', 'Whether a person has checked in or checked out', false, true),
                'CHK_timestamp'=>new EE_Datetime_Field('CHK_timestamp', __('When the row was modified', 'event_espresso'), false, EE_Datetime_Field::now, $timezone)
            )
        );
        $this->_model_relations = array(
            'Registration'=>new EE_Belongs_To_Relation(),
            'Datetime'=>new EE_Belongs_To_Relation()
        );
        $this->_model_chain_to_wp_user = 'Registration.Event';
        parent::__construct($timezone);
    }
}
