<?php

namespace EventEspresso\core\services\address\formatters;

/**
 * Class NullAddressFormatter
 * This class will return null
 *
 * @package       Event Espresso
 * @subpackage    core/services/address/formatters
 * @author        Brent Christensen
 */
class NullAddressFormatter implements AddressFormatterInterface
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
        string $address,
        string $address2,
        string $city,
        string $state,
        string $zip,
        string $country,
        string $CNT_ISO
    ): ?string {
        return null;
    }
}
