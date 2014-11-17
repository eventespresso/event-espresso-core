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
		// SPCO is large and resource intensive, so it's better to do a double check before loading it up, so let's grab the post_content for the requested post
		global $wpdb;
		$SQL = 'SELECT post_content from ' . $wpdb->posts . ' WHERE post_type="page" AND post_status="publish" AND post_name=%s';
		if( $post_content = $wpdb->get_var( $wpdb->prepare( $SQL, EE_Registry::instance()->REQ->get( 'post_name' )))) {
			// now check for this shortcode
			if ( strpos( $post_content, '[ESPRESSO_CHECKOUT' ) !== FALSE ) {
				if ( ! did_action( 'pre_get_posts' )) {
					// this will trigger the EED_Events_Archive module's event_list() method during the pre_get_posts hook point,
					// this allows us to initialize things, enqueue assets, etc,
					// as well, this saves an instantiation of the module in an array using 'espresso_events' as the key, so that we can retrieve it
					add_action( 'pre_get_posts', array( EED_Single_Page_Checkout::instance(), 'run' ));
				} else {
					global $wp;
					EED_Single_Page_Checkout::instance()->run( $wp );
				}
			}
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