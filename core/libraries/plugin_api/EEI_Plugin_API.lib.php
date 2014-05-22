<?php
/**
 * This file contains the EEI_Plugin API interface class.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.3.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * This interface is used to define the common methods shared by all "plugin api" classes.
 *
 * Used internally by EE for registering some caffeinated components, and provided as an easy
 * method for defining classes that plugins can use to register entire components.  To be clear, there are
 * certain systems in EE where implementing them for a plugin requires multiple actions and filters being
 * hooked into.
 * Within this class are wrappers for "registering" with a few parameters and then the registry
 * method
 * will take care of setting up all the required filters and hooks for that system to be successfully
 * hooked into.
 *
 * @package        Event Espresso
 * @subpackage  plugin api
 * @since            4.3.0
 * @author          Darren Ethier
 */
interface EEI_Plugin_API {

	/**
	 * Used to register a component with EE.
	 *
	 * @since    4.3.0
	 * @param string $ID a unique name or ID for the component being registered
	 * @param array  $setup_args  an array of key value pairs of info for registering the component
	 * @return void
	 */
	public static function register( $ID = NULL, $setup_args = array() );



	/**
	 * Used to deregister a component with EE.
	 *
	 * @since 4.3.0
	 * @param string $ID a unique name or ID for the component being registered
	 * @return void
	 */
	public static function deregister( $ID = NULL );
}
