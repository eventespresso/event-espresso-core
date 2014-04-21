<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author 			Event Espresso
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EED_Module
 *
 * @package			Event Espresso
 * @subpackage	/modules/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
abstract class EED_Module extends EE_Base {

	/**
	 * 	instance of the EED_Module object
	 * 	@access 	protected
	 *	@var 	EED_Module $_instance
	 */
	protected static $_instance = NULL;

	/**
	 * 	instance of the EE_Config_Base object
	 * 	@access 	protected
	 *	@var 	EE_Config_Base $_config
	 */
	protected $_config = NULL;

	/**
	 * 	rendered output to be returned to WP
	 * 	@access 	protected
	 *	@var 	string $output
	 */
	protected $output = '';

	/**
	 * 	the current active espresso template theme
	 * 	@access 	protected
	 *	@var 	string $theme
	 */
	protected $theme = '';




	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {}



	/**
	 * 	run - initial module setup
	 * 	this method is primarily used for activating resources in the EE_Front_Controller thru the use of filters
	 *
	 *  @access 	public
	 *  @var 			WP $WP
	 *  @return 	void
	 */
	public abstract function run( $WP );



	/**
	 *    class constructor - can ONLY be instantiated by EE_Front_Controller
	 *
	 * @override default exception handling
	 * @access   public
	 * @return \EED_Module
	 */
	final public function __construct() {
		$this->theme = EE_Config::get_current_theme();
		self::$_instance = $this;
	}



	/**
	 * @return EED_Module
	 */
	public static function instance() {
		return self::$_instance;
	}



	/**
	 *    set_config
	 *
	 * @access 	public
	 * @param 	string 	$section
	 * @param 	string 	$name
	 * @param 	string 	$config_class
	 * @return 	mixed 	EE_Config_Base | NULL
	 */
	public function set_config( $section = 'modules', $name = '', $config_class = '' ) {
		$name = ! empty( $name ) ? $name : get_called_class();
		$config_class = ! empty( $config_class ) ? $config_class : $name . '_Config';
		return EE_Config::instance()->set_config( $section, $name, $config_class );
	}



	/**
	 *    get_config
	 *
	 * @access 	public
	 * @param 	string 	$section
	 * @param 	string 	$name
	 * @param 	string 	$config_class
	 * @return 	mixed 	EE_Config_Base | NULL
	 */
	public function get_config( $section = 'modules', $name = '', $config_class = '' ) {
		$name = ! empty( $name ) ? $name : get_called_class();
		$config_class = ! empty( $config_class ) ? $config_class : $name . '_Config';
		// check for cached config
		if ( ! $this->_config ) {
			$this->_config = EE_Config::instance()->get_config( $section, $name, $config_class );
		}
		return $this->_config;
	}



}
// End of file EED_Module.module.php
// Location: /modules/EED_Module.module.php