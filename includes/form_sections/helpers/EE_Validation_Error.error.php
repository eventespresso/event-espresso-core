<?php

class EE_Validation_Error extends Exception{
	/**
	 * Form Section from which this error originated.
	 * @var EE_Form_Section
	 */
	protected $_form_section;
	
	/**
	 * When creating a validation error, we need to know which field the error relates to.
	 * @param EE_Form_Section_Base $form_section
	 * @param string $message message you want to display about this error
	 * @param string $code a code for uniquely identifying the exception
	 * @param Exception $previous if there was an exception that caused this exception
	 */
	function __construct($form_section, $message = null, $code = null, $previous = null){
		$this->_form_section = $form_section;
		parent::__construct($message, $code, $previous);
	}
	
	/**
	 * returns teh form section which caused the error.
	 * @return EE_Form_Section_Base
	 */
	public function get_form_section(){
		return $this->_form_section;
	}
	
}