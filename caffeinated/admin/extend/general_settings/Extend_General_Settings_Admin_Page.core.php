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

		$new_page_routes['google_map_settings'] = '_google_map_settings';
		$new_page_routes['update_google_map_settings'] = array(
			'func' => '_update_google_map_settings',
			'noheader' => TRUE
			);
		$this->_page_routes = array_merge( $this->_page_routes, $new_page_routes );

		$new_page_config = array(
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
		add_action('AHEE_general_settings_admin_options_settings_extra_settings', array( $this, 'use_venue_and_staff_manager_settings'), 10 );
	}



	public function use_venue_and_staff_manager_settings( $template_args ) {
		$_args['use_personnel_manager_select'] = EEH_Form_Fields::select_input('use_personnel_manager', $template_args['values'], $template_args['use_personnel_manager'] );
		$template = GEN_SET_CAF_TEMPLATE_PATH . 'use_venue_and_staff_manager_settings.template.php';
		EEH_Template::display_template( $template, $_args );
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

		EE_Registry::instance()->CFG->map_settings = apply_filters( 'FHEE_google_map_settings_save', EE_Registry::instance()->CFG->map_settings );	
		
		$what = 'Google Map Settings';
		$success = $this->_update_espresso_configuration( $what, EE_Registry::instance()->CFG->map_settings, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'google_map_settings' ) );
		
	}



}