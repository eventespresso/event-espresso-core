<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * EES_Espresso_Ticket_Selector
 *
 * @deprecated 4.9.26
 * @package			Event Espresso
 * @subpackage		/shortcodes/
 * @author			Brent Christensen
 */
class EES_Espresso_Ticket_Selector  extends EES_Shortcode {

	/**
     * @deprecated 4.9.26
     * @return 	void
	 */
	public static function set_hooks() {
	}



	/**
     * @deprecated 4.9.26
     * @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
     * @deprecated 4.9.26
     * @param \WP $WP
	 */
	public function run( WP $WP ) {
	}


	/**
     * @deprecated 4.9.26
     * @param		array 	$attributes
	 * @return 	string
	 */
	public function process_shortcode( $attributes = array() ) {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoTicketSelector instead.',
                'event_espresso'
            ),
            '4.9.26'
        );
        return '';
    }

}
// End of file EES_Espresso_Ticket_Selector.shortcode.php
// Location: /shortcodes/espresso_ticket_selector/EES_Espresso_Ticket_Selector.shortcode.php