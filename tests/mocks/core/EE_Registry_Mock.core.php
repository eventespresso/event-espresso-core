<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Registry_Mock
 *
 * For unit testing EE_Registry
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.7
 *
 */
class EE_Registry_Mock extends EE_Registry {

	/**
	 *    EE_Registry Object
	 * @var EE_Registry $_instance
	 * @access    private
	 */
	private static $_instance = null;

	/**
	 * @access    public
	 * @var    $Some_Class
	 */
	public $Some_Class = null;



	/**
	 * @singleton method used to instantiate class object
	 * @access    public
	 * @param \EE_Request  $request
	 * @param \EE_Response $response
	 * @return \EE_Registry_Mock instance
	 */
	public static function instance( EE_Request $request = null, EE_Response $response = null ) {
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_Registry_Mock ) {
			$request = $request instanceof EE_Request ? $request : EE_Dependency_Map::request();
			$response = $response instanceof EE_Response ? $response : EE_Dependency_Map::response();
			self::$_instance = new EE_Registry_Mock( $request, $response );
		}
		return self::$_instance;
	}



	/**
	 * @access public
	 * @param string $class_name
	 * @param string $class_prefix
	 * @param bool   $load_only
	 * @return null|object
	 */
	public function get_cached_class_or_file_loaded( $class_name, $class_prefix = '', $load_only = false ) {
		return $this->_get_cached_class_or_file_loaded( $class_name, $class_prefix, $load_only );
	}



	/**
	 * @access public
	 * @param string $class_name
	 * @param string $type
	 * @param array $file_paths
	 * @return string
	 */
	public function resolve_path( $class_name, $type = '', $file_paths = array() ) {
		return $this->_resolve_path( $class_name, $type, $file_paths );
	}



	/**
	 * @access public
	 * @param string $path
	 * @param string $class_name
	 * @param string $type
	 * @param array $file_paths
	 * @return void
	 * @throws \EE_Error
	 */
	public function require_file( $path, $class_name, $type = '', $file_paths = array() ) {
		$this->_require_file( $path, $class_name, $type, $file_paths );
	}



	/**
	 * @access public
	 * @param string $class_name
	 * @param array $arguments
	 * @param string $type
	 * @param bool $from_db
	 * @param bool $load_only
	 * @return null | object
	 * @throws \EE_Error
	 */
	public function create_object( $class_name, $arguments = array(), $type = 'core', $from_db = false ) {
		//echo "\n create_object";
		//echo "\n $class_name";
		//echo "\n resolve_dependencies: ";
		//var_dump( $resolve_dependencies );
		return $this->_create_object( $class_name, $arguments, $type, $from_db );
	}



	/**
	 * @access public
	 * @param  object $class_obj
	 * @param  string $class_name
	 * @param  string $class_prefix
	 * @param  bool   $from_db
	 * @param  bool   $cache
	 * @return void
	 */
	public function set_cached_class( $class_obj, $class_name, $class_prefix = '', $from_db = false, $cache = true ) {
		$this->_set_cached_class( $class_obj, $class_name, $class_prefix, $from_db, $cache );
	}



	/**
	 * @access public
	 * @param array $array
	 * @return bool
	 */
	public function array_is_numerically_and_sequentially_indexed( array $array ) {
		return $this->_array_is_numerically_and_sequentially_indexed( $array );
	}

}



// End of file EE_Registry_Mock.core.php
// Location: /tests/mocks/core/EE_Registry_Mock.core.php