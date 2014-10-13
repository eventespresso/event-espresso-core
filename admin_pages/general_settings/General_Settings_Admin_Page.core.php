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
 * General_Settings_Admin_Page
 *
 * This contains the logic for setting up the Custom General_Settings related pages.  Any methods without phpdoc comments have inline docs with parent class.
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 settings page.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Questions and Questions groups model is implemented)
 *
 * @package		General_Settings_Admin_Page
 * @subpackage	includes/core/admin/general_settings/General_Settings_Admin_Page.core.php
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



	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}



	protected function _init_page_props() {
		$this->page_slug = GEN_SET_PG_SLUG;
		$this->page_label = GEN_SET_LABEL;
		$this->_admin_base_url = GEN_SET_ADMIN_URL;
		$this->_admin_base_path = GEN_SET_ADMIN;
	}




	protected function _ajax_hooks() {
		add_action('wp_ajax_espresso_display_country_settings', array( $this, 'display_country_settings'));
		add_action('wp_ajax_espresso_display_country_states', array( $this, 'display_country_states'));
		add_action('wp_ajax_espresso_delete_state', array( $this, 'delete_state'), 10, 3 );
		add_action('wp_ajax_espresso_add_new_state', array( $this, 'add_new_state'));
	}





	protected function _define_page_props() {
		$this->_admin_page_title = GEN_SET_LABEL;
		$this->_labels = array(
			'publishbox' => __('Update Settings', 'event_espresso')
		);
	}




	protected function _set_page_routes() {
		$this->_page_routes = array(

			'critical_pages' => array(
				'func' => '_espresso_page_settings',
				'capability' => 'manage_options'
				),
			'update_espresso_page_settings' => array(
				'func' => '_update_espresso_page_settings',
				'capability' => 'manage_options',
				'noheader' => TRUE,
				),

			'template_settings' => array(
				'func' => '_template_settings',
				'capability' => 'manage_options'
				),

			'update_template_settings' => array(
				'func' => '_update_template_settings',
				'capability' => 'manage_options',
				'noheader' => TRUE,
				),

			'copy_templates' => array(
				'func' => '_copy_templates',
				'capability' => 'manage_options',
				'noheader' => TRUE,
				),
			'default' => array(
				'func' => '_your_organization_settings',
				'capability' => 'manage_options',
				),

			'update_your_organization_settings' => array(
				'func' => '_update_your_organization_settings',
				'capability' => 'manage_options',
				'noheader' => TRUE,
				),

			'admin_option_settings' => array(
				'func' => '_admin_option_settings',
				'capability' => 'manage_options',
				),

			'update_admin_option_settings' => array(
				'func' => '_update_admin_option_settings',
				'capability' => 'manage_options',
				'noheader' => TRUE,
				),

			'country_settings' => array(
				'func' => '_country_settings',
				'capability' => 'manage_options'
				),

			'update_country_settings' => array(
				'func' => '_update_country_settings',
				'capability' => 'manage_options',
				'noheader' => TRUE,
				),

			'display_country_settings' => array(
				'func' => 'display_country_settings',
				'capability' => 'manage_options',
				'noheader' => TRUE,
				),

			'add_new_state' => array(
				'func' => 'add_new_state',
				'capability' => 'manage_options',
				'noheader' => TRUE,
				),

			'delete_state' => array(
				'func' => 'delete_state',
				'capability' => 'manage_options',
				'noheader' => TRUE,
				)
			);
	}





	protected function _set_page_config() {
		$this->_page_config = array(
			'critical_pages' => array(
				'nav' => array(
					'label' => __('Critical Pages'),
					'order' => 50
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
               			'help_tabs' => array(
					'general_settings_critical_pages_help_tab' => array(
						'title' => __('Critical Pages', 'event_espresso'),
						'filename' => 'general_settings_critical_pages'
						)
					),
				'help_tour' => array( 'Critical_Pages_Help_Tour' ),
				'require_nonce' => FALSE
				),

			//template settings
			'template_settings' => array(
				'nav' => array(
					'label' => __('Templates'),
					'order' => 30
				),
				'metaboxes' => array( '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
				'help_tabs' => array(
					'general_settings_templates_help_tab' => array(
						'title' => __('Templates', 'event_espresso'),
						'filename' => 'general_settings_templates'
					)
				),
				'help_tour' => array( 'Templates_Help_Tour' ),
				'require_nonce' => FALSE
			),
			'default' => array(
				'nav' => array(
					'label' => __('Your Organization'),
					'order' => 20
				),
                			'help_tabs' => array(
					'general_settings_your_organization_help_tab' => array(
						'title' => __('Your Organization', 'event_espresso'),
						'filename' => 'general_settings_your_organization'
						)
					),
				'help_tour' => array( 'Your_Organization_Help_Tour' ),
				'metaboxes' => array('_publish_post_box',  '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
				'require_nonce' => FALSE
				),
			'admin_option_settings' => array(
				'nav' => array(
					'label' => __('Admin Options'),
					'order' => 60
					),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
                			'help_tabs' => array(
					'general_settings_admin_options_help_tab' => array(
						'title' => __('Admin Options', 'event_espresso'),
						'filename' => 'general_settings_admin_options'
						)
					),
				'help_tour' => array( 'Admin_Options_Help_Tour' ),
				'require_nonce' => FALSE
				),
			'country_settings' => array(
				'nav' => array(
					'label' => __('Countries'),
					'order' => 70
					),
                'help_tabs' => array(
					'general_settings_countries_help_tab' => array(
						'title' => __('Countries', 'event_espresso'),
						'filename' => 'general_settings_countries'
						)
					),
				'help_tour' => array( 'Countries_Help_Tour' ),
				//'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
				'require_nonce' => FALSE
				)
			);
	}


	protected function _add_screen_options() {}

	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {
		//styles
		wp_enqueue_style('espresso-ui-theme');
		//scripts
		wp_enqueue_script('ee_admin_js');
	}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}


	public function load_scripts_styles_default() {
		//styles
		wp_enqueue_style('thickbox');
		//scripts
		wp_enqueue_script('media-upload');
		wp_enqueue_script('thickbox');
		wp_register_script( 'organization_settings', GEN_SET_ASSETS_URL . 'your_organization_settings.js', array( 'jquery','media-upload','thickbox' ), EVENT_ESPRESSO_VERSION, TRUE );
		wp_register_style( 'organization-css', GEN_SET_ASSETS_URL . 'organization.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_script( 'organization_settings' );
		wp_enqueue_style( 'organization-css' );
		$confirm_image_delete = array( 'text' => __('Do you really want to delete this image? Please remember to save your settings to complete the removal.', 'event_espresso'));
		wp_localize_script( 'organization_settings', 'confirm_image_delete', $confirm_image_delete );

	}

	public function load_scripts_styles_country_settings() {
		//scripts
		wp_register_script( 'gen_settings_countries', GEN_SET_ASSETS_URL . 'gen_settings_countries.js', array( 'ee_admin_js' ), EVENT_ESPRESSO_VERSION, TRUE );
		wp_register_style( 'organization-css', GEN_SET_ASSETS_URL . 'organization.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_script( 'gen_settings_countries' );
		wp_enqueue_style( 'organization-css' );

		global $eei18n_js_strings;
		$eei18n_js_strings['invalid_server_response'] = __( 'An error occurred! Your request may have been processed, but a valid response from the server was not received. Please refresh the page and try again.', 'event_espresso' );
		$eei18n_js_strings['error_occurred'] = __(  'An error occurred! Please refresh the page and try again.', 'event_espresso' );
		$eei18n_js_strings['confirm_delete_state'] = __(  'Are you sure you want to delete this State / Province?', 'event_espresso' );
		$protocol = isset( $_SERVER['HTTPS'] ) ? 'https://' : 'http://';
		$eei18n_js_strings['ajax_url'] = admin_url( 'admin-ajax.php?page=espresso_general_settings' , $protocol );
		wp_localize_script( 'gen_settings_countries', 'eei18n', $eei18n_js_strings );
	}


	/*************		Espresso Pages 		*************/


	protected function _espresso_page_settings() {

		// Check to make sure all of the main pages are setup properly,
		// if not create the default pages and display an admin notice
		EE_Registry::instance()->load_helper( 'Activation' );
		EEH_Activation::verify_default_pages_exist();

		$this->_transient_garbage_collection();
		$this->_template_args['values'] = $this->_yes_no_values;

		$this->_template_args['reg_page_id'] = isset(EE_Registry::instance()->CFG->core->reg_page_id ) ?EE_Registry::instance()->CFG->core->reg_page_id : NULL;
		$this->_template_args['reg_page_obj'] = isset(EE_Registry::instance()->CFG->core->reg_page_id ) ? get_page(EE_Registry::instance()->CFG->core->reg_page_id ) : FALSE;

		$this->_template_args['txn_page_id'] = isset(EE_Registry::instance()->CFG->core->txn_page_id) ?EE_Registry::instance()->CFG->core->txn_page_id : NULL;
		$this->_template_args['txn_page_obj'] = isset(EE_Registry::instance()->CFG->core->txn_page_id ) ? get_page(EE_Registry::instance()->CFG->core->txn_page_id ) : FALSE;

		$this->_template_args['thank_you_page_id'] = isset(EE_Registry::instance()->CFG->core->thank_you_page_id ) ?EE_Registry::instance()->CFG->core->thank_you_page_id : NULL;
		$this->_template_args['thank_you_page_obj'] = isset(EE_Registry::instance()->CFG->core->thank_you_page_id ) ? get_page(EE_Registry::instance()->CFG->core->thank_you_page_id ) : FALSE;

		$this->_template_args['cancel_page_id'] = isset(EE_Registry::instance()->CFG->core->cancel_page_id ) ?EE_Registry::instance()->CFG->core->cancel_page_id : NULL;
		$this->_template_args['cancel_page_obj'] = isset(EE_Registry::instance()->CFG->core->cancel_page_id ) ? get_page(EE_Registry::instance()->CFG->core->cancel_page_id ) : FALSE;

		$this->_set_add_edit_form_tags( 'update_espresso_page_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( GEN_SET_TEMPLATE_PATH . 'espresso_page_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();

	}

	protected function _update_espresso_page_settings() {
		// capture incoming request data
		$reg_page_id = isset( $this->_req_data['reg_page_id'] ) ? absint( $this->_req_data['reg_page_id'] ) : EE_Registry::instance()->CFG->core->reg_page_id;
		$txn_page_id = isset( $this->_req_data['txn_page_id'] ) ? absint( $this->_req_data['txn_page_id'] ) : EE_Registry::instance()->CFG->core->txn_page_id;
		$thank_you_page_id = isset( $this->_req_data['thank_you_page_id'] ) ? absint( $this->_req_data['thank_you_page_id'] ) : EE_Registry::instance()->CFG->core->thank_you_page_id;
		$cancel_page_id = isset( $this->_req_data['cancel_page_id'] ) ? absint( $this->_req_data['cancel_page_id'] ) : EE_Registry::instance()->CFG->core->cancel_page_id;
		// pack critical_pages into an array
		$critical_pages = array(
			'reg_page_id' 				=> $reg_page_id,
			'txn_page_id' 				=> $txn_page_id,
			'thank_you_page_id' 	=> $thank_you_page_id,
			'cancel_page_id' 		=> $cancel_page_id
		);
		foreach ( $critical_pages as $critical_page_name => $critical_page_id ) {
			// has the page changed ?
			if ( EE_Registry::instance()->CFG->core->$critical_page_name != $critical_page_id ) {
				// grab post object for old page
				$post = get_post( EE_Registry::instance()->CFG->core->$critical_page_name );
				// update post shortcodes for old page
				EE_Admin::parse_post_content_on_save( $critical_page_id, $post );
				// grab post object for new page
				$post = get_post( $critical_page_id );
				// update post shortcodes for new page
				EE_Admin::parse_post_content_on_save( $critical_page_id, $post );
			}
		}
		// set page IDs
		EE_Registry::instance()->CFG->core->reg_page_id = $reg_page_id;
		EE_Registry::instance()->CFG->core->txn_page_id = $txn_page_id;
		EE_Registry::instance()->CFG->core->thank_you_page_id = $thank_you_page_id;
		EE_Registry::instance()->CFG->core->cancel_page_id = $cancel_page_id;

		EE_Registry::instance()->CFG->core = apply_filters( 'FHEE__General_Settings_Admin_Page___update_espresso_page_settings__CFG_core', EE_Registry::instance()->CFG->core, $this->_req_data );

		$what = __('Critical Pages & Shortcodes', 'event_espresso');
		$success = $this->_update_espresso_configuration( $what, EE_Registry::instance()->CFG->core, __FILE__, __FUNCTION__, __LINE__ );
		$query_args = array(
			'action' => 'critical_pages'
			);
		$this->_redirect_after_action( FALSE, '', '', $query_args, TRUE );

	}









	/*************		Templates 		*************/


	protected function _template_settings() {
		$this->_admin_page_title = __('Template Settings (Preview)', 'event_espresso');
		$this->_template_args['preview_img'] = '<img src="' . GEN_SET_ASSETS_URL . DS . 'images' . DS . 'caffeinated_template_features.jpg" alt="Template Settings Preview screenshot" />';
		$this->_template_args['preview_text'] = '<strong>'.__( 'Template Settings is a feature that is only available in the Caffeinated version of Event Espresso. Template Settings allow you to configure some of the appearance options for both the Event List and Event Details pages.', 'event_espresso' ).'</strong>';
		$this->display_admin_caf_preview_page( 'template_settings_tab' );
	}




	/*************		Your Organization 		*************/


	protected function _your_organization_settings() {

		$this->_template_args['site_license_key'] = isset( EE_Registry::instance()->NET_CFG->core->site_license_key ) ? $this->_display_nice( EE_Registry::instance()->NET_CFG->core->site_license_key ) : '';
		$this->_template_args['organization_name'] = isset( EE_Registry::instance()->CFG->organization->name ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->name ) : '';
		$this->_template_args['organization_address_1'] = isset( EE_Registry::instance()->CFG->organization->address_1 ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->address_1 ) : '';
		$this->_template_args['organization_address_2'] = isset( EE_Registry::instance()->CFG->organization->address_2 ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->address_2 ) : '';
		$this->_template_args['organization_city'] = isset( EE_Registry::instance()->CFG->organization->city ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->city ) : '';
		$this->_template_args['organization_zip'] = isset( EE_Registry::instance()->CFG->organization->zip ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->zip ) : '';
		$this->_template_args['organization_email'] = isset( EE_Registry::instance()->CFG->organization->email ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->email ) : '';
		$this->_template_args['organization_phone'] = isset( EE_Registry::instance()->CFG->organization->phone ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->phone ) : '';
		$this->_template_args['organization_vat'] = isset( EE_Registry::instance()->CFG->organization->vat ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->vat ) : '';
		$this->_template_args['currency_sign'] = isset( EE_Registry::instance()->CFG->currency->sign ) ? $this->_display_nice( EE_Registry::instance()->CFG->currency->sign ) : '$';
		$this->_template_args['organization_logo_url'] = isset( EE_Registry::instance()->CFG->organization->logo_url ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->logo_url ) : FALSE;
		$this->_template_args['organization_facebook'] = isset( EE_Registry::instance()->CFG->organization->facebook ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->facebook ) : '';
		$this->_template_args['organization_twitter'] = isset( EE_Registry::instance()->CFG->organization->twitter ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->twitter ) : '';
		$this->_template_args['organization_linkedin'] = isset( EE_Registry::instance()->CFG->organization->linkedin ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->linkedin ) : '';
		$this->_template_args['organization_pinterest'] = isset( EE_Registry::instance()->CFG->organization->pinterest ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->pinterest ) : '';
		$this->_template_args['organization_google'] = isset( EE_Registry::instance()->CFG->organization->google ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->google ) : '';
		$this->_template_args['organization_instagram'] = isset( EE_Registry::instance()->CFG->organization->instagram ) ? $this->_display_nice( EE_Registry::instance()->CFG->organization->instagram ) : '';
		//UXIP settings
		$this->_template_args['ee_ueip_optin'] = isset( EE_Registry::instance()->CFG->core->ee_ueip_optin ) ? $this->_display_nice( EE_Registry::instance()->CFG->core->ee_ueip_optin ) : TRUE;

		EE_Registry::instance()->load_helper( 'Form_Fields' );
		$STA_ID = isset( EE_Registry::instance()->CFG->organization->STA_ID ) ? EE_Registry::instance()->CFG->organization->STA_ID : 4;
		$this->_template_args['states'] = new EE_Question_Form_Input(
				EE_Question::new_instance ( array(
					'QST_ID'=> 0,
					'QST_display_text'=> __('State/Province', 'event_espresso'),
					'QST_system'=>'admin-state'
				)),
				EE_Answer::new_instance ( array(
					'ANS_ID' => 0,
					'ANS_value' => $STA_ID
				)),
				array(
					'input_id' => 'organization_state',
					'input_name' => 'organization_state',
					'input_prefix' => '',
					'append_qstn_id' => FALSE
				)
			);

		$CNT_ISO = isset( EE_Registry::instance()->CFG->organization->CNT_ISO ) ? EE_Registry::instance()->CFG->organization->CNT_ISO : 'US';
		$this->_template_args['countries'] = new EE_Question_Form_Input(
				EE_Question::new_instance ( array(
					'QST_ID'=> 0,
					'QST_display_text'=> __('Country', 'event_espresso'),
					'QST_system'=>'admin-country'
				)),
				EE_Answer::new_instance ( array(
					'ANS_ID' => 0,
					'ANS_value' => $CNT_ISO
				)),
				array(
					'input_id' => 'organization_country',
					'input_name' => 'organization_country',
					'input_prefix' => '',
					'append_qstn_id' => FALSE
				)
			);

		add_filter( 'FHEE__EEH_Form_Fields__label_html', array( $this, 'country_form_field_label_wrap' ), 10, 2 );
		add_filter( 'FHEE__EEH_Form_Fields__input_html', array( $this, 'country_form_field_input__wrap' ), 10, 2 );

		//PUE verification stuff
		$verify_fail = get_option( 'pue_verification_error_' . EE_PLUGIN_BASENAME );
		$this->_template_args['site_license_key_verified'] = $verify_fail || !empty( $verify_fail ) || ( empty( $this->_template_args['site_license_key'] ) && empty( $verify_fail ) )? '<span class="dashicons dashicons-admin-network ee-icon-color-ee-red ee-icon-size-20"></span>' : '<span class="dashicons dashicons-admin-network ee-icon-color-ee-green ee-icon-size-20"></span>';

		$this->_set_add_edit_form_tags( 'update_your_organization_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( GEN_SET_TEMPLATE_PATH . 'your_organization_settings.template.php', $this->_template_args, TRUE );

		$this->display_admin_page_with_sidebar();
	}

	protected function _update_your_organization_settings() {
		if ( is_main_site() )
			EE_Registry::instance()->NET_CFG->core->site_license_key = isset( $this->_req_data['site_license_key'] ) ? sanitize_text_field( $this->_req_data['site_license_key'] ) : EE_Registry::instance()->NET_CFG->core->site_license_key;
		EE_Registry::instance()->CFG->organization->name = isset( $this->_req_data['organization_name'] ) ? sanitize_text_field( $this->_req_data['organization_name'] ) : EE_Registry::instance()->CFG->organization->name;
		EE_Registry::instance()->CFG->organization->address_1 = isset( $this->_req_data['organization_address_1'] ) ? sanitize_text_field( $this->_req_data['organization_address_1'] ) : EE_Registry::instance()->CFG->organization->address_1;
		EE_Registry::instance()->CFG->organization->address_2 = isset( $this->_req_data['organization_address_2'] ) ? sanitize_text_field( $this->_req_data['organization_address_2'] ) : EE_Registry::instance()->CFG->organization->address_2;
		EE_Registry::instance()->CFG->organization->city = isset( $this->_req_data['organization_city'] ) ? sanitize_text_field( $this->_req_data['organization_city'] ) : EE_Registry::instance()->CFG->organization->city;
		EE_Registry::instance()->CFG->organization->STA_ID = isset( $this->_req_data['organization_state'] ) ? absint( $this->_req_data['organization_state'] ) : EE_Registry::instance()->CFG->organization->STA_ID;
		EE_Registry::instance()->CFG->organization->CNT_ISO = isset( $this->_req_data['organization_country'] ) ? sanitize_text_field( $this->_req_data['organization_country'] ) : EE_Registry::instance()->CFG->organization->CNT_ISO;
		EE_Registry::instance()->CFG->organization->zip = isset( $this->_req_data['organization_zip'] ) ? sanitize_text_field( $this->_req_data['organization_zip'] ) : EE_Registry::instance()->CFG->organization->zip;
		EE_Registry::instance()->CFG->organization->email = isset( $this->_req_data['organization_email'] ) ? sanitize_email( $this->_req_data['organization_email'] ) : EE_Registry::instance()->CFG->organization->email;
		EE_Registry::instance()->CFG->organization->vat = isset( $this->_req_data['organization_vat'] ) ? sanitize_text_field( $this->_req_data['organization_vat'] ) : EE_Registry::instance()->CFG->organization->vat;
		EE_Registry::instance()->CFG->organization->phone = isset( $this->_req_data['organization_phone'] ) ? sanitize_text_field( $this->_req_data['organization_phone'] ) : EE_Registry::instance()->CFG->organization->phone;
		EE_Registry::instance()->CFG->organization->logo_url = isset( $this->_req_data['organization_logo_url'] ) ? esc_url_raw( $this->_req_data['organization_logo_url'] ) : EE_Registry::instance()->CFG->organization->logo_url;
		EE_Registry::instance()->CFG->organization->facebook = isset( $this->_req_data['organization_facebook'] ) ? esc_url_raw( $this->_req_data['organization_facebook'] ) : EE_Registry::instance()->CFG->organization->facebook;
		EE_Registry::instance()->CFG->organization->twitter = isset( $this->_req_data['organization_twitter'] ) ? esc_url_raw( $this->_req_data['organization_twitter'] ) : EE_Registry::instance()->CFG->organization->twitter;
		EE_Registry::instance()->CFG->organization->linkedin = isset( $this->_req_data['organization_linkedin'] ) ? esc_url_raw( $this->_req_data['organization_linkedin'] ) : EE_Registry::instance()->CFG->organization->linkedin;
		EE_Registry::instance()->CFG->organization->pinterest = isset( $this->_req_data['organization_pinterest'] ) ? esc_url_raw( $this->_req_data['organization_pinterest'] ) : EE_Registry::instance()->CFG->organization->pinterest;
		EE_Registry::instance()->CFG->organization->google = isset( $this->_req_data['organization_google'] ) ? esc_url_raw( $this->_req_data['organization_google'] ) : EE_Registry::instance()->CFG->organization->google;
		EE_Registry::instance()->CFG->organization->instagram = isset( $this->_req_data['organization_instagram'] ) ? esc_url_raw( $this->_req_data['organization_instagram'] ) : EE_Registry::instance()->CFG->organization->instagram;
		EE_Registry::instance()->CFG->core->ee_ueip_optin = isset( $this->_req_data['ueip_optin'] ) && !empty( $this->_req_data['ueip_optin'] ) ? $this->_req_data['ueip_optin'] : EE_Registry::instance()->CFG->core->ee_ueip_optin;

		EE_Registry::instance()->CFG->currency = new EE_Currency_Config( EE_Registry::instance()->CFG->organization->CNT_ISO );

		EE_Registry::instance()->CFG = apply_filters( 'FHEE__General_Settings_Admin_Page___update_your_organization_settings__CFG', EE_Registry::instance()->CFG );

		$what = 'Your Organization Settings';
		$success = $this->_update_espresso_configuration( $what, EE_Registry::instance()->CFG, __FILE__, __FUNCTION__, __LINE__ );

		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'default' ) );

	}


	/*************		Admin Options 		*************/


	protected function _admin_option_settings() {

		$this->_template_args['values'] = $this->_yes_no_values;
		$this->_template_args['use_personnel_manager'] = isset( EE_Registry::instance()->CFG->admin->use_personnel_manager ) ? absint( EE_Registry::instance()->CFG->admin->use_personnel_manager ) : FALSE;
		$this->_template_args['use_dashboard_widget'] = isset( EE_Registry::instance()->CFG->admin->use_dashboard_widget ) ? absint( EE_Registry::instance()->CFG->admin->use_dashboard_widget ) : TRUE;
		$this->_template_args['events_in_dashboard'] = isset( EE_Registry::instance()->CFG->admin->events_in_dashboard ) ? absint( EE_Registry::instance()->CFG->admin->events_in_dashboard ) : 30;
		$this->_template_args['use_event_timezones'] = isset( EE_Registry::instance()->CFG->admin->use_event_timezones ) ? absint( EE_Registry::instance()->CFG->admin->use_event_timezones ) : FALSE;
		$this->_template_args['show_reg_footer'] = isset( EE_Registry::instance()->CFG->admin->show_reg_footer ) ? absint( EE_Registry::instance()->CFG->admin->show_reg_footer ) : TRUE;
		$this->_template_args['affiliate_id'] = isset( EE_Registry::instance()->CFG->admin->affiliate_id ) ? $this->_display_nice( EE_Registry::instance()->CFG->admin->affiliate_id ) : '';
		$this->_template_args['help_tour_activation'] = isset( EE_Registry::instance()->CFG->admin->help_tour_activation ) ? absint( EE_Registry::instance()->CFG->admin->help_tour_activation ): 1;

		$this->_set_add_edit_form_tags( 'update_admin_option_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['template_args'] = $this->_template_args;
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( GEN_SET_TEMPLATE_PATH . 'admin_option_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();
	}

	protected function _update_admin_option_settings() {
		EE_Registry::instance()->CFG->admin->use_personnel_manager = isset( $this->_req_data['use_personnel_manager'] ) ? absint( $this->_req_data['use_personnel_manager'] ) : EE_Registry::instance()->CFG->admin->use_personnel_manager;
		EE_Registry::instance()->CFG->admin->use_dashboard_widget = isset( $this->_req_data['use_dashboard_widget'] ) ? absint( $this->_req_data['use_dashboard_widget'] ) : EE_Registry::instance()->CFG->admin->use_dashboard_widget;
		EE_Registry::instance()->CFG->admin->events_in_dashboard = isset( $this->_req_data['events_in_dashboard'] ) ? absint( $this->_req_data['events_in_dashboard'] ) : EE_Registry::instance()->CFG->admin->events_in_dashboard;
		EE_Registry::instance()->CFG->admin->use_event_timezones = isset( $this->_req_data['use_event_timezones'] ) ? absint( $this->_req_data['use_event_timezones'] ) : EE_Registry::instance()->CFG->admin->use_event_timezones;
		EE_Registry::instance()->CFG->admin->show_reg_footer = isset( $this->_req_data['show_reg_footer'] ) ? absint( $this->_req_data['show_reg_footer'] ) : EE_Registry::instance()->CFG->admin->show_reg_footer;
		EE_Registry::instance()->CFG->admin->affiliate_id = isset( $this->_req_data['affiliate_id'] ) ? sanitize_text_field( $this->_req_data['affiliate_id'] ) : EE_Registry::instance()->CFG->admin->affiliate_id;
		EE_Registry::instance()->CFG->admin->help_tour_activation = isset( $this->_req_data['help_tour_activation'] ) ? absint( $this->_req_data['help_tour_activation'] ) : EE_Registry::instance()->CFG->admin->help_tour_activation;

		EE_Registry::instance()->CFG->admin = apply_filters( 'FHEE__General_Settings_Admin_Page___update_admin_option_settings__CFG_admin', EE_Registry::instance()->CFG->admin );

		$what = 'Admin Options';
		$success = $this->_update_espresso_configuration( $what, EE_Registry::instance()->CFG->admin, __FILE__, __FUNCTION__, __LINE__ );
		$success = apply_filters( 'FHEE__General_Settings_Admin_Page___update_admin_option_settings__success', $success );
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'admin_option_settings' ) );

	}





	/*************		Countries 		*************/


	protected function _country_settings() {

		$CNT_ISO = isset( EE_Registry::instance()->CFG->organization->CNT_ISO ) ? EE_Registry::instance()->CFG->organization->CNT_ISO : 'US';
		$CNT_ISO = isset( $this->_req_data['country'] ) ? strtoupper( sanitize_text_field( $this->_req_data['country'] )) : $CNT_ISO;

		//load field generator helper
		EE_Registry::instance()->load_helper( 'Form_Fields' );

		$this->_template_args['values'] = $this->_yes_no_values;

		$this->_template_args['countries'] = new EE_Question_Form_Input(
				EE_Question::new_instance ( array(
					'QST_ID'=> 0,
					'QST_display_text'=> __('Select Country', 'event_espresso'),
					'QST_system'=>'admin-country'
				)),
				EE_Answer::new_instance ( array(
					'ANS_ID' => 0,
					'ANS_value' => $CNT_ISO
				)),
				array(
					'input_id' => 'country',
					'input_name' => 'country',
					'input_prefix' => '',
					'append_qstn_id' => FALSE
				)
			);
//		printr( $this->_template_args['countries'], 'countries  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		add_filter( 'FHEE__EEH_Form_Fields__label_html', array( $this, 'country_form_field_label_wrap' ), 10, 2 );
		add_filter( 'FHEE__EEH_Form_Fields__input_html', array( $this, 'country_form_field_input__wrap' ), 10, 2 );
		$this->_template_args['country_details_settings'] = $this->display_country_settings();
		$this->_template_args['country_states_settings'] = $this->display_country_states();

		$this->_set_add_edit_form_tags( 'update_country_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( GEN_SET_TEMPLATE_PATH . 'countries_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_no_sidebar();
	}



	/**
	 * 		display_country_settings
	 *
	 * 		@access 	public
	 * 		@param 	string 		$CNT_ISO
	 * 		@return 		mixed		string | array
	 */
	public function display_country_settings( $CNT_ISO = FALSE ) {

		$CNT_ISO = isset( $this->_req_data['country'] ) ? strtoupper( sanitize_text_field( $this->_req_data['country'] )) : $CNT_ISO;
		if ( ! $CNT_ISO ) {
			return '';
		}

		// for ajax
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		remove_all_filters( 'FHEE__EEH_Form_Fields__label_html' );
		remove_all_filters( 'FHEE__EEH_Form_Fields__input_html' );
		add_filter( 'FHEE__EEH_Form_Fields__label_html', array( $this, 'country_form_field_label_wrap' ), 10, 2 );
		add_filter( 'FHEE__EEH_Form_Fields__input_html', array( $this, 'country_form_field_input__wrap' ), 10, 2 );
		$country = EEM_Country::instance()->get_one_by_ID( $CNT_ISO );
		//printr( $country, '$country  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$country_input_types = array(
			'CNT_active' => array( 'type' => 'RADIO_BTN', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => '', 'options' => $this->_yes_no_values, 'use_desc_4_label' => TRUE  ),
			'CNT_ISO' => array( 'type' => 'TEXT', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => 'small-text' ),
			'CNT_ISO3' => array( 'type' => 'TEXT', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => 'small-text' ),
			'RGN_ID' => array( 'type' => 'TEXT', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => 'small-text' ),
			'CNT_name' => array( 'type' => 'TEXT', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => 'regular-text' ),
			'CNT_cur_code' => array( 'type' => 'TEXT', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => 'small-text' ),
			'CNT_cur_single' => array( 'type' => 'TEXT', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => 'medium-text' ),
			'CNT_cur_plural' => array( 'type' => 'TEXT', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => 'medium-text' ),
			'CNT_cur_sign' => array( 'type' => 'TEXT', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => 'small-text', 'htmlentities' => FALSE ),
			'CNT_cur_sign_b4' => array( 'type' => 'RADIO_BTN', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => '', 'options' => $this->_yes_no_values, 'use_desc_4_label' => TRUE ),
			'CNT_cur_dec_plc' => array( 'type' => 'RADIO_BTN', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => '', 'options' => array( array( 'id' => 0, 'text' => '' ), array( 'id' => 1, 'text' => '' ), array( 'id' => 2, 'text' => '' ), array( 'id' => 3, 'text' => '' ))),
			'CNT_cur_dec_mrk' => array( 'type' => 'RADIO_BTN', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => '', 'options' => array( array( 'id' => ',', 'text' => __(', (comma)', 'event_espresso')), array( 'id' => '.', 'text' => __('. (decimal)', 'event_espresso'))), 'use_desc_4_label' => TRUE ),
			'CNT_cur_thsnds' => array( 'type' => 'RADIO_BTN', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => '', 'options' => array( array( 'id' => ',', 'text' => __(', (comma)', 'event_espresso')), array( 'id' => '.', 'text' => __('. (decimal)', 'event_espresso'))), 'use_desc_4_label' => TRUE ),
			'CNT_tel_code' => array( 'type' => 'TEXT', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => 'small-text' ),
			'CNT_is_EU' => array( 'type' => 'RADIO_BTN', 'input_name' => 'cntry[' . $CNT_ISO . ']', 'class' => '', 'options' => $this->_yes_no_values, 'use_desc_4_label' => TRUE  )
		);
		$this->_template_args['inputs'] = EE_Question_Form_Input::generate_question_form_inputs_for_object( $country, $country_input_types );
		$country_details_settings = EEH_Template::display_template( GEN_SET_TEMPLATE_PATH . 'country_details_settings.template.php', $this->_template_args, TRUE );

		if ( defined( 'DOING_AJAX' )) {
			$notices = EE_Error::get_notices( FALSE, FALSE, FALSE );
			echo json_encode( array( 'return_data' => $country_details_settings, 'success' => $notices['success'], 'errors' => $notices['errors'] ));
			die();
		} else {
			return $country_details_settings;
		}

	}




	/**
	 * 		display_country_states
	 *
	 * 		@access 	public
	 * 		@param 	string 		$CNT_ISO
	 * 		@return 		string
	 */
	public function display_country_states( $CNT_ISO = FALSE ) {

		$CNT_ISO = isset( $this->_req_data['country'] ) ? sanitize_text_field( $this->_req_data['country'] ) : $CNT_ISO;

		if ( ! $CNT_ISO ) {
			return '';
		}
		// for ajax
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		remove_all_filters( 'FHEE__EEH_Form_Fields__label_html' );
		remove_all_filters( 'FHEE__EEH_Form_Fields__input_html' );
		add_filter( 'FHEE__EEH_Form_Fields__label_html', array( $this, 'state_form_field_label_wrap' ), 10, 2 );
		add_filter( 'FHEE__EEH_Form_Fields__input_html', array( $this, 'state_form_field_input__wrap' ), 10, 2 );
		$states = FALSE;
		$states = EEM_State::instance()->get_all_states_for_these_countries( array( $CNT_ISO => $CNT_ISO ));

//			echo '<h4>$CNT_ISO : ' . $CNT_ISO . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//			global $wpdb;
//			echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//			printr( $states, '$states  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( $states ) {
			foreach ( $states as $STA_ID => $state ) {
				//STA_abbrev 	STA_name 	STA_active
				$state_input_types = array(
					'STA_abbrev' => array( 'type' => 'TEXT', 'input_name' => 'states[' . $STA_ID . ']', 'class' => 'small-text' ),
					'STA_name' => array( 'type' => 'TEXT', 'input_name' => 'states[' . $STA_ID . ']', 'class' => 'regular-text' ),
					'STA_active' => array( 'type' => 'RADIO_BTN', 'input_name' => 'states[' . $STA_ID . ']', 'options' => $this->_yes_no_values, 'use_desc_4_label' => TRUE )
				);
				$this->_template_args['states'][ $STA_ID ]['inputs'] = EE_Question_Form_Input::generate_question_form_inputs_for_object( $state, $state_input_types );
				$query_args =  array( 'action' => 'delete_state', 'STA_ID' => $STA_ID, 'CNT_ISO' => $CNT_ISO, 'STA_abbrev' => $state->abbrev() );
				$this->_template_args['states'][ $STA_ID ]['delete_state_url'] = EE_Admin_Page::add_query_args_and_nonce( $query_args, GEN_SET_ADMIN_URL );
			}
		} else {
			$this->_template_args['states'] = FALSE;
		}
//		printr( $this->_template_args['states'], 'XXXXXXX  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$this->_template_args['add_new_state_url'] = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => 'add_new_state' ),  GEN_SET_ADMIN_URL );

		$state_details_settings = EEH_Template::display_template( GEN_SET_TEMPLATE_PATH . 'state_details_settings.template.php', $this->_template_args, TRUE );

		if ( defined( 'DOING_AJAX' )) {
			$notices = EE_Error::get_notices( FALSE, FALSE, FALSE );
			echo json_encode( array( 'return_data' => $state_details_settings, 'success' => $notices['success'], 'errors' => $notices['errors'] ));
			die();
		} else {
			return $state_details_settings;
		}

	}




	/**
	 * 		add_new_state
	 *
	 * 		@access 	public
	 * 		@return 		void
	 */
	public function add_new_state() {

		$success = TRUE;

		$CNT_ISO = isset( $this->_req_data['CNT_ISO'] ) ? strtoupper( sanitize_text_field( $this->_req_data['CNT_ISO'] )) : FALSE;
		if ( ! $CNT_ISO ) {
			EE_Error::add_error( __( 'An error occurred. No Country ISO code or an invalid Country ISO code was received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}
		$STA_abbrev = isset( $this->_req_data['STA_abbrev'] ) ? strtoupper( sanitize_text_field( $this->_req_data['STA_abbrev'] )) : FALSE;
		if ( ! $STA_abbrev ) {
			EE_Error::add_error( __( 'An error occurred. No State ISO code or an invalid State ISO code was received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}
		$STA_name = isset( $this->_req_data['STA_name'] ) ? ucwords( strtolower( sanitize_text_field( $this->_req_data['STA_name'] ))) : FALSE;
		if ( ! $STA_name ) {
			EE_Error::add_error( __( 'An error occurred. No State name or an invalid State name was received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			$success = FALSE;
		}

		if ( $success ) {
			$cols_n_values = array(
				'CNT_ISO' => $CNT_ISO,
				'STA_abbrev' => $STA_abbrev,
				'STA_name' => $STA_name,
				'STA_active' => TRUE
			);
			$success = EEM_State::instance()->insert ( $cols_n_values );
		}

		if ( defined( 'DOING_AJAX' )) {
			$notices = EE_Error::get_notices( FALSE, FALSE, FALSE );
			echo json_encode( array( 'return_data' => $CNT_ISO, 'success' => __( 'The State was added successfully.', 'event_espresso' ), 'errors' => $notices['errors'] ));
			die();
		} else {
			$this->_redirect_after_action( $success, 'State', 'added', array( 'action' => 'country_settings' ) );
		}
	}



	/**
	 * 		delete_state
	 *
	 * 		@access 	public
	 * 		@return 		void
	 */
	public function delete_state() {
		$CNT_ISO = isset( $this->_req_data['CNT_ISO'] ) ? strtoupper( sanitize_text_field( $this->_req_data['CNT_ISO'] )) : FALSE;
		$STA_ID = isset( $this->_req_data['STA_ID'] ) ? sanitize_text_field( $this->_req_data['STA_ID'] ) : FALSE;
		$STA_abbrev = isset( $this->_req_data['STA_abbrev'] ) ? strtoupper( sanitize_text_field( $this->_req_data['STA_abbrev'] )) : FALSE;

		if ( ! $STA_ID ) {
			EE_Error::add_error( __( 'An error occurred. No State ID or an invalid State ID was received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$success = EEM_State::instance()->delete_by_ID( $STA_ID );
		if ( $success !== FALSE ) {
			do_action( 'AHEE__General_Settings_Admin_Page__delete_state__state_deleted', $CNT_ISO, $STA_ID, array( 'STA_abbrev' => $STA_abbrev ));
			EE_Error::add_success( __( 'The State was deleted successfully.', 'event_espresso' ));
		}
		if ( defined( 'DOING_AJAX' )) {
			$notices = EE_Error::get_notices( FALSE, FALSE, FALSE );
			echo json_encode( array( 'return_data' => true, 'success' => $notices['success'], 'errors' => $notices['errors'] ));
			die();
		} else {
			$this->_redirect_after_action( $success, 'State', 'deleted', array( 'action' => 'country_settings' ) );
		}
	}




	/**
	 * 		_update_country_settings
	 *
	 * 		@access 	protected
	 * 		@return 		void
	 */
	protected function _update_country_settings() {
//		printr( $this->_req_data, '$this->_req_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// grab the country ISO code
		$CNT_ISO = isset( $this->_req_data['country'] ) ? strtoupper( sanitize_text_field( $this->_req_data['country'] )) : FALSE;
		if ( ! $CNT_ISO ) {
			EE_Error::add_error( __( 'An error occurred. No Country ISO code or an invalid Country ISO code was received.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$success = TRUE;
		$cols_n_values = array();
		$cols_n_values['CNT_ISO3'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_ISO3'] ) ? strtoupper( sanitize_text_field( $this->_req_data['cntry'][$CNT_ISO]['CNT_ISO3'] )) : FALSE;
		$cols_n_values['RGN_ID'] = isset( $this->_req_data['cntry'][$CNT_ISO]['RGN_ID'] ) ? absint( $this->_req_data['cntry'][$CNT_ISO]['RGN_ID'] ) : NULL;
		$cols_n_values['CNT_name'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_name'] ) ? sanitize_text_field( $this->_req_data['cntry'][$CNT_ISO]['CNT_name'] ) : NULL;
		$cols_n_values['CNT_cur_code'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_code'] ) ? strtoupper( sanitize_text_field( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_code'] )) : 'USD';
		$cols_n_values['CNT_cur_single'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_single'] ) ? sanitize_text_field( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_single'] ) : 'dollar';
		$cols_n_values['CNT_cur_plural'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_plural'] ) ? sanitize_text_field( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_plural'] ) : 'dollars';
		$cols_n_values['CNT_cur_sign'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_sign'] ) ? sanitize_text_field( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_sign'] ) : '$';
		$cols_n_values['CNT_cur_sign_b4'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_sign_b4'] ) ? absint( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_sign_b4'] ) : TRUE;
		$cols_n_values['CNT_cur_dec_plc'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_dec_plc'] ) ? absint( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_dec_plc'] ) : 2;
		$cols_n_values['CNT_cur_dec_mrk'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_dec_mrk'] ) ? sanitize_text_field( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_dec_mrk'] ) : '.';
		$cols_n_values['CNT_cur_thsnds'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_thsnds'] ) ? sanitize_text_field( $this->_req_data['cntry'][$CNT_ISO]['CNT_cur_thsnds'] ) : ',';
		$cols_n_values['CNT_tel_code'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_tel_code'] ) ? sanitize_text_field( $this->_req_data['cntry'][$CNT_ISO]['CNT_tel_code'] ) : NULL;
		$cols_n_values['CNT_is_EU'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_is_EU'] ) ? absint( $this->_req_data['cntry'][$CNT_ISO]['CNT_is_EU'] ) : FALSE;
		$cols_n_values['CNT_active'] = isset( $this->_req_data['cntry'][$CNT_ISO]['CNT_active'] ) ? absint( $this->_req_data['cntry'][$CNT_ISO]['CNT_active'] ) : FALSE;
		// allow filtering of country data
		$cols_n_values = apply_filters( 'FHEE__General_Settings_Admin_Page___update_country_settings__cols_n_values', $cols_n_values );
		//printr( $cols_n_values, '$cols_n_values  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// where values
		$where_cols_n_values = array( array( 'CNT_ISO' => $CNT_ISO ));
		// run the update
		$success = EEM_Country::instance()->update( $cols_n_values, $where_cols_n_values );
//		global $wpdb;
//		echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$success : ' . $success . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		if ( isset( $this->_req_data['states'] ) && is_array( $this->_req_data['states'] ) && $success !== FALSE ) {
			// allow filtering of states data
			$states = apply_filters( 'FHEE__General_Settings_Admin_Page___update_country_settings__states', $this->_req_data['states'] );
//			printr( $states, '$states  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			// loop thru state data ( looks like : states[75][STA_name] )
			foreach( $states as $STA_ID => $state ) {
				$cols_n_values = array(
					'CNT_ISO' 		=> $CNT_ISO,
					'STA_abbrev' => strtoupper( sanitize_text_field( $state['STA_abbrev'] )),
					'STA_name' 	=> ucwords( strtolower( sanitize_text_field( $state['STA_name'] ))),
					'STA_active' 	=> (bool)absint( $state['STA_active'] )
				);
				// where values
				$where_cols_n_values = array( array( 'STA_ID' => $STA_ID ));
				// run the update
				$success = EEM_State::instance()->update( $cols_n_values, $where_cols_n_values );
				if ( $success !== FALSE ) {
					do_action( 'AHEE__General_Settings_Admin_Page__update_country_settings__state_saved', $CNT_ISO, $STA_ID, $cols_n_values );
				}
			}
		}
		// check if country being edited matchs org option country, and if so, then  update EE_Config with new settings
		if ( isset( EE_Registry::instance()->CFG->organization->CNT_ISO ) && $CNT_ISO == EE_Registry::instance()->CFG->organization->CNT_ISO ) {
			EE_Registry::instance()->CFG->currency = new EE_Currency_Config( $CNT_ISO );
			EE_Registry::instance()->CFG->update_espresso_config();
		}
		$this->_redirect_after_action( $success, 'Countries', 'updated', array( 'action' => 'country_settings', 'country' => $CNT_ISO ));
	}





	/**
	 * 		form_form_field_label_wrap
	 *
	 * 		@access 		public
	 * 		@param 		string 		$label
	 * 		@return 		string
	 */
	public function country_form_field_label_wrap( $label, $required_text ) {
		return '
			<tr>
				<th>
					' . $label  . '
				</th>';
	}




	/**
	 * 		form_form_field_input__wrap
	 *
	 * 		@access 		public
	 * 		@param 		string 		$label
	 * 		@return 		string
	 */
	public function country_form_field_input__wrap( $input, $label ) {
		return '
				<td class="general-settings-country-input-td">
					' . $input . '
				</td>
			</tr>';
	}




	/**
	 * 		form_form_field_label_wrap
	 *
	 * 		@access 		public
	 * 		@param 		string 		$label
	 * 		@param 		string 		$required_text
	 * 		@return 		string
	 */
	public function state_form_field_label_wrap( $label, $required_text  ) {
		return $required_text;
	}




	/**
	 * 		form_form_field_input__wrap
	 *
	 * 		@access 		public
	 * 		@param 		string 		$label
	 * 		@return 		string
	 */
	public function state_form_field_input__wrap( $input, $label ) {
		return '
				<td class="general-settings-country-state-input-td">
					' . $input . '
				</td>';

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
