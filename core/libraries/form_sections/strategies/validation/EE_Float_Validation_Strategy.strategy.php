<?php

class EE_Float_Validation_Strategy extends EE_Validation_Strategy_Base{

	public function __construct( $validation_error_message = NULL ) {
		if( ! $validation_error_message ){
			$validation_error_message = sprintf(__("Only numeric characters, commas, periods, and spaces, please!", "event_espresso"));
		}
		parent::__construct( $validation_error_message );
	}

	/**
	 *
	 * @return boolean
	 */
	function validate($normalized_value) {
		//errors should have been detected by the normalization strategy
	}

	function get_jquery_validation_rule_array(){
		return array('number'=>true);
	}
}

