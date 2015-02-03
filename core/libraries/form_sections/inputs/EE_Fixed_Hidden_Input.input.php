<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Fixed_Hidden_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Brent Christensen
 */
class EE_Fixed_Hidden_Input extends EE_Hidden_Input{


	/**
	 * Fixed Inputs are inputs that do NOT accept user input
	 * therefore they will ALWAYS return the default value that was set upon their creation
	 * and NO normalization or sanitization will occur because the $_REQUEST value is being ignored
	 *
	 * @param array $req_data like $_POST
	 * @return boolean whether or not there was an error
	 */
	protected function _normalize( $req_data ) {
	}



}
// End of file EE_Fixed_Hidden_Input.input.php