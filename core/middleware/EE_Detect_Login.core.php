<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Detect_Login
 *
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 *
 */
class EE_Detect_Login extends EE_Middleware {


	/**
	 * converts a Request to a Response
	 *
	 * @param    EE_Request  $request
	 * @param    EE_Response $response
	 * @return    EE_Response
	 */
	public function handle_request( EE_Request $request, EE_Response $response ) {
		$this->_request = $request;
		$this->_response = $response;
		global $pagenow;
		if (
			in_array(
				$pagenow,
				array( 'wp-login.php', 'wp-register.php' )
			)
			&& ! $request->get( 'ee_load_on_login' )
		) {
			$this->_response->terminate_request();
		}
		$this->_response = $this->process_request_stack( $this->_request, $this->_response );
		return $this->_response;
	}



}
// End of file EE_Detect_Login.php
// Location: /EE_Detect_Login.php