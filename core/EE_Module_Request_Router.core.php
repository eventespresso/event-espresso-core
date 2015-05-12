<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			    Event Espresso
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 *
 *  Class EE_Module_Request_Router
 *
* 	This class handles module instantiation, forward chaining, and obtaining views for the Front Controller. Basically a Module Factory.
 *
 * @package			Event Espresso
 * @subpackage  	/core/
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
	 * 	@var 	WP_Query	$WP_Query
	 *  @access 	public
	 */
	public $WP_Query = NULL;



	/**
	 *    class constructor
	 *
	 * @access    public
	 * @return \EE_Module_Request_Router
	 */
	public function __construct() {
	}



	/**
	 *    get_route
	 *
	 *    on the first call  to this method, it checks the EE_Request_Handler for a "route"
	 *    on subsequent calls to this method, instead of checking the EE_Request_Handler for a route,
	 *    it checks the previous routes array, and checks if the last called route has any forwarding routes registered for it
	 *
	 * @access    public
	 * @param WP_Query $WP_Query
	 * @return    string | NULL
	 */
	public function get_route( WP_Query $WP_Query ) {
		$this->WP_Query = $WP_Query;
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
				return NULL;
			}
		} else {
			// first route called
			$current_route = NULL;
			// grab all routes
			$routes = EE_Registry::instance()->CFG->get_routes();
			//d( $routes );
			foreach( $routes as $key => $route ) {
				// check request for module route
				if ( EE_Registry::instance()->REQ->is_set( $key )) {
					//echo '<b style="color:#2EA2CC;">key : <span style="color:#E76700">' . $key . '</span></b><br />';
					$current_route = sanitize_text_field( EE_Registry::instance()->REQ->get( $key ));
					if ( $current_route ) {
						$current_route = array( $key, $current_route );
						//echo '<b style="color:#2EA2CC;">current_route : <span style="color:#E76700">' . $current_route . '</span></b><br />';
						break;
					}
				}
			}
		}
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
	 *  @param 	string		$key
	 *  @param 	string		$current_route
	 *  @return 	mixed		EED_Module | boolean
	 */
	public function resolve_route( $key, $current_route ) {
		// get module method that route has been mapped to
		$module_method = EE_Config::get_route( $current_route, $key );
		//EEH_Debug_Tools::printr( $module_method, '$module_method  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// verify result was returned
		if ( empty( $module_method )) {
			$msg = sprintf( __( 'The requested route %s could not be mapped to any registered modules.', 'event_espresso' ), $current_route );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// verify that result is an array
		if ( ! is_array( $module_method )) {
			$msg = sprintf( __( 'The %s  route has not been properly registered.', 'event_espresso' ), $current_route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// grab module name
		$module_name = $module_method[0];
		// verify that a class method was registered properly
		if ( ! isset( $module_method[1] )) {
			$msg = sprintf( __( 'A class method for the %s  route has not been properly registered.', 'event_espresso' ), $current_route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// grab method
		$method = $module_method[1];
		// verify that class exists
		if ( ! class_exists( $module_name )) {
			$msg = sprintf( __( 'The requested %s class could not be found.', 'event_espresso' ), $module_name );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// verify that method exists
		if ( ! method_exists( $module_name, $method )) {
			$msg = sprintf( __( 'The class method %s for the %s route is in invalid.', 'event_espresso' ), $method, $current_route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// instantiate module and call route method
		return $this->_module_router( $module_name, $method );
	}



	/**
	 *    module_factory
	 *
	 *    this method instantiates modules and calls the method that was defined when the route was registered
	 *
	 * @access    public
	 * @param   string  $module_name
	 * @return    EED_Module | NULL
	 */
	public static function module_factory( $module_name ) {
		if ( $module_name == 'EED_Module' ) {
			EE_Error::add_error( sprintf( __( 'EED_Module is an abstract parent class an can not be instantiated. Please provide a proper module name.', 'event_espresso' ), $module_name ), __FILE__, __FUNCTION__, __LINE__ );
			return NULL;
		}
		// let's pause to reflect on this...
		$mod_reflector = new ReflectionClass( $module_name );
		// ensure that class is actually a module
		if ( ! $mod_reflector->isSubclassOf( 'EED_Module' )) {
			EE_Error::add_error( sprintf( __( 'The requested %s module is not of the class EED_Module.', 'event_espresso' ), $module_name ), __FILE__, __FUNCTION__, __LINE__ );
			return NULL;
		}
		// instantiate and return module class
		return $mod_reflector->newInstance();
	}


	/**
	 *    _module_router
	 *
	 *    this method instantiates modules and calls the method that was defined when the route was registered
	 *
	 * @access    private
	 * @param   string  $module_name
	 * @param   string  $method
	 * @return    EED_Module | NULL
	 */
	private function _module_router( $module_name, $method ) {
		// instantiate module class
		$module = EE_Module_Request_Router::module_factory( $module_name );
		if ( $module instanceof EED_Module ) {
			// and call whatever action the route was for
			try {
				call_user_func( array( $module, $method ), $this->WP_Query );
			} catch ( EE_Error $e ) {
				$e->get_error();
				return NULL;
			}
		}
		return $module;
	}



	/**
	 *    get_forward
	 *
	 * @access    public
	 * @param $current_route
	 * @return    string
	 */
	public function get_forward( $current_route ) {
		return EE_Config::get_forward( $current_route );
	}



	/**
	 *    get_view
	 *
	 * @access    public
	 * @param $current_route
	 * @return    string
	 */
	public function get_view( $current_route ) {
		return EE_Config::get_view( $current_route );
	}



	/**
	 * @param $a
	 * @param $b
	 * @return bool
	 */
	public function __set($a,$b) { return FALSE; }



	/**
	 * @param $a
	 * @return bool
	 */
	public function __get($a) { return FALSE; }



	/**
	 * @param $a
	 * @return bool
	 */
	public function __isset($a) { return FALSE; }



	/**
	 * @param $a
	 * @return bool
	 */
	public function __unset($a) { return FALSE; }



	/**
	 * @return bool
	 */
	public function __clone() { return FALSE; }



	/**
	 * @return bool
	 */
	public function __wakeup() { return FALSE; }



	/**
	 *
	 */
	public function __destruct() { return FALSE; }

}
// End of file EE_Module_Request_Router.core.php
// Location: /core/EE_Module_Request_Router.core.php
