<?php

class EE_Year_Input extends EE_Select_Input{
	
	function __construct( $four_digit_year = true, $years_behind = 1, $years_ahead = 15, $options = array()){
		if($four_digit_year){
			$current_year_int = intval(date('Y'));
		}else{
			$current_year_int = intval(date('y'));
		}
		$select_options = array();
			for($start = $current_year_int - $years_behind; $start <= ($current_year_int + $years_ahead); $start++){
				$select_options[$start] = $start;
			}
		
		parent::__construct($select_options,$options);
	}
}
