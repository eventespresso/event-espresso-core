<?php

namespace EventEspresso\core\services\address\formatters;

/**
 * Class InlineAddressFormatter
 * This class will format an address and add commas in appropriate places
 *
 * @package       Event Espresso
 * @subpackage    core/services/address/formatters
 * @author        Brent Christensen
 * @since         4.8
 */
class InlineAddressFormatter extends AddressFormatter implements AddressFormatterInterface
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
        $address_formats = apply_filters(
            'FHEE__EE_Inline_Address_Formatter__address_formats',
            array(
                'CA'  => "{address}%{address2}%{city}%{state}%{country}%{zip}",
                'GB'  => "{address}%{address2}%{city}%{state}%{zip}%{country}",
                'US'  => "{address}%{address2}%{city}%{state}%{zip}%{country}",
                'ZZZ' => "{address}%{address2}%{city}%{state}%{zip}%{country}",
            )
        );
        // if the incoming country has a set format, use that, else use the default
        $formatted_address = $address_formats[ $CNT_ISO ] ?? $address_formats['ZZZ'];
        return $this->parse_formatted_address(
            $address,
            $address2,
            $city,
            $state,
            $zip,
            $country,
            $formatted_address,
            ', '
        );
    }
}
