<?php
namespace EventEspresso\core\services\capabilities;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CapabilitiesChecker
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class CapabilitiesChecker {

	/**
	 * @type \EE_Capabilities $capabilities
	 */
	private $capabilities;



	/**
	 * CapabilitiesChecker constructor
	 *
	 * @param \EE_Capabilities $capabilities
	 */
	public function __construct( \EE_Capabilities $capabilities ) {
 		$this->capabilities = $capabilities;
	}



	/**
	 * @return \EE_Capabilities
	 */
	protected function capabilities() {
		return $this->capabilities;
	}



}
// End of file CapabilitiesChecker.php
// Location: /CapabilitiesChecker.php