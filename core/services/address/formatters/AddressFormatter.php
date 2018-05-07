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
     * @return mixed
     */
    protected function parse_formatted_address(
        $address,
        $address2,
        $city,
        $state,
        $zip,
        $country,
        $formatted_address,
        $sub
    ) {
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
