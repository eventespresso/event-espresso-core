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
 * Class EE_Register_Widget
 *
 * EEI_Plugin_API class for registering Widgets for use with EE core.
 * Receives an array of Widget details and takes care of adding all of the necessary hooks and filters to integrate with EE core
 *
 * @package        	Event Espresso
 * @subpackage  	plugin api
 * @since 				4.3.0
 * @author 				Brent Christensen
 */
class EE_Register_Widget implements EEI_Plugin_API {

	/**
	 * Holds values for registered widgets
	 * @var array
	 */
	protected static $_settings = array();



	/**
	 *    Method for registering new EED_Widgets
	 *
	 * @since    4.3.0
	 * @param string $widget_id			a unique identifier for this set of widgets
	 * @param  array $setup_args  		an array of arguments provided for registering widgets
	 * @type array widget_paths 		an array of full server paths to folders containing any EED_Widgets, or to the EED_Widget files themselves
	 * @throws EE_Error
	 * @return void
	 */
	public static function register( $widget_id = NULL, $setup_args = array()  ) {

		//required fields MUST be present, so let's make sure they are.
		if ( empty( $widget_id ) || ! is_array( $setup_args ) || empty( $setup_args['widget_paths'] )) {
			throw new EE_Error( __( 'In order to register Widgets with EE_Register_Widget::register(), you must include a "widget_id" (a unique identifier for this set of widgets), and an array containing the following keys: "widget_paths" (an array of full server paths to folders that contain widgets, or to the widget files themselves)', 'event_espresso' ));
		}

		//make sure we don't register twice
		if( isset( self::$_settings[ $widget_id ] ) ){
			return;
		}


		//make sure this was called in the right place!
		if ( ! did_action( 'AHEE__EE_System__load_espresso_addons' ) || did_action( 'AHEE__EE_System__register_shortcodes_modules_and_widgets' )) {
			EE_Error::doing_it_wrong(
				__METHOD__,
				__( 'An attempt to register widgets has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__register_shortcodes_modules_and_widgets" hook to register widgets.','event_espresso'),
				'4.3.0'
			);
		}
		//setup $_settings array from incoming values.
		self::$_settings[ $widget_id ] = array(
			// array of full server paths to any EED_Widgets used by the widget
			'widget_paths'  => isset( $setup_args['widget_paths'] ) ? (array)$setup_args['widget_paths'] : array(),
		);
		// add to list of widgets to be registered
		add_filter( 'FHEE__EE_Config__register_widgets__widgets_to_register', array( 'EE_Register_Widget', 'add_widgets' ));
	}



	/**
	 * Filters the list of widgets to add ours.
	 * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
	 * array('espresso_monkey'=>'/public_html/wonder-site/wp-content/plugins/ee4/widgets/espresso_monkey',...)
	 * @param array $widgets_to_register  array of paths to all widgets that require registering
	 * @return array
	 */
	public static function add_widgets( $widgets_to_register = array() ) {
		foreach( self::$_settings as $settings ) {
			$widgets_to_register = array_merge( $widgets_to_register, $settings['widget_paths'] );
		}
		return $widgets_to_register;
	}




	/**
	 * This deregisters a widget that was previously registered with a specific $widget_id.
	 *
	 * @since    4.3.0
	 *
	 * @param string  $widget_id the name for the widget that was previously registered
	 * @return void
	 */
	public static function deregister( $widget_id = NULL ) {
		if ( isset( self::$_settings[ $widget_id ] )) {
			unset( self::$_settings[ $widget_id ] );
		}
	}

}
// End of file EE_Register_Widget.lib.php
// Location: /core/libraries/plugin_api/EE_Register_Widget.lib.php