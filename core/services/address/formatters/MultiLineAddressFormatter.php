<?php
namespace EventEspresso\core\services\address\formatters;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class MultiLineAddressFormatter
 * This class will format an address and add line breaks in appropriate places
 *
 * @package       Event Espresso
 * @subpackage    core/services/address/formatters
 * @author        Brent Christensen
 * @since         4.8
 */
class MultiLineAddressFormatter extends AddressFormatter implements \EEI_Address_Formatter {


	/**
	 * @param string $address
	 * @param string $address2
	 * @param string $city
	 * @param string $state
	 * @param string $zip
	 * @param string $country
	 * @param string $CNT_ISO
	 * @return string
	 */
	public function format( $address, $address2, $city, $state, $zip, $country, $CNT_ISO ) {
		$address_formats = apply_filters(
			'FHEE__EE_MultiLine_Address_Formatter__address_formats',
			array(
				'CA' => "{address}%{address2}%{city}%{state}%{country}%{zip}",
				'GB' => "{address}%{address2}%{city}%{state}%{zip}%{country}",
				'US' => "{address}%{address2}%{city}%{state}%{zip}%{country}",
				'ZZ' => "{address}%{address2}%{city}%{state}%{zip}%{country}",
			)
		);
		// if the incoming country has a set format, use that, else use the default
		$formatted_address = isset( $address_formats[ $CNT_ISO ] ) ? $address_formats[ $CNT_ISO ]
			: $address_formats['ZZ'];
		return $this->parse_formatted_address(
			$address,
			$address2,
			$city,
			$state,
			$zip,
			$country,
			$formatted_address,
			'<br />'
		);
	}


}
// End of file MultiLineAddressFormatter.php
// Location: core/services/address/formatters/MultiLineAddressFormatter.php