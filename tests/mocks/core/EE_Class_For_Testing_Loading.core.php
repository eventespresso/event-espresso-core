<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Class_For_Testing_Loading
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				$VID:$
 *
 */

class EE_Class_For_Testing_Loading {

	// This class is for testing whether or not \EE_Registry::_require_file() is functioning properly
	// and therefore PLZ DO NOT LOAD THIS FILE FOR ANY OTHER PURPOSES
	// you see, we need this file to NOT be loaded in order to confirm
	// that it was indeed the EE_Registry that loaded it successfully

}



// End of file EE_Class_For_Testing_Loading.core.php
// Location: /tests/mocks/core/EE_Class_For_Testing_Loading.core.php