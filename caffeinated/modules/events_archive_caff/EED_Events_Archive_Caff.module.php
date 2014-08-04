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
		add_action( 'AHEE__template_settings__template__before_settings_form', array( 'EED_Events_Archive_Caff', 'template_settings_form' ), 10 );
		add_filter( 'FHEE__General_Settings_Admin_Page__update_template_settings__data', array( 'EED_Events_Archive_Caff', 'update_template_settings' ), 10, 2 );
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
		$events_archive_settings = array_merge( $events_archive_settings, (array)$template_settings->EED_Events_Archive );
		EEH_Template::display_template( EVENTS_ARCHIVE_CAFF_TEMPLATES_PATH . 'admin-event-list-settings.template.php', $events_archive_settings );
	}






	/**
	 * 	update_template_settings
	 *
	 *  @access 	public
	 *  @param 	EE_Events_Archive_Config $CFG
	 *  @param 	EE_Request_Handler $REQ
	 *  @return 	void
	 */
	public static function update_template_settings( $CFG, $REQ ) {
		$CFG->EED_Events_Archive = new EE_Events_Archive_Config();
		// unless we are resetting the config...
		if ( ! isset( $REQ['EED_Events_Archive_reset_event_list_settings'] ) || absint( $REQ['EED_Events_Archive_reset_event_list_settings'] ) !== 1 ) {
			$CFG->EED_Events_Archive->display_status_banner = isset( $REQ['EED_Events_Archive_display_status_banner'] ) ? absint( $REQ['EED_Events_Archive_display_status_banner'] ) : 0;
			$CFG->EED_Events_Archive->display_description = isset( $REQ['EED_Events_Archive_display_description'] ) ? absint( $REQ['EED_Events_Archive_display_description'] ) : 1;
			$CFG->EED_Events_Archive->display_ticket_selector = isset( $REQ['EED_Events_Archive_display_ticket_selector'] ) ? absint( $REQ['EED_Events_Archive_display_ticket_selector'] ) : 0;
			$CFG->EED_Events_Archive->display_datetimes = isset( $REQ['EED_Events_Archive_display_datetimes'] ) ? absint( $REQ['EED_Events_Archive_display_datetimes'] ) : 1;
			$CFG->EED_Events_Archive->display_venue = isset( $REQ['EED_Events_Archive_display_venue'] ) ? absint( $REQ['EED_Events_Archive_display_venue'] ) : 0;
			$CFG->EED_Events_Archive->display_expired_events = isset( $REQ['EED_Events_Archive_display_expired_events'] ) ? absint( $REQ['EED_Events_Archive_display_expired_events'] ) : 0;			}
		return $CFG;
	}



}





// End of file EED_Events_Archive.module.php
// Location: /modules/events_archive_caff/EED_Events_Archive.module.php