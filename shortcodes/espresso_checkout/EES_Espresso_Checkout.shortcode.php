<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * EES_Espresso_Checkout
 *
 * @deprecated  4.9.27
 * @package     Event Espresso
 * @subpackage	/shortcodes/
 * @author      Brent Christensen

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
     * @throws \EE_Error
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
        \EE_Error::doing_it_wrong(
            __METHOD__,
            __(
                'Usage is deprecated. Please use \EventEspresso\core\domain\entities\shortcodes\EspressoCheckout::processShortcode() instead.',
                'event_espresso'
            ),
            '4.9.27'
        );
        return '';
    }

}
// End of file EES_Espresso_Checkout.shortcode.php
// Location: /shortcodes/EES_Espresso_Checkout.shortcode.php