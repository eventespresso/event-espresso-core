<?php
namespace EventEspresso\core\exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class SendMessageException
 * Thrown when a message is unsuccessfully sent and cannot be retried.
 *
 * @package       Event Espresso
 * @author        Darren Ethier
 * @since         4.9.11.rc.001
 */
class SendMessageException extends \RuntimeException  {}
// End of file SendMessageException.php