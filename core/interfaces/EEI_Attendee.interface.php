<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEI_Attendee
 */
interface EEI_Attendee
{

    public function fname();



    public function lname();



    public function full_name();



    public function email();



    public function phone();



    public function address();



    public function address2();



    public function city();



    public function state_ID();



    public function state_name();



    /**
     * @return EE_State
     */
    public function state_obj();



    public function country_ID();



    public function country_name();



    /**
     * @return EE_Country
     */
    public function country_obj();



    public function zip();

}
// End of file EEI_Attendee.interface.php
// Location: ${NAMESPACE}/EEI_Attendee.interface.php