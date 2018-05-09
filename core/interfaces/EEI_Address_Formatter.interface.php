<?php

/**
 * Interface EEI_Address_Formatter
 */
interface EEI_Address_Formatter
{

    /**
     * @param string $address
     * @param string $address2
     * @param string $city
     * @param string $state
     * @param string $zip
     * @param string $country
     * @param string $CNT_ISO
     */
    public function format($address, $address2, $city, $state, $zip, $country, $CNT_ISO);
}
