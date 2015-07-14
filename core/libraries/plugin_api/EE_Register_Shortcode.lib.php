<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			    Event Espresso
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 */
/**
 * Class EE_Register_Shortcode
 *
 * EEI_Plugin_API class for registering shortcodes for use with EE core.
 * Receives an array of shortcode details and takes care of adding all of the necessary hooks and filters to integrate with EE core
 *
 * @package        	Event Espresso
 * @subpackage  	plugin api
 * @since 				4.3.0
 * @author 				Brent Christensen
 */
class EE_Register_Shortcode implements EEI_Plugin_API {

	/**
	 * Holds values for registered shortcodes
	 * @var array
	 */
	protected static $_settings = array();



	/**
	 *    Method for registering new EE_Shortcodes
	 *
	 * @since    4.3.0
	 * @param string $shortcode_id		a unique identifier for this set of modules Required.
	 * @param  array $setup_args  						an array of arguments provided for registering shortcodes Required.
	 * @type array shortcode_paths 		an array of full server paths to folders containing any EES_Shortcodes, or to the EES_Shortcode files themselves
	 * @throws EE_Error
	 * @return void
	 */
	public static function register( $shortcode_id = NULL, $setup_args = array()  ) {

		//required fields MUST be present, so let's make sure they are.
		if ( empty( $shortcode_id ) || ! is_array( $setup_args ) || empty( $setup_args['shortcode_paths'] )) {
			throw new EE_Error( __( 'In order to register Modules with EE_Register_Shortcode::register(), you must include a "shortcode_id" (a unique identifier for this set of shortcodes), and an array containing the following keys: "shortcode_paths" (an array of full server paths to folders that contain shortcodes, or to the shortcode files themselves)', 'event_espresso' ));
		}

		//make sure we don't register twice
		if( isset( self::$_settings[ $shortcode_id ] ) ){
			return;
		}

		//make sure this was called in the right place!
		if ( ! did_action( 'AHEE__EE_System__load_espresso_addons' ) || did_action( 'AHEE__EE_System__register_shortcodes_modules_and_widgets' )) {
			EE_Error::doing_it_wrong(
				__METHOD__,
				__( 'An attempt to register shortcodes has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__register_shortcodes_modules_and_widgets" hook to register shortcodes.','event_espresso'),
				'4.3.0'
			);
		}
		//setup $_settings array from incoming values.
		self::$_settings[ $shortcode_id ] = array(
			// array of full server paths to any EES_Shortcodes used by the shortcode
			'shortcode_paths'  => isset( $setup_args['shortcode_paths'] ) ? (array)$setup_args['shortcode_paths'] : array(),
		);
		// add to list of shortcodes to be registered
		add_filter( 'FHEE__EE_Config__register_shortcodes__shortcodes_to_register', array( 'EE_Register_Shortcode', 'add_shortcodes' ));
	}



	/**
	 * Filters the list of shortcodes to add ours.
	 * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
	 * array('espresso_monkey'=>'/public_html/wonder-site/wp-content/plugins/ee4/shortcodes/espresso_monkey',...)
	 * @param array $shortcodes_to_register  array of paths to all shortcodes that require registering
	 * @return array
	 */
	public static function add_shortcodes( $shortcodes_to_register ){
		foreach( self::$_settings as $settings ) {
			$shortcodes_to_register = array_merge( $shortcodes_to_register, $settings['shortcode_paths'] );
		}
		return $shortcodes_to_register;
	}




	/**
	 * This deregisters a shortcode that was previously registered with a specific $shortcode_id.
	 *
	 * @since    4.3.0
	 *
	 * @param string  $shortcode_id the name for the shortcode that was previously registered
	 * @return void
	 */
	public static function deregister( $shortcode_id = NULL ) {
		if ( isset( self::$_settings[ $shortcode_id ] )) {
			unset( self::$_settings[ $shortcode_id ] );
		}
	}

}
// End of file EE_Register_Shortcode.lib.php
// Location: /core/libraries/plugin_api/EE_Register_Shortcode.lib.php