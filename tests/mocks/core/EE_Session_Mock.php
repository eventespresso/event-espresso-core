<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Session_Mock
 *
 * For unit testing EE_Session
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Brent Christensen
 * @since                4.7
 *
 */
class EE_Session_Mock extends EE_Session {

	/**
	 * protected constructor to prevent direct creation
	 * @Constructor
	 * @access protected
	 * @param \EE_Encryption $encryption
	 */
	protected function __construct( EE_Encryption $encryption = null ) {
	}

}
// End of file EE_Session_Mock.php
// Location: /tests/mocks/core/EE_Session_Mock.php