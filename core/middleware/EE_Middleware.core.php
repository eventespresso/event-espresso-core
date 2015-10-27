<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Middleware
 *
 * Parent class for EE_Middleware Request decorators
 * Accepts an instance of another EE_Middleware class,
 * and handles the passing of EE_Request and EE_Response objects to and from it
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				$VID:$
 *
 */

abstract class EE_Middleware {

	/**
	 * 	Request Stack
	 * @access 	protected
	 * @type 	$request_stack EEI_Request_Decorator
	 */
	protected $request_stack = null;

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
	 * @access 	public
	 * @param 	\EEI_Request_Decorator $request_stack
	 */
	public function __construct( EEI_Request_Decorator $request_stack ) {
		$this->request_stack 	= $request_stack;
		$this->response 		= new EE_Response();
	}



	/**
	 * process_request_stack
	 *
	 * @access 	protected
	 * @param 	EE_Request $request
	 * @return 	EE_Response
	 */
	protected function process_request_stack( EE_Request $request ) {
		if ( ! $this->response->terminate_request() ) {
			$this->process_previous_response(
				$this->request_stack->handle( $request )
			);
		} else {
			if ( WP_DEBUG ) {
				EEH_Debug_Tools::ee_plugin_activation_errors();
			}
			espresso_deactivate_plugin();
		}
		//echo $this->response->get_output();
		return $this->response;
	}



	/**
	 * process_previous_response
	 *
	 * @access    protected
	 * @param    EE_Response $response
	 * @return    EE_Response
	 */
	protected function process_previous_response( EE_Response $response ) {
		$this->response->add_output( $response->get_output() );
		foreach ( $response->get_notices() as $key => $value ) {
			$this->response->set_notice( $key, $value );
		}
	}



}



// End of file EE_Middleware.core.php
// Location: /core/middleware/EE_Middleware.core.php