<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class EE_PMT_Paypal_Standard extends EE_PMT_Base{
	const shipping_info_none = 'none';
	const shipping_info_optional = 'optional';
	const shipping_info_required = 'required';
	public function __construct($pm_instance = NULL) {
		require_once($this->file_folder().'EEG_Paypal_Standard.gateway.php');
		$this->_gateway = new EEG_Paypal_Standard();
		parent::__construct($pm_instance);
		
	}
	public function generate_new_billing_form() {
		return NULL;
	}
	public function generate_new_settings_form() {
		return new EE_Payment_Method_Form(array(
			'name'=>'Paypal_Standard_Form',
			'extra_meta_inputs'=>array(
				'paypal_id'=>new EE_Text_Input(),
				'no_shipping'=>new EE_Yes_No_Input(),
				'image_url'=>new EE_Admin_File_Uploader_Input(),
				'shipping_details'=>new EE_Select_Input(array(
					EE_PMT_Paypal_Standard::shipping_info_none => __("Do not prompt for an address", 'event_espresso'),
					EE_PMT_Paypal_Standard::shipping_info_optional => __("Prompt for an address, but do not require it", 'event_espresso'),
					EE_PMT_Paypal_Standard::shipping_info_required => __("Prompt for an address, and require it", 'event_espresso')
				)),
				
				)
			)
		);
	}
	/**
	 * Adds the help tab
	 * @see EE_PMT_Base::help_tabs_config()
	 * @return array 
	 */
	public function help_tabs_config(){
		return array(
			'payment_methods_overview_paypalstandard_help_tab'=>array(
				'title'=>  __("Paypal Standard Settings", 'event_espresso'),
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
	 * @return void
	 */
	public function finalize_payment_for($transaction){
		//paypal standard actually sends teh IPN info along with the user
		//when they return to our site
		//so in case teh IPN is arriving later, let's try to process an IPN!
		if($_SERVER['REQUEST_METHOD'] == 'POST'){
			EE_Registry::instance()->load_core('Payment_Processor')->process_ipn($_REQUEST,$transaction,$this->_pm_instance);
		}
	}
}//NOTIFY URL: http://eventespresso.com/sandbox/dev1/transactions/?e_reg_url_link=1-07eae3d1b8e76de4b3bd9181a69408b5&ee_payment_method=paypal_standard