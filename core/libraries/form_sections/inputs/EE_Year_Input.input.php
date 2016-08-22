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
 * EE_Year_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Year_Input extends EE_Select_Input{

	function __construct( $input_settings = array(), $four_digit_year = true, $years_behind = 100, $years_ahead = 0 ){
		if($four_digit_year){
			$current_year_int = intval(date('Y'));
		}else{
			$current_year_int = intval(date('y'));
		}
		$answer_options = array();
		for( $start = $current_year_int - $years_behind; $start <= ($current_year_int + $years_ahead); $start++){
			$answer_options[$start] = $start;
		}
		parent::__construct( $answer_options, $input_settings );
	}
}
