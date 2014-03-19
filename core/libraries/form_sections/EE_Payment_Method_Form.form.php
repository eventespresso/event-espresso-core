<?php

/**
 * Specialized form for payment methods, allowing for easy setting and retrieving of meta fields.
 * Uses EEM_Payment_Method as the model
 */
class EE_Payment_Method_Form extends EE_Model_Form_Section{
	/**
	 * All the subsection inputs that correspond ot extra meta rows
	 * for this payment method
	 * @var EE_Form_Input_Base
	 */
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
			$this->_extra_meta_inputs = array_merge($this->_extra_meta_inputs,$options_array['extra_meta_inputs']);
		}
		if($this->_extra_meta_inputs){
			$this->_subsections = array_merge($this->_subsections,$this->_extra_meta_inputs);
		}
		parent::__construct($options_array);
		
	}
	
	/**
	 * extends the model form section's save method to also save the extra meta field values
	 * @return int ID of the payment method inserted, or true on update
	 */
	public function save(){
		$id_or_save = parent::save();
		if($id_or_save && $this->_model_object){
			foreach($this->_extra_meta_inputs as $input_name => $input){
				$this->_model_object->update_extra_meta($input_name, $input->normalized_value());
			}
		}
		return $id_or_save;
	}
	/**
	 * Overrides parentt's populate_model_obj to also populate the extra meta fields
	 * @param EE_Base_Class $model_obj
	 */
	public function populate_model_obj($model_obj) {
		$model_obj = $this->_model->ensure_is_obj($model_obj);
		parent::populate_model_obj($model_obj);
		$extra_metas = $model_obj->all_extra_meta_array();
		d($extra_metas);
		foreach($this->_extra_meta_inputs as $input_name => $extra_meta_input){
			if(isset($extra_metas[$input_name])){
				$extra_meta_input->set_default($extra_metas[$input_name]);
			}
		}
	}
}
