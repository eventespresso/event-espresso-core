<?php

namespace EventEspresso\core\services\address;

use EE_Country;
use EE_State;

/**
 * Interface AddressInterface
 */
interface AddressInterface
{
    /**
     * @return string
     */
    public function address();


    /**
     * @return string
     */
    public function address2();


    /**
     * @return string
     */
    public function city();


    /**
     * @return \EE_State|null
     */
    public function state_obj();


    /**
     * @return int
     */
    public function state_ID();


    /**
     * @return string
     */
    public function state_name();


    /**
     * @return string
     */
    public function state_abbrev();


    /**
     * @return string
     */
    public function state();


    /**
     * @return \EE_Country|null
     */
    public function country_obj();


    /**
     * @return string
     */
    public function country_ID();


    /**
     * @return string
     */
    public function country_name();


    /**
     * @return string
     */
    public function country();


    /**
     * @return string
     */
    public function zip();
}
