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
 * Class EE_Register_Data_Migration_Scripts
 *
 * EEI_Plugin_API class for registering addons for use with EE core.
 * Receives an array of addon details and takes care of adding all of the necessary hooks and filters to setup things such as autoloaders, configuration settings, data migration scripts, admin pages, modules, shortcodes, and even widgets
 *
 * @package        	Event Espresso
 * @subpackage  	plugin api
 * @since 				4.3.0
 * @author 				Brent Christensen
 */
class EE_Register_Data_Migration_Scripts implements EEI_Plugin_API {

	/**
	 * Holds values for registered DMSs
	 * @var array
	 */
	protected static $_settings = array();



	/**
	 *    Method for registering new Data Migration Scripts
	 *
	 * @since    4.3.0
	 * @param string $dms_id		a unique identifier for this set of data migration scripts
	 * @param  array $setup_args {
	 *		@type string $dms_paths 				an array of full server paths to folders that contain data migration scripts
	 * }
	 * @throws EE_Error
	 * @return void
	 */
	public static function register( $dms_id = NULL, $setup_args = array()  ) {

		//required fields MUST be present, so let's make sure they are.
		if ( empty( $dms_id ) || ! is_array( $setup_args ) || empty( $setup_args['dms_paths'] )) {
			throw new EE_Error( __( 'In order to register Data Migration Scripts with EE_Register_Data_Migration_Scripts::register(), you must include a "dms_id" (a unique identifier for this set of data migration scripts), and  an array containing the following keys: "dms_paths" (an array of full server paths to folders that contain data migration scripts)', 'event_espresso' ));
		}

		//make sure we don't register twice
		if( isset( self::$_settings[ $dms_id ] ) ){
			return;
		}

		//make sure this was called in the right place!
		if ( ! did_action( 'AHEE__EE_System__load_espresso_addons' ) || did_action( 'AHEE__EE_System___detect_if_activation_or_upgrade__begin' )) {
			EE_Error::doing_it_wrong(
				__METHOD__,
					__( 'An attempt to register Data Migration Scripts has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__load_espresso_addons" hook to register Data Migration Scripts.','event_espresso'),
				'4.3.0'
			);
		}
		//setup $_settings array from incoming values.
		self::$_settings[ $dms_id ] = array(
			'dms_paths' =>isset( $setup_args['dms_paths'] ) ? (array)$setup_args['dms_paths'] : array()
		);
		// setup DMS
		add_filter( 'FHEE__EE_Data_Migration_Manager__get_data_migration_script_folders', array( 'EE_Register_Data_Migration_Scripts', 'add_data_migration_script_folders' ));
	}



	/**
	 *    add_data_migration_script_folders
	 * @param array $dms_paths
	 * @return array
	 */
	public static function add_data_migration_script_folders( $dms_paths = array() ){
		foreach( self::$_settings as $settings ) {
			$dms_paths = array_merge( $dms_paths, $settings['dms_paths'] );
		}
		return $dms_paths;
	}



	/**
	 * This deregisters a set of Data Migration Scripts that were previously registered with a specific dms_id
	 *
	 * @since    4.3.0
	 *
	 * @param mixed $dms_id  unique identifier for the set of Data Migration Scripts that were previously registered
	 * @return void
	 */
	public static function deregister( $dms_id = NULL ) {
		if ( isset( self::$_settings[ $dms_id ] )) {
			unset( self::$_settings[ $dms_id ] );
		}
	}

}
// End of file EE_Register_Data_Migration_Scripts.lib.php
// Location: /core/libraries/plugin_api/EE_Register_Data_Migration_Scripts.lib.php