<?php
/**
 * This file contains the EE_Plugin_API helper class.
 * @package 	  Event Espresso
 * @subpackage helpers
 * @since 		  4.4.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * A helper class containing methods for easily registering COMPLETE components in the EE system.
 *
 * Used internally by EE for registering some caffeinated components, and provided as an easy
 * method for plugins to register entire components.  To be clear, there are certain systems in EE
 * where implementing them for a plugin requires multiple actions and filters being hooked into.
 * Within this class are wrappers for "registering" with a few parameters and then the registry method
 * will take care of setting up all the required filters and hooks for that system to be successfully
 * hooked into.
 *
 * @package 		Event Espresso
 * @subpackage 	helpers
 * @since 			4.4.0
 * @author  		Darren Ethier
 */
class EEH_Plugin_API {

	/**
	 * Holds registered EE_Admin_Pages
	 * @var array
	 */
	protected static $_ee_admin_page_registry = array();



	/**
	 * The purpose of this method is to provide an easy way for addons to register their admin pages (
	 * using the EE Admin Page loader system).
	 *
	 * @since 4.4.0
	 *
	 * @param  string $page_basename 	This string represents the basename of the Admin Page
	 *                                					init.  The init file must use this basename in its name and
	 *                                					class (i.e. {page_basename}_Admin_Page_Init.core.php).
	 * @param  string $page_path     		This is the path where the registered admin pages reside (
	 *                                 				used to setup autoloaders).
	 * @param  array  $config       			An array of extra configuration options (optional) that will
	 *                                 				be used in different circumstances (@todo this is currently
	 *                                 				in flux, hence why we have an array so people can use
	 *                                 				implemented options and at a later date we can add
	 *                                 				additional ones without messing up existing usage)
	 * @return void
	 */
	public static function register_ee_admin_page( $page_basename, $page_path, $config = array() ) {

		if ( ! did_action( 'AHEE__EE_Admin__loaded' ) || did_action( 'AHEE__EE_System__initialize_last' )) {
			EE_Error::doing_it_wrong('EEH_Plugin_API::register_ee_admin_page', __('Should be only called on the "AHEE__EE_Admin__loaded" hook.','event_espresso'), '4.1' );
		}

		//add incoming stuff to our registry property
		self::$_ee_admin_page_registry[$page_basename] = array(
			'page_path' => $page_path,
			'config' => $config
			);

		add_filter('FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs', array( 'EEH_Plugin_API', 'set_page_basename' ), 10 );
		add_filter('FHEE__EEH_Autoloader__load_admin_core', array( 'EEH_Plugin_API', 'set_page_path' ), 10 );

	}


	public static function set_page_basename( $installed_refs ) {
		foreach ( self::$_ee_admin_page_registry as $basename => $args ) {
			$installed_refs[] = $basename;
		}
		return $installed_refs;
	}



	public static function set_page_path( $paths ) {
		foreach ( self::$_ee_admin_page_registry as $basename => $args ) {
			$paths[] = $args['page_path'];
		}
		return $paths;
	}


}
