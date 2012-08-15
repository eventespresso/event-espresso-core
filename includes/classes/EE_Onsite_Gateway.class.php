<?php

abstract class EE_Onsite_Gateway extends EE_Gateway {

	// list of fields required for capturing the billing address 
	protected $_billing_info_address_fields = array();
	// list of fields required for capturing the credit card information
	protected $_billing_info_credit_card_fields = array();
	// list of fields required for capturing other information
	protected $_billing_info_other_fields = array();
	
	abstract public function espresso_reg_page_billing_inputs();

	protected function __construct(EEM_Gateways &$model) {
		// this filter allows whatever function is processing the registration page to know what inputs to expect
		add_filter('filter_hook_espresso_reg_page_billing_inputs', array(&$this, 'espresso_reg_page_billing_inputs'));
		parent::__construct($model);
	}
	
	public function espresso_process_off_site_payment() {}

	protected function _set_default_properties() {
		parent::_set_default_properties();
		// list of fields required for capturing the billing address 
		$this->_billing_info_address_fields = array(
				'reg-page-billing-fname',
				'reg-page-billing-lname',
				'reg-page-billing-email',
				'reg-page-billing-phone',
				'reg-page-billing-address',
				'reg-page-billing-city',
				'reg-page-billing-state',
				'reg-page-billing-country',
				'reg-page-billing-zip'
		);

		// list of fields required for capturing the credit card information
		$this->_billing_info_credit_card_fields = array(
				'reg-page-billing-card-type',
				'reg-page-billing-card-nmbr',
				'reg-page-billing-card-exp-date-mnth',
				'reg-page-billing-card-exp-date-year',
				'reg-page-billing-card-ccv-code'
		);
	}

	/**
	 * 		generate s HTML for the billing info form during registration
	 * 		@access 		protected
	 * 		@param		array	$billing_inputs - array of input field details
	 * 		@param		array	$section - what part of the billing info form, "address", "credit_card", or "other"
	 * 		@return 		string
	 */
	protected function _generate_billing_info_form_fields($billing_inputs = array(), $section = FALSE) {

		if (empty($billing_inputs) || !$section) {
			return;
		}
		global $css_class;
		// fill out section name
		$section = '_billing_info_' . $section . '_fields';
		// if you don't behave - this is what you're gonna get !!!
		$output = '';
		// cycle thru billing inputs
		foreach ($billing_inputs as $input_key => $billing_input) {
			// is the billing input in the requested section	?
			if (in_array($input_key, $this->$section)) {
				// required fields get a * 
				$required = $billing_input['required'] ? '&nbsp;<em>*</em>' : '';
				// and the css class "required"
				$styles = $billing_input['required'] ? 'required ' . $css_class : $css_class;

				// start with a p tag, unless this is the credit card year field
				if ($input_key != 'reg-page-billing-card-exp-date-year') {
					$output .= "\n\t\t" . '<p class="event_form_field">';
				}

				// what type of input are we dealing with ?
				switch ($billing_input['input']) {

					// text inputs
					case 'text' :

						$output .= "\n\t\t\t" . '<label for="' . $input_key . '">' . $billing_input['label'] . $required . '</label>';
						$output .= "\n\t\t\t" . '<input id="' . $input_key . '" class="' . $styles . '" type="text" value="' . $billing_input['value'] . '" name="' . $input_key . '">';
						break;

					// dropdowns
					case 'select' :

						if ($input_key == 'reg-page-billing-card-exp-date-mnth') {

							$output .= "\n\t\t\t" . '<label>' . __('Expiry Date', 'event_espresso') . '&nbsp;<em>*</em></label>';
							$output .= "\n\t\t\t" . '<select id="reg-page-billing-card-exp-date-mnth" class="' . $styles . ' small-txt" name="reg-page-billing-card-exp-date-mnth">';
							for ($x = 1; $x <= 12; $x++) {
								$value = $x < 10 ? '0' . $x : $x;
								$output .= "\n\t\t\t\t" . '<option value="' . $value . '">' . $value . '</option>';
							}
							$output .= "\n\t\t\t" . '</select>';
							$output .= "\n\t\t\t" . '&nbsp;/&nbsp;';
						} elseif ($input_key == 'reg-page-billing-card-exp-date-year') {

							$output .= "\n\t\t\t" . '<select id="reg-page-billing-card-exp-date-year" class="' . $styles . ' small-txt" name="reg-page-billing-card-exp-date-year">';
							$current_year = date('y');
							$next_decade = $current_year + 10;
							for ($x = $current_year; $x <= $next_decade; $x++) {
								$value = $x < 10 ? '0' . $x : $x;
								$output .= "\n\t\t\t\t" . '<option value="' . $value . '">' . $value . '</option>';
							}
							$output .= "\n\t\t\t" . '</select>';
							$output .= "\n\t\t\t" . '<span class="small-text lt-grey-text">' . __('(mm/yy)', 'event_espresso') . '</span>';
						} else {

							$output .= "\n\t\t\t" . '<label for="' . $input_key . '">' . $billing_input['label'] . $required . '</label>';
							$output .= "\n\t\t\t" . '<select id="' . $input_key . '" class="' . $styles . ' small-txt" name="' . $input_key . '">';

							if (is_array($billing_input['options'])) {
								$options = $billing_input['options'];
							} else {
								$options = explode(',', $billing_input['options']);
							}

							foreach ($options as $key => $value) {
								//$key = str_replace( ' ', '_', sanitize_key( $value ));
								$output .= "\n\t\t\t\t" . '<option value="' . $key . '">' . $value . '</option>';
							}
							$output .= "\n\t\t\t" . '</select>';
						}

						break;
				} // end switch
				// end with a p tag, unless this is the credit card month field
				if ($input_key != 'reg-page-billing-card-exp-date-mnth') {
					$output .= "\n\t\t" . '</p>';
				}
			} // end if ( in_array( $input_key, $this->$section ))
		} // end foreach( $billing_inputs as $input_key => $billing_input ) 

		return $output;
	}



	/**
	 * 		process_gateway_selection()
	 * 		@access public
	 * 		@return 	mixed	array on success or FALSE on fail
	 */
	public function process_gateway_selection() {
	
		global $EE_Session, $espresso_notices;
		// set  billing inputs in the individual gateways plz
		$reg_page_billing_inputs = array();
		// allow others to edit post input array
		$reg_page_billing_inputs = apply_filters('filter_hook_espresso_reg_page_billing_inputs', $reg_page_billing_inputs);

		// if EE_Validate_and_Sanitize is not instantiated
		if (!defined('EE_Validate_and_Sanitize')) {
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/classes/EE_Validate_and_Sanitize.class.php');
			$EE_VnS = EE_Validate_and_Sanitize::instance();
		}

		// validate and sanitize	post data
		$reg_page_billing_inputs = $EE_VnS->validate_and_sanitize_post_inputs($reg_page_billing_inputs);
		if ($reg_page_billing_inputs) {
			// add billing info to the session
			if ($EE_Session->set_session_data(array('billing_info' => $reg_page_billing_inputs), $section = 'session_data')) {
				$espresso_notices['success'][] = __('Billing information submitted successfully', 'event_espresso');
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
		$confirm_inputs = array(
				'first name'=>'fname',
				'last name'=>'lname',
				'email address'=>'email',
				'address'=>'address',
				'city'=>'city',
				'state'=>'state',
				'country'=>'country',
				'zip'=>'zip',
				'ccv code'=>'ccv-code'
				);
		$confirm_data = array();
		foreach ($confirm_inputs as $confirm_name=>$billing_name) {
			if(!empty($billing_info['reg-page-billing-'.$billing_name]['value'])) {
				$confirm_data[$confirm_name] = $billing_info['reg-page-billing-'.$billing_name]['value'];
			}
		}
		$confirm_data['credit card #'] = $this->_EEM_Gateways->FormatCreditCard( $billing_info['reg-page-billing-card-nmbr']['value'] );
		$confirm_data['expiry date'] = $billing_info['reg-page-billing-card-exp-date-mnth']['value'] . '&nbsp;/&nbsp;' . $billing_info['reg-page-billing-card-exp-date-year']['value'];
		return $confirm_data;
	}


	/**
	 * 		_redirect_after_reg_step_3 - how to handle redirection after processing reg step 3
	 * 		@access public
	 * 		@return 	void
	 */
	public function redirect_after_reg_step_3( $return_page_url ) {

//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	
		if ( ! $this->_EEM_Gateways->ajax() ) {
			wp_safe_redirect( $return_page_url );
			exit();
		}

	}

	


}