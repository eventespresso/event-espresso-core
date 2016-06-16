<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EED_Event_Single_Caff
 *
 * @package		Event Espresso
 * @subpackage	/modules/event_single_caff/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Event_Single_Caff  extends EED_Event_Single {



	/**
	 * @return EED_Event_Single_Caff
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		define( 'EVENT_SINGLE_CAFF_TEMPLATES_PATH', plugin_dir_path( __FILE__ ) . 'templates' . DS );
		define( 'EVENT_SINGLE_CAFF_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		add_action(
			'FHEE__EE_Admin_Page___load_page_dependencies__after_load__espresso_events__template_settings',
			array( 'EED_Event_Single_Caff', 'load_scripts_styles' ),
			10
		);
		add_action( 'AHEE__template_settings__template__before_settings_form', array( 'EED_Event_Single_Caff', 'template_settings_form' ), 10 );
		add_filter( 'FHEE__General_Settings_Admin_Page__update_template_settings__data', array( 'EED_Event_Single_Caff', 'update_template_settings' ), 10, 2 );
		// AJAX
		add_action( 'wp_ajax_espresso_update_event_single_order', array( 'EED_Event_Single_Caff', 'update_event_single_order' ) );
		add_action( 'wp_ajax_nopriv_espresso_update_event_single_order', array( 'EED_Event_Single_Caff', 'update_event_single_order' ) );

	}



	public static function load_scripts_styles() {
		add_action( 'admin_enqueue_scripts', array( 'EED_Event_Single_Caff', 'enqueue_scripts_styles' ), 10 );
	}



	public static function enqueue_scripts_styles() {
		wp_register_style( 'eed-event-single-sortable', EVENT_SINGLE_CAFF_ASSETS_URL . 'eed_event_single_sortable.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style( 'eed-event-single-sortable' );
		wp_register_script( 'eed-event-single-sortable', EVENT_SINGLE_CAFF_ASSETS_URL . 'eed_event_single_sortable.js', array( 'jquery-ui-sortable' ), EVENT_ESPRESSO_VERSION, true );
		wp_enqueue_script( 'eed-event-single-sortable' );
	}



	/**
	 * 	template_settings_form
	 *
	 *  @access 	public
	 *  @static
	 *  @return 	void
	 */
	public static function template_settings_form() {
		$config = EE_Registry::instance()->CFG->template_settings;
		$config = isset( $config->EED_Event_Single ) && $config->EED_Event_Single instanceof EE_Event_Single_Config ? $config->EED_Event_Single : new EE_Event_Single_Config();
		$config->use_sortable_display_order = isset( $config->use_sortable_display_order ) ? $config->use_sortable_display_order : false;
		$config = apply_filters( 'FHEE__EED_Event_Single__template_settings_form__event_list_config', $config );

		$event_single_order_array = array();
		$event_single_order_array[ $config->display_order_tickets ] = 'tickets';
		$event_single_order_array[ $config->display_order_datetimes ] = 'datetimes';
		$event_single_order_array[ $config->display_order_event ] = 'event';
		$event_single_order_array[ $config->display_order_venue ] = 'venue';
		// get template parts
		$template_parts = EED_Event_Single::instance()->initialize_template_parts( $config );
		// convert to array so that we can add more properties
		$config = get_object_vars( $config );
		$config[ 'event_single_display_order' ] = $template_parts->generate_sortable_list_of_template_parts( 'event-single-sortable-js', '', 'single-sortable-li single-sortable-js' );
		EEH_Template::display_template( EVENT_SINGLE_CAFF_TEMPLATES_PATH . 'admin-event-single-settings.template.php', $config );
	}



	/**
	 *    update_template_settings
	 *
	 * @access    	public
	 * @param 		EE_Template_Config $CFG
	 * @param 		array $REQ
	 * @return    	EE_Event_Single_Config
	 */
	public static function update_template_settings( $CFG, $REQ ) {
		$display_order_tickets = isset( $CFG->EED_Event_Single->display_order_tickets ) ? $CFG->EED_Event_Single->display_order_tickets : 100;
		$display_order_datetimes = isset( $CFG->EED_Event_Single->display_order_datetimes ) ? $CFG->EED_Event_Single->display_order_datetimes : 110;
		$display_order_event = isset( $CFG->EED_Event_Single->display_order_event ) ? $CFG->EED_Event_Single->display_order_event : 120;
		$display_order_venue = isset( $CFG->EED_Event_Single->display_order_venue ) ? $CFG->EED_Event_Single->display_order_venue : 130;
		$CFG->EED_Event_Single = new EE_Event_Single_Config();
		$CFG->EED_Event_Single->display_status_banner_single = !empty( $REQ['display_status_banner_single'] ) && $REQ['display_status_banner_single'] ? TRUE : FALSE;
		$CFG->EED_Event_Single->display_venue = ! empty( $REQ['display_venue'] ) && $REQ['display_venue'] ? TRUE : FALSE;
		$CFG->EED_Event_Single->use_sortable_display_order = ! empty( $REQ[ 'EED_Events_Single_use_sortable_display_order' ] ) ? absint( $REQ[ 'EED_Events_Single_use_sortable_display_order' ] ) : 0;
		$CFG->EED_Event_Single->display_order_tickets = $CFG->EED_Event_Single->use_sortable_display_order ? $display_order_tickets : 100;
		$CFG->EED_Event_Single->display_order_datetimes = $CFG->EED_Event_Single->use_sortable_display_order ? $display_order_datetimes : 110;
		$CFG->EED_Event_Single->display_order_event = $CFG->EED_Event_Single->use_sortable_display_order ? $display_order_event : 120;
		$CFG->EED_Event_Single->display_order_venue = $CFG->EED_Event_Single->use_sortable_display_order ? $display_order_venue : 130;
		do_action( 'AHEE__EED_Event_Single__update_template_settings__after_update', $CFG, $REQ );
		return $CFG;
	}



	/**
	 * update_event_single_order
	 *
	 * @access    public
	 * @return    void
	 */
	public static function update_event_single_order() {
		$config_saved = false;
		$template_parts = sanitize_text_field( $_POST[ 'elements' ] );
		if ( ! empty( $template_parts ) ) {
			$template_parts = explode( ',', trim( $template_parts, ',' ) );
			foreach ( $template_parts as $key => $template_part ) {
				$template_part = "display_order_$template_part";
				$priority = ( $key * 10 ) + 100;
				EE_Registry::instance()->CFG->template_settings->EED_Event_Single->{$template_part} = $priority;
				do_action( "AHEE__EED_Event_Single__update_event_single_order__$template_part", $priority );
			}
			$config_saved = EE_Registry::instance()->CFG->update_espresso_config( false, false );
		}
		if ( $config_saved ) {
			EE_Error::add_success( __( 'Display Order has been successfully updated.', 'event_espresso' ) );
		} else {
			EE_Error::add_error( __( 'Display Order was not updated.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		}
		echo wp_json_encode( EE_Error::get_notices( false ));
		exit();
	}



	/**
	 *    run - initial module setup
	 *
	 * @access    public
	 * @param WP $WP
	 * @return    void
	 */
	public function run( $WP ) {
	}


}
// End of file EED_Event_Single_Caff.module.php
// Location: /modules/event_single_caff/EED_Event_Single_Caff.module.php