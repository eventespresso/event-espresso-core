<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Alpha_Banner_Warning
 * Displays a warning banner if an ALPHA version of EE is being run
 *
 * @deprecated
 * @package 	Event Espresso
 * @subpackage 	core
 * @author 		Brent Christensen
 * @since 		4.8.20
 */

class EE_Alpha_Banner_Warning extends EE_Middleware {


	/**
     * @deprecated
	 * @param 	EE_Request 	$request
	 * @param 	EE_Response $response
	 * @return 	EE_Response
	 */
	public function handle_request( EE_Request $request, EE_Response $response ) {
		$this->_request = $request;
		$this->_response = $response;
		$this->display_alpha_banner_warning();
		$this->_response = $this->process_request_stack( $this->_request, $this->_response );
		return $this->_response;
	}



	/**
     * @deprecated
     * @return    string
	 */
	public function display_alpha_banner_warning() {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'This method is deprecated. Please use EventEspresso\core\services\request_stack\middleware\PreProductionVersionWarning::displayPreProductionVersionWarning() instead. All Event Espresso request stack classes have been moved to \core\services\request_stack  and are now under the EventEspresso\core\services\request_stack namespace',
                'event_espresso'
            ),
            '4.9.52',
            '4.10.0'
        );
    }



	/**
     * @deprecated
     * @return void
	 */
	public function alpha_banner_admin_notice() {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'This method is deprecated. Please use EventEspresso\core\services\request_stack\middleware\PreProductionVersionWarning::preProductionVersionAdminNotice() instead. All Event Espresso request stack classes have been moved to \core\services\request_stack  and are now under the EventEspresso\core\services\request_stack namespace',
                'event_espresso'
            ),
            '4.9.52',
            '4.10.0'
        );
    }



	/**
     * @deprecated
     * @return void
	 */
	public function alpha_banner_warning_notice() {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'This method is deprecated. Please use EventEspresso\core\services\request_stack\middleware\PreProductionVersionWarning::preProductionVersionWarningNotice() instead. All Event Espresso request stack classes have been moved to \core\services\request_stack  and are now under the EventEspresso\core\services\request_stack namespace',
                'event_espresso'
            ),
            '4.9.52',
            '4.10.0'
        );
    }


}
// End of file EE_Alpha_Banner_Warning.core.php
// Location: /core/middleware/EE_Alpha_Banner_Warning.core.php
