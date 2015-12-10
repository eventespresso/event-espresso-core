<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit('NO direct script access allowed'); }
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @package		Event Espresso
 * @author			Event Espresso
 * @copyright 	(c) 2009-2014 Event Espresso All Rights Reserved.
 * @license			http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link				http://www.eventespresso.com
 * @version			EE4
 *
 * ------------------------------------------------------------------------
 *
 * Rest_Api_Admin_Page
 *
 * This contains the logic for setting up the REST_API Addon Admin related pages.  Any methods without PHP doc comments have inline docs with parent class.
 *
 *
 * @package			Rest_Api_Admin_Page (rest_api addon)
 * @subpackage 	admin/Rest_Api_Admin_Page.core.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class Rest_Api_Admin_Page extends EE_Admin_Page {


	protected function _init_page_props() {
		$this->page_slug = REST_API_PG_SLUG;
		$this->page_label = REST_API_LABEL;
		$this->_admin_base_url = EE_REST_API_ADMIN_URL;
		$this->_admin_base_path = EE_REST_API_ADMIN;
	}




	protected function _ajax_hooks() {}





	protected function _define_page_props() {
		$this->_admin_page_title = REST_API_LABEL;
		$this->_labels = array(
			'publishbox' => __('Update Settings', 'event_espresso')
		);
	}




	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_basic_settings',
			'update_settings' => array(
				'func' => '_update_settings',
				'noheader' => TRUE
			),
			'usage' => '_usage'
		);
	}





	protected function _set_page_config() {

		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Settings', 'event_espresso'),
					'order' => 10
					),
				'metaboxes' => array_merge( $this->_default_espresso_metaboxes, array( '_publish_post_box') ),
				'require_nonce' => FALSE
			),
			'usage' => array(
				'nav' => array(
					'label' => __('REST API Usage', 'event_espresso'),
					'order' => 30
					),
				'require_nonce' => FALSE
			)
		);
	}


	protected function _add_screen_options() {}
	protected function _add_screen_options_default() {}
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {
		wp_register_script( 'espresso_rest_api_admin', EE_REST_API_ADMIN_ASSETS_URL . 'espresso_rest_api_admin.js', array( 'espresso_core' ), EE_REST_API_VERSION, TRUE );
		wp_enqueue_script( 'espresso_rest_api_admin');

		EE_Registry::$i18n_js_strings['confirm_reset'] = __( 'Are you sure you want to reset ALL your Event Espresso REST_API Information? This cannot be undone.', 'event_espresso' );
		wp_localize_script( 'espresso_rest_api_admin', 'eei18n', EE_Registry::$i18n_js_strings );
	}

	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	protected function _basic_settings() {
		$this->_settings_page( 'rest_api_basic_settings.template.php' );
	}




	/**
	 * _settings_page
	 * @param $template
	 */
	protected function _settings_page( $template ) {
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		$this->_template_args['rest_api_config'] = EE_Config::instance()->get_config( 'addons', 'EE_REST_API', 'EE_REST_API_Config' );
		add_filter( 'FHEE__EEH_Form_Fields__label_html', '__return_empty_string' );
		$this->_template_args['yes_no_values'] = array(
			EE_Question_Option::new_instance( array( 'QSO_value' => 0, 'QSO_desc' => __('No', 'event_espresso'))),
			EE_Question_Option::new_instance( array( 'QSO_value' => 1, 'QSO_desc' => __('Yes', 'event_espresso')))
		);

		$this->_template_args['return_action'] = $this->_req_action;
		$this->_template_args['reset_url'] = EE_Admin_Page::add_query_args_and_nonce( array('action'=> 'reset_settings','return_action'=>$this->_req_action), EE_REST_API_ADMIN_URL );
		$this->_set_add_edit_form_tags( 'update_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE);
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( EE_REST_API_ADMIN_TEMPLATE_PATH . $template, $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();
	}


	protected function _usage() {
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( EE_REST_API_ADMIN_TEMPLATE_PATH . 'rest_api_usage_info.template.php', array( 'api_endpoint' => site_url() . '/wp-json/ee/v4.6/events' ), TRUE );
		$this->display_admin_page_with_no_sidebar();
	}

	protected function _update_settings(){
		EE_Registry::instance()->load_helper( 'Class_Tools' );
		if(isset($_POST['reset_rest_api']) && $_POST['reset_rest_api'] == '1'){
			$config = new EE_REST_API_Config();
			$count = 1;
		}else{
			$config = EE_Config::instance()->get_config( 'addons', 'EE_REST_API', 'EE_REST_API_Config' );
			$count=0;
			//otherwise we assume you want to allow full html
			foreach($this->_req_data['rest_api'] as $top_level_key => $top_level_value){
				if(is_array($top_level_value)){
					foreach($top_level_value as $second_level_key => $second_level_value){
						if ( EEH_Class_Tools::has_property( $config, $top_level_key ) && EEH_Class_Tools::has_property( $config->$top_level_key, $second_level_key ) && $second_level_value != $config->$top_level_key->$second_level_key ) {
							$config->$top_level_key->$second_level_key = $this->_sanitize_config_input( $top_level_key, $second_level_key, $second_level_value );
							$count++;
						}
					}
				}else{
					if ( EEH_Class_Tools::has_property($config, $top_level_key) && $top_level_value != $config->$top_level_key){
						$config->$top_level_key = $this->_sanitize_config_input($top_level_key, NULL, $top_level_value);
						$count++;
					}
				}
			}
		}
		EE_Config::instance()->update_config( 'addons', 'EE_REST_API', $config );
		$this->_redirect_after_action( $count, 'Settings', 'updated', array('action' => $this->_req_data['return_action']));
	}

	/**
	 * resets the rest_api data and redirects to where they came from
	 */
//	protected function _reset_settings(){
//		EE_Config::instance()->addons['rest_api'] = new EE_REST_API_Config();
//		EE_Config::instance()->update_espresso_config();
//		$this->_redirect_after_action(1, 'Settings', 'reset', array('action' => $this->_req_data['return_action']));
//	}
	private function _sanitize_config_input( $top_level_key, $second_level_key, $value ){
		$sanitization_methods = array(
			'api_debug_mode'=>'bool',
		);
		$sanitization_method = NULL;
		if(isset($sanitization_methods[$top_level_key]) &&
				$second_level_key === NULL &&
				! is_array($sanitization_methods[$top_level_key]) ){
			$sanitization_method = $sanitization_methods[$top_level_key];
		}elseif(is_array($sanitization_methods[$top_level_key]) && isset($sanitization_methods[$top_level_key][$second_level_key])){
			$sanitization_method = $sanitization_methods[$top_level_key][$second_level_key];
		}
//		echo "$top_level_key [$second_level_key] with value $value will be sanitized as a $sanitization_method<br>";
		switch($sanitization_method){
			case 'bool':
				return (boolean)intval($value);
			case 'plaintext':
				return wp_strip_all_tags($value);
			case 'int':
				return intval($value);
			case 'html':
				return $value;
			default:
				$input_name = $second_level_key == NULL ? $top_level_key : $top_level_key."[".$second_level_key."]";
				EE_Error::add_error(sprintf(__("Could not sanitize input '%s' because it has no entry in our sanitization methods array", "event_espresso"),$input_name), __FILE__, __FUNCTION__, __LINE__ );
				return NULL;

		}
	}





}
// End of file Rest_Api_Admin_Page.core.php
// Location: /wp-content/plugins/eea-rest-api/admin/rest_api/Rest_Api_Admin_Page.core.php