<?php
namespace EventEspresso\core\services\address\formatters;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class NullAddressFormatter
 * This class will return null
 *
 * @package       Event Espresso
 * @subpackage    core/services/address/formatters
 * @author        Brent Christensen
 * @since         $VID:$
 */
class NullAddressFormatter implements \EEI_Address_Formatter {

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
		return null;
	}

}
// End of file NullAddressFormatter.php
// Location: core/services/address/formatters/NullAddressFormatter.php