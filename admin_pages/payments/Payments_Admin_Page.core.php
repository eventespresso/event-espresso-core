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
 * Payments_Admin_Page
 *
 * This contains the logic for setting up the Event Payments related admin pages.  Any methods without phpdoc comments have inline docs with parent class.
 *
 *
 * @package		Payments_Admin_Page
 * @subpackage	includes/core/admin/Payments_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Payments_Admin_Page extends EE_Admin_Page {


	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}



	protected function _init_page_props() {
		$this->page_slug = EE_PAYMENTS_PG_SLUG;
		$this->page_label = __('Payment Methods', 'event_espresso');
		$this->_admin_base_url = EE_PAYMENTS_ADMIN_URL;
		$this->_admin_base_path = EE_PAYMENTS_ADMIN;
	}



	protected function _ajax_hooks() {
		//todo: all hooks for ajax goes here.
	}



	protected function _define_page_props() {
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'publishbox' => __('Update Settings', 'event_espresso')
			);
	}



	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => array(
				'func'=>'_payment_methods_list'
			),
			'payment_settings' => '_payment_settings',
			'activate_payment_method'=>array(
				'func'=>'_activate_payment_method',
				'noheader'=>TRUE
				),
			'deactivate_payment_method'=>array(
				'func'=>'_deactivate_payment_method',
				'noheader'=>TRUE
				),
			'update_payment_method'=>array(
				'func'=>'_update_payment_method',
				'noheader'=>TRUE,
				'headers_sent_route'=>'default',
			),
			'update_payment_settings' => array(
				'func'=>'_update_payment_settings',
				'noheader'=>TRUE,
				),
			'payment_log'=> '_payment_log_overview_list_table',
			'payment_log_details'=>'_payment_log_details',
			);
	}
	


	protected function _set_page_config() {
		$payment_method_list_config = array(
				'nav' => array(
					'label' => __('Payment Methods', 'event_espresso'),
					'order' => 10
					),
				'metaboxes' => array( '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
                'help_tabs' => array_merge(
			array(
					'payment_methods_overview_help_tab' => array(
						'title' => __('Payment Methods Overview', 'event_espresso'),
						'filename' => 'payment_methods_overview'
						)),
//					'payment_methods_overview_authorizenet_aim_help_tab' => array(
//						'title' => __('Authorize.net AIM Settings', 'event_espresso'),
//						'filename' => 'payment_methods_overview_authorizenet_aim'
//						),
//					'payment_methods_overview_bank_draft_help_tab' => array(
//						'title' => __('Bank Draft Settings', 'event_espresso'),
//						'filename' => 'payment_methods_overview_bank_draft'
//						),
//					'payment_methods_overview_check_help_tab' => array(
//						'title' => __('Check Settings', 'event_espresso'),
//						'filename' => 'payment_methods_overview_check'
//						),
//					'payment_methods_overview_invoice_help_tab' => array(
//						'title' => __('Invoice Settings', 'event_espresso'),
//						'filename' => 'payment_methods_overview_invoice'
//						),
//					'payment_methods_overview_paypalpro_help_tab' => array(
//						'title' => __('PayPal Pro Settings', 'event_espresso'),
//						'filename' => 'payment_methods_overview_paypalpro'
//						),
//					'payment_methods_overview_paypalstandard_help_tab' => array(
//						'title' => __('PayPal Standard Settings', 'event_espresso'),
//						'filename' => 'payment_methods_overview_paypalstandard'
//						),
//					'payment_methods_overview_mijireh_help_tab' => array(
//						'title' => __("Mijireh Settings", 'event_espresso'),
//						'filename' => 'payment_methods_overview_mijireh'
//						),
					/*'payment_methods_overview_2checkout_help_tab' => array(
						'title' => __('2Checkout Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_2checkout'
						),
					'payment_methods_overview_authorizenet_sim_help_tab' => array(
						'title' => __('Authorize.net SIM Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_authorizenet_sim'
						),
					'payment_methods_overview_eway_help_tab' => array(
						'title' => __('eWay Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_eway'
						),
					'payment_methods_overview_stripe_help_tab' => array(
						'title' => __('Stripe Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_stripe'
						)*/
				$this->_add_payment_method_help_tabs()),
				'help_tour' => array( 'Payment_Methods_Selection_Help_Tour' ),
				'require_nonce' => FALSE
				);
		
		$this->_page_config = array(
			'default' => $payment_method_list_config,
			'payment_settings' => array(
				'nav' => array(
					'label' => __('Settings', 'event_espresso'),
					'order' => 20
					),
				'help_tabs' => array(
					'payment_methods_settings_help_tab' => array(
						'title' => __('Payment Method Settings', 'event_espresso'),
						'filename' => 'payment_methods_settings'
						)
					),
				'help_tour' => array( 'Payment_Methods_Settings_Help_Tour' ),
				'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				'require_nonce' => FALSE
				),
			'payment_log'=>array(
				'nav'=> array(
					'label' => __("Logs", 'event_espresso'),
					'order'=>30,
				),
				'list_table'=>'Payment_Log_Admin_List_Table',
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				'require_nonce'=> FALSE
			)
			);
	}
	protected function _add_payment_method_help_tabs(){
		EE_Registry::instance()->load_lib('Payment_Method_Manager');
		$pmts = EE_Payment_Method_Manager::instance()->payment_method_types();
		$all_pmt_help_tabs_config = array();
		foreach($pmts as $pmt){
			foreach($pmt->help_tabs_config() as $help_tab_name => $config){
				$all_pmt_help_tabs_config[$help_tab_name] = array(
					'title'=>$config['title'],
					'content'=>EEH_Template::display_template($pmt->file_folder().'help_tabs'.DS.$config['filename'].'.help_tab.php', array('admin_page_obj'=>$this), true)
				);
			}
		}
		return $all_pmt_help_tabs_config;
//		return array(
//			'monkeys_tabs'=>array(
//				'content'=>'moenksy',
//				'title'=>'MONKEYS'
//			)
//		);
	}



	//none of the below group are currently used for Gateway Settings
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}





	public function load_scripts_styles() {
		wp_enqueue_script('ee_admin_js');
		wp_enqueue_media();
		wp_enqueue_script('media-upload');
		wp_enqueue_script('ee-payments',EE_GLOBAL_ASSETS_URL.'scripts/ee-media-uploader.js');
	}





	public function load_scripts_styles_default() {
		//styles
		wp_register_style( 'espresso_payments', EE_PAYMENTS_ASSETS_URL . 'ee-payments.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_payments');
		wp_enqueue_style('ee-text-links');
		//scripts
		wp_enqueue_script('ee-text-links');
	}



	protected function _payment_methods_list() {
		EEM_Payment_Method::instance()->verify_button_urls(array(array('PMD_active'=>true)));
		EE_Registry::instance()->load_helper( 'Tabbed_Content' );
		EE_Registry::instance()->load_lib('Payment_Method_Manager');
		//setup tabs, one for each payment method type
		$tabs = array();
		foreach(EE_Payment_Method_Manager::instance()->payment_method_types() as $pmt_obj){
			//we don't want to show admin-only PMTs for now
			if($pmt_obj instanceof EE_PMT_Admin_Only){
				continue;
			}
			//check for any active pms of that type
			$payment_method = EEM_Payment_Method::instance()->get_one_of_type($pmt_obj->system_name());
			if( ! $payment_method ){
				$payment_method = EE_Payment_Method::new_instance(array('PMD_type'=>$pmt_obj->system_name(),'PMD_active'=>false,'PMD_name'=>$pmt_obj->pretty_name(),'PMD_admin_name'=>$pmt_obj->pretty_name(), 'PMD_slug'=>sanitize_key($pmt_obj->system_name())));
			}
			add_meta_box(
						'espresso_' . $payment_method->slug() . '_payment_settings', //html id
					sprintf(__('%s Settings', 'event_espresso'),$payment_method->admin_name()), //title
					array($this, 'payment_method_settings_meta_box'), //callback
					NULL, //post type
					'normal',//context
					'default',//priority
					array(//callback args
						'payment_method'=>$payment_method,
					));
			//setup for tabbed content
			$tabs[$payment_method->slug()] = array(
				'label' => $payment_method->admin_name(),
				'class' =>  $payment_method->active() ? 'gateway-active' : '',
				'href' => 'espresso_' . $payment_method->slug() . '_payment_settings',
				'title' => __('Modify this Payment Method', 'event_espresso'),
				'slug' => $payment_method->slug()
				);
		}
		//decide which payment method tab to open first, as dictated by the request's 'payment_method'
		if( isset($this->_req_data['payment_method']) ){
			//if they provided the current payment method, use it
			$payment_method_slug = sanitize_key($this->_req_data['payment_method']);
			//double-check it exists
			if( ! EEM_Payment_Method::instance()->get_one(array(array('PMD_slug'=>$payment_method_slug)))){
				$payment_method_slug = FALSE;
			}
		}else{
			$payment_method_slug = FALSE;
		}
		//if that didn't work or wasn't provided, find another way to select the currrent pm
		if( ! $payment_method_slug){
			//otherwise, look for an active one
			$an_active_pm = EEM_Payment_Method::instance()->get_one(array(array('PMD_active'=>true)));
			if($an_active_pm){
				$payment_method_slug = $an_active_pm->slug();
			}else{
				$payment_method_slug = 'paypal_standard';
			}
		}

		$this->_template_args['admin_page_header'] = EEH_Tabbed_Content::tab_text_links( $tabs, 'payment_method_links', '|', $payment_method_slug );
		$this->display_admin_page_with_sidebar();

	}
	/**
	 *
	 * @param NULL $post_obj_which_is_null is an object containing the current post (as a $post object)
	 * @param array $metabox is an array with metabox id, title, callback, and args elements.
	 * the value at 'args' has key 'payment_method', as set within _payment_methods_list
	 */
	public function payment_method_settings_meta_box($post_obj_which_is_null,$metabox){
		$payment_method = isset($metabox['args']) && isset($metabox['args']['payment_method']) ? $metabox['args']['payment_method'] : NULL;
		if ( ! $payment_method){
			throw new EE_Error(sprintf(__("Payment method metabox setup incorrectly. No Payment method object was supplied", "event_espresso")));
		}
		$template_args = array(
			'payment_method'=>$payment_method
		);
		//modify the form so we only have/show fields that will be implemented for this version
		$form = $payment_method->type_obj()->settings_form();
		$this->_simplify_form($form);
		if($form->form_data_present_in($this->_req_data)){
			$form->receive_form_submission($this->_req_data);
		}
		//if the payment method really exists show its form, otherwise the activation template
		if( $payment_method->ID() && $payment_method->active()){
			$template_args['edit_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action'=>'update_payment_method', 'payment_method'=>$payment_method->slug()), EE_PAYMENTS_ADMIN_URL);
			$template_args['deactivate_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action'=>'deactivate_payment_method', 'payment_method'=>$payment_method->slug()), EE_PAYMENTS_ADMIN_URL);
			EEH_Template::display_template(EE_PAYMENTS_TEMPLATE_PATH.'payment_method_edit.template.php', $template_args);
		}else{
			$template_args['activate_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action'=>'activate_payment_method', 'payment_method_type'=>$payment_method->type()), EE_PAYMENTS_ADMIN_URL);
			EEH_Template::display_template(EE_PAYMENTS_TEMPLATE_PATH.'payment_method_activate.template.php', $template_args);
		}
	}

	/**
	 * Simplifies the form to merely reproduce 4.1's gateway settings functionality
	 * @param EE_Payment_Method_Form $form_section
	 */
	protected function _simplify_form($form_section){
		//we don't want them to be monkeying with the type or activeness
		$form_section->exclude(array(
			'PMD_type',
			'PMD_active',
			'PMD_order',
			'PMD_slug',
			'PRC_ID',
			'PMD_wp_user_id',
		));

	}

	/**
	 * Activates a payment method of that type. MOstly assuming there is only 1 of that type (or none so far)
	 * @global type $current_user
	 */
	protected function _activate_payment_method(){
		if(isset($this->_req_data['payment_method_type'])){
			$payment_method_type = sanitize_text_field($this->_req_data['payment_method_type']);
			//see if one exists
			$payment_method = EEM_Payment_Method::instance()->get_one_of_type($payment_method_type);
			if( ! $payment_method){
				global $current_user;
				$pm_type_class = EE_Payment_Method_Manager::instance()->payment_method_class_from_type($payment_method_type);
				if(class_exists($pm_type_class)){
					$pm_type_obj = new $pm_type_class;
					$payment_method = EE_Payment_Method::new_instance(array(
						'PMD_type'=>$pm_type_obj->system_name(),
						'PMD_name'=>$pm_type_obj->pretty_name(),
						'PMD_admin_name'=>$pm_type_obj->pretty_name(),
						'PMD_slug'=>$pm_type_obj->system_name(),//automatically converted to slug
						'PMD_wp_user_id'=>$current_user->ID));
					$payment_method->save();
				}
				
			}else{
				$payment_method->set_active(true);
				$payment_method->save();
			}
			$this->_redirect_after_action(1, 'Payment Method', 'activated', array('action' => 'default','payment_method'=>$payment_method->slug()));
		}else{
			$this->_redirect_after_action(FALSE, 'Payment Method', 'activated', array('action' => 'default'));
		}
	}

	/**
	 * Deactivates the payment method with the specified slug, and redirects.
	 */
	protected function _deactivate_payment_method(){
		if(isset($this->_req_data['payment_method'])){
			$payment_method_slug = sanitize_key($this->_req_data['payment_method']);
			//deactivate it
			$count_updated = EEM_Payment_Method::instance()->update(array('PMD_active'=>false),array(array('PMD_slug'=>$payment_method_slug)));
			$this->_redirect_after_action($count_updated, 'Payment Method', 'deactivated', array('action' => 'default','payment_method'=>$payment_method_slug));
		}else{
			$this->_redirect_after_action(FALSE, 'Payment Method', 'deactivated', array('action' => 'default'));
		}
	}

	/**
	 * Processes the payment method form that was submitted. This is slightly trickier than usual form
	 * processing because we first need to identify WHICH form was processed and which paymetn method
	 * it corresponds to. Once we have done that, we see if the form is valid. If it is, the
	 * form's data is saved and we redirect to the default payment methods page, setting the updated payment method
	 * as the currently-selected one. If it DOESN'T validate, we render the page with the form's errors (in the
	 * susbequently called 'headers_sent_func' which is _payment_methods_list)
	 * @return void
	 */
	protected function _update_payment_method(){
		if( $_SERVER['REQUEST_METHOD'] == 'POST'){

			//echo "early processing ran";return;
			//ok let's find which gateway form to use based on the form input
			EE_Registry::instance()->load_lib('Payment_Method_Manager');
			$correct_pmt_form_to_use = NULL;
			foreach(EE_Payment_Method_Manager::instance()->payment_method_types() as $pmt_obj){
				//get the form and simplify it, like what we do when we display it
				$pmt_form = $pmt_obj->settings_form();
				$this->_simplify_form($pmt_form);
				if($pmt_form->form_data_present_in($this->_req_data)){
					$correct_pmt_form_to_use = $pmt_form;
					break;
				}
			}
			//if we couldn't find the correct payment method type...
			if( ! $correct_pmt_form_to_use ){
				EE_Error::add_error(__("We could not find which payment metho type your form submission related to. Please contact support", 'event_espresso'));
				$this->_redirect_after_action(FALSE, 'Payment Method', 'activated', array('action' => 'default'));
			}
			$correct_pmt_form_to_use->receive_form_submission($this->_req_data);
			if($correct_pmt_form_to_use->is_valid()){
				$correct_pmt_form_to_use->save();
				$pm = $correct_pmt_form_to_use->get_model_object();
				$this->_redirect_after_action(FALSE, 'Payment Method', 'activated', array('action' => 'default','payment_method'=>$pm->slug()));
			}
		}
		return;
	}



	protected function _payment_settings() {

		$this->_template_args['values'] = $this->_yes_no_values;
		$this->_template_args['show_pending_payment_options'] = isset( EE_Registry::instance()->CFG->registration->show_pending_payment_options ) ? absint( EE_Registry::instance()->CFG->registration->show_pending_payment_options ) : FALSE;

		$this->_set_add_edit_form_tags( 'update_payment_settings' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( EE_PAYMENTS_TEMPLATE_PATH . 'payment_settings.template.php', $this->_template_args, TRUE );
		$this->display_admin_page_with_sidebar();

	}




	/**
	 * 		_update_payment_settings
	*		@access protected
	*		@return array
	*/
	protected function _update_payment_settings() {
		EE_Registry::instance()->CFG->registration->show_pending_payment_options = isset( $this->_req_data['show_pending_payment_options'] ) ? $this->_req_data['show_pending_payment_options'] : FALSE;
		EE_Registry::instance()->CFG = apply_filters( 'FHEE__Payments_Admin_Page___update_payment_settings__CFG', EE_Registry::instance()->CFG );


		$what = __('Payment Settings','event_espresso');
		$success = $this->_update_espresso_configuration( $what, EE_Registry::instance()->CFG, __FILE__, __FUNCTION__, __LINE__ );
		$this->_redirect_after_action( $success, $what, __('updated','event_espresso'), array( 'action' => 'payment_settings' ) );

	}
	protected function _payment_log_overview_list_table() {
//		$this->_search_btn_label = __('Payment Log', 'event_espresso');
		$this->display_admin_list_table_page_with_sidebar();
	}
	protected function _set_list_table_views_payment_log() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('View All Logs', 'event_espresso'),
				'count' => 0,
				)
		);
	}
	/**
	 * 
	 * @param type $payment_method_id
	 * @param type $transaction_id
	 * @param type $order_asc
	 * @return type
	 */
	public function get_payment_logs($per_page = 50, $current_page = 0, $count = false){
		if( ! isset($this->_req_data['_payment_method']) || $this->_req_data['_payment_method'] == ''){
				$payment_method_id = NULL;
			}else{
				$payment_method_id = $this->_req_data['_payment_method'];
			}
		if($count){
			return EEM_Payment_Log::instance()->count($payment_method_id);
		}else{
			if(isset($this->_req_data['orderby']) && isset($this->_req_data['order']) && $this->_req_data['order'] == 'asc'){
				$order_asc = true;
			}else{
				$order_asc = false;
			}
			
			
			return EEM_Payment_Log::instance()->get_all_payment_logs($payment_method_id, NULL, $order_asc,$per_page,$current_page*$per_page);
		}
	}
	
	protected function _payment_log_details() {
		$payment_log = EEM_Payment_Log::instance()->get_one_by_ID($this->_req_data['ID']);
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( EE_PAYMENTS_TEMPLATE_PATH . 'payment_log_details.template.php', array('payment_log'=>$payment_log), TRUE );
		$this->display_admin_page_with_sidebar();

	}


} //end Payments_Admin_Page class
