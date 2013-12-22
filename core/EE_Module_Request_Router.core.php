<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Module_Request_Router
* 	This class handles module instantiation, forward chaining, and obtaining views for the Front Controller. Basically a Module Factory.
 *
 * @package			Event Espresso
 * @subpackage	/core/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
final class EE_Module_Request_Router {

	/**
	 * 	@var 	array	$_previous_routes
	 *  @access 	private
	 */
	private static $_previous_routes = array();

	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	$EE	
	 * 	@access 	protected
	 */
	protected $EE = NULL;

	/**
	 * 	@var 	WP	$WP
	 *  @access 	public
	 */
	public $WP = NULL;





	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		
	}



	/**
	 * 	get_route
	* 
	 * 	on the first call  to this method, it checks the EE_Request_Handler for a "route"
	* 	on subsequent calls to this method, instead of checking the EE_Request_Handler for a route,
	* 	it checks the previous routes array, and checks if the last called route has any forwarding routes registered for it
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_route( $WP ) {
		$this->WP = $WP;
		// assume this if first route being called
		$previous_route = FALSE;
		// but is it really ???
		if ( ! empty( self::$_previous_routes )) {
			// get last run route
			$previous_routes = array_values( self::$_previous_routes );
			$previous_route = array_pop( $previous_routes );
		}
		//  has another route already been run ?
		if ( $previous_route ) {			
			// check if  forwarding has been set
			$current_route = $this->get_forward( $previous_route );
			try {
				//check for recursive forwarding
				if ( isset( self::$_previous_routes[ $current_route ] )) {
					throw new EE_Error( 
						sprintf( 
							__('An error occurred. The %s route has already been called, and therefore can not be forwarded to, because an infinite loop would be created and break the interweb.','event_espresso'), 
							$current_route 
						)
					);
				}
			} catch ( EE_Error $e ) {
				$e->get_error();
			}			
		} else {
			// first route called		
			// check request for module route
			if ( ! EE_Registry::instance()->REQ->is_set( 'ee' )) {
				return NULL;
			}
			// grab and sanitize module route
			$current_route = EE_Registry::instance()->REQ->get( 'ee' );
		}
		//echo '<h4>$current_route : ' . $current_route . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		// sorry, but I can't read what you route !
		if ( empty( $current_route )) {
			return NULL;
		}
		//add route to previous routes array
		self::$_previous_routes[] = $current_route;
		return $current_route;
	}



	/**
	 * 	resolve_route
	* 
	 * 	this method simply takes a valid route, and resolves what module class method the route points to
	 *
	 *  @access 	public
	 *  @param 	string		$current_route
	 *  @return 	mixed		object | boolean
	 */
	public function resolve_route( $current_route ) {		
		// get module method that route has been mapped to 
		$module_method = EE_Config::get_route( $current_route );
//		printr( $module_method, '$module_method  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// verify result was returned
		if ( empty( $module_method )) {
			$msg = sprintf( __( 'The requested route %s could not be mapped to any registered modules.', 'event_espresso' ), $current_route );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// verfiy that result is an array
		if ( ! is_array( $module_method )) {
			$msg = sprintf( __( 'The %s  route has not been properly registered.', 'event_espresso' ), $current_route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// grab module name
		$module_name = $module_method[0];
		// verfiy that a class method was registered properly
		if ( ! isset( $module_method[1] )) {
			$msg = sprintf( __( 'A class method for the %s  route has not been properly registered.', 'event_espresso' ), $current_route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// grab method
		$method = $module_method[1];
		// verfiy that class exists
		if ( ! class_exists( $module_name )) {
			$msg = sprintf( __( 'The requested %s class could not be found.', 'event_espresso' ), $module_name );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// verfiy that method exists
		if ( ! method_exists( $module_name, $method )) {
			$msg = sprintf( __( 'The class method %s for the %s route is in invalid.', 'event_espresso' ), $method, $current_route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// instantiate module and call route method
		if ( $module = $this->_module_route_factory( $module_name, $method )) {
			return $module;
		}		
		return FALSE;
	}



	/**
	 * 	_module_route_factory
	* 
	 * 	this method instantiates modules and calls the method that was defined when the route was registered
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _module_route_factory( $module_name, $method ) {
		// let's pause to reflect on this...
		$mod_reflector = new ReflectionClass( $module_name );
		// ensure that class is actually a module
		if ( ! $mod_reflector->isSubclassOf( 'EED_Module' )) {
			$msg = sprintf( __( 'The requested %s module is not of the class EED_Module.', 'event_espresso' ), $module_name );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// and pass the request object to the run method
		$module = $mod_reflector->newInstance( EE_Registry::instance() );
		// now call whatever action the route was for
		call_user_func( array( $module, $method ), $this->WP );
		return $module;
	}


	/**
	 * 	get_forward
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_forward( $current_route ) {
		return EE_Config::get_forward( $current_route );
	}

	/**
	 * 	get_view
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function get_view( $current_route ) {
		return EE_Config::get_view( $current_route );
	}



	/**
	 *		@ override magic methods
	 *		@ return void
	 */	
	public function __set($a,$b) { return FALSE; }
	public function __get($a) { return FALSE; }
	public function __isset($a) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }	
	public function __destruct() { return FALSE; }		

}
// End of file EE_Module_Request_Router.core.php
// Location: /core/EE_Module_Request_Router.core.php