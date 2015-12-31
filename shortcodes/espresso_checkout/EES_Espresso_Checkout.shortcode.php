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
 * EES_Espresso_Checkout
 *
 * @package			Event Espresso
 * @subpackage	/shortcodes/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Checkout  extends EES_Shortcode {

	/**
	 * 	set_hooks - for hooking into EE Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 *    run - initial shortcode module setup called during "wp_loaded" hook
	 *    this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 * @access    public
	 * @param WP $WP
	 * @return    void
	 */
	public function run( WP $WP ) {
		if ( did_action( 'pre_get_posts' ) && did_action( 'send_headers' ) ) {
			global $wp_query;
			EED_Single_Page_Checkout::load_reg_steps();
			EED_Single_Page_Checkout::init( $wp_query );
		} else {
			// hook into the top of pre_get_posts to set the reg step routing, which gives other modules or plugins a chance to modify the reg steps, but just before the routes get called
			add_action( 'pre_get_posts', array( 'EED_Single_Page_Checkout', 'load_reg_steps' ), 1 );
			// this will trigger the EED_Single_Page_Checkout module's run() method during the pre_get_posts hook point,
			// this allows us to initialize things, enqueue assets, etc,
			add_action( 'pre_get_posts', array( 'EED_Single_Page_Checkout', 'init' ), 10, 1 );
		}
	}



	/**
	 * 	process_shortcode - ESPRESSO_CHECKOUT
	 *
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	string
	 */
	public function process_shortcode( $attributes = array() ) {
		return EE_Registry::instance()->REQ->get_output();
	}

}
// End of file EES_Espresso_Checkout.shortcode.php
// Location: /shortcodes/EES_Espresso_Checkout.shortcode.php