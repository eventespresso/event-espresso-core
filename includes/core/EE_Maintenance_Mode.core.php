<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * 
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 *
 * EE_Maintenance_Mode Class
 *
 * Super Duper Class Description
 *
 * @package			Event Espresso
 * @subpackage		core
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Maintenance_Mode {

   /**
     * 	EE_Maintenance_Mode Object
     * 	@var EE_Maintenance_Mode $_instance
	 * 	@access 	private 	
     */
	private static $_instance = NULL;

	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	$EE	
	 * 	@access 	protected
	 */
	protected $EE = NULL;






	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 *@return EE_Maintenance_Mode instance
	 */	
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}	



	/**
	 *private constructor to prevent direct creation
	 *@Constructor
	 *@access private
	 *@return void
	 */	
	private function __construct() {
		// EE registry
		$this->EE = EE_Registry::instance();
	}




	/**
	 * Determines whether or not we're in maintenance mode and what level. 
	 * 0=> not in maintenance mode (in normal mode)
	 * 1=> frontend-only mainteannce mode
	 * 2=> frontend and backend mainteancne mode
	 * @return int
	 */
	public function level(){
		return 1;
	}




	/**
	 * 	template_include
	 * 
	 * 	repalcement EE CPT template that displays message notifying site visitors that EE has been temporarily placed into maintenace mode
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	function template_include() {
		if ( file_exists( EVENT_ESPRESSO_TEMPLATE_DIR . 'maintenance_mode.template.php' )) {
			return EVENT_ESPRESSO_TEMPLATE_DIR . 'maintenance_mode.template.php';
		} else if ( file_exists( EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/maintenance_mode.template.php' )) {
			return EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/maintenance_mode.template.php';
		}
	}



	/**
	 * 	the_content
	 * 
	 * 	displays message notifying site visitors that EE has been temporarily placed into maintenace mode when post_type != EE CPT
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function the_content( $the_content ) {
		// check for EE shortcode
		if ( strpos( $the_content, '[ESPRESSO_' )) {
			// this can eventually be moved to a template, or edited via admin. But for now...
			$the_content = __( ' 
			<h2>Maintenance Mode</h2>
			<p>Event Registration has been temporarily closed while system maintenance is being performed. We\'re sorry for any inconveniences this may have caused. Please try back again later.</p>
			', 'event_espresso' );
		}
		return $the_content;
	}








	/**
	 *		@ override magic methods
	 *		@ return void
	 */
	final function __destruct() {}
	final function __call($a,$b) {}
	final function __get($a) {}
	final function __set($a,$b) {}
	final function __isset($a) {}
	final function __unset($a) {}
	final function __sleep() {
		return array();
	}
	final function __wakeup() {}
	final function __toString() {}
	final function __invoke() {}
	final function __set_state() {}
	final function __clone() {}
	final static function __callStatic($a,$b) {}
 
}
// End of file EE_Maintenance_Mode.core.php
// Location: ./core/EE_Maintenance_Mode.core.php