<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Middleware
 * Parent class for EE_Middleware Request decorators.
 * Accepts an instance of another EE_Middleware class,
 * and handles the passing of EE_Request and EE_Response objects to and from it
 * EE_Middleware classes are for functionality that needs to run on nearly EVERY request.
 * They can perform their logic either before or after the core application has run:
 * 	(see documentation for the handle() method below)
 * EE_Middleware classes should NOT depend on core functionality,
 * because there is no guarantee that the core application has run
 *
 * @deprecated
 * @package 	Event Espresso
 * @subpackage 	core
 * @author 		Brent Christensen
 * @since       4.8.20
 */
abstract class EE_Middleware implements EEI_Request_Decorator {

	/**
     * @deprecated
	 * @param 	EE_Request $request
	 * @param    EE_Response   $response
	 * @return    EE_Response
	 */
	protected function process_request_stack( EE_Request $request, EE_Response $response ) {
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



// End of file EE_Middleware.core.php
// Location: /core/middleware/EE_Middleware.core.php
