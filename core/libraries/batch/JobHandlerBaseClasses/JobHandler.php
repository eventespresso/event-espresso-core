<?php
/**
 *
 * Class JobHandler
 *
 * Base class for common implementations of JobHandlerInterface.
 *
 * @package         Event Espresso
 * @subpackage    batch
 * @author				Mike Nelson
 * @since		 	   4.8.26
 *
 */
namespace EventEspressoBatchRequest\JobHandlerBaseClasses;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



abstract class JobHandler implements JobHandlerInterface {
	//so far no common methods or properties
}

