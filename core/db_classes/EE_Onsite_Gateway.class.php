<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

abstract class EE_Onsite_Gateway extends EE_Gateway {

	// list of fields required for capturing the billing address 
	protected $_billing_info_address_fields = array();
	// list of fields required for capturing the credit card information
	protected $_billing_info_credit_card_fields = array();
	// list of fields required for capturing other information
	protected $_billing_info_other_fields = array();
	
	abstract public function espresso_reg_page_billing_inputs();

	protected function __construct(EEM_Gateways &$model) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_button_base = 'pay-by-credit-card.png';
		$this->_btn_img = EE_GATEWAYS_URL .$this->_button_base;
		parent::__construct($model);
	}
	
	protected function _set_default_properties() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		parent::_set_default_properties();
		// list of fields required for capturing the billing address 
		$this->_billing_info_address_fields = array(
				'_reg-page-billing-fname-' . $this->_gateway_name,
				'_reg-page-billing-lname-' . $this->_gateway_name,
				'_reg-page-billing-email-' . $this->_gateway_name,
				'_reg-page-billing-phone-' . $this->_gateway_name,
				'_reg-page-billing-address-' . $this->_gateway_name,
				'_reg-page-billing-city-' . $this->_gateway_name,
				'_reg-page-billing-state-' . $this->_gateway_name,
				'_reg-page-billing-country-' . $this->_gateway_name,
				'_reg-page-billing-zip-' . $this->_gateway_name
		);

		// list of fields required for capturing the credit card information
		$this->_billing_info_credit_card_fields = array(
				'_reg-page-billing-card-type-' . $this->_gateway_name,
				'_reg-page-billing-card-nmbr-' . $this->_gateway_name,
				'_reg-page-billing-card-exp-date-mnth-' . $this->_gateway_name,
				'_reg-page-billing-card-exp-date-year-' . $this->_gateway_name,
				'_reg-page-billing-card-ccv-code-' . $this->_gateway_name
		);
	}

	/**
	 * 		generate s HTML for the billing info form during registration
	 * 		@access 		protected
	 * 		@param		array	$billing_inputs - array of input field details
	 * 		@param		array	$section - what part of the billing info form, "address", "credit_card", or "other"
	 * 		@return 		string
	 */
	protected function _generate_billing_info_form_fields( $billing_inputs = array(), $section = FALSE ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		if ( empty( $billing_inputs ) || !$section ) {
			return;
		}
		global $wp_filter, $css_class;

		// fill out section name
		$section = '_billing_info_' . $section . '_fields';
		// if you don't behave - this is what you're gonna get !!!
		$output = '';
		// cycle thru billing inputs
		foreach ( $billing_inputs as $input_key => $billing_input ) {
			// is the billing input in the requested section	?
			if ( in_array( $input_key, $this->$section )) {
				// required fields get a * 
				$required = $billing_input['required'] ? EEH_Form_Fields::prep_required( array( 'class' => 'required', 'label' => '<em>*</em>' )) : '';
				// answer
				$answer = EE_Registry::instance()->REQ->is_set( $input_key ) ? EE_Registry::instance()->REQ->get( $input_key ) : $billing_input['value'];

				if ( $input_key == '_reg-page-billing-card-exp-date-mnth-' . $this->_gateway_name ) {
					
					// Credit Card MONTH
					add_filter( 'FHEE__EEH_Form_Fields__input_html', array( $this, 'reg_form_billing_cc_month_input_wrap' ), 10, 2 );
					remove_filter( 'FHEE__EEH_Form_Fields__label_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_label_wrap' ), 10, 2 );
					remove_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_input__wrap' ), 10, 2 );
					$output .= EEH_Form_Fields::select( 
						__('Expiry Date', 'event_espresso'), 
						$answer, 
						EEH_Form_Fields::two_digit_months_dropdown_options(),
						$input_key, 
						$input_key,
						$css_class . ' ee-credit-card-month display-inline small-txt',
						$required,
						'',
						'',
						'',
						FALSE,
						TRUE,
						FALSE
					);
					remove_filter( 'FHEE__EEH_Form_Fields__input_html', array( $this, 'reg_form_billing_cc_month_input_wrap' ), 10, 2 );
					add_filter( 'FHEE__EEH_Form_Fields__label_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_label_wrap' ), 10, 2 );
					add_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_input__wrap' ), 10, 2 );
					$output .= "\n\t\t\t" . '&nbsp;/&nbsp;';
					
				} elseif ( $input_key == '_reg-page-billing-card-exp-date-year-' . $this->_gateway_name ) {
					
					// Credit Card YEAR							
					// remove label
					add_filter( 'FHEE__EEH_Form_Fields__label_html', array( 'EEH_Form_Fields', 'remove_label_keep_required_msg' ), 10, 2 );
					add_filter( 'FHEE__EEH_Form_Fields__input_html', array( $this, 'reg_form_billing_cc_year_input_wrap' ), 10, 2 );
					remove_filter( 'FHEE__EEH_Form_Fields__label_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_label_wrap' ), 10, 2 );
					remove_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_input__wrap' ), 10, 2 );
					$output .= EEH_Form_Fields::select( 
						__('Year', 'event_espresso'), 
						$answer, 
						EEH_Form_Fields::next_decade_two_digit_year_dropdown_options(), 
						$input_key, 
						$input_key,								
						$css_class . ' ee-credit-card-year display-inline small-txt',
						$required,
						'',
						'',
						'',
						FALSE,
						TRUE,
						FALSE
					);
					// remove filter that removes label, or else no other inputs will have labels
					remove_filter( 'FHEE__EEH_Form_Fields__label_html', array( 'EEH_Form_Fields', 'remove_label_keep_required_msg' ), 10, 2 );
					remove_filter( 'FHEE__EEH_Form_Fields__input_html', array( $this, 'reg_form_billing_cc_year_input_wrap' ), 10, 2 );
					add_filter( 'FHEE__EEH_Form_Fields__label_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_label_wrap' ), 10, 2 );
					add_filter( 'FHEE__EEH_Form_Fields__input_html', array( 'EED_Single_Page_Checkout', 'reg_form_form_field_input__wrap' ), 10, 2 );
					$output .= "\n\t\t\t" . '<span class="small-text lt-grey-text">' . __('(mm/yy)', 'event_espresso') . '</span>';
					
				} else {

					// create question form input
					$QFI = new EE_Question_Form_Input(
						EE_Question::new_instance( array( 
							'QST_display_text' => $billing_input['label'], 
							'QST_system' => $billing_input['db-col'],
							'QST_type'=>$billing_input['input'],
							'QST_required' => $billing_input['required'] 
						)),
						EE_Answer::new_instance( array( 
							'ANS_value'=> $answer 
						)),
						array(
							'input_name' =>  $input_key,
							'input_id' => $input_key,
							'input_class' => $css_class,
							'input_prefix' => '',
							'append_qstn_id' => FALSE
						)
					);
					// add options
					if ( isset( $billing_input['options'] )) {
						$options = is_array( $billing_input['options'] ) ? $billing_input['options'] : explode( ',', $billing_input['options'] );
						foreach ( $options as $option ) {	
							$QSO = EE_Question_Option::new_instance ( array (
								'QSO_value' => $option,
								'QSO_desc' => $option
							));
							$QFI->add_temp_option( $QSO );												
						}								
					}	
					$output .= EEH_Form_Fields::generate_form_input( $QFI );	

				}
				
			} // end if ( in_array( $input_key, $this->$section ))
		} // end foreach( $billing_inputs as $input_key => $billing_input ) 
		
		
		return $output;
	}



	/**
	 * 	reg_form_billing_cc_month_input__wrap
	 *
	 * 	@access 	public
	 * 	@param 	string 	$input
	 * 	@return 		string
	 */
	public function reg_form_billing_cc_month_input_wrap( $input, $label ) {
		return '<div class="reg-page-form-field-wrap-pg">' . $input;		
	}




	/**
	 * 	reg_form_billing_cc_year_input__wrap
	 *
	 * 	@access 	public
	 * 	@param 	string 	$input
	 * 	@return 		string
	 */
	public function reg_form_billing_cc_year_input_wrap( $input, $label ) {
		return $input . '</div>';		
	}



	/**
	 * 		process_gateway_selection()
	 * 		@access public
	 * 		@return 	mixed	array on success or FALSE on fail
	 */
	public function process_gateway_selection() {
	
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// set  billing inputs in the individual gateways plz
		$reg_page_billing_inputs = array();
		// allow others to edit post input array
		$reg_page_billing_inputs = $this->espresso_reg_page_billing_inputs();
		$reg_page_billing_inputs = apply_filters( 'FHEE__EE_Onsite_Gateway__process_gateway_selection__reg_page_billing_inputs', $reg_page_billing_inputs );

//printr( $reg_page_billing_inputs, '$reg_page_billing_inputs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// validate and sanitize	post data
		$reg_page_billing_inputs = EE_Registry::instance()->load_class('EE_Validate_and_Sanitize')->validate_and_sanitize_post_inputs($reg_page_billing_inputs);
		if ($reg_page_billing_inputs) {
			// add billing info to the session
			if (EE_Registry::instance()->SSN->set_session_data( array( 'billing_info' => $reg_page_billing_inputs ))) {
				$msg = __( 'Billing information submitted successfully.', 'event_espresso' );
				EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
			} 
		}


	}



	/**
	 * 		set_billing_info_for_confirmation
	 * 		@access public
	 * 		@param array	$billing_info
	 * 		@return array
	 */
	public function set_billing_info_for_confirmation( $billing_info ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$confirm_inputs = array(
				'first name'=>'fname-' . $this->_gateway_name,
				'last name'=>'lname-' . $this->_gateway_name,
				'email address'=>'email-' . $this->_gateway_name,
				'address'=>'address-' . $this->_gateway_name,
				'city'=>'city-' . $this->_gateway_name,
				'state'=>'state-' . $this->_gateway_name,
				'country'=>'country-' . $this->_gateway_name,
				'zip'=>'zip-' . $this->_gateway_name,
				'ccv code'=>'ccv-code-' . $this->_gateway_name
				);
		$confirm_data = array();
		foreach ( $confirm_inputs as $confirm_name=>$billing_name ) {
			if ( ! empty( $billing_info['_reg-page-billing-'.$billing_name]['value'] )) {
				$confirm_data[$confirm_name] = $billing_info['_reg-page-billing-'.$billing_name]['value'];
			}
		}
		$confirm_data['credit card #'] = $this->_EEM_Gateways->FormatCreditCard( $billing_info[ '_reg-page-billing-card-nmbr-' . $this->_gateway_name ]['value'] );
		$confirm_data['expiry date'] = $billing_info[ '_reg-page-billing-card-exp-date-mnth-' . $this->_gateway_name ]['value'] . '&nbsp;/&nbsp;';
		$confirm_data['expiry date'] .= $billing_info[ '_reg-page-billing-card-exp-date-year-' . $this->_gateway_name ]['value'];
		return $confirm_data;
	}
	
	/**
	 * Saves the cleaned billing info to the trasnaction's primary registration's attendee.
	 * @param array $billing_info where keys are keys in the espresso_reg_page_billing_inputs()'s array, values are their
	 * cleaned values.
	 * @param EE_Transaction $transaction
	 * @return boolean
	 */
	protected function _save_billing_info_to_attendee($billing_info,$transaction){
		if( ! $transaction || ! $transaction instanceof EE_Transaction){
			EE_Error::add_error(__("Cannot save billing info because no transaction was specified", "event_espresso"), __FILE__, __FUNCTION__, __LINE__);
			return false;
		}
		$primary_reg = $transaction->primary_registration();
		if( ! $primary_reg ){
			EE_Error::add_error(__("Cannot save billing info because the transaction has no primary registration", "event_espresso"), __FILE__, __FUNCTION__, __LINE__);
			return false;
		}
		$attendee_id = $primary_reg->attendee_ID();
		if( ! $attendee_id ){
			EE_Error::add_error(__("Cannot save billing info because the transaction's primary registration has no attendee!", "event_espresso"), __FILE__, __FUNCTION__, __LINE__);
			return false;
		}
		$billing_input_field_settings = $this->espresso_reg_page_billing_inputs();
		$billing_info_ready_for_saving = array();
		foreach($billing_input_field_settings as $field_name => $settings){
			$cleaned_value = isset( $billing_info[$field_name]) && isset($billing_info[$field_name]['value']) ? $billing_info[$field_name]['value'] : null;
			if($settings['sanitize'] == 'ccv'){
				//dont save ccv data
				continue;
			}elseif($settings['sanitize'] == 'ccard'){
				$billing_info_ready_for_saving[$field_name] = EEM_Gateways::instance()->MaskCreditCard($cleaned_value);
			}else{//all others save normally
				$billing_info_ready_for_saving[$field_name] = $cleaned_value;
			}
		}
		
		$success = update_post_meta($attendee_id, 'billing_info_'.$this->_gateway_name, $billing_info_ready_for_saving);
		return $success;
	}

}