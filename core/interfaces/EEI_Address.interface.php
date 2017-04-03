<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEI_Address
 */
interface EEI_Address
{

    public function address();



    public function address2();



    public function city();



    /**
     * @return EE_State
     */
    public function state_obj();



    public function state_ID();



    public function state_name();



    public function state_abbrev();



    public function state();



    /**
     * @return EE_Country
     */
    public function country_obj();



    public function country_ID();



    public function country_name();



    public function country();



    public function zip();
}
// End of file EEI_Address.interface.php
// Location: core/interfaces/EEI_Address.interface.php