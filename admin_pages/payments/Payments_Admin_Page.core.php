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
			'default' => '_gateway_settings',
			'payment_settings' => '_payment_settings',
			'activate_payment_method'=>array(
				'func'=>'_activate_payment_method',
				'noheader'=>TRUE
				),
			'deactivate_payment_method'=>array(
				'func'=>'_deactivate_payment_method',
				'noheader'=>TRUE
				),
			'update_payment_settings' => array(
				'func'=>'_update_payment_settings',
				'noheader'=>TRUE
				),
			);
	}



	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Payment Methods', 'event_espresso'),
					'order' => 10
					),
				'metaboxes' => array( '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
                'help_tabs' => array(
					'payment_methods_overview_help_tab' => array(
						'title' => __('Payment Methods Overview', 'event_espresso'),
						'filename' => 'payment_methods_overview'
						),
					'payment_methods_overview_authorizenet_aim_help_tab' => array(
						'title' => __('Authorize.net AIM Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_authorizenet_aim'
						),
					'payment_methods_overview_bank_draft_help_tab' => array(
						'title' => __('Bank Draft Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_bank_draft'
						),
					'payment_methods_overview_check_help_tab' => array(
						'title' => __('Check Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_check'
						),
					'payment_methods_overview_invoice_help_tab' => array(
						'title' => __('Invoice Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_invoice'
						),
					'payment_methods_overview_paypalpro_help_tab' => array(
						'title' => __('PayPal Pro Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_paypalpro'
						),
					'payment_methods_overview_paypalstandard_help_tab' => array(
						'title' => __('PayPal Standard Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_paypalstandard'
						),
					'payment_methods_overview_mijireh_help_tab' => array(
						'title' => __("Mijireh Settings", 'event_espresso'),
						'filename' => 'payment_methods_overview_mijireh'
						),
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
					),
				'help_tour' => array( 'Payment_Methods_Selection_Help_Tour' ),
				'require_nonce' => FALSE
				),
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
				)
			);
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




	/**
	 * returns the help tab array for all the gateway settings
	 * @return array an array of help tabs for the gateways.
	 */
	protected function _get_gateway_help_tabs() {
		$help_tabs = array();
		if ( ! defined( 'ESPRESSO_GATEWAYS' )) {
			require_once(EE_MODELS . 'EEM_Gateways.model.php');
		}

		$gateway_instances = EEM_Gateways::instance()->get_gateway_instances();
		$payment_settings = EE_Registry::instance()->CFG->gateway->payment_settings;//get_user_meta( $current_user->ID, 'payment_settings', TRUE );
		

	
		foreach ( $payment_settings as $gateway => $settings ) {
			$ht_content = isset( $gateway_instances[$gateway] ) ? $gateway_instances[$gateway]->get_help_tab_content() : FALSE;
			if ( $ht_content ) {
				$ht_ref = 'ee_' . $gateway . '_help';
				$help_tabs[$ht_ref] = array(
					'title' => $settings['display_name'] . __(' Help', 'event_espresso'),
					'content' => $ht_content
					);					
			}
		}

		return $help_tabs;
	}




	protected function _gateway_settings() {		
		EE_Registry::instance()->load_helper( 'Tabbed_Content' );		
		EE_Registry::instance()->load_lib('Payment_Method_Manager');
		//setup tabs, one for each payment method type
		$tabs = array();
		foreach(EE_Payment_Method_Manager::instance()->payment_method_types() as $pmt_name){
			//check for any active pms of that type
			$payment_method = EEM_Payment_Method::instance()->get_one_of_type($pmt_name);
			if( ! $payment_method ){
				$payment_method = EE_Payment_Method::new_instance(array('PMD_type'=>$pmt_name,'PMD_active'=>false,'PMD_name'=>str_replace("_"," ",$pmt_name),'PMD_slug'=>sanitize_key($pmt_name)));
			}			
			add_meta_box(
						'espresso_' . $pmt_name . '_payment_settings', //html id
					sprintf(__('%s Settings', 'event_espresso'),$payment_method->name()), //title
					array($this, 'payment_method_settings_meta_box'), //callback
					NULL, //post type
					'normal',//context
					'default',//priority
					array(//callback args
						'payment_method'=>$payment_method,
					));
			//setup for tabbed content
			$tabs[$pmt_name] = array(
				'label' => $payment_method->name(),
				'class' =>  $payment_method->active() ? 'gateway-active' : '',
				'href' => 'espresso_' . $pmt_name . '_payment_settings',
				'title' => __('Modify this Gateway', 'event_espresso'),
				'slug' => $payment_method->slug()
				);
		}
		//decide which payment method tab to open first, as dictated by the request's 'current_pm'
		if( isset($this->_req_data['current_pm']) ){
			//if they provided the current payment method, use it
			$current_pm_slug = sanitize_key($this->_req_data['current_pm']);
			//double-check it exists
			if( ! EEM_Payment_Method::instance()->get_one(array(array('PMD_slug'=>$current_pm_slug)))){
				$current_pm_slug = FALSE;
			}
		}else{
			$current_pm_slug = FALSE;
		}
		//if that didn't work or wasn't provided, find another way to select the currrent pm
		if( ! $current_pm_slug){
			//otherwise, look for an active one
			$an_active_pm = EEM_Payment_Method::instance()->get_one(array(array('PMD_active'=>true)));
			if($an_active_pm){
				$current_pm_slug = $an_active_pm->slug();
			}else{
				$current_pm_slug = 'paypal_standard';
			}
		}
		
		$this->_template_args['admin_page_header'] = EEH_Tabbed_Content::tab_text_links( $tabs, 'payment_method_links', '|', $current_pm_slug );
		$this->display_admin_page_with_sidebar();

	}
	/**
	 * 
	 * @param NULL $post_obj_which_is_null is an object containing the current post (as a $post object)
	 * @param array $metabox is an array with metabox id, title, callback, and args elements. 
	 * the value at 'args' has key 'payment_method', as set within _gateway_settings
	 */
	public function payment_method_settings_meta_box($post_obj_which_is_null,$metabox){
		$payment_method = isset($metabox['args']) && isset($metabox['args']['payment_method']) ? $metabox['args']['payment_method'] : NULL;
		if ( ! $payment_method){
			throw new EE_Error(sprintf(__("Payment method metabox setup incorrectly. No Payment method object was supplied", "event_espresso")));
		}
		$template_args = array(
			'payment_method'=>$payment_method
		);
		//if the payment method really exists show its form, otherwise the activation template
		if( $payment_method->ID() && $payment_method->active()){
			$template_args['edit_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action'=>'edit_payment_method', 'payment_method'=>$payment_method->slug()), EE_PAYMENTS_ADMIN_URL);
			$template_args['deactivate_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action'=>'deactivate_payment_method', 'payment_method'=>$payment_method->slug()), EE_PAYMENTS_ADMIN_URL);
			EEH_Template::display_template(EE_PAYMENTS_TEMPLATE_PATH.'payment_method_edit.template.php', $template_args);
		}else{
			$template_args['activate_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action'=>'activate_payment_method', 'payment_method_type'=>$payment_method->type()), EE_PAYMENTS_ADMIN_URL);
			EEH_Template::display_template(EE_PAYMENTS_TEMPLATE_PATH.'payment_method_activate.template.php', $template_args);
		}
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
				$payment_method = EE_Payment_Method::new_instance(array(
					'PMD_type'=>$payment_method_type,
					'PMD_name'=>$payment_method_type,
					'PMD_slug'=>$payment_method_type,
					'PMD_wp_user_id'=>$current_user->ID));
				$payment_method->save();
			}else{
				$payment_method->set_active(true);
				$payment_method->save();
			}
			$this->_redirect_after_action(1, 'Payment Method', 'activated', array('action' => 'default','current_pm'=>$payment_method->slug()));
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
			$this->_redirect_after_action($count_updated, 'Payment Method', 'deactivated', array('action' => 'default','current_pm'=>$payment_method_slug));
		}else{
			$this->_redirect_after_action(FALSE, 'Payment Method', 'deactivated', array('action' => 'default'));
		}
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


} //end Payments_Admin_Page class