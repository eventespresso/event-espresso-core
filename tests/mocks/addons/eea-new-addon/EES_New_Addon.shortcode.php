<?php

/*
 * EES_New_Addon
 *
 * @package     Event Espresso
 * @subpackage  eea-new-addon
 * @author      Brent Christensen
 *
 */

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;

class EES_New_Addon  extends EES_Shortcode {



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
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
	}



	/**
	 * 	run - initial shortcode module setup called during "wp_loaded" hook
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *  @param 	 WP $WP
	 *  @return 	void
	 */
	public function run( WP $WP ) {
		// this will trigger the EED_New_Addon module's run() method during the pre_get_posts hook point,
		// this allows us to initialize things, enqueue assets, etc,
		// as well, this saves an instantiation of the module in an array, using 'new_addon' as the key, so that we can retrieve it
        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $request->setRequestParam( 'ee', 'new_addon' );
		EED_New_Addon::$shortcode_active = TRUE;
	}



	/**
	 *    process_shortcode
	 *
	 *    [ESPRESSO_NEW_ADDON]
	 *
	 * @access 	public
	 * @param 	array $attributes
	 * @return 	void
	 */
	public function process_shortcode( $attributes = array() ) {
		// make sure $attributes is an array
		$attributes = array_merge(
			// defaults
			array(),
			(array)$attributes
		);
		return EE_Registry::instance()->modules['new_addon']->display_new_addon( $attributes );
	}


}
// End of file EES_New_Addon.shortcode.php
// Location: /wp-content/plugins/eea-new-addon/EES_New_Addon.shortcode.php