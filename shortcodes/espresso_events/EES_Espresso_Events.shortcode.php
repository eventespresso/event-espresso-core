<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * ESPRESSO_EVENTS
 *
 * @deprecated  4.9.27
 * @package     Event Espresso
 * @subpackage  /shortcodes/
 * @author      Brent Christensen
 */
class EES_Espresso_Events  extends EES_Shortcode {

	/**
     * @deprecated 4.9.27
     *  @return 	void
	 */
	public static function set_hooks() {
	}

	/**
     * @deprecated 4.9.27
     *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
     * @deprecated 4.9.27
     * @param WP $WP
	 * @return    void
	 */
	public function run( WP $WP ) {
	}



	/**
     * @deprecated 4.9.27
     *  @param 	array 	$attributes
	 *  @return 	string
	 */
	public function process_shortcode( $attributes = array() ) {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoEvents instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
        return '';
    }



}





/**
 *
 * Class EE_Event_List_Query
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.1
 *
 */
class EE_Event_List_Query {

    /**
     * EE_Event_List_Query constructor.
     *
     * @param array $args
     */
    public function __construct($args = array())
    {
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\services\wp_queries\EventListQuery instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
        new \EventEspresso\core\domain\services\wp_queries\EventListQuery($args);
    }

}



// End of file EES_Espresso_Events.shortcode.php
// Location: /shortcodes/EES_Espresso_Events.shortcode.php