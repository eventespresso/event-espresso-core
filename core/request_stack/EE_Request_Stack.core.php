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

	private $application;

	private $middlewares = array();



	/**
	 * @param \EEI_Request_Decorator $application
	 * @param array $middlewares
	 */
	public function __construct( EEI_Request_Decorator $application, array $middlewares ) {
		$this->application = $application;
		$this->middlewares = $middlewares;
	}



	/**
	 * @param \EE_Request $request
	 * @return \EE_Response
	 */
	public function handle( EE_Request $request ) {
		return $this->application->handle( $request );
	}



	/**
	 * @param \EE_Request $request
	 * @param \EE_Response $response
	 */
	public function terminate( EE_Request $request, EE_Response $response ) {
		$prev_middleware = null;
		foreach ( $this->middlewares as $middleware ) {
			// if prev kernel was terminable we can assume this middleware has already been called
			if ( ! $prev_middleware instanceof EEI_Final_Request && $middleware instanceof EEI_Final_Request ) {
				$middleware->terminate( $request, $response );
			}
			$prev_middleware = $middleware;
		}
	}



}
// End of file EE_Request_Stack.core.php
// Location: /EE_Request_Stack.core.php