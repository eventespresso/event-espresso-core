<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Detect_Login
 *
 * @deprecated
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class EE_Detect_Login extends EE_Middleware {


	/**
     * @deprecated
     * @param    EE_Request $request
	 * @param    EE_Response   $response
	 * @return    EE_Response
	 */
	public function handle_request( EE_Request $request, EE_Response $response ) {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'All Event Espresso request stack classes have been moved to \core\services\request_stack  and are now under the EventEspresso\core\services\request_stack namespace',
                'event_espresso'
            ),
            '4.9.52'
        );
        return $response;
	}



}
// End of file EE_Detect_Login.php
// Location: /EE_Detect_Login.php
