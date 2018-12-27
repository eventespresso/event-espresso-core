<?php

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
