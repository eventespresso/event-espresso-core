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
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EED_Events_Archive_Caff
 *
 * @package		Event Espresso
 * @subpackage	/modules/events_archive_caff/
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Events_Archive_Caff  extends EED_Events_Archive {


	/**
	 * @return EED_Events_Archive_Caff
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
		define( 'EVENTS_ARCHIVE_CAFF_TEMPLATES_PATH', str_replace( '\\', DS, plugin_dir_path( __FILE__ )) . 'templates' . DS );
		define( 'EVENT_ARCHIVE_CAFF_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets' . DS );
		add_action( 'AHEE__template_settings__template__before_settings_form', array( 'EED_Events_Archive_Caff', 'template_settings_form' ), 10 );
		add_filter( 'FHEE__General_Settings_Admin_Page__update_template_settings__data', array( 'EED_Events_Archive_Caff', 'update_template_settings' ), 10, 2 );
		// AJAX
		add_action( 'wp_ajax_espresso_update_event_archive_order', array( 'EED_Events_Archive_Caff', 'update_event_archive_order' ) );
		add_action( 'wp_ajax_nopriv_espresso_update_event_archive_order', array( 'EED_Events_Archive_Caff', 'update_event_archive_order' ) );
	}




	/**
	 *    run - initial module setup
	 *
	 * @access    public
	 * @param    WP $WP
	 * @return    void
	 */
	public function run( $WP ) {
	}




	/**
	 * 	template_settings_form
	 *
	 *  @access 	public
	 *  @static
	 *  @return 	void
	 */
	public static function template_settings_form() {
		// grab general settings admin page and remove the existing hook callback
		$gen_set_admin = EE_Registry::instance()->LIB->EE_Admin_Page_Loader->get_admin_page_object( 'general_settings' );
		if ( $gen_set_admin instanceof General_Settings_Admin_Page ) {
			remove_action( 'AHEE__template_settings__template__before_settings_form', array( $gen_set_admin, 'template_settings_caff_features' ), 100 );
		}
		$template_settings = EE_Registry::instance()->CFG->template_settings;
		$template_settings->EED_Events_Archive = isset( $template_settings->EED_Events_Archive ) ? $template_settings->EED_Events_Archive : new EE_Events_Archive_Config();
		$template_settings->EED_Events_Archive = apply_filters( 'FHEE__EED_Events_Archive__template_settings_form__event_list_config', $template_settings->EED_Events_Archive );
		$events_archive_settings = array(
			'display_status_banner' => 0,
			'display_description' => 1,
			'display_ticket_selector' => 0,
			'display_datetimes' => 1,
			'display_venue' => 0,
			'display_expired_events' => 0
		);


		$event_archive_order_array = array();
		$event_archive_order_array[ EE_Registry::instance()->CFG->template_settings->EED_Events_Archive->display_order_tickets ] = 'tickets';
		$event_archive_order_array[ EE_Registry::instance()->CFG->template_settings->EED_Events_Archive->display_order_datetimes ] = 'datetimes';
		$event_archive_order_array[ EE_Registry::instance()->CFG->template_settings->EED_Events_Archive->display_order_event ] = 'event';
		$event_archive_order_array[ EE_Registry::instance()->CFG->template_settings->EED_Events_Archive->display_order_venue ] = 'venue';
		ksort( $event_archive_order_array );
		$templates = array(
			'tickets'   => __( "Ticket Selector", "event_espresso" ),
			'datetimes' => __( "Dates and Times", "event_espresso" ),
			'event'     => __( "Event Description", "event_espresso" ),
			'venue'     => __( "Venue Information", "event_espresso" ),
		);
		foreach ( $templates as $template => $text ) {
			if ( ! in_array( $template, $event_archive_order_array ) ) {
				array_push( $event_archive_order_array, $template );
			}
		}
		$event_archive_display_order = '';
		foreach ( $event_archive_order_array as $template ) {
			$event_archive_display_order .= '
<li id="' . $template . '" class="archive-sortable-li archive-sortable-js" ><span class="dashicons dashicons-arrow-up-alt2" ></span ><span class="dashicons dashicons-arrow-down-alt2" ></span >' . $templates[ $template ] . '</li>';
		}
		$events_archive_settings[ 'event_archive_display_order' ] = $event_archive_display_order;

		$events_archive_settings = array_merge( $events_archive_settings, (array)$template_settings->EED_Events_Archive );
		EEH_Template::display_template( EVENTS_ARCHIVE_CAFF_TEMPLATES_PATH . 'admin-event-list-settings.template.php', $events_archive_settings );
	}






	/**
	 * 	update_template_settings
	 *
	 *  @access 	public
	 *  @param 	EE_Events_Archive_Config $CFG
	 *  @param 	EE_Request_Handler $REQ
	 *  @return    EE_Events_Archive_Config
	 */
	public static function update_template_settings( $CFG, $REQ ) {
		$display_order_tickets = $CFG->EED_Events_Archive->display_order_tickets;
		$display_order_datetimes = $CFG->EED_Events_Archive->display_order_datetimes;
		$display_order_event = $CFG->EED_Events_Archive->display_order_event;
		$display_order_venue = $CFG->EED_Events_Archive->display_order_venue;
		$CFG->EED_Events_Archive = new EE_Events_Archive_Config();
		// unless we are resetting the config...
		if ( ! isset( $REQ['EED_Events_Archive_reset_event_list_settings'] ) || absint( $REQ['EED_Events_Archive_reset_event_list_settings'] ) !== 1 ) {
			$CFG->EED_Events_Archive->display_status_banner = isset( $REQ['EED_Events_Archive_display_status_banner'] ) ? absint( $REQ['EED_Events_Archive_display_status_banner'] ) : 0;
			$CFG->EED_Events_Archive->display_description = isset( $REQ['EED_Events_Archive_display_description'] ) ? absint( $REQ['EED_Events_Archive_display_description'] ) : 1;
			$CFG->EED_Events_Archive->display_ticket_selector = isset( $REQ['EED_Events_Archive_display_ticket_selector'] ) ? absint( $REQ['EED_Events_Archive_display_ticket_selector'] ) : 0;
			$CFG->EED_Events_Archive->display_datetimes = isset( $REQ['EED_Events_Archive_display_datetimes'] ) ? absint( $REQ['EED_Events_Archive_display_datetimes'] ) : 1;
			$CFG->EED_Events_Archive->display_venue = isset( $REQ['EED_Events_Archive_display_venue'] ) ? absint( $REQ['EED_Events_Archive_display_venue'] ) : 0;
			$CFG->EED_Events_Archive->display_expired_events = isset( $REQ['EED_Events_Archive_display_expired_events'] ) ? absint( $REQ['EED_Events_Archive_display_expired_events'] ) : 0;
			$CFG->EED_Events_Archive->display_order_tickets = $display_order_tickets;
			$CFG->EED_Events_Archive->display_order_datetimes = $display_order_datetimes;
			$CFG->EED_Events_Archive->display_order_event = $display_order_event;
			$CFG->EED_Events_Archive->display_order_venue = $display_order_venue;
		}
		return $CFG;
	}



	/**
	 * update_event_single_order
	 *
	 * @access    public
	 * @return    void
	 */
	public static function update_event_archive_order() {
		$elements = sanitize_text_field( $_POST[ 'elements' ] );
		$elements = explode( ',', trim( $elements, ',' ) );
		foreach ( $elements as $key => $element ) {
			$element = "display_order_$element";
			EE_Registry::instance()->CFG->template_settings->EED_Events_Archive->$element = $key;
		}
		$config_saved = EE_Registry::instance()->CFG->update_espresso_config( false, false );
		if ( $config_saved ) {
			EE_Error::add_success( __( 'Display Order has been successfully updated.', 'event_espresso' ) );
		} else {
			EE_Error::add_success( __( 'Display Order was not updated.', 'event_espresso' ) );
		}
		echo wp_json_encode( EE_Error::get_notices( false ) );
		exit();
	}


}





// End of file EED_Events_Archive.module.php
// Location: /modules/events_archive_caff/EED_Events_Archive.module.php