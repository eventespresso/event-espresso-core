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
	 * @param  string $config_class 	The name of the Config class being registered.
	 *                                   					Note this class must extend EE_Config Base and must have already been registered with an autoloader.
	 * @param  array $setup_args {
	 *
	 * 		@type  string $config_name 	Optional.  by default the new config will be registered to EE_Config::instance()->addons->{config_class}, but supplying a "config_name" will set the property name that this variable is accessible by. ie: EE_Config::instance()->addons->{config_name}
	 *                       		}
	 * @return void
	 */
	public static function register( $config_class = NULL, $setup_args = array() ) {

		$setup_args['config_name'] = isset( $setup_args['config_name'] ) ? $setup_args['config_name'] : $config_class;

		//required fields MUST be present, so let's make sure they are.
		if ( empty( $config_class ) || ! is_array( $setup_args ) || empty( $setup_args['config_name'] )) {
			throw new EE_Error( __( 'In order to register a Config Class with EE_Register_Config::register(), you must include a "config_class" (the actual class name for this config class). As well, you can supply an array containing the following keys: "config_name" (by default the new config will be registered to EE_Config::instance()->addons->{config_class}, but supplying a "config_name" will set the property name that this variable is accessible by. ie: EE_Config::instance()->addons->{config_name})', 'event_espresso' ));
		}


		//first find out if this happened too late.
		if ( did_action( 'AHEE__EE_System__load_core_configuration__begin' ) ) {
			EE_Error::doing_it_wrong(
				__METHOD__,
				sprintf(
					__('An attempt to register "%s" as an EE_Config object has failed because it was not registered at the correct hookpoint.  Please register before the "AHEE__EE_System__load_core_configuration__begin" hook has fired', 'event_espresso'),
					$setup_args['config_name']
				),
				'4.3'
				);
		}

		//add incoming stuff to our registry property
		self::$_ee_config_registry[ $config_class ] = $setup_args['config_name'];

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
				throw new EE_Error(
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
	public static function deregister( $config_class_name = NULL ) {
		if ( ! empty( self::$_ee_config_registry[ $config_class_name ] ))
    			unset( self::$_ee_config_registry[ $config_class_name ] );
	}
}
