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
			'update_payment_settings' => array(
				'func'=>'_update_payment_settings',
				'noheader'=>TRUE)
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
		wp_enqueue_script('ee-payments',EE_PAYMENTS_ASSETS_URL.'/ee-payments.js');
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

		require_once(EE_MODELS . 'EEM_Gateways.model.php');
		$EEM_Gateways = EEM_Gateways::instance();
		
		EE_Registry::instance()->load_helper( 'Tabbed_Content' );
		
		$gateway_instances = $EEM_Gateways->get_gateway_instances();
		$payment_settings = EE_Registry::instance()->CFG->gateway->payment_settings;//get_user_meta($current_user->ID, 'payment_settings', true);
		//lets add all the metaboxes
		foreach( $gateway_instances as $gate_obj ) {
			$gate_obj->add_settings_page_meta_box();
		}
		
		
		//printr( $gateway_data, '$gateway_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$selected_gateway_name = null;
		$gateways = array();
		//let's assemble the array for the _tab_text_links helper
		foreach ( $payment_settings as $gateway => $settings ) {

			if(	isset($this->_req_data['activate_' . $gateway]) ||
				isset($this->_req_data['deactivate_' . $gateway]) ||
				isset($this->_req_data['update_' . $gateway])){
				$selected_gateway_name =  $gateway;
			}

			// now add or remove gateways from list
			if ( isset( $this->_req_data['activate_' . $gateway] )) {
				//bandaid to fix bug where gateways wouldn't appear active on firsrt pag eload after activating them
				$EEM_Gateways->set_active($gateway);
			}
			if ( isset( $this->_req_data['deactivate_' . $gateway] )) {
				//bandaid to fix bug where gateways wouldn't appear active on firsrt pag eload after activating them
				$EEM_Gateways->unset_active($gateway);
			}		

			$gateways[$gateway] = array(
				'label' => isset($settings['display_name']) ? $settings['display_name'] : ucwords( str_replace( '_', ' ', $gateway ) ),
				'class' => isset(EE_Registry::instance()->CFG->gateway->active_gateways[$gateway])  ? 'gateway-active' : '',
				'href' => 'espresso_' . str_replace(' ', '_', $gateway) . '_payment_settings',
				'title' => __('Modify this Gateway', 'event_espresso'),
				'slug' => $gateway
				);
			
			
		}
		
		if ( ! $selected_gateway_name ) {
//			$default = !empty( $gateway_data['active_gateways'] ) ? key($gateway_data['active_gateways']) : 'Paypal_Standard';
			$selected_gateway_name = !empty( $gateways ) ? key($gateways) : 'Paypal_Standard';
		}

		//$gateways = isset( $gateways ) ? $gateways : array();
		//printr( $gateways, '$gateways  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
		$this->_template_args['admin_page_header'] = EEH_Tabbed_Content::tab_text_links( $gateways, 'gateway_links', '|', $selected_gateway_name );
		$this->display_admin_page_with_sidebar();

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