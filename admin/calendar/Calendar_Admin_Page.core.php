<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Event Espresso
 * @copyright	(c)	2009-2014 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link			http://www.eventespresso.com
 * @version		EE4
 *
 * ------------------------------------------------------------------------
 *
 * Calendar_Admin_Page
 *
 * This contains the logic for setting up the Calendar Addon Admin related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 *
 * @package		Calendar_Admin_Page (calendar addon)
 * @subpackage	admin/Calendar_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Calendar_Admin_Page extends EE_Admin_Page {


	protected function _init_page_props() {
		$this->page_slug = CALENDAR_PG_SLUG;
		$this->page_label = CALENDAR_LABEL;
		$this->_admin_base_url = EE_CALENDAR_ADMIN_URL;
		$this->_admin_base_path = EE_CALENDAR_ADMIN;
	}




	protected function _ajax_hooks() {}





	protected function _define_page_props() {
		$this->_admin_page_title = CALENDAR_LABEL;
		$this->_labels = array(
			'publishbox' => __('Update Settings', 'event_espresso')
			);
	}




	protected function _set_page_routes() {
		$this->_page_routes = array(		
			'default' => '_basic_settings',
			'advanced' => '_advanced_settings',
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
					'label' => __('Basic Settings', 'event_espresso'),
					'order' => 10
					),
				'metaboxes' => array( '_publish_post_box'),
				'require_nonce' => FALSE
				),
			'advanced' => array(
				'nav' => array(
					'label' => __('Advanced Settings', 'event_espresso'),
					'order' => 20
					),
				'metaboxes' => array( '_publish_post_box' ),
				'require_nonce' => FALSE
				),
			'usage' => array(
				'nav' => array(
					'label' => __('Calendar Usage', 'event_espresso'),
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
		wp_register_script('ee-calendar-admin-js', EE_CALENDAR_ADMIN_ASSETS_URL . 'calendar-admin.js', array('jquery','wp-color-picker'), EE_CALENDAR_VERSION, TRUE );
		wp_enqueue_script('ee-calendar-admin-js');
		wp_enqueue_style( 'wp-color-picker' );
		wp_localize_script('ee-calendar-admin-js','ee_calendar',array('confirm_reset_text'=>  __("Are you sure you want to reset ALL your Event Espresso Calendar Information? This cannot be undone.", 'event_espresso')));
	}

	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	protected function _basic_settings() {
		$this->_settings_page( 'calendar_basic_settings.template.php' );
	}




	protected function _advanced_settings() {
		$this->_settings_page( 'calendar_advanced_settings.template.php' );
	}



	protected function _settings_page( $template ) {
		$this->_template_args['calendar_config'] = EE_Config::instance()->addons['calendar'];
		$this->_template_args['values'] = array(
				array('id' => false, 'text' => __('No', 'event_espresso')),
				array('id' => true, 'text' => __('Yes', 'event_espresso'))
		);
		$this->_template_args['return_action'] = $this->_req_action;
		$this->_template_args['reset_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action'=> 'reset_settings','return_action'=>$this->_req_action), EE_CALENDAR_ADMIN_URL);
		$this->_set_add_edit_form_tags( 'update_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE);	
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( EE_CALENDAR_ADMIN_TEMPLATE_PATH . $template, $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();
	}


	protected function _usage() {
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( EE_CALENDAR_ADMIN_TEMPLATE_PATH . 'calendar_usage_info.template.php', array(), TRUE );
		$this->display_admin_page_with_no_sidebar();
	}
	protected function _update_settings(){
		if(isset($_POST['reset']) && $_POST['reset'] == '1'){
			$c = new EE_Calendar_Config();
			$count = 1;
		}else{
			$c = EE_Config::instance()->addons['calendar'];
			$count=0;
			//otherwise we assume you want to allow full html
			foreach($this->_req_data['calendar'] as $top_level_key => $top_level_value){
				if(is_array($top_level_value)){
					foreach($top_level_value as $second_level_key => $second_level_value){
						if(property_exists($c,$top_level_key) && property_exists($c->$top_level_key, $second_level_key)
							&& $second_level_value != $c->$top_level_key->$second_level_key){
							$c->$top_level_key->$second_level_key = $this->_sanitize_config_input($top_level_key,$second_level_key,$second_level_value);
							$count++;	
						}
					}
				}else{
					if(property_exists($c, $top_level_key) && $top_level_value != $c->$top_level_key){
						$c->$top_level_key = $this->_sanitize_config_input($top_level_key, NULL, $top_level_value);
						$count++;
					}
				}
			}	
		}
		EE_Config::instance()->addons['calendar'] = $c;
		EE_Config::instance()->update_espresso_config();
		$this->_redirect_after_action($count, 'Settings', 'updated', array('action' => $this->_req_data['return_action']));
	}
	
	/**
	 * resets the calend data and redirects to where they came from
	 */
//	protected function _reset_settings(){
//		EE_Config::instance()->addons['calendar'] = new EE_Calendar_Config();
//		EE_Config::instance()->update_espresso_config();
//		$this->_redirect_after_action(1, 'Settings', 'reset', array('action' => $this->_req_data['return_action']));
//	}
	private function _sanitize_config_input($top_level_key,$second_level_key,$value){
		$sanitization_methods = array(
			'time'=>array(
				'first_day'=>'int',
				'weekends'=>'bool',
				'week_mode'=>'plaintext',
				'format'=>'plaintext',
				'show'=>'bool'),
			'header'=>array(
				'left'=>'plaintext',
				'center'=>'plaintext',
				'right'=>'plaintext'
			),
			'button_text'=>array(
				'prev'=>'html',
				'next'=>'html',
				'prev_year'=>'html',
				'next_year'=>'html',
				'today'=>'html',
				'month'=>'html',
				'week'=>'html',
				'day'=>'html',
			),
			'tooltip'=>array(
				'show'=>'bool',
				'pos_my_1'=>'plaintext',
				'pos_my_2'=>'plaintext',
				'pos_at_1'=>'plaintext',
				'pos_at_2'=>'plaintext',
				'style'=>'plaintext'
			),
			'title_format'=>array(
				'month'=>'plaintext',
				'week'=>'plaintext',
				'day'=>'plaintext',
			),
			'column_format'=>array(
				'month'=>'plaintext',
				'week'=>'plaintext',
				'day'=>'plaintext'
			),
			'display'=>array(
				'enable_calendar_thumbs'=>'bool',
				'calendar_height'=>'int',
				'enable_calendar_filters'=>'bool',
				'enable_category_legend'=>'bool',
				'use_pickers'=>'bool',
				'event_background'=>'plaintext',
				'event_text_color'=>'plaintext',
				'enable_cat_classes'=>'bool',
				'disable_categories'=>'bool',
				'show_attendee_limit'=>'bool',
			)
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
				EE_Error::add_error(sprintf(__("Could not sanitize input '%s' because it has no entry in our sanitization methods array", "event_espresso"),$input_name));
				return NULL;
			
		}
	}
		
		
	
	

} //ends Forms_Admin_Page class
