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
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EES_Espresso_Ticket_Selector
 *
 * @package			Event Espresso
 * @subpackage		/shortcodes/
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EES_Espresso_Ticket_Selector  extends EES_Shortcode {

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
	 * @param \WP $WP
	 */
	public function run( WP $WP ) {
		add_filter( 'FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', '__return_true' );
	}


	/**
	 * 	process_shortcode - ESPRESSO_TICKET_SELECTOR
	 *
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	string
	 */
	public function process_shortcode( $attributes = array() ) {
		extract( $attributes );
		$event_id = isset( $event_id ) ? $event_id : 0;
		$event = EE_Registry::instance()->load_model( 'Event' )->get_one_by_ID( $event_id );
		ob_start();
		do_action( 'AHEE_event_details_before_post', $event_id );
		espresso_ticket_selector( $event );
		do_action( 'AHEE_event_details_after_post' );
		return ob_get_clean();
	}

}
// End of file EES_Espresso_Ticket_Selector.shortcode.php
// Location: /shortcodes/espresso_ticket_selector/EES_Espresso_Ticket_Selector.shortcode.php