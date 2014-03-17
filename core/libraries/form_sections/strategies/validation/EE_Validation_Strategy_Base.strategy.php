<?php

abstract class EE_Validation_Strategy_Base extends EE_Form_Input_Strategy_Base{
	
	/**
	 * Performs validation on the request data that corresponds to this field.
	 * If validation fails, should throw an EE_Validation_Error.
	 * Note: most validate() functions should allow $normalized_value to be empty, 
	 * as its the job of the EE_Required_Validation_STrategy to ensure that the field isn't empty.
	 * @parameter mixed $normalized_value ready for validation. May very well be NULL (which, unless
	 * this validation strategy is the 'required' validation strategy, most should be OK with a null, empty string, etc)
	 * @return void if the input isn't valid, it should just add a validation error using $this->_input->add_validation_error($msg,$code)
	 */
	function validate($normalized_value){
		//by default, the validation strategy does no validation. this hsould be implemented
	}
	
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