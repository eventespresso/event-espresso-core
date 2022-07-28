<?php

namespace EventEspresso\core\services\address\formatters;

/**
 * Class AddressFormatter
 * Base class for address formatters
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.8
 */
class AddressFormatter
{
    // phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    /**
     * @param string $address
     * @param string $address2
     * @param string $city
     * @param string $state
     * @param string $zip
     * @param string $country
     * @param string $formatted_address
     * @param string $sub
     * @return string
     */
    protected function parse_formatted_address(
        string $address,
        string $address2,
        string $city,
        string $state,
        string $zip,
        string $country,
        string $formatted_address,
        string $sub
    ): string {
        // swap address part placeholders for the real text
        $formatted_address = str_replace(
            // find
            array('{address}', '{address2}', '{city}', '{state}', '{zip}', '{country}'),
            // replace
            array($address, $address2, $city, $state, $zip, $country),
            // string
            $formatted_address
        );
        // remove placeholder from start and end, reduce repeating placeholders to singles, then replace with HTML line breaks
        return preg_replace('/%+/', $sub, trim($formatted_address, '%'));
    }
}
