<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * EE_Credit_Card_Year_Input
 * Exactly like EE_Year_Input, except has the EE_All_Sensitive_Data_Removal strategy
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Credit_Card_Year_Input extends EE_Year_Input{

	/**
	 * @param array $input_settings
	 * @param bool  $four_digit_year
	 * @param int   $years_behind
	 * @param int   $years_ahead
	 */
	function __construct( $input_settings = array(), $four_digit_year = true, $years_behind = 0, $years_ahead = 15 ){
		$this->set_sensitive_data_removal_strategy( new EE_All_Sensitive_Data_Removal() );
		parent::__construct( $input_settings, $four_digit_year, $years_behind, $years_ahead );
	}
}
