<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Request_Stack
 *
 * Basically a container class for holding EE_Middleware classes and the core application
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				$VID:$
 *
 */

class EE_Request_Stack {

	/**
	 * @access 	protected
	 * @type 	array $application
	 */
	protected $application;

	/**
	 * @access 	protected
	 * @type    array $middlewares
	 */
	protected $middlewares = array();

	/**
	 * @access 	protected
	 * @type 	EE_Request $request
	 */
	protected $request;

	/**
	 * @access 	protected
	 * @type 	EE_Response $response
	 */
	protected $response;



	/**
	 * @param 	EEI_Request_Decorator $application
	 * @param 	array $middlewares
	 */
	public function __construct( EEI_Request_Decorator $application, array $middlewares ) {
		$this->application = $application;
		$this->middlewares = $middlewares;
	}



	/**
	 * @param 	EE_Request $request
	 * @param 	EE_Response $response
	 * @return 	EE_Response
	 */
	public function handle_request( EE_Request $request, EE_Response $response ) {
		$this->request = $request;
		$this->response = $response;
		return $this->application->handle_request( $request, $response );
	}



	/**
	 * handle_response
	 * executes the handle_response() method on the EEI_Request_Stack_Core_App object
	 * after the request stack has been fully processed
	 */
	public function handle_response() {
		$prev_middleware = null;
		foreach ( $this->middlewares as $middleware ) {
			if ( ! $prev_middleware instanceof EEI_Request_Stack_Core_App && $middleware instanceof EEI_Request_Stack_Core_App ) {
				$middleware->handle_response( $this->request, $this->response );
			}
			$prev_middleware = $middleware;
		}
	}



}
// End of file EE_Request_Stack.core.php
// Location: /EE_Request_Stack.core.php