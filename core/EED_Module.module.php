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
 * @subpackage 	/core/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
abstract class EED_Module extends EE_Configurable {

	/**
	 * 	instance of the EED_Module object
	 * 	@access 	protected
	 *	@var 	EED_Module $_instance
	 */
	protected static $_instance = NULL;

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
		$module_name = $this->module_name();
		EE_Registry::instance()->modules->{$module_name} = $this;
	}



	/**
	 * @param $module_name
	 * @return EED_Module
	 */
	protected static function get_instance( $module_name = '' ) {
		$module_name = ! empty( $module_name ) ? $module_name : get_called_class();
		if ( ! isset(  EE_Registry::instance()->modules->{$module_name} ) || ! EE_Registry::instance()->modules->{$module_name} instanceof EED_Module ) {
			EE_Registry::instance()->add_module( $module_name );
		}
		return EE_Registry::instance()->get_module( $module_name );
	}



	/**
	 *    module_name
	 *
	 * @access    public
	 * @return    string
	 */
	public function module_name() {
		return get_class( $this );
	}



	/**
	 * @return string
	 */
	public function theme() {
		return $this->theme;
	}



}
// End of file EED_Module.module.php
