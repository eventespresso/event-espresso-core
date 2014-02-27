<?php

abstract class EE_Validation_Strategy_Base extends EE_Form_Input_Strategy_Base{
	
	/**
	 * Performs validation on the request data that corresponds to this field.
	 * If validation fails, should call the $this->_input->add_validation_error, and return false.
	 * Note: most validate() functions should allow $this->_input->sanitized_value() to be empty, 
	 * as its the job of the EE_Required_Validation_STrategy to ensure that the field isn't empty.
	 * @return boolean
	 */
	abstract function validate();
	
	/**
	 * Gets the JS code for use in the jQuery validation js corresponding to this field when displaying.
	 * For documentation, see http://jqueryvalidation.org/
	 * Eg to generate the following js for validation, <br><code>
	 $( "#myform" ).validate({
		rules: {
		  field_name: {
			required: true,
			minlength: 3,
			equalTo: "#password"
		  }
		}
	  });
	 * </code>
	 * this function should return array('required'=>true,'minlength'=>3,'equalto'=>'"#password"' ).
	 * This is done so that if we are applying multiple sanitization strategies to a field,
	 * we can easily combine them.
	 * 
	 * @return array
	 */
	function get_jquery_validation_rule_array(){
		return array();
	}
}