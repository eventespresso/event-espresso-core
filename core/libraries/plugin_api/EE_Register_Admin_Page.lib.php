<?php
/**
 * This file contains the EE_Register_Admin_Page class that implements EEI_Plugin_API.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.3.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * Use this to register or deregister an EE Admin Page.
 *
 * @package        Event Espresso
 * @subpackage  plugin api, admin
 * @since            4.3.0
 * @author          Darren Ethier
 */
class EE_Register_Admin_Page implements EEI_Plugin_API {


    /**
     * Holds registered EE_Admin_Pages
     * @var array
     */
    protected static $_ee_admin_page_registry = array();




    /**
     * The purpose of this method is to provide an easy way for addons to register their admin pages (using the EE Admin Page loader system).
     *
     * @since 4.3.0
     *
	 * @param  string $page_basename 	This string represents the basename of the Admin Page init.
	 *                                                        		The init file must use this basename in its name and class (i.e. {page_basename}_Admin_Page_Init.core.php).
     * @param  array  $config  {              An array of configuration options that will be used in different circumstances
	 *
	 *		@type  string $page_path             This is the path where the registered admin pages reside ( used to setup autoloaders).
	 *
	 * 	}
     * @return void
     */
    public static function register( $page_basename = NULL, $config = array() ) {

		// check that an admin_page has not already been registered with that name
		if ( isset(self::$_ee_admin_page_registry[ $page_basename ] )) {
			throw new EE_Error( sprintf( __( 'An Admin Page with the name "%s" has already been registered and each Admin Page requires a unique name.', 'event_espresso' ), $page_basename ));
		}

		// required fields MUST be present, so let's make sure they are.
		if ( empty( $page_basename ) || ! is_array( $config ) || empty( $config['page_path'] )) {
			throw new EE_Error( __( 'In order to register an Admin Page with EE_Register_Admin_Page::register(), you must include the "page_basename" (the class name of the page), and an array containing the following keys: "page_path" (the path where the registered admin pages reside)', 'event_espresso' ));
		}

		//make sure we don't register twice
		if( isset( self::$_ee_admin_page_registry[ $page_basename ] ) ){
			return;
		}

		if ( ! did_action( 'AHEE__EE_System__load_espresso_addons' ) || did_action( 'AHEE__EE_Admin__loaded' )) {
            EE_Error::doing_it_wrong(
				__METHOD__,
				sprintf(
					__('An attempt was made to register "%s" as an EE Admin page has failed because it was not registered at the correct time.  Please use the "AHEE__EE_Admin__loaded" hook to register Admin pages.','event_espresso'),
					$page_basename
				),
				'4.3'
			);
        }

        //add incoming stuff to our registry property
        self::$_ee_admin_page_registry[ $page_basename ] = array(
            'page_path' => $config['page_path'],
            'config' => $config
            );

       //add filters

       add_filter('FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs', array( 'EE_Register_Admin_Page', 'set_page_basename' ), 10 );
       add_filter('FHEE__EEH_Autoloader__load_admin_core', array( 'EE_Register_Admin_Page', 'set_page_path' ), 10 );

    }



    /**
     * This deregisters a EE_Admin page that is already registered.  Note, this MUST be loaded after the
     * page being deregistered is loaded.
     *
     * @since    4.3.0
     *
     * @param  string $page_basename Use whatever string was used to register the admin page.
     * @return  void
     */
    public static function deregister( $page_basename = NULL ) {
    	if ( !empty( self::$_ee_admin_page_registry[$page_basename] ) )
    		unset( self::$_ee_admin_page_registry[$page_basename] );
    }



	/**
	 * set_page_basename
	 *
	 * @param $installed_refs
	 * @return mixed
	 */
	public static function set_page_basename( $installed_refs ) {
		if ( ! empty( self::$_ee_admin_page_registry )) {
			foreach ( self::$_ee_admin_page_registry as $basename => $args ) {
				$installed_refs[ $basename ] = $args['page_path'];
			}
		}
        return $installed_refs;
    }



	/**
	 * set_page_path
	 *
	 * @param $paths
	 * @return mixed
	 */
	public static function set_page_path( $paths ) {
        foreach ( self::$_ee_admin_page_registry as $basename => $args ) {
            $paths[ $basename ] = $args['page_path'];
        }
        return $paths;
    }
}
