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
 * EES_Espresso_Cancelled
 *
 * @package			Event Espresso
 * @subpackage	/shortcodes/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Cancelled  extends EES_Shortcode {

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
	}

	/**
	 * 	process_shortcode - ESPRESSO_CHECKOUT
	 *
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	string
	 */
	public function process_shortcode( $attributes = array() ) {
		EE_Registry::instance()->load_core( 'Session' );
		$transaction = EE_Registry::instance()->SSN->get_session_data( 'transaction' );
		if ( $transaction instanceof EE_Transaction ) {
			do_action( 'AHEE__EES_Espresso_Cancelled__process_shortcode__transaction', $transaction );
			$registrations = $transaction->registrations();
			foreach( $registrations as $registration ) {
				if ( $registration instanceof EE_Registration ) {
					do_action( 'AHEE__EES_Espresso_Cancelled__process_shortcode__registration', $registration );
				}
			}
		}
		do_action( 'AHEE__EES_Espresso_Cancelled__process_shortcode__clear_session' );
		// remove all unwanted records from the db
		if ( EE_Registry::instance()->CART instanceof EE_Cart ) {
			EE_Registry::instance()->CART->delete_cart();
		}
		EE_Registry::instance()->SSN->clear_session( __CLASS__, __FUNCTION__ );
		return sprintf( __( '%sAll unsaved registration information entered during this session has been deleted.%s', 'event_espresso' ) , '<p class="ee-registrations-cancelled-pg ee-attention">', '</p>' );
	}

}
// End of file EES_Espresso_Cancelled.shortcode.php
// Location: /shortcodes/EES_Espresso_Cancelled.shortcode.php