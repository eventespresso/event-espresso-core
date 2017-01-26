<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit('NO direct script access allowed'); }

/**
 * ----------------------------------------------
 *
 * Class  EE_PMT_Paypal_Express
 *
 * @package			Event Espresso
 * @subpackage		eea-paypal-express
 * @author			Event Espresso
 * @version		 	$VID:$
 *
 * ----------------------------------------------
 */
class EE_PMT_Paypal_Express extends EE_PMT_Base {

	/**
     * Class constructor.
     */
	public function __construct( $pm_instance = NULL ) {
		require_once( $this->file_folder() . 'EEG_Paypal_Express.gateway.php' );
		$this->_gateway = new EEG_Paypal_Express();

		$this->_pretty_name = __( 'PayPal Express', 'event_espresso' );
		$this->_template_path = $this->file_folder() . 'templates' . DS;
		$this->_default_description = __( 'After clicking \'Finalize Registration\', you will be forwarded to PayPal website to Login and make your payment.', 'event_espresso' );
		$this->_default_button_url = $this->file_url() . 'lib' . DS . 'paypal-express-checkout-logo.png';

		parent::__construct( $pm_instance );
	}


	/**
	 * Adds the help tab.
	 *
	 * @see EE_PMT_Base::help_tabs_config()
	 * @return array
	 */
	public function help_tabs_config() {
		return array(
			$this->get_help_tab_name() => array(
				'title' => __('PayPal Express Settings', 'event_espresso'),
				'filename' => 'payment_methods_overview_paypal_express'
			)
		);
	}


	/**
	 * Gets the form for all the settings related to this payment method type.
	 *
	 * @return EE_Payment_Method_Form
	 */
	public function generate_new_settings_form() {
		EE_Registry::instance()->load_helper('Template');
		$form = new EE_Payment_Method_Form(
			array(
				'extra_meta_inputs' => array(
					'api_username' => new EE_Text_Input(
						array(
							'html_label_text'=> sprintf( __( 'API Username %s', 'event_espresso' ), $this->get_help_tab_link() ),
							'required' => true,
						)
					),
					'api_password' => new EE_Text_Input(
						array(
							'html_label_text' => sprintf( __( 'API Password %s', 'event_espresso' ), $this->get_help_tab_link() ),
							'required' => true
						)
					),
					'api_signature' => new EE_Text_Input(
						array(
							'html_label_text' => sprintf( __( 'API Signature %s', 'event_espresso' ), $this->get_help_tab_link() ),
							'required' => true
						)
					),
					'request_shipping_addr' => new EE_Yes_No_Input(
						array(
							'html_label_text' => sprintf( __( 'Request Shipping Address %s', 'event_espresso' ), $this->get_help_tab_link() ),
							'html_help_text'  => __( 'If set to "Yes", then a shipping address will be requested on the PayPal checkout page.', 'event_espresso' ),
							'required' => true,
							'default' => false,
						)
					),
					'image_url' => new EE_Admin_File_Uploader_Input(
						array(
							'html_label_text' => sprintf( __( 'Image URL %s', 'event_espresso' ), $this->get_help_tab_link() ),
							'html_help_text' => __( 'Used for your business/personal logo on the PayPal page', 'event_espresso' ),
							'required' => false
						)
					),
				)
			)
		);
		return $form;
	}


	/**
	 *	Creates a billing form for this payment method type.
	 *
	 *	@param \EE_Transaction $transaction
	 *	@return \EE_Billing_Info_Form
	 */
	public function generate_new_billing_form( EE_Transaction $transaction = null ) {
		if ( $this->_pm_instance->debug_mode() ) {
			$form = new EE_Billing_Info_Form(
				$this->_pm_instance,
				array(
					'name' => 'paypal_express_Info_Form',
					'subsections' => array(
						'paypal_express_debug_info' => new EE_Form_Section_Proper(
							array(
								'layout_strategy' => new EE_Template_Layout(
									array(
										'layout_template_file' => $this->_template_path . 'paypal_express_debug_info.template.php',
										'template_args' => array( 'debug_mode' => $this->_pm_instance->debug_mode() )
									)
								)
							)
						)
					)
				)
			);
			return $form;
		}
		
		return false;
	}
}

// End of file EE_PMT_Paypal_Express.pm.php