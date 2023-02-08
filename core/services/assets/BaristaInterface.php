<?php

namespace EventEspresso\core\services\assets;


/**
 * @package EventEspresso\core\services\assets
 * @author  Manzoor Wani, Brent Christensen
 * @since   $VID:$
 */
interface BaristaInterface
{
	/**
	 * @return void
	 */
	public function initialize();


	/**
	 * Registers all the WordPress packages scripts that are in the standardized
	 * `build/` location.
	 *
	 * @return void
	 */
	public function registerScripts();


	/**
	 * Registers all the packages and domain styles that are in the build folder.
	 *
	 * @return void
	 */
	public function registerStyles();
}
