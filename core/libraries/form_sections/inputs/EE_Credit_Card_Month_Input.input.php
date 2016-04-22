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
 * EE_Credit_Card_Month_Input
 * Exactly like EE_Month_Input, except has the EE_All_Sensitive_Data_Removal strategy
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Credit_Card_Month_Input extends EE_Month_Input{

	/**
	 * @param bool  $leading_zero
	 * @param array $input_settings
	 * @param bool $january_is_month_1
	 */
	function __construct( 
		$leading_zero = false, 
		$input_settings = array(), 
		$january_is_month_1 = true 
	){
		$this->set_sensitive_data_removal_strategy( new EE_All_Sensitive_Data_Removal() );
		parent::__construct(
			$leading_zero,
			$input_settings, 
			$january_is_month_1
		);
	}
}