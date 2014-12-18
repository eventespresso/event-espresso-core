<?php
/**
 * Exactly like EE_Month_Input, except has the EE_All_Sensitive_Data_Removal strategy
 */
class EE_Credit_Card_Month_Input extends EE_Month_Input{

	function __construct( $leading_zero = false, $options = array()){
		$this->set_sensitive_data_removal_strategy( new EE_All_Sensitive_Data_Removal() );
		parent::__construct($leading_zero,$options);
	}
}