<?php
/**
 * Exactly like EE_Year_Input, except has the EE_All_Sensitive_Data_Removal strategy
 */
class EE_Credit_Card_Year_Input extends EE_Year_Input{

	function __construct( $four_digit_year = true, $years_behind = 1, $years_ahead = 15, $options = array()){
		$this->set_sensitive_data_removal_strategy( new EE_All_Sensitive_Data_Removal() );
		parent::__construct($four_digit_year, $years_behind, $years_ahead, $options);
	}
}
