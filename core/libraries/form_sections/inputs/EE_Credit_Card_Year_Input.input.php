<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.6
 *
 * ------------------------------------------------------------------------
 *
 * EE_Credit_Card_Year_Input
 * Exactly like EE_Year_Input, except has the EE_All_Sensitive_Data_Removal strategy
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Credit_Card_Year_Input extends EE_Year_Input{

	function __construct( $input_settings = array(), $four_digit_year = true, $years_behind = 1, $years_ahead = 15 ){
		$this->set_sensitive_data_removal_strategy( new EE_All_Sensitive_Data_Removal() );
		parent::__construct( $input_settings, $four_digit_year, $years_behind, $years_ahead );
	}
}
