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
abstract class EED_Module extends EE_Base { 

	/**
	 * 	instance of the EED_Module object
	 * 	@access 	private
	 *	@var 	EED_Module $_instance
	 */
	protected static $_instance = NULL;

	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	
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
	 * 	the current active espresso template theme
	 *	@var 	string
	 * 	@access 	protected
	 */
	protected $theme = '';




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
	*	class constructor - can ONLY be instantiated by EE_Front_Controller
	*
	*	@override default exception handling
	*	@access public
	*	@return 	void
	*/
	final public function __construct() {
		
		$this->theme = EE_Config::get_current_theme();
	}



	
}
// End of file EED_Module.module.php
// Location: /modules/EED_Module.module.php