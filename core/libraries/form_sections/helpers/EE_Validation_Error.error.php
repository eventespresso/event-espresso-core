<?php

class EE_Validation_Error extends Exception{
	/**
	 * Form Section from which this error originated.
	 * @var EE_Form_Section
	 */
	protected $_form_section;
	/**
	 * a short string for uniquely identifying the error, which isn't internationalized and
	 * machines can use to identify the error
	 * @var string
	 */
	protected $_string_code;
	
	/**
	 * When creating a validation error, we need to know which field the error relates to.
	 * @param EE_Form_Section_Base $form_section
	 * @param string $message message you want to display about this error
	 * @param string $string_code a code for uniquely identifying the exception
	 * @param Exception $previous if there was an exception that caused this exception
	 */
	function __construct($form_section, $message = null, $string_code = null, $previous = null){
		$this->_form_section = $form_section;
		$this->_string_code = $string_code;
		parent::__construct($message, 500, $previous);
	}
	
	/**
	 * returns teh form section which caused the error.
	 * @return EE_Form_Section_Base
	 */
	public function get_form_section(){
		return $this->_form_section;
	}
	
}