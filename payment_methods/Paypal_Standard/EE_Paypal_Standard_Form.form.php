<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Paypal_Standard_Form
 * Override's normal EE_Payment_Method_Form to force shipping details to be set to require info
 * whenever the admin selects paypal to calculate shipping or taxes
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Paypal_Standard_Form extends EE_Payment_Method_Form {
	protected function _normalize( $req_data ) {
		parent::_normalize( $req_data );
	}

	/**
	 *
	 * @param EE_PMT_Paypal_Standard $payment_method_type
	 */
	public function __construct( $payment_method_type ){
		$options_array = array(
			'payment_method_type' => $payment_method_type,
			'extra_meta_inputs'=>array(
				'paypal_id'=>new EE_Text_Input(array(
					'html_label_text'=>  sprintf(__("Paypal Email %s", 'event_espresso'), $payment_method_type->get_help_tab_link()),
					'html_help_text'=>  __("Typically payment@example-domain.com", 'event_espresso'),
					'required' => true
				)),
				'image_url'=>new EE_Admin_File_Uploader_Input(array(
					'html_help_text'=>  __("Used for your business/personal logo on the PayPal page", 'event_espresso'),
					'html_label_text' => __( 'Image URL', 'event_espresso' )
				)),
				'shipping_details'=>new EE_Select_Input(array(
					EE_PMT_Paypal_Standard::shipping_info_none => __("Do not prompt for an address", 'event_espresso'),
					EE_PMT_Paypal_Standard::shipping_info_optional => __("Prompt for an address, but do not require it", 'event_espresso'),
					EE_PMT_Paypal_Standard::shipping_info_required => __("Prompt for an address, and require it", 'event_espresso')
				)),
				),
			'before_form_content_template'=>$payment_method_type->file_folder().DS.'templates'.DS.'paypal_standard_settings_before_form.template.php',
			);

		parent::__construct( $options_array );
	}
}

// End of file EE_Paypal_Standard_Form.php