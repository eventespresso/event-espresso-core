<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Extend_General_Settings_Admin_Page
 *
 * This contains the logic for setting up the Custom General_Settings related pages.  Any methods without phpdoc comments have inline docs with parent class.
 *
 * This is the extended (caf) general settings class
 *
 * @package		Extend_General_Settings_Admin_Page
 * @subpackage	caffeinated/admin/extend/general_settings/Extend_General_Settings_Admin_Page.core.php
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Extend_General_Settings_Admin_Page extends General_Settings_Admin_Page {



	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		define( 'GEN_SET_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'general_settings/templates/' );
	}



	protected function _extend_page_config() {

		$this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'general_settings';

		$new_page_routes = array(
			'update_template_settings' => array(
				'func' => '_update_template_settings',
				'noheader' => TRUE,
			),
			'google_map_settings' => '_google_map_settings',
			'update_google_map_settings' => array(
				'func' => '_update_google_map_settings',
				'noheader' => TRUE
			)
		);

		$this->_page_routes = array_merge( $this->_page_routes, $new_page_routes );

		$new_page_config = array(
			//template settings
			'template_settings' => array(
				'nav' => array(
					'label' => __('Templates'),
					'order' => 30
				),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
				'help_tabs' => array(
					'general_settings_templates_help_tab' => array(
						'title' => __('Templates', 'event_espresso'),
						'filename' => 'general_settings_templates'
					)
				),
				'help_tour' => array( 'Templates_Help_Tour' ),
				'require_nonce' => FALSE
			),
			'google_map_settings' => array(
				'nav' => array(
					'label' => __('Google Maps'),
					'order' => 40
					),
				'metaboxes' => array('_publish_post_box',  '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
				'help_tabs' => array(
					'general_settings_google_maps_help_tab' => array(
						'title' => __('Google Maps', 'event_espresso'),
						'filename' => 'general_settings_google_maps'
						)
					),
				'help_tour' => array( 'Google_Maps_Help_Tour' ),
				'require_nonce' => FALSE
			)
			);
		$this->_page_config = array_merge( $this->_page_config, $new_page_config );

		//filters and action hooks here
		add_action('AHEE__admin_option_settings__template__before', array( $this, 'use_venue_and_staff_manager_settings'), 10 );
		add_action( 'AHEE__admin_option_settings__template__before', array( $this, 'debug_logging_options' ), 9 );
		add_filter( 'FHEE__General_Settings_Admin_Page___update_admin_option_settings__CFG_admin', array( $this, 'update_debug_logging_options' ), 10, 1 );

	}



	public function use_venue_and_staff_manager_settings( $template_args ) {
		$_args['use_personnel_manager_select'] = EEH_Form_Fields::select_input('use_personnel_manager', $template_args['values'], $template_args['use_personnel_manager'] );
		$template = GEN_SET_CAF_TEMPLATE_PATH . 'use_venue_and_staff_manager_settings.template.php';
		EEH_Template::display_template( $template, $_args );
	}



		/*************		Logging Settings 		*************/



	/**
	 * _request_filesystem_credentials
	 * if attempting to enable full logging, WordPress may require filesystem credentials for FTP or SSH depending on the server
	 *
	 * @access   protected
	 * @param bool $show_errors
	 * @return bool
	 */
	protected function _request_filesystem_credentials( $show_errors = TRUE ) {

		require_once( ABSPATH . 'wp-admin/includes/file.php' );
		$url = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => 'request_filesystem_credentials' ), $this->_admin_base_url );
		$credentials = request_filesystem_credentials( $url );
		if ( $credentials == FALSE ) {
			if ( $show_errors ) {
				EE_Error::get_notices( FALSE );
				EE_Error::reset_notices();
				EE_Error::add_error( __('Connection settings are missing or incorrect. Please verify that the connection settings below are correct.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
				add_filter( 'FHEE__General_Settings_Admin_Page___update_admin_option_settings__success', '__return_false' );
			}
			return FALSE;
		}
		// now we have some credentials, try to get the wp_filesystem running
		$WP_Filesystem = WP_Filesystem( $credentials );
		if ( ! $WP_Filesystem ) {
			if ( $show_errors ) {
				EE_Error::get_notices( FALSE );
				EE_Error::reset_notices();
				EE_Error::add_error( __('There was an error connecting to the server. Please verify that the connection settings below are correct.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
				add_filter( 'FHEE__General_Settings_Admin_Page___update_admin_option_settings__success', '__return_false' );
			}
			// our credentials were no good, ask the user for them again
			request_filesystem_credentials( $url );
			return FALSE;
		}
		EE_Registry::instance()->CFG->admin->use_full_logging = TRUE;
		return TRUE;
	}



	/**
	 * debug_logging_options
	 *
	 * @param array $template_args
	 * @return void
	 */
	public function debug_logging_options( $template_args = array() ) {
		if ( EE_Registry::instance()->CFG->admin->use_full_logging === NULL ) {
			$this->_request_filesystem_credentials( FALSE );
			$template_args['use_full_logging'] = TRUE;
			EE_Error::get_notices( FALSE );
			EE_Error::reset_notices();
			EE_Error::add_attention( __('In order to enable Full Logging, the connection settings below are required.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			echo EE_Error::get_notices();
		} else {
			$template_args['use_full_logging'] = EE_Registry::instance()->CFG->admin->use_full_logging;
		}
		$template_args['use_remote_logging'] = isset( EE_Registry::instance()->CFG->admin->use_remote_logging ) ? absint( EE_Registry::instance()->CFG->admin->use_remote_logging ) : FALSE;
		$template_args['remote_logging_url'] = isset( EE_Registry::instance()->CFG->admin->remote_logging_url ) && ! empty( EE_Registry::instance()->CFG->admin->remote_logging_url ) ? stripslashes( EE_Registry::instance()->CFG->admin->remote_logging_url ) : '';
		$template = GEN_SET_CAF_TEMPLATE_PATH . 'debug_log_settings.template.php';
		EEH_Template::display_template( $template, $template_args );
	}



	/**
	 * update_debug_logging_options
	 *
	 * @param array $admin_options
	 * @return array
	 */
	public function update_debug_logging_options( $admin_options = array() ) {
		$use_full_logging = isset( $this->_req_data['use_full_logging'] ) ? (bool)absint( $this->_req_data['use_full_logging'] ) : $admin_options->use_full_logging;
		// trying to enable full logging for the first time?
		if ( $use_full_logging && $use_full_logging !== $admin_options->use_full_logging ) {
			$admin_options->use_full_logging = $this->_request_filesystem_credentials() ? TRUE : NULL;
			if ( $admin_options->use_full_logging === NULL ) {
				add_filter( 'FHEE__General_Settings_Admin_Page___update_admin_option_settings__success', '__return_false' );
			}
		} else {
			$admin_options->use_full_logging = $use_full_logging;
		}
		if ( $use_full_logging === FALSE ) {
			EE_Error::get_notices( FALSE );
			EE_Error::reset_notices();
		}

		$admin_options->use_remote_logging = isset( $this->_req_data['use_remote_logging'] ) ? absint( $this->_req_data['use_remote_logging'] ) : $admin_options->use_remote_logging;
		$admin_options->remote_logging_url = isset( $this->_req_data['remote_logging_url'] ) ? esc_url_raw( $this->_req_data['remote_logging_url'] ) : $admin_options->remote_logging_url;
		return $admin_options;


		
	/*************		Template Settings 		*************/



	protected function _template_settings() {
		$this->_template_args['values'] = $this->_yes_no_values;
		$this->_template_args = apply_filters( 'FHEE__General_Settings_Admin_Page__template_settings__template_args', $this->_template_args );
		$this->_set_add_edit_form_tags( 'update_template_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( GEN_SET_CAF_TEMPLATE_PATH . 'template_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();
	}



	protected function _update_template_settings() {

		EE_Registry::instance()->CFG->template_settings = apply_filters( 'FHEE__General_Settings_Admin_Page__update_template_settings__data', EE_Registry::instance()->CFG->template_settings, $this->_req_data );

		$what = 'Template Settings';
		$success = $this->_update_espresso_configuration( $what, EE_Registry::instance()->CFG->template_settings, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'template_settings' ) );

	}



	/*************		Google Maps 		*************/


	protected function _google_map_settings() {


		$this->_template_args['values'] = $this->_yes_no_values;
		$default_map_settings = new stdClass();
		$default_map_settings->use_google_maps = TRUE;
		// for event details pages (reg page)
		$default_map_settings->event_details_map_width = 585; 			// ee_map_width_single
		$default_map_settings->event_details_map_height = 362; 			// ee_map_height_single
		$default_map_settings->event_details_map_zoom = 14; 			// ee_map_zoom_single
		$default_map_settings->event_details_display_nav = TRUE; 			// ee_map_nav_display_single
		$default_map_settings->event_details_nav_size = FALSE; 			// ee_map_nav_size_single
		$default_map_settings->event_details_control_type = 'default'; 		// ee_map_type_control_single
		$default_map_settings->event_details_map_align = 'center'; 			// ee_map_align_single
		// for event list pages
		$default_map_settings->event_list_map_width = 300; 			// ee_map_width
		$default_map_settings->event_list_map_height = 185; 		// ee_map_height
		$default_map_settings->event_list_map_zoom = 12; 			// ee_map_zoom
		$default_map_settings->event_list_display_nav = FALSE; 		// ee_map_nav_display
		$default_map_settings->event_list_nav_size = TRUE; 			// ee_map_nav_size
		$default_map_settings->event_list_control_type = 'dropdown'; 		// ee_map_type_control
		$default_map_settings->event_list_map_align = 'center'; 			// ee_map_align

		$this->_template_args['map_settings'] =
				isset( EE_Registry::instance()->CFG->map_settings ) && ! empty( EE_Registry::instance()->CFG->map_settings )
				? (object)array_merge( (array)$default_map_settings, (array)EE_Registry::instance()->CFG->map_settings )
				: $default_map_settings;

		$this->_set_add_edit_form_tags( 'update_google_map_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( GEN_SET_CAF_TEMPLATE_PATH . 'google_map.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();
	}

	protected function _update_google_map_settings() {

		EE_Registry::instance()->CFG->map_settings->use_google_maps =
				 isset( $this->_req_data['use_google_maps'] )
				? absint( $this->_req_data['use_google_maps'] )
				: EE_Registry::instance()->CFG->map_settings->use_google_maps;

		EE_Registry::instance()->CFG->map_settings->event_details_map_width =
				 isset( $this->_req_data['event_details_map_width'] )
				? absint( $this->_req_data['event_details_map_width'] )
				: EE_Registry::instance()->CFG->map_settings->event_details_map_width;

		EE_Registry::instance()->CFG->map_settings->event_details_map_height =
				 isset( $this->_req_data['event_details_map_height'] )
				? absint( $this->_req_data['event_details_map_height'] )
				: EE_Registry::instance()->CFG->map_settings->event_details_map_height;

		EE_Registry::instance()->CFG->map_settings->event_details_map_zoom =
				 isset( $this->_req_data['event_details_map_zoom'] )
				? absint( $this->_req_data['event_details_map_zoom'] )
				: EE_Registry::instance()->CFG->map_settings->event_details_map_zoom;

		EE_Registry::instance()->CFG->map_settings->event_details_display_nav =
				 isset( $this->_req_data['event_details_display_nav'] )
				? absint( $this->_req_data['event_details_display_nav'] )
				: EE_Registry::instance()->CFG->map_settings->event_details_display_nav;

		EE_Registry::instance()->CFG->map_settings->event_details_nav_size =
				 isset( $this->_req_data['event_details_nav_size'] )
				? absint( $this->_req_data['event_details_nav_size'] )
				: EE_Registry::instance()->CFG->map_settings->event_details_nav_size;

		EE_Registry::instance()->CFG->map_settings->event_details_control_type =
				 isset( $this->_req_data['event_details_control_type'] )
				? sanitize_text_field( $this->_req_data['event_details_control_type'] )
				: EE_Registry::instance()->CFG->map_settings->event_details_control_type;

		EE_Registry::instance()->CFG->map_settings->event_details_map_align =
				 isset( $this->_req_data['event_details_map_align'] )
				? sanitize_text_field( $this->_req_data['event_details_map_align'] )
				: EE_Registry::instance()->CFG->map_settings->event_details_map_align;

		EE_Registry::instance()->CFG->map_settings->event_list_map_width =
				 isset( $this->_req_data['event_list_map_width'] )
				? absint( $this->_req_data['event_list_map_width'] )
				: EE_Registry::instance()->CFG->map_settings->event_list_map_width;

		EE_Registry::instance()->CFG->map_settings->event_list_map_height =
				 isset( $this->_req_data['event_list_map_height'] )
				? absint( $this->_req_data['event_list_map_height'] )
				: EE_Registry::instance()->CFG->map_settings->event_list_map_height;

		EE_Registry::instance()->CFG->map_settings->event_list_map_zoom =
				 isset( $this->_req_data['event_list_map_zoom'] )
				? absint( $this->_req_data['event_list_map_zoom'] )
				: EE_Registry::instance()->CFG->map_settings->event_list_map_zoom;

		EE_Registry::instance()->CFG->map_settings->event_list_display_nav =
				 isset( $this->_req_data['event_list_display_nav'] )
				? absint( $this->_req_data['event_list_display_nav'] )
				: EE_Registry::instance()->CFG->map_settings->event_list_display_nav;

		EE_Registry::instance()->CFG->map_settings->event_list_nav_size =
				 isset( $this->_req_data['event_list_nav_size'] )
				? absint( $this->_req_data['event_list_nav_size'] )
				: EE_Registry::instance()->CFG->map_settings->event_list_nav_size;

		EE_Registry::instance()->CFG->map_settings->event_list_control_type =
				 isset( $this->_req_data['event_list_control_type'] )
				? sanitize_text_field( $this->_req_data['event_list_control_type'] )
				: EE_Registry::instance()->CFG->map_settings->event_list_control_type;

		EE_Registry::instance()->CFG->map_settings->event_list_map_align =
				 isset( $this->_req_data['event_list_map_align'] )
				? sanitize_text_field( $this->_req_data['event_list_map_align'] )
				: EE_Registry::instance()->CFG->map_settings->event_list_map_align;

		EE_Registry::instance()->CFG->map_settings = apply_filters( 'FHEE__Extend_General_Settings_Admin_Page___update_google_map_settings__CFG_map_settings', EE_Registry::instance()->CFG->map_settings );

		$what = 'Google Map Settings';
		$success = $this->_update_espresso_configuration( $what, EE_Registry::instance()->CFG->map_settings, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'google_map_settings' ) );

	}



}
