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
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * General_Settings_Admin_Page
 *
 * This contains the logic for setting up the Custom General_Settings related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 settings page.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Questions and Questions groups model is implemented)
 *
 * @package		General_Settings_Admin_Page
 * @subpackage	includes/core/admin/General_Settings_Admin_Page.core.php
 * @author			Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class General_Settings_Admin_Page extends EE_Admin_Page {


	/**
	 * _question_group
	 * holds the specific question group object for the question group details screen
	 * @var object
	 */
	protected $_question_group;



	public function __construct() {
		parent::__construct();
	}



	protected function _init_page_props() {
		$this->page_slug = GEN_SET_PG_SLUG;
		$this->page_label = GEN_SET_LABEL;
	}




	protected function _ajax_hooks() {
		//todo: all hooks for events ajax goes in here.
	}





	protected function _define_page_props() {
		$this->_admin_base_url = GEN_SET_ADMIN_URL;
		$this->_admin_page_title = GEN_SET_LABEL;
		$this->_labels = array(
			'publishbox' => __('Update Settings', 'event_espresso')
			);
	}




	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_espresso_page_settings',
			'update_espresso_page_settings' => array(
				'func' => '_update_espresso_page_settings',
				'noheader' => TRUE,
				),
			'template_settings' => '_template_settings',
			'update_template_settings' => array(
				'func' => '_update_template_settings',
				'noheader' => TRUE,
				),
			'copy_templates' => array(
				'func' => '_copy_templates',
				'noheader' => TRUE,
				),
			'google_map_settings' => '_google_map_settings',
			'update_google_map_settings' => array(
				'func' => '_update_google_map_settings',
				'noheader' => TRUE,
				),
			'your_organization_settings' => '_your_organization_settings',
			'update_your_organization_settings' => array(
				'func' => '_update_your_organization_settings',
				'noheader' => TRUE,
				),
			'admin_option_settings' => '_admin_option_settings',
			'update_admin_option_settings' => array(
				'func' => '_update_admin_option_settings',
				'noheader' => TRUE,
				)
			);
	}





	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Critical Pages'),
					'order' => 20
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' )
				),
			'template_settings' => array(
				'nav' => array(
					'label' => __('Templates'),
					'order' => 30
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' )
				),
			'google_map_settings' => array(
				'nav' => array(
					'label' => __('Google Maps'),
					'order' => 40
					),
				'metaboxes' => array('_publish_post_box',  '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' )
				),
			'your_organization_settings' => array(
				'nav' => array(
					'label' => __('Your Organization'),
					'order' => 50
					),
				'metaboxes' => array('_publish_post_box',  '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' )
				),
			'admin_option_settings' => array(
				'nav' => array(
					'label' => __('Admin Options'),
					'order' => 60
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' )
				)
			);
	}



	protected function _add_screen_options() {
	}

	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}

	protected function _add_screen_options_question_groups() {
		$this->_per_page_screen_option();
	}

	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		//scripts
		wp_enqueue_script('ee_admin_js');		
	}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}


	public function load_scripts_styles_your_organization_settings() {	
		//styles
		wp_enqueue_style('thickbox');
		//scripts
		wp_enqueue_script('media-upload');
		wp_enqueue_script('thickbox');
		wp_register_script( 'organization_settings', GEN_SET_ASSETS_URL . 'your_organization_settings.js', array( 'jquery','media-upload','thickbox' ), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script( 'organization_settings' );	
		$confirm_image_delete = array( 'text' => __('Do you really want to delete this image? Please remember to save your settings to complete the removal.', 'event_espresso')); 
		wp_localize_script( 'organization_settings', 'confirm_image_delete', $confirm_image_delete );

	}


	/*************		Espresso Pages 		*************/


	protected function _espresso_page_settings() {
	
		global $org_options;
		$this->_transient_garbage_collection();
		$this->_template_args['values'] = $this->_yes_no_values;
		$this->_template_args['event_ssl_active'] = isset( $org_options['event_ssl_active'] ) && ! empty( $org_options['event_ssl_active'] ) ? $org_options['event_ssl_active'] : FALSE;

		$this->_template_args['event_page_id'] = isset( $org_options['event_page_id'] ) ? $org_options['event_page_id'] : NULL;
		$this->_template_args['event_reg_page'] = isset( $org_options['event_page_id'] ) ? get_page( $org_options['event_page_id'] ) : FALSE;

		$this->_template_args['return_url'] = isset( $org_options['return_url'] ) ? $org_options['return_url'] : NULL;
		$this->_template_args['thank_you_page'] = isset( $org_options['return_url'] ) ? get_page( $org_options['return_url'] ) : FALSE;

		$this->_template_args['notify_url'] = isset( $org_options['notify_url'] ) ? $org_options['notify_url'] : NULL;
		$this->_template_args['transactions_page'] = isset( $org_options['notify_url'] ) ? get_page( $org_options['notify_url'] ) : FALSE;

		$this->_template_args['cancel_return'] = isset( $org_options['cancel_return'] ) ? $org_options['cancel_return'] : NULL;
		$this->_template_args['cancel_return_page'] = isset( $org_options['cancel_return'] ) ? get_page( $org_options['cancel_return'] ) : FALSE;
		
		$this->_template_args['espresso_url_rewrite_activated'] = isset( $org_options['espresso_url_rewrite_activated'] ) ? $org_options['espresso_url_rewrite_activated'] : TRUE;
		
		$this->_set_add_edit_form_tags( 'update_espresso_page_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = espresso_display_template( GEN_SET_TEMPLATE_PATH . 'espresso_page_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();	
		
	}

	protected function _update_espresso_page_settings() {
		
		$data = array();
		$data['event_page_id'] = isset( $this->_req_data['event_page_id'] ) ? absint( $this->_req_data['event_page_id'] ) : NULL;
		$data['return_url'] = isset( $this->_req_data['return_url'] ) ? absint( $this->_req_data['return_url'] ) : NULL;
		$data['cancel_return'] = isset( $this->_req_data['cancel_return'] ) ? absint( $this->_req_data['cancel_return'] ) : NULL;
		$data['notify_url'] = isset( $this->_req_data['notify_url'] ) ? absint( $this->_req_data['notify_url'] ) : NULL;
		$data['espresso_url_rewrite_activated'] = isset( $this->_req_data['espresso_url_rewrite_activated'] ) ? absint( $this->_req_data['espresso_url_rewrite_activated'] ) : NULL;

		$data = apply_filters('filter_hook_espresso_page_settings_save', $data);
		
		$what = 'Critical Pages & Shortcodes';
		$success = $this->_update_organization_settings( $what, $data, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, 'Template Settings', 'updated', array() );
		
	}



	/*************		Templates 		*************/


	protected function _template_settings() {
	
		global $org_options;
		//$this->_template_args['org_options'] = $org_options;
		$this->_template_args['values'] = $this->_yes_no_values;

		// themeroller style directory
		$path = file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/themeroller/index.php") ? EVENT_ESPRESSO_UPLOAD_DIR . '/themeroller/' : EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/css/themeroller/';
		$themeroller_themes = glob( $path . '*', GLOB_ONLYDIR ); 
		array_walk( $themeroller_themes, array( $this, '_process_theme_name' )); 
		
		$default_themeroller = array(
			'themeroller_style' => 'smoothness'
		);
		$this->_template_args['themeroller'] = 
				isset( $org_options['themeroller'] ) && ! empty( $org_options['themeroller'] ) 
				? array_merge( $default_themeroller, $org_options['themeroller'] ) 
				: $default_themeroller;
		
		$default_template_settings = array(
			'display_description_in_event_list' => FALSE,
			'display_short_description_in_event_list' => TRUE,
			'display_address_in_event_list' => FALSE,
			'display_address_in_regform' => TRUE,			
			'use_custom_post_types' => FALSE,			
			'use_custom_templates' => FALSE,		
		);
		$this->_template_args['template_settings'] = 
				isset( $org_options['template_settings'] ) && ! empty( $org_options['template_settings'] ) 
				? array_merge( $default_template_settings, $org_options['template_settings'] )
				: $default_template_settings;
		
		$default_style_settings = array(
			'enable_default_style' => TRUE,
			'css_name' => ''
		);
		$this->_template_args['style_settings'] = 
				isset( $org_options['style_settings'] ) && ! empty( $org_options['style_settings'] ) 
				? array_merge( $default_style_settings, $org_options['style_settings'] )
				: $default_style_settings;

		$this->_template_args['files'] = array(
				'attendee_list.php', 
				'event_list.php', 
				'event_list_display.php', 
				'event_post.php', 
				'payment_page.php', 
				'registration_page.php', 
				'registration_page_display.php', 
				'confirmation_display.php', 
				'return_payment.php', 
				'widget.php'
		);
		
		$this->_template_args['custom_templates_exist'] = 
				file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $this->_template_args['files'][0])
				|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $this->_template_args['files'][1])
				|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $this->_template_args['files'][2])
				|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $this->_template_args['files'][3])
				|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $this->_template_args['files'][4])
				|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $this->_template_args['files'][5])
				|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $this->_template_args['files'][6])
				|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $this->_template_args['files'][7])
				|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $this->_template_args['files'][8])
				|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $this->_template_args['files'][9])
			? TRUE
			: FALSE;

		$this->_template_args['custom_templates_exist'] = TRUE;
		
		$this->_set_add_edit_form_tags( 'update_template_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = espresso_display_template( GEN_SET_TEMPLATE_PATH . 'template_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();	
	}
	
	
	/**
	 * 	_process_theme_name
	 *
	 * @access 	private
	 * @param 	string 	$themeroller_theme_path
	 * @return	string
	 */	
	private function _process_theme_name( &$themeroller_theme_path, $key ) {
		$this->_template_args['themeroller_themes'][] = array( 'id'  => basename( $themeroller_theme_path ), 'text' => ucwords( str_replace( array( '-', '_' ), ' ', basename( $themeroller_theme_path ))));
	}



	protected function _update_template_settings() {
		
		global $wpdb, $org_options, $notices, $espresso_wp_user;

		$data = array(
			'template_settings' => array(),
			'style_settings' => array(),
			'themeroller' => array()
		);

		$data['template_settings']['display_description_in_event_list'] = 
				 isset( $this->_req_data['display_description_in_event_list'] ) 
				? absint( $this->_req_data['display_description_in_event_list'] ) 
				: FALSE;

		$data['template_settings']['display_short_description_in_event_list'] =  
				 isset( $this->_req_data['display_short_description_in_event_list'] ) 
				? absint( $this->_req_data['display_short_description_in_event_list'] ) 
				: TRUE;

		$data['template_settings']['display_address_in_event_list'] = 
				 isset( $this->_req_data['display_address_in_event_list'] ) 
				? absint( $this->_req_data['display_address_in_event_list'] ) 
				: FALSE;

		$data['template_settings']['display_address_in_regform'] = 
				 isset( $this->_req_data['display_address_in_regform'] ) 
				? absint( $this->_req_data['display_address_in_regform'] ) 
				: TRUE;

		$data['template_settings']['use_custom_post_types'] = 
				 isset( $this->_req_data['use_custom_post_types'] ) 
				? absint( $this->_req_data['use_custom_post_types'] ) 
				: FALSE;

		$data['style_settings']['enable_default_style'] = 
				 isset( $this->_req_data['enable_default_style'] ) 
				? absint( $this->_req_data['enable_default_style'] ) 
				: TRUE;

		$data['themeroller']['themeroller_style'] = 
				 isset( $this->_req_data['themeroller_style'] ) 
				? sanitize_text_field( $this->_req_data['themeroller_style'] ) 
				: 'smoothness';

		if ( isset($_FILES['css'] ) && is_uploaded_file( $_FILES['css']['tmp_name'] )) {
			if ( copy( $_FILES['css']['tmp_name'], EVENT_ESPRESSO_UPLOAD_DIR . 'css/' . $_FILES['css']['name'] )) {
				$data['style_settings']['css_name'] = sanitize_text_field( $_FILES['css']['name'] );
			}
		}
		
		$data['template_settings']['use_custom_templates'] =  
				 isset( $this->_req_data['use_custom_templates'] ) 
				? sanitize_text_field( $this->_req_data['use_custom_templates'] ) 
				: FALSE;					
		
		$data = apply_filters('filter_hook_espresso_template_settings_save', $data);
		
		$what = 'Template Settings';
		$success = $this->_update_organization_settings( $what, $data, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'template_settings' ) );
		
	}

	
	
	/**
	 * 	_copy_templates
	 *
	 * @access 	protected
	 * @return	string
	 */	
	protected function _copy_templates() {
		
		add_action('admin_init', 'event_espresso_smartCopy');

		if ( ! empty($_SESSION['event_espresso_themes_copied'])) {
			
			$data['template_settings']['use_custom_templates'] = TRUE;
			$_SESSION['event_espresso_themes_copied'] = false;
			
			$what = 'Custom Templates';
			$success = $this->_update_organization_settings( $what, $data, __FILE__, __FUNCTION__, __LINE__ );
			$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'template_settings' ) );
			
		}
		
	}




	/*************		Google Maps 		*************/


	protected function _google_map_settings() {
	
		global $org_options;
		
		$this->_template_args['values'] = $this->_yes_no_values;

		$default_map_settings = array(
			'ee_map_width_single' => 595,
			'ee_map_height_single' => 368,
			'ee_map_zoom_single' => 14,
			'ee_map_nav_display_single' => TRUE,
			'ee_map_nav_size_single' => FALSE,
			'ee_map_type_control_single' => 'default',
			'ee_map_align_single' => 'right',
			'ee_map_width' => 300,
			'ee_map_height' => 185,
			'ee_map_zoom' => 11,
			'ee_map_nav_display' => FALSE,
			'ee_map_nav_size' => TRUE,
			'ee_map_type_control' => 'default',
			'ee_map_align' => 'right',
			'ee_display_map_no_shortcodes' => FALSE
		);
		$this->_template_args['map_settings'] = 
				isset( $org_options['map_settings'] ) && ! empty( $org_options['map_settings'] ) 
				? array_merge( $default_map_settings, $org_options['map_settings'] )
				: $default_map_settings;		

		$this->_set_add_edit_form_tags( 'update_google_map_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = espresso_display_template( GEN_SET_TEMPLATE_PATH . 'google_map.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();	
	}

	protected function _update_google_map_settings() {

		$data = array(
			'map_settings' => array()
		);

		$data['map_settings']['ee_map_width_single'] = 
				 isset( $this->_req_data['ee_map_width_single'] ) 
				? absint( $this->_req_data['ee_map_width_single'] ) 
				: 595;

		$data['map_settings']['ee_map_height_single'] = 
				 isset( $this->_req_data['ee_map_height_single'] ) 
				? absint( $this->_req_data['ee_map_height_single'] ) 
				: 368;

		$data['map_settings']['ee_map_zoom_single'] = 
				 isset( $this->_req_data['ee_map_zoom_single'] ) 
				? absint( $this->_req_data['ee_map_zoom_single'] ) 
				: 14;

		$data['map_settings']['ee_map_nav_display_single'] = 
				 isset( $this->_req_data['ee_map_nav_display_single'] ) 
				? absint( $this->_req_data['ee_map_nav_display_single'] ) 
				: TRUE;

		$data['map_settings']['ee_map_nav_size_single'] = 
				 isset( $this->_req_data['ee_map_nav_size_single'] ) 
				? absint( $this->_req_data['ee_map_nav_size_single'] ) 
				: FALSE;

		$data['map_settings']['ee_map_type_control_single'] = 
				 isset( $this->_req_data['ee_map_type_control_single'] ) 
				? absint( $this->_req_data['ee_map_type_control_single'] ) 
				: 'default';

		$data['map_settings']['ee_map_align_single'] = 
				 isset( $this->_req_data['ee_map_align_single'] ) 
				? absint( $this->_req_data['ee_map_align_single'] ) 
				: 'right';

		$data['map_settings']['ee_map_width'] = 
				 isset( $this->_req_data['ee_map_width'] ) 
				? absint( $this->_req_data['ee_map_width'] ) 
				: 300;

		$data['map_settings']['ee_map_height'] = 
				 isset( $this->_req_data['ee_map_height'] ) 
				? absint( $this->_req_data['ee_map_height'] ) 
				: 185;

		$data['map_settings']['ee_map_zoom'] = 
				 isset( $this->_req_data['ee_map_zoom'] ) 
				? absint( $this->_req_data['ee_map_zoom'] ) 
				: 11;

		$data['map_settings']['ee_map_nav_display'] = 
				 isset( $this->_req_data['ee_map_nav_display'] ) 
				? absint( $this->_req_data['ee_map_nav_display'] ) 
				: FALSE;

		$data['map_settings']['ee_map_nav_size'] = 
				 isset( $this->_req_data['ee_map_nav_size'] ) 
				? absint( $this->_req_data['ee_map_nav_size'] ) 
				: TRUE;

		$data['map_settings']['ee_map_type_control'] = 
				 isset( $this->_req_data['ee_map_type_control'] ) 
				? absint( $this->_req_data['ee_map_type_control'] ) 
				: 'default';

		$data['map_settings']['ee_map_align'] = 
				 isset( $this->_req_data['ee_map_align'] ) 
				? absint( $this->_req_data['ee_map_align'] ) 
				: 'right';

		$data['map_settings']['ee_display_map_no_shortcodes'] = 
				 isset( $this->_req_data['ee_display_map_no_shortcodes'] ) 
				? absint( $this->_req_data['ee_display_map_no_shortcodes'] ) 
				: FALSE;

		$data = apply_filters('filter_hook_espresso_google_map_settings_save', $data);	
		
		$what = 'Google Map Settings';
		$success = $this->_update_organization_settings( $what, $data, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'google_map_settings' ) );
		
	}



	/*************		Your Organization 		*************/


	protected function _your_organization_settings() {
	
		global $org_options;
		$this->_template_args['default_logo_url'] = isset( $org_options['default_logo_url'] ) ? $this->_display_nice( $org_options['default_logo_url'] ) : FALSE;
		$this->_template_args['organization'] = isset( $org_options['organization'] ) ? $this->_display_nice( $org_options['organization'] ) : '';
		$this->_template_args['organization_street1'] = isset( $org_options['organization_street1'] ) ? $this->_display_nice( $org_options['organization_street1'] ) : '';
		$this->_template_args['organization_street2'] = isset( $org_options['organization_street2'] ) ? $this->_display_nice( $org_options['organization_street2'] ) : '';
		$this->_template_args['organization_city'] = isset( $org_options['organization_city'] ) ? $this->_display_nice( $org_options['organization_city'] ) : '';
		$this->_template_args['organization_state'] = isset( $org_options['organization_state'] ) ? $this->_display_nice( $org_options['organization_state'] ) : '';
		$this->_template_args['organization_zip'] = isset( $org_options['organization_zip'] ) ? $this->_display_nice( $org_options['organization_zip'] ) : '';
		$this->_template_args['organization_country'] = isset( $org_options['organization_country'] ) ? $this->_display_nice( $org_options['organization_country'] ) : '';
		$this->_template_args['currency_symbol'] = isset( $org_options['currency_symbol'] ) ? $this->_display_nice( $org_options['currency_symbol'] ) : '$';
		$this->_template_args['contact_email'] = isset( $org_options['contact_email'] ) ? $this->_display_nice( $org_options['contact_email'] ) : '';		
		
		$this->_set_add_edit_form_tags( 'update_your_organization_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = espresso_display_template( GEN_SET_TEMPLATE_PATH . 'your_organization_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();	
	}

	protected function _update_your_organization_settings() {
		
		$data = array();
		$data['default_logo_url'] = isset( $this->_req_data['default_logo_url'] ) ? esc_url_raw( $this->_req_data['default_logo_url'] ) : NULL;
		$data['organization'] = isset( $this->_req_data['organization'] ) ? sanitize_text_field( $this->_req_data['organization'] ) : NULL;
		$data['organization_street1'] = isset( $this->_req_data['organization_street1'] ) ? sanitize_text_field( $this->_req_data['organization_street1'] ) : NULL;
		$data['organization_street2'] = isset( $this->_req_data['organization_street2'] ) ? sanitize_text_field( $this->_req_data['organization_street2'] ) : NULL;
		$data['organization_city'] = isset( $this->_req_data['organization_city'] ) ? sanitize_text_field( $this->_req_data['organization_city'] ) : NULL;
		$data['organization_state'] = isset( $this->_req_data['organization_state'] ) ? sanitize_text_field( $this->_req_data['organization_state'] ) : NULL;
		$data['organization_zip'] = isset( $this->_req_data['organization_zip'] ) ? sanitize_text_field( $this->_req_data['organization_zip'] ) : NULL;
		$data['organization_country'] = isset( $this->_req_data['organization_country'] ) ? absint( $this->_req_data['organization_country'] ) : NULL;
		$data['contact_email'] = isset( $this->_req_data['contact_email'] ) ? sanitize_email( $this->_req_data['contact_email'] ) : NULL;

		$data = apply_filters('filter_hook_espresso_your_organization_settings_save', $data);	
		
		$what = 'Your Organization Settings';
		$success = $this->_update_organization_settings( $what, $data, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'your_organization_settings' ) );
		
	}
	/*************		Admin Options 		*************/


	protected function _admin_option_settings() {
	
		global $org_options;
		$this->_template_args['values'] = $this->_yes_no_values;
		
		$this->_template_args['use_venue_manager'] = isset( $org_options['use_venue_manager'] ) ? absint( $org_options['use_venue_manager'] ) : FALSE;
		$this->_template_args['use_personnel_manager'] = isset( $org_options['use_personnel_manager'] ) ? absint( $org_options['use_personnel_manager'] ) : FALSE;
		$this->_template_args['espresso_dashboard_widget'] = isset( $org_options['espresso_dashboard_widget'] ) ? absint( $org_options['espresso_dashboard_widget'] ) : TRUE;
		$this->_template_args['events_in_dasboard'] = isset( $org_options['events_in_dasboard'] ) ? absint( $org_options['events_in_dasboard'] ) : 30;
		$this->_template_args['use_event_timezones'] = isset( $org_options['use_event_timezones'] ) ? absint( $org_options['use_event_timezones'] ) : FALSE;
		$this->_template_args['full_logging'] = isset( $org_options['full_logging'] ) ? absint( $org_options['full_logging'] ) : FALSE;
		$this->_template_args['remote_logging'] = isset( $org_options['remote_logging'] ) ? absint( $org_options['remote_logging'] ) : FALSE;
		$this->_template_args['remote_logging_url'] = isset( $org_options['remote_logging_url'] ) && ! empty( $org_options['remote_logging_url'] ) ? stripslashes( $org_options['remote_logging_url'] ) : '';
		$this->_template_args['show_reg_footer'] = isset( $org_options['show_reg_footer'] ) ? absint( $org_options['show_reg_footer'] ) : TRUE;
		$this->_template_args['affiliate_id'] = isset( $org_options['affiliate_id'] ) ? $this->_display_nice( $org_options['affiliate_id'] ) : '';
		
		$this->_set_add_edit_form_tags( 'update_admin_option_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = espresso_display_template( GEN_SET_TEMPLATE_PATH . 'admin_option_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();	
	}

	protected function _update_admin_option_settings() {
		
		$data = array();

		$data['use_venue_manager'] = isset( $this->_req_data['use_venue_manager'] ) ? absint( $this->_req_data['use_venue_manager'] ) : FALSE;
		$data['use_personnel_manager'] = isset( $this->_req_data['use_personnel_manager'] ) ? absint( $this->_req_data['use_personnel_manager'] ) : FALSE;
		$data['espresso_dashboard_widget'] = isset( $this->_req_data['espresso_dashboard_widget'] ) ? absint( $this->_req_data['espresso_dashboard_widget'] ) : TRUE;
		$data['events_in_dasboard'] = isset( $this->_req_data['events_in_dasboard'] ) ? absint( $this->_req_data['events_in_dasboard'] ) : 30;
		$data['use_event_timezones'] = isset( $this->_req_data['use_event_timezones'] ) ? absint( $this->_req_data['use_event_timezones'] ) : FALSE;
		$data['full_logging'] = isset( $this->_req_data['full_logging'] ) ? absint( $this->_req_data['full_logging'] ) : FALSE;
		$data['remote_logging'] = isset( $this->_req_data['remote_logging'] ) ? absint( $this->_req_data['remote_logging'] ) : FALSE;
		$data['remote_logging_url'] = isset( $this->_req_data['remote_logging_url'] ) ? esc_url_raw( $this->_req_data['remote_logging_url'] ) : NULL;
		$data['show_reg_footer'] = isset( $this->_req_data['show_reg_footer'] ) ? absint( $this->_req_data['show_reg_footer'] ) : TRUE;
		$data['affiliate_id'] = isset( $this->_req_data['affiliate_id'] ) ? sanitize_text_field( $this->_req_data['affiliate_id'] ) : NULL;
		
		$data = apply_filters('filter_hook_espresso_admin_option_settings_save', $data);	
		
		$what = 'Admin Options';
		$success = $this->_update_organization_settings( $what, $data, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'admin_option_settings' ) );
		
	}







	/***********/





	/**
	 * displays edit and view links for critical EE pages
	 *
	 * @access public 
	 * @param int $ee_page_id
	 * @return string
	 */
	public static function edit_view_links( $ee_page_id ) {
		$links = '<a href="' . add_query_arg( array( 'post' => $ee_page_id, 'action' => 'edit' ),  admin_url( 'post.php' )) . '" >' . __('Edit', 'event_espresso') . '</a>';
		$links .= ' &nbsp;|&nbsp; ';
		$links .= '<a href="' . get_permalink( $ee_page_id ) . '" >' . __('View', 'event_espresso') . '</a>';
		return $links;
	}
	
	
	

	/**
	 * displays page and shortcode status for critical EE pages
	 *
	 * @param WP page object $ee_page
	 * @return string
	 */
	public static function page_and_shortcode_status( $ee_page, $shortcode ) {

		// page status
		if ( isset( $ee_page->post_status ) && $ee_page->post_status == 'publish') { 
			$pg_colour = 'green';
			$pg_status = sprintf( __('Page%sStatus%sOK', 'event_espresso'), '&nbsp;' , '&nbsp;' );
		 } else { 
			$pg_colour = 'red';
			$pg_status = sprintf( __('Page%sVisibility%sProblem', 'event_espresso'), '&nbsp;', '&nbsp;'  );
		}
		
		// shortcode status
		if ( isset( $ee_page->post_content ) && strpos( $ee_page->post_content, $shortcode ) !== FALSE ) { 
			$sc_colour = 'green';
			$sc_status = sprintf( __('Shortcode%sOK', 'event_espresso'), '&nbsp;' );
		 } else { 
			$sc_colour = 'red';
			$sc_status = sprintf( __('Shortcode%sProblem', 'event_espresso'), '&nbsp;' );
		}

		return '<span style="color:' . $pg_colour . '; margin-right:2em;"><strong>' . $pg_status . '</strong></span><span style="color:' . $sc_colour . '"><strong>' . $sc_status . '</strong></span>';		

	}
	
	
	

	/**
	 * generates a dropdown of all parent pages - copied from WP core
	 *
	 * @param unknown_type $default
	 * @param unknown_type $parent
	 * @param unknown_type $level
	 * @return unknown
	 */
	public static function page_settings_dropdown( $default = 0, $parent = 0, $level = 0 ) {
		global $wpdb;
		$items = $wpdb->get_results( $wpdb->prepare("SELECT ID, post_parent, post_title FROM $wpdb->posts WHERE post_parent = %d AND post_type = 'page' AND post_status != 'trash' ORDER BY menu_order", $parent) );

		if ( $items ) {
			foreach ( $items as $item ) {
				$pad = str_repeat( '&nbsp;', $level * 3 );
				if ( $item->ID == $default)
					$current = ' selected="selected"';
				else
					$current = '';

				echo "\n\t<option class='level-$level' value='$item->ID'$current>$pad " . esc_html($item->post_title) . "</option>";
				parent_dropdown( $default, $item->ID, $level +1 );
			}
		} else {
			return false;
		}
	}


} //ends Forms_Admin_Page class