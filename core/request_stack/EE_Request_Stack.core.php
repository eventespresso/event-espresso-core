<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Request_Stack
 * Basically a container class for holding EE_Middleware classes and the core application
 *
 * @deprecated  4.9.53
 * @package 	Event Espresso
 * @subpackage 	core
 * @author 		Brent Christensen
 * @since 		4.8.20
 */

class EE_Request_Stack {


	/**
     * @deprecated  4.9.53
     * @param 	EEI_Request_Decorator $application
	 * @param 	array $middlewares
	 */
	public function __construct( EEI_Request_Decorator $application, $middlewares = array() ) {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'This class is deprecated. Please use EventEspresso\core\services\request_stack\RequestStack instead. All Event Espresso request stack classes have been moved to \core\services\request_stack and are now under the EventEspresso\core\services\request_stack namespace',
                'event_espresso'
            ),
            '4.9.53'
        );
    }




}
// End of file EE_Request_Stack.core.php
// Location: /EE_Request_Stack.core.php
