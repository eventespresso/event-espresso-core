<?php

class EE_Yes_No_Input extends EE_Select_Input{
	
	function __construct( $options = array()){
		$select_options = array(true=>  __("Yes", "event_espresso"),false=>  __("No", "event_espresso"));
		
		parent::__construct($select_options,$options);
	}
}
