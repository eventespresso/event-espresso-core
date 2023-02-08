<?php

namespace EventEspresso\core\services\address\formatters;

interface AddressFormatterInterface
{
    /**
     * @param string $address
     * @param string $address2
     * @param string $city
     * @param string $state
     * @param string $zip
     * @param string $country
     * @param string $CNT_ISO
     * @return string|null
     */
    public function format(
        $address,
        $address2,
        $city,
        $state,
        $zip,
        $country,
        $CNT_ISO
    );
}
