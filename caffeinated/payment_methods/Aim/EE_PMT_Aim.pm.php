<?php

if (!defined('EVENT_ESPRESSO_VERSION')){
	exit('No direct script access allowed');
}
/**
 *
 * EE_PMT_Aim
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_PMT_Aim extends EE_PMT_Base{


	/**
	 * @param EE_Payment_Method $pm_instance
	 * @return EE_PMT_Aim
	 * @throws \EE_Error
	 */
	public function __construct($pm_instance = NULL) {
		$this->_setup_properties();
		parent::__construct($pm_instance);
        $this->_gateway->set_unsupported_character_remover(new \EventEspresso\core\services\formatters\Windows1252());
	}
	
	/**
	 * Sets up payment method type properties for this gateway, which is normally
	 * done in the constructor, but we want this to be easy for similar gateways to override
	 * while still calling the parent constructor.
	 * So children should override this method instead of __construct
	 */
	protected function _setup_properties() {
		require_once($this->file_folder().'EEG_Aim.gateway.php');
		$this->_gateway = new EEG_Aim();
		$this->_pretty_name = __("Authorize.net AIM", 'event_espresso');
		$this->_default_description = __( 'Please provide the following billing information.', 'event_espresso' );
		$this->_requires_https = true;
	}



	/**
	 * Creates the billing form for this payment method type
	 *
	 * @param \EE_Transaction $transaction
	 * @return EE_Billing_Info_Form
	 * @throws \EE_Error
	 */
	public function generate_new_billing_form( EE_Transaction $transaction = NULL ) {
		$billing_form = new EE_Billing_Attendee_Info_Form($this->_pm_instance,array(
			'name'=>'AIM_Form',
			'subsections'=>array(
				'credit_card'=>new EE_Credit_Card_Input(array(
					'required'=>true,
					'html_label_text' => __( 'Card Number', 'event_espresso' )
				)),
				'exp_month'=>new EE_Credit_Card_Month_Input(true, array(
					'required'=>true,
					'html_label_text' => __( 'Expiry Month', 'event_espresso' )
				)),
				'exp_year'=>new EE_Credit_Card_Year_Input( array( 
					'required'=>true,
					'html_label_text' => __( 'Expiry Year', 'event_espresso' ) 
				)),
				'cvv'=>new EE_CVV_Input( array(
					'required'=>true,
					'html_label_text' => __( 'CVV', 'event_espresso' ) ) ),
			)
		));
		$billing_form->add_subsections( array(
			'company' => new EE_Text_Input( array(
				'html_label_text' => __('Company', 'event_espresso')
			))
		), 'email', false );
		$billing_form->add_subsections( 
				array(
					'fax' => new EE_Text_Input( array(
						'html_label_text' => __('Fax', 'event_espresso')
					))
				), 
				'phone', 
				false );
		$settings_form = $this->settings_form();
		if( $settings_form->get_input( 'excluded_billing_inputs' ) instanceof EE_Checkbox_Multi_Input ) {
				$billing_form->exclude( $settings_form->get_input( 'excluded_billing_inputs' )->normalized_value() );
		}
		if( $settings_form->get_input( 'required_billing_inputs' ) instanceof EE_Checkbox_Multi_Input ) {
			$required_inputs = $settings_form->get_input( 'required_billing_inputs' )->normalized_value();
			//only change the requirement of inputs which are allowed to be changed
			/** @var EE_Form_Input_Base[] $inputs_to_evaluate */
			$inputs_to_evaluate = array_intersect_key( 
				$billing_form->inputs(), 
				$this->billing_input_names()
			);
			foreach( $inputs_to_evaluate as $input_name => $input ) {
				if( in_array( $input_name, $required_inputs ) ) {
					$input->set_required( true );
				} else {
					$input->set_required( false );
				}
			}
		}
		return $this->apply_billing_form_debug_settings( $billing_form );
	}



	/**
	 * apply_billing_form_debug_settings
	 * applies debug data to the form
	 *
	 * @param \EE_Billing_Info_Form $billing_form
	 * @return \EE_Billing_Info_Form
	 * @throws \EE_Error
	 */
	public function apply_billing_form_debug_settings( EE_Billing_Info_Form $billing_form ) {
		if (
			$this->_pm_instance->debug_mode() 
			|| $this->_pm_instance->get_extra_meta( 'test_transactions', TRUE, FALSE )
		) {
			$billing_form->get_input( 'credit_card' )->set_default( '4007000000027' );
			$billing_form->get_input( 'exp_year' )->set_default( '2020' );
			if( $billing_form->get_subsection( 'cvv' ) instanceof EE_Form_Input_Base ) {
				$billing_form->get_input( 'cvv' )->set_default( '123' );
			}
			$billing_form->add_subsections(
				array( 'fyi_about_autofill' => $billing_form->payment_fields_autofilled_notice_html() ),
				'credit_card'
			);
			$billing_form->add_subsections(
				array(
					'debug_content' => new EE_Form_Section_HTML_From_Template(
						__DIR__.DS.'templates'.DS.'authorize_net_aim_debug_info.template.php' 
					)
				),
				'first_name'
			);
		}
		return $billing_form;
	}



	/**
	 * Gets the form for all the settings related to this payment method type
	 * @return EE_Payment_Method_Form
	 */
	public function generate_new_settings_form() {
		$billing_input_names = $this->billing_input_names();
		return new EE_Payment_Method_Form(
			array(
				'extra_meta_inputs'=>array(
					'login_id'=>new EE_Text_Input(
						array(
							'html_label_text'=>  sprintf( __("Authorize.net API Login ID %s", "event_espresso"),  $this->get_help_tab_link() ),
							'required' => true )
					),
					'transaction_key'=>new EE_Text_Input(
						array(
							'html_label_text'=> sprintf( __("Authorize.net Transaction Key %s", "event_espresso"), $this->get_help_tab_link() ),
							'required' => true )
					),
					'test_transactions'=>new EE_Yes_No_Input(
						array(
							'html_label_text'=>  sprintf( __("Send test transactions? %s", 'event_espresso'),  $this->get_help_tab_link() ),
							'html_help_text'=>  __("Send test transactions, even to live server", 'event_espresso'),
							'default' => false,
							'required' => true
						)
					),
					'excluded_billing_inputs' => new EE_Checkbox_Multi_Input( 
							$billing_input_names,
					array( 
						'html_label_text' => sprintf( __("Excluded Payment Form Fields %s", 'event_espresso'),  $this->get_help_tab_link() ),
						'default' => array(
							'company',
							'fax',
						)
					)),
					'required_billing_inputs' => new EE_Checkbox_Multi_Input( 
						$billing_input_names,
						array(
							'html_label_text' => sprintf( __("Required Payment Form Fields %s", 'event_espresso'),  $this->get_help_tab_link() ),
							'default' => array_diff(
										array_keys( $billing_input_names ),
										array( 'address2', 'phone', 'company', 'fax' )
							),
							'html_help_text' => __('Note: if fields are excluded they cannot be required.', 'event_espresso')
						)
					),
					'server' => new EE_Select_Input(
						apply_filters(
							'FHEE__EE_PMT_Aim__generate_new_settings_form__server_select_input__options',
							array(
								'akamai' => __( 'Authorize.net/Akamai (default)', 'event_espresso' ),
								'authorize.net' => __( 'Authorize.net (deprecated)', 'event_espresso' ),
							),
							$this
						),
						array(
							'html_label_text' => __( 'Server', 'event_espresso' ),
							'html_help_text' => __( 'The Gateway Server where payment requests will be sent', 'event_espresso' )
						)
					)
						
				)
			)
		);
	}
	
	/**
	 * Returns an array where keys are the slugs for billing inputs, and values
	 * are their i18n names
	 * @return array
	 */
	public function billing_input_names() {
		return array(
			'first_name' => __( 'First Name', 'event_espresso' ),
			'last_name' => __('Last Name', 'event_espresso'),
			'email' => __( 'Email', 'event_espresso' ),
			'company' => __( 'Company', 'event_espresso' ),
			'address' => __('Address', 'event_espresso'),
			'address2' => __('Address2', 'event_espresso'),
			'city' => __('City', 'event_espresso'),
			'state' => __('State', 'event_espresso'),
			'country' => __('Country', 'event_espresso'),
			'zip' =>  __('Zip', 'event_espresso'),
			'phone' => __('Phone', 'event_espresso'),
			'fax' => __( 'Fax', 'event_espresso' ),
			'cvv' => __('CVV', 'event_espresso')
		);
	}
	
	/**
	 * Overrides parent so we always have all billing inputs in the returned array,
	 * not just the ones included at the time. This helps simplify the gateway code
	 * 
	 * @param EE_Billing_Info_Form $billing_form
	 * @return array
	 */
	protected function _get_billing_values_from_form( $billing_form ){
		$all_billing_values_empty = array();
		foreach( array_keys( $this->billing_input_names() ) as $input_name ) {
			$all_billing_values_empty[ $input_name ] = '';
		}
		return array_merge(
				$all_billing_values_empty,
				parent::_get_billing_values_from_form($billing_form) );
		
	}



	/**
	 * Adds the help tab
	 * @see EE_PMT_Base::help_tabs_config()
	 * @return array
	 */
	public function help_tabs_config(){
		return array(
			$this->get_help_tab_name() => array(
				'title' => __('Authorize.net AIM Settings', 'event_espresso'),
				'filename' => 'payment_methods_overview_aim'
			),
		);
	}



	/**
	 * Gets a list of instructions and/or information regarding how the payment is to be completed
	 * @return string
	 */
	public function payment_information() {
		// TODO: Implement payment_information() method.
	}



}
// End of file EE_PMT_Aim.pm.php
