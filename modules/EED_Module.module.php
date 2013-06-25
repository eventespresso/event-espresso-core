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
 * EED_Module
 *
 * @package			Event Espresso
 * @subpackage	/modules/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
//add_action( 'plugins_loaded', array( 'EED_Module', 'register_module' ));
//add_filter( 'AHEE__EE_Front_Controller__register_module', array( 'EED_Module', 'register_module' ));

abstract class EED_Module extends EE_Base { 

	/**
	 * 	EE_Registry Object
	 *	@var 	object	
	 * 	@access 	protected
	 */
	protected $EE = NULL;

	/**
	 * 	rendered output to be returned to WP
	 *	@var 	string
	 * 	@access 	protected
	 */
	protected $ouput = '';
	
	/**
	 * 	register_module - makes core aware of this module
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public abstract static function register_module();
	
	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public abstract static function set_hooks();

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public abstract static function set_hooks_admin();

	/**
	 * 	init - initial module setup
	 * 	this method is primarily used for activating resources in the EE_Front_Controller thru the use of filters
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public abstract function init();
	
	/**
	*	class constructor - can ONLY be instantiated by EE_Front_Controller
	*
	*	@override default exception handling
	*	@access public
	*	@return 	void
	*/
	final public function __construct( EE_Registry $EE = NULL ) {
		$this->EE = $EE;
	}
	
}
// End of file EED_Module.module.php
// Location: /modules/EED_Module.module.php