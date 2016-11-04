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
 * Class EE_Register_Payment_Method
 *
 * EEI_Plugin_API class for registering payment methods for use with EE core.
 * Receives an array of module details and takes care of adding all of the necessary hooks and filters to integrate with EE core
 *
 * @package        	Event Espresso
 * @subpackage  	plugin api
 * @since 				4.5.0
 * @author 				Mike Nelson
 */
class EE_Register_Payment_Method implements EEI_Plugin_API {

	/**
	 * Holds values for registered payment methods
	 * @var array
	 */
	protected static $_settings = array();



	/**
	 *    Method for registering new EE_PMT_Base children
	 *
	 * @since    4.5.0
	 * @param string $payment_method_id		a unique identifier for this set of modules Required.
	 * @param  array $setup_args 		an array of arguments provided for registering modules Required.{
	 *	@type string[] $payment_method_paths each element is the folder containing the EE_PMT_Base child class
	 *		(eg, 'public_html/wp-content/plugins/my_plugin/Payomatic/' which contains the files
	 *		EE_PMT_Payomatic.pm.php)
	 * }
	 * @throws EE_Error
	 * @type array payment_method_paths 	an array of full server paths to folders containing any EE_PMT_Base children, or to the EED_Module files themselves
	 * @return void
	 */
	public static function register( $payment_method_id = NULL, $setup_args = array()  ) {

		//required fields MUST be present, so let's make sure they are.
		if ( empty( $payment_method_id ) || ! is_array( $setup_args ) || empty( $setup_args['payment_method_paths'] )) {
			throw new EE_Error( __( 'In order to register Payment Methods with EE_Register_Payment_Method::register(), you must include a "payment_method_id" (a unique identifier for this set of modules), and an array containing the following keys: "payment_method_paths" (an array of full server paths to folders that contain modules, or to the module files themselves)', 'event_espresso' ));
		}

		//make sure we don't register twice
		if( isset( self::$_settings[ $payment_method_id ] ) ){
			return;
		}

		//make sure this was called in the right place!
		if ( ! did_action( 'AHEE__EE_System__load_espresso_addons' ) || did_action( 'AHEE__EE_System__register_shortcodes_modules_and_widgets' )) {
			EE_Error::doing_it_wrong(
				__METHOD__,
				__( 'An attempt to register modules has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__register_shortcodes_modules_and_widgets" hook to register modules.','event_espresso'),
				'4.3.0'
			);
		}
		//setup $_settings array from incoming values.
		self::$_settings[ $payment_method_id ] = array(
			// array of full server paths to any EE_PMT_Base children used
			'payment_method_paths'  => isset( $setup_args['payment_method_paths'] ) ? (array)$setup_args['payment_method_paths'] : array(),
		);
		// add to list of modules to be registered
		add_filter( 'FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register', array( 'EE_Register_Payment_Method', 'add_payment_methods' ));

		/**
		 * If EE_Payment_Method_Manager::register_payment_methods has already been called, we need it to be called again
		 * (because it's missing the payment method we JUST registered here). We are assuming EE_Register_payment_method::register()
		 * will be called only once per payment method from an addon, so going with that assumption we should always do this.
		 * If that assumption is false, we should verify this newly-registered payment method isn't on the EE_Payment_Method_Manager::_payment_method_types array before calling this (this code should be changed to improve performance)
		 */
		if ( did_action( 'FHEE__EE_Payment_Method_Manager__register_payment_methods__registered_payment_methods' ) ) {
			EE_Registry::instance()->load_lib('Payment_Method_Manager');
			EE_Payment_Method_Manager::instance()->maybe_register_payment_methods( TRUE );
		}
	}




	/**
	 * Filters the list of payment methods to add ours.
	 * and they're just full filepaths to FOLDERS containing a payment method class file. Eg.
	 * @param array $payment_method_folders  array of paths to all payment methods that require registering
	 * @return array
	 */
	public static function add_payment_methods( $payment_method_folders ){
		foreach( self::$_settings as $settings ) {
			$payment_method_folders = array_merge( $payment_method_folders, $settings['payment_method_paths'] );
		}
		return $payment_method_folders;
	}



	/**
	 * This deregisters a module that was previously registered with a specific $module_id.
	 *
	 * @since    4.3.0
	 *
	 * @param string  $module_id the name for the module that was previously registered
	 * @return void
	 */
	public static function deregister( $module_id = NULL ) {
		if ( isset( self::$_settings[ $module_id ] )) {
			unset( self::$_settings[ $module_id ] );
		}
	}

}
// End of file EE_Register_Payment_Method.lib.php
// Location: /core/libraries/plugin_api/EE_Register_Payment_Method.lib.php
