<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * EE_Billing_Info_Form
 * Default form which can be used by payment method types for their billing info.
 * Has no default fields. Consider using EE_Billing_Attendee_Info_Form instead
 * if the billing info has billee name and address info.
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Billing_Info_Form extends EE_Form_Section_Proper{

	/**
	 * The payment method this billing form is for
	 * @var EE_Payment_Method
	 */
	protected $_pm_instance;



	/**
	 *
	 * @param EE_Payment_Method $payment_method
	 * @param array $options_array @see EE_Form_Section_Proper::__construct()
	 */
	public function __construct( EE_Payment_Method $payment_method, $options_array= array()){
		$this->_pm_instance = $payment_method;
		$this->_layout_strategy = new EE_Div_Per_Section_Layout();
		parent::__construct( $options_array );

	}



	/**
	 * Sets the payment method for this billing form
	 * @param EE_Payment_Method $payment_method
	 * @return void
	 */
	public function set_payment_method( EE_Payment_Method $payment_method ){
		$this->_pm_instance = $payment_method;
	}



	/**
	 * Returns the instance of the payment method this billing form is for
	 * @return EE_Payment_Method
	 */
	public function payment_method(){
		return $this->_pm_instance;
	}



	/**
	 * payment_fields_autofilled_notice_html
	 * @return string
	 */
	public function payment_fields_autofilled_notice_html(){
		return  new EE_Form_Section_HTML(
			EEH_HTML::p(
				apply_filters( 'FHEE__EE_Billing_Info_Form__payment_fields_autofilled_notice_html_text', __( 'Payment fields have been autofilled because you are in debug mode', 'event_espresso' )),
				'',
				'important-notice'
			)
		);
	}



	/**
	 * @return string
	 */
	public function html_class(){
		return ! empty( $this->_html_class ) ? $this->_html_class . ' ee-billing-form' : 'ee-billing-form';
	}



}
// End of file EE_Billing_Info_Form.form.php