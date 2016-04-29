<?php
namespace EventEspresso\Core\Exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class BaseException
 * extended by other exceptions
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class BaseException extends \EE_Error {

	// todo extract exception logic from EE_Error and move into this class, then break extension of EE_Error

}
// End of file BaseException.php
// Location: /core/exceptions/BaseException.php