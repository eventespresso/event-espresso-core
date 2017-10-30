<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEI_Registration
 */
interface EEI_Registration extends EEI_Base
{

    /**
     * Gets the registration code
     *
     * @return string
     */
    public function reg_code();



    /**
     * Gets the attendee corresponding to this registration
     *
     * @return EEI_Attendee
     */
    public function attendee();



    /**
     * Returns the event's name this registration is for
     *
     * @return string
     */
    public function event_name();

}
// End of file EEI_Registration.interface.php
// Location: ${NAMESPACE}/EEI_Registration.interface.php