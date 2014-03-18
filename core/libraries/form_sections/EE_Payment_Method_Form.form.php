<?php

/**
 * Specialized form for payment methods, allowing for easy setting and retrieving of meta fields.
 * Uses EEM_Payment_Method as the model
 */
class EE_Payment_Method_Form extends EE_Model_Form_Section{
	protected $_extra_meta_inputs = array();
	/**
	 * 
	 * @param array $options_array keys:<ul>
	 * <li>'extra_meta_inputs' should be EE_Form_Section_Base[] which
	 * will be _subsections and will be saved as extra meta on the payment method object;</li>
	 * <li>and parent's keys</li>
	 * </ul>
	 */
	public function __construct($options_array){
		$this->_model = EEM_Payment_Method::instance();
		if(isset($options_array['extra_meta_inputs'])){
			$this->_subsections = array_merge($this->_subsections,$options_array['extra_meta_inputs']);
		}
		parent::__construct($options_array);
	}
}
