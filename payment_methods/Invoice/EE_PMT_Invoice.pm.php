<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EE_PMT_Invoice
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_PMT_Invoice extends EE_PMT_Base{



	/**
	 *
	 * @param EE_Payment_Method $pm_instance
	 * @return EE_PMT_Invoice
	 */
	public function __construct($pm_instance = NULL) {
		$this->_pretty_name = __("Invoice", 'event_espresso');
		$this->_default_description = sprintf(
			__( 'After clicking "Finalize Registration", you will be given instructions on how to access your invoice and complete your payment.%1$sPlease note that event spaces will not be reserved until payment is received in full, and any remaining tickets could be sold to others in the meantime.%2$s%3$s', 'event_espresso' ),
			'<br />',
			'<span class="important-notice">',
			'</span>'
		);
		parent::__construct($pm_instance);
		$this->_default_button_url = $this->file_url().'lib'.DS.'invoice-logo.png';
	}



	/**
	 * Creates the billing form for this payment method type
	 * @param \EE_Transaction $transaction
	 * @return NULL
	 */
	public function generate_new_billing_form( EE_Transaction $transaction = NULL ) {
		return NULL;
	}



	/**
	 * Gets the form for all the settings related to this payment method type
	 * @return EE_Payment_Method_Form
	 */
	public function generate_new_settings_form() {
		$pdf_payee_input_name = 'pdf_payee_name';
		$confirmation_text_input_name = 'page_confirmation_text';
		$form =  new EE_Payment_Method_Form(array(
//				'payment_method_type' => $this,
				'extra_meta_inputs'=>array(
					$pdf_payee_input_name => new EE_Text_Input(array(
						'html_label_text' => sprintf( __( 'Payee Name %s', 'event_espresso' ), $this->get_help_tab_link())
					)),
					'pdf_payee_email' => new EE_Email_Input(array(
						'html_label_text' => sprintf( __( 'Payee Email %s', 'event_espresso' ), $this->get_help_tab_link()),
					)),
					'pdf_payee_tax_number' => new EE_Text_Input(array(
						'html_label_text' => sprintf( __( 'Payee Tax Number %s', 'event_espresso' ), $this->get_help_tab_link()),
						)),
					'pdf_payee_address' => new EE_Text_Area_Input( array(
						'html_label_text' => sprintf( __( 'Payee Address %s', 'event_espresso' ), $this->get_help_tab_link() ),
						'validation_strategies' => array( new EE_Full_HTML_Validation_Strategy() ),
					)),
					'pdf_instructions'=>new EE_Text_Area_Input(array(
						'html_label_text'=>  sprintf(__("Instructions %s", "event_espresso"),  $this->get_help_tab_link()),
						'default'=>  __("Please send this invoice with payment attached to the address above, or use the payment link below. Payment must be received within 48 hours of event date.", 'event_espresso'),
						'validation_strategies' => array( new EE_Full_HTML_Validation_Strategy() ),
					)),
					'pdf_logo_image'=>new EE_Admin_File_Uploader_Input(array(
						'html_label_text'=>  sprintf(__("Logo Image %s", "event_espresso"),  $this->get_help_tab_link()),
						'default'=>  EE_Config::instance()->organization->logo_url,
						'html_help_text'=>  __("(Logo for the top left of the invoice)", 'event_espresso'),
					)),
					$confirmation_text_input_name =>new EE_Text_Area_Input(array(
						'html_label_text'=>  sprintf(__("Confirmation Text %s", "event_espresso"),  $this->get_help_tab_link()),
						'default'=>  __("Payment must be received within 48 hours of event date.  Details about where to send payment is included on the invoice.", 'event_espresso'),
						'validation_strategies' => array( new EE_Full_HTML_Validation_Strategy() ),
					)),
					'page_extra_info'=>new EE_Text_Area_Input(array(
						'html_label_text'=>  sprintf(__("Extra Info %s", "event_espresso"),  $this->get_help_tab_link()),
						'validation_strategies' => array( new EE_Full_HTML_Validation_Strategy() ),
					)),
				),
				'include'=>array(
					'PMD_ID', 'PMD_name','PMD_desc','PMD_admin_name','PMD_admin_desc', 'PMD_type','PMD_slug', 'PMD_open_by_default','PMD_button_url','PMD_scope','Currency','PMD_order',
					$pdf_payee_input_name, 'pdf_payee_email', 'pdf_payee_tax_number', 'pdf_payee_address', 'pdf_instructions','pdf_logo_image',
					$confirmation_text_input_name, 'page_extra_info'),
			));
		$form->add_subsections(
			array( 'header1' => new EE_Form_Section_HTML_From_Template( 'payment_methods/Invoice/templates/invoice_settings_header_display.template.php' )),
			$pdf_payee_input_name
		);
		$form->add_subsections(
			array( 'header2'=>new EE_Form_Section_HTML_From_Template( 'payment_methods/Invoice/templates/invoice_settings_header_gateway.template.php' )),
			$confirmation_text_input_name
		);
		return $form;
	}



	/**
	 * Adds the help tab
	 * @see EE_PMT_Base::help_tabs_config()
	 * @return array
	 */
	public function help_tabs_config(){
		return array(
			$this->get_help_tab_name() => array(
				'title' => __('Invoice Settings', 'event_espresso'),
				'filename' => 'payment_methods_overview_invoice'
			),
		);
	}


	/**
	 * For adding any html output above the payment overview.
	 * Many gateways won't want ot display anything, so this function just returns an empty string.
	 * Other gateways may want to override this, such as offline gateways.
	 *
	 * @param \EE_Payment $payment
	 * @return string
	 */
	public function payment_overview_content( EE_Payment $payment ){
		return EEH_Template::locate_template(
			'payment_methods' . DS . 'Invoice'. DS . 'templates'.DS.'invoice_payment_details_content.template.php',
			array_merge(
				array(
					'payment_method'			=> $this->_pm_instance,
					'payment'						=> $payment,
					'page_confirmation_text'					=> '',
					'page_extra_info'	=> '',
					'invoice_url' 					=> $payment->transaction()->primary_registration()->invoice_url( 'html' )
				),
				$this->_pm_instance->all_extra_meta_array()
			)
		);
	}



}
// End of file EE_PMT_Invoice.pm.php
