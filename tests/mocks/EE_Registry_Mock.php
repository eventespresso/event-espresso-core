<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Registry_Mock
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				$VID:$
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
	 * @access public
	 * @return EE_Registry_Mock instance
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( ! self::$_instance instanceof EE_Registry_Mock ) {
			self::$_instance = new EE_Registry_Mock();
		}
		return self::$_instance;
	}



	/**
	 *private constructor to prevent direct creation
	 * @Constructor
	 * @access private
	 */
	private function __construct() {
		$this->_class_abbreviations = array(
			'EE_Config'          => 'CFG',
			'EE_Session'         => 'SSN',
			'EE_Capabilities'    => 'CAP',
			'EE_Cart'            => 'CART',
			'EE_Network_Config'  => 'NET_CFG',
			'EE_Request_Handler' => 'REQ',
		);
		// class library
		$this->LIB = new StdClass();
		$this->addons = new StdClass();
		$this->modules = new StdClass();
		$this->shortcodes = new StdClass();
		$this->widgets = new StdClass();
		$this->load_core( 'Base', array(), true );
		add_action( 'AHEE__EE_System__set_hooks_for_core', array( $this, 'init' ) );
	}



	/**
	 * @access public
	 * @param string $class_name
	 * @param string $class_prefix
	 * @return null|object
	 */
	public function get_cached_class( $class_name, $class_prefix = '' ) {
		return $this->_get_cached_class( $class_name, $class_prefix );
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
	 * @param bool $resolve_dependencies
	 * @return null | object
	 * @throws \EE_Error
	 */
	public function create_object( $class_name, $arguments = array(), $type = '', $from_db = false, $load_only = false, $resolve_dependencies = false ) {
		//echo "\n create_object";
		//echo "\n $class_name";
		//echo "\n resolve_dependencies: ";
		//var_dump( $resolve_dependencies );
		return $this->_create_object( $class_name, $arguments, $type, $from_db, $load_only, $resolve_dependencies );
	}

}



// End of file EE_Registry_Mock.php
// Location: /EE_Registry_Mock.php