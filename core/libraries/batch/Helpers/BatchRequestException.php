<?php 
 /**
 *
 * Class BatchRequestException
 *
 * Exception class for whenever we have trouble running start, continuing, or finishing
 * a batch job.
 *
 * @package         Event Espresso
 * @subpackage    batch
 * @author				Mike Nelson
 * @since		 	   4.8.26
 *
 */
namespace EventEspressoBatchRequest\Helpers;
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

class BatchRequestException extends \Exception{
	//so far the same as exception
}

