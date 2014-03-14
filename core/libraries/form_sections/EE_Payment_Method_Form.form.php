<?php

/**
 * Specialized form for payment methods, allowing for easy setting and retrieving of meta fields.
 * Uses EEM_Payment_Method as the model
 */
class EE_Payment_Method_Form extends EE_Model_Form_Section{
	protected $_extra_meta_inputs = array();
	public function __construct($options_array){
		$this->_model = EEM_Payment_Method::instance();
		if(isset($options_array['extra_meta_inputs'])){
			$this->_subsections = array_merge($this->_subsections,$options_array['extra_meta_inputs']);
		}
		parent::__construct($options_array);
	}
}
