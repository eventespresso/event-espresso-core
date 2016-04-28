<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * Class EE_PMT_Paypal_Standard
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				$VID:$
 *
 */
class EE_PMT_Paypal_Standard extends EE_PMT_Base{

	const shipping_info_none = 1;
	const shipping_info_optional = 0;
	const shipping_info_required = 2;



	/**
	 * @param null $pm_instance
	 * @return \EE_PMT_Paypal_Standard
	 * @throws \EE_Error
	 */
	public function __construct($pm_instance = NULL) {
		require_once($this->file_folder().'EEG_Paypal_Standard.gateway.php');
		$this->_gateway = new EEG_Paypal_Standard();
		$this->_pretty_name = __("PayPal Standard", 'event_espresso');
		$this->_default_description = sprintf(
			__(
				'Upon submitting this form, you will be forwarded to PayPal to make your payment. %1$sMake sure you return to this site in order to properly finalize your registration.%2$s',
				'event_espresso'
			),
			'<strong>',
			'</strong>'
		);
		parent::__construct($pm_instance);
		$this->_default_button_url = $this->file_url().'lib'.DS.'paypal-logo.png';
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
	 *
	 * @return EE_Payment_Method_Form
	 * @throws \EE_Error
	 */
	public function generate_new_settings_form() {
		require_once( $this->file_folder() . 'EE_Paypal_Standard_Form.form.php' );
		$form =  new EE_Paypal_Standard_Form( $this );
		$form->get_input( 'PMD_debug_mode' )->set_html_label_text(
			sprintf( __( "Use PayPal Sandbox %s", 'event_espresso' ), $this->get_help_tab_link() )
		);
		$form->get_input( 'shipping_details' )->set_html_label_text(
			sprintf( __( "Shipping Address Options %s", "event_espresso" ), $this->get_help_tab_link() )
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
				'title'=>  __("PayPal Standard Settings", 'event_espresso'),
				'filename'=>'payment_methods_overview_paypalstandard'
			)
		);
	}



	/**
	 * Logic to be accomplished when the payment attempt is complete.
	 * Most payment methods don't need to do anything at this point; but some, like Mijireh, do.
	 * (Mijireh is an offsite gateway which doesn't send an IPN. So when the user returns to EE from
	 * mijireh, this method needs to be called so the Mijireh PM can ping Mijireh to know the status
	 * of the payment). Fed a transaction because it's always assumed to be the last payment that
	 *
	 * @param EE_Transaction $transaction
	 * @return EE_Payment
	 * @throws \EE_Error
	 */
	public function finalize_payment_for($transaction){
		// PayPal standard actually sends the IPN info along with the user when they return to our site
		// so in case the IPN is arriving later, let's try to process an IPN!
		if( $_SERVER['REQUEST_METHOD'] === 'POST' ){
			return $this->handle_ipn($_POST, $transaction );
		}else{
			return parent::finalize_payment_for( $transaction );
		}
	}



}
