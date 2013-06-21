<?php

abstract class EE_Display_Strategy_Base{
	/**
	 * Form Input to display
	 * @var EE_Form_Input_Base
	 */
	protected $_input;
	
	function __construct(EE_Form_Input_Base $form_input){
		$this->_input = $form_input;
	}
	/**
	 * returns HTML and javascript related to the displaying of this forms
	 * @return string
	 */
	abstract function display();
}