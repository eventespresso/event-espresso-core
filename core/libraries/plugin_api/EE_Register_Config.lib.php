<?php
/**
 * This file contains the EE_Register_Config class that implements EEI_Plugin_API.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.3.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * Use this to register or deregister a new config with the EE_Registry::instance->CFG property.
 * Note that new configurations are added to the 'addons' index in the CFG property.
 *
 * @package        Event Espresso
 * @subpackage  plugin api, config
 * @since            4.3.0
 * @author          Darren Ethier
 */
class EE_Register_Config implements EEI_Plugin_API {

	/**
	 * Holds registered EE_Config items
	 * @var array
	 */
	protected static $_ee_config_registry = array();





	/**
	 * Handles registering the new config with the EE_Config::instance()->addons property
	 *
	 * @since    4.3.0
	 * @throws EE_Error
	 *
	 * @param  string $config_class_name The name of the Config class being registered.
	 *                                   		Note this class must extend EE_Config Base and
	 *                                   		must have already been registered with an
	 *                                   		autolaoder.
	 * @param  string $config_name          Optional.  By default the new config will be
	 *                                      		registered to EE_Config::instance()->
	 *                                      		addons->{$config_class_name}.  You may want
	 *                                      		to have more control over the property name
	 *                                      		which is what this variable is for.
	 * @return void
	 */
	public static function register( $config_class_name, $config_name = '' ) {
		//first find out if this happened too late.
		if ( did_action( 'AHEE__EE_System__load_core_configuration__begin' ) ) {
			EE_Error::doing_it_wrong(
				__METHOD__,
				sprintf(
					__('An attempt to register "%s" as an EE_Config object has failed because it was not registered at the correct hookpoint.  Please register before the "AHEE__EE_System__load_core_configuration__begin" hook has fired', 'event_espresso'),
					$config_name
				),
				'4.3'
				);
		}

		//add incoming stuff to our registry property
		self::$_ee_config_registry[ $config_class_name ] = $config_name;

		add_filter( 'FHEE__EE_Config__construct__addons', array( 'EE_Register_Config', 'set_config' ), 10 );
	}



	/**
	 * Callback for the FHEE__EE_Config__construct__addons filter.
	 * This callback registered the new configs with the EE_Config::instance()->addons
	 * property.
	 *
	 * @since    4.3.0
	 * @throws EE_Error
	 * @param StdClass $addons_config Object that holds all existing registered configs.
	 * @return \StdClass
	 */
	public static function set_config( $addons_config ) {
		foreach ( self::$_ee_config_registry as $class_name => $config_name ) {
			//first some validation of our incoming class_name.  We'll throw an error early if its' not registered correctly
			if ( ! class_exists( $class_name ) ) {
				throw EE_Error(
					sprintf(
						__( 'The "%s" config class can not be registered with EE_Config because the class does not exist.  Verify that an autoloader has been set for this class', 'event_espresso' ),
						$class_name
					)
				 );
			}
			$config_name = ! empty( $config_name ) ? $config_name : $class_name;
			$addons_config->{$config_name} = new $class_name;
		}
		return $addons_config;
	}



	/**
	 * @param mixed $config_class_name
	 */
	public static function deregister( $config_class_name ) {
		if ( ! empty( self::$_ee_config_registry[ $config_class_name ] ))
    			unset( self::$_ee_config_registry[ $config_class_name ] );
	}
}
