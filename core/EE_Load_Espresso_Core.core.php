<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 *
 * EE_Load_Espresso_Core
 *
 * This is the core application loader class at the center of the EE Middleware Request Stack.
 * Although not an instance of EE_Middleware, it DOES implement the EEI_Request_Decorator, allowing it to communicate
 * with the other EE_Middleware classes.
 * Performs all of the basic class loading that used to be in the EE_System constructor.
 *
 * @package		Event Espresso
 * @subpackage	core/
 * @author		Brent Christensen, Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Load_Espresso_Core implements EEI_Request_Decorator, EEI_Request_Stack_Core_App {

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
	 */
	public function __construct() {
	}



	/**
	 *    handle
	 *    sets hooks for running rest of system
	 *    provides "AHEE__EE_System__construct__complete" hook for EE Addons to use as their starting point
	 *    starting EE Addons from any other point may lead to problems
	 *
	 * @access 	public
	 * @param 	EE_Request 	$request
	 * @param 	EE_Response $response
	 * @return 	EE_Response
	 */
	public function handle_request( EE_Request $request, EE_Response $response ) {
		$this->request = $request;
		$this->response = $response;
		// central repository for classes
		$this->_load_registry();
		// workarounds for PHP < 5.3
		$this->_load_class_tools();
		// PSR4 Autoloaders
		EE_Registry::instance()->load_core( 'EE_Psr4AutoloaderInit' );
		// deprecated functions
		espresso_load_required( 'EE_Deprecated', EE_CORE . 'EE_Deprecated.core.php' );
		// load interfaces
		espresso_load_required( 'EEI_Payment_Method_Interfaces', EE_LIBRARIES . 'payment_methods' . DS . 'EEI_Payment_Method_Interfaces.php' );
		//// WP cron jobs
		EE_Registry::instance()->load_core( 'Cron_Tasks' );
		EE_Registry::instance()->load_core( 'EE_System' );

		return $this->response;
	}



	/**
	 * 	_load_registry
	 *
	 * 	@access private
	 * 	@return void
	 */
	private function _load_registry() {
		if ( is_readable( EE_CORE . 'EE_Registry.core.php' )) {
			require_once( EE_CORE . 'EE_Registry.core.php' );
		} else {
			$msg = __( 'The EE_Registry core class could not be loaded.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			wp_die( EE_Error::get_notices() );
		}
	}


	/**
	 * 	_load_registry
	 *
	 * 	@access private
	 * 	@return void
	 */
	private function _load_class_tools() {
		if ( is_readable( EE_HELPERS . 'EEH_Class_Tools.helper.php' )) {
			require_once( EE_HELPERS . 'EEH_Class_Tools.helper.php' );
		} else {
			$msg = __( 'The EEH_Class_Tools helper could not be loaded.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
	}



	/**
	 * handle_response
	 * called after the request stack has been fully processed
	 * nothing happening here at this moment...
	 *
	 * @access    public
	 * @param \EE_Request $request
	 * @param \EE_Response $response
	 */
	public function handle_response( EE_Request $request, EE_Response $response ) {
		//EEH_Debug_Tools::printr( $request, '$request', __FILE__, __LINE__ );
		//EEH_Debug_Tools::printr( $response, '$response', __FILE__, __LINE__ );
		//die();
	}



}
// End of file EE_Load_Espresso_Core.core.php
// Location: /core/EE_Load_Espresso_Core.core.php
