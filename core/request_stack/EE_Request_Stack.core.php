<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Request_Stack
 *
 * Basically a container class for holding EE_Middleware classes and the core application
 *
 * @package 	Event Espresso
 * @subpackage 	core
 * @author 		Brent Christensen
 * @since 		4.8.20
 *
 */

class EE_Request_Stack {

	/**
	 * @access 	protected
	 * @type    EEI_Request_Decorator $_application
	 */
	protected $_application;

	/**
	 * @access 	protected
	 * @type    array $_middlewares
	 */
	protected $_middlewares = array();

	/**
	 * @access 	protected
	 * @type 	EE_Request $_request
	 */
	protected $_request;

	/**
	 * @access 	protected
	 * @type 	EE_Response $_response
	 */
	protected $_response;



	/**
	 * @param 	EEI_Request_Decorator $application
	 * @param 	array $middlewares
	 */
	public function __construct( EEI_Request_Decorator $application, $middlewares = array() ) {
		$this->_application = $application;
		$this->_middlewares = $middlewares;
	}



	/**
	 * @param 	EE_Request $request
	 * @param 	EE_Response $response
	 * @return 	EE_Response
	 */
	public function handle_request( EE_Request $request, EE_Response $response ) {
		$this->_request = $request;
		$this->_response = $response;
		return $this->_application->handle_request( $request, $response );
	}



	/**
	 * handle_response
	 * executes the handle_response() method on the EEI_Request_Stack_Core_App object
	 * after the request stack has been fully processed
	 */
	public function handle_response() {
		foreach ( $this->_middlewares as $middleware ) {
			if ( $middleware instanceof EEI_Request_Stack_Core_App ) {
				$middleware->handle_response( $this->_request, $this->_response );
				// exit loop since we should be done
				// (also in case someone has accidentally labeled multiple apps as the EEI_Request_Stack_Core_App )
				break;
			}
		}
	}



}
// End of file EE_Request_Stack.core.php
// Location: /EE_Request_Stack.core.php